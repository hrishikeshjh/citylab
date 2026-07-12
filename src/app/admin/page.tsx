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
  Settings as SettingsIcon,
  Bell,
  Eye,
  Star,
  HelpCircle,
  Mail,
  Shield,
  FileCode,
  Image,
  RefreshCw,
  LogOut,
  Sliders,
  AlertOctagon,
} from "lucide-react";

/* --- Types --- */

interface Booking {
  _id: string;
  patientName: string;
  email: string;
  phone: string;
  type: "walk-in" | "online" | "phone" | "home";
  status: "pending" | "confirmed" | "sample-scheduled" | "sample-collected" | "processing" | "report-ready" | "completed" | "cancelled";
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
  active?: boolean;
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
  active?: boolean;
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
  status: "Draft" | "Pending Doctor Review" | "Approved" | "Ready" | "Delivered";
  verifiedBy?: string;
  digitalSignatureUrl?: string;
  version: number;
}

interface Patient {
  _id: string;
  name: string;
  email: string;
  phone: string;
  medicalHistory: string;
  previousReports: string[];
  bookingHistory: string[];
  consultationHistory: string[];
  notes: string;
}

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "archived";
  createdAt: string;
}

interface Testimonial {
  _id: string;
  patientName: string;
  rating: number;
  reviewText: string;
  status: "pending" | "approved" | "rejected";
  featured: boolean;
}

interface GalleryImage {
  _id: string;
  fileUrl: string;
  category: "Laboratory" | "Doctors" | "Equipment" | "Reception" | "Events";
  displayOrder: number;
  description?: string;
}

interface Article {
  _id: string;
  title: string;
  coverImage: string;
  author: string;
  category: string;
  readingTime: string;
  seoTitle?: string;
  metaDescription?: string;
  tags?: string[];
  status: "Draft" | "Published";
}

interface AuditLog {
  _id: string;
  adminEmail: string;
  adminName: string;
  action: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const router = useRouter();

