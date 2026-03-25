// Supabase integration is currently disabled.
// To re-enable, connect a Supabase project and uncomment the lines below.

// import { createClient } from '@supabase/supabase-js';
// const supabaseUrl = 'YOUR_SUPABASE_URL';
// const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock supabase client that logs actions to console instead of calling Supabase
export const supabase = {
  from: (table) => ({
    insert: async (data) => {
      console.log(`[Supabase Disabled] Would insert into "${table}":`, data);
      return { data, error: null };
    },
    select: async () => {
      console.log(`[Supabase Disabled] Would select from "${table}"`);
      return { data: [], error: null };
    },
  }),
  storage: {
    from: (bucket) => ({
      upload: async (path, file) => {
        console.log(`[Supabase Disabled] Would upload to "${bucket}/${path}"`);
        return { data: { path }, error: null };
      },
      getPublicUrl: (path) => {
        console.log(`[Supabase Disabled] Would get public URL for "${bucket}/${path}"`);
        return { data: { publicUrl: `https://placeholder.local/${bucket}/${path}` } };
      },
    }),
  },
};
