import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fyzwriwibzomwlqzybal.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5endyaXdpYnpvbXdscXp5YmFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4OTU1MjQsImV4cCI6MjEwNTQ3MTUyNH0.Fw4o0csLsJRQeRqaikp2YxhP_82pqx0DPFRt_T_WRUg'


export const supabase = createClient(supabaseUrl, supabaseAnonKey)