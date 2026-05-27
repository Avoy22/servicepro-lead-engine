import { NextResponse, type NextRequest } from "next/server";
import { verifyAdminToken } from "@/lib/admin-auth";
import { toLead } from "@/lib/leads";
import {
  createSupabaseServerClient,
  SupabaseServerConfigError,
} from "@/lib/supabase/server";
import type { LeadInsert } from "@/types";

export const runtime = "nodejs";

const demoLeads: LeadInsert[] = [
  {
    name: "Maya Patel",
    email: "maya@clearviewcleaning.example",
    business_type: "Home Services",
    website_url: "https://clearviewcleaning.example",
    needed_service: "Full lead engine (everything)",
    budget_range: "$5,000+",
    timeline: "ASAP - within 2 weeks",
    message:
      "We need a better system for recurring cleaning inquiries and follow-up.",
    status: "new",
    source: "demo_seed",
    priority: "high",
    follow_up_date: nextDate(2),
    estimated_value: 7200,
    admin_notes: "Strong fit for full website plus CRM workflow.",
  },
  {
    name: "Noah Brooks",
    email: "noah@brooksroofing.example",
    business_type: "Skilled Trades",
    website_url: null,
    needed_service: "Quote request system",
    budget_range: "$1,500 - $5,000",
    timeline: "2 - 4 weeks",
    message: "Roofing leads are coming from calls, texts, and Facebook.",
    status: "contacted",
    source: "demo_seed",
    priority: "high",
    follow_up_date: nextDate(4),
    estimated_value: 4800,
    admin_notes: "Asked for examples of contractor dashboards.",
  },
  {
    name: "Elena Rivera",
    email: "hello@riverawellness.example",
    business_type: "Health & Wellness",
    website_url: "https://riverawellness.example",
    needed_service: "New conversion-focused website",
    budget_range: "$1,500 - $5,000",
    timeline: "1 - 2 months",
    message: "Clinic needs a cleaner site and a more structured inquiry flow.",
    status: "quoted",
    source: "demo_seed",
    priority: "normal",
    follow_up_date: nextDate(7),
    estimated_value: 3900,
    admin_notes: "Quote sent for website plus lead form.",
  },
  {
    name: "Marcus Chen",
    email: "marcus@northstarcatering.example",
    business_type: "Food & Events",
    website_url: null,
    needed_service: "Industry landing pages",
    budget_range: "$500 - $1,500",
    timeline: "Flexible",
    message: "Interested in landing pages for corporate catering packages.",
    status: "new",
    source: "demo_seed",
    priority: "normal",
    follow_up_date: nextDate(10),
    estimated_value: 1400,
    admin_notes: null,
  },
  {
    name: "Priya Shah",
    email: "priya@shahconsulting.example",
    business_type: "Professional Services",
    website_url: "https://shahconsulting.example",
    needed_service: "Mini CRM / lead dashboard",
    budget_range: "$1,500 - $5,000",
    timeline: "2 - 4 weeks",
    message: "Consulting firm wants a simple lead dashboard for inbound calls.",
    status: "won",
    source: "demo_seed",
    priority: "low",
    follow_up_date: null,
    estimated_value: 2600,
    admin_notes: "Won after dashboard walkthrough.",
  },
];

export async function POST(request: NextRequest) {
  const adminToken = request.headers.get("x-admin-token");
  const auth = verifyAdminToken(adminToken);

  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  try {
    const supabase = createSupabaseServerClient();
    const demoEmails = demoLeads.map((lead) => lead.email);
    const { data: existing, error: existingError } = await supabase
      .from("leads")
      .select("email")
      .in("email", demoEmails);

    if (existingError) {
      console.error("Check demo leads failed:", existingError);
      return NextResponse.json(
        {
          error: `Could not check existing demo leads: ${existingError.message}`,
        },
        { status: 500 },
      );
    }

    const existingEmails = new Set((existing ?? []).map((lead) => lead.email));
    const leadsToInsert = demoLeads.filter(
      (lead) => !existingEmails.has(lead.email),
    );

    if (leadsToInsert.length === 0) {
      return NextResponse.json({ inserted: 0, leads: [] });
    }

    const { data, error } = await supabase
      .from("leads")
      .insert(leadsToInsert)
      .select("*");

    if (error) {
      console.error("Insert demo leads failed:", error);
      return NextResponse.json(
        { error: `Could not insert demo leads: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({
      inserted: data.length,
      leads: data.map(toLead),
    });
  } catch (error) {
    console.error("Seed leads failed:", error);

    if (error instanceof SupabaseServerConfigError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        error:
          "Could not connect to Supabase. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server.",
      },
      { status: 500 },
    );
  }
}

function nextDate(daysFromNow: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().slice(0, 10);
}
