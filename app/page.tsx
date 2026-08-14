import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import IntroStatement from "@/components/sections/IntroStatement";
import Services from "@/components/sections/Services";
import WhatYouWontGet from "@/components/sections/WhatYouWontGet";
import FeaturedWork from "@/components/sections/FeaturedWork";
import FounderDiagnosis from "@/components/sections/FounderDiagnosis";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import BackgroundShift from "@/components/providers/BackgroundShift";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden max-w-full">
        {/* Section 1: Hero */}
        <Hero />
        
        {/* Trust Strip */}
        <TrustStrip />
        
        {/* Section 2: Five Experts, Five Priorities, One Business */}
        <IntroStatement />
        
        {/* Section 3: Everything You Need. One Team To Deliver It. */}
        <Services />
        
        {/* Section 4: What You Won't Get From Us (Dark Glassmorphism) */}
        <WhatYouWontGet />
        
        {/* Section 5: Proof Over Promises */}
        <FeaturedWork />
        
        {/* Section 6: Founder Growth Diagnosis (Booking Experience) */}
        <FounderDiagnosis />
        
        {/* Section 7: Frequently Asked Questions */}
        <FAQ />
        
        {/* Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
      <BackgroundShift />
    </>
  );
}
