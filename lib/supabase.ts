
import { createClient } from '@supabase/supabase-js';

// Safely access process.env to avoid ReferenceErrors in standard browser environments
const getEnvVar = (name: string): string | undefined => {
  try {
    return (typeof process !== 'undefined' && process.env) ? process.env[name] : undefined;
  } catch {
    return undefined;
  }
};

const supabaseUrl = getEnvVar('REACT_APP_SUPABASE_URL') || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = getEnvVar('REACT_APP_SUPABASE_ANON_KEY') || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
