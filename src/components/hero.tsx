"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Home,
  Zap,
  TestTube,
  Stethoscope,
  Heart,
  Activity,
  Scan,
  Check,
} from "lucide-react";

const trustBadges = [
  { icon: ShieldCheck, label: "NABL Standard Practices" },
  { icon: Users, label: "Experienced Pathologists" },
  { icon: Home, label: "Home Sample Collection" },
  { icon: Zap, label: "Fast Digital Reports" },
];

const todayServices = [
  { icon: TestTube, label: "Blood Tests" },
  { icon: Stethoscope, label: "Full Body Checkup" },
  { icon: Activity, label: "Diabetes Screening" },
  { icon: Scan, label: "Thyroid Profile" },
  { icon: Heart, label: "ECG" },
  { icon: Scan, label: "X-Ray" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-72px)] flex items-center pt-[72px]"
      aria-label="Hero section"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.png"
          alt="Modern City Lab diagnostic laboratory interior"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/75 to-gray-900/50" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Content — 3 cols */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
              Accurate Diagnostics.
              <br />
              <span className="text-primary">Trusted Care.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-gray-300 leading-relaxed">
              From routine blood tests to advanced health screenings, City Lab
              provides reliable diagnostic services with experienced
              professionals and modern technology.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#home-collection"
                className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full transition-all duration-200 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25"
              >
                Book Home Collection
              </Link>
              <Link
                href="#packages"
                className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-200 hover:bg-white/20"
              >
                Explore Health Packages
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-xs sm:text-sm">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Floating Card — 2 cols */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl shadow-black/10">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Today&apos;s Services
              </h2>
              <div className="space-y-2">
                {todayServices.map(({ icon: Icon, label }) => (
                  <Link
                    key={label}
                    href="#tests"
                    className="flex items-center gap-3 p-3 rounded-xl transition-colors duration-200 hover:bg-primary-light group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
