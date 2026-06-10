import type { Metadata } from "next";
import { ScoresBoard } from "@/components/scores/ScoresBoard";

export const metadata: Metadata = {
  title: "World Cup 2026 scores & fixtures",
  description:
    "Live World Cup 2026 results and the full fixture schedule — all 104 matches, group stage and knockouts, in your local timezone.",
};

export default function ScoresPage() {
  return (
    <div className="mx-auto max-w-shell px-5 pt-10 sm:px-8">
      <ScoresBoard />
    </div>
  );
}
