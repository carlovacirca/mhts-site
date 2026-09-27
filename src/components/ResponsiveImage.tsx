import { getPicture } from "@/lib/images";

interface ResponsiveImageProps {
  /** The URL from a normal `import x from "@/assets/y.jpg"`. */
  src: string;
  alt: string;
  /** CSS widths at each breakpoint, so the browser picks the smallest variant that fits. */
  sizes?: string;
  className?: string;
  /**
   * True for the one image that is the largest thing above the fold on this
   * page type. Sets fetchpriority="high" and turns off lazy loading, which is
   * what moves LCP. Everything else stays lazy.
   */
  priority?: boolean;
  /** Overrides the intrinsic ratio when the image is cropped by CSS. */
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * An <img> that serves WebP with a JPEG fallback and a srcset, and always
 * carries width and height so the layout cannot shift while it loads.
 *
 * If the source has no generated variants (an SVG, a remote URL, anything
 * outside src/assets) it renders a plain <img> with the same attributes, so it
 * is always safe to swap an existing <img> for this component.
 */
const ResponsiveImage = ({
  src,
  alt,
  sizes = "100vw",
  className,
  priority = false,
  width,
  height,
  style,
}: ResponsiveImageProps) => {
  const pic = getPicture(src);

  const shared = {
    alt,
    className,
    style,
    decoding: "async" as const,
    ...(priority
      ? { loading: "eager" as const, fetchPriority: "high" as const }
      : { loading: "lazy" as const, fetchPriority: "low" as const }),
  };

  if (!pic) {
    return <img src={src} width={width} height={height} {...shared} />;
  }

  // imagetools keys the original format as "jpeg" or "png", never "jpg".
  const fallbackFormat = Object.keys(pic.sources).find((f) => f !== "webp");

  return (
    <picture className="contents">
      {/* hidden matters. Tailwind's preflight gives <source> display:block, and
          with display:contents on the <picture> that turns the source into a real
          layout box, which silently added an extra grid item to the featured blog
          card. Hiding it changes nothing about image selection, which the browser
          does from the markup, not from CSS. */}
      {pic.sources.webp && (
        <source className="hidden" type="image/webp" srcSet={pic.sources.webp} sizes={sizes} />
      )}
      <img
        src={pic.src}
        srcSet={fallbackFormat ? pic.sources[fallbackFormat] : undefined}
        sizes={sizes}
        width={width ?? pic.width}
        height={height ?? pic.height}
        {...shared}
      />
    </picture>
  );
};

export default ResponsiveImage;
