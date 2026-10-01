// Batch 4b fixes, second review (PR #8, checked on an iPhone and an Android
// phone): the homepage treatment cards show real studio photographs only, the
// hours read the same everywhere from one source, and every swipeable strip
// lines its first card up with the page's gutter. The bottom bar and the
// footer need real layout and are checked in Chromium (stickyBar.test.ts).
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MHTSLanding from "@/pages/mhts/MHTSLanding";
import ContactPage from "@/pages/ContactPage";
import BookPage from "@/pages/BookPage";
import Footer from "@/components/Footer";
import { treatments } from "@/data/treatments";
import { getPicture } from "@/lib/images";
import studioWide from "@/assets/mhts-studio-wide-hero.jpg";
import consultationRoom from "@/assets/mhts-consultation-room-hero.jpg";
import studioChair from "@/assets/blog-hair-system-maintenance-studio.jpg";
import studioBench from "@/assets/mhts-studio-bench-crop.jpg";
import before1 from "@/assets/mhts-before-1.jpg";
import after1 from "@/assets/mhts-after-1.jpg";
import before2 from "@/assets/mhts-before-2.jpg";
import after2 from "@/assets/mhts-after-2.jpg";
import before3 from "@/assets/mhts-before-3.jpg";
import after3 from "@/assets/mhts-after-3.jpg";

const renderAt = (ui: React.ReactElement, path = "/") =>
  render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>);

const src = (root: string) => readFileSync(join(__dirname, "..", root), "utf8");

/** A page renders the resized variant of an image; this is its URL. */
const rendered = (s: string) => getPicture(s)?.src ?? s;

/** The real studio photographs in src/assets. Never a generated image, never a client. */
const STUDIO: Record<string, string> = {
  [rendered(studioWide)]: "the wide studio",
  [rendered(consultationRoom)]: "the consultation room",
  [rendered(studioChair)]: "the treatment chair",
  [rendered(studioBench)]: "the bench and basin (a second crop of the wide studio)",
};
const CLIENTS = [before1, after1, before2, after2, before3, after3].map(rendered);

describe("homepage treatment cards", () => {
  it("show a different real studio photograph on each of the four cards, each with its own alt text", () => {
    const { container } = renderAt(<MHTSLanding />);
    const cards = Array.from(container.querySelectorAll<HTMLAnchorElement>("#mhts-services a")).filter((a) =>
      treatments.some((t) => a.getAttribute("href") === `/${t.slug}`)
    );
    expect(cards).toHaveLength(4);
    const photos = cards.map((card) => {
      const img = card.querySelector("img")!;
      const name = STUDIO[img.getAttribute("src")!];
      expect(name, `${card.getAttribute("href")}: ${img.getAttribute("src")}`).toBeDefined();
      expect(img.getAttribute("alt")).toMatch(/studio/i);
      return { name, alt: img.getAttribute("alt") };
    });
    expect(new Set(photos.map((p) => p.name)).size).toBe(4);
    expect(new Set(photos.map((p) => p.alt)).size).toBe(4);
  });

  it("never use a client's before or after photograph", () => {
    const { container } = renderAt(<MHTSLanding />);
    for (const img of container.querySelectorAll("#mhts-services img")) {
      expect(CLIENTS).not.toContain(img.getAttribute("src"));
    }
  });
});

describe("opening hours, one wording from one source", () => {
  const LINE = "Tuesday to Friday, 9:30am to 5pm · Closed Saturday to Monday";

  it.each([
    ["the contact page", <ContactPage />],
    ["the booking page", <BookPage />],
    ["the homepage", <MHTSLanding />],
  ])("%s says only the footer's line, and never names a single day", (_, ui) => {
    const { container } = renderAt(ui);
    const main = container.textContent!.replace(/\s+/g, " ");
    expect(main).toContain(LINE);
    expect(main).not.toMatch(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday): /);
  });

  it("the footer says it in the same words", () => {
    const { container } = renderAt(<Footer />);
    expect(container.textContent!.replace(/\s+/g, " ")).toContain("Tuesday to Friday, 9:30am to 5pm · Closed Saturday to Monday");
  });

  it("the words live in src/lib/site.ts and nowhere else", () => {
    for (const file of ["components/Footer.tsx", "components/OpeningHours.tsx", "components/mhts/BookingPanel.tsx", "pages/ContactPage.tsx"]) {
      expect(src(file), file).not.toMatch(/9:30am to 5pm|Closed Saturday to Monday/);
    }
    expect(src("lib/site.ts")).toMatch(/HOURS_OPEN = "Tuesday to Friday, 9:30am to 5pm"/);
    expect(src("lib/site.ts")).toMatch(/HOURS_CLOSED = "Closed Saturday to Monday"/);
  });
});

describe("swipeable strips on a phone", () => {
  it("line the first card up with the page's gutter: 1rem of padding and a 1rem snap line on every strip", () => {
    const css = src("index.css");
    expect(css).toMatch(/@media \(max-width: 767\.98px\) \{\s*\.mhts-snap-x \{\s*scroll-padding-inline: 1rem;\s*\}/);
    // Every strip runs edge to edge and pads itself back to the gutter.
    const strips = ["pages/mhts/MHTSLanding.tsx", "pages/AreaPage.tsx", "pages/BookPage.tsx", "pages/BlogPage.tsx", "components/mhts/ServicePage.tsx", "components/mhts/GoogleReviews.tsx", "components/mhts/BeforeAfterStrip.tsx"];
    for (const file of strips) {
      for (const [cls] of src(file).matchAll(/"mhts-snap-x [^"]+"/g)) {
        expect(cls, file).toMatch(/ -mx-4 /);
        expect(cls, file).toMatch(/ px-4 /);
      }
    }
  });

  it("move on by themselves to the gutter, not to the screen's edge", () => {
    for (const file of ["components/mhts/BeforeAfterStrip.tsx", "components/mhts/GoogleReviews.tsx"]) {
      expect(src(file), file).toMatch(/slide\.offsetLeft - track\.offsetLeft - stripGutter\(track\)/);
    }
  });
});
