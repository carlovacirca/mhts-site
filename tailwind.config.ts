import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', '"DM Sans Fallback"', 'Arial', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gb: {
          black: "hsl(var(--gb-black))",
          green: "hsl(var(--gb-green))",
          "green-light": "hsl(var(--gb-green-light))",
          gold: "hsl(var(--gb-gold))",
          "gold-light": "hsl(var(--gb-gold-light))",
          cream: "hsl(var(--gb-cream))",
        },
        mhts: {
          // The batch 4a brand. See the token block in src/index.css for what
          // each one is for and the contrast ratio that decides it.
          red: "hsl(var(--mhts-red))",
          "red-deep": "hsl(var(--mhts-red-deep))",
          "red-light": "hsl(var(--mhts-red-light))",
          "red-tint": "hsl(var(--mhts-red-tint))",
          ink: "hsl(var(--mhts-ink))",
          sand: "hsl(var(--mhts-sand))",
          stone: "hsl(var(--mhts-stone))",
          "stone-deep": "hsl(var(--mhts-stone-deep))",
          deep: "hsl(var(--mhts-deep))",
          // Kept so the pages not yet redesigned keep rendering unchanged.
          charcoal: "hsl(var(--mhts-charcoal))",
          navy: "hsl(var(--mhts-navy))",
          slate: "hsl(var(--mhts-slate))",
          white: "hsl(var(--mhts-white))",
          light: "hsl(var(--mhts-light))",
        },
        whatsapp: "hsl(var(--whatsapp))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "menu-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "bar-in": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "menu-in": "menu-in 250ms ease-out",
        "bar-in": "bar-in 250ms ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
