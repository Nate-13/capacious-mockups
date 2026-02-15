"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useRole, RoleType } from "@/context/RoleContext";
import { submissions } from "@/data/mockData";
import { Submission } from "@/types";
import DashboardFilters from "@/components/DashboardFilters";
import SubmissionCard from "@/components/SubmissionCard";

// Convert status to filter value format (lowercase with hyphens)
function statusToFilterValue(status: string): string {
  return status.toLowerCase().replace(/\s+/g, "-");
}

export default function DashboardPage() {
  const router = useRouter();
  const { role } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

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

    // Type filter (only for roles that have filters)
    if (typeFilter && showFilters) {
      result = result.filter(
        (submission) => submission.contentType === typeFilter,
      );
    }

    return result;
  }, [role, searchQuery, statusFilter, typeFilter, showFilters]);

  // Compute meta info based on role and submission status
  const getMetaInfo = (submission: Submission): string | undefined => {
    if (
      role === "Copy Editor" &&
      submission.assignedCopyEditors &&
      submission.assignedCopyEditors.length > 0
    ) {
      const editors = submission.assignedCopyEditors
        .map((ce) => ce.name)
        .join(", ");
      return `Copy editor${submission.assignedCopyEditors.length !== 1 ? "s" : ""}: ${editors}`;
    }

    if (submission.status === "In Copy Editing") {
      if (
        submission.assignedCopyEditors &&
        submission.assignedCopyEditors.length > 0
      ) {
        const editors = submission.assignedCopyEditors
          .map((ce) => ce.name)
          .join(", ");
        return `Copy editor${submission.assignedCopyEditors.length !== 1 ? "s" : ""}: ${editors}`;
      }
    }

    if (
      submission.status === "In Peer Review" &&
      submission.assignedReviewers &&
      submission.assignedReviewers.length > 0
    ) {
      const submitted = submission.assignedReviewers.filter(
        (r) => r.status === "Submitted",
      ).length;
      const total = submission.assignedReviewers.length;
      return `${submitted}/${total} review${total !== 1 ? "s" : ""} submitted`;
    }

    if (
      submission.assignedReviewers &&
      submission.assignedReviewers.length > 0
    ) {
      return `${submission.assignedReviewers.length} reviewer${submission.assignedReviewers.length !== 1 ? "s" : ""} assigned`;
    }

    if (submission.status === "Accepted") {
      return "Ready for copy editing";
    }

    return undefined;
  };

  // Determine if a submission needs the current user's action
  const getActionNeeded = (submission: Submission): boolean => {
    switch (role) {
      case "Author":
        return ["Revise & Resubmit", "Accept with Minor Changes", "Conditional Accept"].includes(submission.status);
      case "Reviewer":
        return (
          submission.assignedReviewers?.some((r) => r.status === "Pending") ??
          false
        );
      case "Copy Editor":
        return (
          submission.assignedCopyEditors?.some(
            (ce) => ce.status === "Assigned" || ce.status === "In Progress",
          ) ?? false
        );
      case "Managing Editor":
      case "Admin": {
        if (submission.status === "In Desk Review") return true;
        if (
          submission.status === "In Peer Review" &&
          submission.assignedReviewers &&
          submission.assignedReviewers.length > 0 &&
          submission.assignedReviewers.every((r) => r.status === "Submitted")
        )
          return true;
        return false;
      }
      default:
        return false;
    }
  };

  // Handle card click navigation
  const handleCardClick = (submissionId: string) => {
    router.push(`/dashboard/${submissionId}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-[32px] font-serif font-bold text-black mb-2">
            Submissions
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
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
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
                contentType={submission.contentType}
                actionNeeded={getActionNeeded(submission)}
                metaInfo={getMetaInfo(submission)}
                onClick={() => handleCardClick(submission.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-[60px]">
            {/* Empty state text */}
            <h2 className="text-[18px] font-medium text-black mb-6">
              No submissions
            </h2>

            {/* Submit button */}
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
          </div>
        )}
      </div>
    </div>
  );
}
