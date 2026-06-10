import type { Metadata } from "next";
import Script from "next/script";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "flag-icons/css/flag-icons.min.css";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

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
    default: "Cup Predictor '26 — World Cup 2026 Bracket Predictor",
    template: "%s · Cup Predictor '26",
  },
  description:
    "Free 2026 World Cup bracket predictor. Rank all 48 teams from the group stage to the final, pick the eight best third-placed teams, and share your bracket as an image. No sign-up.",
  openGraph: {
    title: "Cup Predictor '26 — Build your 2026 bracket",
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

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XQXSD007E2"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XQXSD007E2');`}
        </Script>
      </body>
    </html>
  );
}
