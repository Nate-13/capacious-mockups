"use client";

import { Submission, FileVersion } from "@/types";

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

  const assignedEditors = submission.assignedCopyEditors || [];

  // Build status subtitle
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

  // Author view — simplified
  if (role === "Author") {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Grounding header */}
        <div className="mb-6">
          <h2 className="text-[20px] font-serif font-bold text-gray-900 leading-tight">
            Copy Editing
          </h2>
          <p className="text-[13px] text-gray-500 mt-1">
            Your manuscript is being copy edited
          </p>
        </div>

        {/* Latest CE PDF — prominent download */}
        {latestCePdf && (
          <div className="mb-6">
            <button
              onClick={() => alert(`Download: ${latestCePdf.filename} (Mock)`)}
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
                <p className="text-[13px] font-medium text-gray-800">
                  {latestCePdf.filename}
                </p>
                <p className="text-[11px] text-gray-400">
                  {latestCePdf.label} &middot; {latestCePdf.uploadedDate}
                </p>
              </div>
            </button>
          </div>
        )}

        {/* Upload response */}
        <div>
          <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">
            Upload Response
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-[13px] text-gray-500">
              Drag and drop your annotated PDF here, or click to browse
            </p>
            <button
              onClick={() => alert("File upload (Mock)")}
              className="mt-3 px-4 py-2 text-[13px] bg-white text-[#333] border border-[#333] rounded-[6px] hover:bg-gray-50 transition-colors"
            >
              Choose File
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Editor / Copy Editor view — clean single panel
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Grounding header with status */}
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

      {/* Copy editors list — clean rows, no card wrapper */}
      {assignedEditors.length > 0 ? (
        <div className="mb-6">
          {assignedEditors.map((editor, i) => (
            <div
              key={editor.id}
              className={`flex items-center justify-between py-3 ${
                i < assignedEditors.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
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
          ))}
        </div>
      ) : (
        <p className="text-[13px] text-gray-500 mb-6">
          No copy editors assigned yet.
        </p>
      )}

      {/* Assign button — editor only */}
      {isEditor && (
        <button
          onClick={() =>
            alert(
              "Copy editor assignment modal would open here. This is a mockup.",
            )
          }
          className="w-full mb-6 p-3 text-[13px] text-gray-500 border border-dashed border-gray-300 rounded-lg bg-transparent hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
          + Assign Copy Editor
        </button>
      )}

      {/* Files — prominent download rows */}
      {copyEditFiles.length > 0 && (
        <div className="mb-6">
          <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">
            Files
          </div>
          <div className="space-y-2">
            {copyEditFiles.map((file) => (
              <button
                key={file.id}
                onClick={() => alert(`Download ${file.filename} (Mock)`)}
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
                  <p className="text-[13px] font-medium text-gray-800">
                    {file.filename}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {file.label} &middot; {file.uploadedDate}
                    {file.uploadedBy && ` · ${file.uploadedBy}`}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mark as Ready for Production — editor only */}
      {isEditor && submission.status === "In Copy Editing" && (
        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={() => {
              alert(
                `Marked as Ready for Production (Mock)\nSubmission: ${submission.id}`,
              );
            }}
            className="px-4 py-2 text-[13px] font-bold bg-[#333] text-white rounded-[6px] hover:bg-[#222] transition-colors"
          >
            Mark as Ready for Production
          </button>
          <p className="text-[11px] text-gray-400 mt-2">
            Email notification will be sent to author
          </p>
        </div>
      )}

    </div>
  );
}
