import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in backend/.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySupabaseConnection() {
  console.log("📡 Connecting to Supabase at:", supabaseUrl);

  try {
    // 1. Verify Database Query Connection
    const { data: profiles, error: dbError } = await supabase
      .from("profiles")
      .select("count", { count: "exact", head: true });

    if (dbError) {
      console.error("❌ Database query error:", dbError.message);
      return;
    }
    console.log("✅ Database connection verified (`profiles` table exists).");

    // 2. Verify Service Role Auth Permissions
    const { data: users, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
      console.error("❌ Auth service error:", authError.message);
      return;
    }

    console.log(`✅ Auth service connected (${users.users.length} registered user(s) found).`);
    console.log("\n🚀 All Supabase connections are healthy!");
  } catch (err) {
    console.error("❌ Unexpected connection error:", err.message);
  }
}

verifySupabaseConnection();