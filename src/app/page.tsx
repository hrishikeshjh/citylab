"use client";

import { useAuth } from "@/lib/auth-context";
import { PatientDashboard } from "@/components/patient-dashboard";
import { Hero } from "@/components/hero";
import { QuickServices } from "@/components/quick-services";
import { About } from "@/components/about";
import { WhyChoose } from "@/components/why-choose";
import { HomeCollection } from "@/components/home-collection";
import { HealthPackages } from "@/components/health-packages";
import { TestsDirectory } from "@/components/tests-directory";
import { Doctors } from "@/components/doctors";
import { Articles } from "@/components/articles";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { Contact } from "@/components/contact";

export default function HomePage() {
  const { user, loading } = useAuth();

  // If auth is loading, we will return the loading screen from AppShell
  if (loading) return null;

  // Render the patient portal dashboard if logged in
  if (user) {
    return <PatientDashboard />;
  }

  // Render the standard public marketing website if browsing as a guest/unauthenticated
  return (
    <>
      <Hero />
      <QuickServices />
      <About />
      <WhyChoose />
      <HomeCollection />
      <HealthPackages />
      <TestsDirectory />
      <Doctors />
      <Articles />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
