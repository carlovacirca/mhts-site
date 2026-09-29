// Batch 4b: the section scroll switch, its reduced-motion off state, the
// links every redesigned page must keep, and the rule that a pulled-out key
// fact on a treatment page is quoted word for word from the text beside it.
import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import {
  SECTION_SNAP,
  SNAP_HERO_CLASS,
  SNAP_PAGE_CLASS,
  SNAP_SECTION_CLASS,
  snapPageClass,
} from "@/lib/sectionSnap";
import MHTSLanding from "@/pages/mhts/MHTSLanding";
import ServicesPage from "@/pages/ServicesPage";
import AreaPage from "@/pages/AreaPage";
import AreasServicedPage from "@/pages/AreasServicedPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import GalleryPage from "@/pages/GalleryPage";
import ContactPage from "@/pages/ContactPage";
import BookPage from "@/pages/BookPage";
import FAQPage from "@/pages/FAQPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import NotFound from "@/pages/NotFound";
import { serviceCategories } from "@/data/services";
import { servicePhotos } from "@/data/servicePhotos";
import { blogPosts } from "@/data/blogPosts";
import { latestPosts } from "@/lib/publishing";
import HairSystemsPage from "@/pages/services/HairSystemsPage";
import ScalpMicropigmentationPage from "@/pages/services/ScalpMicropigmentationPage";
import HairDensityPage from "@/pages/services/HairDensityPage";
import HairSystemMaintenancePage from "@/pages/services/HairSystemMaintenancePage";
import NonSurgicalHairReplacementPage from "@/pages/services/NonSurgicalHairReplacementPage";
import HairReplacementServicePage from "@/pages/services/HairReplacementServicePage";
import InitialConsultationFittingPage from "@/pages/services/InitialConsultationFittingPage";
import HairSystemColouringPage from "@/pages/services/HairSystemColouringPage";
import HairSystemStylingPage from "@/pages/services/HairSystemStylingPage";
import FullSMPTreatmentPage from "@/pages/services/FullSMPTreatmentPage";
import SMPTouchUpPage from "@/pages/services/SMPTouchUpPage";
import SMPConsultationPage from "@/pages/services/SMPConsultationPage";
import DensityTreatmentConsultationPage from "@/pages/services/DensityTreatmentConsultationPage";
import ThinningHairTreatmentPage from "@/pages/services/ThinningHairTreatmentPage";
import CrownCoverageTreatmentPage from "@/pages/services/CrownCoverageTreatmentPage";
import HairSystemReattachmentPage from "@/pages/services/HairSystemReattachmentPage";
import HairSystemBaseCleanPage from "@/pages/services/HairSystemBaseCleanPage";
import HairSystemFullMaintenancePage from "@/pages/services/HairSystemFullMaintenancePage";

const renderAt = (ui: React.ReactElement, path = "/") =>
  render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>);

const hrefs = (root: ParentNode) =>
  new Set(Array.from(root.querySelectorAll("a[href]")).map((a) => a.getAttribute("href")!));

const css = readFileSync(join(__dirname, "..", "index.css"), "utf8");

/** Every CSS block that declares `prop`, with the @media condition it sits in (or none). */
const declarationsWithMedia = (prop: string) => {
  const found: { media: string | null; at: number }[] = [];
  const re = new RegExp(`${prop}\\s*:`, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(css))) {
    // Walk back through the braces to find the enclosing @media, if any.
    let depth = 0;
    let media: string | null = null;
    for (let i = m.index; i >= 0; i--) {
      const ch = css[i];
      if (ch === "}") depth++;
      if (ch === "{") {
        if (depth === 0) {
          const head = css.slice(css.lastIndexOf("\n", i - 1) + 1, i).trim();
          if (head.startsWith("@media")) {
            media = head;
            break;
          }
        } else depth--;
      }
    }
    found.push({ media, at: m.index });
  }
  return found;
};

