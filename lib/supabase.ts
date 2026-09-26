import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  // Neutral placeholder so createClient() does not throw at build time when env is unset.
  "https://placeholder.supabase.co";

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.build_placeholder";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export function isSupabaseConfigured() {
  return (
    Boolean(
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.SUPABASE_SECRET_KEY ||
        process.env.SUPABASE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.SUPABASE_ANON_KEY
    ) && !supabaseKey.includes("build_placeholder")
  );
}

/** True when the server-side key is a service_role key (bypasses RLS). */
export function isServiceRoleKey(): boolean {
  try {
    const payload = JSON.parse(Buffer.from(supabaseKey.split(".")[1], "base64url").toString("utf-8"));
    return payload?.role === "service_role";
  } catch {
    return false;
  }
}

/**
 * Turn a PostgREST error into an actionable message. RLS violations (42501)
 * almost always mean the deployment is running with the anon key.
 */
export function friendlyDbError(error: { code?: string; message: string }): string {
  if (error.code === "42501" || /row-level security/i.test(error.message)) {
    return isServiceRoleKey()
      ? `${error.message}. The service role key is set, so check the table's RLS policies.`
      : `${error.message}. The server is using the anon key; set SUPABASE_SERVICE_ROLE_KEY in your hosting environment variables (Netlify: Site settings → Environment variables) and redeploy.`;
  }
  if (error.code === "42P01" || /schema cache/i.test(error.message)) {
    return `${error.message}. Run supabase/schema.sql in the Supabase SQL Editor.`;
  }
  return error.message;
}
