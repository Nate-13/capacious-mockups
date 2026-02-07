"use client";

import { useState } from "react";
import { Submission, Reviewer, Review, ReviewRecommendation } from "@/types";
import { Button } from "@/components/ui";

interface ReviewDetailProps {
  submission: Submission;
  reviewer: Reviewer | null;
  reviewerIndex: number;
  role: string;
  isEditor: boolean;
  onReleaseReview: (reviewerId: string, editedComments: string) => void;
}

const recommendationColors: Record<string, string> = {
  Accept: "bg-[#E0E0E0] text-[#333]",
  "Accept with Minor Changes": "bg-[#E0E0E0] text-[#333]",
  "Conditional Accept": "bg-[#D0D0D0] text-[#333]",
  "Revise & Resubmit": "bg-[#999] text-white",
  Reject: "bg-[#555] text-white",
};

// Editor viewing a submitted review
function EditorReviewDetail({
  reviewer,
  onRelease,
}: {
  reviewer: Reviewer;
  onRelease: (reviewerId: string, editedComments: string) => void;
}) {
  const review = reviewer.review!;
  const [editedComments, setEditedComments] = useState(
    review.editorModifiedComments || review.commentsToAuthor,
  );
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[18px] font-serif font-bold text-gray-900">
            {reviewer.name}
          </h3>
          <p className="text-[13px] text-gray-500 mt-0.5">
            {reviewer.affiliation}
          </p>
          <p className="text-[12px] text-gray-400 mt-1">
            Submitted {review.submittedDate}
            {review.releasedToAuthor && (
              <span> &middot; Released {review.releasedDate}</span>
            )}
          </p>
        </div>
        <span
          className={`text-[12px] px-2.5 py-1 rounded font-medium ${
            recommendationColors[review.recommendation] || "bg-gray-100"
          }`}
        >
          {review.recommendation}
        </span>
      </div>

      {/* Confidential comments to editor */}
      <div>
        <h4 className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">
          Confidential Notes to Editor
        </h4>
        <div className="text-[13px] text-gray-600 bg-gray-50 border border-gray-100 p-4 rounded-lg">
          {review.commentsToEditor}
        </div>
      </div>

      {/* Comments to author (editable by editor before release) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
            Comments to Author
          </h4>
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
              className="w-full p-4 border border-gray-300 rounded-lg text-[13px] min-h-[200px] focus:outline-none focus:ring-2 focus:ring-gray-200"
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
          <div className="text-[13px] text-gray-700 bg-gray-50 border border-gray-100 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">
            {editedComments}
          </div>
        )}
      </div>

      {/* Attached markup file */}
      {review.markupFile && (
        <div>
          <h4 className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">
            Attached File
          </h4>
          <button
            onClick={() => alert(`Download: ${review.markupFile} (Mock)`)}
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
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <Button
            variant="primary"
            onClick={() => onRelease(reviewer.id, editedComments)}
          >
            Release to Author
          </Button>
        </div>
      )}
      {review.releasedToAuthor && (
        <div className="text-[12px] text-gray-500 text-right pt-4 border-t border-gray-100">
          Released to author
        </div>
      )}
    </div>
  );
}

// Author viewing an anonymous review
function AuthorReviewDetail({
  review,
  index,
}: {
  review: Review;
  index: number;
}) {
  const displayComments =
    review.editorModifiedComments || review.commentsToAuthor;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-[18px] font-serif font-bold text-gray-900">
          Reviewer {index + 1}
        </h3>
        <span
          className={`text-[12px] px-2.5 py-1 rounded font-medium ${
            recommendationColors[review.recommendation] || "bg-gray-100"
          }`}
        >
          {review.recommendation}
        </span>
      </div>

      {/* Comments */}
      <div className="text-[14px] text-gray-700 whitespace-pre-wrap leading-relaxed">
        {displayComments}
      </div>

      {/* Attached markup file */}
      {review.markupFile && (
        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={() => alert(`Download: ${review.markupFile} (Mock)`)}
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
    alert(
      `Review submitted (Mock)\nSubmission: ${submissionId}\nRecommendation: ${recommendation}`,
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-[18px] font-serif font-bold text-gray-900">
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
            className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
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
            className="w-full p-4 border border-gray-300 rounded-lg text-[13px] min-h-[120px] focus:outline-none focus:ring-2 focus:ring-gray-200"
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
            className="w-full p-4 border border-gray-300 rounded-lg text-[13px] min-h-[180px] focus:outline-none focus:ring-2 focus:ring-gray-200"
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

export default function ReviewDetail({
  submission,
  reviewer,
  reviewerIndex,
  role,
  isEditor,
  onReleaseReview,
}: ReviewDetailProps) {
  // No reviewer selected
  if (!reviewer) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-[14px] text-gray-400">Select a review to view</p>
      </div>
    );
  }

  const isSubmitted = reviewer.status === "Submitted" && reviewer.review;
  const isPending = reviewer.status === "Pending";

  // Editor view
  if (isEditor) {
    if (isSubmitted) {
      return (
        <EditorReviewDetail reviewer={reviewer} onRelease={onReleaseReview} />
      );
    }
    if (isPending) {
      return (
        <div className="space-y-3">
          <h3 className="text-[18px] font-serif font-bold text-gray-900">
            {reviewer.name}
          </h3>
          <p className="text-[13px] text-gray-500">{reviewer.affiliation}</p>
          {reviewer.expertise && reviewer.expertise.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {reviewer.expertise.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mt-4 text-center">
            <p className="text-[14px] text-gray-500">
              Awaiting review from {reviewer.name}
            </p>
          </div>
        </div>
      );
    }
  }

  // Author view
  if (role === "Author" && isSubmitted && reviewer.review?.releasedToAuthor) {
    return (
      <AuthorReviewDetail review={reviewer.review!} index={reviewerIndex} />
    );
  }

  // Reviewer view
  if (role === "Reviewer") {
    if (isPending) {
      return <ReviewerSubmitForm submissionId={submission.id} />;
    }
    if (isSubmitted) {
      return (
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[18px] font-serif font-bold text-gray-900">
                Your Review
              </h3>
              <p className="text-[12px] text-gray-400 mt-1">
                Submitted {reviewer.review!.submittedDate}
              </p>
            </div>
            <span className="text-[12px] px-2.5 py-1 rounded font-medium bg-gray-100 text-gray-700">
              {reviewer.review!.recommendation}
            </span>
          </div>
          <div className="text-[13px] text-gray-700 whitespace-pre-wrap leading-relaxed">
            {reviewer.review!.commentsToAuthor}
          </div>
        </div>
      );
    }
  }

  return null;
}
