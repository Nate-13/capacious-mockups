"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/context/RoleContext";
import {
  PRESENTATION_STEPS,
  PresentationStep,
  TOTAL_STEPS,
} from "@/config/presentationSteps";
import { TabType } from "@/components/submission-detail/TabsCard";

interface PresentationContextType {
  isPresenting: boolean;
  currentStepIndex: number;
  currentStep: PresentationStep;
  totalSteps: number;
  requestedTab: TabType | null;
  startPresentation: () => void;
  endPresentation: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(
  undefined,
);

export function PresentationProvider({ children }: { children: ReactNode }) {
  const [isPresenting, setIsPresenting] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [requestedTab, setRequestedTab] = useState<TabType | null>(null);
  const router = useRouter();
  const { setRole } = useRole();

  const currentStep = PRESENTATION_STEPS[currentStepIndex];

  const goToStep = useCallback(
    (index: number) => {
      if (index < 0 || index >= TOTAL_STEPS) return;
      const step = PRESENTATION_STEPS[index];
      setCurrentStepIndex(index);
      setRole(step.role);
      setRequestedTab(step.tab || null);
      router.push(step.route);
    },
    [router, setRole],
  );

  const startPresentation = useCallback(() => {
    setIsPresenting(true);
    document.body.classList.add("presentation-mode");
    goToStep(0);
  }, [goToStep]);

  const endPresentation = useCallback(() => {
    setIsPresenting(false);
    setRequestedTab(null);
    document.body.classList.remove("presentation-mode");
  }, []);

  const nextStep = useCallback(() => {
    if (currentStepIndex < TOTAL_STEPS - 1) {
      goToStep(currentStepIndex + 1);
    }
  }, [currentStepIndex, goToStep]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  }, [currentStepIndex, goToStep]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement;

      // Toggle presentation mode: Cmd/Ctrl + Shift + P
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "P") {
        e.preventDefault();
        if (isPresenting) {
          endPresentation();
        } else {
          startPresentation();
        }
        return;
      }

      if (!isPresenting) return;

      // Escape to exit
      if (e.key === "Escape") {
        e.preventDefault();
        endPresentation();
        return;
      }

      // Skip shortcuts when typing in inputs
      if (isInput) return;

      // Arrow right or Space to advance
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextStep();
        return;
      }

      // Arrow left to go back
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevStep();
        return;
      }

      // Number keys 1-8 to jump to step
      const num = parseInt(e.key);
      if (num >= 1 && num <= TOTAL_STEPS) {
        e.preventDefault();
        goToStep(num - 1);
        return;
      }

      // F for fullscreen
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    isPresenting,
    startPresentation,
    endPresentation,
    nextStep,
    prevStep,
    goToStep,
  ]);

  return (
    <PresentationContext.Provider
      value={{
        isPresenting,
        currentStepIndex,
        currentStep,
        totalSteps: TOTAL_STEPS,
        requestedTab,
        startPresentation,
        endPresentation,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentation(): PresentationContextType {
  const context = useContext(PresentationContext);
  if (context === undefined) {
    throw new Error(
      "usePresentation must be used within a PresentationProvider",
    );
  }
  return context;
}
