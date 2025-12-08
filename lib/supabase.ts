
import { createClient } from '@supabase/supabase-js';

// NOTE: In a real production environment, these would come from process.env
// For this demo, we check if they exist, otherwise we'll handle connection errors gracefully
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
