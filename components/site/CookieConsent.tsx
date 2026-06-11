"use client";

import { useEffect, useState } from "react";

const KEY = "pmp.consent.v1";

function setConsent(granted: boolean) {
  if (typeof window === "undefined" || !window.gtag) return;
  const v = granted ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
  });
}

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      /* ignore */
    }
    if (stored === "granted") {
      setConsent(true);
    } else if (stored === "denied") {
      setConsent(false);
    } else {
      setShow(true);
    }
  }, []);

  function choose(granted: boolean) {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {
      /* ignore */
    }
    setConsent(granted);
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-card border border-line bg-card p-4 shadow-lift sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink-soft">
          We use cookies for analytics to understand how the site is used. You can
          accept or decline — your bracket works either way.{" "}
          <a href="/privacy" className="font-semibold text-pitch-deep hover:underline">
            Privacy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose(false)}
            className="rounded-btn border border-line px-4 py-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="rounded-btn bg-pitch px-5 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
