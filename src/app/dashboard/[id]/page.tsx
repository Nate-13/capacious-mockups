"use client";

import { use, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
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

  // Animation configuration
  const springTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 35,
  };

  const fadeTransition = {
    duration: 0.2,
    ease: "easeInOut" as const,
  };

  // Tabs component with layoutId for morphing
  const TabsComponent = (
    <motion.div
      layoutId="tabs"
      className="flex items-center gap-1 bg-gray-100 rounded-lg p-1"
      transition={springTransition}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 text-[14px] font-medium rounded-md transition-colors ${
            activeTab === tab.id
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
    </motion.div>
  );

  return (
    <div className="h-[calc(100vh-64px)] bg-[#EAEAEA] overflow-hidden">
      <div className="h-full max-w-[1400px] mx-auto px-6 py-5">
        <LayoutGroup>
          <div className="h-full flex flex-col">
            {/* Top Bar - Full Width */}
            <motion.div
              layout
              className={`shrink-0 bg-white border border-gray-100 px-5 py-3 flex items-center justify-between ${
                isCompact ? "rounded-lg" : "rounded-t-lg rounded-br-lg border-b-0"
              }`}
              transition={springTransition}
            >
              <div className="flex items-center gap-3 min-w-0">
                <motion.span
                  layoutId="submission-id"
                  className="text-[12px] font-mono text-gray-400 shrink-0"
                  transition={springTransition}
                >
                  #{submission.id}
                </motion.span>
                <motion.div layoutId="status-badge" transition={springTransition}>
                  <StatusBadge status={submission.status} />
                </motion.div>
                {/* Title and author morph into header when compact */}
                <AnimatePresence>
                  {isCompact && (
                    <>
                      <motion.span
                        layoutId="title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[15px] font-semibold text-gray-900 truncate"
                        transition={springTransition}
                      >
                        {submission.title}
                      </motion.span>
                      <motion.span
                        layoutId="author"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[13px] text-gray-500 shrink-0"
                        transition={springTransition}
                      >
                        · {submission.authorName}
                      </motion.span>
                    </>
                  )}
                </AnimatePresence>
              </div>
              {TabsComponent}
            </motion.div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden pt-0">
              <AnimatePresence mode="wait" initial={false}>
                {isCompact ? (
                  /* Compact Content - Reviews or Activity */
                  <motion.div
                    key="compact-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={fadeTransition}
                    className="h-full overflow-y-auto pt-5"
                  >
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
                  </motion.div>
                ) : (
                  /* Expanded L-Shape Content */
                  <motion.div
                    key="expanded-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={fadeTransition}
                    className="h-full grid"
                    style={{
                      gridTemplateColumns: "320px 1fr",
                      gridTemplateRows: "auto 1fr",
                    }}
                  >
                    {/* Article Info - sticks out on left, connected to top bar */}
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={springTransition}
                      className="bg-white border border-gray-100 border-t-0 rounded-b-lg p-5"
                    >
                      <motion.h1
                        layoutId="title"
                        className="text-[24px] font-serif font-bold text-gray-900 leading-tight mb-2"
                        transition={springTransition}
                      >
                        {submission.title}
                      </motion.h1>
                      <motion.p
                        layoutId="author"
                        className="text-[14px] text-gray-600"
                        transition={springTransition}
                      >
                        {submission.authorName} · {submission.affiliation}
                      </motion.p>
                      <p className="text-[13px] text-gray-500 mt-1">
                        Submitted {submission.submittedDate}
                      </p>
                    </motion.div>

                    {/* Document Viewer - spans both rows on right */}
                    <div className="row-span-2 pl-5 pt-5">
                      <div className="h-full">
                        <DocumentViewer
                          submission={submission}
                          selectedFile={selectedFile}
                        />
                      </div>
                    </div>

                    {/* Files Card - below article info */}
                    <div className="pt-5">
                      <FilesCard
                        files={files}
                        selectedFile={selectedFile}
                        onFileSelect={setSelectedFile}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
