"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/context/PresentationContext";
import { PRESENTATION_STEPS } from "@/config/presentationSteps";

export default function RoleAnnouncement() {
  const { isPresenting, currentStep, currentStepIndex } = usePresentation();
  const [visible, setVisible] = useState(false);
  const [displayRole, setDisplayRole] = useState(currentStep.role);
  const prevRole = useRef<string>(PRESENTATION_STEPS[0].role);

  // Reset to first step's role when presentation starts
  useEffect(() => {
    if (isPresenting) {
      prevRole.current = PRESENTATION_STEPS[0].role;
    }
  }, [isPresenting]);

  // Only show when the role actually changes between steps
  useEffect(() => {
    if (!isPresenting) return;

    const roleChanged = currentStep.role !== prevRole.current;
    prevRole.current = currentStep.role;

    if (roleChanged) {
      setDisplayRole(currentStep.role);
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 1200);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isPresenting, currentStep.role, currentStepIndex]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[9990] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
          />

          {/* Role card */}
          <motion.div
            className="relative rounded-2xl px-12 py-8 text-center shadow-2xl"
            style={{ backgroundColor: "white" }}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="mb-2 font-medium uppercase tracking-wider"
              style={{ fontSize: 12, color: "#999" }}
            >
              Viewing as
            </div>
            <div
              className="font-serif font-bold"
              style={{ fontSize: 36, color: "#222" }}
            >
              {displayRole}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