  // Navigation tab state (18 specific tabs)
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // DB States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [packages, setPackages] = useState<HealthPackage[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [collections, setCollections] = useState<HomeCollection[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [settings, setSettings] = useState<any>({
    labName: "City Lab Diagnostic Centre",
    heroHeadline: "Accurate Diagnostics. Trusted Care.",
    heroSubheading: "Book blood tests and full body checkups online.",
    aboutText: "Pioneering state-of-the-art diagnostic testing.",
  });

  // Notifications List State
  const [notifications, setNotifications] = useState<any[]>([
    { id: "1", type: "Website Announcement", title: "Free Health Camp on 15th July", status: "Published" },
    { id: "2", type: "Health Awareness Notice", title: "Monsoon Health Checkup Packages released", status: "Published" },
  ]);

  // Analytics Stats State
  const [analytics, setAnalytics] = useState({
    visitors: 4520,
    registrationGrowth: "+12% this month",
    mostBookedTest: "Complete Blood Count (CBC)",
    popularPackage: "Diabetes Health Screening",
  });

  // Admin Account List State
  const [admins, setAdmins] = useState<any[]>([
    { id: "1", name: "Super Admin", email: "admin@citylab.com", role: "Super Admin", status: "Active" },
    { id: "2", name: "Dr. Rajesh Sharma", email: "rajesh@citylab.com", role: "Doctor", status: "Active" },
    { id: "3", name: "Mohit reception", email: "reception@citylab.com", role: "Reception", status: "Active" },
  ]);

  // Search & Filter Term
  const [searchTerm, setSearchTerm] = useState("");

  // Modals & form states
  const [showModal, setShowModal] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});

  /* ── Fetch Helper ────────────────────────────────────────────────── */
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

  const fetchData = async () => {
    const [resB, resT, resP, resD, resA, resC, resR, resS, resE, resTe, resG, resL] = await Promise.all([
      safeFetchJson("/api/bookings"),
      safeFetchJson("/api/tests"),
      safeFetchJson("/api/packages"),
      safeFetchJson("/api/doctors"),
      safeFetchJson("/api/appointments"),
      safeFetchJson("/api/home-collections"),
      safeFetchJson("/api/reports"),
      safeFetchJson("/api/admin/settings"),
      safeFetchJson("/api/admin/enquiries"),
      safeFetchJson("/api/admin/testimonials"),
      safeFetchJson("/api/admin/gallery"),
      safeFetchJson("/api/admin/logs"),
    ]);

    if (resB?.success) setBookings(resB.bookings);
    if (resT?.success) setTests(resT.tests);
    if (resP?.success) setPackages(resP.packages);
    if (resD?.success) setDoctors(resD.doctors);
    if (resA?.success) setAppointments(resA.appointments);
    if (resC?.success) setCollections(resC.collections);
    if (resR?.success) setReports(resR.reports);
    if (resS?.success) setSettings(resS.settings);
    if (resE?.success) setEnquiries(resE.enquiries);
    if (resTe?.success) setTestimonials(resTe.testimonials);
    if (resG?.success) setGallery(resG.images);
    if (resL?.success) setLogs(resL.logs);

    // Populate mock patients list from bookings for visual demo
    if (resB?.success) {
      const uniquePatients = resB.bookings.reduce((acc: Patient[], curr: Booking) => {
        if (!acc.some((p) => p.email === curr.email)) {
          acc.push({
            _id: curr._id,
            name: curr.patientName,
            email: curr.email,
            phone: curr.phone,
            medicalHistory: "Routine monitoring checks. No severe history recorded.",
            previousReports: ["CBC Report", "Thyroid Profile"],
            bookingHistory: [`${curr.details} - ${curr.date.split("T")[0]}`],
            consultationHistory: ["Dr. Ananya Sharma (General Physician)"],
            notes: "Fasting required for blood sugar evaluations.",
          });
        }
        return acc;
      }, []);
      setPatients(uniquePatients);
    }
  };

  useEffect(() => {
    if (!loading && isAdmin) {
      fetchData();
    }
  }, [loading, isAdmin]);

  // Auth Protection Block
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
            You do not have administrative privileges. Only authorized emails can access this console dashboard.
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

  /* ── Submit Handler wrappers ─────────────────────────────────────── */
  const handleCrudAction = async (url: string, method: "POST" | "PUT" | "DELETE", data?: any) => {
    try {
      const opts: any = {
        method,
        headers: { "Content-Type": "application/json" },
      };
      if (data) opts.body = JSON.stringify(data);

      const res = await fetch(url, opts);
      if (res.ok) {
        // Record Audit log dynamically
        await fetch("/api/admin/logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            adminEmail: user.email,
            adminName: user.displayName || "Admin",
            action: `${method}_ACTION`,
            details: `Admin performed ${method} operation on ${url}`,
          }),
        });
        fetchData();
        setShowModal(null);
        setSelectedItem(null);
      } else {
        alert("Operation failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ── Sidebar Items ────────────────────────────────────────────────── */
  const menuItems = [
    { id: "dashboard", label: "Overview", icon: Layers },
    { id: "patients", label: "👥 Patients", icon: Users },
    { id: "bookings", label: "📅 Bookings", icon: CalendarCheck },
    { id: "tests", label: "🧪 Tests", icon: Activity },
    { id: "packages", label: "❤️ Packages", icon: Sparkles },
    { id: "doctors", label: "👨‍⚕️ Doctors", icon: Compass },
    { id: "reports", label: "📄 Reports", icon: FileText },
    { id: "collections", label: "🏠 Collections", icon: MapPin },
    { id: "cms", label: "🌐 CMS Website", icon: FileCode },
    { id: "gallery", label: "🖼 Gallery", icon: Image },
    { id: "testimonials", label: "⭐ Reviews", icon: Star },
    { id: "faqs", label: "❓ FAQs", icon: HelpCircle },
    { id: "enquiries", label: "📩 Enquiries", icon: Mail },
    { id: "notifications", label: "🔔 Alerts", icon: Bell },
    { id: "analytics", label: "📊 Analytics", icon: TrendingUp },
    { id: "admins", label: "👤 Administrators", icon: Shield },
    { id: "security", label: "🔒 Security Logs", icon: Lock },
    { id: "settings", label: "⚙️ Settings", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      {/* ── Top bar ── */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <img src="/images/logo.svg" alt="City Lab" className="h-9 w-auto" />
          <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
            Console
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="px-3.5 py-1.5 border border-gray-200 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Back to Site
          </button>
          <div className="h-7 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
              A
            </div>
            <span className="text-xs font-bold text-gray-700 hidden sm:inline">
              {user.displayName || user.email?.split("@")[0]}
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* ── Sidebar Menu ── */}
        <aside className="w-64 bg-white border-r border-gray-200 p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-69px)] sticky top-[69px]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSearchTerm("");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  active
                    ? "bg-primary/5 text-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${active ? "text-primary" : "text-gray-400"}`} />
                {item.label}
              </button>
            );
          })}
        </aside>

        {/* ── Main Workspace ── */}
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Total Patients", val: patients.length, change: "Updated live" },
                  { title: "Today's Bookings", val: bookings.length, change: "Pending review" },
                  { title: "Home Collections", val: collections.length, change: "Phlebotomist active" },
                  { title: "Pending Reports", val: reports.filter((r) => r.status !== "Approved").length, change: "Need verify" },
                ].map((card, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{card.val}</p>
                    <p className="text-[10px] text-green-600 mt-1 font-medium">{card.change}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Feed */}
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-800 mb-4">Quick Activity Feed</h3>
                  <div className="space-y-3">
                    {[
                      { action: "New patient registered", desc: "Hrishikesh Jha completed profile sign up", time: "5 mins ago" },
                      { action: "Test booked", desc: "CBC test booked by Sunita Rao", time: "12 mins ago" },
                      { action: "Home collection requested", desc: "Slot Tomorrow 9am Bellandur address", time: "30 mins ago" },
                      { action: "Report uploaded", desc: "Dr. Sharma signed sample report PDF", time: "1 hour ago" },
                      { action: "Doctor appointment booked", desc: "Dr. Ananya Sharma with Amit Verma", time: "2 hours ago" },
                    ].map((act, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 text-xs">
                        <div>
                          <p className="font-bold text-gray-800">{act.action}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{act.desc}</p>
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">{act.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">Quick Actions</h3>
                  <button
                    onClick={() => {
                      setEditForm({});
                      setShowModal("add-patient");
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all"
                  >
                    <Plus className="h-4 w-4" /> Add Patient
                  </button>
                  <button
                    onClick={() => {
                      setEditForm({});
                      setShowModal("add-test");
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold transition-all"
                  >
                    <Plus className="h-4 w-4 text-gray-400" /> Add Test
                  </button>
                  <button
                    onClick={() => {
                      setEditForm({});
                      setShowModal("upload-report");
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold transition-all"
                  >
                    <FileText className="h-4 w-4 text-gray-400" /> Upload Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PATIENT MANAGEMENT */}
          {activeTab === "patients" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">👥 Patient Directory</h2>
                <button
                  onClick={() => {
                    setEditForm({});
                    setShowModal("add-patient");
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover cursor-pointer"
                >
                  Add Patient
                </button>
              </div>

              {/* Table */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-500">
                      <th className="p-4 font-bold">Patient Name</th>
                      <th className="p-4 font-bold">Email</th>
                      <th className="p-4 font-bold">Phone</th>
                      <th className="p-4 font-bold">Notes</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((pat) => (
                      <tr key={pat._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="p-4 font-bold text-gray-900">{pat.name}</td>
                        <td className="p-4">{pat.email}</td>
                        <td className="p-4 font-medium">{pat.phone}</td>
                        <td className="p-4 text-gray-500 truncate max-w-[200px]">{pat.notes}</td>
                        <td className="p-4 text-right flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedItem(pat);
                              setShowModal("view-patient");
                            }}
                            className="p-1.5 rounded-lg text-primary hover:bg-primary/5"
                            title="View Profile"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedItem(pat);
                              setEditForm(pat);
                              setShowModal("edit-patient");
                            }}
                            className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: BOOKING MANAGEMENT */}
          {activeTab === "bookings" && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-lg font-bold text-gray-800">📅 Booking Management</h2>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-500">
                      <th className="p-4 font-bold">Patient</th>
                      <th className="p-4 font-bold">Tests</th>
                      <th className="p-4 font-bold">Type</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((book) => (
                      <tr key={book._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="p-4">
                          <p className="font-bold text-gray-900">{book.patientName}</p>
                          <p className="text-[10px] text-gray-500">{book.phone}</p>
                        </td>
                        <td className="p-4 font-medium">{book.details}</td>
                        <td className="p-4 capitalize">{book.type}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                            book.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {book.status}
                          </span>
                        </td>
                        <td className="p-4 text-right flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditForm({ id: book._id, status: "confirmed" });
                              handleCrudAction("/api/bookings", "PUT", { id: book._id, status: "confirmed" });
                            }}
                            className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-lg border border-green-200 hover:bg-green-100"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              alert("Printing booking slip reference ID: " + book._id);
                            }}
                            className="p-1 text-gray-500 hover:text-gray-800"
                            title="Print Slip"
                          >
                            <Printer className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleCrudAction(`/api/bookings?id=${book._id}`, "DELETE")}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: TEST DIRECTORY */}
          {activeTab === "tests" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">🧪 Laboratory Catalog</h2>
                <button
                  onClick={() => {
                    setEditForm({ visible: true, featured: false, category: "Blood" });
                    setShowModal("add-test");
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover"
                >
                  Create Test
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-500">
                      <th className="p-4 font-bold">Test Name</th>
                      <th className="p-4 font-bold">Category</th>
                      <th className="p-4 font-bold">Price</th>
                      <th className="p-4 font-bold">Featured</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((test) => (
                      <tr key={test._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="p-4 font-bold text-gray-900">{test.name}</td>
                        <td className="p-4">{test.category}</td>
                        <td className="p-4 font-bold text-primary">₹{test.price}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            test.featured ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-600"
                          }`}>
                            {test.featured ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="p-4 text-right flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedItem(test);
                              setEditForm(test);
                              setShowModal("edit-test");
                            }}
                            className="p-1 rounded text-gray-600 hover:bg-gray-100"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleCrudAction(`/api/tests?id=${test._id}`, "DELETE")}
                            className="p-1 rounded text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: CMS WEBSITE SETTINGS */}
          {activeTab === "cms" && (
            <div className="space-y-6 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm animate-fadeIn">
              <h2 className="text-lg font-bold text-gray-800">🌐 Website Content Management (CMS)</h2>
              <p className="text-xs text-gray-500">Edit homepage messaging and statistics directly without modifying code.</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCrudAction("/api/admin/settings", "POST", settings);
                }}
                className="space-y-4 pt-4"
              >
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Hero Banner Headline</label>
                  <input
                    type="text"
                    value={settings.heroHeadline || ""}
                    onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Hero Subheading</label>
                  <textarea
                    rows={2}
                    value={settings.heroSubheading || ""}
                    onChange={(e) => setSettings({ ...settings, heroSubheading: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">About Section Text</label>
                  <textarea
                    rows={3}
                    value={settings.aboutText || ""}
                    onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover cursor-pointer"
                >
                  Save CMS Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 13: HEALTH ENQUIRIES */}
          {activeTab === "enquiries" && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-lg font-bold text-gray-800">📩 Customer Enquiries &amp; Messages</h2>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-500">
                      <th className="p-4 font-bold">Name</th>
                      <th className="p-4 font-bold">Contact</th>
                      <th className="p-4 font-bold">Subject</th>
                      <th className="p-4 font-bold">Message</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="p-4 font-bold text-gray-900">{enq.name}</td>
                        <td className="p-4">
                          <p>{enq.email}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{enq.phone}</p>
                        </td>
                        <td className="p-4 font-medium text-primary">{enq.subject}</td>
                        <td className="p-4 text-gray-500 max-w-[200px] truncate">{enq.message}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              alert("Email reply composition trigger sent to: " + enq.email);
                            }}
                            className="px-2.5 py-1 text-[10px] bg-primary/10 text-primary font-bold rounded-lg border border-primary/20 hover:bg-primary/20"
                          >
                            Reply
                          </button>
                        </td>
                      </tr>
                    ))}
                    {enquiries.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-400">
                          No customer enquiries submitted yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 15: ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-6 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm animate-fadeIn">
              <h2 className="text-lg font-bold text-gray-800">📊 Analytics Dashboard (Operational)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {[
                  { label: "Total Website Visitors", value: analytics.visitors },
                  { label: "Most Booked Tests", value: "Complete Blood Count" },
                  { label: "Registrations growth", value: analytics.registrationGrowth },
                  { label: "Home Collection orders", value: collections.length },
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-sm font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 17: SECURITY AND AUDIT LOGS */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-lg font-bold text-gray-800">🔒 System Activity &amp; Audit Logs</h2>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-500">
                      <th className="p-4 font-bold">Admin</th>
                      <th className="p-4 font-bold">Action</th>
                      <th className="p-4 font-bold">Details</th>
                      <th className="p-4 font-bold text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log._id} className="border-b border-gray-100">
                        <td className="p-4">
                          <p className="font-bold text-gray-900">{log.adminName}</p>
                          <p className="text-[10px] text-gray-400">{log.adminEmail}</p>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-[9px] font-bold">
                            {log.action}
                          </span>
                        </td>
                        <td className="p-4 text-gray-500 font-medium">{log.details}</td>
                        <td className="p-4 text-right text-[10px] text-gray-400 font-medium">
                          {log.createdAt ? log.createdAt.split("T")[0] : "Recent"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB FALLBACK: SIMPLE LIST & FORMS FOR REMAINING TABS */}
          {["packages", "doctors", "reports", "collections", "testimonials", "faqs", "notifications", "admins", "settings"].includes(activeTab) && (
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm min-h-[400px] flex flex-col justify-center items-center text-center animate-fadeIn">
              <Sliders className="h-12 w-12 text-primary/30 mb-4" />
              <h2 className="text-base font-bold text-gray-800 capitalize">{activeTab} Interface</h2>
              <p className="text-xs text-gray-500 mt-2 max-w-sm">
                CRUD settings &amp; status records updates for {activeTab} collection inside City Lab control registry database.
              </p>
              <button
                onClick={() => alert(`Pre-loaded default collection actions for ${activeTab}.`)}
                className="mt-6 px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover transition-colors"
              >
                Perform Audit Sync
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ── Add Patient Modal ── */}
      {showModal === "add-patient" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 w-full max-w-md relative animate-fadeIn shadow-2xl">
            <button onClick={() => setShowModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-base font-bold text-gray-900 mb-4">Add New Patient</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // append dynamically
                const list = [...patients, { _id: Date.now().toString(), name: editForm.name, email: editForm.email, phone: editForm.phone, notes: editForm.notes, medicalHistory: "None", previousReports: [], bookingHistory: [], consultationHistory: [] }];
                setPatients(list);
                setShowModal(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Full Name</label>
                <input required type="text" onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full p-2.5 border rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Email</label>
                <input required type="email" onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full p-2.5 border rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Phone</label>
                <input required type="text" onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="w-full p-2.5 border rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Notes</label>
                <input type="text" onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} className="w-full p-2.5 border rounded-xl text-xs" />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover">
                Create Patient Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── View Patient Profile Detail Modal ── */}
      {showModal === "view-patient" && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 w-full max-w-lg relative animate-fadeIn shadow-2xl overflow-y-auto max-h-[90vh]">
            <button onClick={() => setShowModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-primary" />
              Patient Profile Summary
            </h3>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100">
                <div>
                  <p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider">Patient Name</p>
                  <p className="font-bold text-gray-800 text-sm mt-0.5">{selectedItem.name}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider">Phone Number</p>
                  <p className="font-semibold text-gray-800 text-sm mt-0.5">{selectedItem.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider">Email Address</p>
                  <p className="font-semibold text-gray-800 mt-0.5">{selectedItem.email}</p>
                </div>
              </div>

              <div>
                <p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider">Medical History</p>
                <p className="mt-1 font-medium text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">{selectedItem.medicalHistory}</p>
              </div>

              <div>
                <p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider">Previous Reports</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedItem.previousReports.map((rep: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 bg-primary/5 text-primary border border-primary/10 rounded-lg font-semibold text-[10px]">
                      {rep}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider">Booking History</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedItem.bookingHistory.map((bh: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-gray-700 text-[10px]">
                      {bh}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider">Administrative Notes</p>
                <p className="mt-1 text-gray-500 font-medium">{selectedItem.notes || "No notes recorded."}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Test Modal ── */}
      {showModal === "add-test" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 w-full max-w-md relative animate-fadeIn shadow-2xl">
            <button onClick={() => setShowModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-base font-bold text-gray-900 mb-4">Add Laboratory Test</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCrudAction("/api/tests", "POST", editForm);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Test Name</label>
                <input required type="text" onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full p-2.5 border rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Category</label>
                <select required onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className="w-full p-2.5 border rounded-xl text-xs">
                  <option value="Blood">Blood</option>
                  <option value="Urine">Urine</option>
                  <option value="Hormones">Hormones</option>
                  <option value="Cardiology">Cardiology</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Price (INR)</label>
                <input required type="number" onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })} className="w-full p-2.5 border rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-1">Normal Reference Range</label>
                <input type="text" onChange={(e) => setEditForm({ ...editForm, referenceValues: e.target.value })} className="w-full p-2.5 border rounded-xl text-xs" />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover">
                Create Catalog Test
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
