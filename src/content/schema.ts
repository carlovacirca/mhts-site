// Frontmatter contract for blog posts in src/content/blog/<slug>.md.
// This is the shape documented in AUTOMATION.md section 4.1. Change it there
// first, then here. A post that fails this schema fails the build.
import { z } from "zod";

export const BLOG_CATEGORIES = [
  "Hair Systems",
  "Scalp Micropigmentation",
  "Hair Loss Solutions",
  "Maintenance & Care",
  "Before & After",
  "Expert Tips",
] as const;

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD")
  .refine((d) => {
    const t = new Date(`${d}T00:00:00Z`);
    return !Number.isNaN(t.getTime()) && t.toISOString().slice(0, 10) === d;
  }, "not a real calendar date");

const nonEmpty = z.string().trim().min(1);

export const blogFrontmatterSchema = z
  .object({
    title: nonEmpty,
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase words joined by hyphens"),
    description: nonEmpty, // listing card excerpt
    metaDescription: nonEmpty,
    category: z.enum(BLOG_CATEGORIES),
    publishDate: isoDate, // drives date-gated publishing
    author: nonEmpty.optional(), // omitted = no byline shown
    readTime: z.string().regex(/^\d+ min read$/, 'must look like "8 min read"'),
    heroImage: z
      .string()
      .regex(/^@\/assets\/[a-z0-9-]+\.(jpg|jpeg|png|webp)$/, "must be @/assets/<name>.jpg|jpeg|png|webp")
      .optional(),
    heroImageAlt: nonEmpty,
    featured: z.boolean().optional(),
    tags: z.array(nonEmpty).default([]),
    sources: z
      .array(z.object({ title: nonEmpty, url: z.string().url() }).strict())
      .default([]),
    faqs: z.array(z.object({ q: nonEmpty, a: nonEmpty }).strict()).optional(), // drives FAQPage schema
    draft: z.boolean().default(false),
  })
  .strict(); // unknown keys fail, so a misspelt field cannot slip through

// Written out by hand, not z.infer, because tsconfig.app.json has strict off,
// which makes every inferred field optional.
export interface BlogFrontmatter {
  title: string;
  slug: string;
  description: string;
  metaDescription: string;
  category: (typeof BLOG_CATEGORIES)[number];
  publishDate: string;
  author?: string;
  readTime: string;
  heroImage?: string;
  heroImageAlt: string;
  featured?: boolean;
  tags: string[];
  sources: { title: string; url: string }[];
  faqs?: { q: string; a: string }[];
  draft: boolean;
}

// What each .md file compiles to (see vite/blog-markdown.ts).
export interface BlogModule {
  frontmatter: BlogFrontmatter;
  body: string;
  heroImageUrl?: string;
}
