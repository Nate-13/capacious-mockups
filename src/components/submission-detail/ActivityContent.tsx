"use client";

import { ActivityEntry, FileVersion } from "@/types";
import { useToast } from "@/components/Toast";

interface ActivityContentProps {
  activity: ActivityEntry[];
  files: FileVersion[];
}

// Dot colors (dark)
const stageDotColors: Record<string, string> = {
  Submitted: "bg-gray-500",
  "Desk Review": "bg-slate-600",
  "Peer Review": "bg-blue-700",
  "Accept w/ Minor Changes": "bg-teal-700",
  "Conditional Accept": "bg-violet-600",
  Accepted: "bg-emerald-600",
  "Revise & Resubmit": "bg-amber-700",
  Rejected: "bg-red-600",
  "Copy Editing": "bg-indigo-700",
  "Ready for Production": "bg-orange-700",
  Published: "bg-emerald-700",
};

interface StageGroup {
  stage: string;
  dateRange: string;
  entries: ActivityEntry[];
  files: FileVersion[];
}

function buildStageGroups(
  activity: ActivityEntry[],
  files: FileVersion[],
): StageGroup[] {
  const groups: StageGroup[] = [];
  let currentStage = "";
  let currentEntries: ActivityEntry[] = [];
  let stageStartDate = "";

  for (const entry of activity) {
    if (entry.stage) {
      if (currentEntries.length > 0) {
        const lastDate = currentEntries[currentEntries.length - 1].date;
        groups.push({
          stage: currentStage || "Submitted",
          dateRange:
            stageStartDate === lastDate
              ? stageStartDate
              : `${stageStartDate} – ${lastDate}`,
          entries: currentEntries,
          files: [],
        });
      }
      currentStage = entry.stage;
      stageStartDate = entry.date;
      currentEntries = [entry];
    } else {
      currentEntries.push(entry);
    }
  }

  if (currentEntries.length > 0) {
    const lastDate = currentEntries[currentEntries.length - 1].date;
    groups.push({
      stage: currentStage || "Submitted",
      dateRange:
        stageStartDate === lastDate
          ? stageStartDate
          : `${stageStartDate} – ${lastDate}`,
      entries: currentEntries,
      files: [],
    });
  }

  for (const group of groups) {
    const fileIds = new Set(
      group.entries.filter((e) => e.fileId).map((e) => e.fileId),
    );
    group.files = files.filter((f) => fileIds.has(f.id));
  }

  return groups.reverse();
}

export default function ActivityContent({
  activity,
  files,
}: ActivityContentProps) {
  const { showToast } = useToast();
  const groups = buildStageGroups(activity, files);

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg px-5 py-5">
      {/* Single continuous line behind all dots */}
      {groups.length > 1 && (
        <div
          className="absolute left-7 w-1 rounded-full bg-gray-200"
          style={{ top: 28, bottom: 28 }}
        />
      )}

      {groups.map((group, gi) => {
        const dotColor = stageDotColors[group.stage] || "bg-gray-500";
        const subEntries = group.entries.slice(1);
        const stageEntry = group.entries[0];
        const stageFile = stageEntry?.fileId
          ? files.find((f) => f.id === stageEntry.fileId)
          : undefined;

        return (
          <div key={gi} id={`stage-${gi}`} className={gi > 0 ? "mt-4" : ""}>
            {/* Stage header */}
            <div className="flex items-start">
              <div className="w-5 shrink-0 flex justify-center relative z-10">
                <div className={`w-3 h-3 rounded-full ${dotColor} mt-0.5`} />
              </div>
              <div className="flex-1 min-w-0 pl-3 pb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-[14px] font-semibold text-gray-900">
                    {group.stage}
                  </span>
                  <span className="text-[12px] text-gray-400">
                    {group.dateRange}
                  </span>
                </div>
                {stageFile && (
                  <button
                    onClick={() =>
                      showToast(`Download: ${stageFile.filename}`, "info")
                    }
                    className="flex items-center gap-2.5 mt-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded transition-colors text-left"
                  >
                    <svg
                      className="w-4 h-4 text-gray-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-gray-700 truncate">
                        {stageFile.filename}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {stageFile.label}
                      </p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Event rows */}
            {subEntries.map((entry, ei) => {
              const linkedFile = entry.fileId
                ? files.find((f) => f.id === entry.fileId)
                : undefined;
              const isSubtle =
                entry.type === "email" || entry.type === "assignment";

              return (
                <div key={ei} className="flex items-start">
                  <div className="w-5 shrink-0 flex justify-center relative z-10">
                    <div
                      className={`w-2 h-2 rounded-full mt-[5px] ${dotColor}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0 pl-3 pb-3">
                    <span
                      className={`text-[13px] ${
                        isSubtle ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {entry.description}
                    </span>
                    {entry.actor && (
                      <span className="text-[11px] text-gray-400 ml-1.5">
                        — {entry.actor}
                      </span>
                    )}
                    {entry.date !== group.entries[0]?.date && (
                      <span className="text-[11px] text-gray-300 ml-1.5">
                        {entry.date}
                      </span>
                    )}

                    {linkedFile && (
                      <button
                        onClick={() =>
                          showToast(`Download: ${linkedFile.filename}`, "info")
                        }
                        className="flex items-center gap-2.5 mt-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded transition-colors text-left"
                      >
                        <svg
                          className="w-4 h-4 text-gray-400 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <div className="min-w-0">
                          <p className="text-[12px] font-medium text-gray-700 truncate">
                            {linkedFile.filename}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {linkedFile.label}
                          </p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
