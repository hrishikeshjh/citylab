import mongoose from "mongoose";
import { tests, healthPackages, doctors } from "./data";
import Test from "./models/Test";
import HealthPackage from "./models/HealthPackage";
import Doctor from "./models/Doctor";
import Booking from "./models/Booking";
import Appointment from "./models/Appointment";
import HomeCollection from "./models/HomeCollection";
import Report from "./models/Report";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/city-lab";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  // Auto seeding
  try {
    await seedDatabase();
  } catch (err) {
    console.error("Database seeding error:", err);
  }

  return cached.conn;
}

async function seedDatabase() {
  // 1. Seed Tests
  const testCount = await Test.countDocuments();
  if (testCount === 0) {
    console.log("Seeding tests...");
    const mappedTests = tests.map((t) => ({
      name: t.name,
      category: t.category.replace(" Test", ""), // clean for general match
      price: t.price,
      description: `Comprehensive diagnostic analysis for ${t.name}.`,
      preparation: t.preparation,
      sampleType: t.category.toLowerCase().includes("blood") ? "Blood" : t.category.toLowerCase().includes("urine") ? "Urine" : "Blood",
      reportTime: t.reportTime,
      department: t.category,
      equipment: "Automated Chemistry Analyzer",
      technician: "Ramesh Kumar, DMLT",
      referenceValues: "Within normal biological range",
      featured: t.price > 500,
      visible: true,
    }));
    await Test.insertMany(mappedTests);
  }

  // 2. Seed Health Packages
  const packageCount = await HealthPackage.countDocuments();
  if (packageCount === 0) {
    console.log("Seeding health packages...");
    const mappedPackages = healthPackages.map((p) => ({
      name: p.name,
      description: p.description,
      tests: p.tests,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100),
      offerValidity: "31st Dec 2026",
      popular: !!p.popular,
      categoryTags: p.name.toLowerCase().includes("women") ? ["Women's Package"] : p.name.toLowerCase().includes("senior") ? ["Senior Citizen"] : ["General Body Checkup"],
    }));
    await HealthPackage.insertMany(mappedPackages);
  }

  // 3. Seed Doctors
  const doctorCount = await Doctor.countDocuments();
  if (doctorCount === 0) {
    console.log("Seeding doctors...");
    const mappedDoctors = doctors.map((d) => ({
      name: d.name,
      qualification: d.qualification,
      specialization: d.specialization,
      experience: d.experience,
      availableDays: d.availableDays.split(" — "),
      consultationFee: d.consultationFee,
      image: d.image,
      biography: `${d.name} is a highly respected specialist in ${d.specialization} with over ${d.experience} of dedicated diagnostic practice.`,
      onlineConsultation: true,
      slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
    }));
    await Doctor.insertMany(mappedDoctors);
  }

  // 4. Seed Dummy Bookings if empty
  const bookingCount = await Booking.countDocuments();
  if (bookingCount === 0) {
    console.log("Seeding dummy bookings...");
    const dummyBookings = [
      {
        patientName: "Arjun Mehta",
        email: "arjun@example.com",
        phone: "+91 98765 43210",
        type: "home",
        status: "pending",
        details: "Complete Blood Count (CBC)",
        date: new Date(),
      },
      {
        patientName: "Sunita Rao",
        email: "sunita@example.com",
        phone: "+91 91234 56789",
        type: "online",
        status: "confirmed",
        details: "Basic Health Checkup",
        date: new Date(Date.now() - 86400000), // yesterday
      },
      {
        patientName: "Vikram Singh",
        email: "vikram@example.com",
        phone: "+91 98111 22233",
        type: "walk-in",
        status: "confirmed",
        details: "Thyroid Profile (T3, T4, TSH)",
        date: new Date(Date.now() + 86400000), // tomorrow
      },
    ];
    await Booking.insertMany(dummyBookings);
  }

  // 5. Seed Dummy Appointments if empty
  const appointmentCount = await Appointment.countDocuments();
  if (appointmentCount === 0) {
    console.log("Seeding dummy appointments...");
    const savedDocs = await Doctor.find();
    if (savedDocs.length > 0) {
      const dummyAppointments = [
        {
          doctorId: savedDocs[0]._id.toString(),
          doctorName: savedDocs[0].name,
          patientName: "Amit Verma",
          patientPhone: "+91 99887 76655",
          date: new Date().toISOString().split("T")[0],
          slot: "10:00 AM",
          status: "Pending",
          notes: "Need to consult regarding blood reports",
        },
        {
          doctorId: savedDocs[1]._id.toString(),
          doctorName: savedDocs[1].name,
          patientName: "Ritu Goel",
          patientPhone: "+91 99443 32211",
          date: new Date().toISOString().split("T")[0],
          slot: "02:00 PM",
          status: "Confirmed",
          notes: "Routine follow-up on diabetes package",
        },
      ];
      await Appointment.insertMany(dummyAppointments);
    }
  }

  // 6. Seed Dummy Home Collections if empty
  const collectionCount = await HomeCollection.countDocuments();
  if (collectionCount === 0) {
    console.log("Seeding dummy home collections...");
    const savedBookings = await Booking.find({ type: "home" });
    if (savedBookings.length > 0) {
      const dummyHomeCol = [
        {
          bookingId: savedBookings[0]._id.toString(),
          patientName: savedBookings[0].patientName,
          address: "102, Green Glen Layout, Bellandur, Bangalore",
          phone: savedBookings[0].phone,
          collectionTime: "08:00 AM - 10:00 AM",
          technicianName: "Sandip Pal (Phlebotomist)",
          status: "Arrival status",
          notes: "Fasting required before sample collection.",
        },
      ];
      await HomeCollection.insertMany(dummyHomeCol);
    }
  }

  // 7. Seed Dummy Reports if empty
  const reportCount = await Report.countDocuments();
  if (reportCount === 0) {
    console.log("Seeding dummy reports...");
    const savedBookings = await Booking.find({ status: "confirmed" });
    if (savedBookings.length > 0) {
      const dummyReports = [
        {
          patientName: savedBookings[0].patientName,
          email: savedBookings[0].email,
          bookingId: savedBookings[0]._id.toString(),
          testNames: savedBookings[0].details,
          fileUrl: "/reports/sample-report.pdf",
          status: "Approved",
          verifiedBy: "Dr. Rajesh Sharma",
          digitalSignatureUrl: "/signatures/signature-dr-sharma.png",
          version: 1,
        },
      ];
      await Report.insertMany(dummyReports);
    }
  }
}
