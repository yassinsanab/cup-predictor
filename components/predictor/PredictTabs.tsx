"use client";

import { useState } from "react";
import { GroupStage } from "./GroupStage";
import { KnockoutStage } from "./KnockoutStage";

export function PredictTabs() {
  const [tab, setTab] = useState<"group" | "knockout">("group");
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

      {tab === "group" ? <GroupStage /> : <KnockoutStage />}
    </>
  );
}
