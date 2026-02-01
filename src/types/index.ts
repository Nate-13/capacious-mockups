// Submission status types
export type SubmissionStatus =
  | "Submitted"
  | "In Desk Review"
  | "In Peer Review"
  | "Revision Requested"
  | "Conditional Accept"
  | "Accepted"
  | "Rejected"
  | "In Copy Editing"
  | "Published";

// Reviewer status for assigned reviewers
export type ReviewerStatus = "Pending" | "Submitted";

// Review recommendation
export type ReviewRecommendation =
  | "Accept"
  | "Minor Revisions"
  | "Major Revisions"
  | "Reject";

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
  dueDate?: string;
  submittedDate?: string;
  review?: Review;
}

// A submission/manuscript
export interface Submission {
  id: string;
  title: string;
  authorName: string;
  authorEmail: string;
  affiliation: string;
  status: SubmissionStatus;
  submittedDate: string;
  currentVersion: number;
  assignedReviewers?: Reviewer[];
  assignedCopyEditor?: string;
}

// Activity log entry
export interface ActivityEntry {
  date: string;
  description: string;
}

// File version
export interface FileVersion {
  id: string;
  filename: string;
  version: number;
  label: string;
  uploadedDate: string;
}

// Activity log keyed by submission ID
export type ActivityLog = Record<string, ActivityEntry[]>;

// File versions keyed by submission ID
export type FileVersionsMap = Record<string, FileVersion[]>;
