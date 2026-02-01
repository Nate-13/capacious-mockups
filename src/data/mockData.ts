import type {
  Submission,
  Reviewer,
  Review,
  ActivityEntry,
  FileVersion,
  ActivityLog,
  FileVersionsMap,
} from "@/types";

// Mock reviews
export const reviews: Review[] = [
  {
    id: "review-001",
    reviewerId: "rev-001",
    submissionId: "2024-034",
    recommendation: "Minor Revisions",
    commentsToEditor: "This manuscript presents interesting findings with solid methodology. However, the literature review could be more comprehensive. I recommend minor revisions before acceptance.",
    commentsToAuthor: "Thank you for this well-written submission. The methodology is sound and the results are clearly presented. I have a few suggestions:\n\n1. The introduction would benefit from additional context regarding recent developments in the field.\n2. Figure 2 could use clearer labeling.\n3. The discussion section should address the limitations more explicitly.\n\nOverall, this is strong work that will make a valuable contribution after minor revisions.",
    submittedDate: "February 10, 2024",
    releasedToAuthor: false, // Editor hasn't approved yet
  },
  {
    id: "review-002",
    reviewerId: "rev-002",
    submissionId: "2024-022",
    recommendation: "Major Revisions",
    commentsToEditor: "The topic is relevant but the execution needs significant improvement. The statistical analysis is flawed and conclusions are overstated. Recommend major revisions.",
    commentsToAuthor: "The paper addresses an important topic, but several issues need to be addressed:\n\n1. The sample size is too small to support the conclusions drawn. Please expand the dataset or temper your claims.\n2. Section 3.2 lacks sufficient detail about the experimental setup.\n3. The statistical methods used (t-tests) may not be appropriate for this data distribution.\n4. Several claims in the discussion are not supported by the presented data.\n\nI encourage the authors to substantially revise and resubmit.",
    submittedDate: "January 8, 2024",
    releasedToAuthor: true,
    releasedDate: "January 12, 2024",
  },
  {
    id: "review-003",
    reviewerId: "rev-003",
    submissionId: "2024-022",
    recommendation: "Major Revisions",
    commentsToEditor: "Interesting concept but poorly executed. Needs substantial work.",
    commentsToAuthor: "While the research question is interesting, the manuscript requires major revisions:\n\n1. The literature review misses several key recent publications.\n2. The methodology section needs more detail for reproducibility.\n3. Results presentation could be improved with better visualizations.\n\nPlease address these concerns in your revision.",
    submittedDate: "January 9, 2024",
    releasedToAuthor: true,
    releasedDate: "January 12, 2024",
    editorModifiedComments: "The manuscript requires major revisions:\n\n1. The literature review misses several key recent publications.\n2. The methodology section needs more detail for reproducibility.\n3. Results presentation could be improved with better visualizations.\n\nPlease address these concerns in your revision.", // Editor softened the opening
  },
];

// Pool of reviewers available for assignment
export const reviewers: Reviewer[] = [
  {
    id: "rev-001",
    name: "Dr. Sarah Chen",
    email: "s.chen@university.edu",
    affiliation: "State University",
    expertise: ["research", "analysis", "methodology"],
    reviewsCompleted: 24,
    avgTurnaroundDays: 18,
  },
  {
    id: "rev-002",
    name: "Dr. Marcus Johnson",
    email: "mjohnson@college.edu",
    affiliation: "City College",
    expertise: ["writing", "theory", "review"],
    reviewsCompleted: 31,
    avgTurnaroundDays: 21,
  },
  {
    id: "rev-003",
    name: "Dr. Elena Rodriguez",
    email: "e.rodriguez@institute.edu",
    affiliation: "Research Institute",
    expertise: ["studies", "analysis", "critique"],
    reviewsCompleted: 18,
    avgTurnaroundDays: 16,
  },
  {
    id: "rev-004",
    name: "Dr. James Lee",
    email: "jlee@university.edu",
    affiliation: "Northern University",
    expertise: ["theory", "practice", "research"],
    reviewsCompleted: 42,
    avgTurnaroundDays: 24,
  },
  {
    id: "rev-005",
    name: "Dr. Lisa Park",
    email: "lpark@college.edu",
    affiliation: "Western College",
    expertise: ["methodology", "writing", "review"],
    reviewsCompleted: 15,
    avgTurnaroundDays: 14,
  },
  {
    id: "rev-006",
    name: "Dr. David Thompson",
    email: "dthompson@institute.edu",
    affiliation: "Eastern Institute",
    expertise: ["analysis", "theory", "research"],
    reviewsCompleted: 27,
    avgTurnaroundDays: 19,
  },
];

