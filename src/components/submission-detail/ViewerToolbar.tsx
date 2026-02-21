"use client";

interface ViewerToolbarProps {
  filename: string;
  fileType: "pdf" | "docx";
  url: string;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitToWidth: () => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function ViewerToolbar({
  filename,
  fileType,
  url,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onFitToWidth,
  currentPage,
  totalPages,
  onPageChange,
}: ViewerToolbarProps) {
  const isPdf = fileType === "pdf";

  function handlePageInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const val = parseInt((e.target as HTMLInputElement).value, 10);
      if (!isNaN(val) && val >= 1 && val <= (totalPages ?? 1)) {
        onPageChange?.(val);
      }
    }
  }

  return (
    <div className="bg-[#4e4e4e] border-b border-white/[0.06] px-3 py-2 flex items-center shrink-0 gap-2">
      {/* Left: filename */}
      <div className="flex-1 min-w-0">
        <span className="text-[12px] text-white/50 truncate block">
          {filename}
        </span>
      </div>

      {/* Center: page nav (PDF only) */}
      {isPdf && totalPages !== undefined && (
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => onPageChange?.(Math.max(1, (currentPage ?? 1) - 1))}
            disabled={(currentPage ?? 1) <= 1}
            title="Previous page"
          >
            <ChevronUpIcon />
          </ToolbarButton>

          <input
            type="text"
            key={currentPage}
            defaultValue={currentPage ?? 1}
            onKeyDown={handlePageInputKeyDown}
            onBlur={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1 && val <= totalPages) {
                onPageChange?.(val);
              }
            }}
            className="w-[36px] h-[24px] text-center text-[12px] text-white bg-white/10 rounded border border-white/10 outline-none focus:border-white/30"
          />
          <span className="text-[12px] text-white/40 mx-0.5">
            of {totalPages}
          </span>

          <ToolbarButton
            onClick={() =>
              onPageChange?.(Math.min(totalPages, (currentPage ?? 1) + 1))
            }
            disabled={(currentPage ?? 1) >= totalPages}
            title="Next page"
          >
            <ChevronDownIcon />
          </ToolbarButton>
        </div>
      )}

      {/* Right: zoom + actions */}
      <div className="flex items-center gap-0.5 flex-1 justify-end">
        <ToolbarButton
          onClick={onZoomOut}
          disabled={zoomLevel <= 0.5}
          title="Zoom out"
        >
          <MinusIcon />
        </ToolbarButton>

        <span className="text-[12px] text-white/60 w-[40px] text-center tabular-nums">
          {Math.round(zoomLevel * 100)}%
        </span>

        <ToolbarButton
          onClick={onZoomIn}
          disabled={zoomLevel >= 2.0}
          title="Zoom in"
        >
          <PlusIcon />
        </ToolbarButton>

        <ToolbarButton onClick={onFitToWidth} title="Fit to width">
          <FitWidthIcon />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => {
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
          }}
          title="Download"
        >
          <DownloadIcon />
        </ToolbarButton>

        {isPdf && (
          <ToolbarButton
            onClick={() => window.open(url, "_blank")}
            title="Open in new tab"
          >
            <ExternalLinkIcon />
          </ToolbarButton>
        )}
      </div>
    </div>
  );
}

/* --- Subcomponents --- */

function ToolbarButton({
  children,
  onClick,
  title,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className="p-1.5 rounded-[6px] text-white/60 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-4 bg-white/10 mx-1" />;
}

/* --- Icons (14×14 stroke icons) --- */

function ChevronUpIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 12H4"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}

function FitWidthIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}
