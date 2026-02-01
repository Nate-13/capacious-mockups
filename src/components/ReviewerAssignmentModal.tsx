"use client";

import { useState, useEffect } from "react";
import { Button, Checkbox } from "@/components/ui";
import { getAvailableReviewers } from "@/data/mockData";
import type { Reviewer } from "@/types";

interface ReviewerAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (reviewerIds: string[]) => void;
  currentlyAssigned?: string[];
}

export default function ReviewerAssignmentModal({
  isOpen,
  onClose,
  onAssign,
  currentlyAssigned = [],
}: ReviewerAssignmentModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(currentlyAssigned);
  const reviewers = getAvailableReviewers();

  // Reset selected IDs when modal opens with new currentlyAssigned
  useEffect(() => {
    if (isOpen) {
      setSelectedIds(currentlyAssigned);
      setSearchQuery("");
    }
  }, [isOpen, currentlyAssigned]);

  if (!isOpen) return null;

  // Filter reviewers based on search query
  const filteredReviewers = reviewers.filter((reviewer) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      reviewer.name.toLowerCase().includes(query) ||
      reviewer.affiliation.toLowerCase().includes(query) ||
      reviewer.expertise.some((exp) => exp.toLowerCase().includes(query))
    );
  });

  const handleToggleReviewer = (reviewerId: string) => {
    setSelectedIds((prev) =>
      prev.includes(reviewerId)
        ? prev.filter((id) => id !== reviewerId)
        : [...prev, reviewerId],
    );
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAssign = () => {
    onAssign(selectedIds);
    onClose();
  };

  const requiredReviewers = 2;
  const isAssignDisabled = selectedIds.length < requiredReviewers;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg w-full max-w-[600px] max-h-[70vh] flex flex-col"
        style={{ padding: "32px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-serif">Assign Reviewers</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
            aria-label="Close modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search reviewers by name or expertise..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 px-4 border border-gray-300 rounded-lg mb-4 text-sm focus:outline-none focus:border-gray-500"
        />

        {/* Reviewer list */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {filteredReviewers.map((reviewer) => (
            <ReviewerCard
              key={reviewer.id}
              reviewer={reviewer}
              isSelected={selectedIds.includes(reviewer.id)}
              onToggle={() => handleToggleReviewer(reviewer.id)}
            />
          ))}
          {filteredReviewers.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No reviewers found matching your search.
            </p>
          )}
        </div>

        {/* Add New Reviewer button */}
        <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors mb-4">
          + Add New Reviewer
        </button>

        {/* Counter */}
        <p className="text-sm text-gray-500 mb-4">
          Selected: {selectedIds.length} of {requiredReviewers} required
        </p>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAssign}
            disabled={isAssignDisabled}
          >
            Assign Reviewers
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ReviewerCardProps {
  reviewer: Reviewer;
  isSelected: boolean;
  onToggle: () => void;
}

function ReviewerCard({ reviewer, isSelected, onToggle }: ReviewerCardProps) {
  return (
    <div
      className={`
        p-4 rounded-lg border cursor-pointer transition-colors
        ${
          isSelected
            ? "bg-gray-100 border-[#333]"
            : "bg-[#F5F5F5] border-gray-200 hover:border-gray-300"
        }
      `}
      onClick={onToggle}
    >
      <div className="flex items-start gap-3">
        <Checkbox checked={isSelected} onChange={onToggle} className="mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold">{reviewer.name}</p>
          <p className="text-sm text-gray-500">{reviewer.affiliation}</p>
          <p className="text-[13px] text-gray-500 mt-1">
            Keywords: {reviewer.expertise.join(", ")}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Reviews completed: {reviewer.reviewsCompleted} | Avg turnaround:{" "}
            {reviewer.avgTurnaroundDays} days
          </p>
        </div>
      </div>
    </div>
  );
}
