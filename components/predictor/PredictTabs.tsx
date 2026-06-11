"use client";

import { useEffect, useState } from "react";
import { GroupStage } from "./GroupStage";
import { KnockoutStage } from "./KnockoutStage";
import { SupportModal } from "./SupportModal";
import type { Team } from "@/lib/teams";

type SavedDetail = { champion?: Team | null; runnerUp?: Team | null; third?: Team | null };

export function PredictTabs() {
  const [tab, setTab] = useState<"group" | "knockout">("group");
  const [saved, setSaved] = useState<SavedDetail | null>(null);

  // Any image save anywhere in the predictor dispatches "pmp:saved" → show the modal.
  useEffect(() => {
    const onSaved = (e: Event) => setSaved((e as CustomEvent<SavedDetail>).detail ?? {});
    window.addEventListener("pmp:saved", onSaved);
    return () => window.removeEventListener("pmp:saved", onSaved);
  }, []);

  return (
    <>
      <div className="mb-7 flex justify-center">
        <div className="inline-flex rounded-btn border border-line bg-card p-1 text-sm font-semibold shadow-soft">
          <button
            type="button"
            onClick={() => setTab("group")}
            className={`rounded-[10px] px-5 py-2 transition-colors ${
              tab === "group" ? "bg-ink text-white" : "text-muted hover:text-ink"
            }`}
          >
            Group stage
          </button>
          <button
            type="button"
            onClick={() => setTab("knockout")}
            className={`rounded-[10px] px-5 py-2 transition-colors ${
              tab === "knockout" ? "bg-ink text-white" : "text-muted hover:text-ink"
            }`}
          >
            Knockout
          </button>
        </div>
      </div>

      {tab === "group" ? <GroupStage onGoToKnockout={() => setTab("knockout")} /> : <KnockoutStage />}

      {saved && (
        <SupportModal
          champion={saved.champion ?? null}
          runnerUp={saved.runnerUp ?? null}
          third={saved.third ?? null}
          onClose={() => setSaved(null)}
        />
      )}
    </>
  );
}