// Submissions in various statuses
export const submissions: Submission[] = [
  {
    id: "2024-041",
    title: "Sample Research Paper Title",
    authorName: "John Smith",
    authorEmail: "jsmith@example.com",
    affiliation: "Example University",
    status: "Submitted",
    submittedDate: "January 28, 2024",
    currentVersion: 1,
  },
  {
    id: "2024-039",
    title: "Another Example Manuscript",
    authorName: "Jane Doe",
    authorEmail: "jdoe@example.com",
    affiliation: "Sample College",
    status: "Revision Requested",
    submittedDate: "January 22, 2024",
    currentVersion: 2,
    assignedReviewers: [
      {
        ...reviewers[3],
        status: "Submitted",
        dueDate: "February 5, 2024",
        submittedDate: "February 3, 2024",
        review: {
          id: "review-004",
          reviewerId: "rev-004",
          submissionId: "2024-039",
          recommendation: "Minor Revisions",
          commentsToEditor: "Good work overall. Minor issues that should be easy to address.",
          commentsToAuthor: "This is a well-written manuscript with clear contributions. Please address the following:\n\n1. Clarify the methodology in section 2.3\n2. Add more recent references to support your claims\n3. The conclusion could be strengthened\n\nI recommend acceptance after these minor revisions.",
          submittedDate: "February 3, 2024",
          releasedToAuthor: true,
          releasedDate: "February 5, 2024",
        },
      },
    ],
  },
  {
    id: "2024-034",
    title: "Research Study Draft",
    authorName: "Alice Johnson",
    authorEmail: "ajohnson@example.com",
    affiliation: "Test University",
    status: "In Peer Review",
    submittedDate: "January 15, 2024",
    currentVersion: 1,
    assignedReviewers: [
      {
        ...reviewers[0],
        status: "Submitted",
        dueDate: "February 15, 2024",
        submittedDate: "February 10, 2024",
        review: reviews[0],
      },
      {
        ...reviewers[5],
        status: "Pending",
        dueDate: "February 20, 2024",
      },
    ],
  },
  {
    id: "2024-028",
    title: "Placeholder Article Name",
    authorName: "Bob Williams",
    authorEmail: "bwilliams@example.com",
    affiliation: "Demo Institute",
    status: "In Peer Review",
    submittedDate: "January 8, 2024",
    currentVersion: 1,
    assignedReviewers: [
      {
        ...reviewers[1],
        status: "Pending",
        dueDate: "February 12, 2024",
      },
    ],
  },
  {
    id: "2024-022",
    title: "Draft Paper for Review",
    authorName: "Carol Davis",
    authorEmail: "cdavis@example.com",
    affiliation: "Testing College",
    status: "Revision Requested",
    submittedDate: "December 18, 2023",
    currentVersion: 2,
    assignedReviewers: [
      {
        ...reviewers[1],
        status: "Submitted",
        dueDate: "January 5, 2024",
        submittedDate: "January 8, 2024",
        review: reviews[1],
      },
      {
        ...reviewers[2],
        status: "Submitted",
        dueDate: "January 5, 2024",
        submittedDate: "January 9, 2024",
        review: reviews[2],
      },
    ],
  },
  {
    id: "2024-015",
    title: "Final Manuscript Example",
    authorName: "David Miller",
    authorEmail: "dmiller@example.com",
    affiliation: "Mock University",
    status: "Accepted",
    submittedDate: "December 5, 2023",
    currentVersion: 3,
    assignedCopyEditor: "Maria Santos",
  },
];

