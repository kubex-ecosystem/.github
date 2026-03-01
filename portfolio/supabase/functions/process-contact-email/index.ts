// deno-lint-ignore-file no-explicit-any no-import-prefix no-unversioned-import
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import nodemailer from "npm:nodemailer";

Deno.serve(async (req: Request) => {
  try {
    const payload = await req.json();

    console.log("Received payload:", payload);

    if (payload.type !== "INSERT" || payload.table !== "contacts") {
      return new Response("Not an insert on contacts", { status: 400 });
    }

    const { name, email, subject, message } = payload.record || payload;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: Deno.env.get("SMTP_USER"),
        pass: Deno.env.get("SMTP_PASS"),
      },
    });

    const htmlTemplate = `
      <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f0f13; color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.1);">
        <div style="background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%); padding: 32px 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #ffffff;">New Contact Message</h1>
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9; color: #ffffff;">via Rafa-Mori.dev Portfolio</p>
        </div>

        <div style="padding: 32px 24px; background-color: #1a1a24;">
          <div style="margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Sender Details</p>
            <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 16px;">
              <p style="margin: 0 0 8px 0; font-weight: 600;"><span style="color: #a855f7; margin-right: 8px;">Name:</span> ${name}</p>
              <p style="margin: 0; font-weight: 600;"><span style="color: #a855f7; margin-right: 8px;">Email:</span> <a href="mailto:${email}" style="color: #818cf8; text-decoration: none;">${email}</a></p>
            </div>
          </div>

          <div>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Message: ${subject}</p>
            <div style="background-color: rgba(0, 0, 0, 0.2); border-left: 4px solid #a855f7; padding: 16px; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; color: #e4e4e7; font-size: 15px;">${message}</p>
            </div>
          </div>
        </div>

        <div style="padding: 24px; text-align: center; background-color: #0f0f13; border-top: 1px solid rgba(255, 255, 255, 0.05);">
          <p style="margin: 0; font-size: 12px; color: #71717a;">This email was sent automatically from Rafa-Mori.dev Portfolio.</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #71717a;">Just click <strong>Reply</strong> to respond directly to ${name} (${email}).</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"${Deno.env.get("SMTP_NAME")}" <${Deno.env.get("SMTP_FROM")}>`,
      to: Deno.env.get("SMTP_USER"), // Enviando para o próprio autor (Rafa-Mori)
      replyTo: email, // <--- Aqui está a mágica do Reply-To!
      subject: `[Portfolio Contact] ${subject}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`, // Fallback para clientes sem suporte HTML
      html: htmlTemplate,
    };

    console.log("Sending email...");
    await transporter.sendMail(mailOptions);
    console.log("Email sent!");

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
