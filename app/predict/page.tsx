import type { Metadata } from "next";
import { GroupStage } from "@/components/predictor/GroupStage";

export const metadata: Metadata = {
  title: "Build your bracket",
  description:
    "Rank all 48 teams across 12 groups, then fill the knockout bracket to the 2026 final.",
};

export default function PredictPage() {
  return (
    <div className="mx-auto max-w-shell px-5 pt-10 sm:px-8">
      {/* Stage toggle — Group is live; Knockout is the next build (see README roadmap). */}
      <div className="mb-7 flex justify-center">
        <div className="inline-flex rounded-btn border border-line bg-card p-1 text-sm font-semibold shadow-soft">
          <span className="rounded-[10px] bg-ink px-5 py-2 text-white">
            Group stage
          </span>
          <span className="px-5 py-2 text-muted" title="Coming next">
            Knockout
          </span>
        </div>
      </div>

      <GroupStage />
    </div>
  );
}
