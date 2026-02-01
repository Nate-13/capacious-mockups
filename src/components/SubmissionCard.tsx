"use client";

import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";

interface SubmissionCardProps {
  id: string;
  title: string;
  author: string;
  status: string;
  submittedDate: string;
  metaInfo?: string;
  onClick?: () => void;
}

export default function SubmissionCard({
  id,
  title,
  author,
  status,
  submittedDate,
  metaInfo,
  onClick,
}: SubmissionCardProps) {
  return (
    <Card
      hoverable
      onClick={onClick}
      className="mb-4 min-h-[140px] cursor-pointer"
    >
      {/* Header row with ID */}
      <div className="flex justify-end mb-2">
        <span className="text-[12px] font-mono text-[#666]">#{id}</span>
      </div>

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
