"use client";

import { usePresentation } from "@/context/PresentationContext";
import { PRESENTATION_STEPS, TOTAL_STEPS } from "@/config/presentationSteps";
import { motion, AnimatePresence } from "framer-motion";

export default function PresentationTimeline() {
  const { currentStepIndex, nextStep, prevStep, endPresentation } =
    usePresentation();
  const step = PRESENTATION_STEPS[currentStepIndex];
  const progress = ((currentStepIndex + 1) / PRESENTATION_STEPS.length) * 100;
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === TOTAL_STEPS - 1;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 bg-white"
      style={{ borderBottom: "1px solid #E0E0E0" }}
    >
      <div className="mx-auto flex h-12 max-w-[1200px] items-center px-8">
        {/* Step title */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentStepIndex}
            className="font-serif text-[20px] font-bold text-black"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {step.title}
          </motion.h2>
        </AnimatePresence>

        {/* Right side: controls + counter + role + exit */}
        <div className="ml-auto flex items-center gap-2">
          {/* Prev */}
          <button
            onClick={prevStep}
            disabled={isFirst}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            style={{
              color: isFirst ? "#CCC" : "#666",
              cursor: isFirst ? "default" : "pointer",
            }}
            title="Previous (←)"
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
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Step counter */}
          <span
            style={{
              fontSize: 12,
              color: "#999",
              minWidth: 40,
              textAlign: "center",
            }}
          >
            {currentStepIndex + 1} / {TOTAL_STEPS}
          </span>

          {/* Next */}
          <button
            onClick={isLast ? endPresentation : nextStep}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            style={{ color: isLast ? "#999" : "#666" }}
            title={isLast ? "End demo" : "Next (→)"}
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
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Divider */}
          <div
            className="mx-1 h-5"
            style={{ width: 1, backgroundColor: "#E0E0E0" }}
          />

          {/* Role badge */}
          <span
            className="rounded-full px-2.5 py-0.5"
            style={{
              backgroundColor: "#333",
              color: "white",
              fontSize: 10,
              fontWeight: 500,
            }}
          >
            {step.role}
          </span>

          {/* Exit */}
          <button
            onClick={endPresentation}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            style={{ color: "#CCC" }}
            title="Exit (Esc)"
          >
            <svg
              width="15"
              height="15"
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
      </div>

      {/* Progress bar */}
      <div className="h-[2px] w-full" style={{ backgroundColor: "#E0E0E0" }}>
        <motion.div
          className="h-full"
          style={{ backgroundColor: "#333" }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}
