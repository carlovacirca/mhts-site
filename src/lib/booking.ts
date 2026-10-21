import { useSyncExternalStore } from "react";
import { getCookieConsent } from "./cookieConsent";
import { track } from "./analytics";

// The booking calendar, one for the whole site (Carlo, Oct 2026: the booking
// stop must be the main thing on its page, the calendar must open on a click
// so the clicks can be counted, and it must open fast).
//
// The calendar is Trafft's own page in an iframe. Building it from our side
// costs nothing, but Trafft's page then takes seconds to load (its own
// server, then about 20 scripts, then the services and prices). So once the
// reader has accepted cookies and a booking stop comes near, the iframe is
// built in a hidden sheet and left to load ("warm"). The click then only
// plays the opening animation over a calendar that is already there. Nothing
// from trafft.com is requested before consent, and never in the pre-render.
//
// The sheet itself is BookingSheet (src/components/mhts/BookingSheet.tsx),
// mounted once in Layout, so a warm calendar survives a move between pages.

export const TRAFFT_ORIGIN = "https://menshairtostay.trafft.com";
export const TRAFFT_DEFAULT_SERVICE_UUID = "848c1e33-c5d4-4dc8-a7de-94102b7c344b";

/** Where an open came from, for the reports. */
export type BookingSource = "home_stop" | "book_stop" | "book_prices" | "book_types" | "other";

/** The calendar's state when it was opened: already loaded, still loading, or not started. */
export type Warmth = "ready" | "loading" | "cold";

interface BookingState {
  /** The sheet is in the page (hidden until open). */
  mounted: boolean;
  open: boolean;
  serviceUuid: string;
  /** The iframe's load event has fired for the current service. */
  ready: boolean;
  /** Where the sheet should grow from: the card that was pressed, in window coordinates. */
  from: { top: number; left: number; width: number; height: number } | null;
  /**
   * A service asked for before consent (a /book price row): the booking stop
   * turns to its consent face, and its Accept opens this service.
   */
  asked: { serviceUuid: string; source: BookingSource } | null;
}

let state: BookingState = {
  mounted: false,
  open: false,
  serviceUuid: TRAFFT_DEFAULT_SERVICE_UUID,
  ready: false,
  from: null,
  asked: null,
};
const listeners = new Set<() => void>();
const set = (patch: Partial<BookingState>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** The booking state, for the sheet and the stops. */
export const useBooking = () => useSyncExternalStore(subscribe, () => state, () => state);

/** The address of Trafft's calendar for one service, as Trafft's embed.js builds it. */
export const trafftEmbedUrl = (serviceUuid: string) => {
  const parent = encodeURIComponent(window.location.origin);
  // autoScroll=0: with it on, Trafft scrolls the page under the sheet each
  // time its step changes, which would move the snapped page.
  return `${TRAFFT_ORIGIN}/booking-embed?autoResize=0&showSidebar=1&autoScroll=0&parentOrigin=${parent}&lang=en&t=s&uuid=${serviceUuid}`;
};

const consented = () => getCookieConsent() === "accepted";

/** A slow or metered connection: do not load the calendar before it is asked for. */
const saveData = () => {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (c.saveData === true || c.effectiveType === "2g" || c.effectiveType === "slow-2g");
};

/**
 * Build the hidden calendar now, so a click opens it at once. Only with
 * consent, never on a slow or metered connection unless `force`.
 */
export const warmBooking = (force = false) => {
  if (typeof window === "undefined" || state.mounted || !consented()) return;
  if (!force && saveData()) return;
  set({ mounted: true });
};

let clickAt = 0;
let openedWarmth: Warmth = "cold";
let openedSource: BookingSource = "other";

/** Called by the sheet when its iframe has loaded. */
export const markBookingReady = () => {
  if (state.ready) return;
  set({ ready: true });
  if (state.open && clickAt) {
    track("booking_calendar_ready", {
      source: openedSource,
      warm: openedWarmth,
      ms: Math.round(performance.now() - clickAt),
    });
    clickAt = 0;
  }
};

/**
 * Open the calendar. Only after consent: before it, the stops show their
 * consent face instead and call this from its Accept.
 */
export const openBooking = ({
  source,
  serviceUuid = TRAFFT_DEFAULT_SERVICE_UUID,
  from = null,
  consent = "prior",
}: {
  source: BookingSource;
  serviceUuid?: string;
  from?: Element | null;
  consent?: "prior" | "inline";
}) => {
  if (!consented()) return;
  const sameService = serviceUuid === state.serviceUuid;
  openedWarmth = state.mounted && sameService ? (state.ready ? "ready" : "loading") : "cold";
  openedSource = source;
  const r = from?.getBoundingClientRect();
  set({
    mounted: true,
    open: true,
    serviceUuid,
    ready: sameService ? state.ready : false,
    from: r ? { top: r.top, left: r.left, width: r.width, height: r.height } : null,
  });
  track("open_booking_calendar", {
    source,
    service: serviceUuid,
    warm: openedWarmth,
    consent,
    page_path: window.location.pathname,
  });
  if (openedWarmth === "ready") {
    track("booking_calendar_ready", { source, warm: "ready", ms: 0 });
    clickAt = 0;
  } else {
    clickAt = performance.now();
  }
};

/**
 * Every Book button that is not the stop's own card: open the calendar with
 * consent, or without it take the reader to the stop and its consent face.
 */
export const requestBooking = ({ source, serviceUuid = TRAFFT_DEFAULT_SERVICE_UUID, stopId }: { source: BookingSource; serviceUuid?: string; stopId: string }) => {
  if (consented()) {
    openBooking({ source, serviceUuid, from: document.getElementById(stopId)?.querySelector(".mhts-book-card") ?? null });
    return;
  }
  set({ asked: { serviceUuid, source } });
  document.getElementById(stopId)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/** The consent face has been answered or dismissed. */
export const clearAsked = () => {
  if (state.asked) set({ asked: null });
};

export const closeBooking = () => {
  if (state.open) set({ open: false });
};
