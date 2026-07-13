"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { articles } from "@/lib/data";

export function Articles() {
  return (
    <section
      id="articles"
      className="section-padding bg-primary-lighter"
      aria-labelledby="articles-heading"
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
            Health Articles
          </span>
          <h2
            id="articles-heading"
            className="mt-3 text-3xl sm:text-4xl font-bold text-foreground"
          >
            Stay Informed About Your Health
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Our team shares practical health insights and tips to help you make
            informed decisions about your well-being.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-border overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.04] dark:hover:shadow-black/[0.2] hover:-translate-y-0.5 hover:border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-xs font-medium text-primary bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readingTime}
                  </span>
                </div>

                <h3 className="mt-2.5 text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                <p className="mt-2 text-sm text-text-secondary leading-relaxed flex-1">
                  {article.summary}
                </p>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
