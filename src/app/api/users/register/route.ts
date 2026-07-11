import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { uid, email, displayName, photoURL } = await request.json();

    if (!uid || !email) {
      return NextResponse.json({ error: "Missing uid or email" }, { status: 400 });
    }

    const ADMIN_EMAILS_STR = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "admin@citylab.com,admin@example.com,hrishikesh@citylab.com,hrishikesh@example.com";
    const ADMIN_EMAILS = ADMIN_EMAILS_STR.split(",").map((e) => e.trim().toLowerCase());
    
    const role = ADMIN_EMAILS.includes(email.toLowerCase()) ? "admin" : "user";

    // Upsert user
    const user = await User.findOneAndUpdate(
      { uid },
      { email, displayName, photoURL, role },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
