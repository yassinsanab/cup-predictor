import type { Metadata } from "next";
import { PredictTabs } from "@/components/predictor/PredictTabs";

export const metadata: Metadata = {
  title: "Build your bracket",
  description:
    "Rank all 48 teams across 12 groups, then fill the knockout bracket to the 2026 final.",
};

export default function PredictPage() {
  return (
    <div className="mx-auto max-w-shell px-5 pt-10 sm:px-8">
      <PredictTabs />
    </div>
  );
}
