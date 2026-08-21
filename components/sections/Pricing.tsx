"use client";

import { useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import PricingCalculator, { SprintData } from "@/components/ui/PricingCalculator";

const SPRINTS: SprintData[] = [
  {
    id: "b2c-sprint",
    title: "B2C Growth Sprint™",
    subtitle:
      "Build a complete growth infrastructure that attracts, converts, and retains customers through one coordinated execution system.",
    price: "₹5,00,000",
    basePrice: 500000,
    duration: "90 Days",
    tagline: "Customers Don't Buy Content. They Buy Brands They Trust.",
    builtFor: [
      "D2C Brands",
      "E-Commerce Businesses",
      "Personal Brands",
      "Coaches & Consultants",
      "Healthcare & Clinics",
      "Fashion & Lifestyle",
      "Restaurants & Cafés",
      "Local Businesses",
    ],
    whyBuilt:
      "Most businesses don't fail because they lack ambition. They struggle because strategy, branding, marketing, technology, and execution operate in isolation. The Growth Sprint™ brings every critical growth function together under one accountable team—so you can focus on growing your business while we coordinate the execution.",
    pillars: [
      { title: "Brand Positioning", desc: "Build the right direction before increasing speed." },
      { title: "Content Ecosystem", desc: "Develop the assets and experiences that build trust." },
      { title: "Customer Acquisition Systems", desc: "Turn strategy into measurable customer growth." },
      { title: "Digital Infrastructure", desc: "Stronger websites, stores, and tracking foundations." },
      { title: "AI & Business Automation", desc: "Continuously optimise, automate, and improve your growth systems." },
      { title: "Brand Authority", desc: "Build authority customers remember and trust." },
    ],
    advantages: [
      "Dedicated Growth Manager™",
      "Founder Content Academy™",
      "ScaleXpertz Production Network™",
      "Creator & Influencer Network™",
      "Weekly Strategy Reviews™",
      "Growth Documentation™",
      "Growth Spotlight™ Opportunities",
    ],
    deliverables: [
      "A brand customers instantly recognise and trust",
      "Predictable customer acquisition systems",
      "A coordinated growth system instead of disconnected vendors",
      "Stronger digital infrastructure",
      "AI-powered operational efficiency",
      "A scalable business foundation built for long-term growth",
    ],
    features: [
      "Brand positioning customers instantly recognise and trust",
      "Predictable customer acquisition systems",
      "Coordinated growth system instead of disconnected vendors",
      "Stronger digital infrastructure",
      "AI-powered operational efficiency",
      "Scalable foundation for long-term growth",
    ],
    addons: [
      { id: "b2c-landing", label: "Extra Landing Pages", originalPrice: 30000, price: 0 },
      { id: "b2c-creator", label: "Creator Network Boost", originalPrice: 35000, price: 0 },
      { id: "b2c-shoot", label: "Extra Content Shoot", originalPrice: 40000, price: 0 },
      { id: "b2c-ai", label: "AI Automation Pack", originalPrice: 25000, price: 0 },
    ],
    milestones: [
      { percent: "50%", stage: "Project Kickoff & Strategy", desc: "Business positioning & 90-day roadmap" },
      { percent: "30%", stage: "Mid-Sprint Execution", desc: "Systems implementation & campaign launch" },
      { percent: "20%", stage: "Before Final Delivery & Sprint Completion", desc: "Sprint completion, handover & scaling roadmap" },
    ],
    commitment:
      "If ScaleXpertz fails to deliver an agreed milestone due solely to our own execution, your next scheduled payment does not become due until the pending milestone is completed within the agreed scope.",
  },
  {
    id: "b2b-sprint",
    title: "B2B Growth Sprint™",
    subtitle: "Build predictable revenue through one coordinated growth system.",
    price: "₹5,50,000",
    basePrice: 550000,
    duration: "90 Days",
    tagline: "Build a Business That Doesn't Depend on Luck. Build One That Runs on Systems.",
    builtFor: [
      "SaaS Companies",
      "Manufacturers",
      "Professional Service Firms",
      "Healthcare Organizations",
      "Educational Institutions",
      "Real Estate Companies",
      "Technology Businesses",
      "Growth-Stage SMEs",
    ],
    whyBuilt:
      "Most B2B businesses don't struggle because they lack capability. They struggle because branding, sales, marketing, technology, and operations evolve independently—creating inconsistent execution, slower decision-making, and unpredictable revenue. The B2B Growth Sprint™ unifies every critical growth function into one coordinated system, allowing your leadership team to focus on strategic decisions while we drive execution with complete accountability.",
    pillars: [
      { title: "Business Positioning", desc: "Build a clear market position and strategic direction before scaling." },
      { title: "Authority Infrastructure", desc: "Develop business assets that establish authority, trust, and credibility." },
      { title: "Revenue Systems", desc: "Build predictable lead generation, revenue systems, and growth engines." },
      { title: "Sales Infrastructure", desc: "Sales funnels, CRM workflows, and pipeline systems that convert." },
      { title: "AI & Business Automation", desc: "Continuously optimise, automate, and improve every growth system." },
      { title: "Executive Positioning", desc: "Strengthen executive positioning, market authority, and business influence." },
    ],
    advantages: [
      "Dedicated Growth Manager™",
      "Founder Content Academy™",
      "ScaleXpertz Production Network™",
      "Creator & Influencer Network™",
      "Weekly Strategy Reviews™",
      "Growth Documentation™",
      "Growth Spotlight™ Opportunities",
    ],
    deliverables: [
      "A position in the market that's easier to understand and remember",
      "A better system for bringing in qualified leads",
      "More authority around your brand and leadership",
      "Marketing, sales and operations working more closely together",
      "Less manual work where automation makes sense",
      "A growth system that doesn't depend on juggling multiple vendors",
    ],
    features: [
      "A position in the market that's easier to understand and remember",
      "A better system for bringing in qualified leads",
      "More authority around your brand and leadership",
      "Marketing, sales and operations working more closely together",
      "Less manual work where automation makes sense",
      "A growth system that doesn't depend on juggling multiple vendors",
    ],
    addons: [
      { id: "b2b-exec", label: "Executive Authority Support", originalPrice: 35000, price: 0 },
      { id: "b2b-funnel", label: "Revenue Funnel Upgrade", originalPrice: 40000, price: 0 },
      { id: "b2b-lead", label: "Lead Management Setup", originalPrice: 45000, price: 0 },
      { id: "b2b-content", label: "B2B Content Support", originalPrice: 30000, price: 0 },
    ],
    milestones: [
      { percent: "50%", stage: "Project Kickoff, Strategy & Foundation", desc: "Positioning, messaging & system design" },
      { percent: "30%", stage: "Mid-Sprint Execution & System Implementation", desc: "Revenue systems & sales infrastructure" },
      { percent: "20%", stage: "Before Final Delivery & Sprint Completion", desc: "System completion, documentation & scale" },
    ],
    commitment:
      "If ScaleXpertz fails to deliver an agreed milestone due solely to our own execution, your next scheduled payment does not become due until the pending milestone is completed within the agreed scope.",
  },
  {
    id: "custom-solutions",
    title: "Custom Growth Solutions™",
    subtitle: "Growth infrastructure designed around your business objectives.",
    price: "Starting ₹40,000",
    basePrice: 40000,
    duration: "Custom Scope • Flexible Timeline",
    tagline: "Every Business Is Different. Your Growth Strategy Should Be Too.",
    builtFor: [
      "Startups",
      "SMEs",
      "Enterprise Businesses",
      "Personal Brands",
      "Agencies",
      "Existing In-House Teams",
      "Businesses Scaling a Specific Department",
      "Founders Requiring Strategic Consulting",
    ],
    whyBuilt:
      "Some businesses don't need a complete growth infrastructure. They need the right solution, executed by the right team, at the right time. Custom Growth Solutions™ allow founders to access ScaleXpertz's expertise across branding, technology, automation, marketing, and business strategy through flexible, tailored engagements built around their specific objectives.",
    pillars: [
      { title: "Brand Strategy & Identity", desc: "A premium brand foundation before entering the market" },
      { title: "Website Development", desc: "Websites and digital ecosystems built for growth" },
      { title: "UI/UX Design", desc: "Interfaces designed for clarity, trust, and conversion" },
      { title: "Performance Marketing", desc: "Campaign strategy, lead generation, and acquisition optimisation" },
      { title: "AI & Business Automation", desc: "Custom AI workflows and operational efficiency" },
    ],
    advantages: [
      "Dedicated Growth Manager™",
      "ScaleXpertz Execution Commitment™",
      "Weekly Strategy Reviews™",
      "Growth Documentation™",
    ],
    deliverables: [
      "A solution built around what your business actually needs",
      "No paying for services you don't need",
      "Faster execution with a clear direction",
      "Better systems where your business needs them most",
      "One team responsible for getting it done",
      "A stronger base for your next stage of growth",
    ],
    features: [
      "A solution built around what your business actually needs",
      "No paying for services you don't need",
      "Faster execution with a clear direction",
      "Better systems where your business needs them most",
      "One team responsible for getting it done",
      "A stronger base for your next stage of growth",
    ],
    addons: [
      { id: "custom-strat", label: "Growth Strategy Review", originalPrice: 15000, price: 0 },
      { id: "custom-ui", label: "UI / Experience Upgrade", originalPrice: 20000, price: 0 },
      { id: "custom-auto", label: "Automation Setup", originalPrice: 25000, price: 0 },
      { id: "custom-doc", label: "Growth Documentation & Reviews", originalPrice: 20000, price: 0 },
    ],
    milestones: [
      { percent: "50%", stage: "Project Kickoff & Discovery", desc: "Scope alignment & strategic foundation" },
      { percent: "30%", stage: "Mid-Project Execution", desc: "Core deliverables development" },
      { percent: "20%", stage: "Before Final Delivery", desc: "Review, optimization & sign-off" },
    ],
    commitment:
      "If ScaleXpertz fails to deliver an agreed milestone due solely to our own execution, your next scheduled payment does not become due until the pending milestone is completed within the agreed scope.",
  },
];

export default function Pricing() {
  const [activeSprint, setActiveSprint] = useState<SprintData>(SPRINTS[0]);

  return (
    <section id="pricing" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-4xl text-center flex flex-col items-center justify-center">
        <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-ink dark:text-white sm:text-4xl md:text-5xl">
          05 — Investment & Growth Sprints
        </h2>
        <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-accent dark:text-amber sm:text-2xl md:text-3xl leading-snug">
          Growth Isn&apos;t Purchased. It&apos;s Built Through Commitment.
        </h3>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-body dark:text-slate-300 font-medium">
          Every Growth Sprint™ is a focused engagement where strategy, execution, and optimisation work together under one accountable team. Configure add-ons below to see your estimate.
        </p>
      </div>

      <div className="mt-12">
        <PricingCalculator
          sprints={SPRINTS}
          activeSprint={activeSprint}
          onSelectSprint={setActiveSprint}
        />
      </div>
    </section>
  );
}
