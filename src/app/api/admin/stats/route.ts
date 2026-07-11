import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/lib/models/Booking";
import Test from "@/lib/models/Test";
import HealthPackage from "@/lib/models/HealthPackage";
import Doctor from "@/lib/models/Doctor";
import HomeCollection from "@/lib/models/HomeCollection";

export async function GET() {
  try {
    await connectToDatabase();

    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      totalTests,
      totalPackages,
      totalDoctors,
      activeHomeCollections,
      walkinBookings,
      onlineBookings,
      phoneBookings,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "pending" }),
      Booking.countDocuments({ status: "confirmed" }),
      Test.countDocuments(),
      HealthPackage.countDocuments(),
      Doctor.countDocuments(),
      HomeCollection.countDocuments({ status: { $ne: "Completed" } }),
      Booking.countDocuments({ type: "walk-in" }),
      Booking.countDocuments({ type: "online" }),
      Booking.countDocuments({ type: "phone" }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          confirmed: confirmedBookings,
          types: {
            walkin: walkinBookings,
            online: onlineBookings,
            phone: phoneBookings,
          },
        },
        catalog: {
          tests: totalTests,
          packages: totalPackages,
        },
        team: {
          doctors: totalDoctors,
        },
        operations: {
          activeCollections: activeHomeCollections,
        },
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
