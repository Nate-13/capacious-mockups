"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { useRole } from "@/context/RoleContext";
import {
  getSubmissionById,
  getFilesForSubmission,
  getActivityForSubmission,
} from "@/data/mockData";
import { StatusBadge } from "@/components/ui";
import {
  FilesCard,
  DocumentViewer,
  ReviewsContent,
  ActivityContent,
  Tab,
  TabType,
} from "@/components/submission-detail";
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
  const [activeTab, setActiveTab] = useState<TabType>("submission");

  const isCompact = activeTab !== "submission";

  if (!submission) {
    return (
      <div className="min-h-screen bg-[#EAEAEA] px-6 py-8">
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

  const isEditor = role === "Managing Editor" || role === "Admin";

  const submittedReviews =
    submission.assignedReviewers?.filter(
      (r) => r.status === "Submitted" && r.review
    ) || [];

  const releasedReviews = submittedReviews.filter(
    (r) => r.review?.releasedToAuthor
  );

  const showReviewsTab =
    (isEditor && submittedReviews.length > 0) ||
    (role === "Author" && releasedReviews.length > 0) ||
    (role === "Reviewer" &&
      submission.assignedReviewers &&
      submission.assignedReviewers.length > 0);

  const tabs: Tab[] = [{ id: "submission", label: "Submission" }];
  if (showReviewsTab) {
    const reviewCount = isEditor
      ? submittedReviews.length
      : releasedReviews.length;
    tabs.push({
      id: "reviews",
      label: "Reviews",
      count: reviewCount > 0 ? reviewCount : undefined,
    });
  }
  tabs.push({ id: "activity", label: "Activity" });

  const handleReleaseReview = (reviewerId: string, editedComments: string) => {
    alert(`Review released to author! (Mock action)\nReviewer: ${reviewerId}`);
  };

  // Tabs component
  const TabsComponent = (
    <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 text-[14px] font-medium rounded-md transition-colors ${
            activeTab === tab.id
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-1.5 px-1.5 py-0.5 text-[11px] bg-gray-200 rounded">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div className="h-[calc(100vh-64px)] bg-[#EAEAEA] overflow-hidden">
      <div className="h-full max-w-[1400px] mx-auto px-6 py-5">
        {isCompact ? (
          /* Compact Layout */
          <div className="h-full flex flex-col gap-5">
            <div className="shrink-0 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[12px] font-mono text-gray-400">
                  #{submission.id}
                </span>
                <StatusBadge status={submission.status} />
                <span className="text-[15px] font-semibold text-gray-900 truncate">
                  {submission.title}
                </span>
                <span className="text-[13px] text-gray-500">
                  · {submission.authorName}
                </span>
              </div>
              {TabsComponent}
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="max-w-[900px] mx-auto">
                {activeTab === "reviews" && (
                  <ReviewsContent
                    submission={submission}
                    role={role}
                    isEditor={isEditor}
                    onReleaseReview={handleReleaseReview}
                  />
                )}
                {activeTab === "activity" && (
                  <ActivityContent activity={activity} />
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Expanded L-Shape Layout with Connected Header */
          <div
            className="h-full grid"
            style={{
              gridTemplateColumns: "320px 1fr",
              gridTemplateRows: "auto auto 1fr",
              gap: "0px",
            }}
          >
            {/* Row 1: Article Info Top + Tabs (connected) */}
            <div className="bg-white rounded-tl-lg border border-gray-100 border-b-0 border-r-0 p-5 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-mono text-gray-400">
                  #{submission.id}
                </span>
                <StatusBadge status={submission.status} />
              </div>
            </div>
            <div className="bg-white rounded-tr-lg border border-gray-100 border-b-0 border-l-0 px-5 py-4 flex items-start justify-end">
              {TabsComponent}
            </div>

            {/* Row 2: Article Info Bottom + Document Viewer starts */}
            <div className="bg-white border border-gray-100 border-t-0 border-r-0 rounded-bl-lg p-5 pt-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h1 className="text-[24px] font-serif font-bold text-gray-900 leading-tight mb-2">
                {submission.title}
              </h1>
              <p className="text-[14px] text-gray-600">
                {submission.authorName} · {submission.affiliation}
              </p>
              <p className="text-[13px] text-gray-500 mt-1">
                Submitted {submission.submittedDate}
              </p>
            </div>
            <div className="row-span-2 pl-5 pt-5">
              <div className="h-full">
                <DocumentViewer
                  submission={submission}
                  selectedFile={selectedFile}
                />
              </div>
            </div>

            {/* Row 3: Files Card */}
            <div className="pt-5">
              <FilesCard
                files={files}
                selectedFile={selectedFile}
                onFileSelect={setSelectedFile}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
