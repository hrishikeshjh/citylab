"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { healthPackages } from "@/lib/data";

export function HealthPackages() {
  return (
    <section
      id="packages"
      className="section-padding bg-white dark:bg-gray-900"
      aria-labelledby="packages-heading"
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
            Health Packages
          </span>
          <h2
            id="packages-heading"
            className="mt-3 text-3xl sm:text-4xl font-bold text-foreground"
          >
            Comprehensive Health Checkups
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Choose from our carefully designed health packages that cover a wide
            range of tests at affordable prices. Each package is reviewed by our
            experienced medical team.
          </p>
        </motion.div>

        {/* Package Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthPackages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.04] dark:hover:shadow-black/[0.2] hover:-translate-y-0.5 ${
                pkg.popular
                  ? "border-primary bg-primary-light shadow-md"
                  : "border-border bg-white dark:bg-gray-800 hover:border-primary/20"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-primary rounded-full">
                  <Star className="h-3 w-3 fill-current" />
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-semibold text-foreground">
                {pkg.name}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {pkg.description}
              </p>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">
                  ₹{pkg.price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-text-secondary line-through">
                  ₹{pkg.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                  {Math.round(
                    ((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100
                  )}
                  % off
                </span>
              </div>

              {/* Tests */}
              <ul className="mt-5 space-y-2 flex-1">
                {pkg.tests.map((test) => (
                  <li
                    key={test}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {test}
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <Link
                  href="#contact"
                  className="flex-1 text-center px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 bg-primary text-white hover:bg-primary-hover hover:shadow-md"
                >
                  Book Now
                </Link>
                <button
                  type="button"
                  className="px-4 py-2.5 text-sm font-medium text-text-secondary border border-border rounded-full transition-all duration-200 hover:border-primary hover:text-primary"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
