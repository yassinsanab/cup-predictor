// Client-only. Captures a DOM node to a downloadable PNG.
export async function saveNodeAsPng(node: HTMLElement, filename: string): Promise<void> {
  const { toPng } = await import("html-to-image");
  try {
    const fonts = (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts?.ready;
    if (fonts) await Promise.race([fonts, new Promise((r) => setTimeout(r, 1500))]);
  } catch {
    /* ignore */
  }
  node.classList.add("exporting");
  try {
    const dataUrl = await toPng(node, {
      pixelRatio: 2,
      cacheBust: false,
      backgroundColor: "#F3F0E8",
      filter: (el) => !(el instanceof HTMLElement && el.classList.contains("no-export")),
    });
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (e) {
    console.error("[exportImage] capture failed:", e);
    throw e;
  } finally {
    node.classList.remove("exporting");
  }
}