// Activity logs keyed by submission ID
export const activityLog: ActivityLog = {
  "2024-041": [
    { date: "Jan 28, 2024", description: "Manuscript submitted" },
    { date: "Jan 28, 2024", description: "Confirmation sent to author" },
  ],
  "2024-039": [
    { date: "Jan 22, 2024", description: "Manuscript submitted" },
    { date: "Jan 22, 2024", description: "Confirmation sent to author" },
    { date: "Jan 24, 2024", description: "Moved to desk review" },
  ],
  "2024-034": [
    { date: "Jan 15, 2024", description: "Manuscript submitted" },
    { date: "Jan 17, 2024", description: "Desk review completed" },
    { date: "Jan 18, 2024", description: "Sent to peer review" },
    { date: "Jan 19, 2024", description: "Reviewer 1 assigned" },
    { date: "Jan 21, 2024", description: "Reviewer 2 assigned" },
    { date: "Feb 10, 2024", description: "Review 1 submitted" },
  ],
  "2024-028": [
    { date: "Jan 8, 2024", description: "Manuscript submitted" },
    { date: "Jan 10, 2024", description: "Desk review completed" },
    { date: "Jan 12, 2024", description: "Reviewer assigned" },
  ],
  "2024-022": [
    { date: "Dec 18, 2023", description: "Manuscript submitted" },
    { date: "Dec 20, 2023", description: "Sent to peer review" },
    { date: "Jan 10, 2024", description: "Reviews completed" },
    { date: "Jan 16, 2024", description: "Revisions requested" },
  ],
  "2024-015": [
    { date: "Dec 5, 2023", description: "Manuscript submitted" },
    { date: "Dec 7, 2023", description: "Sent to peer review" },
    { date: "Jan 4, 2024", description: "Minor revisions requested" },
    { date: "Jan 20, 2024", description: "Final revision received" },
    { date: "Jan 22, 2024", description: "Manuscript accepted" },
    { date: "Jan 25, 2024", description: "Copy editor assigned" },
  ],
};

// File versions keyed by submission ID
export const fileVersions: FileVersionsMap = {
  "2024-041": [
    {
      id: "file-041-1",
      filename: "manuscript_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "January 28, 2024",
    },
  ],
  "2024-039": [
    {
      id: "file-039-1",
      filename: "manuscript_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "January 22, 2024",
    },
  ],
  "2024-034": [
    {
      id: "file-034-1",
      filename: "manuscript_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "January 15, 2024",
    },
  ],
  "2024-028": [
    {
      id: "file-028-1",
      filename: "manuscript_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "January 8, 2024",
    },
  ],
  "2024-022": [
    {
      id: "file-022-1",
      filename: "manuscript_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "December 18, 2023",
    },
    {
      id: "file-022-2",
      filename: "manuscript_v2.docx",
      version: 2,
      label: "Revision",
      uploadedDate: "January 25, 2024",
    },
  ],
  "2024-015": [
    {
      id: "file-015-1",
      filename: "manuscript_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "December 5, 2023",
    },
    {
      id: "file-015-2",
      filename: "manuscript_v2.docx",
      version: 2,
      label: "First Revision",
      uploadedDate: "January 12, 2024",
    },
    {
      id: "file-015-3",
      filename: "manuscript_final.docx",
      version: 3,
      label: "Final Version",
      uploadedDate: "January 20, 2024",
    },
  ],
};

// Helper functions
export function getSubmissionById(id: string): Submission | undefined {
  return submissions.find((s) => s.id === id);
}

export function getActivityForSubmission(id: string): ActivityEntry[] {
  return activityLog[id] || [];
}

export function getFilesForSubmission(id: string): FileVersion[] {
  return fileVersions[id] || [];
}

export function getAvailableReviewers(): Reviewer[] {
  return reviewers;
}

export function getSubmissionsByStatus(status: Submission["status"]): Submission[] {
  return submissions.filter((s) => s.status === status);
}

export function getReviewsForSubmission(submissionId: string): Review[] {
  return reviews.filter((r) => r.submissionId === submissionId);
}

export function getReviewByReviewer(submissionId: string, reviewerId: string): Review | undefined {
  return reviews.find((r) => r.submissionId === submissionId && r.reviewerId === reviewerId);
}
