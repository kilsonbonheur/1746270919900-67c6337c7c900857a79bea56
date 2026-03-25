import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bpbeucgxxxjwcydujcue.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwYmV1Y2d4eHhqd2N5ZHVqY3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNjg3MjcsImV4cCI6MjA4OTk0NDcyN30.zZvIKvYwdF66bEbzQtSLl7J_sXIBz6ecjDQagsYRiMw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
