export const industries = [
  {
    slug: "home-services",
    name: "Home Services",
    icon: "Home",
    description:
      "For cleaning, plumbing, HVAC, electrical, roofing, landscaping, and repair businesses that need a steady pipeline of qualified leads.",
    examples: ["Cleaning", "Plumbing", "HVAC", "Roofing", "Electrical"],
  },
  {
    slug: "health-wellness",
    name: "Health & Wellness",
    icon: "HeartPulse",
    description:
      "For clinics, dentists, therapists, fitness trainers, and wellness providers who need a polished web presence and booking pipeline.",
    examples: ["Dental Clinic", "Therapist", "Gym Trainer", "Wellness Coach"],
  },
  {
    slug: "beauty-lifestyle",
    name: "Beauty & Lifestyle",
    icon: "Sparkles",
    description:
      "For salons, spas, barbers, makeup artists, photographers, and personal brands that convert through portfolio-driven inquiries.",
    examples: ["Beauty Salon", "Spa", "Barber", "Photography"],
  },
  {
    slug: "food-events",
    name: "Food & Events",
    icon: "Utensils",
    description:
      "For restaurants, caterers, cloud kitchens, event planners, and party service providers running on inbound enquiries.",
    examples: ["Catering", "Restaurant", "Cloud Kitchen", "Event Planner"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    icon: "Briefcase",
    description:
      "For consultants, agencies, coaches, accountants, legal offices, and B2B service providers selling expertise and outcomes.",
    examples: ["Consultant", "Agency", "Coach", "Accountant"],
  },
  {
    slug: "skilled-trades",
    name: "Skilled Trades",
    icon: "Wrench",
    description:
      "For contractors, fabricators, carpenters, painters, mechanics, and workshop businesses that win on craft and reliability.",
    examples: ["Contractor", "Fabricator", "Carpenter", "Painter"],
  },
];

export type Industry = (typeof industries)[number];
