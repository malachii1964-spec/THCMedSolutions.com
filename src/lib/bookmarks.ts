"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { bookmark } from "@/db/schema";
import { getGuide } from "@/lib/guides";
import { getSessionUser } from "@/lib/session";

const slugSchema = z.string().regex(/^[a-z0-9-]+$/);

export async function listBookmarks(): Promise<string[]> {
  const user = await getSessionUser();
  if (!user) return [];
  const rows = await db
    .select({ slug: bookmark.guideSlug })
    .from(bookmark)
    .where(eq(bookmark.userId, user.id));
  return rows.map((r) => r.slug);
}

export async function toggleBookmark(rawSlug: string): Promise<void> {
  const user = await getSessionUser();
  if (!user) return; // signed-out clicks are a no-op; UI hides the control
  const slug = slugSchema.parse(rawSlug);
  if (!getGuide(slug)) return;

  const existing = await db
    .select({ slug: bookmark.guideSlug })
    .from(bookmark)
    .where(and(eq(bookmark.userId, user.id), eq(bookmark.guideSlug, slug)));

  if (existing.length > 0) {
    await db
      .delete(bookmark)
      .where(and(eq(bookmark.userId, user.id), eq(bookmark.guideSlug, slug)));
  } else {
    await db.insert(bookmark).values({ userId: user.id, guideSlug: slug });
  }
  revalidatePath(`/guides/${slug}`);
  revalidatePath("/account");
}