describe("section scroll switch", () => {
  beforeEach(() => window.localStorage.clear());

  it("is one constant, on by default in this branch", () => {
    expect(SECTION_SNAP).toBe(true);
  });

  it("maps the switch to the homepage class, and to nothing when off", () => {
    expect(snapPageClass(true)).toBe(SNAP_PAGE_CLASS);
    expect(snapPageClass(false)).toBe("");
  });

  it("puts the homepage in snap mode, with every section a snap section", () => {
    const { container } = renderAt(<MHTSLanding />);
    const page = container.querySelector(".mhts-theme")!;
    expect(page.classList.contains(SNAP_PAGE_CLASS)).toBe(true);
    const sections = Array.from(page.children).filter((el) => el.tagName === "SECTION");
    expect(sections.length).toBeGreaterThanOrEqual(9);
    for (const s of sections) expect(s.classList.contains(SNAP_SECTION_CLASS)).toBe(true);
    expect(sections[0].classList.contains(SNAP_HERO_CLASS)).toBe(true);
  });

  it("is homepage only: no other page carries the snap class", () => {
    for (const ui of [<ServicesPage />, <HairSystemsPage />, <FAQPage />, <ContactPage />, <BookPage />]) {
      const { container, unmount } = renderAt(ui);
      expect(container.querySelector(`.${SNAP_PAGE_CLASS}`)).toBeNull();
      unmount();
    }
  });

  it("uses CSS scroll snap on the page scroller and 100svh, never 100vh", () => {
    expect(css).toMatch(/html:has\(\.mhts-snap-page\)\s*\{[^}]*scroll-snap-type:\s*y mandatory/);
    expect(css).toMatch(/\.mhts-snap-section\s*\{[^}]*scroll-snap-align:\s*start/);
    expect(css).toMatch(/\.mhts-snap-section\s*\{[^}]*min-height:\s*var\(--snap-screen\)/);
    expect(css).toMatch(/--snap-screen:\s*calc\(100svh - var\(--snap-header\) - var\(--snap-bottom\)\)/);
    expect(css).toMatch(/scroll-padding-top:\s*var\(--snap-header\)/);
    expect(css).toMatch(/scroll-padding-bottom:\s*calc\(var\(--snap-bottom\) \+ var\(--mhts-cookie-h\)\)/);
    const snapBlock = css.slice(css.indexOf("Section scroll (batch 4b"));
    expect(snapBlock).not.toMatch(/100vh/);
  });
});

describe("section scroll, reduced motion", () => {
  const SNAP_MEDIA = [
    "@media (prefers-reduced-motion: no-preference)",
    "@media (max-width: 767.98px) and (prefers-reduced-motion: no-preference)",
  ];
  it("is off completely: every snap rule and the full-screen sizing sit behind no-preference", () => {
    for (const prop of ["scroll-snap-type", "scroll-snap-align", "scroll-padding-top", "scroll-padding-bottom"]) {
      const decls = declarationsWithMedia(prop);
      expect(decls.length, prop).toBeGreaterThan(0);
      for (const d of decls) expect(SNAP_MEDIA, prop).toContain(d.media);
    }
    // The min-height that makes a section one screen tall is behind it too.
    const screen = declarationsWithMedia("min-height").filter((d) => /svh|snap-screen|snap-first-screen/.test(css.slice(d.at, d.at + 60)));
    expect(screen.length).toBeGreaterThan(0);
    for (const d of screen) expect(SNAP_MEDIA).toContain(d.media);
  });
});

