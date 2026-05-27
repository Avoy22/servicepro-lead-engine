import { NextResponse, type NextRequest } from "next/server";
import { verifyAdminToken } from "@/lib/admin-auth";
import { toLead } from "@/lib/leads";
import {
  createSupabaseServerClient,
  SupabaseServerConfigError,
} from "@/lib/supabase/server";
import { leadStatusUpdateSchema } from "@/lib/validations/leads";
import type { LeadUpdate } from "@/types";

export const runtime = "nodejs";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const adminToken = request.headers.get("x-admin-token");
  const auth = verifyAdminToken(adminToken);

  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Lead ID is required." }, { status: 400 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = leadStatusUpdateSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please choose a valid lead status." },
      { status: 400 },
    );
  }

  try {
    const supabase = createSupabaseServerClient();
    const updates: LeadUpdate = {
      updated_at: new Date().toISOString(),
    };

    if (typeof parsed.data.status !== "undefined") {
      updates.status = parsed.data.status;
    }

    if (typeof parsed.data.priority !== "undefined") {
      updates.priority = parsed.data.priority;
    }

    if (typeof parsed.data.admin_notes !== "undefined") {
      updates.admin_notes = parsed.data.admin_notes ?? null;
    }

    if (typeof parsed.data.follow_up_date !== "undefined") {
      updates.follow_up_date = parsed.data.follow_up_date ?? null;
    }

    if (typeof parsed.data.estimated_value !== "undefined") {
      updates.estimated_value = parsed.data.estimated_value ?? null;
    }

    const { data, error } = await supabase
      .from("leads")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Update lead status failed:", error);
      return NextResponse.json(
        { error: `Could not update the lead status in Supabase: ${error.message}` },
        { status: error.code === "PGRST116" ? 404 : 500 },
      );
    }

    return NextResponse.json({ lead: toLead(data) });
  } catch (error) {
    console.error("Update lead failed:", error);

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
