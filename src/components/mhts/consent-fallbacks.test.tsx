// Most first visits have not answered the cookie banner. Until this batch that
// meant the booking section was a line of grey text and the map was a blank
// rectangle: two empty blocks where the two most useful things on the page
// should be. See docs/DESIGN-AUDIT.md finding 12.
//
// What must not change is the consent rule itself, so these tests check both
// halves: the fallbacks are genuinely useful, and nothing third party is
// requested until the reader has accepted.
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookingPanel from "./BookingPanel";
import StudioMap from "./StudioMap";
import { getCookieConsent, setCookieConsent } from "@/lib/cookieConsent";

const withRouter = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("BookingPanel, the booking section before consent", () => {
  beforeEach(() => window.localStorage.clear());

  it("offers a real way to book rather than an apology", () => {
    withRouter(<BookingPanel />);
    expect(
      screen.getByRole("heading", { name: "Book your free consultation" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /07947 878087/ })).toHaveAttribute(
      "href",
      "tel:+447947878087"
    );
    expect(screen.getByRole("link", { name: /Email us/ })).toHaveAttribute(
      "href",
      "mailto:info@menshairtostay.co.uk"
    );
  });

  it("shows the opening hours in the footer's words, with no day of the week of its own", () => {
    const { container } = withRouter(<BookingPanel />);
    expect(container.textContent).toContain("Tuesday to Friday, 9:30am to 5pm · Closed Saturday to Monday");
    // It used to lead with today ("Thursday: 9:30am to 5pm · Tuesday to Friday, ...").
    expect(container.textContent).not.toMatch(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday):/);
  });

  it("can set consent from here, exactly as Accept does", () => {
    withRouter(<BookingPanel />);
    expect(getCookieConsent()).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Show the online booking calendar" }));
    expect(getCookieConsent()).toBe("accepted");
  });

  it("says who the calendar belongs to before asking for consent to it", () => {
    withRouter(<BookingPanel />);
    expect(screen.getByText(/run by Trafft and sets cookies/)).toBeInTheDocument();
  });

  it("requests nothing from a third party on its own", () => {
    const { container } = withRouter(<BookingPanel />);
    expect(container.querySelector("iframe")).toBeNull();
    expect(container.querySelector("script")).toBeNull();
    expect(container.innerHTML).not.toContain("trafft.com");
    expect(container.innerHTML).not.toContain("googletagmanager");
  });
});

describe("StudioMap", () => {
  beforeEach(() => window.localStorage.clear());

  it("draws its own map and does not load Google's before consent", () => {
    const { container } = render(<StudioMap />);
    expect(screen.getByTestId("map-fallback")).toBeInTheDocument();
    expect(container.querySelector("iframe")).toBeNull();
    expect(container.querySelector("svg")).not.toBeNull();
    // No tiles, no request, nothing third party: the illustration is inline SVG.
    expect(container.innerHTML).not.toContain("maps.googleapis");
    expect(container.innerHTML).not.toContain("output=embed");
  });

  it("gives the address and a way out to Google Maps", () => {
    render(<StudioMap />);
    expect(screen.getByText("11 Chesham Road, Amersham HP6 5HN")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Open in Google Maps/ });
    expect(link).toHaveAttribute("href", expect.stringContaining("google.com/maps"));
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("loads the real embed once consent is accepted", () => {
    const { container, rerender } = render(<StudioMap />);
    expect(container.querySelector("iframe")).toBeNull();

    fireEvent(window, new CustomEvent("mhts-cookie-consent-change"));
    setCookieConsent("accepted");
    rerender(<StudioMap />);

    const iframe = container.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe).toHaveAttribute("src", expect.stringContaining("google.com/maps"));
    expect(screen.queryByTestId("map-fallback")).toBeNull();
  });

  it("loads nothing at all when consent is declined", () => {
    setCookieConsent("declined");
    const { container } = render(<StudioMap />);
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.getByTestId("map-fallback")).toBeInTheDocument();
  });
});
