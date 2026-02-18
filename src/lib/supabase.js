import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = supabaseUrl && 
                   supabaseAnonKey && 
                   supabaseUrl !== 'your_supabase_project_url' &&
                   supabaseUrl.startsWith('https://');

if (!isConfigured) {
  console.warn('Supabase credentials missing or invalid. Please check your .env file.');
}

// Export a safe instance that won't crash on initialization
export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            eq: () => ({
              single: async () => ({ data: null, error: { message: 'Not configured' } }),
            }),
            single: async () => ({ data: null, error: { message: 'Not configured' } }),
            order: () => ({
              select: async () => ({ data: [], error: null }),
              then: (cb) => cb({ data: [], error: null })
            })
          }),
          order: () => ({
            order: () => ({
              data: [],
              error: null,
              then: (cb) => cb({ data: [], error: null })
            }),
            then: (cb) => cb({ data: [], error: null })
          }),
          then: (cb) => cb({ data: [], error: null })
        })
      })
    };
