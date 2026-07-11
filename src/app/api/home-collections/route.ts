import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import HomeCollection from "@/lib/models/HomeCollection";

export async function GET() {
  try {
    await connectToDatabase();
    const collections = await HomeCollection.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, collections });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newCollection = new HomeCollection({
      bookingId: body.bookingId,
      patientName: body.patientName,
      address: body.address,
      phone: body.phone,
      collectionTime: body.collectionTime,
      technicianName: body.technicianName || "To Be Assigned",
      status: body.status || "Arrival status",
      notes: body.notes,
      otp: body.otp || Math.floor(1000 + Math.random() * 9000).toString(),
    });

    await newCollection.save();
    return NextResponse.json({ success: true, collection: newCollection });
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
      return NextResponse.json({ error: "Missing collection ID" }, { status: 400 });
    }

    const updatedCollection = await HomeCollection.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, collection: updatedCollection });
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
      return NextResponse.json({ error: "Missing collection ID" }, { status: 400 });
    }

    await HomeCollection.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Home collection deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
