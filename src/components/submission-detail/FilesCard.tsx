"use client";

import { FileVersion } from "@/types";

interface FilesCardProps {
  files: FileVersion[];
  selectedFile: FileVersion | null;
  onFileSelect: (file: FileVersion) => void;
}

export default function FilesCard({
  files,
  selectedFile,
  onFileSelect,
}: FilesCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 p-4">
      <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-3">
        Files
      </div>
      <div className="space-y-1">
        {files.map((file) => (
          <button
            key={file.id}
            onClick={() => onFileSelect(file)}
            className={`w-full text-left px-3 py-2 rounded text-[13px] transition-colors flex items-center gap-2 ${
              selectedFile?.id === file.id
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <svg
              className="w-4 h-4 shrink-0 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="truncate">{file.filename}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
