"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import Magnetic from "@/components/ui/Magnetic";
import SprintModal, { SprintData } from "@/components/ui/SprintModal";
import { EASE_OUT_EXPO } from "@/lib/animations";

const SPRINTS: SprintData[] = [
  {
    id: "b2c-sprint",
    title: "B2C Growth Sprint™",
    subtitle: "Build a complete growth infrastructure that attracts, converts, and retains customers.",
    price: "₹5,00,000",
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
  const [selectedSprint, setSelectedSprint] = useState<SprintData | null>(null);

  return (
    <section id="pricing" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-16 md:px-12 md:py-24">
      <Eyebrow index="05" label="Investment & Growth Sprints" />

      {/* Header Copy */}
      <div className="mt-6 max-w-4xl">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink dark:text-white sm:text-3xl md:text-4xl leading-[1.1]">
          <TextReveal as="span" className="block" text="Growth Isn't Purchased." />
          <TextReveal as="span" className="block text-accent dark:text-indigo-400" text="It's Built Through Commitment." delay={0.12} />
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-body dark:text-slate-300 font-medium">
          Every Growth Sprint™ is a focused 90-day engagement where strategy, execution, and optimisation work together under one accountable team. Click any sprint to view its full Blueprint.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {SPRINTS.map((s, i) => {
          const isB2B = s.id === "b2b-sprint";
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
              className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 shadow-card transition-all duration-500 hover:-translate-y-2 ${
                isB2B
                  ? "border-2 border-accent dark:border-indigo-500 bg-surface dark:bg-[#181822] shadow-2xl shadow-accent/15"
                  : "border border-black/[0.08] dark:border-white/10 bg-surface dark:bg-[#141419]"
              }`}
            >
              {isB2B && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                  ★ Most Popular System
                </span>
              )}

              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent dark:text-indigo-400 bg-accent/10 dark:bg-accent/20 px-3 py-1 rounded-full">
                    {s.duration}
                  </span>
                  <span className="font-mono text-xs font-bold text-amber">
                    Starting From
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-ink dark:text-white sm:text-2xl">
                  {s.title}
                </h3>
                
                <p className="mt-2 font-display text-2xl font-extrabold text-ink dark:text-white">
                  {s.price}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-body dark:text-slate-300 font-medium leading-relaxed">
                  {s.subtitle}
                </p>

                {/* Key Deliverables Bullet Checklist */}
                <div className="mt-6 border-t border-black/[0.06] dark:border-white/10 pt-5 space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50 dark:text-slate-400 font-bold block mb-2">
                    Key Infrastructure Included:
                  </span>
                  {s.deliverables.slice(0, 4).map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs font-semibold text-ink dark:text-white">
                      <span className="text-amber font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/10 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSprint(s)}
                  className="w-full rounded-full border border-accent/40 bg-accent/5 dark:bg-accent/15 px-5 py-3 font-mono text-xs font-bold text-accent dark:text-indigo-300 transition-all duration-300 hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-white shadow-sm"
                >
                  View Complete Growth Blueprint →
                </button>

                <a
                  href="#diagnosis"
                  className="w-full text-center rounded-full bg-ink dark:bg-white px-5 py-3 font-mono text-xs font-bold text-white dark:text-black transition-all duration-300 hover:bg-accent dark:hover:bg-amber shadow-sm"
                >
                  Book Diagnosis
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sprint Modal Component */}
      <SprintModal
        sprint={selectedSprint}
        onClose={() => setSelectedSprint(null)}
      />
    </section>
  );
}
