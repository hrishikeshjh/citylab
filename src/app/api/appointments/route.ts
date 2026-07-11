import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";

export async function GET() {
  try {
    await connectToDatabase();
    const appointments = await Appointment.find().sort({ date: 1, slot: 1 });
    return NextResponse.json({ success: true, appointments });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newAppointment = new Appointment({
      doctorId: body.doctorId,
      doctorName: body.doctorName,
      patientName: body.patientName,
      patientPhone: body.patientPhone,
      date: body.date,
      slot: body.slot,
      status: body.status || "Pending",
      notes: body.notes,
    });

    await newAppointment.save();
    return NextResponse.json({ success: true, appointment: newAppointment });
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
      return NextResponse.json({ error: "Missing appointment ID" }, { status: 400 });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, appointment: updatedAppointment });
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
      return NextResponse.json({ error: "Missing appointment ID" }, { status: 400 });
    }

    await Appointment.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Appointment deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
