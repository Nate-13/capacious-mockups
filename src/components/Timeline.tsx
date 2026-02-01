"use client";

import { SubmissionStatus } from "@/types";

interface TimelineProps {
  currentStatus: SubmissionStatus;
}

// Stage definitions
const STAGES = [
  { key: "submitted", label: "Submitted" },
  { key: "desk-review", label: "Desk Review" },
  { key: "peer-review", label: "Peer Review" },
  { key: "copy-editing", label: "Copy Editing" },
  { key: "published", label: "Published" },
] as const;

// Map status to current stage number (1-indexed)
function getStageFromStatus(status: SubmissionStatus): {
  currentStage: number;
  isRejected: boolean;
} {
  switch (status) {
    case "Submitted":
      return { currentStage: 1, isRejected: false };
    case "In Desk Review":
      return { currentStage: 2, isRejected: false };
    case "In Peer Review":
    case "Revision Requested":
    case "Conditional Accept":
      return { currentStage: 3, isRejected: false };
    case "Accepted":
    case "In Copy Editing":
      return { currentStage: 4, isRejected: false };
    case "Published":
      return { currentStage: 5, isRejected: false };
    case "Rejected":
      return { currentStage: 2, isRejected: true };
    default:
      return { currentStage: 1, isRejected: false };
  }
}

// Checkmark icon
function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

// X icon for rejected
function XIcon() {
  return (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function Timeline({ currentStatus }: TimelineProps) {
  const { currentStage, isRejected } = getStageFromStatus(currentStatus);

  // For rejected status, we show a modified timeline
  const stages = isRejected
    ? [
        STAGES[0], // Submitted
        STAGES[1], // Desk Review
        { key: "rejected", label: "Rejected" },
      ]
    : STAGES;

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      {/* Section title */}
      <h3 className="font-serif text-[16px] mb-5">Manuscript Journey</h3>

      {/* Timeline container - horizontal scroll on mobile */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center justify-between min-w-[500px]">
          {stages.map((stage, index) => {
            const stageNumber = index + 1;
            const isCompleted = stageNumber < currentStage;
            const isCurrent = stageNumber === currentStage;
            const isFuture = stageNumber > currentStage;
            const isRejectedStage = isRejected && stage.key === "rejected";
            const isLast = index === stages.length - 1;

            return (
              <div key={stage.key} className="flex items-center flex-1">
                {/* Stage circle and label */}
                <div className="flex flex-col items-center">
                  {/* Circle */}
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center shrink-0
                      ${isCompleted ? "bg-[#333]" : ""}
                      ${isCurrent && !isRejectedStage ? "bg-[#666]" : ""}
                      ${isRejectedStage ? "bg-red-600" : ""}
                      ${isFuture ? "bg-white border-2 border-[#999]" : ""}
                    `}
                  >
                    {isCompleted && <CheckIcon />}
                    {isRejectedStage && <XIcon />}
                  </div>

                  {/* Label */}
                  <span
                    className={`
                      text-center whitespace-nowrap mt-2 text-[11px]
                      ${isRejectedStage ? "text-red-600 font-medium" : "text-gray-600"}
                    `}
                  >
                    {stage.label}
                  </span>
                </div>

                {/* Connecting line (not after the last stage) */}
                {!isLast && (
                  <div
                    className={`
                      flex-1 h-0.5 mx-3
                      ${isCompleted ? "bg-[#333]" : ""}
                      ${isCurrent || isFuture ? "border-t-2 border-dashed border-[#CCC]" : ""}
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
