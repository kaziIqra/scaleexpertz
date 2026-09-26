import type { AuditTemplate } from "../types";

/**
 * Growth Audit & Execution Blueprint — E-commerce / D2C product brand.
 * Transcribed from the ScaleXpertz "T-Shirt E-Commerce Growth Audit" reference
 * (18 pages). Every string may use {{tokens}} from `placeholders` + `derive`.
 */
export const ecommerceGrowthAudit: AuditTemplate = {
  slug: "ecommerce-growth-audit",
  version: 1,
  name: "E-Commerce Growth Audit & Execution Blueprint",
  description:
    "18-page SCALE Framework™ audit for D2C / e-commerce product brands: positioning, creative, Meta & Google acquisition, marketplaces, retention, 90-day roadmap and commercial proposal.",
  docTitle: "{{industry}} Growth Blueprint",
  placeholders: [
    { key: "client_name", label: "Client / founder name", type: "text", required: true, help: "Used internally in the admin list." },
    { key: "company", label: "Business name (cover page)", type: "text", required: true, help: "Shown on the cover, e.g. 'Urban Threads Apparel'." },
    { key: "industry", label: "Industry label", type: "text", required: true, default: "T-Shirt E-Commerce", help: "Used in the footer: 'ScaleXpertz | {Industry} Growth Blueprint'." },
    { key: "product_category", label: "Product (singular)", type: "text", required: true, default: "T-shirt", help: "e.g. 'T-shirt', 'sneaker', 'skincare product'." },
    { key: "product_spec_example", label: "Spec example", type: "text", default: "GSM or print type", help: "Product specs that alone don't answer 'why this brand?'" },
    { key: "doc_title", label: "Footer title override", type: "text", help: "Leave blank to use '{Industry} Growth Blueprint'." },
    { key: "timeline_days", label: "Engagement length (days)", type: "number", required: true, default: "90" },
    { key: "investment_total", label: "Consolidated investment (₹)", type: "currency", required: true, default: "500000" },
    { key: "testing_spend", label: "Included Meta testing spend", type: "text", default: "₹20,000–₹25,000" },
    { key: "marketplaces", label: "Marketplaces (one per line)", type: "textarea", default: "Amazon\nFlipkart\nMyntra\nMeesho" },
    {
      key: "requirements",
      label: "Client requirements (one per line)",
      type: "textarea",
      required: true,
      default:
        "Business, market and competitor understanding\nA stronger USP and brand positioning\nSales-focused marketing\nMeta Ads and Google Ads\nCustom e-commerce website, online selling and shipping integration\nCreative, UGC, models, influencers, creators and production\nAmazon, Flipkart, Myntra, Meesho and other relevant marketplaces",
    },
  ],
  derived: [
    { key: "milestone_1_amount", source: "investment_total", pct: 50 },
    { key: "milestone_2_amount", source: "investment_total", pct: 30 },
    { key: "milestone_3_amount", source: "investment_total", pct: 20 },
  ],
  pages: [
    {
      id: "cover",
      label: "Cover",
      blocks: [
        {
          type: "cover",
          eyebrow: "SCALEXPERTZ",
          title: "GROWTH AUDIT &\nEXECUTION BLUEPRINT",
          clientLine: "{{company}}",
          subtitle: "A {{timeline_days}}-Day Growth System built around the SCALE Framework™",
          steps: ["STRATEGY", "CREATE", "ACCELERATE", "LEAD", "EVOLVE"],
          tagline: "Strategy. Systems. Execution. Ownership. Growth.",
        },
      ],
    },
    {
      id: "opening",
      label: "Opening",
      blocks: [
        { type: "heading", eyebrow: "OPENING", title: "From Requirement To Growth System", subtitle: "This Is Not A Service Catalogue" },
        {
          type: "paragraph",
          text: "The requirement discussed is broader than advertising or social media. It spans positioning, product differentiation, e-commerce infrastructure, creative production, paid acquisition, marketplaces, creators, conversion and customer retention.",
        },
        { type: "circleFlow", title: "GROWTH SYSTEM", labels: ["POSITION", "PRODUCT", "ACQUISITION", "CONVERSION", "RETENTION"] },
        { type: "bullets", title: "CLIENT REQUIREMENTS", items: ["{{requirements}}"] },
        { type: "spacer", size: "lg" },
        { type: "boldLine", text: "Strategy → Create → Accelerate → Lead → Evolve" },
        {
          type: "note",
          text: "Discovery note: Current revenue, orders, AOV, ROAS, ad spend, website/social metrics and marketplace status were not confirmed and are not presented as existing facts.",
        },
      ],
    },
    {
      id: "strategy-1",
      label: "S — Understand Before You Scale",
      blocks: [
        { type: "heading", eyebrow: "S — STRATEGY", title: "Understand Before You Scale" },
        {
          type: "paragraph",
          text: "The first requirement is clarity: what the brand sells, who it is for, why the customer should choose it, and how the offer should enter the market.",
        },
        {
          type: "cardGrid",
          title: "STRATEGY DIAGNOSIS",
          cards: [
            { title: "Business & market understanding" },
            { title: "Customer and purchase behaviour" },
            { title: "Product and category analysis" },
            { title: "Direct and indirect competitors" },
            { title: "Competitor positioning, pricing, offers and communication" },
            { title: "Current brand positioning" },
            { title: "Market-entry opportunity" },
            { title: "Key strategic bottlenecks" },
          ],
        },
        { type: "spacer", size: "lg" },
        {
          type: "paragraph",
          text: "ScaleXpertz capability: Founder Growth Diagnosis™, Business Growth Audit, Competitor & Market Analysis, Bottleneck Identification, KPI & Roadmap.",
        },
        { type: "funnel", stages: ["UNDERSTAND", "DIAGNOSE", "PRIORITISE", "ROADMAP"] },
      ],
    },
    {
      id: "strategy-2",
      label: "S — Positioning Before Promotion",
      blocks: [
        { type: "heading", eyebrow: "S — STRATEGY", title: "Positioning Before Promotion" },
        {
          type: "paragraph",
          text: "Product specifications such as {{product_spec_example}} do not, by themselves, answer the customer's larger question — why this brand?",
        },
        {
          type: "table",
          columns: ["Question", "ScaleXpertz Work"],
          widths: [1, 2.4],
          rows: [
            ["Why this {{product_category}}?", "Identify meaningful product and brand differentiators."],
            ["Why this brand?", "Develop a clear market position and brand promise."],
            ["Why buy now?", "Build offer and campaign architecture."],
            ["Why trust it?", "Design proof, creator, review and communication layers."],
          ],
        },
        { type: "spacer", size: "lg" },
        { type: "boldLine", text: "Target output: 2–3 defensible differentiators → USP → positioning → messaging system." },
        {
          type: "note",
          text: "The positioning then travels into the website, product pages, creatives, ads, marketplaces, creators and retention communication.",
        },
        {
          type: "arrowFlowCards",
          cards: [{ title: "Differentiators" }, { title: "USP" }, { title: "Positioning" }, { title: "Messaging" }],
        },
      ],
    },
    {
      id: "strategy-3",
      label: "S — Product, Pricing & Offer",
      blocks: [
        { type: "heading", eyebrow: "S — STRATEGY", title: "Product, Pricing & Offer Architecture" },
        {
          type: "paragraph",
          text: "A strong product still needs a clear reason to purchase. The commercial architecture connects product, price, offer and campaign message.",
        },
        {
          type: "bullets",
          title: "COMMERCIAL ARCHITECTURE",
          items: [
            "Product hierarchy and presentation",
            "Pricing logic and customer perception",
            "Single-product vs bundle opportunities",
            "First-purchase and campaign offers",
            "Seasonal / promotional campaign architecture",
            "Value-led offers rather than relying only on discounting",
            "Offer-to-creative and offer-to-ad alignment",
          ],
        },
        { type: "spacer", size: "md" },
        {
          type: "bullets",
          title: "SALES & ACQUISITION STRATEGY",
          items: [
            "Discovery → consideration → conversion → repeat purchase",
            "Role of Meta, Google, marketplaces, creators and owned channels",
            "Acquisition and retargeting logic",
            "Conversion path before scaling traffic",
          ],
        },
        { type: "spacer", size: "md" },
        {
          type: "arrowFlowCards",
          cards: [{ title: "Discovery" }, { title: "Consideration" }, { title: "Conversion" }, { title: "Repeat purchase" }],
        },
        { type: "boldLine", text: "Strategic principle: do not scale a weak proposition; strengthen the proposition first." },
      ],
    },
    {
      id: "create-1",
      label: "C — Build A Brand People Understand",
      blocks: [
        { type: "heading", eyebrow: "C — CREATE", title: "Build A Brand People Can Understand" },
        {
          type: "paragraph",
          text: "Create turns strategy into visible, usable brand assets. For a {{product_category}} business, product presentation and creative quality influence how quickly a visitor understands value.",
        },
        {
          type: "cardGrid",
          title: "CREATIVE SYSTEM",
          cards: [
            { title: "Brand communication and messaging" },
            { title: "Product presentation and product-detail storytelling" },
            { title: "Static, carousel and reel system" },
            { title: "USP-led creative angles" },
            { title: "Offer and campaign creatives" },
            { title: "Lifestyle and product-focused content" },
            { title: "Conversion-focused creative assets" },
          ],
        },
        { type: "spacer", size: "lg" },
        { type: "boldLine", text: "The objective is a repeatable creative system that supports discovery, trust and purchase." },
        {
          type: "note",
          text: "ScaleXpertz capability: Brand & Creative, Content Strategy, Graphic Design & Creative Direction, Professional Content Production.",
        },
        { type: "circleFlow", labels: ["Discover", "Understand", "Trust", "Purchase"] },
      ],
    },
    {
      id: "create-2",
      label: "C — UGC, Creators & Production",
      blocks: [
        { type: "heading", eyebrow: "C — CREATE", title: "UGC, Creators, Influencers & Production" },
        {
          type: "paragraph",
          text: "The client specifically requires UGC, models, influencers, creators and product production. These operate as part of the acquisition system—not isolated branding activities.",
        },
        {
          type: "table",
          columns: ["Layer", "Purpose"],
          widths: [1, 2.4],
          rows: [
            ["UGC", "Product experience, proof, native-looking performance content."],
            ["Creators", "Demonstration, styling, credibility and content volume."],
            ["Influencers", "Reach, awareness and social proof."],
            ["Models / shoots", "Controlled product presentation and brand assets."],
            ["Production", "Repeatable shooting, editing and campaign asset workflow."],
          ],
        },
        { type: "spacer", size: "md" },
        {
          type: "bullets",
          title: "NETWORK & PRODUCTION LAYER",
          items: [
            "Relevant ScaleXpertz advantages: Production Network™ and Creator & Influencer Network™, including access to a curated micro-influencer network.",
          ],
        },
        {
          type: "note",
          text: "Commercial boundary: external influencer, UGC creator, model and talent fees remain separate where applicable unless explicitly included in an agreed scope.",
        },
        {
          type: "darkCards",
          cards: [
            { label: "UGC", sub: "Proof" },
            { label: "Creators", sub: "Demonstration" },
            { label: "Influencers", sub: "Reach" },
            { label: "Models / shoots", sub: "Presentation" },
            { label: "Production", sub: "Workflow" },
          ],
        },
      ],
    },
    {
      id: "create-3",
      label: "C — E-Commerce Infrastructure",
      blocks: [
        { type: "heading", eyebrow: "C — CREATE", title: "E-Commerce Infrastructure That Converts" },
        { type: "paragraph", text: "The requested custom website is conversion infrastructure connecting acquisition to purchase." },
        {
          type: "arrowFlowCards",
          title: "CONVERSION INFRASTRUCTURE",
          cards: [
            { title: "Traffic", sub: "Ads • creators • marketplaces" },
            { title: "Product page", sub: "Value • proof • offer" },
            { title: "Checkout", sub: "Trust • CTA • shipping" },
            { title: "Purchase", sub: "Order • data • tracking" },
          ],
        },
        {
          type: "bullets",
          items: [
            "E-commerce website structure and UX",
            "Mobile-first product discovery",
            "Product pages and product presentation",
            "USP, benefits and proof placement",
            "Pricing and offer communication",
            "Trust factors and social proof",
            "CTA and conversion journey",
            "Checkout experience",
            "Shipping integration",
            "Analytics / tracking foundation",
          ],
        },
        { type: "spacer", size: "lg" },
        {
          type: "note",
          text: "Third-party tools, paid subscriptions and exceptional development requirements outside agreed scope remain separately applicable where required.",
        },
      ],
    },
    {
      id: "accelerate-1",
      label: "A — Customer Acquisition",
      blocks: [
        { type: "heading", eyebrow: "A — ACCELERATE", title: "Turn Positioning Into Customer Acquisition" },
        {
          type: "paragraph",
          text: "Acquisition begins after the proposition, creative and conversion path are ready enough to learn from real market response.",
        },
        {
          type: "twoColBullets",
          cols: [
            {
              title: "META ADS",
              items: [
                "Campaign architecture",
                "Audience and product testing",
                "Creative-angle testing",
                "USP and offer testing",
                "Retargeting",
                "Performance optimisation",
                "Scaling based on validated signals",
              ],
            },
            {
              title: "GOOGLE ADS",
              items: [
                "High-intent search opportunities",
                "Product/category intent",
                "Conversion campaigns",
                "Retargeting where applicable",
                "Performance measurement and optimisation",
              ],
            },
          ],
        },
        { type: "spacer", size: "lg" },
        { type: "callout", headline: "TEST → LEARN → VALIDATE → SCALE", sub: "Audience + creative + USP + offer signals are tested before scaling spend." },
        {
          type: "note",
          text: "ScaleXpertz-funded Initial Meta Testing Benefit: {{testing_spend}} of initial Meta testing spend is included as a ScaleXpertz benefit for this engagement. After the testing phase, scaling media spend is client-side and separate from the {{investment_total_fmt}} engagement investment.",
        },
      ],
    },
    {
      id: "accelerate-2",
      label: "A — Beyond The First Ad Channel",
      blocks: [
        { type: "heading", eyebrow: "A — ACCELERATE", title: "Expand Acquisition Beyond The First Ad Channel" },
        { type: "paragraph", text: "Growth can expand across AI-led discovery and marketplaces where commercially relevant." },
        { type: "hub", inputs: ["Meta Ads", "Google Ads", "AI / ChatGPT Ads", "Marketplaces"], center: "Website" },
        {
          type: "bullets",
          title: "AI / CHATGPT ADS",
          items: [
            "ChatGPT Ads / AI-led acquisition is included as an emerging acquisition layer within the relevant offering, alongside traditional paid channels.",
          ],
        },
        {
          type: "bullets",
          title: "MARKETPLACE GROWTH",
          items: [
            "{{marketplaces}}",
            "Other relevant marketplaces based on product and readiness",
            "Listing and product presentation optimisation",
            "Marketplace offer and performance opportunities",
          ],
        },
        {
          type: "note",
          text: "Marketplace commissions, seller/platform fees, marketplace media and fulfilment costs are separate business expenses where applicable.",
        },
      ],
    },
    {
      id: "accelerate-3",
      label: "A — Acquire → Convert → Recover → Retain",
      blocks: [
        { type: "heading", eyebrow: "A — ACCELERATE", title: "Acquire → Convert → Recover → Retain" },
        {
          type: "paragraph",
          text: "Paid traffic becomes more valuable when the business can recover lost intent and build repeat purchase behaviour.",
        },
        {
          type: "darkCards",
          cards: [
            { label: "Acquire", sub: "Paid + organic traffic" },
            { label: "Convert", sub: "Product + checkout" },
            { label: "Recover", sub: "Retarget + cart recovery" },
            { label: "Retain", sub: "CRM + repeat purchase" },
          ],
        },
        {
          type: "bullets",
          items: [
            "Conversion-rate optimisation across product and checkout journeys",
            "Retargeting architecture",
            "Customer segmentation",
            "CRM foundation for customer lifecycle management",
            "WhatsApp campaigns and remarketing",
            "Abandoned-cart / checkout recovery workflows",
            "Repeat-purchase and offer communication",
            "Performance measurement across the funnel",
          ],
        },
        { type: "spacer", size: "lg" },
        {
          type: "note",
          text: "WhatsApp opportunity: custom campaigns, remarketing and cart-recovery workflows. The 20–30% cart-recovery figure is a target/opportunity framework, not a guaranteed result.",
        },
        {
          type: "note",
          text: "AI automation can support customer handling, follow-ups, reporting and operational workflows where a clear business case exists.",
        },
      ],
    },
    {
      id: "lead-1",
      label: "L — Build Trust Around The Product",
      blocks: [
        { type: "heading", eyebrow: "L — LEAD", title: "Build Trust Around The Product" },
        { type: "paragraph", text: "Lead is the authority and trust layer that makes the product easier to believe and easier to buy." },
        {
          type: "cardGrid",
          cards: [
            { title: "Brand authority" },
            { title: "Customer trust" },
            { title: "Social proof and reviews" },
            { title: "Creator / influencer credibility" },
            { title: "Product proof and demonstration" },
            { title: "Consistent brand communication" },
            { title: "Brand story / founder story where genuinely useful" },
            { title: "Market visibility" },
          ],
        },
        { type: "spacer", size: "lg" },
        {
          type: "arrowFlowCards",
          title: "TRUST LAYER",
          cards: [
            { title: "PROOF", sub: "Product" },
            { title: "PEOPLE", sub: "Creators" },
            { title: "REVIEWS", sub: "Customers" },
            { title: "STORY", sub: "Brand" },
          ],
        },
        { type: "paragraph", text: "Founder personal branding is a supporting opportunity, not the central commercial objective." },
      ],
    },
    {
      id: "lead-2",
      label: "L / A — Assets That Keep Working",
      blocks: [
        { type: "heading", eyebrow: "L / A — SUPPORTING GROWTH INFRASTRUCTURE", title: "Build Assets That Keep Working" },
        { type: "paragraph", text: "Paid acquisition can accelerate demand, while owned and organic foundations support long-term growth." },
        {
          type: "bullets",
          title: "SEO FOUNDATION",
          items: [
            "Product-page SEO",
            "Category/search visibility",
            "Product titles and descriptions",
            "On-page foundations",
            "Technical basics relevant to the e-commerce site",
            "Organic product discovery",
          ],
        },
        { type: "spacer", size: "md" },
        {
          type: "bullets",
          title: "CRM + WHATSAPP + OWNED CUSTOMER DATA",
          items: [
            "Customer lifecycle organisation",
            "Audience segmentation",
            "Remarketing readiness",
            "Repeat-purchase communication",
            "Cart-recovery workflows",
          ],
        },
        { type: "spacer", size: "md" },
        {
          type: "featureCards",
          cards: [
            { title: "SEO", sub: "Discover", foot: "Owned growth foundation" },
            { title: "CRM + WhatsApp", sub: "Retain", foot: "Owned growth foundation" },
          ],
        },
        {
          type: "note",
          text: "These layers support the primary sales and growth objective; they are not presented as separate oversized projects.",
        },
      ],
    },
    {
      id: "evolve-1",
      label: "E — Growth Is A Learning System",
      blocks: [
        { type: "heading", eyebrow: "E — EVOLVE", title: "Growth Is A Learning System" },
        {
          type: "paragraph",
          text: "The first strategy is a starting point. Real market response determines what gets strengthened, changed or stopped.",
        },
        {
          type: "bullets",
          items: [
            "Weekly Strategy Reviews™",
            "Creative testing",
            "Offer testing",
            "Audience and campaign optimisation",
            "Conversion optimisation",
            "Performance reporting",
            "KPI framework",
            "Growth Documentation™",
            "Next-sprint planning",
          ],
        },
        {
          type: "table",
          title: "PRIORITY MATRIX",
          columns: ["Priority", "Focus"],
          widths: [1, 4],
          rows: [
            ["P1", "Positioning, USP, offer and conversion foundation"],
            ["P2", "Creative + UGC + acquisition testing"],
            ["P3", "Marketplace + retention + optimisation"],
            ["P4", "Scale validated channels and document next moves"],
          ],
        },
        { type: "spacer", size: "lg" },
        { type: "callout", headline: "LEARN → TEST → MEASURE → ADAPT", sub: "Every sprint feeds the next decision." },
      ],
    },
    {
      id: "evolve-2",
      label: "E — Execution Roadmap",
      blocks: [
        { type: "heading", eyebrow: "E — EVOLVE", title: "{{timeline_days}}-Day Execution Roadmap" },
        {
          type: "roadmapTable",
          rows: [
            {
              period: "{{phase_1_range}}",
              focus: "Foundation",
              movement:
                "Discovery, market/competitor research, USP, positioning, offer architecture, website/conversion planning, creative direction, acquisition setup.",
            },
            {
              period: "{{phase_2_range}}",
              focus: "Acceleration",
              movement:
                "Creative/UGC production, website execution, Meta & Google testing, creator/influencer activation, marketplace preparation, retargeting.",
            },
            {
              period: "{{phase_3_range}}",
              focus: "Optimisation",
              movement:
                "Performance optimisation, creative/offer testing, CRO, marketplace optimisation, retention workflows, documentation and next growth roadmap.",
            },
          ],
        },
        { type: "spacer", size: "md" },
        {
          type: "arrowFlowCards",
          title: "{{timeline_days}}-DAY MOVEMENT",
          cards: [
            { title: "FOUNDATION", sub: "{{phase_1_short}}" },
            { title: "ACCELERATION", sub: "{{phase_2_short}}" },
            { title: "OPTIMISATION", sub: "{{phase_3_short}}" },
          ],
        },
        { type: "spacer", size: "md" },
        { type: "boldLine", text: "Build the foundation → generate evidence → scale what the evidence supports." },
      ],
    },
    {
      id: "execution",
      label: "Execution System",
      blocks: [
        { type: "heading", eyebrow: "EXECUTION SYSTEM", title: "One Accountable Growth Partner" },
        {
          type: "paragraph",
          text: "The requirement naturally creates Coordination Chaos™ if every capability is handled by a separate vendor. ScaleXpertz coordinates the relevant growth functions under one accountable system.",
        },
        {
          type: "table",
          columns: ["ScaleXpertz Advantage", "How it helps this engagement"],
          widths: [1, 1.8],
          rows: [
            ["Dedicated Growth Manager™", "One coordination point across strategy, creative, acquisition, website, creators and growth execution."],
            ["Production Network™", "Access to relevant production resources for shoots, creators and content."],
            ["Creator & Influencer Network™", "Structured creator/influencer activation and collaboration."],
            ["Growth Documentation™", "Decisions, tests, results and learnings remain documented."],
            ["Weekly Strategy Reviews™", "Regular review of performance and next actions."],
            ["Vendor-Free Growth™", "Reduces fragmented coordination across multiple providers."],
            ["Dedicated Business Phone™", "Dedicated business communication, CRM/workflow coordination and engagement management during the active period."],
            ["Execution Commitment™", "Milestone accountability where ScaleXpertz delays an agreed milestone due to its own execution."],
          ],
        },
        { type: "spacer", size: "lg" },
        {
          type: "note",
          text: "Dedicated Business Phone™ — Disclaimer: The phone and personalised number are provided for ScaleXpertz-related work communication during the active engagement. The phone's price/value will be disclosed before allotment. The phone must be returned in proper working condition at completion/termination. If lost, damaged, broken or not returned, the client is responsible for the applicable phone cost/value. The phone may be issued in the client's name using required PAN/details.",
        },
      ],
    },
    {
      id: "commercial",
      label: "Commercial Proposal",
      blocks: [
        { type: "heading", eyebrow: "COMMERCIAL PROPOSAL", title: "{{timeline_days}}-Day B2C Growth Sprint™", subtitle: "Consolidated Investment" },
        { type: "investmentBox", label: "CONSOLIDATED INVESTMENT", amount: "{{investment_total_fmt}}" },
        {
          type: "table",
          columns: ["Milestone", "Share", "Amount"],
          widths: [3, 1, 1.4],
          rows: [
            ["Kickoff", "50%", "{{milestone_1_amount}}"],
            ["Growth Checkpoint", "30%", "{{milestone_2_amount}}"],
            ["Completion", "20%", "{{milestone_3_amount}}"],
            ["Total", "100%", "{{investment_total_fmt}}"],
          ],
        },
        {
          type: "paragraph",
          text: "The {{investment_total_fmt}} is one consolidated {{timeline_days}}-day growth investment; internal service-wise costing is not exposed.",
        },
        {
          type: "paragraph",
          text: "The engagement includes the agreed Strategy → Create → Accelerate → Lead → Evolve system and relevant ScaleXpertz advantages.",
        },
        {
          type: "boldLine",
          text: "Included ScaleXpertz benefit: {{testing_spend}} initial Meta testing spend, funded by ScaleXpertz as part of the agreed engagement benefit.",
        },
        {
          type: "milestoneBar",
          segments: [
            { label: "50%  {{milestone_1_amount}}", pct: 50 },
            { label: "30%  {{milestone_2_amount}}", pct: 30 },
            { label: "20%  {{milestone_3_amount}}", pct: 20 },
          ],
        },
      ],
    },
    {
      id: "closing",
      label: "Commercial Clarity & Next Step",
      blocks: [
        { type: "heading", eyebrow: "COMMERCIAL CLARITY & NEXT STEP", title: "Clear Scope. Clear Accountability. Clear Execution" },
        {
          type: "bullets",
          title: "SEPARATE / VARIABLE EXTERNAL COSTS WHERE APPLICABLE",
          items: [
            "Meta / Google scaling media spend after the included initial Meta testing benefit",
            "Influencer, creator, UGC, model and talent fees",
            "Marketplace commissions / platform charges / marketplace media",
            "Shipping, fulfilment and courier costs",
            "Paid third-party software or subscriptions",
            "Large-scale production or exceptional requirements outside agreed scope",
          ],
        },
        { type: "spacer", size: "lg" },
        {
          type: "cardGrid",
          cols: 2,
          cards: [
            {
              title: "Performance Boundary",
              body: "ScaleXpertz is accountable for agreed strategy, execution, optimisation, documentation and milestone delivery. Actual sales, ROAS, order volume and platform performance depend on product-market response, media investment, pricing, inventory, platform conditions and other external variables.",
            },
          ],
        },
        { type: "spacer", size: "md" },
        {
          type: "bullets",
          title: "NEXT STEP",
          items: [
            "Commercial approval → Business Discovery → Growth Blueprint finalisation → Kickoff → {{timeline_days}}-Day SCALE execution.",
          ],
        },
        { type: "closingBox", brand: "ScaleXpertz", tagline: "Strategy. Systems. Execution. Ownership. Growth." },
      ],
    },
  ],
};
