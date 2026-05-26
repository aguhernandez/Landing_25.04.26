import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const BREVO_FORM_URL =
  "https://b7a4e46e.sibforms.com/serve/MUIFACL7Yna_eaf3t2uESdNqzDv9Jg26fCrgGp_9bm_UayIEQhCok7eK37LGB_VLTmVk-jYZZ6BonuvIzzD-mkZG36dnW0kXFShL40eUv8afdaUihQNZWevfBbiCxyH1PjKX1Q6YkqRi0iPYdu1j176musbAgLG9he9f2vtuTxnTzxk4hAZecIZaYXU77xWKGlYV1Cs07o9HjvjR";

interface SubscribeRequest {
  email: string;
  name?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { email, name }: SubscribeRequest = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const parts = (name ?? "").trim().split(/\s+/);
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ");

    const formData = new FormData();
    formData.append("EMAIL", email);
    formData.append("OPT_IN", "1");
    formData.append("email_address_check", "");
    formData.append("locale", "es");
    if (firstName) formData.append("FIRSTNAME", firstName);
    if (lastName) formData.append("LASTNAME", lastName);

    // Proxy the request to Brevo from the server — no CORS issues
    await fetch(BREVO_FORM_URL, {
      method: "POST",
      body: formData,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
