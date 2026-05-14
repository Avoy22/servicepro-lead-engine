export const leadStatuses = [
  "new",
  "contacted",
  "quoted",
  "won",
  "lost",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export const leadPriorities = ["low", "normal", "high"] as const;

export type LeadPriority = (typeof leadPriorities)[number];

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
  admin_notes: string | null;
  priority: LeadPriority;
  follow_up_date: string | null;
  estimated_value: number | null;
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
  admin_notes: string | null;
  priority: LeadPriority;
  follow_up_date: string | null;
  estimated_value: number | null;
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
  admin_notes?: string | null;
  priority?: LeadPriority;
  follow_up_date?: string | null;
  estimated_value?: number | null;
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
    | "admin_notes"
    | "priority"
    | "follow_up_date"
    | "estimated_value"
    | "updated_at"
  >
>;
