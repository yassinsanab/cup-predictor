import type { Team } from "@/lib/teams";

const POS = [
  { ring: "bg-gold text-[#231a02]", label: "Winner" },
  { ring: "bg-pitch text-white", label: "Advances" },
  { ring: "bg-[#E08A2B] text-white", label: "3rd — may advance" },
  { ring: "bg-line text-muted", label: "Eliminated" },
];

export function GroupCard({
  id,
  teams,
  onMove,
}: {
  id: string;
  teams: Team[];
  onMove: (index: number, dir: -1 | 1) => void;
}) {
  return (
    <div className="rounded-card border border-line bg-card p-4 shadow-soft">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-ink font-display text-xs font-extrabold text-gold">
          {id}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          Group {id}
        </span>
      </div>

      <ul className="flex flex-col gap-1.5">
        {teams.map((t, i) => (
          <li
            key={t.code}
            className="flex items-center gap-3 rounded-[10px] border border-line bg-white px-3 py-2"
          >
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-[6px] text-[11px] font-extrabold tabular-nums ${POS[i].ring}`}
              title={POS[i].label}
            >
              {i + 1}
            </span>
            <span className={`fi fi-${t.code} shrink-0`} style={{ width: 22, height: 16 }} />
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">
              {t.name}
            </span>
            <span className="no-export flex shrink-0 gap-1">
              <button
                type="button"
                aria-label={`Move ${t.name} up`}
                disabled={i === 0}
                onClick={() => onMove(i, -1)}
                className="grid h-6 w-6 place-items-center rounded-md text-muted transition-colors hover:bg-paper hover:text-ink disabled:opacity-25 disabled:hover:bg-transparent"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button
                type="button"
                aria-label={`Move ${t.name} down`}
                disabled={i === teams.length - 1}
                onClick={() => onMove(i, 1)}
                className="grid h-6 w-6 place-items-center rounded-md text-muted transition-colors hover:bg-paper hover:text-ink disabled:opacity-25 disabled:hover:bg-transparent"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
