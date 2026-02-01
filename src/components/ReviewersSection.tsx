"use client";

import { Reviewer } from "@/types";

interface ReviewersSectionProps {
  reviewers: Reviewer[];
  isEditor: boolean;
  onViewReview?: (reviewer: Reviewer) => void;
  onSendReminder?: (reviewer: Reviewer) => void;
  onReassign?: (reviewer: Reviewer) => void;
  onAssignNew?: () => void;
}

export default function ReviewersSection({
  reviewers,
  isEditor,
  onViewReview,
  onSendReminder,
  onReassign,
  onAssignNew,
}: ReviewersSectionProps) {
  // Show section only if reviewers array has items OR isEditor is true
  if (reviewers.length === 0 && !isEditor) {
    return null;
  }

  return (
    <section>
      {/* Section title: 18px, serif */}
      <h2
        className="text-[18px] mb-4"
        style={{ fontFamily: "Georgia, Times New Roman, serif" }}
      >
        Reviewers
      </h2>

      {/* Reviewer cards with 12px spacing */}
      <div className="flex flex-col gap-3">
        {reviewers.map((reviewer, index) => (
          <div
            key={reviewer.id}
            className="bg-[#F5F5F5] border border-[#E0E0E0] rounded-[6px] p-4"
          >
            {/* Reviewer name: 14px, bold */}
            <p className="text-[14px] font-bold text-[#333]">
              Reviewer {index + 1}: {reviewer.name}
            </p>

            {/* Status line: 13px, gray */}
            <p className="text-[13px] text-gray-600 mt-1">
              Status:{" "}
              {reviewer.status === "Submitted" ? (
                <span>
                  <span className="text-gray-700">&#10003;</span> Review
                  Submitted ({reviewer.submittedDate})
                </span>
              ) : (
                <span>&#9203; Pending (Due: {reviewer.dueDate})</span>
              )}
            </p>

            {/* Action buttons - only show if isEditor is true */}
            {isEditor && (
              <div className="flex justify-end gap-2 mt-3">
                {reviewer.status === "Submitted" ? (
                  <>
                    <button
                      onClick={() => onViewReview?.(reviewer)}
                      className="text-[13px] px-3 py-1.5 rounded-[4px] border border-gray-400 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      View Review
                    </button>
                    <button
                      onClick={() => onSendReminder?.(reviewer)}
                      className="text-[13px] px-3 py-1.5 rounded-[4px] border border-gray-400 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      Send Reminder
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onSendReminder?.(reviewer)}
                      className="text-[13px] px-3 py-1.5 rounded-[4px] border border-gray-400 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      Send Reminder
                    </button>
                    <button
                      onClick={() => onReassign?.(reviewer)}
                      className="text-[13px] px-3 py-1.5 rounded-[4px] border border-gray-400 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      Reassign
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Assign Additional Reviewer button - only for editors */}
      {isEditor && (
        <button
          onClick={onAssignNew}
          className="w-full mt-3 p-3 text-[13px] text-gray-600 border border-dashed border-[#999] rounded-[4px] bg-transparent hover:bg-gray-50 cursor-pointer transition-colors"
        >
          + Assign Additional Reviewer
        </button>
      )}
    </section>
  );
}
