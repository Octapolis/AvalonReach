import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Public Supabase client for AvalonReach.
 *
 * This intentionally uses only the browser-safe publishable/anon key. Do not add
 * service-role, secret, or database-password access here. Admin migrations should
 * be run manually in Supabase until we explicitly decide server-side admin access
 * is needed.
 */
export function createSupabaseClient() {
  if (!supabaseUrl || !supabasePublishableKey) return null;

  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: { persistSession: false }
  });
}

export function createSupabaseServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false }
  });
}

export const supabaseProjectRef = process.env.SUPABASE_PROJECT_REF ?? process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF;
