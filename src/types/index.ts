// Submission status types - full workflow
export type SubmissionStatus =
  | "In Desk Review"
  | "In Peer Review"
  | "Accept with Minor Changes"
  | "Conditional Accept"
  | "Accepted"
  | "Rejected"
  | "Revise & Resubmit"
  | "In Copy Editing"
  | "Ready for Production"
  | "Published";

// Content/submission types
export type ContentType =
  | "Article"
  | "Dialogue"
  | "Interstice"
  | "Introduction"
  | "Afterword"
  | "Book Review";

// Reviewer status for assigned reviewers
export type ReviewerStatus = "Pending" | "Submitted";

// Review recommendation (what reviewers choose)
export type ReviewRecommendation =
  | "Accept"
  | "Accept with Minor Changes"
  | "Conditional Accept"
  | "Revise & Resubmit"
  | "Reject";

// File types that can be attached to a submission
export type FileCategory =
  | "manuscript"
  | "image"
  | "supplement"
  | "copyedit-pdf"
  | "copyedit-word"
  | "markup"
  | "production-asset";

// A submitted review
export interface Review {
  id: string;
  reviewerId: string;
  submissionId: string;
  recommendation: ReviewRecommendation;
  commentsToEditor: string;
  commentsToAuthor: string;
  submittedDate: string;
  // Editor approval workflow
  releasedToAuthor: boolean;
  releasedDate?: string;
  editorModifiedComments?: string; // If editor edited the comments before releasing
  // Optional attached markup file
  markupFile?: string;
}

// A reviewer
export interface Reviewer {
  id: string;
  name: string;
  email: string;
  affiliation: string;
  expertise: string[];
  reviewsCompleted: number;
  avgTurnaroundDays: number;
  // For assigned reviewers:
  status?: ReviewerStatus;
  submittedDate?: string;
  review?: Review;
}

// A copy editor
export interface CopyEditor {
  id: string;
  name: string;
  email: string;
  affiliation: string;
  expertise: string[];
  // For assigned copy editors:
  status?: "Assigned" | "In Progress" | "Completed";
  assignedDate?: string;
  completedDate?: string;
  comments?: string;
}

// A submission/manuscript
export interface Submission {
  id: string;
  title: string;
  authorName: string;
  authorEmail: string;
  affiliation: string;
  preferredName?: string;
  pronouns?: string;
  biography?: string;
  status: SubmissionStatus;
  contentType: ContentType;
  submittedDate: string;
  currentVersion: number;
  assignedReviewers?: Reviewer[];
  assignedCopyEditors?: CopyEditor[];
  // Editor who entered the submission (for backend-entered content)
  enteredByEditor?: boolean;
  editorNotes?: string;
}

// Activity log entry
export interface ActivityEntry {
  date: string;
  description: string;
  actor?: string; // Who performed the action
  type?:
    | "status-change"
    | "file-upload"
    | "review"
    | "assignment"
    | "email"
    | "decision"
    | "general";
  fileId?: string; // Links to a FileVersion for download (used in file-upload entries)
}

// File version
export interface FileVersion {
  id: string;
  filename: string;
  version: number;
  label: string;
  uploadedDate: string;
  category?: FileCategory;
  uploadedBy?: string;
}

// Activity log keyed by submission ID
export type ActivityLog = Record<string, ActivityEntry[]>;

// File versions keyed by submission ID
export type FileVersionsMap = Record<string, FileVersion[]>;
