// Supabase Configuration

const SUPABASE_URL = "https://bpeceaaflohgygqwogeg.supabase.co/";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_eZ-o5T8vSPEisigS_cAsfQ_IZSGt1Yd";

if (!window.supabase) {
    throw new Error("Supabase library load nahi hui.");
}

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

console.log("Supabase client initialized successfully");
