"use client";

import { use, useState, useMemo, useRef, useEffect } from "react";
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
  ActivityContent,
  Tab,
  TabType,
} from "@/components/submission-detail";
import EditorActions from "@/components/submission-detail/EditorActions";
import CopyEditingContent from "@/components/submission-detail/CopyEditingContent";
import ReviewsSidebar from "@/components/submission-detail/ReviewsSidebar";
import ReviewDetail from "@/components/submission-detail/ReviewDetail";
import { ContentType, FileVersion, SubmissionStatus } from "@/types";

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
  const [selectedReviewerId, setSelectedReviewerId] = useState<string | null>(
    null,
  );
  const [contentTypeOpen, setContentTypeOpen] = useState(false);
  const contentTypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        contentTypeRef.current &&
        !contentTypeRef.current.contains(e.target as Node)
      ) {
        setContentTypeOpen(false);
      }
    }
    if (contentTypeOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [contentTypeOpen]);

  // Sidebar stays open for submission and reviews tabs
  const showSidebar = activeTab === "submission" || activeTab === "reviews";
  // Compact header (title/author in top bar) for all non-submission tabs
  const showCompactHeader = activeTab !== "submission";

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

  // Auto-select the first relevant reviewer when switching to reviews tab
  const effectiveReviewerId = useMemo(() => {
    if (activeTab !== "reviews") return null;
    const reviewers = submission.assignedReviewers || [];
    // If we have a valid selection, keep it
    if (
      selectedReviewerId &&
      reviewers.find((r) => r.id === selectedReviewerId)
    )
      return selectedReviewerId;
    // Auto-select first submitted, or first reviewer
    const firstSubmitted = reviewers.find((r) => r.status === "Submitted");
    return firstSubmitted?.id || reviewers[0]?.id || null;
  }, [activeTab, selectedReviewerId, submission.assignedReviewers]);

  const selectedReviewer =
    submission.assignedReviewers?.find((r) => r.id === effectiveReviewerId) ||
    null;

  const selectedReviewerIndex =
    submission.assignedReviewers?.findIndex(
      (r) => r.id === effectiveReviewerId,
    ) ?? -1;

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

  const headerSpring = {
    type: "spring" as const,
    stiffness: 300,
    damping: 22,
  };

  const textSlideIn = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    delay: 0.15,
  };

  // Tabs component
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
            {/* Top Bar */}
            <motion.div
              layout
              className={`shrink-0 bg-white border border-gray-100 px-5 py-3 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
                showSidebar
                  ? "rounded-t-lg rounded-br-lg border-b-0"
                  : "rounded-lg"
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
                {isEditor ? (
                  <div className="relative shrink-0" ref={contentTypeRef}>
                    <button
                      onClick={() => setContentTypeOpen(!contentTypeOpen)}
                      className="group text-[11px] text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                      {submission.contentType}
                      <span className="inline-flex items-center align-middle w-0 group-hover:w-3 overflow-hidden transition-all duration-150">
                        <svg
                          className={`w-2.5 h-2.5 ml-1 shrink-0 opacity-50 transition-transform duration-150 ${contentTypeOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </button>
                    {contentTypeOpen && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
                        {(
                          [
                            "Article",
                            "Dialogue",
                            "Interstice",
                            "Introduction",
                            "Afterword",
                            "Book Review",
                          ] as ContentType[]
                        ).map((ct) => (
                          <button
                            key={ct}
                            onClick={() => {
                              alert(
                                `Content type changed to "${ct}" (Mock)\nSubmission: ${submission.id}`,
                              );
                              setContentTypeOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-50 transition-colors ${
                              ct === submission.contentType
                                ? "text-gray-900 font-medium"
                                : "text-gray-600"
                            }`}
                          >
                            {ct}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-[11px] text-gray-400 shrink-0">
                    {submission.contentType}
                  </span>
                )}
                {/* Title and author slide in when not on submission tab */}
                <AnimatePresence>
                  {showCompactHeader && (
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
                  {showCompactHeader && (
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
                        <span className="text-[16px] text-gray-300 mx-0.5">
                          |
                        </span>{" "}
                        {submission.authorName}
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
                {/* Left Sidebar - stays open for submission + reviews, collapses for others */}
                <motion.div
                  initial={false}
                  animate={{
                    width: showSidebar ? 320 : 0,
                    opacity: showSidebar ? 1 : 0,
                  }}
                  transition={{
                    width: {
                      ...headerSpring,
                      delay: showSidebar ? 0 : 0.15,
                    },
                    opacity: {
                      duration: showSidebar ? 0.2 : 0.1,
                    },
                  }}
                  className="shrink-0 overflow-hidden"
                >
                  <div className="w-[320px] h-full flex flex-col">
                    {/* Connecting card - attaches to header bar, resizes smoothly */}
                    <motion.div
                      layout
                      className="bg-white border border-gray-100 border-t-0 rounded-b-lg px-5 pt-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)] shrink-0 overflow-hidden"
                      transition={headerSpring}
                    >
                      <div className="mb-4">
                        <div className="w-full h-[1px] bg-gray-200" />
                      </div>
                      {/* Article info - collapses when not on submission */}
                      <motion.div
                        initial={false}
                        animate={{
                          height:
                            activeTab === "submission" ? "auto" : 0,
                          opacity:
                            activeTab === "submission" ? 1 : 0,
                        }}
                        transition={headerSpring}
                        className="overflow-hidden"
                      >
                        <div className="pb-4">
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

                      {/* Reviews list - collapses when not on reviews */}
                      <motion.div
                        initial={false}
                        animate={{
                          height:
                            activeTab === "reviews" ? "auto" : 0,
                          opacity:
                            activeTab === "reviews" ? 1 : 0,
                        }}
                        transition={headerSpring}
                        className="overflow-hidden"
                      >
                        <div className="pb-4">
                          <ReviewsSidebar
                            submission={submission}
                            role={role}
                            isEditor={isEditor}
                            selectedReviewerId={effectiveReviewerId}
                            onSelectReviewer={setSelectedReviewerId}
                          />
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Files & editor actions - collapses when not on submission */}
                    <motion.div
                      initial={false}
                      animate={{
                        height:
                          activeTab === "submission" ? "auto" : 0,
                        opacity:
                          activeTab === "submission" ? 1 : 0,
                      }}
                      transition={headerSpring}
                      className="overflow-hidden"
                    >
                      <div className="pt-5">
                        <FilesCard
                          files={files}
                          selectedFile={selectedFile}
                          onFileSelect={setSelectedFile}
                          submissionStatus={submission.status}
                          role={role}
                        />
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
                  </div>
                </motion.div>

                {/* Right Content */}
                <div className="flex-1 min-w-0">
                  <AnimatePresence mode="wait" initial={false}>
                    {activeTab === "submission" && (
                      <motion.div
                        key="doc-viewer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring" as const,
                          stiffness: 300,
                          damping: 26,
                          delay: 0.12,
                        }}
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
                    {activeTab === "reviews" && (
                      <motion.div
                        key="review-detail"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring" as const,
                          stiffness: 300,
                          damping: 26,
                          delay: 0.12,
                        }}
                        className="h-full pl-5 pt-5 overflow-y-auto"
                      >
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <ReviewDetail
                            submission={submission}
                            reviewer={selectedReviewer}
                            reviewerIndex={selectedReviewerIndex}
                            role={role}
                            isEditor={isEditor}
                            onReleaseReview={handleReleaseReview}
                          />
                        </div>
                      </motion.div>
                    )}
                    {(activeTab === "activity" ||
                      activeTab === "copy-editing") && (
                      <motion.div
                        key="compact-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring" as const,
                          stiffness: 300,
                          damping: 26,
                          delay: 0.12,
                        }}
                        className="h-full overflow-y-auto pt-5"
                      >
                        <div className="max-w-[900px] mx-auto">
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
