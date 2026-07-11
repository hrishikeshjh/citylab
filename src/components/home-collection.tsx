"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  UserCheck,
  TestTube,
  Mail,
  ArrowRight,
} from "lucide-react";
import { collectionSteps } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  CalendarCheck,
  UserCheck,
  TestTube,
  Mail,
};

export function HomeCollection() {
  return (
    <section
      id="home-collection"
      className="section-padding bg-primary-light"
      aria-labelledby="home-collection-heading"
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
            Home Collection
          </span>
          <h2
            id="home-collection-heading"
            className="mt-3 text-3xl sm:text-4xl font-bold text-foreground"
          >
            Get Tested From Home
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            No need to travel. Our trained phlebotomists visit your home to
            collect samples safely, and your digital reports are delivered the
            same day.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collectionSteps.map((step, index) => {
            const Icon = iconMap[step.icon] || CalendarCheck;
            return (
              <motion.div
                key={step.title}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Connector line (desktop only) */}
                {index < collectionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+36px)] w-[calc(100%-72px)] h-[2px] bg-primary/20" />
                )}

                <div className="flex flex-col items-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm border border-border">
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-primary rounded-full transition-all duration-200 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25"
          >
            Schedule Home Collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
