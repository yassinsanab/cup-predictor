import type { Metadata } from "next";
import Script from "next/script";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "flag-icons/css/flag-icons.min.css";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CookieConsent } from "@/components/site/CookieConsent";
import { BuyMeCoffeeWidget } from "@/components/site/BuyMeCoffeeWidget";

// next/font self-hosts at build time — no runtime CDN call.
// Condensed grotesque for display = athletic, editorial, unmistakably sport.
const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});
const body = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.playmatchpool.com"),
  title: {
    default: "PlayMatchPool — World Cup 2026 Bracket Predictor",
    template: "%s · PlayMatchPool",
  },
  description:
    "Free 2026 World Cup bracket predictor. Rank all 48 teams from the group stage to the final, pick the eight best third-placed teams, and share your bracket as an image. No sign-up.",
  openGraph: {
    title: "PlayMatchPool — Build your 2026 bracket",
    description:
      "Rank all 48 teams, fill the knockout bracket to the final, and share it. No sign-up, done in two minutes.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  verification: { google: "0vmu5E-9T3Ildn97UoRdaJnZ4eaKEvZvaxEyXGIkUas" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <BuyMeCoffeeWidget />

        {/* Google Analytics (gtag.js) with Consent Mode v2 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XQXSD007E2"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', 'G-XQXSD007E2');`}
        </Script>
      </body>
    </html>
  );
}
