"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useToast } from "@/components/Toast";
import {
  submissions as baseSubmissions,
  reviewers as baseReviewers,
  copyEditors as baseCopyEditors,
  getActivityForSubmission,
  getReviewsForSubmission,
  getFilesForSubmission,
} from "@/data/mockData";
import type {
  Submission,
  SubmissionStatus,
  ContentType,
  Reviewer,
  Review,
  ReviewRecommendation,
  CopyEditor,
  ActivityEntry,
  FileVersion,
} from "@/types";

// --- State shape ---

interface DemoState {
  statusOverrides: Record<string, SubmissionStatus>;
  contentTypeOverrides: Record<string, ContentType>;
  addedReviewers: Record<string, Reviewer[]>;
  reviewerStatusOverrides: Record<string, "Submitted">;
  submittedReviews: Record<string, Review>;
  releasedReviews: Record<
    string,
    { releasedDate: string; editedComments?: string }
  >;
  addedCopyEditors: Record<string, CopyEditor[]>;
  addedActivityEntries: Record<string, ActivityEntry[]>;
}

const initialState: DemoState = {
  statusOverrides: {},
  contentTypeOverrides: {},
  addedReviewers: {},
  reviewerStatusOverrides: {},
  submittedReviews: {},
  releasedReviews: {},
  addedCopyEditors: {},
  addedActivityEntries: {},
};

// --- Context interface ---

interface DemoStateContextType {
  version: number;
  updateSubmissionStatus: (id: string, status: SubmissionStatus) => void;
  updateContentType: (id: string, contentType: ContentType) => void;
  assignReviewers: (submissionId: string, reviewerIds: string[]) => void;
  submitReview: (
    submissionId: string,
    reviewerId: string,
    recommendation: ReviewRecommendation,
    commentsToEditor: string,
    commentsToAuthor: string,
  ) => void;
  releaseReview: (
    submissionId: string,
    reviewerId: string,
    editedComments?: string,
  ) => void;
  makeEditorDecision: (submissionId: string, decision: string) => void;
  assignCopyEditors: (submissionId: string, editorIds: string[]) => void;
  markReadyForProduction: (submissionId: string) => void;
  getSubmission: (id: string) => Submission | undefined;
  getAllSubmissions: () => Submission[];
  getActivity: (id: string) => ActivityEntry[];
  getFiles: (id: string) => FileVersion[];
  resetDemoState: () => void;
}

const DemoStateContext = createContext<DemoStateContextType | undefined>(
  undefined,
);

// --- Helper: merge a single submission with overrides ---

function mergeSubmission(base: Submission, state: DemoState): Submission {
  const merged = { ...base };

  // Status override
  if (state.statusOverrides[base.id]) {
    merged.status = state.statusOverrides[base.id];
  }

  // Content type override
  if (state.contentTypeOverrides[base.id]) {
    merged.contentType = state.contentTypeOverrides[base.id];
  }

  // Merge reviewers
  const baseReviewersList = base.assignedReviewers
    ? base.assignedReviewers.map((r) => {
        const key = `${base.id}-${r.id}`;
        const reviewer = { ...r };

        // Status override
        if (state.reviewerStatusOverrides[key]) {
          reviewer.status = state.reviewerStatusOverrides[key];
        }

        // Submitted review
        if (state.submittedReviews[key]) {
          reviewer.status = "Submitted";
          reviewer.review = state.submittedReviews[key];
          reviewer.submittedDate = state.submittedReviews[key].submittedDate;
        }

        // Released review override
        if (reviewer.review && state.releasedReviews[key]) {
          reviewer.review = {
            ...reviewer.review,
            releasedToAuthor: true,
            releasedDate: state.releasedReviews[key].releasedDate,
            ...(state.releasedReviews[key].editedComments
              ? {
                  editorModifiedComments:
                    state.releasedReviews[key].editedComments,
                }
              : {}),
          };
        }

        return reviewer;
      })
    : [];

  const addedRevs = state.addedReviewers[base.id] || [];
  if (baseReviewersList.length > 0 || addedRevs.length > 0) {
    merged.assignedReviewers = [...baseReviewersList, ...addedRevs];
  }

  // Merge copy editors
  const baseCEList = base.assignedCopyEditors || [];
  const addedCEs = state.addedCopyEditors[base.id] || [];
  if (baseCEList.length > 0 || addedCEs.length > 0) {
    merged.assignedCopyEditors = [...baseCEList, ...addedCEs];
  }

  return merged;
}

