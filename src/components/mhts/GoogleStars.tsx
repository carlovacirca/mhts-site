import { Star } from "lucide-react";

/**
 * Five stars in Google's own yellow (#FBBC04), used only inside the Google
 * reviews block so the rating reads as the imported one it is. Everywhere else
 * on the site stars are the brand red.
 */
const GoogleStars = ({
  count = 5,
  className = "w-4 h-4",
  label = "Rated 5 out of 5",
}: {
  count?: number;
  className?: string;
  label?: string;
}) => (
  <span className="inline-flex items-center gap-0.5" role="img" aria-label={label}>
    {Array.from({ length: count }, (_, i) => (
      <Star key={i} className={className} style={{ fill: "#FBBC04", color: "#FBBC04" }} aria-hidden="true" />
    ))}
  </span>
);

export default GoogleStars;
