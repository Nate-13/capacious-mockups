"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useRole, RoleType } from "@/context/RoleContext";
import { submissions } from "@/data/mockData";
import { Submission } from "@/types";
import DashboardFilters from "@/components/DashboardFilters";
import SubmissionCard from "@/components/SubmissionCard";

// Role-based title mapping
const ROLE_TITLES: Record<RoleType, string> = {
  Author: "My Submissions",
  "Managing Editor": "All Submissions",
  Reviewer: "Assigned Reviews",
  "Copy Editor": "Copy Editing Queue",
  Admin: "All Submissions",
};

// Role-based empty state text
const EMPTY_STATE_TEXT: Record<RoleType, { title: string; subtitle: string }> =
  {
    Author: {
      title: "No submissions yet",
      subtitle: "Submit your first manuscript to get started",
    },
    "Managing Editor": {
      title: "No submissions found",
      subtitle: "There are no submissions matching your filters",
    },
    Reviewer: {
      title: "No reviews assigned",
      subtitle: "You have no submissions assigned for review",
    },
    "Copy Editor": {
      title: "No submissions in queue",
      subtitle: "There are no submissions ready for copy editing",
    },
    Admin: {
      title: "No submissions found",
      subtitle: "There are no submissions matching your filters",
    },
  };

// Convert status to filter value format (lowercase with hyphens)
function statusToFilterValue(status: string): string {
  return status.toLowerCase().replace(/\s+/g, "-");
}

export default function DashboardPage() {
  const router = useRouter();
  const { role } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Determine if filters should be shown (Editor and Admin only)
  const showFilters = role === "Managing Editor" || role === "Admin";

  // Filter submissions based on role and filters
  const filteredSubmissions = useMemo(() => {
    let result: Submission[] = [...submissions];

    // Role-based filtering
    switch (role) {
      case "Author":
        // Author sees only their submissions (filter by authorName "Jane Doe")
        result = result.filter(
          (submission) => submission.authorName === "Jane Doe",
        );
        break;
      case "Reviewer":
        // Reviewer sees only assigned submissions
        result = result.filter(
          (submission) =>
            submission.assignedReviewers &&
            submission.assignedReviewers.length > 0,
        );
        break;
      case "Copy Editor":
        // Copy Editor sees only "In Copy Editing" status
        result = result.filter(
          (submission) => submission.status === "In Copy Editing",
        );
        break;
      case "Managing Editor":
      case "Admin":
        // These roles see all submissions
        break;
    }

    // Search filter (applies to all roles)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (submission) =>
          submission.title.toLowerCase().includes(query) ||
          submission.authorName.toLowerCase().includes(query),
      );
    }

    // Status filter (only for roles that have filters)
    if (statusFilter && showFilters) {
      result = result.filter(
        (submission) => statusToFilterValue(submission.status) === statusFilter,
      );
    }

    return result;
  }, [role, searchQuery, statusFilter, showFilters]);

  // Handle card click navigation
  const handleCardClick = (submissionId: string) => {
    router.push(`/dashboard/${submissionId}`);
  };

  // Get role-specific title
  const pageTitle = ROLE_TITLES[role];

  // Get role-specific empty state
  const emptyState = EMPTY_STATE_TEXT[role];

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-[32px] font-serif font-bold text-black mb-2">
            {pageTitle}
          </h1>
          <p className="text-[15px] text-[#666]">
            {filteredSubmissions.length} submission
            {filteredSubmissions.length !== 1 ? "s" : ""}
          </p>
        </header>

        {/* Filters Section (Editor/Admin only) */}
        {showFilters && (
          <DashboardFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        )}

        {/* Submissions List or Empty State */}
        {filteredSubmissions.length > 0 ? (
          <div>
            {filteredSubmissions.map((submission) => (
              <SubmissionCard
                key={submission.id}
                id={submission.id}
                title={submission.title}
                author={submission.authorName}
                status={submission.status}
                submittedDate={submission.submittedDate}
                metaInfo={
                  submission.assignedReviewers &&
                  submission.assignedReviewers.length > 0
                    ? `${submission.assignedReviewers.length} reviewer${submission.assignedReviewers.length !== 1 ? "s" : ""} assigned`
                    : undefined
                }
                onClick={() => handleCardClick(submission.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-[60px]">
            {/* Icon placeholder */}
            <div className="w-[48px] h-[48px] border border-[#E0E0E0] rounded-lg mb-4 flex items-center justify-center">
              <span className="text-[#999] text-xl">[ ]</span>
            </div>

            {/* Empty state text */}
            <h2 className="text-[18px] font-medium text-black mb-2">
              {emptyState.title}
            </h2>
            <p className="text-[14px] text-[#666] mb-6">
              {emptyState.subtitle}
            </p>

            {/* Submit button (for Author role) */}
            {role === "Author" && (
              <button
                onClick={() => router.push("/submit")}
                className="
                  px-6 py-3
                  bg-black text-white
                  text-[14px] font-medium
                  rounded-lg
                  hover:bg-gray-800
                  transition-colors
                "
              >
                Submit Manuscript
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
