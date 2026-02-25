"use client";

import { usePresentation } from "@/context/PresentationContext";
import { PRESENTATION_STEPS } from "@/config/presentationSteps";
import { motion, AnimatePresence } from "framer-motion";

export default function PresentationTimeline() {
  const { currentStepIndex } = usePresentation();
  const step = PRESENTATION_STEPS[currentStepIndex];
  const progress = ((currentStepIndex + 1) / PRESENTATION_STEPS.length) * 100;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 bg-white">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center px-8">
        {/* Step title */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentStepIndex}
            className="font-serif text-[22px] font-bold text-black"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {step.title}
          </motion.h2>
        </AnimatePresence>

        {/* Right side: step counter + role */}
        <div className="ml-auto flex items-center gap-3">
          <span style={{ fontSize: 12, color: "#999" }}>
            {currentStepIndex + 1} of {PRESENTATION_STEPS.length}
          </span>
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
