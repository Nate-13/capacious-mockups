"use client";

import { usePresentation } from "@/context/PresentationContext";
import { TOTAL_STEPS } from "@/config/presentationSteps";

export default function PresentationControls() {
  const { currentStepIndex, currentStep, nextStep, prevStep, endPresentation } =
    usePresentation();

  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === TOTAL_STEPS - 1;

  return (
    <>
      {/* Navigation controls - bottom center */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <div
          className="flex items-center gap-1 rounded-full border px-2 py-1.5 shadow-lg"
          style={{
            backgroundColor: "white",
            borderColor: "#E0E0E0",
          }}
        >
          {/* Prev button */}
          <button
            onClick={prevStep}
            disabled={isFirst}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
            style={{
              color: isFirst ? "#CCC" : "#333",
              cursor: isFirst ? "default" : "pointer",
            }}
            title="Previous step (←)"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Step title */}
          <span
            className="px-3 font-medium"
            style={{ fontSize: 13, color: "#333" }}
          >
            {currentStep.title}
          </span>

          {/* Next button */}
          <button
            onClick={isLast ? endPresentation : nextStep}
            className="flex h-9 items-center gap-1.5 rounded-full px-4 transition-colors"
            style={{
              backgroundColor: "#333",
              color: "white",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {isLast ? "End" : "Next"}
            {!isLast && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
          </button>

          {/* Exit button */}
          <button
            onClick={endPresentation}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            style={{ color: "#999" }}
            title="Exit presentation (Esc)"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Keyboard hints */}
        <div
          className="mt-1.5 text-center"
          style={{ fontSize: 10, color: "#999" }}
        >
          Use arrow keys to navigate
        </div>
      </div>

      {/* Step description card - bottom left */}
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
    </>
  );
}
