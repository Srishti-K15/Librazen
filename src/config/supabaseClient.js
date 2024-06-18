import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey =  process.env.REACT_APP_SUPABASE_ANON_KEY ;
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Both SUPABASE URL and ANON KEY must be provided');
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase