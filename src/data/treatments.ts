import { Layers, Scissors, Sparkles, Waves, type LucideIcon } from "lucide-react";

// The four treatments, with the one line and the icon the menu, the homepage
// cards and the footer all draw from. One list, so the menu can never drift
// out of step with the pages it points at again.
//
// The photographs are the real studio and client images already in src/assets,
// not stock and not generated.

export interface Treatment {
  slug: string;
  name: string;
  /** One line. Used in the menu dropdown and on the homepage card. */
  line: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
}

export const treatments: Omit<Treatment, "image" | "imageAlt">[] = [
  {
    slug: "hair-systems",
    name: "Hair Systems",
    line: "Real hair, custom fitted and matched to you",
    icon: Waves,
  },
  {
    slug: "scalp-micropigmentation",
    name: "Scalp Micropigmentation",
    line: "The look of a fresh shave, every day",
    icon: Sparkles,
  },
  {
    slug: "hair-density",
    name: "Hair Density",
    line: "Fuller coverage where hair has thinned",
    icon: Layers,
  },
  {
    slug: "hair-system-maintenance",
    name: "Hair System Maintenance",
    line: "Regrooms every 4 to 6 weeks to keep it undetectable",
    icon: Scissors,
  },
];
