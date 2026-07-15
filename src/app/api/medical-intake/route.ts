import { Resend } from "resend";
import {
  buildIntakeEmail,
  intakeConfigured,
  intakeSchema,
} from "@/lib/medical-intake";
import { MEDICAL_PROVIDER } from "@/lib/site";

export async function POST(req: Request) {
  const parsed = intakeSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    // Honeypot trips land here too — respond generically, don't tip off bots.
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Please check the form." },
      { status: 400 },
    );
  }

  // Not wired up yet (no Resend key / destination email). Be honest and point
  // the patient at the phone number rather than pretending we sent something.
  if (!intakeConfigured()) {
    return Response.json(
      {
        error: `Online requests aren't enabled yet — please call the office directly at ${MEDICAL_PROVIDER.phone}.`,
        offline: true,
      },
      { status: 503 },
    );
  }

  const { subject, text, html, replyTo } = buildIntakeEmail(parsed.data);

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from:
        process.env.MEDICAL_INTAKE_FROM ??
        "THCMed Solutions <onboarding@resend.dev>",
      to: process.env.MEDICAL_INTAKE_TO!,
      replyTo,
      subject,
      text,
      html,
    });
    if (error) {
      return Response.json(
        {
          error: `We couldn't send that — please call the office at ${MEDICAL_PROVIDER.phone}.`,
        },
        { status: 502 },
      );
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      {
        error: `We couldn't send that — please call the office at ${MEDICAL_PROVIDER.phone}.`,
      },
      { status: 502 },
    );
  }
}
