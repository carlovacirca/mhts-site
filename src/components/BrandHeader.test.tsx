// The menu used to say the same things twice: a home icon and a logo that both
// went home, a Services link whose dropdown listed the services again, and an
// 11-link grid on phones with no way to call. These tests pin the shape it has
// now, and the two rules that matter most: every page taken out of the menu is
// still linked from the footer, and the phone panel is a proper dialog that
// traps focus and gives it back.
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BrandHeader from "./BrandHeader";
import Footer from "./Footer";

const renderHeader = (path = "/") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <BrandHeader />
    </MemoryRouter>
  );

const openPanel = () => {
  fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
  return screen.getByRole("dialog", { name: "Menu" });
};

const TREATMENTS = [
  "Hair Systems",
  "Scalp Micropigmentation",
  "Hair Density",
  "Hair System Maintenance",
];

describe("BrandHeader, desktop", () => {
  it("has exactly one link home, not a logo and a home icon", () => {
    renderHeader();
    const home = screen.getAllByRole("link", { name: "Men's Hair To Stay home" });
    expect(home).toHaveLength(1);
    expect(screen.queryByRole("link", { name: "Back to home" })).toBeNull();
  });

  it("opens a Treatments dropdown of the four money pages, each with its own line", () => {
    renderHeader();
    const toggle = screen.getByRole("button", { name: /Treatments/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    for (const name of TREATMENTS) {
      const link = screen.getByRole("link", { name: new RegExp(name) });
      expect(link).toHaveAttribute("href", expect.stringContaining("/"));
    }
    // "Real hair, custom fitted and matched to you" and friends.
    expect(screen.getByText(/custom fitted and matched to you/)).toBeInTheDocument();
  });

  it("closes the dropdown on Escape", () => {
    renderHeader();
    const toggle = screen.getByRole("button", { name: /Treatments/ });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("carries only Results, Blog and Contact beside Treatments", () => {
    renderHeader();
    const nav = screen.getByRole("navigation", { name: "Main" });
    const labels = within(nav)
      .getAllByRole("link")
      .map((a) => a.textContent?.trim());
    expect(labels).toEqual(["Results", "Blog", "Contact"]);
    // These four moved to the footer in this batch.
    expect(within(nav).queryByText("How It Works")).toBeNull();
    expect(within(nav).queryByText("FAQ")).toBeNull();
    expect(within(nav).queryByText("Areas Serviced")).toBeNull();
    expect(within(nav).queryByText("Services")).toBeNull();
  });

  it("puts a Call button beside the Book button", () => {
    renderHeader();
    const call = screen.getAllByRole("link", { name: /Call 07947 878087/ })[0];
    expect(call).toHaveAttribute("href", "tel:+447947878087");
    expect(screen.getAllByRole("link", { name: /Book free consultation/ }).length).toBeGreaterThan(0);
  });

  it("no longer shows a full-width Book bar above the fold on phones", () => {
    const { container } = renderHeader();
    // The old bar was the only element with this exact pair of classes.
    expect(container.querySelector(".md\\:hidden.pb-3")).toBeNull();
  });
});

describe("BrandHeader, phone panel", () => {
  it("is a modal dialog with the four treatments and the four other pages", () => {
    renderHeader();
    const panel = openPanel();
    expect(panel).toHaveAttribute("aria-modal", "true");

    for (const name of TREATMENTS) {
      expect(within(panel).getByRole("link", { name })).toBeInTheDocument();
    }
    for (const name of ["Results", "Blog", "FAQ", "Contact"]) {
      expect(within(panel).getByRole("link", { name })).toBeInTheDocument();
    }
  });

  it("ends with a Call button and a Book button", () => {
    renderHeader();
    const panel = openPanel();
    expect(within(panel).getByRole("link", { name: /Call 07947 878087/ })).toHaveAttribute(
      "href",
      "tel:+447947878087"
    );
    expect(within(panel).getByRole("link", { name: /Book free consultation/ })).toBeInTheDocument();
  });

  it("closes on Escape and on a tap outside", () => {
    renderHeader();
    openPanel();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "Menu" })).toBeNull();

    openPanel();
    fireEvent.click(screen.getByTestId("menu-overlay"));
    expect(screen.queryByRole("dialog", { name: "Menu" })).toBeNull();
  });

  it("traps Tab inside the panel and hands focus back to the toggle on close", () => {
    renderHeader();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    openPanel();

    // The trap is scoped to the sliding panel, not to the scrim behind it.
    const inner = document.getElementById("mhts-mobile-menu")!;
    const focusables = Array.from(
      inner.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    last.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(first);

    first.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.activeElement).toBe(toggle);
  });

  it("stops the page behind from scrolling while it is open", () => {
    renderHeader();
    openPanel();
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("gives every item a 48px tap target", () => {
    renderHeader();
    const panel = openPanel();
    const links = within(panel)
      .getAllByRole("link")
      .filter((a) => a.className.includes("min-h-["));
    expect(links.length).toBeGreaterThanOrEqual(10);
    for (const link of links) {
      expect(link.className).toMatch(/min-h-\[(48|52)px\]/);
    }
  });
});

describe("no page loses its internal links", () => {
  it("links every page the menu dropped from the footer instead", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    for (const [name, href] of [
      ["How It Works", "/how-it-works"],
      ["FAQ", "/faq"],
      ["Areas Serviced", "/areas-serviced"],
      ["Services overview", "/services"],
      ["Results", "/gallery"],
      ["Blog", "/blog"],
    ] as const) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
    for (const name of TREATMENTS) {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    }
  });

  it("publishes the MHTS address, never the Georges Barbers one", () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(container.textContent).toContain("info@menshairtostay.co.uk");
    expect(container.textContent).not.toContain("georgesbarbers1991");
  });
});
