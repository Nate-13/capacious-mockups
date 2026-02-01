"use client";

import { Submission } from "@/types";
import { StatusBadge } from "@/components/ui";

interface ArticleInfoCardProps {
  submission: Submission;
}

export default function ArticleInfoCard({ submission }: ArticleInfoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] font-mono text-gray-400">
          #{submission.id}
        </span>
        <StatusBadge status={submission.status} />
      </div>
      <h1 className="text-[22px] font-serif font-bold text-gray-900 leading-tight mb-2">
        {submission.title}
      </h1>
      <p className="text-[14px] text-gray-600">
        {submission.authorName} · {submission.affiliation}
      </p>
      <p className="text-[13px] text-gray-500 mt-1">
        Submitted {submission.submittedDate}
      </p>
    </div>
  );
}
