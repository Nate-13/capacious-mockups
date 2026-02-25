"use client";

import { useState } from "react";
import { Submission, Reviewer, Review, ReviewRecommendation } from "@/types";
import { Button } from "@/components/ui";
import { useToast } from "@/components/Toast";

interface ReviewsContentProps {
  submission: Submission;
  role: string;
  isEditor: boolean;
  onReleaseReview: (reviewerId: string, editedComments: string) => void;
}

// Editor's view of a submitted review - can edit and release
function EditorReviewCard({
  reviewer,
  index,
  onRelease,
}: {
  reviewer: Reviewer;
  index: number;
  onRelease: (reviewerId: string, editedComments: string) => void;
}) {
  const { showToast } = useToast();
  const review = reviewer.review!;
  const [editedComments, setEditedComments] = useState(
    review.editorModifiedComments || review.commentsToAuthor,
  );
  const [isEditing, setIsEditing] = useState(false);

  const recommendationColors: Record<string, string> = {
    Accept: "bg-[#E0E0E0] text-[#333]",
    "Accept with Minor Changes": "bg-[#E0E0E0] text-[#333]",
    "Conditional Accept": "bg-[#D0D0D0] text-[#333]",
    "Revise & Resubmit": "bg-[#999] text-white",
    Reject: "bg-[#555] text-white",
  };

  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-[14px] font-semibold text-gray-800">
            {reviewer.name}
          </h4>
          <p className="text-[12px] text-gray-500">
            Submitted {review.submittedDate}
            {review.releasedToAuthor && (
              <span className="ml-2 text-gray-600">
                &middot; Released {review.releasedDate}
              </span>
            )}
          </p>
        </div>
        <span
          className={`text-[12px] px-2 py-1 rounded font-medium ${
            recommendationColors[review.recommendation] || "bg-gray-100"
          }`}
        >
          {review.recommendation}
        </span>
      </div>

      {/* Confidential comments to editor */}
      <div className="mb-4">
        <h5 className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">
          Confidential Notes to Editor
        </h5>
        <p className="text-[13px] text-gray-600 bg-gray-50 p-3 rounded">
          {review.commentsToEditor}
        </p>
      </div>

      {/* Comments to author (editable by editor before release) */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
            Comments to Author
          </h5>
          {!review.releasedToAuthor && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-[12px] text-gray-500 hover:text-gray-700 underline"
            >
              Edit before releasing
            </button>
          )}
        </div>
        {isEditing ? (
          <div>
            <textarea
              value={editedComments}
              onChange={(e) => setEditedComments(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded text-[13px] min-h-[150px] focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="text-[12px] px-3 py-1.5 bg-[#333] text-white rounded-[6px] hover:bg-[#222] transition-colors"
              >
                Done Editing
              </button>
              <button
                onClick={() => {
                  setEditedComments(review.commentsToAuthor);
                  setIsEditing(false);
                }}
                className="text-[12px] px-3 py-1.5 text-gray-600 hover:text-gray-800"
              >
                Reset
              </button>
            </div>
          </div>
        ) : (
          <p className="text-[13px] text-gray-700 bg-gray-50 p-3 rounded whitespace-pre-wrap">
            {editedComments}
          </p>
        )}
      </div>

      {/* Attached markup file */}
      {review.markupFile && (
        <div className="mb-4">
          <h5 className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">
            Attached File
          </h5>
          <button
            onClick={() => showToast(`Download: ${review.markupFile}`, "info")}
            className="inline-flex items-center gap-2 text-[13px] text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-[6px] px-3 py-2 transition-colors"
          >
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {review.markupFile}
          </button>
        </div>
      )}

      {/* Release button */}
      {!review.releasedToAuthor && (
        <div className="flex justify-end pt-2 border-t border-gray-100">
          <Button
            variant="primary"
            onClick={() => onRelease(reviewer.id, editedComments)}
          >
            Release to Author
          </Button>
        </div>
      )}
      {review.releasedToAuthor && (
        <div className="text-[12px] text-gray-600 text-right pt-2 border-t border-gray-100">
          Released to author
        </div>
      )}
    </div>
  );
}

// Author's view of an anonymous review
function AuthorReviewCard({
  review,
  index,
}: {
  review: Review;
  index: number;
}) {
  const { showToast } = useToast();
  const recommendationColors: Record<string, string> = {
    Accept: "bg-[#E0E0E0] text-[#333]",
    "Accept with Minor Changes": "bg-[#E0E0E0] text-[#333]",
    "Conditional Accept": "bg-[#D0D0D0] text-[#333]",
    "Revise & Resubmit": "bg-[#999] text-white",
    Reject: "bg-[#555] text-white",
  };

  const displayComments =
    review.editorModifiedComments || review.commentsToAuthor;

  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[14px] font-semibold text-gray-800">
          Reviewer {index + 1}
        </h4>
        <span
          className={`text-[12px] px-2 py-1 rounded font-medium ${
            recommendationColors[review.recommendation] || "bg-gray-100"
          }`}
        >
          {review.recommendation}
        </span>
      </div>
      <p className="text-[14px] text-gray-700 whitespace-pre-wrap leading-relaxed">
        {displayComments}
      </p>

      {/* Attached markup file */}
      {review.markupFile && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => showToast(`Download: ${review.markupFile}`, "info")}
            className="inline-flex items-center gap-2 text-[13px] text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-[6px] px-3 py-2 transition-colors"
          >
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {review.markupFile}
          </button>
        </div>
      )}
    </div>
  );
}

