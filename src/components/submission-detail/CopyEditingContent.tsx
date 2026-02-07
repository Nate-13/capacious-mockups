"use client";

import { useState } from "react";
import { Submission, FileVersion } from "@/types";
import CopyEditorAssignmentModal from "./CopyEditorAssignmentModal";

interface CopyEditingContentProps {
  submission: Submission;
  files: FileVersion[];
  role: string;
  isEditor: boolean;
}

export default function CopyEditingContent({
  submission,
  files,
  role,
  isEditor,
}: CopyEditingContentProps) {
  const [showAssignModal, setShowAssignModal] = useState(false);

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
  const alreadyAssignedIds = assignedEditors.map((e) => e.id);

  const handleAssignEditors = (editorIds: string[]) => {
    alert(
      `Copy editors assigned (Mock): ${editorIds.join(", ")}\nSubmission: ${submission.id}`,
    );
  };

  // Author view
  if (role === "Author") {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-[15px] font-semibold text-gray-800 mb-2">
            Copy Editing
          </h2>
          <p className="text-[13px] text-gray-500 mb-4">
            Your manuscript is being copy edited. You may be asked to review
            marked-up PDFs and respond with comments.
          </p>

          {assignedEditors.length > 0 && (
            <div className="mb-4">
              <h3 className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2">
                Copy Editors
              </h3>
              <div className="space-y-2">
                {assignedEditors.map((editor) => (
                  <div
                    key={editor.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <p className="text-[14px] font-medium text-gray-800">
                        {editor.name}
                      </p>
                      <p className="text-[12px] text-gray-500">
                        {editor.affiliation}
                      </p>
                    </div>
                    <span className="text-[12px] text-gray-500">
                      {editor.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {latestCePdf && (
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-3">
              Latest Copy Edit PDF
            </h3>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-400"
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
                <div>
                  <p className="text-[13px] font-medium text-gray-800">
                    {latestCePdf.filename}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {latestCePdf.label} &middot; {latestCePdf.uploadedDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => alert("Download (Mock)")}
                className="text-[12px] text-gray-600 hover:text-gray-800 underline"
              >
                Download
              </button>
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-3">
            Upload Response
          </h3>
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

  // Editor / Copy Editor view
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h2 className="text-[15px] font-semibold text-gray-800 mb-2">
          Copy Editing
        </h2>
        <p className="text-[13px] text-gray-500">
          Manage copy editing workflow for this submission.
        </p>
      </div>

      {/* Assigned Copy Editors */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-3">
          Assigned Copy Editors
        </h3>
        {assignedEditors.length > 0 ? (
          <div className="space-y-3">
            {assignedEditors.map((editor) => (
              <div
                key={editor.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="text-[14px] font-medium text-gray-800">
                    {editor.name}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {editor.affiliation}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[12px] ${
                      editor.status === "Completed"
                        ? "text-gray-800 font-medium"
                        : editor.status === "In Progress"
                          ? "text-gray-700"
                          : "text-gray-500"
                    }`}
                  >
                    {editor.status === "Completed" && "Completed"}
                    {editor.status === "In Progress" && "In Progress"}
                    {editor.status === "Assigned" && "Assigned"}
                  </span>
                  {editor.assignedDate && (
                    <p className="text-[11px] text-gray-400">
                      Assigned {editor.assignedDate}
                    </p>
                  )}
                  {editor.completedDate && (
                    <p className="text-[11px] text-gray-400">
                      Completed {editor.completedDate}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-gray-500">
            No copy editors assigned yet.
          </p>
        )}
        {isEditor && (
          <button
            onClick={() => setShowAssignModal(true)}
            className="w-full mt-4 p-3 text-[13px] text-gray-600 border border-dashed border-gray-400 rounded bg-transparent hover:bg-gray-50 transition-colors"
          >
            + Assign Copy Editor
          </button>
        )}
      </div>

      {/* Copy Editing Files */}
      {copyEditFiles.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-3">
            Copy Editing Files
          </h3>
          <div className="space-y-2">
            {copyEditFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-400 shrink-0"
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
                  <div>
                    <p className="text-[13px] font-medium text-gray-800">
                      {file.filename}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {file.label} &middot; {file.uploadedDate}
                      {file.uploadedBy && ` &middot; ${file.uploadedBy}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Download ${file.filename} (Mock)`)}
                  className="text-[12px] text-gray-600 hover:text-gray-800 underline shrink-0"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Copy Editing Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-3">
          Copy Editing Timeline
        </h3>
        <div className="space-y-3">
          {assignedEditors.map((editor) => (
            <div key={editor.id} className="text-[13px] flex gap-3">
              <span className="text-gray-400 shrink-0 w-[85px]">
                {editor.assignedDate || ""}
              </span>
              <span className="text-gray-600">
                {editor.name} assigned as copy editor
              </span>
            </div>
          ))}
          {copyEditFiles.map((file) => (
            <div key={file.id} className="text-[13px] flex gap-3">
              <span className="text-gray-400 shrink-0 w-[85px]">
                {file.uploadedDate
                  ? file.uploadedDate.replace(/^(.*?)\s\d{4}$/, "$1")
                  : ""}
              </span>
              <span className="text-gray-600">
                {file.label} uploaded
                {file.uploadedBy ? ` by ${file.uploadedBy}` : ""}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mark Ready for Production */}
      {isEditor && submission.status === "In Copy Editing" && (
        <div className="bg-white border border-gray-200 rounded-lg p-5">
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

      <CopyEditorAssignmentModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onAssign={handleAssignEditors}
        alreadyAssigned={alreadyAssignedIds}
      />
    </div>
  );
}
