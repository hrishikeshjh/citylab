"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Calendar,
  Layers,
  Users,
  Compass,
  FileText,
  Activity,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Search,
  Check,
  X,
  Phone,
  User as UserIcon,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  MapPin,
  ChevronRight,
  Printer,
  Share2,
  CalendarCheck,
  Map,
  Copy,
  Lock,
} from "lucide-react";

/* --- Types -------------------------------------------------------------- */

interface Booking {
  _id: string;
  patientName: string;
  email: string;
  phone: string;
  type: "walk-in" | "online" | "phone" | "home";
  status: "pending" | "confirmed";
  details: string;
  date: string;
}

interface Test {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  preparation: string;
  sampleType: string;
  reportTime: string;
  department: string;
  equipment: string;
  technician: string;
  referenceValues: string;
  featured: boolean;
  visible: boolean;
}

interface HealthPackage {
  _id: string;
  name: string;
  description: string;
  tests: string[];
  price: number;
  originalPrice: number;
  discount: number;
  offerValidity: string;
  popular: boolean;
  categoryTags: string[];
}

interface Doctor {
  _id: string;
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  availableDays: string[];
  consultationFee: number;
  image: string;
  biography: string;
  onlineConsultation: boolean;
  slots: string[];
}

interface Appointment {
  _id: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  patientPhone: string;
  date: string;
  slot: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  notes?: string;
}

interface HomeCollection {
  _id: string;
  bookingId: string;
  patientName: string;
  address: string;
  phone: string;
  collectionTime: string;
  technicianName: string;
  status: "OTP Verification" | "Arrival status" | "Sample collected" | "Sample received" | "Completed" | "Missed";
  notes?: string;
  otp: string;
}

interface Report {
  _id: string;
  patientName: string;
  email: string;
  bookingId: string;
  testNames: string;
  fileUrl?: string;
  status: "Draft" | "Pending Doctor Review" | "Approved";
  verifiedBy?: string;
  digitalSignatureUrl?: string;
  version: number;
}

/* --- Admin Dashboard --------------------------------------------------- */

