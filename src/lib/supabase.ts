import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// supabase 를 활용한 실시간 서버리스 댓글 시스템
// https://supabase.com/dashboard/project/dfeuswiewmeuticcrnvq
