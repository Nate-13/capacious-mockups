"use client";

import { usePresentation } from "@/context/PresentationContext";
import { TOTAL_STEPS } from "@/config/presentationSteps";

export default function PresentationControls() {
  const { currentStepIndex, currentStep } = usePresentation();

  return (
    <div
      className="fixed bottom-6 left-6 z-50 rounded-xl border p-5 shadow-lg"
      style={{
        backgroundColor: "white",
        borderColor: "#E0E0E0",
        maxWidth: 360,
      }}
    >
      <div
        className="mb-2 font-medium uppercase tracking-wider"
        style={{ fontSize: 11, color: "#999" }}
      >
        Step {currentStepIndex + 1} of {TOTAL_STEPS}
      </div>
      <div style={{ fontSize: 16, color: "#333", lineHeight: 1.55 }}>
        {currentStep.description}
      </div>
    </div>
  );
}
