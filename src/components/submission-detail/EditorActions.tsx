"use client";

import { Submission } from "@/types";

interface EditorActionsProps {
  submission: Submission;
  onAction: (action: string) => void;
}

export default function EditorActions({
  submission,
  onAction,
}: EditorActionsProps) {
  const allReviewsSubmitted =
    submission.assignedReviewers &&
    submission.assignedReviewers.length > 0 &&
    submission.assignedReviewers.every((r) => r.status === "Submitted");

  const handleAction = (action: string) => {
    alert(`Action: ${action} (Mock)\nSubmission: ${submission.id}`);
    onAction(action);
  };

  const renderActions = () => {
    switch (submission.status) {
      case "In Desk Review":
        return (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleAction("approve-peer-review")}
              className="w-full px-4 py-2 text-[13px] font-bold bg-[#333] text-white rounded-[6px] hover:bg-[#222] transition-colors"
            >
              Approve for Peer Review
            </button>
            <button
              onClick={() => handleAction("request-revisions")}
              className="w-full px-4 py-2 text-[13px] bg-white text-[#333] border border-[#333] rounded-[6px] hover:bg-gray-50 transition-colors"
            >
              Request Revisions
            </button>
            <button
              onClick={() => handleAction("skip-to-copy-editing")}
              className="w-full px-4 py-2 text-[13px] bg-white text-[#333] border border-[#333] rounded-[6px] hover:bg-gray-50 transition-colors"
            >
              Skip to Copy Editing
            </button>
            <button
              onClick={() => handleAction("desk-reject")}
              className="w-full px-4 py-2 text-[13px] bg-[#E0E0E0] text-[#555] rounded-[6px] hover:bg-[#D0D0D0] transition-colors"
            >
              Desk Reject
            </button>
          </div>
        );

      case "In Peer Review":
        if (!allReviewsSubmitted) {
          return (
            <p className="text-[13px] text-gray-500">
              Waiting for all reviews to be submitted before editor decision is
              available.
            </p>
          );
        }
        return (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleAction("accept")}
              className="w-full px-4 py-2 text-[13px] font-bold bg-[#333] text-white rounded-[6px] hover:bg-[#222] transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => handleAction("conditional-accept")}
              className="w-full px-4 py-2 text-[13px] bg-white text-[#333] border border-[#333] rounded-[6px] hover:bg-gray-50 transition-colors"
            >
              Conditional Accept
            </button>
            <button
              onClick={() => handleAction("accept-minor-changes")}
              className="w-full px-4 py-2 text-[13px] bg-white text-[#333] border border-[#333] rounded-[6px] hover:bg-gray-50 transition-colors"
            >
              Accept with Minor Changes
            </button>
            <button
              onClick={() => handleAction("revise-resubmit")}
              className="w-full px-4 py-2 text-[13px] bg-white text-[#333] border border-[#333] rounded-[6px] hover:bg-gray-50 transition-colors"
            >
              Revise &amp; Resubmit
            </button>
            <button
              onClick={() => handleAction("reject")}
              className="w-full px-4 py-2 text-[13px] bg-[#E0E0E0] text-[#555] rounded-[6px] hover:bg-[#D0D0D0] transition-colors"
            >
              Reject
            </button>
          </div>
        );

      case "Conditional Accept":
        return (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleAction("move-to-copy-editing")}
              className="w-full px-4 py-2 text-[13px] font-bold bg-[#333] text-white rounded-[6px] hover:bg-[#222] transition-colors"
            >
              Move to Copy Editing
            </button>
            <button
              onClick={() => handleAction("reject")}
              className="w-full px-4 py-2 text-[13px] bg-[#E0E0E0] text-[#555] rounded-[6px] hover:bg-[#D0D0D0] transition-colors"
            >
              Reject
            </button>
          </div>
        );

      case "Accept with Minor Changes":
        return (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleAction("re-assign-reviewers")}
              className="w-full px-4 py-2 text-[13px] font-bold bg-[#333] text-white rounded-[6px] hover:bg-[#222] transition-colors"
            >
              Re-assign to Reviewers
            </button>
          </div>
        );

      case "Accepted":
        return (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleAction("move-to-copy-editing")}
              className="w-full px-4 py-2 text-[13px] font-bold bg-[#333] text-white rounded-[6px] hover:bg-[#222] transition-colors"
            >
              Move to Copy Editing
            </button>
            <button
              onClick={() => handleAction("assign-copy-editors")}
              className="w-full px-4 py-2 text-[13px] bg-white text-[#333] border border-[#333] rounded-[6px] hover:bg-gray-50 transition-colors"
            >
              Assign Copy Editors
            </button>
          </div>
        );

      case "In Copy Editing":
        return (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleAction("mark-ready-for-production")}
              className="w-full px-4 py-2 text-[13px] font-bold bg-[#333] text-white rounded-[6px] hover:bg-[#222] transition-colors"
            >
              Mark Ready for Production
            </button>
          </div>
        );

      case "Ready for Production":
        return (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleAction("publish")}
              className="w-full px-4 py-2 text-[13px] font-bold bg-[#333] text-white rounded-[6px] hover:bg-[#222] transition-colors"
            >
              Publish
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const actions = renderActions();

  return (
    <div>
      <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-3">
        Editor Actions
      </div>

      {/* Action Buttons */}
      {actions}

      {actions && (
        <p className="text-[11px] text-gray-400 mt-3">
          Email notification will be sent to author
        </p>
      )}
    </div>
  );
}
