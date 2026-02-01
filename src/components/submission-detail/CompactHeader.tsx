"use client";

import { Submission } from "@/types";
import { StatusBadge } from "@/components/ui";
import TabsCard, { Tab, TabType } from "./TabsCard";

interface CompactHeaderProps {
  submission: Submission;
  tabs: Tab[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function CompactHeader({
  submission,
  tabs,
  activeTab,
  onTabChange,
}: CompactHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 px-5 py-3 flex items-center justify-between gap-4">
      {/* Left: Article Info */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className="text-[11px] font-mono text-gray-400 shrink-0">
          #{submission.id}
        </span>
        <StatusBadge status={submission.status} />
        <span className="text-[14px] font-semibold text-gray-900 truncate">
          {submission.title}
        </span>
        <span className="text-[13px] text-gray-500 shrink-0">
          · {submission.authorName}
        </span>
      </div>

      {/* Right: Tabs */}
      <div className="shrink-0">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-[14px] font-medium rounded transition-colors ${
                activeTab === tab.id
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
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
        </div>
      </div>
    </div>
  );
}
