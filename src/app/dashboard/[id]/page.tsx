"use client";

import { use, useState } from "react";
import { useRole } from "@/context/RoleContext";
import {
  getSubmissionById,
  getFilesForSubmission,
  getActivityForSubmission,
} from "@/data/mockData";
import ReviewersSection from "@/components/ReviewersSection";
import { StatusBadge, Button } from "@/components/ui";
import { FileVersion } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SubmissionDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { role } = useRole();

  const submission = getSubmissionById(id);
  const files = getFilesForSubmission(id);
  const activity = getActivityForSubmission(id);

  const [selectedFile, setSelectedFile] = useState<FileVersion | null>(
    files.length > 0 ? files[files.length - 1] : null
  );

  if (!submission) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <h1 className="text-[24px] font-serif text-gray-600">
              Submission not found
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const showReviewers =
    submission.status === "In Peer Review" ||
    submission.status === "Revision Requested" ||
    submission.status === "Conditional Accept";

  const isEditor = role === "Managing Editor" || role === "Admin";

  const allReviewsComplete =
    submission.assignedReviewers &&
    submission.assignedReviewers.length > 0 &&
    submission.assignedReviewers.every((r) => r.status === "Submitted");

  const renderActions = () => {
    if (isEditor && submission.status === "In Desk Review") {
      return (
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Approve for Peer Review</Button>
          <Button variant="secondary">Request Revisions</Button>
          <Button variant="destructive">Desk Reject</Button>
        </div>
      );
    }

    if (isEditor && submission.status === "In Peer Review" && allReviewsComplete) {
      return (
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Accept</Button>
          <Button variant="secondary">Accept w/ Minor</Button>
          <Button variant="secondary">Revise & Resubmit</Button>
          <Button variant="destructive">Reject</Button>
        </div>
      );
    }

    if (role === "Author") {
      return (
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Upload Revision</Button>
          <Button variant="destructive">Withdraw</Button>
        </div>
      );
    }

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
    <div className="min-h-screen bg-[#EAEAEA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[12px] font-mono text-gray-400">#{submission.id}</span>
            <StatusBadge status={submission.status} />
          </div>
          <h1 className="text-[22px] font-serif font-bold leading-snug mb-1">
            {submission.title}
          </h1>
          <p className="text-[14px] text-gray-500">
            {submission.authorName} · {submission.affiliation} · {submission.submittedDate}
          </p>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* File Viewer Section */}
        <div className="flex gap-5" style={{ minHeight: "1000px" }}>
          {/* Left - File Picker */}
          <div className="w-[180px] shrink-0">
            <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wide px-3 mb-2">
              Files
            </div>
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors flex items-center gap-2 ${
                  selectedFile?.id === file.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <svg className="w-4 h-4 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="truncate">{file.filename}</span>
              </button>
            ))}
          </div>

          {/* Right - Document Viewer */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Document */}
            <div className="flex-1 bg-[#525252] rounded-lg p-6 flex justify-center">
              <div className="bg-white w-full max-w-[700px] shadow-xl min-h-[950px]">
                <div className="p-12">
                  <h1 className="text-[22px] font-serif text-center mb-8 leading-tight">
                    {submission.title}
                  </h1>

                  <div className="text-[14px] font-serif leading-[1.9] text-gray-700">
                    <p className="mb-5">
                      <strong>Abstract:</strong> Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <h2 className="text-[16px] font-serif font-semibold mt-8 mb-4">
                      1. Introduction
                    </h2>

                    <p className="mb-5">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                      cupidatat non proident, sunt in culpa qui officia deserunt mollit
                      anim id est laborum.
                    </p>

                    <p className="mb-5">
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                      accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                      quae ab illo inventore veritatis et quasi architecto beatae vitae.
                    </p>

                    <h2 className="text-[16px] font-serif font-semibold mt-8 mb-4">
                      2. Methods
                    </h2>

                    <p className="mb-5">
                      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                      aut fugit, sed quia consequuntur magni dolores eos qui ratione
                      voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                      ipsum quia dolor sit amet, consectetur, adipisci velit.
                    </p>

                    <p className="mb-5">
                      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
                      suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
                    </p>

                    <h2 className="text-[16px] font-serif font-semibold mt-8 mb-4">
                      3. Results
                    </h2>

                    <p className="mb-5">
                      At vero eos et accusamus et iusto odio dignissimos ducimus qui
                      blanditiis praesentium voluptatum deleniti atque corrupti quos
                      dolores et quas molestias excepturi sint occaecati cupiditate.
                    </p>

                    <h2 className="text-[16px] font-serif font-semibold mt-8 mb-4">
                      4. Discussion
                    </h2>

                    <p className="mb-5">
                      Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                      impedit quo minus id quod maxime placeat facere possimus, omnis
                      voluptas assumenda est, omnis dolor repellendus.
                    </p>

                    <p>
                      Temporibus autem quibusdam et aut officiis debitis aut rerum
                      necessitatibus saepe eveniet ut et voluptates repudiandae sint et
                      molestiae non recusandae.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left - Activity */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-[15px] font-semibold text-gray-800 mb-4">Activity</h2>
            <div className="space-y-3">
              {activity.map((entry, index) => (
                <div key={index} className="text-[13px] flex gap-3">
                  <span className="text-gray-400 shrink-0 w-[85px]">{entry.date}</span>
                  <span className="text-gray-600">{entry.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Actions or Reviewers */}
          <div className="space-y-6">
            {actions && (
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h2 className="text-[15px] font-semibold text-gray-800 mb-4">Actions</h2>
                {actions}
              </div>
            )}

            {showReviewers && (
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <ReviewersSection
                  reviewers={submission.assignedReviewers || []}
                  isEditor={isEditor}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
