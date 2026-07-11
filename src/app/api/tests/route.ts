import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Test from "@/lib/models/Test";

export async function GET() {
  try {
    await connectToDatabase();
    const tests = await Test.find().sort({ name: 1 });
    return NextResponse.json({ success: true, tests });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newTest = new Test({
      name: body.name,
      category: body.category,
      price: Number(body.price),
      description: body.description,
      preparation: body.preparation,
      sampleType: body.sampleType,
      reportTime: body.reportTime,
      department: body.department,
      equipment: body.equipment,
      technician: body.technician,
      referenceValues: body.referenceValues,
      featured: !!body.featured,
      visible: body.visible !== undefined ? !!body.visible : true,
    });

    await newTest.save();
    return NextResponse.json({ success: true, test: newTest });
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
      return NextResponse.json({ error: "Missing test ID" }, { status: 400 });
    }

    const updatedTest = await Test.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, test: updatedTest });
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
      return NextResponse.json({ error: "Missing test ID" }, { status: 400 });
    }

    await Test.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Test deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
