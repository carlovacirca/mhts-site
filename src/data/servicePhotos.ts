// Which photograph sits beside which block of text on the 18 treatment pages.
//
// Every image here is already in src/assets: the studio's own photographs, the
// consented client before and afters, and the illustrations already used on
// the blog. Nothing new was generated for batch 4b. Images of AI faces are
// deliberately not used on a treatment page. Where a page would be better with
// a photograph that does not exist yet, it is listed in docs/reports/batch-4b.md.

import baseMaterials from "@/assets/mhts-hair-system-base-materials-hero.jpg";
import hairline from "@/assets/mhts-hair-system-hairline-hero.jpg";
import maintenanceWork from "@/assets/mhts-hair-system-maintenance-hero.jpg";
import crownBeforeAfter from "@/assets/mhts-hair-system-before-after-inline.jpg";
import consultationRoom from "@/assets/mhts-consultation-room-hero.jpg";
import studioWide from "@/assets/mhts-studio-wide-hero.jpg";
import studioChair from "@/assets/blog-hair-system-maintenance-studio.jpg";
import clientOne from "@/assets/mhts-before-after-composite-1.jpg";
import clientTwo from "@/assets/mhts-before-after-composite-2.jpg";
import clientThree from "@/assets/mhts-before-after-composite-3.jpg";
import smpHealed from "@/assets/mhts-smp-healed-result-hero.jpg";
import smpHealedBack from "@/assets/mhts-smp-healed-result-back-hero.jpg";
import smpProcedure from "@/assets/blog-smp-procedure.jpg";
import smpHairline from "@/assets/smp-hero.jpg";
import densityCompare from "@/assets/blog-hair-density-comparison.jpg";
import densityCrown from "@/assets/blog-hair-density-treatment-hero.jpg";
import bondCompare from "@/assets/blog-hair-system-bond-comparison.jpg";

export interface Photo {
  src: string;
  alt: string;
  /** Two photographs side by side. Never cropped to a portrait frame. */
  wide?: boolean;
}

const P = {
  baseMaterials: { src: baseMaterials, alt: "Hair system bases in lace and skin with hair samples on the studio bench" },
  hairline: { src: hairline, alt: "Close-up of a natural-looking hairline on a fitted hair system" },
  maintenanceWork: { src: maintenanceWork, alt: "A hair system base being cleaned by hand at the studio" },
  crownBeforeAfter: { src: crownBeforeAfter, alt: "A thinning crown before and the same crown after a hair system", wide: true },
  consultationRoom: { src: consultationRoom, alt: "The private consultation room at the Amersham studio" },
  studioWide: { src: studioWide, alt: "The Men's Hair To Stay studio in Amersham" },
  studioChair: { src: studioChair, alt: "The treatment chair at the studio" },
  clientOne: { src: clientOne, alt: "A Men's Hair To Stay client before and after a hair system fitting", wide: true },
  clientTwo: { src: clientTwo, alt: "A Men's Hair To Stay client's crown before and after treatment", wide: true },
  clientThree: { src: clientThree, alt: "A Men's Hair To Stay client before and after a hair system fitting", wide: true },
  smpHealed: { src: smpHealed, alt: "A healed scalp micropigmentation result, seen from above" },
  smpHealedBack: { src: smpHealedBack, alt: "A healed scalp micropigmentation result, seen from behind" },
  smpProcedure: { src: smpProcedure, alt: "Scalp micropigmentation being applied to the scalp" },
  smpHairline: { src: smpHairline, alt: "A crisp scalp micropigmentation hairline" },
  densityCompare: { src: densityCompare, alt: "Thinning hair next to the same area after a density treatment", wide: true },
  densityCrown: { src: densityCrown, alt: "Thinning hair at the crown, seen from above" },
  bondCompare: { src: bondCompare, alt: "A hair system bond breaking down next to one freshly maintained", wide: true },
} satisfies Record<string, Photo>;

export interface ServicePhotos {
  /** Beside "What is it". */
  about: Photo;
  /** Beside "Who it's for". */
  who: Photo;
  /** Sub-service pages only: the framed photograph in the hero, from md up. */
  hero?: Photo;
}

/** Keyed by the page's path. */
export const servicePhotos: Record<string, ServicePhotos> = {
  "/hair-systems": { about: P.baseMaterials, who: P.crownBeforeAfter },
  "/hair-systems/non-surgical-hair-replacement": { about: P.hairline, who: P.clientOne, hero: P.studioWide },
  "/hair-systems/hair-replacement-service": { about: P.consultationRoom, who: P.baseMaterials, hero: P.studioWide },
  "/hair-systems/initial-consultation-and-fitting": { about: P.consultationRoom, who: P.studioWide, hero: P.baseMaterials },
  "/hair-systems/hair-system-colouring": { about: P.hairline, who: P.baseMaterials, hero: P.studioWide },
  "/hair-systems/hair-system-styling": { about: P.hairline, who: P.clientThree, hero: P.studioChair },
  "/scalp-micropigmentation": { about: P.smpHealed, who: P.smpProcedure },
  "/scalp-micropigmentation/full-smp-treatment": { about: P.smpProcedure, who: P.smpHealedBack, hero: P.smpHairline },
  "/scalp-micropigmentation/smp-touch-up-session": { about: P.smpHealedBack, who: P.smpHairline, hero: P.smpProcedure },
  "/scalp-micropigmentation/smp-consultation": { about: P.consultationRoom, who: P.smpHealed, hero: P.smpHairline },
  "/hair-density": { about: P.densityCompare, who: P.densityCrown },
  "/hair-density/density-treatment-consultation": { about: P.consultationRoom, who: P.densityCompare, hero: P.densityCrown },
  "/hair-density/thinning-hair-treatment": { about: P.densityCrown, who: P.densityCompare, hero: P.consultationRoom },
  "/hair-density/crown-coverage-treatment": { about: P.clientTwo, who: P.densityCrown, hero: P.studioChair },
  "/hair-system-maintenance": { about: P.maintenanceWork, who: P.bondCompare },
  "/hair-system-maintenance/hair-system-reattachment-and-restyling": { about: P.bondCompare, who: P.maintenanceWork, hero: P.studioChair },
  "/hair-system-maintenance/hair-system-base-clean-and-reattach": { about: P.maintenanceWork, who: P.bondCompare, hero: P.studioChair },
  "/hair-system-maintenance/hair-system-full-maintenance-package": { about: P.maintenanceWork, who: P.studioChair, hero: P.hairline },
};

/** The card photo for a treatment page, used by the related cards. */
export const cardPhotoFor = (path: string): Photo | undefined => servicePhotos[path]?.about;
