/** Case study content — shared by the homepage cards/modal and the /case-studies page. */

export interface Metric {
  label: string;
  value: string;
  sub?: string;
}

export interface ChartBar {
  label: string;
  /** Numeric value used for the bar length. */
  value: number;
  /** Formatted value shown next to the bar. */
  display: string;
  tone?: "gold" | "soft" | "muted";
}

export interface Chart {
  title: string;
  /** Axis / unit note shown under the bars. */
  unit?: string;
  bars: ChartBar[];
}

export interface Score {
  title: string;
  value: number;
  max: number;
}

/** Long-form content shown on the /case-studies page. */
export interface CaseReport {
  meta: string;
  quote: string;
  /** Sign-off line from the case study banner. */
  tagline: string;
  /** Extra figures called out on the banner, beyond the key results. */
  highlights: Metric[];
  /** What drove the result, from the banner and the "how we solved it" copy. */
  pillars: string[];
  problem: string;
  solution: string;
  metrics: Metric[];
  score?: Score;
  charts: Chart[];
  caption: string;
  cta: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  headline: string;
  /** One-line summary used in the report's table of contents. */
  summary: string;
  outcome: string;
  problem: string;
  solution: string;
  metrics: Metric[];
  image: string;
  report: CaseReport;
}

export const CASE_STUDIES_PATH = "/case-studies";
export const CASE_STUDIES_PDF = "/ScaleXpertz_Case_Studies_Report.pdf";

export const REPORT_STATS: Metric[] = [
  { value: "12X", label: "Highest ROAS" },
  { value: "11,500+", label: "Orders Delivered" },
  { value: "150+", label: "Leads / Day (Peak)" },
  { value: "90%", label: "Lower CPL vs Industry" },
  { value: "100/100", label: "Meta Opportunity Score" },
];

export const REPORT_INTRO =
  "This report brings together five verified campaign engagements across eCommerce, EV & mobility, and new-brand launches. Every figure — spend, revenue, ROAS, CPL, leads, and reach — is pulled directly from campaign records. Nothing here is projected or rounded up for effect.";

