import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

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

export const supabaseProjectRef = process.env.SUPABASE_PROJECT_REF;
