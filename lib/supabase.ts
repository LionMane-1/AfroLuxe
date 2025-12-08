
import { createClient } from '@supabase/supabase-js';

// NOTE: In a real production environment, these would come from process.env
// For this demo, we check if they exist, otherwise we'll handle connection errors gracefully
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://iswphzzpdalbipmqhadn.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzd3BoenpwZGFsYmlwbXFoYWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NzkzMzUsImV4cCI6MjA4MDM1NTMzNX0.yqkHMjLPwKcTupiB1QcglO8mfwSoLptQpIFzk7gZehM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
