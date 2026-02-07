"use client";

import { ActivityEntry, FileVersion } from "@/types";

interface ActivityContentProps {
  activity: ActivityEntry[];
  files: FileVersion[];
}

const typeIndicators: Record<string, { color: string; label: string }> = {
  "status-change": { color: "bg-gray-800", label: "Status" },
  "file-upload": { color: "bg-gray-500", label: "File" },
  review: { color: "bg-gray-600", label: "Review" },
  assignment: { color: "bg-gray-400", label: "Assignment" },
  email: { color: "bg-gray-300", label: "Email" },
  decision: { color: "bg-gray-700", label: "Decision" },
  general: { color: "bg-gray-200", label: "General" },
};

function formatDate(dateStr: string): string {
  // Already in readable format like "Feb 20, 2024" - just return it
  return dateStr;
}

function groupByDate(
  entries: ActivityEntry[],
): Record<string, ActivityEntry[]> {
  const groups: Record<string, ActivityEntry[]> = {};
  for (const entry of entries) {
    const date = entry.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(entry);
  }
  return groups;
}

export default function ActivityContent({
  activity,
  files,
}: ActivityContentProps) {
  const grouped = groupByDate(activity);
  const dates = Object.keys(grouped);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h2 className="text-[15px] font-semibold text-gray-800 mb-4">
        Activity Log
      </h2>
      <div className="space-y-5">
        {dates.map((date) => (
          <div key={date}>
            <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">
              {formatDate(date)}
            </div>
            <div className="space-y-2">
              {grouped[date].map((entry, index) => {
                const indicator =
                  typeIndicators[entry.type || "general"] ||
                  typeIndicators.general;
                const linkedFile = entry.fileId
                  ? files.find((f) => f.id === entry.fileId)
                  : undefined;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${indicator.color}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div>
                        <span className="text-[13px] text-gray-700">
                          {entry.description}
                        </span>
                        {entry.actor && (
                          <span className="text-[12px] text-gray-400 ml-2">
                            &mdash; {entry.actor}
                          </span>
                        )}
                      </div>
                      {linkedFile && (
                        <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                          {linkedFile.filename}
                        </div>
                      )}
                    </div>
                    {linkedFile && (
                      <button
                        onClick={() =>
                          alert("Downloading: " + linkedFile.filename)
                        }
                        className="shrink-0 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors mt-0.5"
                        title={`Download ${linkedFile.filename}`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 4v12m0 0l-4-4m4 4l4-4M6 20h12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
