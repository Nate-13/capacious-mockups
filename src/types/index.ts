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
