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
  /** Card / thumbnail image (WhatsApp JPG). */
  image: string;
  /** Dashboard screenshot shown in Insights / case detail. */
  insightsImage: string;
  report: CaseReport;
  /** Homepage featured rank (1–5). Omitted cases sit behind More. */
  featuredRank?: number;
  /** Individual source document in /public. Falls back to CASE_STUDIES_PDF. */
  reportFile?: string;
}

export const CASE_STUDIES_PATH = "/case-studies";
export const CASE_STUDIES_PDF = "/ScaleXpertz_Case_Studies_Report.pdf";

export function featuredCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((c) => c.featuredRank != null).sort(
    (a, b) => (a.featuredRank ?? 0) - (b.featuredRank ?? 0),
  );
}

export function remainingCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((c) => c.featuredRank == null);
}

export function caseStudyFile(study: CaseStudy): string {
  return study.reportFile ?? CASE_STUDIES_PDF;
}

export const REPORT_STATS: Metric[] = [
  { value: "12.54X", label: "Highest Account ROAS" },
  { value: "38,673", label: "Jewellery Orders / 90 Days" },
  { value: "₹2.82 Cr", label: "Store Revenue (90 Days)" },
  { value: "₹2.07 Cr", label: "Flagship Shopify Sales" },
  { value: "10K+", label: "Calls & Conversations" },
];

export const REPORT_INTRO =
  "This report brings together sixteen verified campaign and store engagements across fashion, jewellery, catalogue, accessories, lead generation, awareness, and Shopify growth. Every figure — spend, revenue, ROAS, orders, clicks, and conversations — is pulled directly from campaign or store records. Nothing here is projected or rounded up for effect.";

export const REPORT_SUMMARY = {
  text: "Across eCommerce engagements, reported account-level return ranges from roughly 2X to 12.54X depending on category and consideration level — proof that the strategy adapts to the product, not the other way around.",
  chart: {
    title: "Reported Account ROAS Across eCommerce Engagements",
    unit: "Revenue multiple (X of spend)",
    bars: [
      { label: "Multi-Category Catalogue", value: 12.54, display: "12.54X", tone: "gold" },
      { label: "Automotive Accessories", value: 11.27, display: "11.27X", tone: "gold" },
      { label: "Heritage Home Décor", value: 5.8, display: "5.80X", tone: "soft" },
      { label: "Festive Women's Wear", value: 3.25, display: "3.25X", tone: "muted" },
      { label: "Contemporary Ethnic Wear", value: 2.98, display: "2.98X", tone: "muted" },
    ],
  } satisfies Chart,
};

