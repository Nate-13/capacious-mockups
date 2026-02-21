"use client";

import { useEffect } from "react";

interface UseViewerKeyboardOptions {
  enabled: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
}

export function useViewerKeyboard({
  enabled,
  onZoomIn,
  onZoomOut,
  onNextPage,
  onPrevPage,
}: UseViewerKeyboardOptions) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const mod = e.metaKey || e.ctrlKey;

      if (mod && (e.key === "=" || e.key === "+")) {
        e.preventDefault();
        onZoomIn();
      } else if (mod && e.key === "-") {
        e.preventDefault();
        onZoomOut();
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        onNextPage?.();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        onPrevPage?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onZoomIn, onZoomOut, onNextPage, onPrevPage]);
}