export const REPORT_SUMMARY = {
  text: "Across eCommerce engagements alone, ad spend has translated into revenue multiples ranging from roughly 2X to 12X depending on category and consideration level — proof that the strategy adapts to the product, not the other way around.",
  chart: {
    title: "Revenue Multiple Across eCommerce Engagements",
    unit: "Revenue multiple (X of spend)",
    bars: [
      { label: "Toy eCommerce", value: 12, display: "12.0X", tone: "gold" },
      { label: "Astrology & Spiritual", value: 6.7, display: "6.7X", tone: "soft" },
      { label: "Jewellery (Volume Model)", value: 2.4, display: "2.4X", tone: "muted" },
    ],
  } satisfies Chart,
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "toy-ecommerce",
    client: "Toy eCommerce",
    category: "eCommerce",
    headline: "12X ROAS",
    summary: "Scaling to 12X ROAS",
    outcome:
      "Turned ₹2.6L in ad spend into ₹31.2L in revenue by rebuilding the growth strategy—not just increasing the budget.",
    problem:
      "A toy eCommerce brand had a working product but a stalling ad account — spend was capped low because every attempt to scale further killed ROAS.",
    solution:
      "We rebuilt campaign structure around targeted Facebook ad sets, layer audience segmentation by parent demographics, and ran rapid creative testing.",
    metrics: [
      { label: "Duration", value: "5 Months" },
      { label: "Ad Spend", value: "₹2.6L" },
      { label: "Revenue", value: "₹31.2L" },
      { label: "ROAS", value: "12X" },
    ],
    image: "/works/toy-ecommerce.jpeg",
    report: {
      meta: "Meta Ads · eCommerce · India",
      quote: "₹2.6L in, ₹31.2L out — scaling a toy brand to 12X ROAS",
      tagline: "Small investment. Massive returns.",
      highlights: [
        { value: "+1100%", label: "Growth", sub: "Revenue over ad spend" },
        { value: "Meta Ads", label: "Channel", sub: "Facebook ad sets" },
      ],
      pillars: ["Precise Targeting", "Creative Testing", "Scaling What Works", "Profitable Growth"],
      problem:
        "A toy eCommerce brand had a working product but a stalling ad account — spend was capped low because every attempt to scale further killed ROAS. They needed proof the catalog could support serious budget before committing more capital.",
      solution:
        "We rebuilt the campaign structure around highly targeted Facebook ad sets, layering in audience segmentation by parent demographics and gifting intent, then used creative testing cycles to isolate winning angles before scaling budget behind them.",
      metrics: [
        { label: "Duration", value: "5 Months" },
        { label: "Ad Spend", value: "₹2.6L" },
        { label: "Revenue", value: "₹31.2L" },
        { label: "ROAS", value: "12X" },
      ],
      charts: [
        {
          title: "Toy eCommerce — 5 Month Campaign",
          unit: "Amount (₹ Lakhs)",
          bars: [
            { label: "Revenue Generated", value: 31.2, display: "₹31.2L", tone: "gold" },
            { label: "Ad Spend", value: 2.6, display: "₹2.6L", tone: "muted" },
          ],
        },
      ],
      caption: "Ad spend vs. revenue generated over the 5-month engagement",
      cta: "Want your ad account to scale without ROAS collapsing? Let's audit your account — free.",
    },
  },
  {
    id: "jewellery-ecommerce",
    client: "Jewellery eCommerce",
    category: "eCommerce",
    headline: "11,500+ Orders",
    summary: "11,500+ Orders, ₹80L in Revenue",
    outcome:
      "Built a scalable growth engine that generated ₹80L in revenue while handling high-volume order demand.",
    problem:
      "This jewellery brand needed order volume at scale without the ad account or fulfillment funnel breaking down.",
    solution:
      "We ran a full-funnel Meta Ads operation with multiple concurrent catalog & collection campaigns, reallocating budget to converting SKUs.",
    metrics: [
      { label: "Duration", value: "2.5 Months" },
      { label: "Ad Spend", value: "₹33.7L" },
      { label: "Revenue", value: "₹80.0L" },
      { label: "Orders", value: "11,500+" },
    ],
    image: "/works/jewellery-ecommerce.jpeg",
    report: {
      meta: "Meta Ads · eCommerce · India",
      quote: "11,500 orders. ₹80L in revenue. One growth engine.",
      tagline: "One growth engine. Massive results.",
      highlights: [
        { value: "168%", label: "Growth", sub: "Revenue growth over the campaign" },
        { value: "5-Star", label: "Orders Delivered", sub: "11,500+ fulfilled orders" },
      ],
      pillars: ["Precise Targeting", "Catalog Campaigns", "High Conversions", "Profitable Scaling"],
      problem:
        "This jewellery brand needed volume, not just efficiency. The challenge wasn't proving a single campaign could work — it was proving the brand could handle sustained order volume at scale without the ad account or fulfillment funnel breaking down.",
      solution:
        "We ran a full-funnel Meta Ads operation with multiple concurrent campaigns across catalog and collection-based targeting, continuously reallocating budget toward the highest-converting SKUs and audiences as data came in.",
      metrics: [
        { label: "Duration", value: "2.5 Months" },
        { label: "Ad Spend", value: "₹33.7L" },
        { label: "Revenue", value: "₹80L" },
        { label: "Orders", value: "11,500+" },
      ],
      charts: [
        {
          title: "Jewellery eCommerce — 2.5 Month Campaign",
          unit: "Amount (₹ Lakhs)",
          bars: [
            { label: "Revenue", value: 80, display: "₹80.0L", tone: "gold" },
            { label: "Ad Spend", value: 33.7, display: "₹33.7L", tone: "muted" },
          ],
        },
      ],
      caption: "Ad spend vs. revenue generated over the 2.5-month engagement",
      cta: "Building a brand that needs volume, not just ROAS? Let's talk scale.",
    },
  },
  {
    id: "astrology-ecommerce",
    client: "Astrology & Spiritual eCommerce",
    category: "eCommerce",
    headline: "Trust Before Products",
    summary: "6.7X ROAS in a Trust-Sensitive Niche",
    outcome:
      "When trust was the biggest barrier to purchase, we built campaigns that earned credibility before asking for the sale.",
    problem:
      "High-consideration spiritual products needed buyer trust before product sales. Generic ad creative was failing cold traffic.",
    solution:
      "We built creative around credibility signals and outcome-driven messaging paired with high-intent audience targeting.",
    metrics: [
      { label: "Duration", value: "2 Months" },
      { label: "Ad Spend", value: "₹3.35L" },
      { label: "Revenue", value: "₹22.6L" },
      { label: "ROAS", value: "6.7X" },
    ],
    image: "/works/astrology-ecommerce.jpeg",
    report: {
      meta: "Meta Ads · eCommerce · India",
      quote: "How do you sell trust? 6.7X ROAS in a trust-sensitive niche.",
      tagline: "Strategy. Trust. Scale.",
      highlights: [
        { value: "+576%", label: "Revenue Growth", sub: "From start to month 2" },
        { value: "Trust", label: "Sold Better Than Products", sub: "Credibility-first creative" },
      ],
      pillars: ["Credibility Signals", "Outcome-Driven Messaging", "High-Intent Targeting", "Trust Before the Sale"],
      problem:
        "Astrology and spiritual products (gemstones, ratnas, Vastu items) are a high-consideration purchase — customers need to trust the brand before they trust the product. Generic ad creative wasn't converting cold traffic.",
      solution:
        "We built creative around credibility signals and outcome-driven messaging rather than product-first ads, paired with tight audience targeting to reach genuinely interested buyers instead of broad spiritual-content audiences.",
      metrics: [
        { label: "Duration", value: "2 Months" },
        { label: "Ad Spend", value: "₹3.35L" },
        { label: "Revenue", value: "₹22.6L" },
        { label: "ROAS", value: "6.7X" },
      ],
      charts: [
        {
          title: "Astrology & Spiritual eCommerce — 2 Month Campaign",
          unit: "Amount (₹ Lakhs)",
          bars: [
            { label: "Revenue Generated", value: 22.6, display: "₹22.60L", tone: "gold" },
            { label: "Ad Spend", value: 3.35, display: "₹3.35L", tone: "muted" },
          ],
        },
      ],
      caption: "Ad spend vs. revenue generated over the 2-month engagement",
      cta: "Selling something that needs trust before conversion? We build that into the ad, not just the landing page.",
    },
  },
  {
    id: "ev-mobility",
    client: "EV & Mobility Brand",
    category: "EV & Mobility",
    headline: "150+ Qualified Leads Every Day",
    summary: "150+ Leads/Day at 90% Lower CPL",
    outcome:
      "Generated consistent, high-quality leads while reducing acquisition costs by 90% below the industry average.",
    problem:
      "Needed high-volume D2C leads across multiple regional markets simultaneously without cost-per-lead ballooning.",
    solution:
      "Built 48 segmented campaigns with WhatsApp lead funnels, reducing CPL to ₹5.40 compared to the ₹54 industry average.",
    metrics: [
      { label: "Campaigns", value: "48 Active" },
      { label: "Peak Leads", value: "150+/day" },
      { label: "Lowest CPL", value: "₹5.40" },
      { label: "CPL Reduction", value: "90% Lower" },
    ],
    image: "/works/150_leads.jpeg",
    report: {
      meta: "Meta Ads · D2C Lead Generation · EV/Mobility",
      quote: "150+ leads a day, at a CPL 90% below industry average.",
      tagline: "Smart strategy. Maximum impact.",
      highlights: [
        { value: "₹54", label: "Industry Average CPL", sub: "vs ₹5.40 achieved" },
        { value: "4", label: "Regional Markets", sub: "Plus a dedicated B2B stream" },
      ],
      pillars: ["Click-to-WhatsApp Funnels", "Influencer-Angle Segmentation", "Geo-Specific Targeting", "Continuous A/B Testing"],
      problem:
        "An EV brand running two sister product lines simultaneously needed high-quality D2C leads across multiple cities and audience segments at once — without cost-per-lead spiraling as they scaled, the usual failure point in regional EV lead gen.",
      solution:
        "We built and managed 48 concurrent campaigns segmented by influencer angle, geo-specific targeting across four regional markets, and a dedicated B2B stream — using Click-to-WhatsApp campaigns to cut friction, with continuous A/B testing on creative and budget.",
      metrics: [
        { label: "Campaigns", value: "48" },
        { label: "Peak Leads", value: "150+/day" },
        { label: "Lowest CPL", value: "₹5.40" },
        { label: "Lower CPL vs Industry", value: "90%" },
      ],
      charts: [
        {
          title: "CPL: Industry vs Achieved",
          unit: "Cost per lead (₹)",
          bars: [
            { label: "Industry Average CPL", value: 54, display: "₹54.00", tone: "muted" },
            { label: "Achieved CPL", value: 5.4, display: "₹5.40", tone: "gold" },
          ],
        },
        {
          title: "Monthly Reach",
          unit: "Reach (in Lakhs)",
          bars: [
            { label: "April", value: 6.35, display: "6.35L", tone: "gold" },
            { label: "May", value: 3.22, display: "3.22L", tone: "soft" },
          ],
        },
      ],
      caption: "Cost-per-lead vs. industry average, and monthly reach trend",
      cta: "Scaling an EV or mobility brand across multiple cities? Let's build a lead engine that doesn't punish growth.",
    },
  },
  {
    id: "battery-swap",
    client: "Battery-Swap Mobility Startup",
    category: "Brand Launch",
    headline: "From Zero History",
    summary: "Zero to a 100/100 Opportunity Score",
    outcome:
      "Built a complete customer acquisition system from scratch and launched a brand with no historical campaign data.",
    problem:
      "Brand-new startup with zero ad account history needed both B2B and D2C lead streams on day one.",
    solution:
      "Architected dedicated B2B form streams, city-specific D2C campaigns, and awareness pushes running simultaneously.",
    metrics: [
      { label: "Opportunity Score", value: "100/100" },
      { label: "B2B Leads", value: "73" },
      { label: "B2B CPL", value: "₹14.73" },
      { label: "Awareness Reach", value: "86,779" },
    ],
    image: "/works/from-zero-history.jpeg",
    report: {
      meta: "Meta Ads · New Brand Launch · Mobility",
      quote: "Day one, zero history. Month one, a perfect 100/100.",
      tagline: "Month one success.",
      highlights: [
        { value: "₹1,074.21", label: "Amount Spent", sub: "Meta Ads, last 30 days" },
        { value: "382", label: "Messaging Conversations", sub: "Launch month" },
        { value: "73", label: "On-Facebook Leads", sub: "B2B form results" },
      ],
      pillars: ["B2B Form-Lead Stream", "City-Specific D2C Campaign", "Separate Awareness Push", "All Running Simultaneously"],
      problem:
        "A brand-new battery-swap startup had zero ad account history and zero brand recognition, and needed to generate both B2B and D2C leads from the very first campaign — with no existing data to work from.",
      solution:
        "We built the entire campaign architecture from scratch: a dedicated B2B form-lead stream, a city-specific D2C lead campaign, and a separate awareness push — built to run simultaneously rather than sequentially.",
      metrics: [
        { label: "Opportunity Score", value: "100/100" },
        { label: "B2B Leads", value: "73" },
        { label: "B2B CPL", value: "₹14.73" },
        { label: "Awareness Reach", value: "86,779" },
      ],
      score: { title: "Meta Opportunity Score (Month 1)", value: 100, max: 100 },
      charts: [
        {
          title: "Launch Month Funnel",
          unit: "Count",
          bars: [
            { label: "B2B Form Leads", value: 73, display: "73", tone: "soft" },
            { label: "Messaging Conversations", value: 382, display: "382", tone: "gold" },
            { label: "Awareness Reach (thousands)", value: 87, display: "87", tone: "muted" },
          ],
        },
      ],
      caption: "Meta Opportunity Score and launch-month funnel performance",
      cta: "Launching a new brand with zero history? That's exactly the kind of blank slate we like starting from.",
    },
  },
];
