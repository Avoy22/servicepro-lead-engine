export const services = [
  {
    title: "Conversion-Focused Website",
    slug: "conversion-focused-website",
    icon: "Globe",
    description:
      "A modern, mobile-first service business website engineered to turn visitors into quote requests, calls, and booked appointments.",
    bullets: [
      "Premium SaaS-style design",
      "SEO-ready structure",
      "Sub-second page loads",
    ],
    tag: "Frontend",
  },
  {
    title: "Quote Request System",
    slug: "quote-request-system",
    icon: "ClipboardList",
    description:
      "A structured inquiry form that captures customer details, service needs, budget, timeline, and project notes in one place.",
    bullets: [
      "Validated multi-field form",
      "Spam-resistant submission",
      "Auto-routed to the dashboard",
    ],
    tag: "Lead Capture",
  },
  {
    title: "Lead Management Dashboard",
    slug: "lead-management-dashboard",
    icon: "LayoutDashboard",
    description:
      "A simple CRM-style dashboard to track new, contacted, quoted, won, and lost leads with status changes and notes.",
    bullets: [
      "Pipeline at a glance",
      "Status updates per lead",
      "Search and filter recent leads",
    ],
    tag: "Mini CRM",
  },
  {
    title: "Industry Service Pages",
    slug: "industry-service-pages",
    icon: "Layers",
    description:
      "Reusable industry-specific pages for contractors, clinics, salons, cleaning companies, consultants, and local services.",
    bullets: [
      "Industry-tuned copy",
      "Consistent layout system",
      "Easy to extend per vertical",
    ],
    tag: "Content",
  },
  {
    title: "SEO & Trust Sections",
    slug: "seo-trust-sections",
    icon: "ShieldCheck",
    description:
      "SEO-ready structure with testimonials, FAQs, service areas, trust badges, process sections, and clear calls to action.",
    bullets: [
      "Optimized metadata",
      "Schema-friendly markup",
      "Built-in trust signals",
    ],
    tag: "Growth",
  },
  {
    title: "Contact & Messaging Integrations",
    slug: "contact-integrations",
    icon: "MessagesSquare",
    description:
      "Fast contact buttons, email-ready inquiry flows, WhatsApp deep links, and lightweight automation hooks for any service brand.",
    bullets: [
      "Email & WhatsApp ready",
      "Click-to-call surfaces",
      "Plug into Slack / CRMs",
    ],
    tag: "Integrations",
  },
];

export type Service = (typeof services)[number];
