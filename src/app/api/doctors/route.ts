import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Doctor from "@/lib/models/Doctor";

export async function GET() {
  try {
    await connectToDatabase();
    const doctors = await Doctor.find().sort({ name: 1 });
    return NextResponse.json({ success: true, doctors });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newDoctor = new Doctor({
      name: body.name,
      qualification: body.qualification,
      specialization: body.specialization,
      experience: body.experience,
      availableDays: body.availableDays || [],
      consultationFee: Number(body.consultationFee),
      image: body.image || "/images/doctor-1.png",
      biography: body.biography,
      onlineConsultation: body.onlineConsultation !== undefined ? !!body.onlineConsultation : true,
      slots: body.slots || ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
    });

    await newDoctor.save();
    return NextResponse.json({ success: true, doctor: newDoctor });
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
      return NextResponse.json({ error: "Missing doctor ID" }, { status: 400 });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, doctor: updatedDoctor });
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
      return NextResponse.json({ error: "Missing doctor ID" }, { status: 400 });
    }

    await Doctor.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Doctor deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
