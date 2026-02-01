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
  return (
    <section>
      <h2 className="text-[18px] font-serif mb-4">Files &amp; Versions</h2>

      <div className="flex flex-col gap-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-[#F5F5F5] border border-gray-300 rounded-[6px] p-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span className="text-lg shrink-0">📄</span>
                <div className="min-w-0">
                  <p className="text-[14px] font-mono truncate">{file.filename}</p>
                  <p className="text-[12px] text-gray-500">
                    v{file.version} - {file.label}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-[12px] text-gray-500 whitespace-nowrap">
                  {file.uploadedDate}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onView?.(file)}
                    className="text-[12px] px-3 py-1.5 border border-[#333] rounded-[4px] bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onDownload?.(file)}
                    className="text-[12px] px-3 py-1.5 border border-[#333] rounded-[4px] bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
