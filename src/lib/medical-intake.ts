import { z } from "zod";
import { MEDICAL_PROVIDER } from "@/lib/site";

/**
 * Patient "request an appointment" intake. Deliberately minimal — it sets up
 * contact with the office, it is NOT a medical record. We collect only what's
 * needed to reach the patient back, plus a free-text note they control.
 */
export const intakeSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(7, "Enter a phone number").max(40),
  preferredContact: z.enum(["phone", "email"]),
  message: z.string().trim().max(1500).optional().default(""),
  consent: z.literal(true, {
    message: "Please confirm consent to be contacted",
  }),
  // Honeypot — real users never fill this; bots do. We accept any value here
  // (so browser autofill never trips a confusing validation error) and detect
  // spam separately via isHoneypotTripped(). The field name is deliberately
  // non-semantic so password managers and autofill leave it alone.
  hpToken: z.string().optional().default(""),
});

export type IntakeInput = z.infer<typeof intakeSchema>;

/** True when the honeypot was filled — treat as a bot and silently drop. */
export function isHoneypotTripped(data: IntakeInput): boolean {
  return data.hpToken.trim().length > 0;
}

/** Builds the email sent to the provider's office. Pure — easy to test. */
export function buildIntakeEmail(data: IntakeInput) {
  const subject = `New certification request — ${data.name}`;
  const lines = [
    `New medical cannabis certification request from ${MEDICAL_PROVIDER.practice}'s referral page:`,
    "",
    `Name:              ${data.name}`,
    `Email:             ${data.email}`,
    `Phone:             ${data.phone}`,
    `Prefers contact by: ${data.preferredContact}`,
    "",
    "Message:",
    data.message ? data.message : "(none)",
    "",
    "— Sent via Lake Erie Cannabis. Reply directly to reach the patient.",
  ];
  const text = lines.join("\n");
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 12px">New certification request</h2>
      <p style="margin:0 0 16px">From the ${esc(MEDICAL_PROVIDER.practice)} referral page on Lake Erie Cannabis.</p>
      <table style="border-collapse:collapse">
        <tr><td style="padding:2px 12px 2px 0"><strong>Name</strong></td><td>${esc(data.name)}</td></tr>
        <tr><td style="padding:2px 12px 2px 0"><strong>Email</strong></td><td><a href="mailto:${esc(data.email)}">${esc(data.email)}</a></td></tr>
        <tr><td style="padding:2px 12px 2px 0"><strong>Phone</strong></td><td>${esc(data.phone)}</td></tr>
        <tr><td style="padding:2px 12px 2px 0"><strong>Prefers</strong></td><td>${esc(data.preferredContact)}</td></tr>
      </table>
      ${data.message ? `<p style="margin:16px 0 4px"><strong>Message</strong></p><p style="margin:0;white-space:pre-wrap">${esc(data.message)}</p>` : ""}
      <p style="margin:20px 0 0;color:#666;font-size:13px">Sent via Lake Erie Cannabis. Reply directly to reach the patient.</p>
    </div>`;
  return { subject, text, html, replyTo: data.email };
}

/** Whether the email pipeline is fully configured on the server. */
export function intakeConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.MEDICAL_INTAKE_TO);
}
