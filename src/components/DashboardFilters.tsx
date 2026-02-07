"use client";

interface DashboardFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  typeFilter: string;
  onTypeChange: (type: string) => void;
}

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "in-desk-review", label: "In Desk Review" },
  { value: "in-peer-review", label: "In Peer Review" },
  { value: "accept-with-minor-changes", label: "Accept with Minor Changes" },
  { value: "conditional-accept", label: "Conditional Accept" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "revise-&-resubmit", label: "Revise & Resubmit" },
  { value: "in-copy-editing", label: "In Copy Editing" },
  { value: "ready-for-production", label: "Ready for Production" },
  { value: "published", label: "Published" },
];

const TYPE_OPTIONS = [
  { value: "", label: "All Types" },
  { value: "Article", label: "Article" },
  { value: "Dialogue", label: "Dialogue" },
  { value: "Interstice", label: "Interstice" },
  { value: "Introduction", label: "Introduction" },
  { value: "Afterword", label: "Afterword" },
  { value: "Book Review", label: "Book Review" },
];

export default function DashboardFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-[1%] mb-6">
      {/* Search Input - 60% width on desktop, full width on mobile */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search submissions..."
        className="
          w-full md:w-[60%]
          h-[44px] px-4
          text-[14px] text-gray-900
          placeholder:text-[#999] placeholder:text-[14px]
          border border-[#E0E0E0] rounded-[6px]
          bg-white
          outline-none
          focus:border-[#999]
          transition-colors
        "
      />

      {/* Status Dropdown - 20% width on desktop, full width on mobile */}
      <div className="relative w-full md:w-[20%]">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="
            w-full h-[44px] px-4 pr-10
            text-[14px] text-gray-900
            border border-[#E0E0E0] rounded-[6px]
            bg-white
            outline-none
            focus:border-[#999]
            transition-colors
            appearance-none
            cursor-pointer
          "
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">
          ▼
        </span>
      </div>

      {/* Type Dropdown - 18% width on desktop, full width on mobile */}
      <div className="relative w-full md:w-[18%]">
        <select
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
          className="
            w-full h-[44px] px-4 pr-10
            text-[14px] text-gray-900
            border border-[#E0E0E0] rounded-[6px]
            bg-white
            outline-none
            focus:border-[#999]
            transition-colors
            appearance-none
            cursor-pointer
          "
        >
          {TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">
          ▼
        </span>
      </div>
    </div>
  );
}
