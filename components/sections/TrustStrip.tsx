import Marquee from "@/components/ui/Marquee";

import {
  SiStripe,
  SiWebflow,
  SiInstagram,
  SiTiktok,
  SiReact,
  SiWordpress,
  SiFigma,
} from "react-icons/si";

const LOGOS = [
  {
    name: "Stripe",
    icon: <SiStripe className="h-6 w-6 text-[#635BFF]" />,
  },
  {
    name: "Webflow",
    icon: <SiWebflow className="h-6 w-6 text-[#4353FF]" />,
  },
  {
    name: "Instagram",
    icon: <SiInstagram className="h-6 w-6 text-[#E4405F]" />,
  },
  {
    name: "TikTok",
    icon: <SiTiktok className="h-6 w-6 text-black dark:text-white" />,
  },
  {
    name: "React JS",
    icon: <SiReact className="h-6 w-6 text-[#61DAFB]" />,
  },
  {
    name: "WordPress",
    icon: <SiWordpress className="h-6 w-6 text-[#21759B]" />,
  },

  {
    name: "Figma",
    icon: <SiFigma className="h-6 w-6 text-ink dark:text-white" />,
  },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-black/[0.05] dark:border-white/10 py-8">
      <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.25em] text-ink/50 dark:text-slate-400">
        Trusted by growing businesses
      </p>
      {/* opposite direction to the hero marquee */}
      <Marquee reverse speed={40}>
        {LOGOS.map((l) => (
          <div
            key={l.name}
            className="mx-12 flex items-center gap-3 opacity-70 transition-all duration-300 hover:opacity-100"
          >
            {l.icon}

            <span className="text-lg font-semibold text-ink dark:text-white">{l.name}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
