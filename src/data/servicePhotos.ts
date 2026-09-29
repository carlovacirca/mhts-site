// The photographs on the 18 pages that describe a service.
//
// Carlo's rule (batch 4b fixes): at most two photographs on a service page,
// exactly these two slots:
//
//   service  one realistic photograph that matches the service
//   studio   one photograph of the studio
//
// Where they go (src/components/mhts/ServicePage.tsx):
//   - the 4 treatment (pillar) pages: `service` in the hero, `studio` beside
//     "Who it's for"
//   - the 14 sub-service pages: `service` beside "What is it", `studio` beside
//     "Who it's for". No framed photograph in their hero any more.
//
// Every file is already in src/assets. The `service` slot holds the best image
// that exists today, repeated where it has to be; new photographs replace them
// in a follow-up and only this file needs to change. The three studio
// photographs rotate so that neighbouring pages (in menu order) differ.

import baseMaterials from "@/assets/mhts-hair-system-base-materials-hero.jpg";
import hairline from "@/assets/mhts-hair-system-hairline-hero.jpg";
import maintenanceWork from "@/assets/mhts-hair-system-maintenance-hero.jpg";
import clientTwo from "@/assets/mhts-before-after-composite-2.jpg";
import smpHealed from "@/assets/mhts-smp-healed-result-hero.jpg";
import smpHealedBack from "@/assets/mhts-smp-healed-result-back-hero.jpg";
import smpProcedure from "@/assets/blog-smp-procedure.jpg";
import smpHairline from "@/assets/smp-hero.jpg";
import densityCompare from "@/assets/blog-hair-density-comparison.jpg";
import densityCrown from "@/assets/blog-hair-density-treatment-hero.jpg";
import bondCompare from "@/assets/blog-hair-system-bond-comparison.jpg";
import studioWide from "@/assets/mhts-studio-wide-hero.jpg";
import consultationRoom from "@/assets/mhts-consultation-room-hero.jpg";
import studioChair from "@/assets/blog-hair-system-maintenance-studio.jpg";

export interface Photo {
  src: string;
  alt: string;
  /** Two photographs side by side. Never cropped to a portrait frame. */
  wide?: boolean;
}

/** The realistic photographs that can fill a `service` slot. */
const SERVICE = {
  baseMaterials: { src: baseMaterials, alt: "Hair system bases in lace and skin with hair samples on the studio bench" },
  hairline: { src: hairline, alt: "Close-up of a natural-looking hairline on a fitted hair system" },
  maintenanceWork: { src: maintenanceWork, alt: "A hair system base being cleaned by hand at the studio" },
  clientTwo: { src: clientTwo, alt: "A Men's Hair To Stay client's crown before and after treatment", wide: true },
  smpHealed: { src: smpHealed, alt: "A healed scalp micropigmentation result, seen from above" },
  smpHealedBack: { src: smpHealedBack, alt: "A healed scalp micropigmentation result, seen from behind" },
  smpProcedure: { src: smpProcedure, alt: "Scalp micropigmentation being applied to the scalp" },
  smpHairline: { src: smpHairline, alt: "A crisp scalp micropigmentation hairline" },
  densityCompare: { src: densityCompare, alt: "Thinning hair next to the same area after a density treatment", wide: true },
  densityCrown: { src: densityCrown, alt: "Thinning hair at the crown, seen from above" },
  bondCompare: { src: bondCompare, alt: "A hair system bond breaking down next to one freshly maintained", wide: true },
} satisfies Record<string, Photo>;

/** The three studio photographs, in the order they rotate. */
export const STUDIO: Photo[] = [
  { src: studioWide, alt: "The Men's Hair To Stay studio in Amersham" },
  { src: consultationRoom, alt: "The private consultation room at the Amersham studio" },
  { src: studioChair, alt: "The treatment chair at the Amersham studio" },
];

export interface ServicePhotos {
  service: Photo;
  studio: Photo;
}

/** Pages in menu order, each with its `service` photograph. The studio slot is filled by rotation below. */
const PAGES: [path: string, service: Photo][] = [
  ["/hair-systems", SERVICE.hairline],
  ["/hair-systems/non-surgical-hair-replacement", SERVICE.hairline],
  ["/hair-systems/hair-replacement-service", SERVICE.baseMaterials],
  ["/hair-systems/initial-consultation-and-fitting", SERVICE.baseMaterials],
  ["/hair-systems/hair-system-colouring", SERVICE.hairline],
  ["/hair-systems/hair-system-styling", SERVICE.hairline],
  ["/scalp-micropigmentation", SERVICE.smpHealed],
  ["/scalp-micropigmentation/full-smp-treatment", SERVICE.smpProcedure],
  ["/scalp-micropigmentation/smp-touch-up-session", SERVICE.smpHairline],
  ["/scalp-micropigmentation/smp-consultation", SERVICE.smpHealedBack],
  ["/hair-density", SERVICE.densityCrown],
  ["/hair-density/density-treatment-consultation", SERVICE.densityCompare],
  ["/hair-density/thinning-hair-treatment", SERVICE.densityCrown],
  ["/hair-density/crown-coverage-treatment", SERVICE.clientTwo],
  ["/hair-system-maintenance", SERVICE.maintenanceWork],
  ["/hair-system-maintenance/hair-system-reattachment-and-restyling", SERVICE.bondCompare],
  ["/hair-system-maintenance/hair-system-base-clean-and-reattach", SERVICE.maintenanceWork],
  ["/hair-system-maintenance/hair-system-full-maintenance-package", SERVICE.maintenanceWork],
];

/** Keyed by the page's path. Exactly two slots each. */
export const servicePhotos: Record<string, ServicePhotos> = Object.fromEntries(
  PAGES.map(([path, service], i) => [path, { service, studio: STUDIO[i % STUDIO.length] }])
);

/** The pages in the order the rotation runs: each treatment, then its sub-services. */
export const SERVICE_PAGE_ORDER = PAGES.map(([path]) => path);

/** The `service` photograph for a treatment page, used where a treatment is shown as a card elsewhere. */
export const cardPhotoFor = (path: string): Photo | undefined => servicePhotos[path]?.service;