// Reviewer's own submission form
function ReviewerSubmitForm({ submissionId }: { submissionId: string }) {
  const { showToast } = useToast();
  const [recommendation, setRecommendation] =
    useState<ReviewRecommendation>("Accept");
  const [commentsToEditor, setCommentsToEditor] = useState("");
  const [commentsToAuthor, setCommentsToAuthor] = useState("");

  const recommendationOptions: ReviewRecommendation[] = [
    "Accept",
    "Accept with Minor Changes",
    "Conditional Accept",
    "Revise & Resubmit",
    "Reject",
  ];

  const handleSubmit = () => {
    showToast("Review submitted successfully", "success");
  };

  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white">
      <h3 className="text-[15px] font-semibold text-gray-800 mb-4">
        Submit Your Review
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wide block mb-2">
            Recommendation
          </label>
          <select
            value={recommendation}
            onChange={(e) =>
              setRecommendation(e.target.value as ReviewRecommendation)
            }
            className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
          >
            {recommendationOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wide block mb-2">
            Confidential Comments to Editor
          </label>
          <textarea
            value={commentsToEditor}
            onChange={(e) => setCommentsToEditor(e.target.value)}
            placeholder="These comments are only visible to the editor..."
            className="w-full p-3 border border-gray-300 rounded text-[13px] min-h-[100px] focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wide block mb-2">
            Comments to Author
          </label>
          <textarea
            value={commentsToAuthor}
            onChange={(e) => setCommentsToAuthor(e.target.value)}
            placeholder="These comments will be shared with the author (after editor review)..."
            className="w-full p-3 border border-gray-300 rounded text-[13px] min-h-[150px] focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wide block mb-2">
            Attach Marked-Up Manuscript (optional)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="text-[13px] text-gray-600 file:mr-3 file:px-3 file:py-1.5 file:text-[12px] file:border file:border-gray-300 file:rounded-[6px] file:bg-white file:text-gray-700 file:cursor-pointer hover:file:bg-gray-50"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-[13px] font-bold bg-[#333] text-white rounded-[6px] hover:bg-[#222] transition-colors"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsContent({
  submission,
  role,
  isEditor,
  onReleaseReview,
}: ReviewsContentProps) {
  // Get reviews that have been submitted
  const submittedReviews =
    submission.assignedReviewers?.filter(
      (r) => r.status === "Submitted" && r.review,
    ) || [];

  const totalReviewers = submission.assignedReviewers?.length || 0;
  const pendingReviewers =
    submission.assignedReviewers?.filter((r) => r.status === "Pending") || [];

  // For authors: only show reviews that have been released
  const releasedReviews = submittedReviews.filter(
    (r) => r.review?.releasedToAuthor,
  );

  // For reviewer role: check if this reviewer has a pending review
  const reviewerHasPending =
    role === "Reviewer" &&
    submission.assignedReviewers?.some((r) => r.status === "Pending");

  // Summary of recommendations (for editor decision section)
  const allSubmitted = totalReviewers > 0 && pendingReviewers.length === 0;

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      {(isEditor || role === "Reviewer") && totalReviewers > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-[15px] font-semibold text-gray-800 mb-2">
            {isEditor ? "Review Management" : "Review Status"}
          </h2>
          <p className="text-[13px] text-gray-500">
            {submittedReviews.length} of {totalReviewers} review
            {totalReviewers !== 1 ? "s" : ""} submitted
            {pendingReviewers.length > 0 &&
              `, ${pendingReviewers.length} pending`}
          </p>
          {isEditor && (
            <p className="text-[12px] text-gray-400 mt-1">
              Review submitted feedback and optionally edit comments before
              releasing to the author.
            </p>
          )}
        </div>
      )}

      {/* Editor view of submitted reviews */}
      {isEditor && submittedReviews.length > 0 && (
        <div className="space-y-4">
          {submittedReviews.map((reviewer, index) => (
            <EditorReviewCard
              key={reviewer.id}
              reviewer={reviewer}
              index={index}
              onRelease={onReleaseReview}
            />
          ))}
        </div>
      )}

      {/* Editor decision recommendation after all reviews are in */}
      {isEditor && allSubmitted && submittedReviews.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-3">
            Reviewer Recommendations Summary
          </h3>
          <div className="space-y-2">
            {submittedReviews.map((reviewer) => {
              const rec = reviewer.review!.recommendation;
              const recommendationColors: Record<string, string> = {
                Accept: "bg-[#E0E0E0] text-[#333]",
                "Accept with Minor Changes": "bg-[#E0E0E0] text-[#333]",
                "Conditional Accept": "bg-[#D0D0D0] text-[#333]",
                "Revise & Resubmit": "bg-[#999] text-white",
                Reject: "bg-[#555] text-white",
              };
              return (
                <div
                  key={reviewer.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-[13px] text-gray-700">
                    {reviewer.name}
                  </span>
                  <span
                    className={`text-[12px] px-2 py-1 rounded font-medium ${recommendationColors[rec] || "bg-gray-100"}`}
                  >
                    {rec}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Editor: Assigned reviewers list */}
      {isEditor && submission.assignedReviewers && (
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-[15px] font-semibold text-gray-800 mb-4">
            Assigned Reviewers
          </h2>
          <div className="space-y-3">
            {submission.assignedReviewers.map((reviewer) => (
              <div
                key={reviewer.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="text-[14px] font-medium text-gray-800">
                    {reviewer.name}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {reviewer.affiliation}
                  </p>
                </div>
                <div className="text-right">
                  {reviewer.status === "Submitted" ? (
                    <span className="text-[12px] text-gray-700 font-medium">
                      Submitted
                    </span>
                  ) : (
                    <span className="text-[12px] text-gray-400">Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 p-3 text-[13px] text-gray-600 border border-dashed border-gray-400 rounded bg-transparent hover:bg-gray-50 transition-colors">
            + Assign Additional Reviewer
          </button>
        </div>
      )}

      {/* Reviewer view: submit review form if pending */}
      {reviewerHasPending && (
        <ReviewerSubmitForm submissionId={submission.id} />
      )}

      {/* Reviewer view: show own submitted review */}
      {role === "Reviewer" &&
        submittedReviews.length > 0 &&
        submittedReviews.map((reviewer, index) => (
          <div
            key={reviewer.id}
            className="border border-gray-200 rounded-lg p-5 bg-white"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-[14px] font-semibold text-gray-800">
                  Your Review
                </h4>
                <p className="text-[12px] text-gray-500">
                  Submitted {reviewer.review!.submittedDate}
                </p>
              </div>
              <span className="text-[12px] px-2 py-1 rounded font-medium bg-gray-100 text-gray-700">
                {reviewer.review!.recommendation}
              </span>
            </div>
            <p className="text-[13px] text-gray-700 whitespace-pre-wrap">
              {reviewer.review!.commentsToAuthor}
            </p>
          </div>
        ))}

      {/* Author view */}
      {role === "Author" && releasedReviews.length > 0 && (
        <div className="space-y-4">
          {releasedReviews.map((reviewer, index) => (
            <AuthorReviewCard
              key={reviewer.id}
              review={reviewer.review!}
              index={index}
            />
          ))}
        </div>
      )}

      {/* No reviews message */}
      {((isEditor && submittedReviews.length === 0 && !totalReviewers) ||
        (role === "Author" && releasedReviews.length === 0) ||
        (role === "Reviewer" &&
          !reviewerHasPending &&
          submittedReviews.length === 0)) && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-[14px] text-gray-500">No reviews available yet.</p>
        </div>
      )}
    </div>
  );
}
