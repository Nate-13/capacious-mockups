"use client";

import { usePresentation } from "@/context/PresentationContext";
import PresentationTimeline from "./PresentationTimeline";
import PresentationControls from "./PresentationControls";
import CursorEnhancer from "./CursorEnhancer";
import RoleAnnouncement from "./RoleAnnouncement";

export default function PresentationOverlay() {
  const { isPresenting } = usePresentation();

  if (!isPresenting) return null;

  return (
    <>
      <PresentationTimeline />
      <PresentationControls />
      <CursorEnhancer />
      <RoleAnnouncement />
    </>
  );
}
