import { describe, expect, it } from "vitest";
import {
  buildIntakeEmail,
  intakeSchema,
  isHoneypotTripped,
} from "./medical-intake";

const valid = {
  name: "Jane Grower",
  email: "jane@example.com",
  phone: "716-555-0134",
  preferredContact: "phone" as const,
  message: "Best to reach me after 5pm.",
  consent: true as const,
  hpToken: "",
};

describe("medical intake validation", () => {
  it("accepts a well-formed request", () => {
    expect(intakeSchema.safeParse(valid).success).toBe(true);
  });

  it("requires consent, a valid email, and a name", () => {
    expect(intakeSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
    expect(intakeSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
    expect(intakeSchema.safeParse({ ...valid, name: "" }).success).toBe(false);
  });

  it("detects honeypot submissions without failing validation", () => {
    // A filled honeypot must still PARSE (so browser autofill never shows a
    // confusing error to a real user) but be flagged as spam.
    const parsed = intakeSchema.safeParse({ ...valid, hpToken: "Acme Bot" });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(isHoneypotTripped(parsed.data)).toBe(true);
    }
  });

  it("does not flag a clean submission as honeypot spam", () => {
    const parsed = intakeSchema.safeParse(valid);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(isHoneypotTripped(parsed.data)).toBe(false);
    }
  });

  it("treats message as optional", () => {
    const { message: _drop, ...rest } = valid;
    void _drop;
    const parsed = intakeSchema.safeParse(rest);
    expect(parsed.success).toBe(true);
  });
});

describe("intake email builder", () => {
  it("includes the patient details and replies to the patient", () => {
    const email = buildIntakeEmail(valid);
    expect(email.subject).toContain("Jane Grower");
    expect(email.text).toContain("jane@example.com");
    expect(email.text).toContain("716-555-0134");
    expect(email.replyTo).toBe("jane@example.com");
  });

  it("escapes HTML to prevent injection in the email body", () => {
    const email = buildIntakeEmail({
      ...valid,
      name: "<script>alert(1)</script>",
    });
    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
  });
});
