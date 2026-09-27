import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import blogMarkdown from "./vite/blog-markdown";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [blogMarkdown(), imagetools({ include: /\.(jpe?g|png)(\?.*)?$/ }), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
