"use client";

import { Submission, Reviewer } from "@/types";

interface ReviewsSidebarProps {
  submission: Submission;
  role: string;
  isEditor: boolean;
  selectedReviewerId: string | null;
  onSelectReviewer: (id: string) => void;
  onAssignReviewer?: () => void;
}

const recommendationColors: Record<string, string> = {
  Accept: "bg-[#E0E0E0] text-[#333]",
  "Accept with Minor Changes": "bg-[#E0E0E0] text-[#333]",
  "Conditional Accept": "bg-[#D0D0D0] text-[#333]",
  "Revise & Resubmit": "bg-[#999] text-white",
  Reject: "bg-[#555] text-white",
};

const shortRecommendation: Record<string, string> = {
  Accept: "Accept",
  "Accept with Minor Changes": "Minor Changes",
  "Conditional Accept": "Conditional",
  "Revise & Resubmit": "R&R",
  Reject: "Reject",
};

export default function ReviewsSidebar({
  submission,
  role,
  isEditor,
  selectedReviewerId,
  onSelectReviewer,
  onAssignReviewer,
}: ReviewsSidebarProps) {
  const reviewers = submission.assignedReviewers || [];
  const submittedCount = reviewers.filter(
    (r) => r.status === "Submitted",
  ).length;
  const totalCount = reviewers.length;

  // Filter reviewers based on role
  const visibleReviewers = reviewers.filter((reviewer) => {
    if (isEditor) return true;
    if (role === "Reviewer") return true;
    // Author only sees released reviews
    if (role === "Author") {
      return (
        reviewer.status === "Submitted" && reviewer.review?.releasedToAuthor
      );
    }
    return false;
  });

  const pendingCount = totalCount - submittedCount;

  return (
    <div>
      {/* Summary - grounding element like title on submission tab */}
      {totalCount > 0 && (
        <div className="mb-4">
          <div className="text-[20px] font-serif font-bold text-gray-900 leading-tight">
            {submittedCount} of {totalCount} Review{totalCount !== 1 ? "s" : ""}
          </div>
          <p className="text-[13px] text-gray-500 mt-0.5">
            {submittedCount === totalCount
              ? "All reviews received"
              : `${pendingCount} still pending`}
          </p>
        </div>
      )}

      {/* Reviewer list */}
      <div className="space-y-0.5">
        {visibleReviewers.map((reviewer, index) => {
          const isSelected = reviewer.id === selectedReviewerId;
          const isSubmitted = reviewer.status === "Submitted";
          const displayName =
            isEditor || role === "Reviewer"
              ? reviewer.name
              : `Reviewer ${index + 1}`;

          return (
            <button
              key={reviewer.id}
              onClick={() => onSelectReviewer(reviewer.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                isSelected ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-gray-800 truncate">
                    {displayName}
                  </p>
                  {(isEditor || role === "Reviewer") && (
                    <p className="text-[11px] text-gray-400 truncate">
                      {reviewer.affiliation}
                    </p>
                  )}
                </div>
                <div className="shrink-0">
                  {isSubmitted && reviewer.review ? (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-medium whitespace-nowrap ${
                        recommendationColors[reviewer.review.recommendation] ||
                        "bg-gray-100"
                      }`}
                    >
                      {shortRecommendation[reviewer.review.recommendation] ||
                        reviewer.review.recommendation}
                    </span>
                  ) : (
                    <span className="text-[11px] text-gray-400">Pending</span>
                  )}
                </div>
              </div>
              {isEditor && isSubmitted && reviewer.review && (
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {reviewer.review.releasedToAuthor
                    ? "Released to author"
                    : "Not released"}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* No reviewers */}
      {visibleReviewers.length === 0 && (
        <p className="text-[13px] text-gray-400 py-4">
          No reviews available yet.
        </p>
      )}

      {/* Assign additional reviewer */}
      {isEditor && (
        <button
          onClick={onAssignReviewer}
          className="w-full mt-4 p-3 text-[13px] text-gray-600 border border-dashed border-gray-400 rounded-lg bg-transparent hover:bg-gray-50 transition-colors"
        >
          + Assign Additional Reviewer
        </button>
      )}
    </div>
  );
}
