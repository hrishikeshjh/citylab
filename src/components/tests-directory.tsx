"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Clock, FileText, ArrowRight } from "lucide-react";
import { tests, testCategories } from "@/lib/data";

export function TestsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      const matchesSearch = test.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || test.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section
      id="tests"
      className="section-padding bg-primary-lighter"
      aria-labelledby="tests-heading"
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
            Tests Directory
          </span>
          <h2
            id="tests-heading"
            className="mt-3 text-3xl sm:text-4xl font-bold text-foreground"
          >
            Browse Our Diagnostic Tests
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Search from our comprehensive catalogue of over 300 diagnostic tests.
            Each test includes clear preparation guidelines and expected report
            timelines.
          </p>
        </motion.div>

        {/* Search */}
        <div className="mt-10 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search for a test (e.g., Thyroid, Vitamin D, CBC)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 text-sm bg-white border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              aria-label="Search tests"
              id="test-search"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {testCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${
                activeCategory === category
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-text-secondary border-border hover:border-primary/30 hover:text-primary"
              }`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Test Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTests.slice(0, 12).map((test, index) => (
            <motion.div
              key={test.name}
              className="group flex flex-col p-5 bg-white rounded-2xl border border-border transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.04] hover:-translate-y-0.5 hover:border-primary/20"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <h3 className="text-base font-semibold text-foreground">
                {test.name}
              </h3>

              <div className="mt-3 flex flex-wrap gap-3 text-xs text-text-secondary">
                <span className="inline-flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  {test.preparation}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {test.reportTime}
                </span>
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-foreground">
                  ₹{test.price}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Learn More
                  </button>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-primary rounded-full transition-all hover:bg-primary-hover"
                  >
                    Book
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show count */}
        {filteredTests.length > 12 && (
          <p className="mt-6 text-center text-sm text-text-secondary">
            Showing 12 of {filteredTests.length} tests.{" "}
            <button
              type="button"
              className="text-primary font-medium hover:underline"
            >
              View all tests
            </button>
          </p>
        )}

        {filteredTests.length === 0 && (
          <p className="mt-10 text-center text-text-secondary">
            No tests found matching your search. Try a different keyword or
            category.
          </p>
        )}
      </div>
    </section>
  );
}
