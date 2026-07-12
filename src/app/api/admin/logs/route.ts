import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import AuditLog from "@/lib/models/AuditLog";

export async function GET() {
  try {
    await connectToDatabase();
    let logs = await AuditLog.find().sort({ createdAt: -1 }).limit(100);
    if (logs.length === 0) {
      // Seed default logs
      const defaultLogs = [
        { adminEmail: "admin@citylab.com", adminName: "Super Admin", action: "SETTINGS_UPDATE", details: "Updated laboratory logo & favicon paths" },
        { adminEmail: "admin@citylab.com", adminName: "Super Admin", action: "DATABASE_BACKUP", details: "Successful database backup execution" },
        { adminEmail: "content@citylab.com", adminName: "Content Manager", action: "CMS_EDIT", details: "Published health article: Tips Before Giving Blood Samples" },
        { adminEmail: "reception@citylab.com", adminName: "Reception Team", action: "BOOKING_CONFIRM", details: "Confirmed Complete Blood Count booking for Sunita Rao" },
      ];
      await AuditLog.insertMany(defaultLogs);
      logs = await AuditLog.find().sort({ createdAt: -1 });
    }
    return NextResponse.json({ success: true, logs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newLog = new AuditLog({
      adminEmail: body.adminEmail,
      adminName: body.adminName || "Administrator",
      action: body.action,
      details: body.details,
      ipAddress: body.ipAddress || "127.0.0.1",
    });
    await newLog.save();
    return NextResponse.json({ success: true, log: newLog });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
