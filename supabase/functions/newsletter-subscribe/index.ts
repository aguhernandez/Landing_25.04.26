import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

    // Save to Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    const dbResponse = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseServiceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email,
        name: name?.trim() || null,
        is_active: true,
      }),
    });

    if (!dbResponse.ok && dbResponse.status !== 409) {
      throw new Error(`Failed to save subscription: ${dbResponse.statusText}`);
    }

    // Add contact to Brevo list 8
    const brevoApiKey = Deno.env.get("BREVO_API_KEY");

    if (brevoApiKey) {
      const nameParts = name?.trim().split(" ") ?? [];
      const firstName = nameParts[0] ?? "";
      const lastName = nameParts.slice(1).join(" ") ?? "";

      await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": brevoApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          attributes: {
            ...(firstName && { FIRSTNAME: firstName }),
            ...(lastName && { LASTNAME: lastName }),
          },
          listIds: [8],
          updateEnabled: true,
        }),
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Successfully subscribed to newsletter" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
