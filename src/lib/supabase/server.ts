import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { LeadInsert, LeadRow, LeadUpdate } from "@/types/leads";

export class SupabaseServerConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SupabaseServerConfigError";
  }
}

type Database = {
  public: {
    Tables: {
      leads: {
        Row: LeadRow;
        Insert: LeadInsert;
        Update: LeadUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      lead_status: LeadRow["status"];
    };
    CompositeTypes: Record<string, never>;
  };
};

export function createSupabaseServerClient() {
  const supabaseUrl = readRequiredEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
    "Set NEXT_PUBLIC_SUPABASE_URL to your Supabase project API URL, for example https://<project-ref>.supabase.co.",
  );
  const serviceRoleKey = readRequiredEnv(
    "SUPABASE_SERVICE_ROLE_KEY",
    "Set SUPABASE_SERVICE_ROLE_KEY to your Supabase service role key. It must only be used on the server.",
  );

  validateSupabaseUrl(supabaseUrl);

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function readRequiredEnv(name: string, helpText: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new SupabaseServerConfigError(`Missing ${name}. ${helpText}`);
  }

  return value;
}

function validateSupabaseUrl(value: string) {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new SupabaseServerConfigError(
      "NEXT_PUBLIC_SUPABASE_URL is not a valid URL. Use your Supabase project API URL, for example https://<project-ref>.supabase.co.",
    );
  }

  const isSupabaseCloudUrl =
    url.protocol === "https:" && url.hostname.endsWith(".supabase.co");
  const isLocalSupabaseApi =
    (url.hostname === "localhost" || url.hostname === "127.0.0.1") &&
    url.port !== "54323";
  const hasPath = url.pathname !== "/";

  if (hasPath || (!isSupabaseCloudUrl && !isLocalSupabaseApi)) {
    throw new SupabaseServerConfigError(
      "NEXT_PUBLIC_SUPABASE_URL must be the Supabase project API URL, not Supabase Studio. Use https://<project-ref>.supabase.co for hosted projects.",
    );
  }
}
