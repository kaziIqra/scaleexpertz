"use client";

import { useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import PricingCalculator, { SprintData } from "@/components/ui/PricingCalculator";

const SPRINTS: SprintData[] = [
  {
    id: "b2c-sprint",
    title: "B2C Growth Sprint™",
    subtitle: "Build a complete growth infrastructure that attracts, converts, and retains customers.",
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
      "Most businesses don't fail because they lack ambition. They struggle because strategy, branding, marketing, technology, and execution operate in isolation. The B2C Growth Sprint™ brings every critical growth function together under one accountable team.",
    pillars: [
      { title: "Brand Positioning", desc: "Brand Positioning Strategy, Messaging Framework, Competitive Differentiation" },
      { title: "Content Ecosystem", desc: "Content Strategy, Social Media Management, Creative Direction & Production" },
      { title: "Customer Acquisition", desc: "Meta & Google Advertising, Lead Generation Systems, High-Converting Landing Pages" },
      { title: "Digital Infrastructure", desc: "Business Website, E-Commerce Store, CRM Integrations & Analytics Tracking" },
      { title: "AI & Automation", desc: "Workflow Automation, Lead Management, AI Business Systems" },
      { title: "Brand Authority", desc: "Founder Branding, Community Building, Growth Spotlight™ Opportunities" },
    ],
    advantages: [
      "Dedicated Growth Manager™",
      "Founder Content Academy™ (Navya @navyathegr8)",
      "ScaleXpertz Production Network™",
      "Creator Network (100K+ Followers)",
      "Weekly Strategy Reviews™",
      "Growth Documentation™",
    ],
    deliverables: [
      "Brand Positioning & Identity",
      "High-Converting D2C Website",
      "Full-Funnel Meta & Google Ads",
      "Automated CRM & Lead Workflows",
      "Weekly Growth Reports",
    ],
    features: [
      "Strategy + branding included",
      "Website + conversion pages",
      "Meta & Google acquisition",
      "CRM & automation setup",
      "Weekly strategy reviews",
    ],
    addons: [
      { id: "b2c-landing", label: "Extra Landing Pages", price: 80000 },
      { id: "b2c-creator", label: "Creator Network Boost", price: 50000 },
      { id: "b2c-shoot", label: "Extra Content Shoot", price: 75000 },
      { id: "b2c-ai", label: "AI Automation Pack", price: 60000 },
    ],
    milestones: [
      { percent: "50%", stage: "Kickoff & Strategy", desc: "Business positioning & 90-day roadmap" },
      { percent: "30%", stage: "Mid-Sprint Execution", desc: "Systems implementation & campaign launch" },
      { percent: "20%", stage: "Final Delivery", desc: "Sprint completion, handover & scaling roadmap" },
    ],
    commitment:
      "If ScaleXpertz fails to deliver an agreed milestone due solely to our own execution, your next scheduled payment does not become due until the pending milestone is completed within agreed scope.",
  },
  {
    id: "b2b-sprint",
    title: "B2B Growth Sprint™",
    subtitle: "Build predictable revenue systems through one coordinated growth engine.",
    price: "₹5,50,000",
    basePrice: 550000,
    duration: "90 Days",
    tagline: "Build a Business That Doesn't Depend on Luck. Build One That Runs on Systems.",
    builtFor: [
      "SaaS Companies",
      "Technology Businesses",
      "Manufacturers",
      "Professional Service Firms",
      "Healthcare Organizations",
      "Real Estate Companies",
      "Educational Institutions",
      "B2B Startups",
    ],
    whyBuilt:
      "Most B2B businesses struggle because branding, sales, marketing, technology, and operations evolve independently—creating inconsistent execution, slower decision-making, and unpredictable revenue. The B2B Growth Sprint™ unifies every critical growth function into one coordinated system.",
    pillars: [
      { title: "Business Positioning", desc: "Industry Positioning, Value Proposition, Messaging Framework, Differentiation" },
      { title: "Authority Infrastructure", desc: "Founder & Executive Branding, LinkedIn Growth Strategy, Thought Leadership" },
      { title: "Revenue Systems", desc: "Lead Generation, Sales Funnel Strategy, CRM Integration, Pipeline Optimisation" },
      { title: "Sales Infrastructure", desc: "High-Converting Landing Pages, CRM Workflows, Sales Automation, Lead Nurturing" },
      { title: "AI & Automation", desc: "Workflow Automation, AI Business Systems, Productivity Systems" },
      { title: "Executive Positioning", desc: "Personal Brand Strategy, Executive Content, Growth Spotlight™ Opportunities" },
    ],
    advantages: [
      "Dedicated Growth Manager™",
      "Founder Content Academy™",
      "ScaleXpertz Production Network™",
      "B2B Creator & Influencer Network",
      "Weekly Executive Strategy Reviews™",
      "Growth Documentation™",
    ],
    deliverables: [
      "B2B Industry Positioning",
      "Executive Authority Assets",
      "Sales Funnel Automation",
      "CRM & Pipeline Systems",
      "Custom Growth Roadmap",
    ],
    features: [
      "Industry positioning included",
      "Executive authority system",
      "Sales funnel + CRM",
      "Pipeline automation",
      "Weekly executive reviews",
    ],
    addons: [
      { id: "b2b-linkedin", label: "LinkedIn Authority Pack", price: 70000 },
      { id: "b2b-funnel", label: "Extra Sales Funnel", price: 90000 },
      { id: "b2b-crm", label: "CRM Deep Integration", price: 55000 },
      { id: "b2b-exec", label: "Executive Content Academy", price: 45000 },
    ],
    milestones: [
      { percent: "50%", stage: "Kickoff & Strategy", desc: "Positioning, messaging & system design" },
      { percent: "30%", stage: "Mid-Sprint Execution", desc: "Revenue systems & sales infrastructure" },
      { percent: "20%", stage: "Final Delivery", desc: "System completion, documentation & scale" },
    ],
    commitment:
      "If ScaleXpertz fails to deliver an agreed milestone due solely to our own execution, your next scheduled payment remains on hold until those deliverables are completed within scope.",
  },
  {
    id: "custom-solutions",
    title: "Custom Growth Solutions™",
    subtitle: "Growth infrastructure designed around your exact business objectives.",
    price: "₹40,000",
    basePrice: 40000,
    duration: "Flexible Scope",
    tagline: "Every Business Is Different. Your Growth Strategy Should Be Too.",
    builtFor: [
      "Startups & SMEs",
      "Enterprise Businesses",
      "Personal Brands",
      "Agencies needing GTM support",
      "Existing In-House Teams",
      "Scaling Specific Departments",
    ],
    whyBuilt:
      "Some businesses don't need a complete 90-day growth infrastructure. They need the right solution, executed by the right team, at the right time. Custom Growth Solutions™ allow founders to access ScaleXpertz expertise through flexible, tailored engagements.",
    pillars: [
      { title: "Brand Strategy & Identity", desc: "A premium brand foundation before entering the market" },
      { title: "Web & Digital Infrastructure", desc: "Websites, landing pages, e-commerce, and digital ecosystems" },
      { title: "Performance Marketing", desc: "Campaign strategy, lead generation, and acquisition optimisation" },
      { title: "AI & Business Automation", desc: "Custom AI workflows, CRM automation, and internal operations" },
      { title: "Content Production", desc: "Professional shoots, UGC, influencer collaborations, founder branding" },
      { title: "Business Consulting", desc: "Growth strategy, GTM planning, and scaling roadmaps" },
    ],
    advantages: [
      "Dedicated Growth Manager™",
      "Custom Scope & Timeline",
      "ScaleXpertz Execution Commitment™",
      "Weekly Progress Reviews",
      "Growth Documentation™",
    ],
    deliverables: [
      "Tailored Scoped Deliverables",
      "Solution Blueprint",
      "Implementation & Handoff",
    ],
    features: [
      "Scoped discovery included",
      "Dedicated growth manager",
      "Custom timeline & milestones",
      "Weekly progress reviews",
      "Handoff documentation",
    ],
    addons: [
      { id: "custom-brand", label: "Brand Identity", price: 35000 },
      { id: "custom-web", label: "Website Build", price: 80000 },
      { id: "custom-ads", label: "Performance Ads Setup", price: 50000 },
      { id: "custom-ai", label: "AI Automation", price: 45000 },
      { id: "custom-screen", label: "Extra Screen / Page", price: 8000, unit: "/pg" },
    ],
    milestones: [
      { percent: "50%", stage: "Kickoff & Discovery", desc: "Scope alignment & strategic foundation" },
      { percent: "30%", stage: "Mid-Project Execution", desc: "Core deliverables development" },
      { percent: "20%", stage: "Before Final Delivery", desc: "Review, optimization & sign-off" },
    ],
    commitment:
      "Our milestone-based investment structure ensures transparency and shared accountability throughout the engagement.",
  },
];

export default function Pricing() {
  const [activeSprint, setActiveSprint] = useState<SprintData>(SPRINTS[0]);

  return (
    <section id="pricing" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-16 md:px-12 md:py-24">
      <Eyebrow index="05" label="Investment & Growth Sprints" className="text-center md:text-left" />

      <div className="mt-6 mx-auto max-w-4xl text-center md:mx-0 md:text-left">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink dark:text-white sm:text-3xl md:text-4xl leading-[1.1]">
          <TextReveal as="span" className="block" text="Growth Isn't Purchased." />
          <TextReveal as="span" className="block text-accent dark:text-amber" text="It's Built Through Commitment." delay={0.12} />
        </h2>
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
