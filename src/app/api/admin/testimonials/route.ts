import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Testimonial from "@/lib/models/Testimonial";

export async function GET() {
  try {
    await connectToDatabase();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, testimonials });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newTestimonial = new Testimonial({
      patientName: body.patientName,
      rating: body.rating,
      reviewText: body.reviewText,
      status: body.status || "pending",
      featured: !!body.featured,
    });
    await newTestimonial.save();
    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { id, ...updateData } = body;
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    const updated = await Testimonial.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, testimonial: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    await Testimonial.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