// --- Provider ---

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(initialState);
  const [version, setVersion] = useState(0);
  const { showToast } = useToast();

  const bump = useCallback(() => setVersion((v) => v + 1), []);

  const addActivity = useCallback(
    (submissionId: string, entry: Omit<ActivityEntry, "date">) => {
      const fullEntry: ActivityEntry = {
        ...entry,
        date: "February 25, 2025",
      };
      setState((prev) => ({
        ...prev,
        addedActivityEntries: {
          ...prev.addedActivityEntries,
          [submissionId]: [
            ...(prev.addedActivityEntries[submissionId] || []),
            fullEntry,
          ],
        },
      }));
    },
    [],
  );

  // --- Mutations ---

  const updateSubmissionStatus = useCallback(
    (id: string, status: SubmissionStatus) => {
      setState((prev) => ({
        ...prev,
        statusOverrides: { ...prev.statusOverrides, [id]: status },
      }));
      addActivity(id, {
        description: `Status changed to "${status}"`,
        actor: "Managing Editor",
        type: "status-change",
      });
      bump();
      showToast(`Moved to ${status}`, "success");
    },
    [addActivity, bump, showToast],
  );

  const updateContentType = useCallback(
    (id: string, contentType: ContentType) => {
      setState((prev) => ({
        ...prev,
        contentTypeOverrides: {
          ...prev.contentTypeOverrides,
          [id]: contentType,
        },
      }));
      bump();
      showToast(`Content type changed to ${contentType}`, "info");
    },
    [bump, showToast],
  );

  const assignReviewers = useCallback(
    (submissionId: string, reviewerIds: string[]) => {
      const newReviewers: Reviewer[] = [];
      for (const rid of reviewerIds) {
        const base = baseReviewers.find((r) => r.id === rid);
        if (base) {
          newReviewers.push({ ...base, status: "Pending" });
        }
      }

      setState((prev) => ({
        ...prev,
        addedReviewers: {
          ...prev.addedReviewers,
          [submissionId]: [
            ...(prev.addedReviewers[submissionId] || []),
            ...newReviewers,
          ],
        },
      }));

      newReviewers.forEach((r) => {
        addActivity(submissionId, {
          description: `Reviewer assigned: ${r.name}`,
          actor: "Managing Editor",
          type: "assignment",
        });
      });

      bump();
      showToast(
        `${newReviewers.length} reviewer${newReviewers.length > 1 ? "s" : ""} assigned`,
        "success",
      );
    },
    [addActivity, bump, showToast],
  );

  const submitReview = useCallback(
    (
      submissionId: string,
      reviewerId: string,
      recommendation: ReviewRecommendation,
      commentsToEditor: string,
      commentsToAuthor: string,
    ) => {
      const key = `${submissionId}-${reviewerId}`;
      const review: Review = {
        id: `review-demo-${Date.now()}`,
        reviewerId,
        submissionId,
        recommendation,
        commentsToEditor,
        commentsToAuthor,
        submittedDate: "February 25, 2025",
        releasedToAuthor: false,
      };

      setState((prev) => ({
        ...prev,
        submittedReviews: { ...prev.submittedReviews, [key]: review },
        reviewerStatusOverrides: {
          ...prev.reviewerStatusOverrides,
          [key]: "Submitted",
        },
      }));

      const reviewer = baseReviewers.find((r) => r.id === reviewerId);
      addActivity(submissionId, {
        description: `Review submitted by ${reviewer?.name || "Reviewer"}`,
        actor: reviewer?.name || "Reviewer",
        type: "review",
      });

      bump();
      showToast("Review submitted successfully", "success");
    },
    [addActivity, bump, showToast],
  );

  const releaseReview = useCallback(
    (submissionId: string, reviewerId: string, editedComments?: string) => {
      const key = `${submissionId}-${reviewerId}`;
      setState((prev) => ({
        ...prev,
        releasedReviews: {
          ...prev.releasedReviews,
          [key]: {
            releasedDate: "February 25, 2025",
            editedComments,
          },
        },
      }));

      addActivity(submissionId, {
        description: "Review released to author",
        actor: "Managing Editor",
        type: "email",
      });

      bump();
      showToast("Review released to author", "success");
    },
    [addActivity, bump, showToast],
  );

  const makeEditorDecision = useCallback(
    (submissionId: string, decision: string) => {
      const statusMap: Record<string, SubmissionStatus> = {
        accept: "Accepted",
        "conditional-accept": "Conditional Accept",
        "accept-minor-changes": "Accept with Minor Changes",
        "revise-resubmit": "Revise & Resubmit",
        reject: "Rejected",
      };

      const newStatus = statusMap[decision];
      if (!newStatus) return;

      setState((prev) => ({
        ...prev,
        statusOverrides: {
          ...prev.statusOverrides,
          [submissionId]: newStatus,
        },
      }));

      addActivity(submissionId, {
        description: `Editor decision: ${newStatus}`,
        actor: "Managing Editor",
        type: "decision",
      });

      bump();
      showToast(`Decision: ${newStatus}`, "success");
    },
    [addActivity, bump, showToast],
  );

  const assignCopyEditors = useCallback(
    (submissionId: string, editorIds: string[]) => {
      const newEditors: CopyEditor[] = [];
      for (const eid of editorIds) {
        const base = baseCopyEditors.find((e) => e.id === eid);
        if (base) {
          newEditors.push({
            ...base,
            status: "Assigned",
            assignedDate: "February 25, 2025",
          });
        }
      }

      setState((prev) => ({
        ...prev,
        addedCopyEditors: {
          ...prev.addedCopyEditors,
          [submissionId]: [
            ...(prev.addedCopyEditors[submissionId] || []),
            ...newEditors,
          ],
        },
      }));

      newEditors.forEach((e) => {
        addActivity(submissionId, {
          description: `Copy editor assigned: ${e.name}`,
          actor: "Managing Editor",
          type: "assignment",
        });
      });

      bump();
      showToast(
        `${newEditors.length} copy editor${newEditors.length > 1 ? "s" : ""} assigned`,
        "success",
      );
    },
    [addActivity, bump, showToast],
  );

  const markReadyForProduction = useCallback(
    (submissionId: string) => {
      setState((prev) => ({
        ...prev,
        statusOverrides: {
          ...prev.statusOverrides,
          [submissionId]: "Ready for Production",
        },
      }));

      addActivity(submissionId, {
        description: "Marked as Ready for Production",
        actor: "Managing Editor",
        type: "status-change",
      });

      bump();
      showToast("Marked as Ready for Production", "success");
    },
    [addActivity, bump, showToast],
  );

  // --- Accessors ---

  const getSubmission = useCallback(
    (id: string): Submission | undefined => {
      const base = baseSubmissions.find((s) => s.id === id);
      if (!base) return undefined;
      return mergeSubmission(base, state);
    },
    [state],
  );

  const getAllSubmissions = useCallback((): Submission[] => {
    return baseSubmissions.map((s) => mergeSubmission(s, state));
  }, [state]);

  const getActivity = useCallback(
    (id: string): ActivityEntry[] => {
      const base = getActivityForSubmission(id);
      const added = state.addedActivityEntries[id] || [];
      return [...base, ...added];
    },
    [state],
  );

  const getFiles = useCallback((id: string): FileVersion[] => {
    return getFilesForSubmission(id);
  }, []);

  const resetDemoState = useCallback(() => {
    setState(initialState);
    setVersion(0);
  }, []);

  return (
    <DemoStateContext.Provider
      value={{
        version,
        updateSubmissionStatus,
        updateContentType,
        assignReviewers,
        submitReview,
        releaseReview,
        makeEditorDecision,
        assignCopyEditors,
        markReadyForProduction,
        getSubmission,
        getAllSubmissions,
        getActivity,
        getFiles,
        resetDemoState,
      }}
    >
      {children}
    </DemoStateContext.Provider>
  );
}

export function useDemoState(): DemoStateContextType {
  const context = useContext(DemoStateContext);
  if (context === undefined) {
    throw new Error("useDemoState must be used within a DemoStateProvider");
  }
  return context;
}
