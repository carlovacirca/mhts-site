// Batch 4b fixes, second and third reviews (PR #8, checked on an iPhone and an
// Android phone): the homepage treatment cards are colour, not photographs,
// the hours read the same everywhere from one source, and every swipeable strip
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
const renderAt = (ui: React.ReactElement, path = "/") =>
  render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>);

const src = (root: string) => readFileSync(join(__dirname, "..", root), "utf8");

describe("homepage treatment cards (third review: no photographs, a colour each)", () => {
  const cards = (container: HTMLElement) =>
    Array.from(container.querySelectorAll<HTMLAnchorElement>("#mhts-services [data-treatment-card]"));

  it("are the four treatments, each card one link with an icon, the name, one line and See treatment", () => {
    const { container } = renderAt(<MHTSLanding />);
    const list = cards(container);
    expect(list.map((c) => c.getAttribute("href"))).toEqual(treatments.map((t) => `/${t.slug}`));
    list.forEach((card, i) => {
      expect(card.tagName).toBe("A");
      expect(card.querySelector("svg")).not.toBeNull();
      expect(card.querySelector("h3")!.textContent).toBe(treatments[i].name);
      expect(card.textContent).toContain(treatments[i].line);
      expect(card.textContent).toContain("See treatment");
      // Nothing else to tap inside the card.
      expect(card.querySelectorAll("a, button")).toHaveLength(0);
    });
  });

  it("carry no image of any kind", () => {
    const { container } = renderAt(<MHTSLanding />);
    expect(container.querySelectorAll("#mhts-services img, #mhts-services picture")).toHaveLength(0);
  });

  it("each have their own colour", () => {
    const { container } = renderAt(<MHTSLanding />);
    const backgrounds = cards(container).map((c) => c.className.match(/\bbg-\S+/)![0]);
    expect(new Set(backgrounds).size).toBe(4);
  });

  it("sit two by two up to lg and four in a row from lg, with equal rows and no swiping", () => {
    const { container } = renderAt(<MHTSLanding />);
    const grid = cards(container)[0].parentElement!.parentElement!;
    expect(grid.className).toMatch(/\bgrid\b/);
    expect(grid.className).toMatch(/\bgrid-cols-2\b/);
    expect(grid.className).toMatch(/\blg:grid-cols-4\b/);
    expect(grid.className).toMatch(/\bauto-rows-fr\b/);
    expect(grid.className).not.toMatch(/overflow-x|snap-x|mhts-snap-x/);
  });

  it("move on hover or press only when motion is allowed", () => {
    const { container } = renderAt(<MHTSLanding />);
    for (const card of cards(container)) {
      expect(card.className).not.toMatch(/(^|\s)(hover|active):(-?translate|scale)/);
      expect(card.className).toMatch(/motion-safe:hover:-translate-y-1/);
    }
  });

  it("leave no unused image behind", () => {
    expect(() => src("assets/mhts-studio-bench-crop.jpg")).toThrow();
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
