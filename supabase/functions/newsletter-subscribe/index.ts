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

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    const response = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscriptions`, {
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

    if (!response.ok && response.status !== 409) {
      throw new Error(`Failed to save subscription: ${response.statusText}`);
    }

    const brevoApiKey = Deno.env.get("BREVO_API_KEY");
    const brevoSenderEmail = Deno.env.get("BREVO_SENDER_EMAIL");
    const brevoSenderName = Deno.env.get("BREVO_SENDER_NAME");

    const greeting = name?.trim() || "athlete";

    if (brevoApiKey && brevoSenderEmail && brevoSenderName) {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": brevoApiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: brevoSenderName, email: brevoSenderEmail },
          to: [{ email, name: name?.trim() || undefined }],
          subject: "Welcome to Asciende Newsletter",
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #581c87;">Welcome to Asciende, ${greeting}!</h2>
              <p>Thank you for subscribing to our newsletter!</p>
              <p>You'll receive weekly insights to enhance your performance and master our science-based performance tools.</p>
              <p>Welcome to the community of athletes who are serious about elevation.</p>
            </div>
          `,
        }),
      });

      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": brevoApiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: brevoSenderName, email: brevoSenderEmail },
          to: [{ email: "asciendepro@gmail.com" }],
          subject: `New Newsletter Subscription: ${email}`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif;">
              <h2 style="color: #581c87;">New Newsletter Subscriber</h2>
              <p><strong>Name:</strong> ${name?.trim() || '—'}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subscribed at:</strong> ${new Date().toISOString()}</p>
            </div>
          `,
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
