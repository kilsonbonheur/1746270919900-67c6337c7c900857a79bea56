import React from "react";
import Hero from "../components/Hero";
import VisaTypes from "../components/VisaTypes";
import HowItWorks from "../components/HowItWorks";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import RefundPolicy from "../components/RefundPolicy";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";

function HomePage() {
  return (
    <>
      <Hero />
      <VisaTypes />
      <HowItWorks />
      <Team />
      <Testimonials />
      <RefundPolicy />
      <FAQ />
      <CTA />
    </>
  );
}

export default HomePage;
