import { describe, it, expect, vi, afterEach } from "vitest";
import { ctaFor, track } from "./analytics";

const el = (html: string) => {
  document.body.innerHTML = html;
  return document.body.querySelector("[data-t]")!;
};

describe("analytics", () => {
  afterEach(() => {
    delete (window as unknown as { gtag?: unknown }).gtag;
    document.body.innerHTML = "";
  });

  it("names calls, emails and every way to book", () => {
    expect(ctaFor(el('<a href="tel:+447947878087"><span data-t>Call</span></a>'))?.event).toBe("click_call");
    expect(ctaFor(el('<a data-t href="mailto:info@menshairtostay.co.uk">Email</a>'))?.event).toBe("click_email");
    expect(ctaFor(el('<a data-t href="/book">Book</a>'))?.event).toBe("click_book");
    expect(ctaFor(el('<a data-t href="/#mhts-book">Go</a>'))?.event).toBe("click_book");
    expect(ctaFor(el('<button data-t>Book free consultation</button>'))?.event).toBe("click_book");
    expect(ctaFor(el('<a data-t href="/blog">Blog</a>'))).toBeNull();
  });

  it("sends nothing until GA4 is loaded, then sends the event", () => {
    expect(() => track("click_call")).not.toThrow();
    const gtag = vi.fn();
    (window as unknown as { gtag: unknown }).gtag = gtag;
    track("click_call", { page_path: "/" });
    expect(gtag).toHaveBeenCalledWith("event", "click_call", { page_path: "/" });
  });
});
