import type { Metadata } from "next";
import { DashboardClient } from "@/components/admin/DashboardClient";

export const metadata: Metadata = {
  title: "Lead Dashboard",
  description:
    "Manage real ServicePro Lead Engine quote requests from Supabase.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
