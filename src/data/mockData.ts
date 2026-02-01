import type {
  Submission,
  Reviewer,
  ActivityEntry,
  FileVersion,
  ActivityLog,
  FileVersionsMap,
} from "@/types";

// Pool of reviewers available for assignment
export const reviewers: Reviewer[] = [
  {
    id: "rev-001",
    name: "Dr. Sarah Chen",
    email: "s.chen@berkeley.edu",
    affiliation: "University of California, Berkeley",
    expertise: ["affect theory", "feminist theory", "embodiment"],
    reviewsCompleted: 24,
    avgTurnaroundDays: 18,
  },
  {
    id: "rev-002",
    name: "Dr. Marcus Johnson",
    email: "mjohnson@duke.edu",
    affiliation: "Duke University",
    expertise: ["digital media", "platform studies", "algorithmic culture"],
    reviewsCompleted: 31,
    avgTurnaroundDays: 21,
  },
  {
    id: "rev-003",
    name: "Dr. Elena Rodriguez",
    email: "e.rodriguez@nyu.edu",
    affiliation: "New York University",
    expertise: ["cultural studies", "affect", "performance studies"],
    reviewsCompleted: 18,
    avgTurnaroundDays: 16,
  },
  {
    id: "rev-004",
    name: "Dr. James Okonkwo",
    email: "jokonkwo@uchicago.edu",
    affiliation: "University of Chicago",
    expertise: ["critical theory", "media ecology", "posthumanism"],
    reviewsCompleted: 42,
    avgTurnaroundDays: 24,
  },
  {
    id: "rev-005",
    name: "Dr. Mei-Lin Park",
    email: "mpark@stanford.edu",
    affiliation: "Stanford University",
    expertise: ["new materialism", "digital humanities", "archive studies"],
    reviewsCompleted: 15,
    avgTurnaroundDays: 14,
  },
  {
    id: "rev-006",
    name: "Dr. David Thompson",
    email: "dthompson@umich.edu",
    affiliation: "University of Michigan",
    expertise: ["queer theory", "temporality", "affect theory"],
    reviewsCompleted: 27,
    avgTurnaroundDays: 19,
  },
  {
    id: "rev-007",
    name: "Dr. Aisha Patel",
    email: "apatel@columbia.edu",
    affiliation: "Columbia University",
    expertise: ["postcolonial theory", "sensation", "global media"],
    reviewsCompleted: 22,
    avgTurnaroundDays: 17,
  },
  {
    id: "rev-008",
    name: "Dr. Robert Kim",
    email: "rkim@ucla.edu",
    affiliation: "University of California, Los Angeles",
    expertise: ["film studies", "phenomenology", "visual culture"],
    reviewsCompleted: 36,
    avgTurnaroundDays: 22,
  },
];

