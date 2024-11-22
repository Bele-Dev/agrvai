import {createClient} from "@supabase/supabase-js";

export const supabase= createClient(
    "https://tlloofzbovrygcxpxdhb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbG9vZnpib3ZyeWdjeHB4ZGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNTMxODEsImV4cCI6MjA0MTgyOTE4MX0.AXnkxzkgrMDaWw_QzaDmCIJJzfa98gX6GbRL13SxExE"
    )