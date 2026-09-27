import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import blogMarkdown from "./vite/blog-markdown";
import { imagetools } from "vite-imagetools";
import heroPreload from "./vite/hero-preload";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    blogMarkdown(),
    // Generates WebP and resized variants of everything in src/assets at build
    // time, so a hero image committed by the blog automation gets the same
    // treatment with no manual step and no code change.
    // See src/lib/images.ts and docs/HEALTH-CHECK.md finding 6.
    imagetools({
      // Widen the default include so a plain `import x from "@/assets/y.jpg"`
      // is handled too, not just imports carrying a query.
      include: /\.(jpe?g|png)(\?.*)?$/,
      defaultDirectives: (url) => {
        // Imports that already ask for something (the picture glob in
        // src/lib/images.ts) keep their own directives untouched.
        if ([...url.searchParams.keys()].length > 0) return new URLSearchParams();
        // Everything else is the plain URL used as the <img src> fallback and
        // as the og:image and schema image. Cap it at 1600px and recompress:
        // the source JPEGs were saved near lossless, which is why seven of them
        // were over 1.2 MB each. Format is not forced, so PNG stays PNG.
        return new URLSearchParams({
          w: "1600",
          quality: "80",
          withoutEnlargement: "true",
        });
      },
    }),
    react(),
    heroPreload(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
