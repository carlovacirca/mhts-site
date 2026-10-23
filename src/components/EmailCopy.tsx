import { useEffect, useState } from "react";
import { Check, Mail, X } from "lucide-react";

// "Email us" on a computer (Carlo, Oct 2026: it went straight to Outlook).
// A mailto: link opens whatever mail program the computer has set up, often
// one the reader never uses. So on a computer (a mouse or trackpad) a click
// on any of the site's email links copies the address instead and says so,
// with the mail program one click away for those who do use it. On a phone
// the link opens the mail app, as people expect there. Share links
// ("mailto:?subject=...") are left alone.

const NOTICE_MS = 7000;

const EmailCopy = () => {
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href^="mailto:"]') : null;
      if (!a || a.dataset.mailApp !== undefined) return;
      const address = decodeURIComponent(a.getAttribute("href")!.slice(7).split("?")[0]);
      if (!address) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      if (!navigator.clipboard?.writeText) return;
      e.preventDefault();
      navigator.clipboard.writeText(address).then(
        () => setCopied(address),
        () => {
          window.location.href = a.href;
        },
      );
    };
    // After the analytics listener (capture), so the click is still counted.
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(null), NOTICE_MS);
    return () => window.clearTimeout(t);
  }, [copied]);

  if (!copied) return null;
  return (
    <div
      role="status"
      className="mhts-theme fixed bottom-6 left-1/2 z-[130] flex w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 items-start gap-3 rounded-xl bg-mhts-deep p-4 text-white shadow-2xl"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mhts-red" aria-hidden="true">
        <Check className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1 font-body text-sm">
        <p className="font-semibold">Email address copied</p>
        <p className="mt-0.5 break-all text-white/80">{copied}, ready to paste into your email.</p>
        <a
          href={`mailto:${copied}`}
          data-mail-app=""
          className="mt-2 inline-flex items-center gap-1.5 text-white underline underline-offset-4 hover:text-mhts-red-light"
        >
          <Mail className="h-4 w-4" aria-hidden="true" /> Open my email program instead
        </a>
      </div>
      <button
        type="button"
        onClick={() => setCopied(null)}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/70 hover:text-white"
        aria-label="Close"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export default EmailCopy;
