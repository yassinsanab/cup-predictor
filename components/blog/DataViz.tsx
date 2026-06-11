type BarItem = { label: string; value: number; note?: string };

export function BarList({
  items,
  unit,
  caption,
}: {
  items: BarItem[];
  unit?: string;
  caption?: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <figure className="my-2 rounded-card border border-line bg-card p-5">
      <div className="flex flex-col gap-3.5">
        {items.map((it) => (
          <div key={it.label}>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold text-ink">{it.label}</span>
              <span className="font-display text-sm font-extrabold tabular-nums text-ink-soft">
                {it.value}
                {unit ?? ""}
                {it.note ? <span className="ml-1.5 font-sans text-xs font-normal text-muted">{it.note}</span> : null}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-pitch"
                style={{ width: `${Math.max((it.value / max) * 100, 2)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {caption && <figcaption className="mt-4 text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}

export function StatGrid({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="my-2 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="bg-card px-4 py-5 text-center">
          <div className="font-display text-3xl font-black tabular-nums text-ink sm:text-4xl">{s.value}</div>
          <div className="kicker mt-1 text-[10px] text-gold-deep">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