export default function AdminDashboard() {
  const { user, isAdmin, loading, continueAsGuest, signOut } = useAuth();
  const router = useRouter();

  // Active Tab: dashboard, bookings, tests, packages, doctors, collections, appointments, reports
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // State arrays fetched from DB
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [packages, setPackages] = useState<HealthPackage[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [collections, setCollections] = useState<HomeCollection[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any>(null);

  // Search/Filter states
  const [searchTerm, setSearchTerm] = useState("");

  // Modals & form submissions
  const [bookingForm, setBookingForm] = useState<any>({ patientName: "", email: "", phone: "", type: "walk-in", details: "", date: "" });
  const [testForm, setTestForm] = useState<any>({ name: "", category: "Blood", price: "", description: "", preparation: "", sampleType: "Blood", reportTime: "Same day", department: "Blood Test", equipment: "", technician: "", referenceValues: "Normal range", featured: false, visible: true });
  const [packageForm, setPackageForm] = useState<any>({ name: "", description: "", tests: [], price: "", originalPrice: "", offerValidity: "31st Dec 2026", popular: false, categoryTags: [] });
  const [doctorForm, setDoctorForm] = useState<any>({ name: "", qualification: "", specialization: "", experience: "", availableDays: ["Mon", "Wed", "Fri"], consultationFee: "", biography: "", onlineConsultation: true, slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"] });
  const [appointmentForm, setAppointmentForm] = useState<any>({ doctorId: "", doctorName: "", patientName: "", patientPhone: "", date: "", slot: "", status: "Pending", notes: "" });
  const [reportForm, setReportForm] = useState<any>({ patientName: "", email: "", bookingId: "", testNames: "", status: "Draft" });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<string | null>(null); // booking, test, package, doctor, appointment, report

  // Safe fetch helper to handle DB timeouts and parsing errors gracefully
  const safeFetchJson = async (url: string) => {
    try {
      const r = await fetch(url);
      if (!r.ok) return { success: false };
      return await r.json();
    } catch (err) {
      console.error(`Fetch failed for ${url}:`, err);
      return { success: false };
    }
  };

  // Fetch Data
  const fetchData = async () => {
    const [resB, resT, resP, resD, resA, resC, resR, resS] = await Promise.all([
      safeFetchJson("/api/bookings"),
      safeFetchJson("/api/tests"),
      safeFetchJson("/api/packages"),
      safeFetchJson("/api/doctors"),
      safeFetchJson("/api/appointments"),
      safeFetchJson("/api/home-collections"),
      safeFetchJson("/api/reports"),
      safeFetchJson("/api/admin/stats"),
    ]);

    if (resB?.success) setBookings(resB.bookings);
    if (resT?.success) setTests(resT.tests);
    if (resP?.success) setPackages(resP.packages);
    if (resD?.success) setDoctors(resD.doctors);
    if (resA?.success) setAppointments(resA.appointments);
    if (resC?.success) setCollections(resC.collections);
    if (resR?.success) setReports(resR.reports);
    if (resS?.success) setDashboardStats(resS.stats);
  };

  useEffect(() => {
    if (!loading && isAdmin) {
      fetchData();
    }
  }, [loading, isAdmin]);

  // Auth Guard
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-orange-100 border-t-primary animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center text-white">
          <div className="h-16 w-16 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Access Denied</h1>
          <p className="mt-3 text-sm text-gray-300">
            You do not have administrative privileges. Only authorized emails can access the dashboard.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 rounded-2xl bg-primary text-white text-sm font-semibold transition-all hover:bg-primary-hover hover:shadow-lg cursor-pointer"
            >
              Go to Home Page
            </button>
            {user ? (
              <button
                onClick={async () => {
                  await signOut();
                  router.push("/login");
                }}
                className="w-full py-3 rounded-2xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
              >
                Sign Out &amp; Login as Admin
              </button>
            ) : (
              <button
                onClick={() => {
                  router.push("/login");
                }}
                className="w-full py-3 rounded-2xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
              >
                Login with Admin Account
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* --- CRUD Handlers ---------------------------------------------------- */

  // Generic Submit Wrapper
  const handleCrudSubmit = async (url: string, method: "POST" | "PUT", body: any) => {
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((r) => r.json());

      if (res.success) {
        setShowModal(null);
        setEditingId(null);
        fetchData();
      } else {
        alert("Operation failed: " + res.error);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  // Delete Wrapper
  const handleCrudDelete = async (url: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`${url}?id=${id}`, {
        method: "DELETE",
      }).then((r) => r.json());

      if (res.success) {
        fetchData();
      } else {
        alert("Delete failed: " + res.error);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Admin Bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-primary rounded-xl flex items-center justify-center text-white font-bold">
            C
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground leading-none">City Lab Admin</h1>
            <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Dashboard Panel</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-semibold text-foreground leading-none">{user.displayName || "Administrator"}</p>
            <span className="text-[10px] text-text-secondary">{user.email}</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">
            AD
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white border-r border-gray-100 p-4 space-y-1">
          <p className="text-[11px] font-bold text-text-secondary uppercase px-3 mb-2 tracking-wider">Management</p>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "dashboard" ? "bg-primary-light text-primary" : "text-text-secondary hover:bg-gray-50 hover:text-foreground"
            }`}
          >
            <Activity className="h-4 w-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "bookings" ? "bg-primary-light text-primary" : "text-text-secondary hover:bg-gray-50 hover:text-foreground"
            }`}
          >
            <CalendarCheck className="h-4 w-4" />
            Bookings
          </button>
          <button
            onClick={() => setActiveTab("tests")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "tests" ? "bg-primary-light text-primary" : "text-text-secondary hover:bg-gray-50 hover:text-foreground"
            }`}
          >
            <Layers className="h-4 w-4" />
            Tests Catalog
          </button>
          <button
            onClick={() => setActiveTab("packages")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "packages" ? "bg-primary-light text-primary" : "text-text-secondary hover:bg-gray-50 hover:text-foreground"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            Health Packages
          </button>
          <button
            onClick={() => setActiveTab("collections")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "collections" ? "bg-primary-light text-primary" : "text-text-secondary hover:bg-gray-50 hover:text-foreground"
            }`}
          >
            <Map className="h-4 w-4" />
            Home Collections
          </button>
          <button
            onClick={() => setActiveTab("doctors")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "doctors" ? "bg-primary-light text-primary" : "text-text-secondary hover:bg-gray-50 hover:text-foreground"
            }`}
          >
            <Users className="h-4 w-4" />
            Doctors
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "appointments" ? "bg-primary-light text-primary" : "text-text-secondary hover:bg-gray-50 hover:text-foreground"
            }`}
          >
            <Calendar className="h-4 w-4" />
            Appointments
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "reports" ? "bg-primary-light text-primary" : "text-text-secondary hover:bg-gray-50 hover:text-foreground"
            }`}
          >
            <FileText className="h-4 w-4" />
            Reports Center
          </button>
        </aside>

        {/* Workspace */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Welcome Back, Admin</h2>
                  <p className="text-xs text-text-secondary">Here is an overview of diagnostic laboratory analytics.</p>
                </div>
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all"
                >
                  View Client Site
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Stat Cards */}
              {dashboardStats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4">
                    <div className="h-10 w-10 bg-orange-50 text-primary flex items-center justify-center rounded-xl">
                      <CalendarCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-secondary uppercase">Bookings</p>
                      <h3 className="text-lg font-bold text-foreground mt-0.5">{dashboardStats.bookings.total}</h3>
                      <span className="text-[10px] text-green-600 font-semibold">{dashboardStats.bookings.pending} pending</span>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4">
                    <div className="h-10 w-10 bg-blue-50 text-blue-500 flex items-center justify-center rounded-xl">
                      <Map className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-secondary uppercase">Active Collections</p>
                      <h3 className="text-lg font-bold text-foreground mt-0.5">{dashboardStats.operations.activeCollections}</h3>
                      <span className="text-[10px] text-blue-600 font-semibold">Phlebotomists live</span>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4">
                    <div className="h-10 w-10 bg-green-50 text-green-500 flex items-center justify-center rounded-xl">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-secondary uppercase">Tests Catalog</p>
                      <h3 className="text-lg font-bold text-foreground mt-0.5">{dashboardStats.catalog.tests}</h3>
                      <span className="text-[10px] text-text-secondary font-semibold">{dashboardStats.catalog.packages} packages</span>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4">
                    <div className="h-10 w-10 bg-purple-50 text-purple-500 flex items-center justify-center rounded-xl">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-secondary uppercase">Doctors Available</p>
                      <h3 className="text-lg font-bold text-foreground mt-0.5">{dashboardStats.team.doctors}</h3>
                      <span className="text-[10px] text-purple-600 font-semibold">Daily rosters online</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Bookings and Home Collections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">Recent Activity Logs</h3>
                    <button onClick={() => setActiveTab("bookings")} className="text-xs text-primary font-bold hover:underline">
                      Manage Bookings
                    </button>
                  </div>
                  <div className="space-y-3">
                    {bookings.slice(0, 4).map((b) => (
                      <div key={b._id} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="text-xs font-bold text-foreground">{b.patientName}</p>
                          <span className="text-[10px] text-text-secondary">{b.details}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase ${
                            b.status === "confirmed" ? "bg-green-50 text-green-600 border border-green-200" : "bg-orange-50 text-primary border border-orange-200"
                          }`}>
                            {b.status}
                          </span>
                          <span className="text-[10px] text-text-secondary bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                            {b.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phlebotomy Map Tracking */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">Home Collections Map Simulation</h3>
                    <button onClick={() => setActiveTab("collections")} className="text-xs text-primary font-bold hover:underline">
                      Live Ops
                    </button>
                  </div>
                  {/* Map Simulator */}
                  <div className="h-44 bg-orange-50/50 rounded-xl relative border border-orange-100 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="absolute top-12 left-24 flex flex-col items-center">
                      <div className="h-4 w-4 bg-orange-500 rounded-full animate-ping absolute" />
                      <div className="h-4 w-4 bg-orange-600 rounded-full relative border-2 border-white flex items-center justify-center">
                        <MapPin className="h-2 w-2 text-white" />
                      </div>
                      <span className="text-[8px] bg-white border shadow-sm px-1 rounded mt-1 font-bold text-foreground">Arjun Mehta</span>
                    </div>
                    <div className="absolute bottom-16 right-20 flex flex-col items-center">
                      <div className="h-4 w-4 bg-primary/20 rounded-full animate-pulse flex items-center justify-center">
                        <div className="h-2 w-2 bg-primary rounded-full" />
                      </div>
                      <span className="text-[8px] bg-white border shadow-sm px-1 rounded mt-1 font-bold text-foreground">Lab Main Base</span>
                    </div>
                    <p className="text-[10px] font-semibold text-text-secondary z-10 flex items-center gap-1.5 bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm">
                      <Map className="h-3 w-3 text-primary animate-pulse" />
                      Route optimized: Sandip Pal heading to Bellandur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKING MANAGEMENT */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Booking Registry</h2>
                  <p className="text-xs text-text-secondary">Walk-in, Phone, Online, and Home sample collections.</p>
                </div>
                <button
                  onClick={() => {
                    setBookingForm({ patientName: "", email: "", phone: "", type: "walk-in", details: "", date: "" });
                    setEditingId(null);
                    setShowModal("booking");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl transition-all hover:bg-primary-hover shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New Booking
                </button>
              </div>

              {/* Bookings Table */}
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="p-4 text-xs font-bold text-text-secondary uppercase">Patient Details</th>
                        <th className="p-4 text-xs font-bold text-text-secondary uppercase">Type</th>
                        <th className="p-4 text-xs font-bold text-text-secondary uppercase">Selected Test / Package</th>
                        <th className="p-4 text-xs font-bold text-text-secondary uppercase">Booking Date</th>
                        <th className="p-4 text-xs font-bold text-text-secondary uppercase">Status</th>
                        <th className="p-4 text-xs font-bold text-text-secondary uppercase text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                          <td className="p-4">
                            <p className="text-xs font-bold text-foreground">{b.patientName}</p>
                            <p className="text-[10px] text-text-secondary">{b.email} • {b.phone}</p>
                          </td>
                          <td className="p-4">
                            <span className="text-[10px] font-semibold text-text-secondary uppercase bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                              {b.type}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-foreground font-medium">{b.details}</td>
                          <td className="p-4 text-xs text-text-secondary">
                            {new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => {
                                const newStatus = b.status === "pending" ? "confirmed" : "pending";
                                handleCrudSubmit("/api/bookings", "PUT", { id: b._id, status: newStatus });
                              }}
                              className={`px-2.5 py-1 text-[9px] font-bold rounded-full uppercase border transition-colors ${
                                b.status === "confirmed"
                                  ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                                  : "bg-orange-50 text-primary border-orange-200 hover:bg-orange-100"
                              }`}
                            >
                              {b.status}
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setBookingForm({
                                    patientName: b.patientName,
                                    email: b.email,
                                    phone: b.phone,
                                    type: b.type,
                                    details: b.details,
                                    date: b.date.substring(0, 10),
                                  });
                                  setEditingId(b._id);
                                  setShowModal("booking");
                                }}
                                className="p-1.5 text-text-secondary hover:text-primary rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleCrudDelete("/api/bookings", b._id)}
                                className="p-1.5 text-text-secondary hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TEST MANAGEMENT */}
          {activeTab === "tests" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Diagnostic Tests Catalog</h2>
                  <p className="text-xs text-text-secondary">Configure available blood, urine, endocrine, and pathology parameters.</p>
                </div>
                <button
                  onClick={() => {
                    setTestForm({ name: "", category: "Blood Test", price: "", description: "", preparation: "", sampleType: "Blood", reportTime: "Same day", department: "Blood Test", equipment: "", technician: "", referenceValues: "Normal range", featured: false, visible: true });
                    setEditingId(null);
                    setShowModal("test");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl transition-all hover:bg-primary-hover shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Diagnostic Test
                </button>
              </div>

              {/* Grid of Tests */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {tests.map((t) => (
                  <div key={t._id} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary-light px-2.5 py-0.5 rounded-full">
                          {t.category}
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => {
                              setTestForm({ ...t, price: t.price.toString() });
                              setEditingId(t._id);
                              setShowModal("test");
                            }}
                            className="p-1 text-text-secondary hover:text-primary transition-colors"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleCrudDelete("/api/tests", t._id)}
                            className="p-1 text-text-secondary hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <h3 className="text-sm font-bold text-foreground mt-3">{t.name}</h3>
                      <p className="text-xs text-text-secondary mt-1 leading-relaxed line-clamp-2">{t.description}</p>
                      
                      <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-text-secondary border-t border-gray-50 pt-3">
                        <span className="font-semibold">Preparation: <span className="font-normal">{t.preparation}</span></span>
                        <span className="font-semibold">Turnaround: <span className="font-normal">{t.reportTime}</span></span>
                        <span className="font-semibold">Sample: <span className="font-normal">{t.sampleType}</span></span>
                        <span className="font-semibold">Tech: <span className="font-normal">{t.technician || "Staff"}</span></span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between pt-3 border-t border-gray-50">
                      <span className="text-lg font-black text-foreground">₹{t.price}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${
                        t.visible ? "bg-green-50 text-green-600 border border-green-100" : "bg-gray-100 text-text-secondary"
                      }`}>
                        {t.visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: HEALTH PACKAGES */}
          {activeTab === "packages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Health Packages</h2>
                  <p className="text-xs text-text-secondary">Combine tests into bundled wellness packages with discounted rates.</p>
                </div>
                <button
                  onClick={() => {
                    setPackageForm({ name: "", description: "", tests: [], price: "", originalPrice: "", offerValidity: "31st Dec 2026", popular: false, categoryTags: [] });
                    setEditingId(null);
                    setShowModal("package");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl transition-all hover:bg-primary-hover shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Create Package
                </button>
              </div>

              {/* Grid of Packages */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((p) => (
                  <div key={p._id} className={`bg-white border rounded-3xl p-6 flex flex-col justify-between relative hover:shadow-lg transition-all ${
                    p.popular ? "border-primary bg-primary-lighter shadow-sm" : "border-gray-100"
                  }`}>
                    {p.popular && (
                      <span className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-0.5 text-[9px] font-bold text-white bg-primary rounded-full uppercase">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-foreground">{p.name}</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={async () => {
                              // Duplicate package
                              const { _id, ...rest } = p;
                              const dupName = `${rest.name} (Copy)`;
                              await handleCrudSubmit("/api/packages", "POST", { ...rest, name: dupName });
                            }}
                            title="Duplicate Package"
                            className="p-1 text-text-secondary hover:text-primary transition-colors"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setPackageForm({ ...p, price: p.price.toString(), originalPrice: p.originalPrice.toString() });
                              setEditingId(p._id);
                              setShowModal("package");
                            }}
                            className="p-1 text-text-secondary hover:text-primary transition-colors"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleCrudDelete("/api/packages", p._id)}
                            className="p-1 text-text-secondary hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary mt-2 line-clamp-2">{p.description}</p>
                      
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.categoryTags.map((tag) => (
                          <span key={tag} className="text-[8px] font-bold uppercase bg-white border border-gray-200 px-2 py-0.5 rounded text-text-secondary">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <ul className="mt-5 space-y-2 border-t border-gray-100 pt-4">
                        {p.tests.map((test) => (
                          <li key={test} className="flex items-start gap-2 text-xs text-text-secondary">
                            <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                            {test}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex items-baseline gap-2 border-t border-gray-100 pt-4">
                      <span className="text-2xl font-black text-foreground">₹{p.price}</span>
                      <span className="text-xs text-text-secondary line-through">₹{p.originalPrice}</span>
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        {p.discount}% OFF
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: HOME COLLECTION */}
          {activeTab === "collections" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Home Sample Collections Operations</h2>
                <p className="text-xs text-text-secondary">Assign phlebotomists, track sample collection status, and enter technician notes.</p>
              </div>

              {/* Collections Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {collections.map((col) => (
                  <div key={col._id} className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-foreground">{col.patientName}</p>
                          <p className="text-[10px] text-text-secondary">{col.phone}</p>
                        </div>
                        <span className={`px-2.5 py-1 text-[9px] font-bold rounded-full uppercase border ${
                          col.status === "Completed" ? "bg-green-50 text-green-600 border-green-200" : "bg-orange-50 text-primary border-orange-200"
                        }`}>
                          {col.status}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2 border-t border-gray-50 pt-4 text-xs text-text-secondary">
                        <p className="flex items-start gap-1.5">
                          <MapPin className="h-4 w-4 text-primary shrink-0" />
                          <span>{col.address}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>Slot: {col.collectionTime}</span>
                        </p>
                      </div>

                      {/* Live Status Updator */}
                      <div className="mt-5 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-bold uppercase text-foreground tracking-wider mb-3">Live Phlebotomy Milestones</p>
                        <div className="grid grid-cols-2 gap-2">
                          {["Arrival status", "Sample collected", "Sample received", "Completed", "Missed"].map((s) => (
                            <button
                              key={s}
                              onClick={() => handleCrudSubmit("/api/home-collections", "PUT", { id: col._id, status: s })}
                              className={`text-left px-3 py-1.5 rounded-xl border text-[10px] font-semibold transition-all ${
                                col.status === s ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-gray-200 hover:border-primary/20"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tech Assignment */}
                      <div className="mt-4 flex items-center gap-3 justify-between">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-foreground uppercase mb-1">Assigned Technician</label>
                          <select
                            value={col.technicianName}
                            onChange={(e) => handleCrudSubmit("/api/home-collections", "PUT", { id: col._id, technicianName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs font-semibold focus:outline-none"
                          >
                            <option value="To Be Assigned">Unassigned</option>
                            <option value="Sandip Pal (Phlebotomist)">Sandip Pal (Senior Phlebotomist)</option>
                            <option value="Javed Khan (Technician)">Javed Khan (Technician)</option>
                            <option value="Meera Nair (Staff)">Meera Nair (Field Collector)</option>
                          </select>
                        </div>
                        
                        {/* OTP Check Simulator */}
                        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 flex flex-col items-center justify-center">
                          <span className="text-[9px] font-bold uppercase text-primary leading-none">Security OTP</span>
                          <span className="text-sm font-black text-primary mt-1 tracking-widest">{col.otp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: DOCTORS */}
          {activeTab === "doctors" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Doctor Roster Management</h2>
                  <p className="text-xs text-text-secondary">Configure diagnostic pathologists, consultants, fees, and daily slot schedules.</p>
                </div>
                <button
                  onClick={() => {
                    setDoctorForm({ name: "", qualification: "", specialization: "", experience: "", availableDays: ["Mon", "Wed", "Fri"], consultationFee: "", biography: "", onlineConsultation: true, slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"] });
                    setEditingId(null);
                    setShowModal("doctor");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl transition-all hover:bg-primary-hover shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Doctor
                </button>
              </div>

              {/* Grid of Doctors */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {doctors.map((doc) => (
                  <div key={doc._id} className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-xl font-bold overflow-hidden">
                          {doc.image ? <img src={doc.image} alt="" className="h-full w-full object-cover" /> : doc.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground">{doc.name}</h3>
                          <p className="text-[10px] font-semibold text-primary uppercase mt-0.5">{doc.specialization}</p>
                          <p className="text-[10px] text-text-secondary mt-0.5">{doc.qualification} • {doc.experience}</p>
                        </div>
                      </div>

                      <p className="text-xs text-text-secondary mt-4 leading-relaxed line-clamp-2">{doc.biography}</p>

                      <div className="mt-4 border-t border-gray-50 pt-4 space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {doc.availableDays.map((day) => (
                            <span key={day} className="text-[9px] font-bold bg-gray-100 border text-text-secondary px-2 py-0.5 rounded">
                              {day}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold text-text-secondary">Consultation slots:</span>
                          <span className="text-[10px] font-medium text-foreground">{doc.slots.join(", ")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                      <span className="text-base font-bold text-foreground">₹{doc.consultationFee} <span className="text-[10px] text-text-secondary font-normal">Fee</span></span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setDoctorForm({ ...doc, consultationFee: doc.consultationFee.toString() });
                            setEditingId(doc._id);
                            setShowModal("doctor");
                          }}
                          className="p-1 text-text-secondary hover:text-primary transition-colors"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleCrudDelete("/api/doctors", doc._id)}
                          className="p-1 text-text-secondary hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: APPOINTMENTS */}
          {activeTab === "appointments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Appointment Calendar</h2>
                  <p className="text-xs text-text-secondary">Schedule and reschedule patient consultations with rostered pathologists.</p>
                </div>
                <button
                  onClick={() => {
                    setAppointmentForm({ doctorId: doctors[0]?._id || "", doctorName: doctors[0]?.name || "", patientName: "", patientPhone: "", date: "", slot: "10:00 AM", status: "Pending", notes: "" });
                    setEditingId(null);
                    setShowModal("appointment");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl transition-all hover:bg-primary-hover shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New Appointment
                </button>
              </div>

              {/* Appointments List */}
              <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="p-4 text-xs font-bold text-text-secondary uppercase">Patient</th>
                        <th className="p-4 text-xs font-bold text-text-secondary uppercase">Pathologist / Doctor</th>
                        <th className="p-4 text-xs font-bold text-text-secondary uppercase">Schedule Slot</th>
                        <th className="p-4 text-xs font-bold text-text-secondary uppercase">Status</th>
                        <th className="p-4 text-xs font-bold text-text-secondary uppercase text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appt) => (
                        <tr key={appt._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                          <td className="p-4">
                            <p className="text-xs font-bold text-foreground">{appt.patientName}</p>
                            <p className="text-[10px] text-text-secondary">{appt.patientPhone}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-xs font-bold text-foreground">{appt.doctorName}</p>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5 text-primary" />
                              <span className="text-xs font-medium text-foreground">{appt.date} • {appt.slot}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <select
                              value={appt.status}
                              onChange={(e) => handleCrudSubmit("/api/appointments", "PUT", { id: appt._id, status: e.target.value })}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-xl border focus:outline-none ${
                                appt.status === "Confirmed" ? "bg-green-50 text-green-600 border-green-200" :
                                appt.status === "Cancelled" ? "bg-red-50 text-red-600 border-red-200" : "bg-orange-50 text-primary border-orange-200"
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setAppointmentForm({ ...appt });
                                  setEditingId(appt._id);
                                  setShowModal("appointment");
                                }}
                                className="p-1.5 text-text-secondary hover:text-primary rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleCrudDelete("/api/appointments", appt._id)}
                                className="p-1.5 text-text-secondary hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: REPORTS */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Diagnostic Report Center</h2>
                  <p className="text-xs text-text-secondary">Approve patient reports, apply digital signatures, track versions, and share.</p>
                </div>
                <button
                  onClick={() => {
                    setReportForm({ patientName: "", email: "", bookingId: "", testNames: "", status: "Draft" });
                    setEditingId(null);
                    setShowModal("report");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl transition-all hover:bg-primary-hover shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Generate Report
                </button>
              </div>

              {/* Reports List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((rep) => (
                  <div key={rep._id} className="bg-white border border-gray-100 rounded-3xl p-6 space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-foreground">{rep.patientName}</h3>
                        <span className="text-[10px] text-text-secondary">{rep.email}</span>
                      </div>
                      <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded uppercase border ${
                        rep.status === "Approved" ? "bg-green-50 text-green-600 border-green-200" : "bg-orange-50 text-primary border-orange-200"
                      }`}>
                        {rep.status}
                      </span>
                    </div>

                    <div className="border-t border-b border-gray-50 py-3 text-xs text-foreground font-medium">
                      Tests: <span className="font-semibold text-text-secondary">{rep.testNames}</span>
                    </div>

                    {/* PDF & Verification Controls */}
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <div>
                        <p className="text-[9px] text-text-secondary leading-none">Verified By</p>
                        <p className="font-bold text-foreground mt-1">{rep.verifiedBy || "No doctor assigned"}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-text-secondary leading-none">Doc Version</p>
                        <p className="font-bold text-foreground mt-1">v{rep.version}</p>
                      </div>
                    </div>

                    {/* Action Hub */}
                    <div className="flex gap-2 pt-2">
                      {rep.status !== "Approved" && (
                        <button
                          onClick={() => handleCrudSubmit("/api/reports", "PUT", {
                            id: rep._id,
                            status: "Approved",
                            verifiedBy: "Dr. Rajesh Sharma",
                            digitalSignatureUrl: "/signatures/signature-dr-sharma.png"
                          })}
                          className="flex-1 inline-flex items-center justify-center gap-1 py-2 bg-green-600 text-white text-xs font-bold rounded-xl transition-all hover:bg-green-700"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          Sign &amp; Approve
                        </button>
                      )}
                      
                      <button
                        onClick={() => alert(`Report link: http://localhost:3000${rep.fileUrl || "/reports/placeholder.pdf"}`)}
                        className="p-2 text-text-secondary border border-gray-200 rounded-xl hover:text-primary hover:border-primary/20 transition-all"
                        title="Download Report"
                      >
                        <Printer className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => alert(`Sharing report with ${rep.email} on WhatsApp and Email.`)}
                        className="p-2 text-text-secondary border border-gray-200 rounded-xl hover:text-primary hover:border-primary/20 transition-all"
                        title="Share Report"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleCrudDelete("/api/reports", rep._id)}
                        className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Report"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- Modals -------------------------------------------------------- */}

      {/* 1. BOOKING MODAL */}
      {showModal === "booking" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-foreground">{editingId ? "Edit Booking" : "New Booking"}</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-text-secondary mb-1">Patient Name</label>
                <input
                  type="text"
                  value={bookingForm.patientName}
                  onChange={(e) => setBookingForm({ ...bookingForm, patientName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Email</label>
                  <input
                    type="email"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Phone</label>
                  <input
                    type="text"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Booking Type</label>
                  <select
                    value={bookingForm.type}
                    onChange={(e) => setBookingForm({ ...bookingForm, type: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="walk-in">Walk-in</option>
                    <option value="online">Online</option>
                    <option value="phone">Phone</option>
                    <option value="home">Home collection</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Booking Date</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Selected Tests/Packages</label>
                <input
                  type="text"
                  placeholder="e.g. Complete Blood Count"
                  value={bookingForm.details}
                  onChange={(e) => setBookingForm({ ...bookingForm, details: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 py-2.5 border rounded-xl font-semibold text-text-secondary hover:bg-gray-50 transition-colors text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCrudSubmit("/api/bookings", editingId ? "PUT" : "POST", editingId ? { id: editingId, ...bookingForm } : bookingForm)}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold transition-all hover:bg-primary-hover text-xs"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. TEST MODAL */}
      {showModal === "test" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 my-8">
            <h3 className="text-base font-bold text-foreground">{editingId ? "Edit Diagnostic Test" : "Add Diagnostic Test"}</h3>
            <div className="space-y-3 text-xs grid grid-cols-2 gap-x-4">
              <div className="col-span-2">
                <label className="block font-bold text-text-secondary mb-1">Test Name</label>
                <input
                  type="text"
                  value={testForm.name}
                  onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Category</label>
                <select
                  value={testForm.category}
                  onChange={(e) => setTestForm({ ...testForm, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value="Blood">Blood</option>
                  <option value="Urine">Urine</option>
                  <option value="Hormones">Hormones</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Biochemistry">Biochemistry</option>
                  <option value="Microbiology">Microbiology</option>
                  <option value="Pathology">Pathology</option>
                  <option value="Radiology">Radiology</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={testForm.price}
                  onChange={(e) => setTestForm({ ...testForm, price: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Turnaround Report Time</label>
                <input
                  type="text"
                  value={testForm.reportTime}
                  onChange={(e) => setTestForm({ ...testForm, reportTime: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Sample Type</label>
                <input
                  type="text"
                  value={testForm.sampleType}
                  onChange={(e) => setTestForm({ ...testForm, sampleType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-bold text-text-secondary mb-1">Description</label>
                <textarea
                  value={testForm.description}
                  onChange={(e) => setTestForm({ ...testForm, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl h-16"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-bold text-text-secondary mb-1">Preparation Instructions</label>
                <input
                  type="text"
                  value={testForm.preparation}
                  onChange={(e) => setTestForm({ ...testForm, preparation: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Equipment Used</label>
                <input
                  type="text"
                  value={testForm.equipment}
                  onChange={(e) => setTestForm({ ...testForm, equipment: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1 font-sans">Lab Technician</label>
                <input
                  type="text"
                  value={testForm.technician}
                  onChange={(e) => setTestForm({ ...testForm, technician: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-bold text-text-secondary mb-1">Biological Reference Range / Normal Values</label>
                <input
                  type="text"
                  value={testForm.referenceValues}
                  onChange={(e) => setTestForm({ ...testForm, referenceValues: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 py-2.5 border rounded-xl font-semibold text-text-secondary hover:bg-gray-50 transition-colors text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCrudSubmit("/api/tests", editingId ? "PUT" : "POST", editingId ? { id: editingId, ...testForm } : testForm)}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold transition-all hover:bg-primary-hover text-xs"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. PACKAGE MODAL */}
      {showModal === "package" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 my-8">
            <h3 className="text-base font-bold text-foreground">{editingId ? "Edit Health Package" : "Create Health Package"}</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-text-secondary mb-1">Package Name</label>
                <input
                  type="text"
                  value={packageForm.name}
                  onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Description</label>
                <textarea
                  value={packageForm.description}
                  onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl h-16"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Offer Price (₹)</label>
                  <input
                    type="number"
                    value={packageForm.price}
                    onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={packageForm.originalPrice}
                    onChange={(e) => setPackageForm({ ...packageForm, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Included Tests (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. CBC, Lipid Profile, Thyroid"
                  value={Array.isArray(packageForm.tests) ? packageForm.tests.join(", ") : packageForm.tests}
                  onChange={(e) => setPackageForm({ ...packageForm, tests: e.target.value.split(",").map((s: string) => s.trim()) })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Package Badges / Type (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Women's Wellness, Corporate, Senior"
                  value={Array.isArray(packageForm.categoryTags) ? packageForm.categoryTags.join(", ") : packageForm.categoryTags}
                  onChange={(e) => setPackageForm({ ...packageForm, categoryTags: e.target.value.split(",").map((s: string) => s.trim()) })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="popular-pkg"
                  type="checkbox"
                  checked={packageForm.popular}
                  onChange={(e) => setPackageForm({ ...packageForm, popular: e.target.checked })}
                  className="rounded text-primary focus:ring-primary"
                />
                <label htmlFor="popular-pkg" className="font-bold text-text-secondary">Popular Badge</label>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 py-2.5 border rounded-xl font-semibold text-text-secondary hover:bg-gray-50 transition-colors text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCrudSubmit("/api/packages", editingId ? "PUT" : "POST", editingId ? { id: editingId, ...packageForm } : packageForm)}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold transition-all hover:bg-primary-hover text-xs"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. DOCTOR MODAL */}
      {showModal === "doctor" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 my-8">
            <h3 className="text-base font-bold text-foreground">{editingId ? "Edit Doctor Profile" : "Add Doctor Profile"}</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-text-secondary mb-1">Doctor Name</label>
                <input
                  type="text"
                  value={doctorForm.name}
                  onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Specialization</label>
                  <input
                    type="text"
                    value={doctorForm.specialization}
                    onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Experience</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 Years"
                    value={doctorForm.experience}
                    onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Qualifications</label>
                  <input
                    type="text"
                    value={doctorForm.qualification}
                    onChange={(e) => setDoctorForm({ ...doctorForm, qualification: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Fee (₹)</label>
                  <input
                    type="number"
                    value={doctorForm.consultationFee}
                    onChange={(e) => setDoctorForm({ ...doctorForm, consultationFee: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Available Consultation Slots (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. 09:00 AM, 10:00 AM, 02:00 PM"
                  value={Array.isArray(doctorForm.slots) ? doctorForm.slots.join(", ") : doctorForm.slots}
                  onChange={(e) => setDoctorForm({ ...doctorForm, slots: e.target.value.split(",").map((s: string) => s.trim()) })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Biography</label>
                <textarea
                  value={doctorForm.biography}
                  onChange={(e) => setDoctorForm({ ...doctorForm, biography: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl h-16"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 py-2.5 border rounded-xl font-semibold text-text-secondary hover:bg-gray-50 transition-colors text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCrudSubmit("/api/doctors", editingId ? "PUT" : "POST", editingId ? { id: editingId, ...doctorForm } : doctorForm)}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold transition-all hover:bg-primary-hover text-xs"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. APPOINTMENT MODAL */}
      {showModal === "appointment" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-foreground">Roster Consultation Appointment</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-text-secondary mb-1">Select Pathologist</label>
                <select
                  value={appointmentForm.doctorId}
                  onChange={(e) => {
                    const doc = doctors.find((d) => d._id === e.target.value);
                    setAppointmentForm({ ...appointmentForm, doctorId: e.target.value, doctorName: doc ? doc.name : "" });
                  }}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value="">Choose Doctor</option>
                  {doctors.map((d) => (
                    <option key={d._id} value={d._id}>{d.name} ({d.specialization})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Patient Name</label>
                <input
                  type="text"
                  value={appointmentForm.patientName}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, patientName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Patient Phone</label>
                <input
                  type="text"
                  value={appointmentForm.patientPhone}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, patientPhone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Date</label>
                  <input
                    type="date"
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Consultation Time Slot</label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM"
                    value={appointmentForm.slot}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, slot: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 py-2.5 border rounded-xl font-semibold text-text-secondary hover:bg-gray-50 transition-colors text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCrudSubmit("/api/appointments", editingId ? "PUT" : "POST", editingId ? { id: editingId, ...appointmentForm } : appointmentForm)}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold transition-all hover:bg-primary-hover text-xs"
              >
                Book Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. REPORT MODAL */}
      {showModal === "report" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-foreground">Generate Lab Report Draft</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-text-secondary mb-1">Patient Name</label>
                <input
                  type="text"
                  value={reportForm.patientName}
                  onChange={(e) => setReportForm({ ...reportForm, patientName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Patient Email</label>
                <input
                  type="email"
                  value={reportForm.email}
                  onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Booking Ref ID</label>
                  <input
                    type="text"
                    value={reportForm.bookingId}
                    onChange={(e) => setReportForm({ ...reportForm, bookingId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-text-secondary mb-1">Status</label>
                  <select
                    value={reportForm.status}
                    onChange={(e) => setReportForm({ ...reportForm, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Pending Doctor Review">Pending Doctor Review</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-text-secondary mb-1">Report Parameters / Test Name</label>
                <input
                  type="text"
                  placeholder="e.g. Haemoglobin, Thyroid Profile"
                  value={reportForm.testNames}
                  onChange={(e) => setReportForm({ ...reportForm, testNames: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 py-2.5 border rounded-xl font-semibold text-text-secondary hover:bg-gray-50 transition-colors text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCrudSubmit("/api/reports", editingId ? "PUT" : "POST", editingId ? { id: editingId, ...reportForm } : reportForm)}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold transition-all hover:bg-primary-hover text-xs"
              >
                Generate Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
