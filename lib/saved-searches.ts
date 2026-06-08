import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const SavedSearchRowSchema = z.object({
  id: z.string(),
  address_label: z.string(),
  priority: z.string(),
  raw_provider_count: z.number().nullable(),
  data_source: z.string(),
  created_at: z.string()
});

export type SavedSearchSummary = {
  id: string;
  addressLabel: string;
  priority: string;
  providerCount: number | null;
  dataSource: string;
  createdAt: string;
};

export type SavedSearchLookupResult =
  | { configured: true; searches: SavedSearchSummary[] }
  | { configured: false; searches: [] };

export function normalizeLookupEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function getSavedSearchesByEmail(email: string): Promise<SavedSearchLookupResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { configured: false, searches: [] };
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false }
  });

  const { data, error } = await supabase
    .from("searches")
    .select("id,address_label,priority,raw_provider_count,data_source,created_at")
    .eq("email", normalizeLookupEmail(email))
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("saved search lookup failed", error);
    return { configured: true, searches: [] };
  }

  const rows = z.array(SavedSearchRowSchema).parse(data ?? []);

  return {
    configured: true,
    searches: rows.map((row) => ({
      id: row.id,
      addressLabel: row.address_label,
      priority: row.priority,
      providerCount: row.raw_provider_count,
      dataSource: row.data_source,
      createdAt: row.created_at
    }))
  };
}
