import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import HealthPackage from "@/lib/models/HealthPackage";

export async function GET() {
  try {
    await connectToDatabase();
    const packages = await HealthPackage.find().sort({ price: 1 });
    return NextResponse.json({ success: true, packages });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const originalPrice = Number(body.originalPrice);
    const price = Number(body.price);
    const discount = originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const newPackage = new HealthPackage({
      name: body.name,
      description: body.description,
      tests: body.tests || [],
      price: price,
      originalPrice: originalPrice,
      discount: discount,
      offerValidity: body.offerValidity || "31st Dec 2026",
      popular: !!body.popular,
      categoryTags: body.categoryTags || [],
    });

    await newPackage.save();
    return NextResponse.json({ success: true, package: newPackage });
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
      return NextResponse.json({ error: "Missing package ID" }, { status: 400 });
    }

    if (updateData.price && updateData.originalPrice) {
      const op = Number(updateData.originalPrice);
      const p = Number(updateData.price);
      updateData.discount = op > 0 ? Math.round(((op - p) / op) * 100) : 0;
    }

    const updatedPackage = await HealthPackage.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, package: updatedPackage });
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
      return NextResponse.json({ error: "Missing package ID" }, { status: 400 });
    }

    await HealthPackage.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Health package deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
