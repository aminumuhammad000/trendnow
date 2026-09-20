import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let supabaseClient = null;

if (isSupabaseConfigured) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
} else {
  // Helpful development warning without crashing the entire app shell
  console.warn(
    '[Supabase] Missing environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are defined in your .env file or deployment environment.'
  );
}

/**
 * Returns the Supabase client instance.
 * Throws a descriptive error if environment variables are not configured.
 */
export function getSupabaseClient() {
  if (!supabaseClient) {
    throw new Error(
      'Supabase client is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.'
    );
  }
  return supabaseClient;
}

export const supabase = supabaseClient;
