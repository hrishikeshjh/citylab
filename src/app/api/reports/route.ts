import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Report from "@/lib/models/Report";

export async function GET() {
  try {
    await connectToDatabase();
    const reports = await Report.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, reports });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newReport = new Report({
      patientName: body.patientName,
      email: body.email,
      bookingId: body.bookingId,
      testNames: body.testNames,
      fileUrl: body.fileUrl || "/reports/placeholder.pdf",
      status: body.status || "Draft",
      verifiedBy: body.verifiedBy,
      digitalSignatureUrl: body.digitalSignatureUrl,
      version: 1,
    });

    await newReport.save();
    return NextResponse.json({ success: true, report: newReport });
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
      return NextResponse.json({ error: "Missing report ID" }, { status: 400 });
    }

    // Bump version if fileUrl changes
    const currentReport = await Report.findById(id);
    if (currentReport && updateData.fileUrl && currentReport.fileUrl !== updateData.fileUrl) {
      updateData.version = (currentReport.version || 1) + 1;
    }

    const updatedReport = await Report.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, report: updatedReport });
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
      return NextResponse.json({ error: "Missing report ID" }, { status: 400 });
    }

    await Report.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Report deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
