"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Phone, Mail, Clock, AlertCircle, MapPin, Send } from "lucide-react";
import { contactInfo } from "@/lib/data";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    // Frontend only — would connect to backend API
    console.log("Contact form submitted:", data);
    alert("Thank you for reaching out! We will get back to you shortly.");
  };

  return (
    <section
      id="contact"
      className="section-padding bg-white"
      aria-labelledby="contact-heading"
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
            Contact Us
          </span>
          <h2
            id="contact-heading"
            className="mt-3 text-3xl sm:text-4xl font-bold text-foreground"
          >
            Get in Touch
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Have a question or want to book a test? Reach out to us and our team
            will be happy to help.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Contact Form — 3 cols */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 p-6 sm:p-8 bg-primary-light rounded-2xl border border-border"
              noValidate
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  placeholder="Enter your name"
                  {...register("name", { required: "Please enter your name" })}
                  className="w-full px-4 py-3 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  placeholder="Enter your phone number"
                  {...register("phone", {
                    required: "Please enter your phone number",
                    pattern: {
                      value: /^[+]?[\d\s-]{10,15}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  className="w-full px-4 py-3 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="contact-email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Please enter your email",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className="w-full px-4 py-3 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="How can we help you?"
                  {...register("message", {
                    required: "Please enter a message",
                  })}
                  className="w-full px-4 py-3 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full transition-all duration-200 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info — 2 cols */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[
              {
                icon: Phone,
                label: "Phone",
                value: contactInfo.phone,
                href: `tel:${contactInfo.phone.replace(/\s/g, "")}`,
              },
              {
                icon: Mail,
                label: "Email",
                value: contactInfo.email,
                href: `mailto:${contactInfo.email}`,
              },
              {
                icon: Clock,
                label: "Working Hours",
                value: contactInfo.workingHours,
              },
              {
                icon: AlertCircle,
                label: "Emergency",
                value: contactInfo.emergencyContact,
                href: `tel:${contactInfo.emergencyContact.replace(/\s/g, "")}`,
              },
              {
                icon: MapPin,
                label: "Address",
                value: contactInfo.address,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-4 bg-primary-light rounded-xl border border-border"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-0.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Map Placeholder */}
            <div className="aspect-[4/3] rounded-2xl bg-gray-100 border border-border flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-text-secondary mx-auto" />
                <p className="mt-2 text-sm text-text-secondary">
                  Google Maps
                </p>
                <p className="text-xs text-text-secondary">
                  123, Health Avenue, Pune
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
