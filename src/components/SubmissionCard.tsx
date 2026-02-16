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

  actionNeeded?: boolean;
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

  actionNeeded,
  metaInfo,
  onClick,
}: SubmissionCardProps) {
  return (
    <Card
      hoverable
      onClick={onClick}
      className="mb-4 min-h-[140px] cursor-pointer relative"
    >
      {actionNeeded && (
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#F97316]" />
      )}
      {/* Content type */}
      {contentType && (
        <div className="mb-1">
          <span className="text-[11px] uppercase tracking-wide text-[#999] font-medium">
            {contentType}
          </span>
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
        <div className="flex items-center gap-2">
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
