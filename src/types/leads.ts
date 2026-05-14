export const leadStatuses = [
  "new",
  "contacted",
  "quoted",
  "won",
  "lost",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export type Lead = {
  id: string;
  name: string;
  email: string;
  business_type: string;
  website_url: string | null;
  needed_service: string;
  budget_range: string;
  timeline: string;
  message: string | null;
  status: LeadStatus;
  source: string | null;
  createdAt: string;
  updatedAt: string | null;
};

export type LeadRow = {
  id: string;
  name: string;
  email: string;
  business_type: string;
  website_url: string | null;
  needed_service: string;
  budget_range: string;
  timeline: string;
  message: string | null;
  status: LeadStatus;
  source: string | null;
  created_at: string;
  updated_at: string | null;
};

export type LeadInsert = {
  name: string;
  email: string;
  business_type: string;
  website_url?: string | null;
  needed_service: string;
  budget_range: string;
  timeline: string;
  message?: string | null;
  status?: LeadStatus;
  source: string;
};

export type LeadUpdate = Partial<
  Pick<
    LeadRow,
    | "name"
    | "email"
    | "business_type"
    | "website_url"
    | "needed_service"
    | "budget_range"
    | "timeline"
    | "message"
    | "status"
    | "source"
    | "updated_at"
  >
>;
