"use client";

import { useEffect } from "react";

// Injects the official Buy Me a Coffee floating widget. Manual injection is
// more reliable than next/script here because the widget reads its config from
// the script element's own data-* attributes at execution time.
export function BuyMeCoffeeWidget() {
  useEffect(() => {
    if (document.getElementById("bmc-wjs")) return;
    const s = document.createElement("script");
    s.id = "bmc-wjs";
    s.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    s.async = true;
    const attrs: Record<string, string> = {
      "data-name": "BMC-Widget",
      "data-cfasync": "false",
      "data-id": "apoldi",
      "data-description": "Support me on Buy me a coffee!",
      "data-message": "",
      "data-color": "#5F7FFF",
      "data-position": "Right",
      "data-x_margin": "18",
      "data-y_margin": "18",
    };
    for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
    document.body.appendChild(s);
  }, []);
  return null;
}
