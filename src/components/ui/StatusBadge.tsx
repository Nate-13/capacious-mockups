"use client";

import { useState, useRef, useEffect } from "react";
import type { SubmissionStatus } from "@/types";

interface StatusBadgeProps {
  status: string;
  className?: string;
  onStatusChange?: (newStatus: SubmissionStatus) => void;
}

const statusStyles: Record<SubmissionStatus, string> = {
  "In Desk Review": "bg-[#E2E8F0] text-[#475569]",
  "In Peer Review": "bg-[#DBEAFE] text-[#1D4ED8]",
  "Revise & Resubmit": "bg-[#FEF3C7] text-[#B45309]",
  "Accept with Minor Changes": "bg-[#CCFBF1] text-[#0F766E]",
  "Conditional Accept": "bg-[#F3E8FF] text-[#7C3AED]",
  Accepted: "bg-[#D1FAE5] text-[#059669]",
  "In Copy Editing": "bg-[#E0E7FF] text-[#4338CA]",
  "Ready for Production": "bg-[#FFEDD5] text-[#C2410C]",
  Rejected: "bg-[#FEE2E2] text-[#DC2626]",
  Published: "bg-[#D1FAE5] text-[#047857]",
};

const allStatuses: SubmissionStatus[] = [
  "In Desk Review",
  "In Peer Review",
  "Accept with Minor Changes",
  "Conditional Accept",
  "Accepted",
  "Rejected",
  "Revise & Resubmit",
  "In Copy Editing",
  "Ready for Production",
  "Published",
];

const defaultStyles = "bg-[#E0E0E0] text-[#333]";

function StatusBadge({
  status,
  className = "",
  onStatusChange,
}: StatusBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const baseStyles = "inline-block text-[13px] px-3 py-1 rounded-[4px]";
  const variantStyles =
    statusStyles[status as SubmissionStatus] || defaultStyles;

  if (!onStatusChange) {
    return (
      <span className={`${baseStyles} ${variantStyles} ${className}`}>
        {status}
      </span>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group ${baseStyles} ${variantStyles} ${className} cursor-pointer hover:opacity-80 transition-opacity`}
      >
        {status}
        <span className="inline-flex items-center align-middle w-0 group-hover:w-4 overflow-hidden transition-all duration-150">
          <svg
            className={`w-3 h-3 ml-1 shrink-0 opacity-60 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
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
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[200px]">
          {allStatuses.map((s) => (
            <button
              key={s}
              onClick={() => {
                onStatusChange(s);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-[13px] transition-colors ${
                s === status
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusBadge;
