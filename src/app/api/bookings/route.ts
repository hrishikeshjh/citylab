import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/lib/models/Booking";
import HomeCollection from "@/lib/models/HomeCollection";

export async function GET() {
  try {
    await connectToDatabase();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, bookings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newBooking = new Booking({
      patientName: body.patientName,
      email: body.email,
      phone: body.phone,
      type: body.type,
      status: body.status || "pending",
      details: body.details,
      date: new Date(body.date || Date.now()),
    });

    await newBooking.save();

    // If it's a home collection, automatically create a placeholder home collection entry
    if (body.type === "home") {
      const newHomeCol = new HomeCollection({
        bookingId: newBooking._id.toString(),
        patientName: newBooking.patientName,
        address: body.address || "No address provided",
        phone: newBooking.phone,
        collectionTime: body.collectionTime || "08:00 AM - 12:00 PM",
        technicianName: "To Be Assigned",
        status: "Arrival status",
        notes: body.notes || "",
      });
      await newHomeCol.save();
    }

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing booking ID" }, { status: 400 });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing booking ID" }, { status: 400 });
    }

    await Booking.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Booking deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
