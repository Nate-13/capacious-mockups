"use client";

import { useState, useRef, useEffect } from "react";
import type { SubmissionStatus } from "@/types";

interface StatusBadgeProps {
  status: string;
  className?: string;
  onStatusChange?: (newStatus: SubmissionStatus) => void;
}

const statusStyles: Record<SubmissionStatus, string> = {
  "In Desk Review": "bg-[#E0E0E0] text-[#333]",
  "In Peer Review": "bg-[#E0E0E0] text-[#333]",
  "Accept with Minor Changes": "bg-[#E0E0E0] text-[#333]",
  "Conditional Accept": "bg-[#333] text-white",
  Accepted: "bg-[#333] text-white",
  Rejected: "bg-[#999] text-white",
  "Revise & Resubmit": "bg-[#999] text-[#333]",
  "In Copy Editing": "bg-[#E0E0E0] text-[#333]",
  "Ready for Production": "bg-[#333] text-white",
  Published: "bg-[#333] text-white",
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
        className={`${baseStyles} ${variantStyles} ${className} cursor-pointer hover:opacity-80 transition-opacity`}
      >
        {status}
        <svg
          className="inline-block w-3 h-3 ml-1.5 opacity-60"
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
