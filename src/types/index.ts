export type { Service } from "@/data/services";
export type { Industry } from "@/data/industries";

export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export type Lead = {
  id: string;
  name: string;
  business: string;
  industry: string;
  service: string;
  budget: string;
  status: LeadStatus;
  createdAt: string;
};
