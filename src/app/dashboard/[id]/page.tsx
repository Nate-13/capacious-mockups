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
import EditorActions from "@/components/submission-detail/EditorActions";
import CopyEditingContent from "@/components/submission-detail/CopyEditingContent";
import { FileVersion, SubmissionStatus } from "@/types";

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
    files.length > 0 ? files[files.length - 1] : null,
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
      (r) => r.status === "Submitted" && r.review,
    ) || [];

  const releasedReviews = submittedReviews.filter(
    (r) => r.review?.releasedToAuthor,
  );

  const showReviewsTab =
    (isEditor && submittedReviews.length > 0) ||
    (role === "Author" && releasedReviews.length > 0) ||
    (role === "Reviewer" &&
      submission.assignedReviewers &&
      submission.assignedReviewers.length > 0);

  const showCopyEditingTab =
    submission.status === "In Copy Editing" ||
    submission.status === "Ready for Production" ||
    submission.status === "Published";

  const tabs: Tab[] = [{ id: "submission", label: "Submission" }];
  if (showReviewsTab) {
    const reviewCount = isEditor
      ? submittedReviews.length
      : role === "Author"
        ? releasedReviews.length
        : submittedReviews.length;
    tabs.push({
      id: "reviews",
      label: "Reviews",
      count: reviewCount > 0 ? reviewCount : undefined,
    });
  }
  if (showCopyEditingTab) {
    tabs.push({ id: "copy-editing", label: "Copy Editing" });
  }
  tabs.push({ id: "activity", label: "Activity" });

  const handleReleaseReview = (reviewerId: string, editedComments: string) => {
    alert(`Review released to author! (Mock action)\nReviewer: ${reviewerId}`);
  };

  const handleEditorAction = (action: string) => {
    // Mock action handler
  };

  const handleStatusOverride = (newStatus: SubmissionStatus) => {
    alert(
      `Status overridden to "${newStatus}" (Mock)\nSubmission: ${submission.id}`,
    );
  };

  // Animation configuration
  const springTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 35,
  };

  // Bouncier spring for the header bar collapse
  const headerSpring = {
    type: "spring" as const,
    stiffness: 300,
    damping: 22,
  };

  // Slide-fade for title/author appearing in compact header
  const textSlideIn = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    delay: 0.15,
  };

  const fadeTransition = {
    duration: 0.15,
    ease: "easeOut" as const,
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
              className={`shrink-0 bg-white border border-gray-100 px-5 py-3 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
                isCompact
                  ? "rounded-lg"
                  : "rounded-t-lg rounded-br-lg border-b-0"
              }`}
              transition={headerSpring}
            >
              <div className="flex items-center gap-3 min-w-0">
                <motion.div
                  layoutId="status-badge"
                  transition={springTransition}
                >
                  <StatusBadge
                    status={submission.status}
                    onStatusChange={isEditor ? handleStatusOverride : undefined}
                  />
                </motion.div>
                <span className="text-[11px] text-gray-400 shrink-0">
                  {submission.contentType}
                </span>
                {/* Title and author slide in from left when compact */}
                <AnimatePresence>
                  {isCompact && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[16px] text-gray-200 shrink-0"
                      transition={{ duration: 0.1 }}
                    >
                      |
                    </motion.span>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {isCompact && (
                    <>
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-[15px] font-semibold text-gray-900 truncate"
                        transition={textSlideIn}
                      >
                        {submission.title}
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="text-[13px] text-gray-500 shrink-0"
                        transition={{ ...textSlideIn, delay: 0.2 }}
                      >
                        <span className="text-[16px] text-gray-300 mx-0.5">|</span> {submission.authorName}
                      </motion.span>
                    </>
                  )}
                </AnimatePresence>
              </div>
              {TabsComponent}
            </motion.div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden pt-0">
              <div className="h-full flex">
                {/* Left Sidebar - animates width to collapse */}
                <motion.div
                  initial={false}
                  animate={{
                    width: isCompact ? 0 : 320,
                    opacity: isCompact ? 0 : 1,
                  }}
                  transition={headerSpring}
                  className="shrink-0 overflow-hidden"
                >
                  <div className="w-[320px]">
                    {/* Article Info - collapses height into header */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isCompact ? 0 : "auto",
                      }}
                      transition={{
                        type: "spring" as const,
                        stiffness: 350,
                        damping: 28,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white border border-gray-100 border-t-0 rounded-b-lg px-5 pb-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                        <div className="text-[20px] font-serif font-bold text-gray-900 leading-tight mb-1">
                          {submission.title}
                        </div>
                        <p className="text-[14px] text-gray-600">
                          {submission.authorName} &middot;{" "}
                          {submission.affiliation}
                        </p>
                        <p className="text-[13px] text-gray-500 mt-1">
                          Submitted {submission.submittedDate}
                        </p>
                      </div>
                    </motion.div>

                    {/* Files Card */}
                    <div className="pt-5">
                      <FilesCard
                        files={files}
                        selectedFile={selectedFile}
                        onFileSelect={setSelectedFile}
                        submissionStatus={submission.status}
                        role={role}
                      />
                    </div>

                    {/* Editor Actions */}
                    {isEditor && (
                      <div className="pt-5">
                        <EditorActions
                          submission={submission}
                          onAction={handleEditorAction}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Right Content - swaps between doc viewer and compact content */}
                <div className="flex-1 min-w-0">
                  <AnimatePresence mode="wait" initial={false}>
                    {isCompact ? (
                      <motion.div
                        key="compact-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{
                          type: "spring" as const,
                          stiffness: 300,
                          damping: 26,
                          delay: 0.12,
                        }}
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
                            <ActivityContent
                              activity={activity}
                              files={files}
                            />
                          )}
                          {activeTab === "copy-editing" && (
                            <CopyEditingContent
                              submission={submission}
                              files={files}
                              role={role}
                              isEditor={isEditor}
                            />
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="doc-viewer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={fadeTransition}
                        className="h-full pl-5 pt-5"
                      >
                        <div className="h-full">
                          <DocumentViewer
                            submission={submission}
                            selectedFile={selectedFile}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
