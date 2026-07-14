import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { getSessionUser } from "@/lib/session";
import {
  PLANT_DOCTOR_MODEL,
  PLANT_DOCTOR_SYSTEM,
} from "@/lib/plant-doctor";

export const maxDuration = 60;

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(40), // cap conversation length per request
});

export async function POST(req: Request) {
  // Members only — protects the API budget and ties usage to accounts.
  const user = await getSessionUser();
  if (!user) {
    return Response.json(
      { error: "Sign in (free) to talk to the Plant Doctor." },
      { status: 401 },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The Doctor is offline — ANTHROPIC_API_KEY is not configured." },
      { status: 503 },
    );
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const anthropic = new Anthropic();

  try {
    const stream = anthropic.messages.stream({
      model: PLANT_DOCTOR_MODEL,
      max_tokens: 1200,
      system: PLANT_DOCTOR_SYSTEM,
      messages: parsed.data.messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch {
          controller.enqueue(
            encoder.encode("\n\n[The Doctor got interrupted — try again.]"),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return Response.json(
      { error: "The Doctor couldn't be reached. Try again in a minute." },
      { status: 502 },
    );
  }
}