describe("links kept", () => {
  beforeEach(() => window.localStorage.clear());

  it("the homepage keeps every internal link it had in batch 4a", () => {
    const { container } = renderAt(<MHTSLanding />);
    const links = hrefs(container);
    const batch4a = [
      "#mhts-book",
      "#mhts-reviews",
      "/areas-serviced",
      "/blog",
      "/faq",
      "/gallery",
      "/hair-density",
      "/hair-system-maintenance",
      "/hair-systems",
      "/scalp-micropigmentation",
      ...latestPosts(blogPosts, 3).map((p) => `/blog/${p.slug}`),
    ];
    for (const href of batch4a) expect(links, href).toContain(href);
    // The anchors other pages link to still exist.
    for (const id of ["mhts-gallery", "mhts-reviews", "mhts-services", "mhts-book", "mhts-contact", "mhts-areas", "mhts-hero-end"]) {
      expect(container.querySelector(`#${id}`), id).not.toBeNull();
    }
  });

  const SERVICE_PAGES: [string, React.ReactElement][] = [
    ["/hair-systems", <HairSystemsPage />],
    ["/scalp-micropigmentation", <ScalpMicropigmentationPage />],
    ["/hair-density", <HairDensityPage />],
    ["/hair-system-maintenance", <HairSystemMaintenancePage />],
    ["/hair-systems/non-surgical-hair-replacement", <NonSurgicalHairReplacementPage />],
    ["/hair-systems/hair-replacement-service", <HairReplacementServicePage />],
    ["/hair-systems/initial-consultation-and-fitting", <InitialConsultationFittingPage />],
    ["/hair-systems/hair-system-colouring", <HairSystemColouringPage />],
    ["/hair-systems/hair-system-styling", <HairSystemStylingPage />],
    ["/scalp-micropigmentation/full-smp-treatment", <FullSMPTreatmentPage />],
    ["/scalp-micropigmentation/smp-touch-up-session", <SMPTouchUpPage />],
    ["/scalp-micropigmentation/smp-consultation", <SMPConsultationPage />],
    ["/hair-density/density-treatment-consultation", <DensityTreatmentConsultationPage />],
    ["/hair-density/thinning-hair-treatment", <ThinningHairTreatmentPage />],
    ["/hair-density/crown-coverage-treatment", <CrownCoverageTreatmentPage />],
    ["/hair-system-maintenance/hair-system-reattachment-and-restyling", <HairSystemReattachmentPage />],
    ["/hair-system-maintenance/hair-system-base-clean-and-reattach", <HairSystemBaseCleanPage />],
    ["/hair-system-maintenance/hair-system-full-maintenance-package", <HairSystemFullMaintenancePage />],
  ];

  it.each(SERVICE_PAGES)("%s links its siblings, its category, the other treatments, Book and Call", (path, ui) => {
    const { container } = renderAt(ui, path);
    const links = hrefs(container);
    const [, cat, sub] = path.split("/");
    const category = serviceCategories.find((c) => c.slug === cat)!;
    for (const s of category.subServices) {
      if (s.slug !== sub) expect(links, s.slug).toContain(`/${cat}/${s.slug}`);
    }
    if (sub) expect(links).toContain(`/${cat}`);
    for (const c of serviceCategories) if (c.slug !== cat) expect(links, c.slug).toContain(`/${c.slug}`);
    expect(links).toContain("/#mhts-book");
    expect(links).toContain("tel:+447947878087");
    // Its own photographs are mapped.
    expect(servicePhotos[path]).toBeDefined();
  });

  it.each(SERVICE_PAGES)("%s quotes each key fact word for word from the text beside it", (path, ui) => {
    const { container } = renderAt(ui, path);
    const norm = (t: string | null) => (t ?? "").replace(/\s+/g, " ").trim();
    for (const id of ["about", "who"]) {
      const section = container.querySelector(`#${id}`)!;
      const fact = norm(section.querySelector("figcaption")!.textContent);
      const clone = section.cloneNode(true) as HTMLElement;
      clone.querySelector("figcaption")!.remove();
      expect(fact.length).toBeGreaterThan(10);
      expect(norm(clone.textContent), `${path} #${id}`).toContain(fact);
    }
  });

  it("the services overview links all four treatments and all their sub-services", () => {
    const { container } = renderAt(<ServicesPage />, "/services");
    const links = hrefs(container);
    for (const c of serviceCategories) {
      expect(links).toContain(`/${c.slug}`);
      for (const s of c.subServices) expect(links).toContain(`/${c.slug}/${s.slug}`);
    }
  });

  it("areas serviced links every town page, and a town page links back to all four treatments", () => {
    const { container } = renderAt(<AreasServicedPage />, "/areas-serviced");
    expect(container.querySelectorAll('a[href^="/areas/"]').length).toBe(12);
    const area = render(
      <MemoryRouter initialEntries={["/areas/chesham"]}>
        <Routes>
          <Route path="/areas/:slug" element={<AreaPage />} />
        </Routes>
      </MemoryRouter>
    );
    const links = hrefs(area.container);
    for (const c of serviceCategories) expect(links).toContain(`/${c.slug}`);
    expect(links).toContain("/book");
    expect(links).toContain("tel:+447947878087");
  });

  it("how it works, gallery, contact, book, privacy and the 404 keep their links", () => {
    const cases: [React.ReactElement, string[]][] = [
      [<HowItWorksPage />, ["/#mhts-services", "/#mhts-gallery", "/#mhts-book", "/faq", "/scalp-micropigmentation/full-smp-treatment", "/hair-density/crown-coverage-treatment"]],
      [<GalleryPage />, ["/how-it-works", "/services", "/book", "/faq"]],
      [<ContactPage />, ["/book", "/services", "/how-it-works", "/gallery", "/faq"]],
      [<BookPage />, ["/how-it-works", "/services", "/gallery", "/faq"]],
      [<PrivacyPolicyPage />, ["/book", "#who-we-are", "#your-rights"]],
      [<NotFound />, ["/services", "/hair-systems", "/scalp-micropigmentation", "/hair-density", "/hair-system-maintenance", "/blog", "/book"]],
    ];
    for (const [ui, expected] of cases) {
      const { container, unmount } = renderAt(ui);
      const links = hrefs(container);
      for (const href of expected) expect(links, href).toContain(href);
      unmount();
    }
  });
});
