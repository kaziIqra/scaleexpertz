import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import IntroStatement from "@/components/sections/IntroStatement";
import JourneyMap from "@/components/sections/JourneyMap";
import Services from "@/components/sections/Services";
import WhatYouWontGet from "@/components/sections/WhatYouWontGet";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Pricing from "@/components/sections/Pricing";
import PlaybookBanner from "@/components/sections/PlaybookBanner";
import FounderDiagnosis from "@/components/sections/FounderDiagnosis";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import BackgroundShift from "@/components/providers/BackgroundShift";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-[1] overflow-x-hidden max-w-full">
        {/* Section 1: Hero */}
        <Hero />
        
        {/* Trust Strip */}
        <TrustStrip />
        
        {/* Section 2: Five Experts, Five Priorities, One Business (Coordination Chaos™) */}
        <IntroStatement />

        {/* Section 3: The Proprietary SCALE Framework™ (scroll journey map) */}
        <JourneyMap />
        
        {/* Section 4: Everything You Need. One Team To Deliver It. */}
        <Services />
        
        {/* Section 5: What You Won't Get From Us (Dark Glassmorphism) */}
        <WhatYouWontGet />
        
        {/* Section 6: Proof Over Promises (Case Studies) */}
        <FeaturedWork />

        {/* Section 7: Investment & 90-Day Growth Sprints™ (Interactive Pricing) */}
        <Pricing />

        {/* Section 8: The ScaleXpertz Growth Playbook™ (Lead Magnet) */}
        <PlaybookBanner />
        
        {/* Section 9: Founder Growth Diagnosis (Booking Experience) */}
        <FounderDiagnosis />
        
        {/* Section 10: Frequently Asked Questions */}
        <FAQ />
        
        {/* Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
      <BackgroundShift />
    </>
  );
}
