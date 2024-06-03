import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEST_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEST_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key must be provided');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
