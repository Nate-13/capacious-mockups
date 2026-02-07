"use client";

export type TabType = "submission" | "reviews" | "activity" | "copy-editing";

export interface Tab {
  id: TabType;
  label: string;
  count?: number;
}

interface TabsCardProps {
  tabs: Tab[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabsCard({
  tabs,
  activeTab,
  onTabChange,
}: TabsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 px-2 py-1.5 flex items-center gap-1">
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
  );
}
