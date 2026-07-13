export interface SubService {
  slug: string;
  name: string;
  blurb: string;
}

export interface ServiceCategory {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  subServices: SubService[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "hair-systems",
    name: "Hair Systems",
    tagline: "Premium non-surgical hair replacement",
    intro:
      "Custom-fitted hair systems matched perfectly to your hair colour, texture and style. Undetectable, natural-looking results designed for everyday confidence.",
    subServices: [
      {
        slug: "non-surgical-hair-replacement",
        name: "Non-Surgical Hair Replacement",
        blurb: "A complete hair replacement solution without surgery, downtime, or commitment.",
      },
      {
        slug: "hair-replacement-service",
        name: "Hair Replacement Service",
        blurb: "Our full hair replacement service from consultation through to fitting and aftercare.",
      },
      {
        slug: "initial-consultation-and-fitting",
        name: "Initial Consultation & Fitting",
        blurb: "A confidential consultation, precise measurements, colour matching and your first fit.",
      },
      {
        slug: "hair-system-colouring",
        name: "Hair System Colouring",
        blurb: "Expert colouring and toning to keep your system blended with your natural hair.",
      },
      {
        slug: "hair-system-styling",
        name: "Hair System Styling",
        blurb: "Cutting and styling tailored to your face shape and personal preference.",
      },
    ],
  },
  {
    slug: "scalp-micropigmentation",
    name: "Scalp Micropigmentation",
    tagline: "Replicate natural hair follicles",
    intro:
      "Advanced pigmentation that recreates the look of natural hair follicles for a fuller, defined finish. Suitable for shaved styles, density, and scar concealment.",
    subServices: [
      {
        slug: "full-smp-treatment",
        name: "Full SMP Treatment",
        blurb: "A complete multi-session SMP programme for full coverage and natural-looking density.",
      },
      {
        slug: "smp-touch-up-session",
        name: "SMP Touch-Up Session",
        blurb: "Refresh existing SMP work to maintain depth, tone and crisp definition.",
      },
      {
        slug: "smp-consultation",
        name: "SMP Consultation",
        blurb: "A no-obligation conversation about your goals, suitability and treatment plan.",
      },
    ],
  },
  {
    slug: "hair-density",
    name: "Hair Density",
    tagline: "Add fullness where you need it",
    intro:
      "Targeted treatments for thinning hair, helping you regain the appearance of fuller, denser coverage without surgery.",
    subServices: [
      {
        slug: "density-treatment-consultation",
        name: "Density Treatment Consultation",
        blurb: "Assessment of thinning areas and a tailored plan to restore visual density.",
      },
      {
        slug: "thinning-hair-treatment",
        name: "Thinning Hair Treatment",
        blurb: "Discreet solutions designed to add fullness throughout thinning regions.",
      },
      {
        slug: "crown-coverage-treatment",
        name: "Crown Coverage Treatment",
        blurb: "Focused treatments specifically for the crown and vertex area.",
      },
    ],
  },
  {
    slug: "hair-system-maintenance",
    name: "Hair System Maintenance",
    tagline: "Keep your system looking its best",
    intro:
      "Regular maintenance, cleaning and re-fitting appointments to keep your hair system fresh, secure and natural-looking long-term.",
    subServices: [
      {
        slug: "hair-system-reattachment-and-restyling",
        name: "Hair System Reattachment & Restyling",
        blurb: "Reattach your existing system with a clean foundation and refresh the cut and style.",
      },
      {
        slug: "hair-system-base-clean-and-reattach",
        name: "Hair System Base Clean & Reattach",
        blurb: "Thorough base cleaning, adhesive removal and a secure reattachment.",
      },
      {
        slug: "hair-system-full-maintenance-package",
        name: "Hair System Full Maintenance Package",
        blurb: "The complete service: clean, reattach, colour refresh, cut and style.",
      },
    ],
  },
];

export const findCategory = (slug: string) =>
  serviceCategories.find((c) => c.slug === slug);
