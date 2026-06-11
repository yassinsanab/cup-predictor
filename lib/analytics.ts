// Fire a GA4 event via gtag. No-op on the server or before gtag loads.
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params?: Params): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params ?? {});
  } catch {
    /* analytics must never break the app */
  }
}
