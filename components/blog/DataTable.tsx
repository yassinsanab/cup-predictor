"use client";

import { useState } from "react";

type Props = { headers: string[]; rows: (string | number)[][]; caption?: string };

export function DataTable({ headers, rows, caption }: Props) {
  const [sort, setSort] = useState<{ col: number; dir: 1 | -1 } | null>(null);

  const sorted = (() => {
    if (!sort) return rows;
    const { col, dir } = sort;
    return [...rows].sort((a, b) => {
      const x = a[col];
      const y = b[col];
      const nx = typeof x === "number" ? x : parseFloat(String(x).replace(/[^0-9.-]/g, ""));
      const ny = typeof y === "number" ? y : parseFloat(String(y).replace(/[^0-9.-]/g, ""));
      if (!isNaN(nx) && !isNaN(ny)) return (nx - ny) * dir;
      return String(x).localeCompare(String(y)) * dir;
    });
  })();

  function toggle(col: number) {
    setSort((s) => (s && s.col === col ? { col, dir: s.dir === 1 ? -1 : 1 } : { col, dir: 1 }));
  }

  return (
    <figure className="my-2 overflow-hidden rounded-card border border-line">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-paper">
              {headers.map((h, i) => (
                <th
                  key={i}
                  onClick={() => toggle(i)}
                  className={`cursor-pointer select-none whitespace-nowrap px-4 py-3 font-display text-xs font-extrabold uppercase tracking-wide text-ink-soft transition-colors hover:text-ink ${
                    i === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {h}
                  <span className="ml-1 inline-block w-2 text-gold">
                    {sort?.col === i ? (sort.dir === 1 ? "▲" : "▼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, r) => (
              <tr key={r} className="border-t border-line bg-card transition-colors hover:bg-paper/60">
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={`whitespace-nowrap px-4 py-2.5 tabular-nums ${
                      c === 0 ? "text-left font-semibold text-ink" : "text-right text-ink-soft"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="border-t border-line bg-paper px-4 py-2 text-xs text-muted">
          {caption} · tap a column to sort
        </figcaption>
      )}
    </figure>
  );
}
