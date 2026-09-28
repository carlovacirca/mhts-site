// The before and after slider is the one piece of the homepage that carries
// the sale, so the things that could quietly break it are pinned here: the
// keyboard, the clip that reveals the photographs, and the rule that neither
// image may ever be hidden with an inline opacity, which is what the build
// guard in scripts/prerender.mjs fails on.
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BeforeAfterSlider from "./BeforeAfterSlider";

const props = {
  before: "/before.jpg",
  after: "/after.jpg",
  beforeAlt: "Client before",
  afterAlt: "Client after",
  label: "Client one",
};

const handle = () => screen.getByRole("slider");
const press = (key: string, shiftKey = false) => fireEvent.keyDown(handle(), { key, shiftKey });

describe("BeforeAfterSlider", () => {
  it("ships both photographs in the page, with their own alt text", () => {
    render(<BeforeAfterSlider {...props} />);
    expect(screen.getByAltText("Client before")).toBeInTheDocument();
    expect(screen.getByAltText("Client after")).toBeInTheDocument();
  });

  it("starts at the halfway point with an accessible name and value", () => {
    render(<BeforeAfterSlider {...props} />);
    expect(handle()).toHaveAttribute("aria-valuenow", "50");
    expect(handle()).toHaveAccessibleName(/Client one/);
    expect(handle()).toHaveAttribute("aria-valuemin", "0");
    expect(handle()).toHaveAttribute("aria-valuemax", "100");
    expect(handle()).toHaveAttribute("tabindex", "0");
  });

  it("moves on the arrow keys, and a bigger step with shift held", () => {
    render(<BeforeAfterSlider {...props} />);

    press("ArrowRight");
    expect(handle()).toHaveAttribute("aria-valuenow", "54");

    press("ArrowLeft");
    press("ArrowLeft");
    expect(handle()).toHaveAttribute("aria-valuenow", "46");

    press("ArrowRight", true);
    expect(handle()).toHaveAttribute("aria-valuenow", "56");
  });

  it("clamps at both ends with Home and End", () => {
    render(<BeforeAfterSlider {...props} />);

    press("Home");
    expect(handle()).toHaveAttribute("aria-valuenow", "0");
    press("ArrowLeft");
    expect(handle()).toHaveAttribute("aria-valuenow", "0");

    press("End");
    expect(handle()).toHaveAttribute("aria-valuenow", "100");
    press("ArrowRight");
    expect(handle()).toHaveAttribute("aria-valuenow", "100");
  });

  it("ignores keys that are not its own", () => {
    render(<BeforeAfterSlider {...props} />);
    press("a");
    press("Enter");
    expect(handle()).toHaveAttribute("aria-valuenow", "50");
  });

  it("reveals with a clip rather than an opacity, so nothing bakes in invisible", () => {
    const { container } = render(<BeforeAfterSlider {...props} />);

    const clipped = container.querySelector<HTMLElement>('[style*="clip-path"]');
    expect(clipped).not.toBeNull();
    expect(clipped!.style.clipPath).toBe("inset(0 50% 0 0)");

    press("Home");
    expect(clipped!.style.clipPath).toBe("inset(0 100% 0 0)");

    // The guard in scripts/prerender.mjs fails the build on any inline opacity
    // below 1 anywhere in the captured HTML.
    for (const el of Array.from(container.querySelectorAll<HTMLElement>("[style]"))) {
      expect(el.style.opacity === "" || Number(el.style.opacity) === 1).toBe(true);
    }
  });

  it("labels the two halves so the comparison reads without the images", () => {
    render(<BeforeAfterSlider {...props} />);
    expect(screen.getByText("Before")).toBeInTheDocument();
    expect(screen.getByText("After")).toBeInTheDocument();
  });
});
