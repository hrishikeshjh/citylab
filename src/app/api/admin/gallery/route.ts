import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import GalleryImage from "@/lib/models/GalleryImage";

export async function GET() {
  try {
    await connectToDatabase();
    const images = await GalleryImage.find().sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json({ success: true, images });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newImage = new GalleryImage({
      fileUrl: body.fileUrl,
      category: body.category,
      displayOrder: body.displayOrder || 0,
      description: body.description || "",
    });
    await newImage.save();
    return NextResponse.json({ success: true, image: newImage });
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
    const updated = await GalleryImage.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, image: updated });
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
    await GalleryImage.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
