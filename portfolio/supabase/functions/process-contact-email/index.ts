// deno-lint-ignore-file no-explicit-any
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

    const mailOptions = {
      from: `"${Deno.env.get("SMTP_NAME")}" <${Deno.env.get("SMTP_FROM")}>`,
      to: Deno.env.get("SMTP_USER"), // Enviando para o próprio autor (Rafa-Mori)
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
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
