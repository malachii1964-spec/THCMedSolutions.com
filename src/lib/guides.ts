import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { type StageId, STAGES } from "@/lib/stages";

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

const frontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  stage: z.enum(
    STAGES.map((s) => s.id) as [StageId, ...StageId[]],
  ),
  week: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  readMinutes: z.number().int().positive(),
  membersOnly: z.boolean().default(false),
  updated: z.string(),
  order: z.number().int().default(0),
});

export type GuideMeta = z.infer<typeof frontmatterSchema> & { slug: string };
export type Guide = GuideMeta & { content: string };

function parseGuide(file: string): { meta: GuideMeta; content: string } {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(GUIDES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const meta = { ...frontmatterSchema.parse(data), slug };
  return { meta, content };
}

export function getAllGuides(): GuideMeta[] {
  const files = fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
  return files
    .map((f) => parseGuide(f).meta)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getGuidesByStage(stage: StageId): GuideMeta[] {
  return getAllGuides().filter((g) => g.stage === stage);
}

export function getGuide(slug: string): Guide | null {
  // Slug comes from the URL — never let it traverse out of the content dir.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { meta, content } = parseGuide(`${slug}.mdx`);
  return { ...meta, content };
}

export function getAdjacentGuides(slug: string): {
  prev: GuideMeta | null;
  next: GuideMeta | null;
} {
  const all = getAllGuides();
  const idx = all.findIndex((g) => g.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const stage = all[idx].stage;
  const stageGuides = all.filter((g) => g.stage === stage);
  const si = stageGuides.findIndex((g) => g.slug === slug);
  return {
    prev: si > 0 ? stageGuides[si - 1] : null,
    next: si < stageGuides.length - 1 ? stageGuides[si + 1] : null,
  };
}

/** First ~1/4 of a members-only guide shown to visitors as the teaser. */
export function teaserOf(content: string): string {
  const paragraphs = content.split("\n\n");
  const cut = Math.max(2, Math.floor(paragraphs.length / 4));
  return paragraphs.slice(0, cut).join("\n\n");
}
