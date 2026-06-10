import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Cup Predictor '26 handles your data: no accounts, predictions stored only in your browser.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-10 sm:px-8">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">Privacy</h1>
      <p className="mt-2 text-sm text-muted">Last updated 10 June 2026.</p>

      <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-ink-soft">
        <p>
          Short version: there are no accounts, and we don&apos;t collect personal
          information. Your predictions stay on your device.
        </p>

        <h2 className="font-display text-lg font-extrabold text-ink">Your predictions</h2>
        <p>
          Your group order and knockout picks are saved in your browser&apos;s local
          storage. They are never sent to us or to any server — they live only on the
          device you used. Clearing your browser data removes them. When you export a
          bracket image, it is generated in your browser and downloaded directly to you.
        </p>

        <h2 className="font-display text-lg font-extrabold text-ink">Match data</h2>
        <p>
          The scores page fetches publicly available fixture and result data from the
          open-source openfootball project. That request goes directly from your browser to
          that public data source.
        </p>

        <h2 className="font-display text-lg font-extrabold text-ink">Hosting</h2>
        <p>
          The site is hosted on Vercel, which may keep standard technical logs (such as IP
          address and request information) for security and reliability, as described in
          Vercel&apos;s own privacy policy. We do not currently run advertising or
          third-party analytics. If that changes, we&apos;ll update this page.
        </p>

        <h2 className="font-display text-lg font-extrabold text-ink">Contact</h2>
        <p>
          Questions about this page? Reach out through the project&apos;s GitHub repository.
        </p>
      </div>
    </div>
  );
}
