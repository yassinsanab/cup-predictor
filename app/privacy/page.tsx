import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy",
  description: "How PlayMatchPool handles your data: no accounts, predictions stored only in your browser.",
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

        <h2 className="font-display text-lg font-extrabold text-ink">Cookies &amp; consent</h2>
        <p>
          When you first visit, we ask whether you accept analytics cookies. We use Google
          Consent Mode, which means measurement and any future advertising cookies stay
          disabled until you choose &ldquo;Accept.&rdquo; If you decline, those cookies are
          not set. You can change your mind by clearing this site&apos;s data in your
          browser, which makes the banner appear again.
        </p>

        <h2 className="font-display text-lg font-extrabold text-ink">Analytics</h2>
        <p>
          With your consent, we use Google Analytics (gtag.js) to understand aggregate,
          anonymised usage — which pages are visited, approximate region, and device type —
          so we can improve the site. Google may set cookies to do this. You can also opt out
          through your browser settings or Google&apos;s own opt-out tools.
        </p>

        <h2 className="font-display text-lg font-extrabold text-ink">Advertising</h2>
        <p>
          We do not show ads today. If we add advertising in future, it may be served by
          Google, including through Google AdSense. Third-party vendors, including Google,
          use cookies to serve ads based on a user&apos;s prior visits to this and other
          websites. Google&apos;s use of advertising cookies enables it and its partners to
          serve ads based on your visits here and elsewhere. You can opt out of personalised
          advertising by visiting Google&apos;s Ads Settings, and any such advertising would
          be subject to the consent choice described above. We will update this page before
          any ads go live.
        </p>

        <h2 className="font-display text-lg font-extrabold text-ink">Supporting the project</h2>
        <p>
          If you choose to support the project through the &ldquo;Buy me a coffee&rdquo;
          link, that payment is handled entirely by Buy Me a Coffee under their own privacy
          policy. We never see or store your payment details.
        </p>

        <h2 className="font-display text-lg font-extrabold text-ink">Hosting</h2>
        <p>
          The site is hosted on Vercel, which may keep standard technical logs (such as IP
          address and request information) for security and reliability, as described in
          Vercel&apos;s own privacy policy.
        </p>

        <h2 className="font-display text-lg font-extrabold text-ink">Your choices</h2>
        <p>
          You can decline analytics in the consent banner, clear local data at any time, and
          opt out of personalised ads through Google&apos;s Ads Settings. Because we hold no
          account and no personal profile, there is nothing tied to your identity to request
          or delete on our side.
        </p>

        <h2 className="font-display text-lg font-extrabold text-ink">Contact</h2>
        <p>
          Questions about this page? Email{" "}
          <a href="mailto:hello@playmatchpool.com" className="font-semibold text-pitch-deep hover:underline">
            hello@playmatchpool.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
