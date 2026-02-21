"use client";

import { useEffect, useRef, useState } from "react";

interface DocxViewerProps {
  url: string;
  zoomLevel: number;
  onLoadSuccess: () => void;
  onLoadError: () => void;
}

export default function DocxViewer({
  url,
  zoomLevel,
  onLoadSuccess,
  onLoadError,
}: DocxViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  // Scale factor: normalize 816px docx → 760px base, then apply zoom
  const scale = (760 / 816) * zoomLevel;

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

        if (!cancelled) {
          onLoadSuccess();
          // Measure content height after render
          requestAnimationFrame(() => {
            if (containerRef.current) {
              setContentHeight(containerRef.current.scrollHeight);
            }
          });
        }
      } catch {
        if (!cancelled) onLoadError();
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [url, onLoadSuccess, onLoadError]);

  // Re-measure when zoom changes
  useEffect(() => {
    if (containerRef.current) {
      setContentHeight(containerRef.current.scrollHeight);
    }
  }, [zoomLevel]);

  return (
    <div className="w-full flex flex-col items-center py-6">
      <style>{`
        .docx-wrapper {
          background: transparent !important;
          padding: 0 !important;
        }
        .docx-wrapper > section {
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1), 0 20px 25px -5px rgba(0,0,0,0.15) !important;
          margin-bottom: 16px !important;
          border-radius: 2px;
        }
      `}</style>
      <div
        ref={wrapperRef}
        style={{ height: contentHeight ? contentHeight * scale : "auto" }}
        className="relative"
      >
        <div
          ref={containerRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        />
      </div>
    </div>
  );
}