// Submissions in various statuses
export const submissions: Submission[] = [
  {
    id: "2024-041",
    title: "Touching the Digital: Haptic Interfaces and the Phenomenology of Networked Sensation",
    authorName: "Dr. Amanda Foster",
    authorEmail: "afoster@northwestern.edu",
    affiliation: "Northwestern University",
    status: "Submitted",
    submittedDate: "January 28, 2024",
    currentVersion: 1,
  },
  {
    id: "2024-039",
    title: "Atmospheric Affects: Climate Anxiety and the Politics of Feeling in Contemporary Art",
    authorName: "Dr. Michael Rivera",
    authorEmail: "mrivera@utexas.edu",
    affiliation: "University of Texas at Austin",
    status: "In Desk Review",
    submittedDate: "January 22, 2024",
    currentVersion: 1,
  },
  {
    id: "2024-034",
    title: "The Capacity to Feel Otherwise: Affect Theory and Disability Justice Frameworks",
    authorName: "Dr. Rachel Kim",
    authorEmail: "rkim@brown.edu",
    affiliation: "Brown University",
    status: "In Peer Review",
    submittedDate: "January 15, 2024",
    currentVersion: 1,
    assignedReviewers: [
      {
        ...reviewers[0],
        status: "Submitted",
        dueDate: "February 15, 2024",
        submittedDate: "February 10, 2024",
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
    title: "Viral Intensities: Contagion, Affect, and the Spreadability of Online Content",
    authorName: "Dr. Thomas Wright",
    authorEmail: "twright@mit.edu",
    affiliation: "Massachusetts Institute of Technology",
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
    title: "Resonant Bodies: Sound Art, Affective Vibration, and Collective Listening Practices",
    authorName: "Dr. Carla Benedetti",
    authorEmail: "cbenedetti@yale.edu",
    affiliation: "Yale University",
    status: "Revision Requested",
    submittedDate: "December 18, 2023",
    currentVersion: 2,
  },
  {
    id: "2024-015",
    title: "Infrastructures of Intimacy: Platform Architectures and the Mediation of Closeness",
    authorName: "Dr. Jennifer Huang",
    authorEmail: "jhuang@princeton.edu",
    affiliation: "Princeton University",
    status: "Accepted",
    submittedDate: "December 5, 2023",
    currentVersion: 3,
    assignedCopyEditor: "Maria Santos",
  },
];

// Activity logs keyed by submission ID
export const activityLog: ActivityLog = {
  "2024-041": [
    {
      date: "January 28, 2024",
      description: "Manuscript submitted by Dr. Amanda Foster",
    },
    {
      date: "January 28, 2024",
      description: "Submission acknowledgment sent to author",
    },
  ],
  "2024-039": [
    {
      date: "January 22, 2024",
      description: "Manuscript submitted by Dr. Michael Rivera",
    },
    {
      date: "January 22, 2024",
      description: "Submission acknowledgment sent to author",
    },
    {
      date: "January 24, 2024",
      description: "Moved to Desk Review by Editor-in-Chief",
    },
  ],
  "2024-034": [
    {
      date: "January 15, 2024",
      description: "Manuscript submitted by Dr. Rachel Kim",
    },
    {
      date: "January 15, 2024",
      description: "Submission acknowledgment sent to author",
    },
    {
      date: "January 17, 2024",
      description: "Desk review completed - forwarded to peer review",
    },
    {
      date: "January 18, 2024",
      description: "Reviewer invitation sent to Dr. Sarah Chen",
    },
    {
      date: "January 19, 2024",
      description: "Dr. Sarah Chen accepted review invitation",
    },
    {
      date: "January 20, 2024",
      description: "Reviewer invitation sent to Dr. David Thompson",
    },
    {
      date: "January 21, 2024",
      description: "Dr. David Thompson accepted review invitation",
    },
    {
      date: "February 10, 2024",
      description: "Review submitted by Dr. Sarah Chen",
    },
  ],
  "2024-028": [
    {
      date: "January 8, 2024",
      description: "Manuscript submitted by Dr. Thomas Wright",
    },
    {
      date: "January 8, 2024",
      description: "Submission acknowledgment sent to author",
    },
    {
      date: "January 10, 2024",
      description: "Desk review completed - forwarded to peer review",
    },
    {
      date: "January 12, 2024",
      description: "Reviewer invitation sent to Dr. Marcus Johnson",
    },
    {
      date: "January 14, 2024",
      description: "Dr. Marcus Johnson accepted review invitation",
    },
  ],
  "2024-022": [
    {
      date: "December 18, 2023",
      description: "Manuscript submitted by Dr. Carla Benedetti",
    },
    {
      date: "December 18, 2023",
      description: "Submission acknowledgment sent to author",
    },
    {
      date: "December 20, 2023",
      description: "Desk review completed - forwarded to peer review",
    },
    {
      date: "December 22, 2023",
      description: "Reviewer invitation sent to Dr. Elena Rodriguez",
    },
    {
      date: "December 23, 2023",
      description: "Dr. Elena Rodriguez accepted review invitation",
    },
    {
      date: "December 24, 2023",
      description: "Reviewer invitation sent to Dr. James Okonkwo",
    },
    {
      date: "December 26, 2023",
      description: "Dr. James Okonkwo accepted review invitation",
    },
    {
      date: "January 10, 2024",
      description: "Review submitted by Dr. Elena Rodriguez",
    },
    {
      date: "January 14, 2024",
      description: "Review submitted by Dr. James Okonkwo",
    },
    {
      date: "January 16, 2024",
      description: "Decision: Major revisions requested",
    },
    {
      date: "January 16, 2024",
      description: "Revision request letter sent to author",
    },
  ],
  "2024-015": [
    {
      date: "December 5, 2023",
      description: "Manuscript submitted by Dr. Jennifer Huang",
    },
    {
      date: "December 5, 2023",
      description: "Submission acknowledgment sent to author",
    },
    {
      date: "December 7, 2023",
      description: "Desk review completed - forwarded to peer review",
    },
    {
      date: "December 9, 2023",
      description: "Reviewer invitation sent to Dr. Mei-Lin Park",
    },
    {
      date: "December 10, 2023",
      description: "Dr. Mei-Lin Park accepted review invitation",
    },
    {
      date: "December 11, 2023",
      description: "Reviewer invitation sent to Dr. Aisha Patel",
    },
    {
      date: "December 12, 2023",
      description: "Dr. Aisha Patel accepted review invitation",
    },
    {
      date: "December 28, 2023",
      description: "Review submitted by Dr. Mei-Lin Park",
    },
    {
      date: "January 2, 2024",
      description: "Review submitted by Dr. Aisha Patel",
    },
    {
      date: "January 4, 2024",
      description: "Decision: Minor revisions requested",
    },
    {
      date: "January 4, 2024",
      description: "Revision request letter sent to author",
    },
    {
      date: "January 12, 2024",
      description: "Revised manuscript (v2) submitted by author",
    },
    {
      date: "January 15, 2024",
      description: "Revision reviewed - additional minor changes requested",
    },
    {
      date: "January 20, 2024",
      description: "Final revision (v3) submitted by author",
    },
    {
      date: "January 22, 2024",
      description: "Manuscript accepted for publication",
    },
    {
      date: "January 23, 2024",
      description: "Acceptance letter sent to author",
    },
    {
      date: "January 25, 2024",
      description: "Copy editor Maria Santos assigned",
    },
  ],
};

// File versions keyed by submission ID
export const fileVersions: FileVersionsMap = {
  "2024-041": [
    {
      id: "file-041-1",
      filename: "foster_haptic_interfaces_2024.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "January 28, 2024",
    },
  ],
  "2024-039": [
    {
      id: "file-039-1",
      filename: "rivera_atmospheric_affects_2024.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "January 22, 2024",
    },
  ],
  "2024-034": [
    {
      id: "file-034-1",
      filename: "kim_capacity_to_feel_2024.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "January 15, 2024",
    },
  ],
  "2024-028": [
    {
      id: "file-028-1",
      filename: "wright_viral_intensities_2024.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "January 8, 2024",
    },
  ],
  "2024-022": [
    {
      id: "file-022-1",
      filename: "benedetti_resonant_bodies_2023.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "December 18, 2023",
    },
    {
      id: "file-022-2",
      filename: "benedetti_resonant_bodies_r1_2024.docx",
      version: 2,
      label: "Author Revision (Pending)",
      uploadedDate: "January 25, 2024",
    },
  ],
  "2024-015": [
    {
      id: "file-015-1",
      filename: "huang_infrastructures_intimacy_2023.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "December 5, 2023",
    },
    {
      id: "file-015-2",
      filename: "huang_infrastructures_intimacy_r1_2024.docx",
      version: 2,
      label: "First Revision",
      uploadedDate: "January 12, 2024",
    },
    {
      id: "file-015-3",
      filename: "huang_infrastructures_intimacy_r2_2024.docx",
      version: 3,
      label: "Final Accepted Version",
      uploadedDate: "January 20, 2024",
    },
  ],
};

// Helper functions for working with the data
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
