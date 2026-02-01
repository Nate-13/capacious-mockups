"use client";

import { FileVersion } from "@/types";

interface FilesSectionProps {
  files: FileVersion[];
  onView?: (file: FileVersion) => void;
  onDownload?: (file: FileVersion) => void;
}

export default function FilesSection({
  files,
  onView,
  onDownload,
}: FilesSectionProps) {
  // Only show the latest/current file
  const currentFile = files.length > 0 ? files[files.length - 1] : null;

  if (!currentFile) {
    return null;
  }

  return (
    <section>
      <h2 className="text-[15px] font-semibold text-gray-700 mb-3">Current File</h2>

      <div className="bg-[#F5F5F5] border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl">📄</span>
            <div className="min-w-0">
              <p className="text-[14px] font-mono truncate">{currentFile.filename}</p>
              <p className="text-[12px] text-gray-500">{currentFile.uploadedDate}</p>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => onView?.(currentFile)}
              className="text-[12px] px-3 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            >
              View
            </button>
            <button
              onClick={() => onDownload?.(currentFile)}
              className="text-[12px] px-3 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
