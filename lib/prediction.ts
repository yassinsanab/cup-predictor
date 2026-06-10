import { GROUPS, type Team } from "./teams";

export type Order = Record<string, Team[]>; // group -> [1st,2nd,3rd,4th]

export const GROUP_ORDER_KEY = "cp26.groupOrder.v1";
export const KNOCKOUT_KEY = "cp26.knockout.v1";

export function defaultOrder(): Order {
  const o: Order = {};
  for (const g of GROUPS) o[g.id] = [...g.teams];
  return o;
}

/** Read the saved group-stage order (falls back to the default draw order). */
export function loadGroupOrder(): Order {
  try {
    const raw = localStorage.getItem(GROUP_ORDER_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as { order?: Order };
      if (saved.order) return saved.order;
    }
  } catch {
    /* ignore */
  }
  return defaultOrder();
}
