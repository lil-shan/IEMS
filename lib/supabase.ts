import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',
  },
});

export type TimerSchedule = {
  id: string;
  user_id: string;
  room_id: string;
  load_type: 'heavy' | 'special' | 'light';
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
};

export type Room = {
  id: string;
  name: string;
  contribution: number;
};