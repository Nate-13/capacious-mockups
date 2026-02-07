"use client";

import { FileVersion, FileCategory, SubmissionStatus } from "@/types";

interface FilesCardProps {
  files: FileVersion[];
  selectedFile: FileVersion | null;
  onFileSelect: (file: FileVersion) => void;
  submissionStatus: SubmissionStatus;
  role: string;
}

function getCategoryIcon(category?: FileCategory) {
  if (category === "image") {
    return (
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
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    );
  }
  if (category === "video") {
    return (
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
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    );
  }
  if (
    category === "copyedit-pdf" ||
    category === "copyedit-word" ||
    category === "markup"
  ) {
    return (
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
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    );
  }
  // Default document icon
  return (
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
  );
}

function FileButton({
  file,
  isSelected,
  onSelect,
  badge,
}: {
  file: FileVersion;
  isSelected: boolean;
  onSelect: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-3 py-2 rounded text-[13px] transition-colors flex items-center gap-2 ${
        isSelected
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
      }`}
    >
      {getCategoryIcon(file.category)}
      <span className="truncate flex-1">
        {file.filename}
        {badge && (
          <span className="ml-1.5 text-[10px] px-1 py-0.5 bg-gray-200 text-gray-600 rounded">
            {badge}
          </span>
        )}
      </span>
    </button>
  );
}

export default function FilesCard({
  files,
  selectedFile,
  onFileSelect,
  submissionStatus,
  role,
}: FilesCardProps) {
  // Derive current/relevant files by category

  // 1. Current Manuscript - only the latest version
  const manuscripts = files.filter((f) => f.category === "manuscript");
  const latestManuscript =
    manuscripts.length > 0
      ? manuscripts.reduce((a, b) => (a.version > b.version ? a : b))
      : null;

  // 2. Images - all
  const images = files.filter((f) => f.category === "image");

  // 3. Supplements - all
  const supplements = files.filter((f) => f.category === "supplement");

  // 4. Video - all
  const videos = files.filter((f) => f.category === "video");

  // 5. Copy Editing - only the latest copy edit file
  const copyEditFiles = files.filter(
    (f) => f.category === "copyedit-pdf" || f.category === "copyedit-word",
  );
  const latestCopyEdit =
    copyEditFiles.length > 0
      ? copyEditFiles.reduce((a, b) =>
          new Date(a.uploadedDate) > new Date(b.uploadedDate) ? a : b,
        )
      : null;

  // 6. Author Upload Zone - shown only when editor is actively working with author
  // "Revise & Resubmit" is a terminal state (soft rejection) — author resubmits fresh
  const showAuthorUpload =
    role === "Author" &&
    (submissionStatus === "Accept with Minor Changes" ||
      submissionStatus === "Conditional Accept");

  // Build ordered sections
  const sections: {
    label: string;
    files: FileVersion[];
    badge?: (file: FileVersion) => string | undefined;
  }[] = [];

  if (latestManuscript) {
    sections.push({
      label: "Current Manuscript",
      files: [latestManuscript],
      badge: () => `v${latestManuscript.version}`,
    });
  }

  if (images.length > 0) {
    sections.push({ label: "Images", files: images });
  }

  if (supplements.length > 0) {
    sections.push({ label: "Supplements", files: supplements });
  }

  if (videos.length > 0) {
    sections.push({ label: "Video", files: videos });
  }

  if (latestCopyEdit) {
    sections.push({ label: "Copy Editing", files: [latestCopyEdit] });
  }

  return (
    <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 p-4">
      <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-3">
        Files
      </div>
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1 px-1">
              {section.label}
            </div>
            <div className="space-y-1">
              {section.files.map((file) => (
                <FileButton
                  key={file.id}
                  file={file}
                  isSelected={selectedFile?.id === file.id}
                  onSelect={() => onFileSelect(file)}
                  badge={section.badge?.(file)}
                />
              ))}
            </div>
          </div>
        ))}

        {showAuthorUpload && (
          <div>
            <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1 px-1">
              Revision
            </div>
            <button
              onClick={() =>
                alert(
                  "File upload dialog would open here. This is a mockup — no actual upload will occur.",
                )
              }
              className="w-full border border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="text-[13px] text-gray-500">
                Upload Revised Manuscript
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
