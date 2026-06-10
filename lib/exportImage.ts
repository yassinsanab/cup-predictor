// Client-only. Captures a DOM node to a downloadable PNG.
// html-to-image is dynamically imported so it stays out of the initial bundle.

export async function saveNodeAsPng(node: HTMLElement, filename: string): Promise<void> {
  const { toPng } = await import("html-to-image");
  // Ensure web fonts are ready so text embeds correctly.
  try {
    await (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts?.ready;
  } catch {
    /* ignore */
  }
  // Reveal any .export-only watermark while capturing, then revert.
  node.classList.add("exporting");
  try {
    const dataUrl = await toPng(node, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#F3F0E8",
      // Drop interactive chrome (buttons) marked .no-export from the image.
      filter: (el) =>
        !(el instanceof HTMLElement && el.classList.contains("no-export")),
    });
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } finally {
    node.classList.remove("exporting");
  }
}
