"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { stats } from "@/lib/data";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  // Extract numeric value and suffix from target string
  const numericMatch = target.match(/^([\d,]+)/);
  const numericValue = numericMatch
    ? parseInt(numericMatch[1].replace(/,/g, ""), 10)
    : 0;
  const textSuffix = target.replace(/^[\d,]+/, "");

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const steps = 40;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), numericValue);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  const formattedCount = count.toLocaleString("en-IN");

  return (
    <span ref={ref}>
      {formattedCount}
      {textSuffix}
    </span>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="section-padding bg-white dark:bg-gray-900"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/about-lab.png"
                alt="City Lab modern diagnostic laboratory with experienced technicians and advanced equipment"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            {/* Accent decoration */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-primary/10 -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              About City Lab
            </span>
            <h2
              id="about-heading"
              className="mt-3 text-3xl sm:text-4xl font-bold text-foreground leading-tight"
            >
              Your Health, Our Commitment
            </h2>
            <div className="mt-5 space-y-4 text-text-secondary leading-relaxed">
              <p>
                City Lab Diagnostic Centre has been a trusted name in healthcare
                diagnostics for over 15 years. Our team of experienced
                pathologists and skilled technicians is dedicated to delivering
                accurate results that help you and your doctors make informed
                decisions.
              </p>
              <p>
                We use modern, well-maintained equipment and follow rigorous
                quality assurance protocols at every step — from sample
                collection to report generation. Whether you visit our centre or
                use our home collection service, you can expect the same high
                standard of care.
              </p>
              <p>
                We believe quality diagnostics should be accessible and
                affordable. That is why we offer competitive pricing, easy online
                booking, and digital reports that you can access anytime.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-primary-light"
            >
              <div className="text-3xl sm:text-4xl font-bold text-primary">
                <AnimatedCounter target={stat.value} />
              </div>
              <div className="mt-1 text-sm text-text-secondary font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
