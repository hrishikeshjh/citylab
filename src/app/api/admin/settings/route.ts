import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import SystemSettings from "@/lib/models/SystemSettings";

export async function GET() {
  try {
    await connectToDatabase();
    let settings = await SystemSettings.findOne();
    if (!settings) {
      // Create default settings document
      settings = new SystemSettings({});
      await settings.save();
    }
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    let settings = await SystemSettings.findOne();
    if (!settings) {
      settings = new SystemSettings(body);
    } else {
      Object.assign(settings, body);
    }
    await settings.save();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
