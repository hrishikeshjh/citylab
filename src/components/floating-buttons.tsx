"use client";

import { Phone, MessageCircle, CalendarPlus } from "lucide-react";

export function FloatingButtons() {
  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-3"
      role="complementary"
      aria-label="Quick actions"
    >
      <a
        href="#tests"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-110 hover:shadow-xl hover:shadow-primary/30"
        aria-label="Book a test"
        title="Book a Test"
      >
        <CalendarPlus className="h-5 w-5" />
      </a>
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 transition-all duration-200 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/30"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href="tel:+919876543210"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-white shadow-lg shadow-foreground/25 transition-all duration-200 hover:scale-110 hover:shadow-xl hover:shadow-foreground/30"
        aria-label="Call City Lab"
        title="Call Now"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
