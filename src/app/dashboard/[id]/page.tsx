"use client";

import { use } from "react";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";
import {
  getSubmissionById,
  getFilesForSubmission,
  getActivityForSubmission,
} from "@/data/mockData";
import FilesSection from "@/components/FilesSection";
import DocumentPreview from "@/components/DocumentPreview";
import ReviewersSection from "@/components/ReviewersSection";
import { StatusBadge, Button } from "@/components/ui";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SubmissionDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { role } = useRole();

  const submission = getSubmissionById(id);
  const files = getFilesForSubmission(id);
  const activity = getActivityForSubmission(id);

  // Handle submission not found
  if (!submission) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/dashboard"
            className="text-[14px] text-gray-500 hover:text-black transition-colors inline-block mb-6"
          >
            &larr; Back to dashboard
          </Link>
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <h1 className="text-[24px] font-serif text-gray-600">
              Submission not found
            </h1>
            <p className="text-[14px] text-gray-500 mt-2">
              The submission you are looking for does not exist or has been
              removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Determine if this is a peer review stage for showing reviewers
  const showReviewers =
    submission.status === "In Peer Review" ||
    submission.status === "Revision Requested" ||
    submission.status === "Conditional Accept";

  // Determine if the user is an editor (for ReviewersSection)
  const isEditor = role === "Managing Editor" || role === "Admin";

  // Determine if all reviews are complete (for editor decision buttons)
  const allReviewsComplete =
    submission.assignedReviewers &&
    submission.assignedReviewers.length > 0 &&
    submission.assignedReviewers.every((r) => r.status === "Submitted");

  // Render action buttons based on role and status
  const renderActions = () => {
    // Editor viewing "In Desk Review"
    if (isEditor && submission.status === "In Desk Review") {
      return (
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Approve for Peer Review</Button>
          <Button variant="secondary">Request Revisions</Button>
          <Button variant="destructive">Desk Reject</Button>
        </div>
      );
    }

    // Editor viewing "In Peer Review" with all reviews complete
    if (
      isEditor &&
      submission.status === "In Peer Review" &&
      allReviewsComplete
    ) {
      return (
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Accept</Button>
          <Button variant="secondary">Accept w/ Minor Changes</Button>
          <Button variant="secondary">Conditional Accept</Button>
          <Button variant="secondary">Revise &amp; Resubmit</Button>
          <Button variant="destructive">Reject</Button>
        </div>
      );
    }

    // Author viewing any status
    if (role === "Author") {
      return (
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Upload Revised Version</Button>
          <Button variant="destructive">Withdraw Submission</Button>
        </div>
      );
    }

    // Reviewer viewing assigned submission
    if (role === "Reviewer") {
      return (
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Submit Review</Button>
        </div>
      );
    }

    return null;
  };

  const actions = renderActions();

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="text-[14px] text-gray-500 hover:text-black transition-colors inline-block mb-6"
        >
          &larr; Back to dashboard
        </Link>

        {/* Two-column layout */}
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Column - Info, Files, Reviewers, Activity, Actions */}
          <div className="flex-1 min-w-0 xl:max-w-[600px]">
            {/* Submission Header Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <p className="text-[13px] font-mono text-gray-500 mb-2">
                Submission #{submission.id}
              </p>
              <h1 className="text-[24px] font-serif font-bold mb-4 leading-tight">
                {submission.title}
              </h1>

              <div className="space-y-1.5 text-[14px]">
                <p>
                  <span className="font-semibold text-gray-700">Author:</span>{" "}
                  <span className="text-gray-600">{submission.authorName}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Affiliation:</span>{" "}
                  <span className="text-gray-600">{submission.affiliation}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Submitted:</span>{" "}
                  <span className="text-gray-600">{submission.submittedDate}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Status:</span>
                  <StatusBadge status={submission.status} />
                </p>
              </div>
            </div>

            {/* Files Section */}
            <div className="mb-6">
              <FilesSection files={files} />
            </div>

            {/* Reviewers Section (Only for Peer Review stages) */}
            {showReviewers && (
              <div className="mb-6">
                <ReviewersSection
                  reviewers={submission.assignedReviewers || []}
                  isEditor={isEditor}
                />
              </div>
            )}

            {/* Activity & History Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
              <h2 className="text-[16px] font-serif font-semibold mb-4">
                Activity &amp; History
              </h2>
              <div className="space-y-2">
                {activity.map((entry, index) => (
                  <div key={index} className="flex items-start text-[13px]">
                    <span className="text-gray-400 shrink-0 w-[100px]">
                      {entry.date}
                    </span>
                    <span className="text-gray-300 mx-2">&bull;</span>
                    <span className="text-gray-600">{entry.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Panel (Role-based) */}
            {actions && (
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h2 className="text-[16px] font-serif font-semibold mb-4">
                  Actions
                </h2>
                {actions}
              </div>
            )}
          </div>

          {/* Right Column - Document Preview */}
          <div className="flex-1 min-w-0">
            <DocumentPreview title={submission.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
