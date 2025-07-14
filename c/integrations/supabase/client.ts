
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://fieilsaaqsdpddxynxxw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZWlsc2FhcXNkcGRkeHlueHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzk4NDAsImV4cCI6MjA2NzAxNTg0MH0.UM9b65tCFwG8UaoUuKPHDyjoVakRBXVoSEF5cby7gqc'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
