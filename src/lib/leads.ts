import type { Lead, LeadInsert, LeadRow } from "@/types/leads";
import type { LeadCreateInput } from "@/lib/validations/leads";

export function toLead(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    business_type: row.business_type,
    website_url: row.website_url,
    needed_service: row.needed_service,
    budget_range: row.budget_range,
    timeline: row.timeline,
    message: row.message,
    status: row.status,
    source: row.source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toLeadInsert(input: LeadCreateInput): LeadInsert {
  return {
    name: input.name,
    email: input.email,
    business_type: input.business_type,
    website_url: input.website_url ?? null,
    needed_service: input.needed_service,
    budget_range: input.budget_range,
    timeline: input.timeline,
    message: input.message ?? null,
    status: "new",
    source: input.source,
  };
}
