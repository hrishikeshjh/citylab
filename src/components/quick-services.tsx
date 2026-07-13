"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TestTube,
  Home,
  Stethoscope,
  FileDown,
  Package,
  Phone,
} from "lucide-react";
import { quickServices } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  TestTube,
  Home,
  Stethoscope,
  FileDown,
  Package,
  Phone,
};

export function QuickServices() {
  return (
    <section className="section-padding bg-white dark:bg-gray-900" aria-label="Quick services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickServices.map((service, index) => {
            const Icon = iconMap[service.icon] || TestTube;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={service.href}
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-border bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.04] dark:hover:shadow-black/[0.2] hover:-translate-y-0.5 hover:border-primary/20"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
