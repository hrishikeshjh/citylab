"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Calendar, IndianRupee } from "lucide-react";
import { doctors } from "@/lib/data";

export function Doctors() {
  return (
    <section
      id="doctors"
      className="section-padding bg-white"
      aria-labelledby="doctors-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Doctors
          </span>
          <h2
            id="doctors-heading"
            className="mt-3 text-3xl sm:text-4xl font-bold text-foreground"
          >
            Meet Our Expert Team
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Our team of experienced pathologists and specialists ensures every
            result is accurate, every consultation is thorough, and every patient
            is treated with care.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-border transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.04] hover:-translate-y-0.5 hover:border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              {/* Photo */}
              <div className="relative h-28 w-28 rounded-2xl overflow-hidden bg-primary-light">
                <Image
                  src={doctor.image}
                  alt={`${doctor.name} — ${doctor.specialization}`}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <h3 className="mt-4 text-base font-semibold text-foreground">
                {doctor.name}
              </h3>
              <p className="mt-0.5 text-xs text-text-secondary">
                {doctor.qualification}
              </p>
              <span className="mt-2 inline-block px-3 py-1 text-xs font-medium text-primary bg-primary-light rounded-full">
                {doctor.specialization}
              </span>

              {/* Details */}
              <div className="mt-4 w-full space-y-2 text-sm text-text-secondary">
                <div className="flex items-center justify-center gap-2">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>{doctor.experience}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{doctor.availableDays}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <IndianRupee className="h-3.5 w-3.5" />
                  <span>₹{doctor.consultationFee} Consultation</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="#contact"
                className="mt-5 w-full text-center px-4 py-2.5 text-sm font-semibold text-primary border border-primary/30 rounded-full transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
              >
                Book Appointment
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
