// Vite plugin: compiles src/content/blog/*.md into JS modules at build time.
// Frontmatter is parsed and validated against src/content/schema.ts. Any error
// stops the build, which is how a bad generated post fails its PR check.
import path from "path";
import type { Plugin } from "vite";
import { parse } from "yaml";
import { blogFrontmatterSchema } from "../src/content/schema";

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;

export default function blogMarkdown(): Plugin {
  return {
    name: "mhts-blog-markdown",
    enforce: "pre",
    transform(code, id) {
      const file = id.split("?")[0];
      if (!file.endsWith(".md") || !file.replace(/\\/g, "/").includes("/src/content/blog/")) return null;

      const name = path.basename(file);
      const text = code.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
      const match = FRONTMATTER.exec(text);
      if (!match) this.error(`missing --- frontmatter block ---`);

      let raw: unknown;
      try {
        raw = parse(match[1]); // YAML core schema: dates stay strings
      } catch (e) {
        this.error(`invalid YAML. ${(e as Error).message}`);
      }

      const result = blogFrontmatterSchema.safeParse(raw);
      if (!result.success) {
        const issues = result.error.issues
          .map((i) => `  ${i.path.join(".") || "(root)"}: ${i.message}`)
          .join("\n");
        this.error(`frontmatter failed validation\n${issues}`);
      }
      const fm = result.data;
      if (`${fm.slug}.md` !== name) this.error(`slug "${fm.slug}" must match the filename`);

      const body = match[2];
      if (!body.trim()) this.error(`post body is empty`);

      const lines: string[] = [];
      if (fm.heroImage) lines.push(`import heroImageUrl from ${JSON.stringify(fm.heroImage)};`);
      lines.push(
        `export default { frontmatter: ${JSON.stringify(fm)}, body: ${JSON.stringify(body)}, heroImageUrl: ${
          fm.heroImage ? "heroImageUrl" : "undefined"
        } };`
      );
      return { code: lines.join("\n"), map: null };
    },
  };
}
