// Blog posts are markdown files in src/content/blog/<slug>.md, one per post.
// Each file is validated at build time (see src/content/schema.ts and
// vite/blog-markdown.ts). This module maps them onto the BlogPost shape the
// pages already use, so nothing downstream had to change.
import { BLOG_CATEGORIES, type BlogModule } from "@/content/schema";
import { LEGACY_ORDER } from "@/content/legacy-order";

export interface BlogFAQ {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  metaDescription: string;
  readTime: string;
  date: string;
  author?: string; // no byline when absent
  featuredImageAlt: string;
  image?: string;
  content: string; // markdown-ish
  featured?: boolean;
  faqs?: BlogFAQ[];
  sources?: { title: string; url: string }[];
}

export const categories = ["All Posts", ...BLOG_CATEGORIES];

const modules = import.meta.glob<BlogModule>("/src/content/blog/*.md", {
  eager: true,
  import: "default",
});

// Existing posts keep their original order (see legacy-order.ts). New posts are
// appended after them, oldest first, as they were in the old array.
const rank = (slug: string) => {
  const i = LEGACY_ORDER.indexOf(slug);
  return i === -1 ? LEGACY_ORDER.length : i;
};

export const blogPosts: BlogPost[] = Object.values(modules)
  .filter((m) => !m.frontmatter.draft)
  .map(({ frontmatter: f, body, heroImageUrl }) => ({
    slug: f.slug,
    title: f.title,
    category: f.category,
    excerpt: f.description,
    metaDescription: f.metaDescription,
    readTime: f.readTime,
    date: f.publishDate,
    ...(f.author ? { author: f.author } : {}),
    featuredImageAlt: f.heroImageAlt,
    ...(heroImageUrl ? { image: heroImageUrl } : {}),
    content: body,
    ...(f.featured !== undefined ? { featured: f.featured } : {}),
    ...(f.faqs ? { faqs: f.faqs } : {}),
    ...(f.sources.length ? { sources: f.sources } : {}),
  }))
  .sort((a, b) => rank(a.slug) - rank(b.slug) || a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug));
