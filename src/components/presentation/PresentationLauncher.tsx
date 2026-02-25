"use client";

import { usePresentation } from "@/context/PresentationContext";

export default function PresentationLauncher() {
  const { isPresenting, startPresentation } = usePresentation();

  if (isPresenting) return null;

  return (
    <button
      onClick={startPresentation}
      className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors hover:bg-gray-50"
      style={{
        borderColor: "#E0E0E0",
        fontSize: 12,
        color: "#666",
      }}
      title="Start presentation (Ctrl+Shift+P)"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
      Demo
    </button>
  );
}
