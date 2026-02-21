"use client";

import { useEffect, useRef, useState } from "react";

export default function DocxViewer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "done" | "error">(
    "loading",
  );

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    async function render() {
      try {
        const { renderAsync } = await import("docx-preview");
        const response = await fetch(url);
        if (!response.ok) throw new Error("Fetch failed");
        const blob = await response.blob();
        if (cancelled) return;

        containerRef.current!.innerHTML = "";

        await renderAsync(blob, containerRef.current!);

        if (!cancelled) setStatus("done");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div className="overflow-y-auto w-full">
      <style>{`
        .docx-wrapper { background: transparent !important; }
      `}</style>

      {status === "loading" && (
        <div className="text-center text-gray-400 text-sm py-10 animate-pulse">
          Loading document…
        </div>
      )}
      {status === "error" && (
        <div className="text-center text-red-400 text-sm py-10">
          Failed to load document.
        </div>
      )}
      <div ref={containerRef} />
    </div>
  );
}
