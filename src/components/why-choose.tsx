"use client";

import { motion } from "framer-motion";
import {
  UserCheck,
  ShieldCheck,
  FileCheck,
  Smartphone,
  IndianRupee,
  Home,
  Clock,
  Microscope,
} from "lucide-react";
import { whyChooseItems } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  UserCheck,
  ShieldCheck,
  FileCheck,
  Smartphone,
  IndianRupee,
  Home,
  Clock,
  Microscope,
};

export function WhyChoose() {
  return (
    <section
      id="why-choose"
      className="section-padding bg-primary-lighter"
      aria-labelledby="why-choose-heading"
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
            Why City Lab
          </span>
          <h2
            id="why-choose-heading"
            className="mt-3 text-3xl sm:text-4xl font-bold text-foreground"
          >
            Why Patients Trust Us
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            We combine experienced medical professionals, modern equipment, and
            genuine patient care to deliver diagnostics you can rely on.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyChooseItems.map((item, index) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <motion.div
                key={item.title}
                className="group p-6 bg-white rounded-2xl border border-border transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.04] hover:-translate-y-0.5 hover:border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
