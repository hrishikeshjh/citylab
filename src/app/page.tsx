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
