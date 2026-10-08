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
// Each page's `service` photograph is its own; no image file is on two service
// pages (a test holds this). The three studio photographs rotate so that
// neighbouring pages (in menu order) differ.

import svcHairSystems from "@/assets/mhts-svc-hair-systems.jpg";
import svcNonSurgical from "@/assets/mhts-svc-non-surgical-hair-replacement.jpg";
import svcReplacementService from "@/assets/mhts-svc-hair-replacement-service.jpg";
import svcConsultationFitting from "@/assets/mhts-svc-initial-consultation-and-fitting.jpg";
import svcColouring from "@/assets/mhts-svc-hair-system-colouring.jpg";
import svcStyling from "@/assets/mhts-svc-hair-system-styling.jpg";
import smpHero from "@/assets/smp-hero.jpg";
import svcFullSmp from "@/assets/mhts-svc-full-smp-treatment.jpg";
import svcSmpTouchUp from "@/assets/mhts-svc-smp-touch-up-session.jpg";
import svcSmpConsultation from "@/assets/mhts-svc-smp-consultation.jpg";
import hairDensityHero from "@/assets/hair-density-hero.jpg";
import svcDensityConsultation from "@/assets/mhts-svc-density-treatment-consultation.jpg";
import svcThinning from "@/assets/mhts-svc-thinning-hair-treatment.jpg";
import svcCrown from "@/assets/mhts-svc-crown-coverage-treatment.jpg";
import svcMaintenance from "@/assets/mhts-svc-hair-system-maintenance.jpg";
import svcReattachment from "@/assets/mhts-svc-reattachment-and-restyling.jpg";
import svcBaseClean from "@/assets/mhts-svc-base-clean-and-reattach.jpg";
import svcFullMaintenance from "@/assets/mhts-svc-full-maintenance-package.jpg";
import studioWide from "@/assets/mhts-studio-wide-hero.jpg";
import consultationRoom from "@/assets/mhts-consultation-room-hero.jpg";
import studioChair from "@/assets/blog-hair-system-maintenance-studio.jpg";

export interface Photo {
  src: string;
  alt: string;
  /** Two photographs side by side. Never cropped to a portrait frame. */
  wide?: boolean;
}

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

/**
 * Pages in menu order, each with its own `service` photograph (the batch 4b
 * fixes follow-up: one approved photograph per page, none repeated). The two
 * treatment pages that already had a fitting photograph keep it: SMP keeps
 * smp-hero.jpg and Hair Density keeps hair-density-hero.jpg. The studio slot
 * is filled by rotation below.
 */
const PAGES: [path: string, service: Photo][] = [
  ["/hair-systems", { src: svcHairSystems, alt: "A barber combing and trimming a client's fitted hair system at the back of the head" }],
  ["/hair-systems/non-surgical-hair-replacement", { src: svcNonSurgical, alt: "A full head of hair after non-surgical hair replacement, seen from above" }],
  ["/hair-systems/hair-replacement-service", { src: svcReplacementService, alt: "A hair system on a styling head being cut to shape with scissors" }],
  ["/hair-systems/initial-consultation-and-fitting", { src: svcConsultationFitting, alt: "Hair colour swatch rings and a hand mirror on the table at a consultation" }],
  ["/hair-systems/hair-system-colouring", { src: svcColouring, alt: "A ring of hair colour swatches held against the back of a client's head to match his shade" }],
  ["/hair-systems/hair-system-styling", { src: svcStyling, alt: "A stylist shaping the top of a client's hair system with his fingers" }],
  ["/scalp-micropigmentation", { src: smpHero, alt: "A crisp scalp micropigmentation hairline" }],
  ["/scalp-micropigmentation/full-smp-treatment", { src: svcFullSmp, alt: "A gloved hand applying scalp micropigmentation to a shaved scalp" }],
  ["/scalp-micropigmentation/smp-touch-up-session", { src: svcSmpTouchUp, alt: "A pigment shade card held beside a shaved head with scalp micropigmentation, seen from behind" }],
  ["/scalp-micropigmentation/smp-consultation", { src: svcSmpConsultation, alt: "Pigment samples and three pencil-drawn hairline designs laid out for an SMP consultation" }],
  ["/hair-density", { src: hairDensityHero, alt: "Fuller hair at the back of the head after a hair density treatment" }],
  ["/hair-density/density-treatment-consultation", { src: svcDensityConsultation, alt: "A handheld scalp camera showing magnified hair follicles on a screen during a density consultation" }],
  ["/hair-density/thinning-hair-treatment", { src: svcThinning, alt: "Thinning hair along a centre parting, seen from above" }],
  ["/hair-density/crown-coverage-treatment", { src: svcCrown, alt: "A client's crown seen from above as the hair is parted to check coverage" }],
  ["/hair-system-maintenance", { src: svcMaintenance, alt: "A hair system on a styling head beside adhesive, tape and a brush on the studio bench" }],
  ["/hair-system-maintenance/hair-system-reattachment-and-restyling", { src: svcReattachment, alt: "A hair system being pressed into place on a styling head during reattachment" }],
  ["/hair-system-maintenance/hair-system-base-clean-and-reattach", { src: svcBaseClean, alt: "A hair system base being cleaned with a brush over a basin" }],
  ["/hair-system-maintenance/hair-system-full-maintenance-package", { src: svcFullMaintenance, alt: "Combs, a brush, scissors, tape and care products laid out for a full maintenance appointment" }],
];

/** Keyed by the page's path. Exactly two slots each. */
export const servicePhotos: Record<string, ServicePhotos> = Object.fromEntries(
  PAGES.map(([path, service], i) => [path, { service, studio: STUDIO[i % STUDIO.length] }])
);

/** The pages in the order the rotation runs: each treatment, then its sub-services. */
export const SERVICE_PAGE_ORDER = PAGES.map(([path]) => path);

/** The `service` photograph for a treatment page, used where a treatment is shown as a card elsewhere. */
export const cardPhotoFor = (path: string): Photo | undefined => servicePhotos[path]?.service;
