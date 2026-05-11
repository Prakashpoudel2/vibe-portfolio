import { createClient } from '@supabase/supabase-js';

// This client uses the SECRET key and bypasses RLS. ONLY use this in Server Actions!
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'DUMMY_KEY_PLEASE_UPDATE_ENV'
);
