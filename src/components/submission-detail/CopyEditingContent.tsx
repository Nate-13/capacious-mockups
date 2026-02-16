"use client";

import { Submission, FileVersion } from "@/types";
import FileUpload from "@/components/ui/FileUpload";

interface CopyEditingContentProps {
  submission: Submission;
  files: FileVersion[];
  role: string;
  isEditor: boolean;
}

const statusColors: Record<string, string> = {
  Assigned: "text-gray-500",
  "In Progress": "text-gray-700",
  Completed: "text-gray-900 font-medium",
};

function DownloadButton({ file }: { file: FileVersion }) {
  return (
    <button
      onClick={() => alert(`Download: ${file.filename} (Mock)`)}
      className="flex items-center gap-3 w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
    >
      <svg
        className="w-5 h-5 text-gray-400 shrink-0"
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
      <div>
        <p className="text-[13px] font-medium text-gray-800">{file.filename}</p>
        <p className="text-[11px] text-gray-400">
          {file.label} &middot; {file.uploadedDate}
          {file.uploadedBy && ` · ${file.uploadedBy}`}
        </p>
      </div>
    </button>
  );
}

export default function CopyEditingContent({
  submission,
  files,
  role,
  isEditor,
}: CopyEditingContentProps) {
  const copyEditFiles = files.filter(
    (f) =>
      f.category === "copyedit-pdf" ||
      f.category === "copyedit-word" ||
      f.category === "markup",
  );

  const latestCePdf = [...copyEditFiles]
    .filter((f) => f.category === "copyedit-pdf")
    .pop();

  const latestWorkingFile = [...copyEditFiles]
    .filter((f) => f.category === "copyedit-word")
    .pop();

  const assignedEditors = submission.assignedCopyEditors || [];

  // --- Author view ---
  if (role === "Author") {
    const hasFileToReview = !!latestCePdf;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="mb-5">
          <h2 className="text-[20px] font-serif font-bold text-gray-900 leading-tight">
            Copy Editing
          </h2>
        </div>

        {hasFileToReview ? (
          <>
            <p className="text-[14px] text-gray-600 mb-5">
              Your copy edited manuscript is ready for review. Download the file
              below, review the changes, and upload your annotated response.
            </p>

            {/* Copy editor comments for the author */}
            {assignedEditors.some((e) => e.comments) && (
              <div className="mb-5">
                <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">
                  Notes from copy editor
                </div>
                {assignedEditors
                  .filter((e) => e.comments)
                  .map((editor) => (
                    <div
                      key={editor.id}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                    >
                      <p className="text-[12px] font-medium text-gray-700 mb-1">
                        {editor.name}
                      </p>
                      <p className="text-[13px] text-gray-600 whitespace-pre-line leading-relaxed">
                        {editor.comments}
                      </p>
                    </div>
                  ))}
              </div>
            )}

            <div className="mb-5">
              <DownloadButton file={latestCePdf} />
            </div>
            <FileUpload
              label="Upload your annotated response"
              accept=".pdf"
              actionAccent
              className="h-auto"
            />
          </>
        ) : (
          <p className="text-[14px] text-gray-500">
            Your manuscript is being copy edited. You&apos;ll be notified when
            it&apos;s ready for your review.
          </p>
        )}
      </div>
    );
  }

  // --- Copy Editor view ---
  if (role === "Copy Editor") {
    const otherEditors = assignedEditors.filter(
      (e) => e.name !== "Maria Santos",
    );
    const workingFile =
      latestWorkingFile ||
      files.filter((f) => f.category === "manuscript").pop();

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="mb-5">
          <h2 className="text-[20px] font-serif font-bold text-gray-900 leading-tight">
            Copy Editing
          </h2>
          <p className="text-[13px] text-gray-500 mt-1">Your assignment</p>
        </div>

        {/* Working file to download */}
        {workingFile && (
          <div className="mb-5">
            <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">
              Current working file
            </div>
            <DownloadButton file={workingFile} />
          </div>
        )}

        {/* Comments */}
        <div className="mb-5">
          <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">
            Comments for editor &amp; author
          </div>
          <textarea
            placeholder="Add notes about your edits, queries for the author, style decisions..."
            className="w-full border border-gray-200 rounded-lg p-3 text-[13px] text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:border-gray-400 transition-colors"
            rows={4}
          />
        </div>

        {/* Upload edited version */}
        <div className="mb-5">
          <FileUpload
            label="Upload edited version"
            accept=".pdf,.doc,.docx"
            actionAccent
            className="h-auto"
          />
        </div>

        {/* Other assigned editors */}
        {otherEditors.length > 0 && (
          <p className="text-[12px] text-gray-400">
            Also assigned: {otherEditors.map((e) => e.name).join(", ")}
          </p>
        )}
      </div>
    );
  }

  // --- Managing Editor / Admin view ---
  const inProgressCount = assignedEditors.filter(
    (e) => e.status === "In Progress",
  ).length;
  const completedCount = assignedEditors.filter(
    (e) => e.status === "Completed",
  ).length;

  const statusParts: string[] = [];
  if (assignedEditors.length > 0) {
    statusParts.push(
      `${assignedEditors.length} editor${assignedEditors.length !== 1 ? "s" : ""} assigned`,
    );
  }
  if (inProgressCount > 0) {
    statusParts.push(`${inProgressCount} in progress`);
  }
  if (completedCount > 0) {
    statusParts.push(`${completedCount} completed`);
  }

  // Show only the most relevant files: latest CE PDF + latest working doc
  const currentFiles = [latestCePdf, latestWorkingFile].filter(
    (f): f is FileVersion => !!f,
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[20px] font-serif font-bold text-gray-900 leading-tight">
          Copy Editing
        </h2>
        {statusParts.length > 0 && (
          <p className="text-[13px] text-gray-500 mt-1">
            {statusParts.join(" · ")}
          </p>
        )}
      </div>

      {/* Copy editors list */}
      {assignedEditors.length > 0 ? (
        <div className="mb-6">
          {assignedEditors.map((editor, i) => (
            <div
              key={editor.id}
              className={`py-3 ${
                i < assignedEditors.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-medium text-gray-800">
                    {editor.name}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {editor.affiliation}
                    {editor.assignedDate && (
                      <span className="text-gray-400">
                        {" "}
                        &middot; Assigned {editor.assignedDate}
                      </span>
                    )}
                  </p>
                </div>
                <span
                  className={`text-[12px] ${statusColors[editor.status || "Assigned"] || "text-gray-500"}`}
                >
                  {editor.status}
                  {editor.completedDate && (
                    <span className="text-gray-400 font-normal">
                      {" "}
                      {editor.completedDate}
                    </span>
                  )}
                </span>
              </div>
              {editor.comments && (
                <div className="mt-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                  <p className="text-[12px] text-gray-600 whitespace-pre-line leading-relaxed">
                    {editor.comments}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[13px] text-gray-500 mb-6">
          No copy editors assigned yet.
        </p>
      )}

      {/* Current files */}
      {currentFiles.length > 0 && (
        <div className="mb-6">
          <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">
            Current files
          </div>
          <div className="space-y-2">
            {currentFiles.map((file) => (
              <DownloadButton key={file.id} file={file} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
