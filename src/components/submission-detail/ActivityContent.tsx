"use client";

import { ActivityEntry } from "@/types";

interface ActivityContentProps {
  activity: ActivityEntry[];
}

export default function ActivityContent({ activity }: ActivityContentProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h2 className="text-[15px] font-semibold text-gray-800 mb-4">
        Activity Log
      </h2>
      <div className="space-y-3">
        {activity.map((entry, index) => (
          <div key={index} className="text-[13px] flex gap-3">
            <span className="text-gray-400 shrink-0 w-[85px]">{entry.date}</span>
            <span className="text-gray-600">{entry.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
