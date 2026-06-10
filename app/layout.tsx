import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "flag-icons/css/flag-icons.min.css";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

// next/font self-hosts the font at build time — no runtime CDN call.
const display = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cup-predictor.example"),
  title: {
    default: "Cup Predictor '26 — World Cup 2026 Bracket Predictor",
    template: "%s · Cup Predictor '26",
  },
  description:
    "Free 2026 World Cup bracket predictor. Pick all 48 teams from the group stage to the final, compete on the global leaderboard, and challenge friends in private leagues. No sign-up.",
  openGraph: {
    title: "Cup Predictor '26 — Build your 2026 bracket",
    description:
      "Predict all 48 teams, compete on the leaderboard, join private leagues. No sign-up, done in two minutes.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={display.variable}>
      <body className="min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
