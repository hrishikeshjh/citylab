"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  Calendar,
  Layers,
  Users,
  Compass,
  FileText,
  Activity,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Search,
  Bell,
  User as UserIcon,
  ChevronDown,
  LogOut,
  Sparkles,
  Phone,
  FileDown,
  Eye,
  Heart,
  Home,
  CreditCard,
  BookOpen,
  MessageSquare,
  Settings,
  ShieldCheck,
  CalendarDays,
  FileSpreadsheet,
  Stethoscope,
} from "lucide-react";

export function PatientDashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  /* ── Time-based greeting helper ──────────────────────────────────── */
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Good Morning";
    if (hr < 17) return "Good Afternoon";
    return "Good Evening";
  };

  /* ── Get first name ──────────────────────────────────────────────── */
  const getFirstName = () => {
    if (user?.displayName) {
      return user.displayName.split(" ")[0];
    }
    if (user?.email) {
      const parts = user.email.split("@")[0].split(/[._-]/);
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    }
    return "Hrishikesh";
  };

  /* ── Sidebar Navigation items ────────────────────────────────────── */
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "bookings", label: "My Bookings", icon: CalendarDays },
    { id: "tests", label: "My Tests", icon: FileSpreadsheet },
    { id: "reports", label: "My Reports", icon: FileText },
    { id: "doctors", label: "My Doctors", icon: Stethoscope },
    { id: "packages", label: "Health Packages", icon: Heart },
    { id: "collections", label: "Home Collection", icon: Home },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "articles", label: "Health Articles", icon: BookOpen },
    { id: "support", label: "Support", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-gray-950 flex flex-col font-sans text-foreground">
      {/* ── Top Header ── */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/images/logo.svg" alt="City Lab Logo" className="h-9 w-auto" />
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center relative w-96">
          <Search className="absolute left-3.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports, tests, packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary/10 transition-all text-foreground placeholder:text-text-secondary"
          />
        </div>

        {/* Right CTAs & Profile Dropdown */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 relative text-gray-600 dark:text-gray-300 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-primary border-2 border-white dark:border-gray-900 rounded-full" />
          </button>

          {/* User Menu Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/30 hover:shadow-sm transition-all"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  {getFirstName().slice(0, 2).toUpperCase()}
                </div>
              )}
              <span className="text-xs font-bold text-gray-700 dark:text-gray-200 hidden sm:inline">
                {getFirstName()}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab("settings");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setActiveTab("settings");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <Activity className="h-4 w-4 text-gray-400" />
                  Medical Information
                </button>
                <button
                  onClick={() => {
                    setActiveTab("settings");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <Users className="h-4 w-4 text-gray-400" />
                  Family Members
                </button>
                <button
                  onClick={() => {
                    setActiveTab("dashboard");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <Bell className="h-4 w-4 text-gray-400" />
                  Notifications
                </button>
                <button
                  onClick={() => {
                    setActiveTab("settings");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <Settings className="h-4 w-4 text-gray-400" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    setActiveTab("settings");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <ShieldCheck className="h-4 w-4 text-gray-400" />
                  Privacy &amp; Security
                </button>
                <button
                  onClick={() => {
                    setActiveTab("dashboard");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-t border-gray-50 dark:border-gray-700 transition-colors text-left font-medium"
                >
                  <Home className="h-4 w-4 text-gray-400" />
                  Dashboard Home
                </button>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    signOut();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-t border-gray-50 dark:border-gray-700 transition-colors text-left font-semibold"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Layout Workspace ── */}
      <div className="flex-1 flex">
        {/* ── Sidebar Navigation ── */}
        <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 hidden lg:block p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary/5 text-primary"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </aside>

        {/* ── Content Grid Workspace ── */}
        <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto overflow-y-auto">
          {/* Tab 1: Dashboard Home */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Greeting */}
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                  {getGreeting()}, {getFirstName()} 👋
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                  Welcome back to City Lab.
                </p>
              </div>

              {/* Grid Layout: Appt, CTA, Active Bookings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Upcoming Appointment */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/5 px-2.5 py-1 rounded-full">
                      Upcoming Appointment
                    </span>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-primary">
                        <Stethoscope className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-50">Dr. Ananya Sharma</h3>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">General Physician</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-b border-gray-50 dark:border-gray-800 py-3.5 my-4 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-100">12 July</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">10:30 AM</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-medium text-gray-400">Status</p>
                      <p className="font-bold text-green-600">Confirmed</p>
                    </div>
                  </div>

                  <button
                    onClick={() => alert("Appointment details: Dr. Ananya Sharma, 12 July 10:30 AM, Confirmed.")}
                    className="w-full py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-[11px] font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>

                {/* Book a Test CTA card */}
                <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold">Book a Test</h3>
                    <p className="text-xs text-orange-50/90 mt-2 font-medium">
                      Need a diagnostic test? Book in less than 2 minutes and select slot.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("tests")}
                    className="w-full mt-6 py-3 rounded-xl bg-white text-primary text-[11px] font-bold shadow-sm hover:shadow transition-shadow"
                  >
                    Book Test
                  </button>
                </div>

                {/* Home Collection CTA card */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-50">Home Collection</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Choose date &amp; time. A certified technician visits your home.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("collections")}
                    className="w-full mt-6 py-3 rounded-xl bg-primary text-white text-[11px] font-bold hover:bg-primary-hover shadow-sm transition-colors"
                  >
                    Schedule Collection
                  </button>
                </div>
              </div>

              {/* Reports, Bookings & KPI Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Recent Reports */}
                <div className="md:col-span-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                    <FileText className="h-4.5 w-4.5 text-primary" />
                    Recent Reports
                  </h3>
                  <div className="space-y-3">
                    {/* CBC */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-gray-50">CBC Report</p>
                        <p className="text-[10px] text-green-600 font-medium">Completed</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert("Downloading CBC Report PDF...")}
                          className="p-1.5 rounded-lg text-primary hover:bg-primary/5 transition-colors"
                          title="Download PDF"
                        >
                          <FileDown className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => alert("Opening CBC Report online view...")}
                          className="px-3 py-1 text-[10px] font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          View Online
                        </button>
                      </div>
                    </div>

                    {/* Vitamin D */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-gray-50">Vitamin D Report</p>
                        <p className="text-[10px] text-green-600 font-medium">Completed</p>
                      </div>
                      <button
                        onClick={() => alert("Downloading Vitamin D Report PDF...")}
                        className="p-1.5 rounded-lg text-primary hover:bg-primary/5 transition-colors"
                        title="Download PDF"
                      >
                        <FileDown className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Thyroid Profile */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50">
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-gray-50">Thyroid Profile</p>
                        <p className="text-[10px] text-amber-600 font-medium">Pending</p>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                        In Progress
                      </span>
                    </div>
                  </div>
                </div>

                {/* Active Bookings */}
                <div className="md:col-span-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                      <Calendar className="h-4.5 w-4.5 text-primary" />
                      Active Bookings
                    </h3>
                    <div className="p-4 rounded-2xl bg-orange-50/30 dark:bg-orange-900/10 border border-orange-100/50 dark:border-orange-800/30">
                      <p className="text-xs font-bold text-gray-900 dark:text-gray-50">Complete Blood Count</p>
                      <div className="mt-3 space-y-1.5 text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                        <p>Date: Tomorrow</p>
                        <p>Time: 09:30 AM</p>
                        <p className="text-green-600">Status: Confirmed</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="w-full mt-4 py-2 rounded-xl border border-gray-100 dark:border-gray-700 text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Manage Bookings
                  </button>
                </div>
              </div>

              {/* Health Summary Stats */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                  <Activity className="h-4.5 w-4.5 text-primary" />
                  Health Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Tests Done", val: "12" },
                    { label: "Last Visit", val: "04 Jun 26" },
                    { label: "Reports Available", val: "8" },
                    { label: "Home Collections", val: "2" },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {stat.label}
                      </p>
                      <p className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-1">{stat.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Packages */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                  <Heart className="h-4.5 w-4.5 text-primary" />
                  Recommended Packages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { name: "Heart Checkup", price: "₹1,499", desc: "For cardiovascular wellness & lipids" },
                    { name: "Diabetes Package", price: "₹999", desc: "HbA1c, Fasting Blood Sugar, profile" },
                    { name: "Women's Wellness", price: "₹1,999", desc: "Hormone, vitamins, blood screening" },
                    { name: "Senior Citizen Package", price: "₹2,499", desc: "Complete body screening for seniors" },
                  ].map((pkg, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-gray-50">{pkg.name}</h4>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1.5">{pkg.desc}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-primary">{pkg.price}</span>
                        <button
                          onClick={() => alert(`Booking ${pkg.name}...`)}
                          className="px-3.5 py-1.5 bg-primary text-white text-[10px] font-bold rounded-lg hover:bg-primary-hover transition-colors"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Articles */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                  <BookOpen className="h-4.5 w-4.5 text-primary" />
                  Recommended Articles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "How Often Should You Get Blood Tests?", read: "5 minute read", desc: "Guidelines on periodic screenings by age group." },
                    { title: "Understanding Cholesterol Reports", read: "4 minute read", desc: "Learn what HDL, LDL, and triglycerides mean." },
                    { title: "Tips Before Giving Blood Samples", read: "3 minute read", desc: "How to prepare properly for a fasting test." },
                  ].map((art, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveTab("articles")}
                      className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:border-primary/20 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[9px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">
                          {art.read}
                        </span>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-gray-50 mt-2 hover:text-primary transition-colors">
                          {art.title}
                        </h4>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1.5">{art.desc}</p>
                      </div>
                      <span className="text-[10px] font-bold text-primary mt-4 inline-flex items-center gap-1">
                        Read Article →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Fallback Tab: Show informative placeholder layouts */}
          {activeTab !== "dashboard" && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm text-center min-h-[400px] flex flex-col items-center justify-center animate-fadeIn">
              <div className="h-14 w-14 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-4">
                {activeTab === "bookings" && <CalendarDays className="h-6 w-6" />}
                {activeTab === "tests" && <FileSpreadsheet className="h-6 w-6" />}
                {activeTab === "reports" && <FileText className="h-6 w-6" />}
                {activeTab === "doctors" && <Stethoscope className="h-6 w-6" />}
                {activeTab === "packages" && <Heart className="h-6 w-6" />}
                {activeTab === "collections" && <Home className="h-6 w-6" />}
                {activeTab === "payments" && <CreditCard className="h-6 w-6" />}
                {activeTab === "articles" && <BookOpen className="h-6 w-6" />}
                {activeTab === "support" && <MessageSquare className="h-6 w-6" />}
                {activeTab === "settings" && <Settings className="h-6 w-6" />}
              </div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 capitalize">{activeTab.replace("-", " ")}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
                Your medical dashboard {activeTab.replace("-", " ")} section. City Lab secure patient portal connection is active.
              </p>
              <button
                onClick={() => setActiveTab("dashboard")}
                className="mt-6 px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover transition-colors"
              >
                Return to Dashboard Home
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