const FILES = {
  heritage: "/ScaleXpertz_Individual_Case_Studies/01_heritage_home_decor.docx",
  ethnic: "/ScaleXpertz_Individual_Case_Studies/02_contemporary_ethnic_wear.docx",
  festive: "/ScaleXpertz_Individual_Case_Studies/03_festive_womens_wear_d2c.docx",
  bangles: "/ScaleXpertz_Individual_Case_Studies/04_bangles_fashion_jewellery.docx",
  mobile: "/ScaleXpertz_Individual_Case_Studies/05_mobile_accessories.docx",
  auto: "/ScaleXpertz_Individual_Case_Studies/06_automotive_accessories.docx",
  catalogue: "/ScaleXpertz_Individual_Case_Studies/07_multi_category_catalogue.docx",
  leads: "/ScaleXpertz_Individual_Case_Studies/08_lead_generation_calls_whatsapp.docx",
  luggage: "/ScaleXpertz_Individual_Case_Studies/09_global_luggage_house.docx",
  broader: "/ScaleXpertz_Individual_Case_Studies/10_broader_campaign_set_90_days.docx",
  awareness: "/ScaleXpertz_Individual_Case_Studies/11_brand_awareness_ad_recall.docx",
  shopifyA: "/ScaleXpertz_Individual_Case_Studies/12_shopify_store_a.docx",
  shopifyB: "/ScaleXpertz_Individual_Case_Studies/13_shopify_store_b.docx",
  shopifyC: "/ScaleXpertz_Individual_Case_Studies/14_shopify_store_c.docx",
  shopifyD: "/ScaleXpertz_Individual_Case_Studies/15_shopify_store_d.docx",
  shopifyE: "/ScaleXpertz_Individual_Case_Studies/16_shopify_store_e.docx",
} as const;

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "heritage-home-decor",
    client: "Heritage Home Décor",
    category: "eCommerce",
    headline: "5.80X ROAS",
    summary: "$848 in spend generated $4,918 in tracked revenue",
    outcome:
      "Organised a global craft-led store around separate campaign roles and turned $848 in ad spend into $4,918 in tracked revenue, with 82 purchases.",
    problem:
      "The brand had attractive, craft-led products and shipped worldwide, but global attention was not turning into predictable orders. A single scattered campaign made it hard to see which activity found new buyers and which brought interested shoppers back.",
    solution:
      "We split the account into six focused campaigns, including broad prospecting, retargeting, a collection campaign and a creative-test campaign, so discovery, follow-up and testing each had a clear role.",
    metrics: [
      { label: "Ad Spend", value: "$848" },
      { label: "Revenue", value: "$4,918" },
      { label: "ROAS", value: "5.80X" },
      { label: "Purchases", value: "82" },
    ],
    image: "/case-studies/heritage-home-decor.jpg",
    insightsImage: "/case-studies/insights/heritage-home-decor.png",
    reportFile: FILES.heritage,
    report: {
      meta: "Meta Ads · Home Décor · International",
      quote: "$848 in, $4,918 out — 5.80X ROAS on a global décor account.",
      tagline: "Structure first. Then scale.",
      highlights: [
        { value: "6.20X", label: "Retargeting ROAS", sub: "Strongest named campaign group" },
        { value: "610", label: "Add-to-carts", sub: "Shopping intent before 82 purchases" },
      ],
      pillars: ["Broad Prospecting", "Retargeting", "Collection Visibility", "Creative Testing"],
      problem:
        "A craft-led home décor brand selling internationally needed a dependable way to turn attention into store orders. The challenge was not simply more traffic — the account needed a structure that could reach new shoppers, reconnect with people who had already shown interest, present the wider collection and test fresh creative without treating every audience as the same.",
      solution:
        "ScaleXpertz organised the account around separate campaign roles instead of one broad campaign. Broad prospecting found new buyers (6.10X ROAS), retargeting reconnected with people who had shown intent (6.20X), a collection campaign presented the wider range, and creative testing kept new ideas in circulation — the weakest test campaign still stayed above 4X.",
      metrics: [
        { label: "Ad Spend", value: "$848" },
        { label: "Tracked Revenue", value: "$4,918" },
        { label: "Reported ROAS", value: "5.80X" },
        { label: "Cost per Purchase", value: "$10.34" },
      ],
      charts: [
        {
          title: "Heritage Home Décor — Account Result",
          unit: "Amount (USD)",
          bars: [
            { label: "Tracked Revenue", value: 4918, display: "$4,918", tone: "gold" },
            { label: "Ad Spend", value: 848, display: "$848", tone: "muted" },
          ],
        },
      ],
      caption: "Ad spend vs. tracked revenue from the original case record",
      cta: "Need a structured account that can turn international attention into orders? Let's review the setup.",
    },
  },
  {
    id: "contemporary-ethnic-wear",
    client: "Contemporary Ethnic Wear",
    category: "Fashion",
    headline: "987 Purchases",
    summary: "987 purchases and $98.7K in tracked revenue",
    outcome:
      "Built an omnichannel fashion account around occasion-led product families. Six campaigns generated 987 purchases and $98.7K in tracked revenue at 2.98X ROAS.",
    problem:
      "An established fashion label needed its online store to perform in line with its physical retail business. Treating the entire catalogue as one offer hid differences between collections and campaign types.",
    solution:
      "We organised campaigns around sets, co-ords, dresses and festive layers, and ran broad, retargeting, video and dynamic formats side by side so volume did not depend on one creative.",
    metrics: [
      { label: "Revenue", value: "$98.7K" },
      { label: "ROAS", value: "2.98X" },
      { label: "Purchases", value: "987" },
      { label: "Campaigns", value: "6" },
    ],
    image: "/case-studies/contemporary-ethnic-wear.jpg",
    insightsImage: "/case-studies/insights/contemporary-ethnic-wear.png",
    reportFile: FILES.ethnic,
    report: {
      meta: "Meta Ads · Fashion · Omnichannel",
      quote: "987 purchases. $98.7K tracked. Six campaigns in a tight 2.64X–3.21X band.",
      tagline: "Volume with consistency.",
      highlights: [
        { value: "$33.55", label: "Cost per Purchase", sub: "Account-level efficiency" },
        { value: "241", label: "Lead Broad Campaign", sub: "$25.8K tracked revenue" },
      ],
      pillars: ["Occasion-Led Collections", "Broad + Retargeting", "Video Campaigns", "Dynamic Formats"],
      problem:
        "The online store had to support a business that already had physical retail and a loyal customer base. Fashion demand is shaped by product type and occasion — a single ad or product line was not expected to carry the entire account.",
      solution:
        "ScaleXpertz organised campaigns around occasion-led product families and ran several campaign types side by side. The six campaigns stayed between 2.64X and 3.21X ROAS. The lead broad campaign delivered 241 purchases and $25.8K, about a quarter of the account result, while the rest of the set also contributed.",
      metrics: [
        { label: "Tracked Revenue", value: "$98.7K" },
        { label: "Reported ROAS", value: "2.98X" },
        { label: "Purchases", value: "987" },
        { label: "Cost per Purchase", value: "$33.55" },
      ],
      charts: [
        {
          title: "Ethnic Wear — Campaign Consistency",
          unit: "Reported ROAS",
          bars: [
            { label: "Highest campaign", value: 3.21, display: "3.21X", tone: "gold" },
            { label: "Account average", value: 2.98, display: "2.98X", tone: "soft" },
            { label: "Lowest campaign", value: 2.64, display: "2.64X", tone: "muted" },
          ],
        },
      ],
      caption: "ROAS range across the six reported campaigns",
      cta: "Need online fashion volume that does not rely on one winning ad? Let's map the collections.",
    },
  },
  {
    id: "festive-womens-wear",
    client: "Festive Women's Wear D2C",
    category: "Fashion",
    headline: "$244.8K Revenue",
    summary: "$75K in spend generated $244.8K in tracked revenue",
    outcome:
      "Tested six buying angles in parallel and shifted budget to the winners. The account recorded 2,448 purchases and $244.8K in tracked revenue from $75K spend, at 3.25X ROAS.",
    problem:
      "A fast-growing Shopify fashion label with bundle offers needed to find stronger campaign angles quickly and stop paying for weaker ones — while 5,998 add-to-carts showed a large pool of unfinished intent.",
    solution:
      "We ran broad, retargeting, value-offer, creator try-on, new-drop and cart-recovery angles together, then moved budget toward cart recovery (6.85X, 480 purchases) and embroidered-edit retargeting (5.24X).",
    metrics: [
      { label: "Ad Spend", value: "$75K" },
      { label: "Revenue", value: "$244.8K" },
      { label: "ROAS", value: "3.25X" },
      { label: "Purchases", value: "2,448" },
    ],
    image: "/case-studies/festive-womens-wear.jpg",
    insightsImage: "/case-studies/insights/festive-womens-wear.png",
    featuredRank: 5,
    reportFile: FILES.festive,
    report: {
      meta: "Meta Ads · Fashion D2C · Shopify",
      quote: "$75K in, $244.8K out — six angles, one account, 3.25X ROAS.",
      tagline: "Test in parallel. Fund the winners.",
      highlights: [
        { value: "6.85X", label: "Cart Recovery", sub: "480 purchases at $16.68 each" },
        { value: "5,998", label: "Add-to-carts", sub: "Shopping intent in the account" },
      ],
      pillars: ["Six Parallel Angles", "Cart Recovery", "Creator Try-On", "Budget Reallocation"],
      problem:
        "The brand was growing and had bundle offers, but it needed to learn quickly which messages converted. Performance can differ between broad audiences, people who already know the brand, offer-led messaging, creator content, new drops and shoppers who leave items in their carts.",
      solution:
        "ScaleXpertz ran six approaches in parallel and shifted budget towards the activity that performed best. Cart recovery was the standout: 480 purchases at $16.68 and 6.85X ROAS, versus a $30.77 account-level cost per purchase. Embroidered-edit retargeting delivered 5.24X.",
      metrics: [
        { label: "Ad Spend", value: "$75K" },
        { label: "Tracked Revenue", value: "$244.8K" },
        { label: "Reported ROAS", value: "3.25X" },
        { label: "Purchases", value: "2,448" },
      ],
      charts: [
        {
          title: "Festive Wear — Spend vs Revenue",
          unit: "Amount (USD thousands)",
          bars: [
            { label: "Tracked Revenue", value: 244.8, display: "$244.8K", tone: "gold" },
            { label: "Ad Spend", value: 75, display: "$75K", tone: "muted" },
          ],
        },
      ],
      caption: "Account-level spend vs. tracked revenue from the original case record",
      cta: "Sitting on add-to-carts that never become orders? Let's build the recovery layer.",
    },
  },
  {
    id: "bangles-fashion-jewellery",
    client: "Bangles and Fashion Jewellery",
    category: "eCommerce",
    headline: "₹2.82 Cr in 90 Days",
    summary: "₹2.82 Cr in store revenue over 90 days, up 189%",
    outcome:
      "Ran 38 campaigns in structured batches and grew a price-sensitive jewellery store to ₹2.82 Cr in revenue and 38,673 orders over 90 days — 189% period-over-period growth.",
    problem:
      "A fashion-jewellery D2C brand in a price-sensitive, impulse-driven category needed order volume without losing control. Creative fatigue was a stated risk, and weak ad sets could burn budget quickly.",
    solution:
      "We ran 38 campaigns testing designs, bundles and catalogue formats, reviewed daily order, delivery and ROAS data, and cut weak ad sets. Strong campaigns reached 5.05X ROAS and CTR hit 7.04%.",
    metrics: [
      { label: "Store Revenue", value: "₹2.82 Cr" },
      { label: "Orders", value: "38,673" },
      { label: "Growth", value: "+189%" },
      { label: "Campaigns", value: "38" },
    ],
    image: "/case-studies/bangles-fashion-jewellery.jpg",
    insightsImage: "/case-studies/insights/bangles-fashion-jewellery.png",
    featuredRank: 1,
    reportFile: FILES.bangles,
    report: {
      meta: "Meta Ads · Fashion Jewellery · D2C",
      quote: "₹2.82 Cr. 38,673 orders. 189% growth — in 90 days.",
      tagline: "Test in batches. Cut what fades.",
      highlights: [
        { value: "5.05X", label: "Strong Campaign ROAS", sub: "Best named campaign result" },
        { value: "3.62X", label: "Ad-Report View", sub: "₹1.44 Cr order value / ₹39.97 L spend" },
      ],
      pillars: ["38-Campaign Batches", "Design & Bundle Tests", "Daily ROAS Review", "Fast Cut Rules"],
      problem:
        "The account needed enough live testing to identify designs and formats that could bring in purchases, while responding quickly when an ad set stopped performing. Waiting too long left budget in creatives that had already fatigued.",
      solution:
        "ScaleXpertz ran 38 campaigns in structured batches, testing designs, bundles and catalogue formats while monitoring order, delivery and ROAS data. Weak ad sets were cut quickly. A separate daily-reporting view showed ₹1.44 Cr in order value against ₹39.97 L spend (3.62X) — kept distinct from the 90-day store total.",
      metrics: [
        { label: "Store Revenue", value: "₹2.82 Cr" },
        { label: "Orders", value: "38,673" },
        { label: "Revenue Growth", value: "+189%" },
        { label: "Live Campaigns", value: "38" },
      ],
      charts: [
        {
          title: "Jewellery — Separate Reporting Views",
          unit: "Amount (₹ Crore)",
          bars: [
            { label: "90-day store revenue", value: 2.82, display: "₹2.82 Cr", tone: "gold" },
            { label: "Ad-report order value", value: 1.44, display: "₹1.44 Cr", tone: "soft" },
            { label: "Ad spend (report view)", value: 0.3997, display: "₹39.97 L", tone: "muted" },
          ],
        },
      ],
      caption: "Store-wide revenue and the separate ad-reporting view remain distinct records",
      cta: "Need jewellery volume without creative fatigue eating the budget? Let's set up the testing loop.",
    },
  },
  {
    id: "mobile-accessories",
    client: "Mobile Accessories",
    category: "eCommerce",
    headline: "Hero SKU at 7.06X",
    summary: "50 campaigns helped identify a hero product at 7.06X ROAS",
    outcome:
      "Split a large accessories catalogue into 50 campaigns so the numbers could rank products. The premium leather case emerged as the hero at 7.06X, inside a 1,469-purchase account averaging 3.52X.",
    problem:
      "A catalogue with many SKUs creates a budget-allocation problem. Giving every product equal attention leaves money behind items that are not producing enough orders, while strong products may not get enough support.",
    solution:
      "We divided the catalogue across 50 campaigns and used product-level results to decide where budget should go — leather case 7.06X, a CPA-focused campaign 4.62X, and the anti-yellowing line 3.85X.",
    metrics: [
      { label: "Avg ROAS", value: "3.52X" },
      { label: "Purchases", value: "1,469" },
      { label: "Hero ROAS", value: "7.06X" },
      { label: "Campaigns", value: "50" },
    ],
    image: "/case-studies/mobile-accessories.jpg",
    insightsImage: "/case-studies/insights/mobile-accessories.png",
    reportFile: FILES.mobile,
    report: {
      meta: "Meta Ads · Mobile Accessories · Catalogue",
      quote: "50 campaigns. One hero product. 7.06X against a 3.52X account average.",
      tagline: "Let the catalogue rank itself.",
      highlights: [
        { value: "₹2.45", label: "Average CPC", sub: "Traffic cost, not cost per purchase" },
        { value: "4.62X", label: "CPA-Focused Campaign", sub: "54 purchases" },
      ],
      pillars: ["50-Campaign Split", "SKU-Level Comparison", "Hero Product Focus", "Budget by Evidence"],
      problem:
        "The key challenge was product selection. Rather than assuming every accessory would perform the same way, the campaign structure needed enough information to compare products and move attention toward stronger performers.",
      solution:
        "ScaleXpertz separated the catalogue into 50 campaigns and used the performance results to rank products. The premium leather case reached 7.06X — roughly twice the 3.52X account average — while other named lines still contributed purchases at 4.62X and 3.85X.",
      metrics: [
        { label: "Average ROAS", value: "3.52X" },
        { label: "Purchases", value: "1,469" },
        { label: "Top Campaign ROAS", value: "7.06X" },
        { label: "Average CPC", value: "₹2.45" },
      ],
      charts: [
        {
          title: "Mobile Accessories — Product-Level ROAS",
          unit: "Reported ROAS",
          bars: [
            { label: "Premium leather case", value: 7.06, display: "7.06X", tone: "gold" },
            { label: "CPA-focused campaign", value: 4.62, display: "4.62X", tone: "soft" },
            { label: "Anti-yellowing line", value: 3.85, display: "3.85X", tone: "soft" },
            { label: "Account average", value: 3.52, display: "3.52X", tone: "muted" },
          ],
        },
      ],
      caption: "Named product campaigns vs. the account average",
      cta: "Too many SKUs, not enough clarity on what deserves budget? We'll rank the catalogue.",
    },
  },
  {
    id: "automotive-accessories",
    client: "Automotive Accessories",
    category: "eCommerce",
    headline: "11.27X Across 38 Campaigns",
    summary: "9,319 purchases with 11.27X average ROAS across 38 campaigns",
    outcome:
      "Matched lights, tools and bike parts to their own audiences and formats. The account recorded 9,319 purchases and 11.27X average ROAS; the strongest named campaign reached 22.30X.",
    problem:
      "Buyers in this category compare prices closely, and lights, tools and bike parts do not attract the same shoppers. A broad structure hid product-level winners and left scale dependent on one message.",
    solution:
      "We ran 38 product-specific campaigns: spray-gun retargeting at 22.30X, influencer fog-light creative at 14.71X (260 purchases), and a broad scaling campaign at 13.02X with 1,817 purchases.",
    metrics: [
      { label: "Avg ROAS", value: "11.27X" },
      { label: "Purchases", value: "9,319" },
      { label: "Best Campaign", value: "22.30X" },
      { label: "Avg CPC", value: "₹0.92" },
    ],
    image: "/case-studies/automotive-accessories.jpg",
    insightsImage: "/case-studies/insights/automotive-accessories.png",
    featuredRank: 3,
    reportFile: FILES.auto,
    report: {
      meta: "Meta Ads · Automotive Accessories",
      quote: "9,319 purchases. 11.27X average. A 22.30X retargeting set.",
      tagline: "Match the product. Then scale.",
      highlights: [
        { value: "14.71X", label: "Fog-Light Influencer", sub: "260 purchases" },
        { value: "1,817", label: "Broad Scaling Purchases", sub: "13.02X ROAS · ₹46.20 CPP" },
      ],
      pillars: ["Product-Specific Audiences", "Retargeting Winners", "Influencer Creative", "Broad Scaling"],
      problem:
        "A car-wash spray gun, fog lights and other accessories do not necessarily attract the same shoppers or respond to the same creative. The account needed enough separation to identify product-specific winners while still delivering purchase volume at scale.",
      solution:
        "ScaleXpertz matched products with audiences and formats across 38 campaigns. Retargeting for the spray gun reached 22.30X, influencer-led fog-light creative reached 14.71X, and broad scaling delivered 1,817 purchases at 13.02X. Profile visits were kept in a separate reporting view and not counted as purchases.",
      metrics: [
        { label: "Average ROAS", value: "11.27X" },
        { label: "Purchases", value: "9,319" },
        { label: "Best Campaign ROAS", value: "22.30X" },
        { label: "Average CPC", value: "₹0.92" },
      ],
      charts: [
        {
          title: "Automotive — Named Campaign ROAS",
          unit: "Reported ROAS",
          bars: [
            { label: "Spray-gun retargeting", value: 22.3, display: "22.30X", tone: "gold" },
            { label: "Fog-light influencer", value: 14.71, display: "14.71X", tone: "soft" },
            { label: "Broad scaling", value: 13.02, display: "13.02X", tone: "soft" },
            { label: "Account average", value: 11.27, display: "11.27X", tone: "muted" },
          ],
        },
      ],
      caption: "Named campaign results vs. the 38-campaign account average",
      cta: "Selling accessories that don't share an audience? We'll match product to format.",
    },
  },
  {
    id: "multi-category-catalogue",
    client: "Multi-Category Catalogue",
    category: "eCommerce",
    headline: "12.54X at ₹1.02 Cr Spend",
    summary: "₹1.02 Cr in ad spend across 251 campaigns",
    outcome:
      "Built an ad engine that could absorb crore-level spend. Across 251 live campaigns the account recorded ₹1.02 Cr spend, 9,089 purchases and 12.54X average ROAS.",
    problem:
      "A large catalogue needed a structure that could handle crore-level advertising spend without efficiency collapsing. One high-performing ad could not represent 251 live campaigns.",
    solution:
      "We ran CPA-capped, ABO and CBO structures side by side. The All Products influencer campaign reached 16.08X; an ABO catalogue campaign delivered 12.12X; narrower CBO/ABO setups recorded 10.59X and 9.13X.",
    metrics: [
      { label: "Ad Spend", value: "₹1.02 Cr" },
      { label: "Avg ROAS", value: "12.54X" },
      { label: "Purchases", value: "9,089" },
      { label: "Campaigns", value: "251" },
    ],
    image: "/case-studies/multi-category-catalogue.jpg",
    insightsImage: "/case-studies/insights/multi-category-catalogue.png",
    featuredRank: 2,
    reportFile: FILES.catalogue,
    report: {
      meta: "Meta Ads · Multi-Category Catalogue",
      quote: "₹1.02 Cr spent. 251 campaigns. 12.54X average ROAS.",
      tagline: "Scale without the collapse.",
      highlights: [
        { value: "16.08X", label: "All Products Campaign", sub: "Influencer creative" },
        { value: "8M+", label: "Link Clicks", sub: "₹1.05 average cost per click" },
      ],
      pillars: ["CPA-Capped Campaigns", "ABO Catalogue", "CBO Structures", "Influencer Creative"],
      problem:
        "At this scale, the challenge is not only finding one successful campaign. It is maintaining enough control to compare different campaign structures, keep a broad catalogue active and preserve efficiency as spend increases.",
      solution:
        "ScaleXpertz ran CPA-capped, ABO and CBO structures side by side so the team could compare controls instead of relying on one setup. Strong ROAS appeared in more than one structure, while the 12.54X average covered the full 251-campaign set — not a single winning row.",
      metrics: [
        { label: "Total Ad Spend", value: "₹1.02 Cr" },
        { label: "Average ROAS", value: "12.54X" },
        { label: "Purchases", value: "9,089" },
        { label: "Live Campaigns", value: "251" },
      ],
      charts: [
        {
          title: "Catalogue — Structure Comparison",
          unit: "Reported ROAS",
          bars: [
            { label: "All Products (influencer)", value: 16.08, display: "16.08X", tone: "gold" },
            { label: "Account average", value: 12.54, display: "12.54X", tone: "gold" },
            { label: "ABO catalogue", value: 12.12, display: "12.12X", tone: "soft" },
            { label: "Narrow CBO", value: 10.59, display: "10.59X", tone: "muted" },
            { label: "Narrow ABO", value: 9.13, display: "9.13X", tone: "muted" },
          ],
        },
      ],
      caption: "Named structure results vs. the 251-campaign account average",
      cta: "Spending at crore scale and watching efficiency slip? Let's put structures side by side.",
    },
  },
  {
    id: "lead-generation-calls-whatsapp",
    client: "Lead Generation via Calls and WhatsApp",
    category: "Lead Generation",
    headline: "10,000+ Conversations",
    summary: "More than 10,000 calls and conversations from ₹27.2 lakh in spend",
    outcome:
      "Ran call and messaging campaigns separately and shifted spend to the more efficient channel. The account generated more than 10,000 calls and conversations from ₹27.2 L in spend.",
    problem:
      "A service-led business needed phone calls and chat enquiries, not website clicks. Combining those actions into one result hid which channel was cheaper — and a cheaper contact is not automatically a better lead.",
    solution:
      "We split call and messaging campaigns, compared cost per result, and moved budget toward the lowest-cost channel. Best call campaign: 4,116 calls at ₹6.62; messaging: 3,627 conversations at ₹19.72.",
    metrics: [
      { label: "Ad Spend", value: "₹27.2 L" },
      { label: "Contacts", value: "10K+" },
      { label: "Lowest Cost / Call", value: "₹6.62" },
      { label: "Messaging Cost", value: "₹19.72" },
    ],
    image: "/case-studies/lead-generation-calls-whatsapp.jpg",
    insightsImage: "/case-studies/insights/lead-generation-calls-whatsapp.png",
    reportFile: FILES.leads,
    report: {
      meta: "Meta Ads · Calls · WhatsApp",
      quote: "10,000+ calls and conversations from ₹27.2 L — measured by the action, not the click.",
      tagline: "Optimise for the conversation.",
      highlights: [
        { value: "4,116", label: "Best Call Campaign", sub: "₹6.62 per call" },
        { value: "3,627", label: "Messaging Conversations", sub: "₹19.72 each" },
      ],
      pillars: ["Call Campaigns", "WhatsApp Messaging", "Cost-per-Result Split", "Budget Shift"],
      problem:
        "Website visits do not automatically create a sales conversation. Phone calls and messaging conversations are different actions, with different costs and follow-up processes. The account needed separate campaigns and a clear cost-per-result comparison.",
      solution:
        "ScaleXpertz ran call campaigns and messaging campaigns separately. Named results total 10,237 actions: 4,116 calls at ₹6.62, 2,494 calls at ₹12.15, and 3,627 conversations at ₹19.72. Spend was shifted toward the lowest-cost channel. Lead quality and closed sales were not in the source record.",
      metrics: [
        { label: "Total Ad Spend", value: "₹27.2 L" },
        { label: "Calls & Conversations", value: "10K+" },
        { label: "Lowest Cost per Call", value: "₹6.62" },
        { label: "Average CPC", value: "₹1.18" },
      ],
      charts: [
        {
          title: "Lead Gen — Contact Actions",
          unit: "Count",
          bars: [
            { label: "Calls at ₹6.62", value: 4116, display: "4,116", tone: "gold" },
            { label: "Messaging conversations", value: 3627, display: "3,627", tone: "soft" },
            { label: "Calls at ₹12.15", value: 2494, display: "2,494", tone: "muted" },
          ],
        },
      ],
      caption: "Named call and messaging results from the original case record",
      cta: "Need calls and WhatsApp enquiries — not just website traffic? Let's split the objectives.",
    },
  },
  {
    id: "global-luggage-house",
    client: "Global Luggage House",
    category: "Traffic",
    headline: "18,507 Link Clicks",
    summary: "18,507 link clicks at a reported ₹0.32 per link click",
    outcome:
      "Ran one focused traffic campaign for a heritage travel brand and generated 18,507 storefront visits at ₹0.32 per link click, building audiences for later retargeting.",
    problem:
      "The brand needed qualified storefront traffic across countries — people likely to browse premium travel gear — not the largest possible number of low-cost clicks. No purchase results were in the source record.",
    solution:
      "We built one tightly focused traffic campaign aimed at likely premium-travel shoppers. The reported result is traffic volume and cost (₹0.32 per link click; ₹0.36 CPC), not ROAS.",
    metrics: [
      { label: "Link Clicks", value: "18,507" },
      { label: "Cost / Link Click", value: "₹0.32" },
      { label: "CPC", value: "₹0.36" },
      { label: "Campaigns", value: "1" },
    ],
    image: "/case-studies/global-luggage-house.jpg",
    insightsImage: "/case-studies/insights/global-luggage-house.png",
    reportFile: FILES.luggage,
    report: {
      meta: "Meta Ads · Traffic · Travel",
      quote: "18,507 storefront clicks at ₹0.32 — traffic built for later retargeting.",
      tagline: "Fill the pool first.",
      highlights: [
        { value: "₹0.36", label: "Reported CPC", sub: "Kept separate from ₹0.32 per link click" },
        { value: "Traffic", label: "Campaign Objective", sub: "Not a purchase campaign" },
      ],
      pillars: ["Focused Traffic", "Premium-Travel Audience", "Storefront Visits", "Retargeting Pools"],
      problem:
        "A heritage travel brand selling across multiple countries needed a steady source of storefront traffic to build audiences for later retargeting. Low-cost traffic was useful only if it came from people likely to browse the range.",
      solution:
        "ScaleXpertz used one focused traffic campaign aimed at people likely to browse and buy premium travel gear. The case is judged on click volume and cost. Downstream purchases and spend were not supplied, so sales efficiency is not claimed.",
      metrics: [
        { label: "Link Clicks", value: "18,507" },
        { label: "Cost per Link Click", value: "₹0.32" },
        { label: "Reported CPC", value: "₹0.36" },
        { label: "Campaign Type", value: "Traffic" },
      ],
      charts: [
        {
          title: "Luggage House — Traffic Delivery",
          unit: "Link clicks",
          bars: [{ label: "Focused traffic campaign", value: 18507, display: "18,507", tone: "gold" }],
        },
      ],
      caption: "Storefront traffic volume from the original traffic-campaign record",
      cta: "Need qualified storefront traffic before you ask for the sale? Let's build the pool.",
    },
  },
  {
    id: "broader-campaign-set-90-days",
    client: "Broader Campaign Set — 90 Days",
    category: "eCommerce",
    headline: "1,183 Purchases in 90 Days",
    summary: "1,183 purchases and 135,049 link clicks across a wider campaign mix",
    outcome:
      "Ran purchase campaigns alongside exploratory and profile-visit activity for 90 days. The set generated 1,183 purchases, 135,049 link clicks and 1.90X average ROAS.",
    problem:
      "If an account only keeps campaigns that already perform well, it stops testing. Exploratory clicks and profile visits also cannot be mistaken for purchases.",
    solution:
      "We funded discovery intentionally: purchase and profile-visit objectives ran side by side. 1.90X ROAS belongs to the purchase view; 135,049 clicks and profile visits at ₹0.27 describe separate activity.",
    metrics: [
      { label: "Purchases", value: "1,183" },
      { label: "Avg ROAS", value: "1.90X" },
      { label: "Link Clicks", value: "135,049" },
      { label: "Avg CPC", value: "₹2.55" },
    ],
    image: "/case-studies/broader-campaign-set-90-days.jpg",
    insightsImage: "/case-studies/insights/broader-campaign-set-90-days.png",
    reportFile: FILES.broader,
    report: {
      meta: "Meta Ads · Mixed Objectives · 90 Days",
      quote: "1,183 purchases and 135,049 clicks — discovery funded on purpose.",
      tagline: "Keep testing visible.",
      highlights: [
        { value: "₹0.27", label: "Lowest Profile-Visit Cost", sub: "Discovery activity, not a purchase" },
        { value: "90 Days", label: "Reporting Window", sub: "Purchase + exploratory mix" },
      ],
      pillars: ["Purchase Campaigns", "Exploratory Activity", "Profile Visits", "Honest Result Types"],
      problem:
        "The account needed room for both conversion activity and exploration. Focusing only on campaigns already producing purchases limits learning; focusing only on traffic does not show whether the account is generating orders.",
      solution:
        "ScaleXpertz ran a broader 90-day mix: purchase campaigns alongside wider exploratory activity and profile-visit objectives. Purchase ROAS, link clicks and profile visits were reported as separate result types so the account would not appear to have more sales than were recorded.",
      metrics: [
        { label: "Purchases", value: "1,183" },
        { label: "Average ROAS", value: "1.90X" },
        { label: "Link Clicks", value: "135,049" },
        { label: "Average CPC", value: "₹2.55" },
      ],
      charts: [
        {
          title: "90-Day Mix — Result Types",
          unit: "Count (separate measures)",
          bars: [
            { label: "Link clicks", value: 135049, display: "135,049", tone: "soft" },
            { label: "Purchases", value: 1183, display: "1,183", tone: "gold" },
          ],
        },
      ],
      caption: "Purchases and link clicks are different result types in the 90-day mix",
      cta: "Need room to test without confusing clicks for sales? We'll keep the result types honest.",
    },
  },
  {
    id: "brand-awareness-ad-recall",
    client: "Brand Awareness Test",
    category: "Awareness",
    headline: "70,800 Ad-Recall Lifts",
    summary: "70,800 ad-recall lifts at a reported ₹0.05 per lift",
    outcome:
      "Ran an upper-funnel campaign optimised for ad recall rather than clicks. The campaign recorded 70,800 ad-recall lifts at ₹0.05 each, from about ₹4,801 in spend.",
    problem:
      "The brand wanted to be remembered before it asked for a sale. Judging an awareness campaign only by clicks or purchases would misread the job it was meant to do.",
    solution:
      "We used an ad-recall objective with short, memorable creative. A strong ad set delivered 33,000 lifts at ₹0.05. Recall is an awareness measure — not a click, visit or purchase.",
    metrics: [
      { label: "Ad-Recall Lifts", value: "70,800" },
      { label: "Cost per Lift", value: "₹0.05" },
      { label: "Spend", value: "₹4,801" },
      { label: "Objective", value: "Ad Recall" },
    ],
    image: "/case-studies/brand-awareness-ad-recall.jpg",
    insightsImage: "/case-studies/insights/brand-awareness-ad-recall.png",
    reportFile: FILES.awareness,
    report: {
      meta: "Meta Ads · Brand Awareness · Ad Recall",
      quote: "70,800 ad-recall lifts at ₹0.05 — memory before the ask.",
      tagline: "Be remembered first.",
      highlights: [
        { value: "33,000", label: "Strong Ad Set", sub: "Lifts at ₹0.05 each" },
        { value: "Awareness", label: "Campaign Job", sub: "Not judged as a purchase campaign" },
      ],
      pillars: ["Ad-Recall Objective", "Short Memorable Creative", "Upper-Funnel Optimisation", "Honest Measurement"],
      problem:
        "A brand-awareness campaign can be misread if it is judged only by click or purchase metrics. The account needed an objective aligned with helping people remember the brand before asking them to buy.",
      solution:
        "ScaleXpertz ran an upper-funnel campaign optimised for ad recall rather than clicks, using short, memorable creative. The documented result is 70,800 ad-recall lifts at about ₹4,801 spend. No purchase or session figures are claimed from this record.",
      metrics: [
        { label: "Ad-Recall Lifts", value: "70,800" },
        { label: "Cost per Lift", value: "₹0.05" },
        { label: "Total Spend", value: "₹4,801" },
        { label: "Strong Ad Set", value: "33,000" },
      ],
      charts: [
        {
          title: "Awareness — Ad-Recall Lifts",
          unit: "Estimated ad-recall lifts",
          bars: [
            { label: "Account lifts", value: 70800, display: "70,800", tone: "gold" },
            { label: "Strong ad set", value: 33000, display: "33,000", tone: "soft" },
          ],
        },
      ],
      caption: "Ad-recall lifts from the original awareness campaign record",
      cta: "Need people to remember the brand before they buy? We'll measure the memory, not just the click.",
    },
  },
  {
    id: "shopify-store-a",
    client: "Shopify Store A",
    category: "Shopify Growth",
    headline: "₹43.05 L Total Sales",
    summary: "₹43.05 lakh in total sales with 3.8 lakh sessions",
    outcome:
      "Moved a Shopify store from a near-flat sales line to a stronger curve after paid social was switched on — ₹43.05 L in sales, 3.8 L sessions and 10.2K orders, with one month approaching ₹15 L.",
    problem:
      "Sales were close to flat until spring 2026. The store needed a more active sales channel, but the source does not claim that every rupee of Shopify sales came directly from paid social.",
    solution:
      "The source links the upward curve with the paid-social system being switched on. Monthly sales stepped up through summer 2026. Campaign-level spend and ROAS were not in the record, so this case is reported as store-level growth.",
    metrics: [
      { label: "Total Sales", value: "₹43.05 L" },
      { label: "Sessions", value: "3.8 L" },
      { label: "Orders", value: "10.2K" },
      { label: "Peak Month", value: "~₹15 L" },
    ],
    image: "/case-studies/shopify-store-a.jpg",
    insightsImage: "/case-studies/insights/shopify-store-a.png",
    reportFile: FILES.shopifyA,
    report: {
      meta: "Shopify · Store Growth · Paid Social Timing",
      quote: "From a flat line to ₹43.05 L — one month approached ₹15 L.",
      tagline: "The curve changed after the engine went on.",
      highlights: [
        { value: "Spring 2026", label: "Inflection", sub: "Sales rose after paid social was switched on" },
        { value: "10.2K", label: "Orders", sub: "Store-level order volume" },
      ],
      pillars: ["Paid-Social Timing", "Monthly Sales Lift", "Session Volume", "Store-Level Evidence"],
      problem:
        "The observable challenge was to move the store beyond a relatively flat sales period and create stronger monthly momentum. The dashboard makes the timing of the change visible, even though it does not explain every action behind it.",
      solution:
        "The original record connects the change in the sales curve with the point when the paid-social ad engine was switched on. Monthly revenue stepped up through the summer and approached ₹15 L in a single month. No campaign structure, spend or ROAS is supplied, so those are not added.",
      metrics: [
        { label: "Total Sales", value: "₹43.05 L" },
        { label: "Sessions", value: "3.8 L" },
        { label: "Orders", value: "10.2K" },
        { label: "Peak Month Noted", value: "~₹15 L" },
      ],
      charts: [
        {
          title: "Shopify Store A — Store Snapshot",
          unit: "Store-level totals",
          bars: [
            { label: "Total sales (₹ L)", value: 43.05, display: "₹43.05 L", tone: "gold" },
            { label: "Peak month noted (₹ L)", value: 15, display: "~₹15 L", tone: "soft" },
          ],
        },
      ],
      caption: "Shopify total sales and the noted peak month from the original dashboard",
      cta: "Sales line stuck flat? Let's look at what happens when the paid-social engine goes on.",
    },
  },
  {
    id: "shopify-store-b",
    client: "Shopify Store B",
    category: "Shopify Growth",
    headline: "₹29.72 L Total Sales",
    summary: "₹29.72 lakh in total sales across 3.4 lakh sessions",
    outcome:
      "Built store momentum over the tracked year: ₹29.72 L in sales, 3.4 L sessions and 2,250 orders, with monthly sales moving toward a ₹6–7 L peak after spring.",
    problem:
      "Early growth needed to become a stronger, more consistent sales pattern. The source does not identify the exact operational or marketing actions behind each step.",
    solution:
      "The documented story is the sales curve itself — growth beginning early in the year and accelerating from spring. Channel and campaign details were not supplied, so they are not invented.",
    metrics: [
      { label: "Total Sales", value: "₹29.72 L" },
      { label: "Sessions", value: "3.4 L" },
      { label: "Orders", value: "2,250" },
      { label: "Peak Month", value: "₹6–7 L" },
    ],
    image: "/case-studies/shopify-store-b.jpg",
    insightsImage: "/case-studies/insights/shopify-store-b.png",
    reportFile: FILES.shopifyB,
    report: {
      meta: "Shopify · Store Growth",
      quote: "₹29.72 L in sales — acceleration from spring toward ₹6–7 L months.",
      tagline: "Momentum over a single spike.",
      highlights: [
        { value: "2,250", label: "Orders", sub: "Store-level order volume" },
        { value: "Spring", label: "Acceleration", sub: "Growth strengthened from spring" },
      ],
      pillars: ["Sales-Curve Tracking", "Spring Acceleration", "Session Volume", "Store-Level Evidence"],
      problem:
        "The useful question was not only how much the store sold in total, but how monthly performance changed. A single total can make a store look static; the curve shows when the business began to accelerate.",
      solution:
        "The source records growth beginning in the early months of the tracked year and accelerating from spring, with monthly sales moving toward approximately ₹6–7 L. A complete campaign playbook cannot be reconstructed from the sales chart alone.",
      metrics: [
        { label: "Total Sales", value: "₹29.72 L" },
        { label: "Sessions", value: "3.4 L" },
        { label: "Orders", value: "2,250" },
        { label: "Peak Monthly Sales", value: "₹6–7 L" },
      ],
      charts: [
        {
          title: "Shopify Store B — Store Snapshot",
          unit: "Store-level totals",
          bars: [
            { label: "Total sales (₹ L)", value: 29.72, display: "₹29.72 L", tone: "gold" },
            { label: "Peak month range (₹ L)", value: 6.5, display: "₹6–7 L", tone: "soft" },
          ],
        },
      ],
      caption: "Shopify total sales and the approximate peak-month range from the source",
      cta: "Need the sales curve to accelerate — not just tick along? Let's review the store trend.",
    },
  },
  {
    id: "shopify-store-c",
    client: "Shopify Store C",
    category: "Shopify Growth",
    headline: "New Revenue Line",
    summary: "A new revenue line reached ₹9.72 lakh in the tracked period",
    outcome:
      "Moved a near-zero sales line to ₹9.72 L in total sales, 1.0 L sessions and 1,475 orders. One month in early summer 2026 crossed ₹4 L.",
    problem:
      "Sales were essentially nil until early summer 2026. For a new revenue line, the first job was to create enough activity for the store to record orders — the launch date and exact cause of the jump were not in the source.",
    solution:
      "The source presents this as a new revenue line that gained traction once the offer, creative and targeting were in place. Specific offers and campaign formats were not supplied, so the case stays with the Shopify totals.",
    metrics: [
      { label: "Total Sales", value: "₹9.72 L" },
      { label: "Sessions", value: "1.0 L" },
      { label: "Orders", value: "1,475" },
      { label: "Peak Month", value: ">₹4 L" },
    ],
    image: "/case-studies/shopify-store-c.jpg",
    insightsImage: "/case-studies/insights/shopify-store-c.png",
    reportFile: FILES.shopifyC,
    report: {
      meta: "Shopify · New Revenue Line",
      quote: "From almost nothing to ₹9.72 L — one month crossed ₹4 L.",
      tagline: "A new line that started moving.",
      highlights: [
        { value: "Early Summer 2026", label: "Inflection", sub: "Sales rose from a near-zero line" },
        { value: "1,475", label: "Orders", sub: "Store-level order volume" },
      ],
      pillars: ["New Revenue Line", "Launch Traction", "Offer + Creative + Targeting", "Store-Level Evidence"],
      problem:
        "The visible challenge was to move from an almost inactive sales line to meaningful order and revenue volume. An early period with almost no sales makes it hard to judge traction.",
      solution:
        "The Shopify chart shows a sharp increase in early summer 2026, with one month crossing ₹4 L. The source takeaway refers to getting the offer, creative and targeting in place from the start, without listing the exact campaign tactics.",
      metrics: [
        { label: "Total Sales", value: "₹9.72 L" },
        { label: "Sessions", value: "1.0 L" },
        { label: "Orders", value: "1,475" },
        { label: "Peak Month Noted", value: ">₹4 L" },
      ],
      charts: [
        {
          title: "Shopify Store C — Store Snapshot",
          unit: "Store-level totals",
          bars: [
            { label: "Total sales (₹ L)", value: 9.72, display: "₹9.72 L", tone: "gold" },
            { label: "Peak month noted (₹ L)", value: 4, display: ">₹4 L", tone: "soft" },
          ],
        },
      ],
      caption: "Shopify total sales and the noted month that crossed ₹4 L",
      cta: "Launching a store that still looks like a flat line? Let's get the first revenue month on the board.",
    },
  },
  {
    id: "shopify-store-d",
    client: "Shopify Store D",
    category: "Shopify Growth",
    headline: "Early Momentum",
    summary: "₹5.27 lakh in total sales with 1,636 orders",
    outcome:
      "Recorded early-growth traction: ₹5.27 L in sales, 66.2K sessions and 1,636 orders, with the sales line rising from late spring 2026 through summer and the following month.",
    problem:
      "A young store needed enough traffic and orders to see whether there was a measurable trend. Starting conditions, product range and campaign details were not in the source.",
    solution:
      "The documented result is the upward sales line itself. Early momentum and order volume give the store data for later scaling decisions — without adding an unreported campaign playbook.",
    metrics: [
      { label: "Total Sales", value: "₹5.27 L" },
      { label: "Sessions", value: "66.2K" },
      { label: "Orders", value: "1,636" },
      { label: "Trend", value: "Rising" },
    ],
    image: "/case-studies/shopify-store-d.jpg",
    insightsImage: "/case-studies/insights/shopify-store-d.png",
    reportFile: FILES.shopifyD,
    report: {
      meta: "Shopify · Early Growth",
      quote: "₹5.27 L and 1,636 orders — early momentum that kept rising.",
      tagline: "First traction. Then scale.",
      highlights: [
        { value: "Late Spring 2026", label: "Start of Curve", sub: "Sales began and kept rising" },
        { value: "66.2K", label: "Sessions", sub: "Early traffic base" },
      ],
      pillars: ["Early Momentum", "Continuing Upward Trend", "Order Volume", "Store-Level Evidence"],
      problem:
        "The observable task was to build and maintain early sales momentum. For an early-stage store it matters whether the increase continues or was limited to one month.",
      solution:
        "The source shows sales beginning in late spring 2026, increasing through the summer, and continuing into the following month. No paid-channel, creative or budget record is included, so the case is presented as a store-level growth snapshot.",
      metrics: [
        { label: "Total Sales", value: "₹5.27 L" },
        { label: "Sessions", value: "66.2K" },
        { label: "Orders", value: "1,636" },
        { label: "Trend Direction", value: "Rising" },
      ],
      charts: [
        {
          title: "Shopify Store D — Store Snapshot",
          unit: "Store-level totals",
          bars: [
            { label: "Total sales (₹ L)", value: 5.27, display: "₹5.27 L", tone: "gold" },
            { label: "Orders (thousands)", value: 1.636, display: "1,636", tone: "soft" },
          ],
        },
      ],
      caption: "Shopify total sales and order volume from the early-growth snapshot",
      cta: "Young store, early orders, need to know if the line will keep rising? Let's read the curve.",
    },
  },
  {
    id: "shopify-store-e",
    client: "Shopify Store E",
    category: "Shopify Growth",
    headline: "₹2.07 Cr Over the Year",
    summary: "₹2.07 Cr in total sales over the tracked year",
    outcome:
      "Flagship Shopify growth case: ₹2.07 Cr in sales, 19.06 L sessions and 26.3K orders, with revenue rising from autumn 2025 through following quarters and a monthly peak near ₹30 L.",
    problem:
      "The challenge was sustained growth over a full year rather than one strong month that falls back. Individual marketing actions behind each quarter were not disclosed.",
    solution:
      "The source describes a flagship growth curve that kept rising across successive quarters. Store-level totals show the scale; campaign mix and ad spend were not in the record.",
    metrics: [
      { label: "Total Sales", value: "₹2.07 Cr" },
      { label: "Sessions", value: "19.06 L" },
      { label: "Orders", value: "26.3K" },
      { label: "Peak Month", value: "~₹30 L" },
    ],
    image: "/case-studies/shopify-store-e.jpg",
    insightsImage: "/case-studies/insights/shopify-store-e.png",
    featuredRank: 4,
    reportFile: FILES.shopifyE,
    report: {
      meta: "Shopify · Flagship Growth Curve",
      quote: "₹2.07 Cr. 26.3K orders. A curve that rose quarter after quarter.",
      tagline: "A year of compounding, not a spike.",
      highlights: [
        { value: "19.06 L", label: "Sessions", sub: "Store traffic over the tracked year" },
        { value: "Autumn 2025", label: "Climb Began", sub: "Rose through subsequent quarters" },
      ],
      pillars: ["Multi-Quarter Growth", "Store-Level Scale", "Sustained Monthly Rise", "Flagship Curve"],
      problem:
        "A store may record a strong month and then fall back. This case highlights a different pattern: revenue continuing to rise across successive quarters. Connecting that trend to channels and costs still needs records the source does not include.",
      solution:
        "The dashboard trend shows sales beginning to climb in autumn 2025 and continuing through every following quarter, with a monthly peak near ₹30 L. The case is presented as sustained store growth, not an invented campaign sequence.",
      metrics: [
        { label: "Total Sales", value: "₹2.07 Cr" },
        { label: "Sessions", value: "19.06 L" },
        { label: "Orders", value: "26.3K" },
        { label: "Peak Month Noted", value: "~₹30 L" },
      ],
      charts: [
        {
          title: "Shopify Store E — Store Snapshot",
          unit: "Store-level totals",
          bars: [
            { label: "Total sales (₹ Cr)", value: 2.07, display: "₹2.07 Cr", tone: "gold" },
            { label: "Peak month noted (₹ Cr)", value: 0.3, display: "~₹30 L", tone: "soft" },
          ],
        },
      ],
      caption: "Shopify total sales and the noted monthly peak from the flagship growth curve",
      cta: "Want a sales line that keeps rising after the first strong month? Let's look at the year, not the spike.",
    },
  },
];
