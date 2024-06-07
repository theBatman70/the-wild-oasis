import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nektdsqqsnbctaxeaynv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5la3Rkc3Fxc25iY3RheGVheW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4ODAxOTAsImV4cCI6MjAzMjQ1NjE5MH0.-_PsXHayaT7BykBb4qaotWWBrYyrzfX7itVs0LzpWfs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
