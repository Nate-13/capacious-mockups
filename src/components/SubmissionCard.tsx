"use client";

import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";

interface SubmissionCardProps {
  id: string;
  title: string;
  author: string;
  status: string;
  submittedDate: string;
  contentType?: string;
  submissionId?: string;
  metaInfo?: string;
  onClick?: () => void;
}

export default function SubmissionCard({
  id,
  title,
  author,
  status,
  submittedDate,
  contentType,
  submissionId,
  metaInfo,
  onClick,
}: SubmissionCardProps) {
  return (
    <Card
      hoverable
      onClick={onClick}
      className="mb-4 min-h-[140px] cursor-pointer"
    >
      {/* Content type and submission ID */}
      {(contentType || submissionId) && (
        <div className="flex items-center gap-2 mb-1">
          {contentType && (
            <span className="text-[11px] uppercase tracking-wide text-[#999] font-medium">
              {contentType}
            </span>
          )}
          {submissionId && (
            <span className="text-[11px] text-[#999] font-mono">
              #{submissionId}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="text-[18px] font-serif font-bold text-black leading-tight mb-1 line-clamp-2">
        {title}
      </h3>

      {/* Author */}
      <p className="text-[14px] text-[#666] mb-4">by {author}</p>

      {/* Bottom row: Status, Meta info, and Date */}
      <div className="flex items-end justify-between mt-auto">
        <div className="flex flex-col gap-1">
          <StatusBadge status={status} />
          {metaInfo && (
            <span className="text-[13px] text-[#666]">{metaInfo}</span>
          )}
        </div>
        <span className="text-[13px] text-[#666]">
          Submitted {submittedDate}
        </span>
      </div>
    </Card>
  );
}
