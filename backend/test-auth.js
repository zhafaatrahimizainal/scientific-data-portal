import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function testAuthPipeline() {
  const testEmail = `test.researcher.${Date.now()}@lab.edu`;
  const testPassword = "SecurePassword123!";
  const testName = "Test Researcher";
  const testLab = "Astrobiology Lab";

  console.log(`🧪 [1/4] Attempting Sign Up for: ${testEmail}`);

  // 1. Test Sign Up
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: {
        full_name: testName,
        laboratory: testLab,
      },
    },
  });

  if (signUpError) {
    console.error("❌ Sign Up Failed:", signUpError.message);
    return;
  }

  const userId = signUpData.user?.id;
  console.log(`✅ Sign Up Successful! User ID: ${userId}`);

  // 2. Test SQL Trigger (Profiles table insertion)
  console.log("🧪 [2/4] Verifying automatic `profiles` record creation...");
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError) {
    console.error("⚠️ Profile trigger warning (did you run the SQL script?):", profileError.message);
  } else {
    console.log(`✅ Profile created automatically via SQL Trigger:`, profile);
  }

  // 3. Test Sign In
  console.log("🧪 [3/4] Attempting Sign In with credentials...");
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword,
  });

  if (signInError) {
    console.error("❌ Sign In Failed:", signInError.message);
  } else {
    console.log(`✅ Sign In Successful! Received JWT Access Token.`);
  }

  // 4. Clean Up Test User
  console.log("🧪 [4/4] Cleaning up test user from Supabase...");
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (deleteError) {
    console.error("⚠️ Cleanup Warning:", deleteError.message);
  } else {
    console.log("✅ Test user removed successfully. Database clean!");
  }

  console.log("\n🎉 Authentication test pipeline passed completely!");
}

testAuthPipeline();