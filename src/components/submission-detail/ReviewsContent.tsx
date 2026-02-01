"use client";

import { useState } from "react";
import { Submission, Reviewer, Review } from "@/types";
import { Button } from "@/components/ui";

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
  const review = reviewer.review!;
  const [editedComments, setEditedComments] = useState(
    review.editorModifiedComments || review.commentsToAuthor
  );
  const [isEditing, setIsEditing] = useState(false);

  const recommendationColors: Record<string, string> = {
    Accept: "bg-green-100 text-green-800",
    "Minor Revisions": "bg-blue-100 text-blue-800",
    "Major Revisions": "bg-yellow-100 text-yellow-800",
    Reject: "bg-red-100 text-red-800",
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
              <span className="ml-2 text-green-600">
                · Released {review.releasedDate}
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
                className="text-[12px] px-3 py-1.5 bg-gray-800 text-white rounded hover:bg-gray-700"
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
        <div className="text-[12px] text-green-600 text-right pt-2 border-t border-gray-100">
          ✓ Released to author
        </div>
      )}
    </div>
  );
}

// Author's view of an anonymous review
function AuthorReviewCard({ review, index }: { review: Review; index: number }) {
  const recommendationColors: Record<string, string> = {
    Accept: "bg-green-100 text-green-800",
    "Minor Revisions": "bg-blue-100 text-blue-800",
    "Major Revisions": "bg-yellow-100 text-yellow-800",
    Reject: "bg-red-100 text-red-800",
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
      (r) => r.status === "Submitted" && r.review
    ) || [];

  // For authors: only show reviews that have been released
  const releasedReviews = submittedReviews.filter(
    (r) => r.review?.releasedToAuthor
  );

  return (
    <div className="space-y-6">
      {/* Editor view */}
      {isEditor && submittedReviews.length > 0 && (
        <>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-[15px] font-semibold text-gray-800 mb-2">
              Review Management
            </h2>
            <p className="text-[13px] text-gray-500">
              Review submitted feedback and optionally edit comments before
              releasing to the author.
            </p>
          </div>
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
        </>
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
                    <span className="text-[12px] text-green-600">
                      ✓ Submitted
                    </span>
                  ) : (
                    <span className="text-[12px] text-gray-500">
                      Due: {reviewer.dueDate}
                    </span>
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
      {((isEditor && submittedReviews.length === 0) ||
        (role === "Author" && releasedReviews.length === 0)) && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-[14px] text-gray-500">No reviews available yet.</p>
        </div>
      )}
    </div>
  );
}
