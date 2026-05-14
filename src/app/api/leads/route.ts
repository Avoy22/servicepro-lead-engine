import { NextResponse, type NextRequest } from "next/server";
import { verifyAdminToken } from "@/lib/admin-auth";
import { toLead } from "@/lib/leads";
import {
  createSupabaseServerClient,
  SupabaseServerConfigError,
} from "@/lib/supabase/server";
import { leadCreateSchema } from "@/lib/validations/leads";
import type { LeadInsert } from "@/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = leadCreateSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the quote request fields.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const supabase = createSupabaseServerClient();
    const leadPayload: LeadInsert = {
      name: parsed.data.name,
      email: parsed.data.email,
      business_type: parsed.data.business_type,
      website_url: parsed.data.website_url,
      needed_service: parsed.data.needed_service,
      budget_range: parsed.data.budget_range,
      timeline: parsed.data.timeline,
      message: parsed.data.message,
      status: "new",
      source: parsed.data.source,
    };
    const { data, error } = await supabase
      .from("leads")
      .insert(leadPayload)
      .select("*")
      .single();

    if (error) {
      console.error("Create lead failed:", error);
      return NextResponse.json(
        { error: `Could not create the lead in Supabase: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ lead: toLead(data) }, { status: 201 });
  } catch (error) {
    console.error("Create lead failed:", error);

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

export async function GET(request: NextRequest) {
  const adminToken = request.headers.get("x-admin-token");
  const auth = verifyAdminToken(adminToken);

  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch leads failed:", error);
      return NextResponse.json(
        { error: `Could not load leads from Supabase: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ leads: data.map(toLead) });
  } catch (error) {
    console.error("Fetch leads failed:", error);

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
