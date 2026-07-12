"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Home,
  Zap,
  Check,
} from "lucide-react";

const trustBadges = [
  { icon: Users, label: "Experienced Pathologists" },
  { icon: Home, label: "Home Sample Collection" },
  { icon: Zap, label: "Fast Digital Reports" },
];

const heroSlides = [
  {
    src: "/images/hero-background.png",
    alt: "Modern City Lab diagnostic laboratory interior",
  },
  {
    src: "/images/hero-sliding-2.png",
    alt: "City Lab diagnostic services",
  },
  {
    src: "/images/hero-sliding-3.png",
    alt: "City Lab healthcare professionals",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-72px)] flex items-center pt-[72px]"
      aria-label="Hero section"
    >
      {/* Sliding Background */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: index === currentSlide ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
              quality={85}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/75 to-gray-900/50" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "w-8 bg-primary"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            Accurate Diagnostics &
            <br />
            <span className="text-primary">Trusted Care in Howrah.</span>
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
      </div>
    </section>
  );
}
