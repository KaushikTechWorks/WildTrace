import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// Database table names
export const TABLES = {
  SPECIES: 'species',
  CONSERVATION_PROJECTS: 'conservation_projects',
  ORGANIZATIONS: 'organizations',
  USERS: 'users',
  OBSERVATIONS: 'observations',
  THREATS: 'threats',
  GEOGRAPHIC_RANGES: 'geographic_ranges',
} as const;
