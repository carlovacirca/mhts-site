import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SECTION_SNAP } from "@/lib/sectionSnap";
import { startStopMotion } from "@/lib/stopMotion";
import { FIT_SCREENS, SCREENS } from "./SnapGuides";

// The arrival motion at every scroll stop ("Arrive", src/lib/stopMotion.ts).
// The stops are SnapGuides' own screens: on a phone its SCREENS, from 768px
// up its FIT_SCREENS. Only the ones that really are snap areas at this width
// are used.
// A blog article's hero, title card, sources and related posts, and every
// page's footer, are stops too.
const STOPS = `${SCREENS}, ${FIT_SCREENS}, .mhts-snap-proximity section, body footer`;

const StopMotion = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!SECTION_SNAP) return;
    let teardown = () => {};
    // Two frames: after ScrollToTop has placed the page and SnapGuides has
    // fitted it, so what is on screen is known.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        teardown = startStopMotion(STOPS);
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      teardown();
    };
  }, [pathname]);
  return null;
};

export default StopMotion;
