import type {
  Submission,
  Reviewer,
  Review,
  CopyEditor,
  ActivityEntry,
  FileVersion,
  ActivityLog,
  FileVersionsMap,
} from "@/types";

// Pool of copy editors
export const copyEditors: CopyEditor[] = [
  {
    id: "ce-001",
    name: "Maria Santos",
    email: "m.santos@university.edu",
    affiliation: "Millersville University",
    expertise: ["grammar", "APA style", "academic writing"],
  },
  {
    id: "ce-002",
    name: "Samuel Pratt",
    email: "s.pratt@college.edu",
    affiliation: "Syracuse University",
    expertise: ["copy editing", "proofreading", "citations"],
  },
  {
    id: "ce-003",
    name: "Yuki Tanaka",
    email: "y.tanaka@institute.edu",
    affiliation: "Northeastern University",
    expertise: ["style guides", "formatting", "academic English"],
  },
];

// Mock reviews
export const reviews: Review[] = [
  {
    id: "review-001",
    reviewerId: "rev-001",
    submissionId: "2024-034",
    recommendation: "Accept with Minor Changes",
    commentsToEditor:
      "This manuscript presents interesting findings with solid methodology. However, the literature review could be more comprehensive. I recommend minor revisions before acceptance.",
    commentsToAuthor:
      "Thank you for this well-written submission. The methodology is sound and the results are clearly presented. I have a few suggestions:\n\n1. The introduction would benefit from additional context regarding recent developments in the field.\n2. Figure 2 could use clearer labeling.\n3. The discussion section should address the limitations more explicitly.\n\nOverall, this is strong work that will make a valuable contribution after minor revisions.",
    submittedDate: "February 10, 2024",
    releasedToAuthor: false,
    markupFile: "manuscript_marked_up.pdf",
  },
  {
    id: "review-002",
    reviewerId: "rev-002",
    submissionId: "2024-022",
    recommendation: "Revise & Resubmit",
    commentsToEditor:
      "The topic is relevant but the execution needs significant improvement. The statistical analysis is flawed and conclusions are overstated. Recommend revise and resubmit.",
    commentsToAuthor:
      "The paper addresses an important topic, but several issues need to be addressed:\n\n1. The sample size is too small to support the conclusions drawn. Please expand the dataset or temper your claims.\n2. Section 3.2 lacks sufficient detail about the experimental setup.\n3. The statistical methods used (t-tests) may not be appropriate for this data distribution.\n4. Several claims in the discussion are not supported by the presented data.\n\nI encourage the authors to substantially revise and resubmit.",
    submittedDate: "January 8, 2024",
    releasedToAuthor: true,
    releasedDate: "January 12, 2024",
  },
  {
    id: "review-003",
    reviewerId: "rev-003",
    submissionId: "2024-022",
    recommendation: "Revise & Resubmit",
    commentsToEditor:
      "Interesting concept but poorly executed. Needs substantial work.",
    commentsToAuthor:
      "While the research question is interesting, the manuscript requires major revisions:\n\n1. The literature review misses several key recent publications.\n2. The methodology section needs more detail for reproducibility.\n3. Results presentation could be improved with better visualizations.\n\nPlease address these concerns in your revision.",
    submittedDate: "January 9, 2024",
    releasedToAuthor: true,
    releasedDate: "January 12, 2024",
    editorModifiedComments:
      "The manuscript requires major revisions:\n\n1. The literature review misses several key recent publications.\n2. The methodology section needs more detail for reproducibility.\n3. Results presentation could be improved with better visualizations.\n\nPlease address these concerns in your revision.",
  },
  // Reviews for submission in "Accept with Minor Changes" status
  {
    id: "review-004",
    reviewerId: "rev-004",
    submissionId: "2024-039",
    recommendation: "Accept with Minor Changes",
    commentsToEditor:
      "Good work overall. Minor issues that should be easy to address.",
    commentsToAuthor:
      "This is a well-written manuscript with clear contributions. Please address the following:\n\n1. Clarify the methodology in section 2.3\n2. Add more recent references to support your claims\n3. The conclusion could be strengthened\n\nI recommend acceptance after these minor revisions.",
    submittedDate: "February 3, 2024",
    releasedToAuthor: true,
    releasedDate: "February 5, 2024",
    markupFile: "review_annotations.pdf",
  },
  {
    id: "review-005",
    reviewerId: "rev-005",
    submissionId: "2024-039",
    recommendation: "Accept",
    commentsToEditor: "Solid paper, well argued and clearly written.",
    commentsToAuthor:
      "Excellent work. The arguments are compelling and the evidence is well-presented. Minor formatting issues aside, this is ready for publication.",
    submittedDate: "February 4, 2024",
    releasedToAuthor: true,
    releasedDate: "February 5, 2024",
  },
  // Reviews for Conditional Accept submission
  {
    id: "review-006",
    reviewerId: "rev-001",
    submissionId: "2024-046",
    recommendation: "Conditional Accept",
    commentsToEditor:
      "Almost there but a few conceptual issues that the editor should work through with the author. The section on ambivalence needs tightening.",
    commentsToAuthor:
      "This is a compelling piece that makes an important contribution. I recommend conditional acceptance pending resolution of:\n\n1. The framing of ambivalence in Section 3 needs to be more precisely defined.\n2. A few passages conflate affect and emotion in ways that undermine the argument.\n\nThese are minor but conceptually important.",
    submittedDate: "February 15, 2024",
    releasedToAuthor: true,
    releasedDate: "February 18, 2024",
  },
  {
    id: "review-007",
    reviewerId: "rev-006",
    submissionId: "2024-046",
    recommendation: "Accept",
    commentsToEditor:
      "Excellent paper. Ready to go with maybe a few minor tweaks from the editor.",
    commentsToAuthor:
      "A beautifully written and thoughtful piece. I have no major concerns. Accept.",
    submittedDate: "February 14, 2024",
    releasedToAuthor: true,
    releasedDate: "February 18, 2024",
  },
  // Review for Interstice submission
  {
    id: "review-010",
    reviewerId: "rev-009",
    submissionId: "2024-042",
    recommendation: "Accept with Minor Changes",
    commentsToEditor:
      "A striking experimental piece. The visual and textual interplay is effective, though the third section trails off. Worth publishing with a small revision.",
    commentsToAuthor:
      "This is a beautifully composed interstice that resonates with the journal's ethos. A few suggestions:\n\n1. The third gesture could be tightened; it loses momentum relative to the first two.\n2. Consider adding a brief contextual note for readers unfamiliar with somatic practice.\n\nOverall, a strong and evocative piece.",
    submittedDate: "February 20, 2024",
    releasedToAuthor: false,
  },
  // Reviews for In Peer Review (both submitted)
  {
    id: "review-008",
    reviewerId: "rev-003",
    submissionId: "2024-028",
    recommendation: "Accept with Minor Changes",
    commentsToEditor:
      "Strong theoretical framework. A few citations need updating and one section could be tightened.",
    commentsToAuthor:
      "This paper offers an innovative approach to understanding architectural affect. Suggestions:\n\n1. Update the Massumi citations to include his 2023 work.\n2. Section 4.2 could be more concise.\n3. The conclusion effectively ties the threads together.\n\nAccept with minor changes.",
    submittedDate: "February 8, 2024",
    releasedToAuthor: false,
  },
  {
    id: "review-009",
    reviewerId: "rev-004",
    submissionId: "2024-028",
    recommendation: "Accept",
    commentsToEditor:
      "Outstanding work. One of the better submissions I've reviewed for Capacious.",
    commentsToAuthor:
      "An excellent contribution to the field. The methodological innovation is noteworthy. I have no substantive concerns.",
    submittedDate: "February 9, 2024",
    releasedToAuthor: false,
  },
];

// Pool of reviewers available for assignment
export const reviewers: Reviewer[] = [
  {
    id: "rev-001",
    name: "Dr. Sarah Chen",
    email: "s.chen@university.edu",
    affiliation: "State University",
    expertise: ["affect theory", "digital media", "cultural studies"],
    reviewsCompleted: 24,
    avgTurnaroundDays: 18,
  },
  {
    id: "rev-002",
    name: "Dr. Marcus Johnson",
    email: "mjohnson@college.edu",
    affiliation: "City College",
    expertise: ["queer theory", "performance studies", "embodiment"],
    reviewsCompleted: 31,
    avgTurnaroundDays: 21,
  },
  {
    id: "rev-003",
    name: "Dr. Elena Rodriguez",
    email: "e.rodriguez@institute.edu",
    affiliation: "Research Institute",
    expertise: ["architecture", "spatial theory", "phenomenology"],
    reviewsCompleted: 18,
    avgTurnaroundDays: 16,
  },
  {
    id: "rev-004",
    name: "Dr. James Lee",
    email: "jlee@university.edu",
    affiliation: "Northern University",
    expertise: ["food studies", "material culture", "ethnography"],
    reviewsCompleted: 42,
    avgTurnaroundDays: 24,
  },
  {
    id: "rev-005",
    name: "Dr. Lisa Park",
    email: "lpark@college.edu",
    affiliation: "Western College",
    expertise: [
      "creative research",
      "experimental methods",
      "arts-based inquiry",
    ],
    reviewsCompleted: 15,
    avgTurnaroundDays: 14,
  },
  {
    id: "rev-006",
    name: "Dr. David Thompson",
    email: "dthompson@institute.edu",
    affiliation: "Eastern Institute",
    expertise: ["new materialism", "posthumanism", "science studies"],
    reviewsCompleted: 27,
    avgTurnaroundDays: 19,
  },
  {
    id: "rev-007",
    name: "Dr. Priya Sharma",
    email: "psharma@university.edu",
    affiliation: "Pacific University",
    expertise: ["postcolonial theory", "affect", "diaspora studies"],
    reviewsCompleted: 12,
    avgTurnaroundDays: 15,
  },
  {
    id: "rev-008",
    name: "Dr. Chad Shomura",
    email: "cshomura@college.edu",
    affiliation: "University of Colorado Denver",
    expertise: ["political theory", "affect theory", "Asian American studies"],
    reviewsCompleted: 38,
    avgTurnaroundDays: 28,
  },
  {
    id: "rev-009",
    name: "Dr. Anahid Nersessian",
    email: "anersessian@ucla.edu",
    affiliation: "UCLA",
    expertise: ["Romantic poetry", "aesthetics", "literary theory"],
    reviewsCompleted: 22,
    avgTurnaroundDays: 20,
  },
  {
    id: "rev-010",
    name: "Dr. Donovan Schaefer",
    email: "dschaefer@upenn.edu",
    affiliation: "University of Pennsylvania",
    expertise: ["religion", "affect theory", "animal studies"],
    reviewsCompleted: 35,
    avgTurnaroundDays: 17,
  },
  {
    id: "rev-011",
    name: "Dr. Megan Watkins",
    email: "mwatkins@westernsydney.edu.au",
    affiliation: "Western Sydney University",
    expertise: ["pedagogy", "embodiment", "habitus"],
    reviewsCompleted: 19,
    avgTurnaroundDays: 22,
  },
];

// Submissions in various statuses — one at every workflow stage
export const submissions: Submission[] = [
  // 1. In Desk Review (just came in)
  {
    id: "2024-052",
    title: "New Submission, Desk Review, Version 1",
    authorName: "Maria Torres",
    authorEmail: "m.torres@newschool.edu",
    affiliation: "The New School",
    preferredName: "Maria",
    pronouns: "she/her",
    biography:
      "Maria Torres is a PhD candidate at The New School studying urban affect and sound design.",
    status: "In Desk Review",
    contentType: "Article",
    submittedDate: "February 20, 2024",
    currentVersion: 1,
  },
  // 2. In Desk Review
  {
    id: "2024-050",
    title: "Second Desk Review Submission",
    authorName: "Kevin O'Brien",
    authorEmail: "kobrien@temple.edu",
    affiliation: "Temple University",
    pronouns: "he/him",
    status: "In Desk Review",
    contentType: "Article",
    submittedDate: "February 15, 2024",
    currentVersion: 1,
  },
  // 3. In Peer Review — one review submitted, one pending
  {
    id: "2024-034",
    title: "Peer Review: 1 of 2 Reviews Submitted",
    authorName: "Alice Johnson",
    authorEmail: "ajohnson@northwestern.edu",
    affiliation: "Northwestern University",
    preferredName: "Ali",
    pronouns: "they/them",
    status: "In Peer Review",
    contentType: "Article",
    submittedDate: "January 15, 2024",
    currentVersion: 2,
    assignedReviewers: [
      {
        ...reviewers[0],
        status: "Submitted",

        submittedDate: "February 10, 2024",
        review: reviews[0],
      },
      {
        ...reviewers[5],
        status: "Pending",
      },
    ],
  },
  // 4. In Peer Review — both reviews submitted (ready for editor decision)
  {
    id: "2024-028",
    title: "Peer Review: Both Reviews In, Awaiting Decision",
    authorName: "Bob Williams",
    authorEmail: "bwilliams@columbia.edu",
    affiliation: "Columbia University",
    pronouns: "he/him",
    status: "In Peer Review",
    contentType: "Article",
    submittedDate: "January 8, 2024",
    currentVersion: 2,
    assignedReviewers: [
      {
        ...reviewers[2],
        status: "Submitted",

        submittedDate: "February 8, 2024",
        review: reviews[8],
      },
      {
        ...reviewers[3],
        status: "Submitted",

        submittedDate: "February 9, 2024",
        review: reviews[9],
      },
    ],
  },
  // 5. Accept with Minor Changes — sent back to same reviewers
  {
    id: "2024-039",
    title: "Accept with Minor Changes, Reviews Released",
    authorName: "Jane Doe",
    authorEmail: "jdoe@mit.edu",
    affiliation: "MIT",
    pronouns: "she/her",
    status: "Accept with Minor Changes",
    contentType: "Article",
    submittedDate: "January 22, 2024",
    currentVersion: 3,
    assignedReviewers: [
      {
        ...reviewers[3],
        status: "Submitted",

        submittedDate: "February 3, 2024",
        review: reviews[3],
      },
      {
        ...reviewers[4],
        status: "Submitted",

        submittedDate: "February 4, 2024",
        review: reviews[4],
      },
    ],
  },
  // 6. Conditional Accept — editor working with author
  {
    id: "2024-046",
    title: "Conditional Accept, Editor Working with Author",
    authorName: "Jenny Rice",
    authorEmail: "jrice@university.edu",
    affiliation: "University of Kentucky",
    pronouns: "she/her",
    status: "Conditional Accept",
    contentType: "Article",
    submittedDate: "January 5, 2024",
    currentVersion: 3,
    assignedReviewers: [
      {
        ...reviewers[0],
        status: "Submitted",

        submittedDate: "February 15, 2024",
        review: reviews[5],
      },
      {
        ...reviewers[5],
        status: "Submitted",

        submittedDate: "February 14, 2024",
        review: reviews[6],
      },
    ],
  },
  // 7. Accepted — ready to move to copy editing
  {
    id: "2024-015",
    title: "Accepted, Ready to Move to Copy Editing",
    authorName: "David Miller",
    authorEmail: "dmiller@duke.edu",
    affiliation: "Duke University",
    pronouns: "he/him",
    biography:
      "David Miller is an Associate Professor of Cultural Studies at Duke University, specializing in biopolitics and somatic experience.",
    status: "Accepted",
    contentType: "Article",
    submittedDate: "December 5, 2023",
    currentVersion: 4,
  },
  // 8. Rejected
  {
    id: "2024-022",
    title: "Rejected After Peer Review",
    authorName: "Carol Davis",
    authorEmail: "cdavis@stanford.edu",
    affiliation: "Stanford University",
    pronouns: "she/her",
    status: "Rejected",
    contentType: "Article",
    submittedDate: "December 18, 2023",
    currentVersion: 2,
    assignedReviewers: [
      {
        ...reviewers[1],
        status: "Submitted",

        submittedDate: "January 8, 2024",
        review: reviews[1],
      },
      {
        ...reviewers[2],
        status: "Submitted",

        submittedDate: "January 9, 2024",
        review: reviews[2],
      },
    ],
  },
  // 9. Revise & Resubmit (effectively out of workflow)
  {
    id: "2024-019",
    title: "Revise & Resubmit, Awaiting New Submission",
    authorName: "Marcus Bell",
    authorEmail: "mbell@nyu.edu",
    affiliation: "New York University",
    pronouns: "he/they",
    status: "Revise & Resubmit",
    contentType: "Article",
    submittedDate: "December 12, 2023",
    currentVersion: 1,
    assignedReviewers: [
      {
        ...reviewers[6],
        status: "Submitted",

        submittedDate: "January 10, 2024",
      },
      {
        ...reviewers[7],
        status: "Submitted",

        submittedDate: "January 12, 2024",
      },
    ],
  },
  // 10. In Copy Editing
  {
    id: "2024-010",
    title: "In Copy Editing, 2 Editors Assigned, Has CE Files",
    authorName: "Sam Nguyen",
    authorEmail: "snguyen@berkeley.edu",
    affiliation: "UC Berkeley",
    preferredName: "Sam",
    pronouns: "they/them",
    biography:
      "Sam Nguyen is an Assistant Professor of Gender & Sexuality Studies at UC Berkeley.",
    status: "In Copy Editing",
    contentType: "Article",
    submittedDate: "November 20, 2023",
    currentVersion: 5,
    assignedCopyEditors: [
      {
        ...copyEditors[0],
        status: "In Progress",
        assignedDate: "February 1, 2024",
      },
      {
        ...copyEditors[1],
        status: "Assigned",
        assignedDate: "February 1, 2024",
      },
    ],
  },
  // 11. Ready for Production
  {
    id: "2024-005",
    title: "Ready for Production, Copy Editing Complete",
    authorName: "Laura Chen",
    authorEmail: "lchen@umich.edu",
    affiliation: "University of Michigan",
    pronouns: "she/her",
    biography:
      "Laura Chen is a Professor of Performance Studies at the University of Michigan.",
    status: "Ready for Production",
    contentType: "Article",
    submittedDate: "October 15, 2023",
    currentVersion: 6,
    assignedCopyEditors: [
      {
        ...copyEditors[0],
        status: "Completed",
        assignedDate: "January 5, 2024",
        completedDate: "January 28, 2024",
      },
    ],
  },
  // 12. Published
  {
    id: "2023-048",
    title: "Published in Issue 11",
    authorName: "Derek Massumi",
    authorEmail: "dmassumi@concordia.ca",
    affiliation: "Concordia University",
    pronouns: "he/him",
    biography:
      "Derek Massumi is a Visiting Scholar at Concordia University working on environmental affect.",
    status: "Published",
    contentType: "Article",
    submittedDate: "August 1, 2023",
    currentVersion: 7,
    assignedCopyEditors: [
      {
        ...copyEditors[2],
        status: "Completed",
        assignedDate: "November 1, 2023",
        completedDate: "November 20, 2023",
      },
    ],
  },
  // 13. Dialogue (non-article type, in desk review)
  {
    id: "2024-048",
    title: "Dialogue Type, Editor-Entered, Desk Review",
    authorName: "Greg Seigworth & Kathleen Stewart",
    authorEmail: "gseigworth@millersville.edu",
    affiliation: "Millersville University / University of Texas",
    status: "In Desk Review",
    contentType: "Dialogue",
    submittedDate: "February 10, 2024",
    currentVersion: 1,
    enteredByEditor: true,
    editorNotes: "Invited dialogue for Issue 12. Greg leading the edit.",
  },
  // 14. Introduction (editor-entered, invited content)
  {
    id: "2024-055",
    title: "Introduction Type, Editor-Entered, In Copy Editing",
    authorName: "Gail Hamner",
    authorEmail: "ghamner@syracuse.edu",
    affiliation: "Syracuse University",
    status: "In Copy Editing",
    contentType: "Introduction",
    submittedDate: "February 18, 2024",
    currentVersion: 2,
    enteredByEditor: true,
    editorNotes: "Invited introduction for Issue 12.",
    assignedCopyEditors: [
      {
        ...copyEditors[0],
        status: "In Progress",
        assignedDate: "February 20, 2024",
      },
    ],
  },
  // 15. Book Review (simple desk review)
  {
    id: "2024-053",
    title: "Book Review Type, Desk Review",
    authorName: "Rosa Martinez",
    authorEmail: "rmartinez@uchicago.edu",
    affiliation: "University of Chicago",
    pronouns: "she/her",
    status: "In Desk Review",
    contentType: "Book Review",
    submittedDate: "February 16, 2024",
    currentVersion: 1,
  },
  // 16. Interstice (short creative/experimental piece, in peer review)
  {
    id: "2024-042",
    title: "Interstice Type, Peer Review, 1 of 2 Reviews",
    authorName: "Hyun-ji Kim",
    authorEmail: "hkim@risd.edu",
    affiliation: "Rhode Island School of Design",
    preferredName: "Hyun-ji",
    pronouns: "she/her",
    biography:
      "Hyun-ji Kim is a visual artist and writer exploring the intersections of movement, affect, and contemplative practice.",
    status: "In Peer Review",
    contentType: "Interstice",
    submittedDate: "February 1, 2024",
    currentVersion: 2,
    assignedReviewers: [
      {
        ...reviewers[8],
        status: "Submitted",

        submittedDate: "February 20, 2024",
        review: reviews[7],
      },
      {
        ...reviewers[4],
        status: "Pending",

      },
    ],
  },
  // 17. Afterword (editor-entered, invited, accepted)
  {
    id: "2024-057",
    title: "Afterword Type, Editor-Entered, Accepted",
    authorName: "Lauren Berlant",
    authorEmail: "lberlant@uchicago.edu",
    affiliation: "University of Chicago",
    status: "Accepted",
    contentType: "Afterword",
    submittedDate: "February 22, 2024",
    currentVersion: 2,
    enteredByEditor: true,
    editorNotes:
      "Invited afterword for Issue 12. Accepted after light editorial review.",
  },
];

// Activity logs keyed by submission ID
export const activityLog: ActivityLog = {
  "2024-052": [
    {
      date: "Feb 20, 2024",
      description: "Manuscript submitted",
      actor: "Maria Torres",
      type: "general",
    },
    {
      date: "Feb 20, 2024",
      description: "Confirmation email sent to author",
      type: "email",
    },
  ],
  "2024-050": [
    {
      date: "Feb 15, 2024",
      description: "Manuscript submitted",
      actor: "Kevin O'Brien",
      type: "general",
    },
    {
      date: "Feb 15, 2024",
      description: "Confirmation email sent to author",
      type: "email",
    },
    {
      date: "Feb 16, 2024",
      description: "Moved to desk review",
      actor: "Greg Seigworth",
      type: "status-change",
    },
  ],
  "2024-034": [
    {
      date: "Jan 15, 2024",
      description: "Manuscript submitted",
      actor: "Alice Johnson",
      type: "general",
    },
    {
      date: "Jan 16, 2024",
      description: "Moved to desk review",
      actor: "Greg Seigworth",
      type: "status-change",
    },
    {
      date: "Jan 20, 2024",
      description: "Desk review feedback sent to author",
      actor: "Greg Seigworth",
      type: "email",
    },
    {
      date: "Jan 25, 2024",
      description: "Revised manuscript uploaded (v2)",
      actor: "Alice Johnson",
      type: "file-upload",
      fileId: "file-034-2",
    },
    {
      date: "Jan 26, 2024",
      description: "Approved for peer review",
      actor: "Greg Seigworth",
      type: "decision",
    },
    {
      date: "Jan 26, 2024",
      description: "Moved to peer review",
      type: "status-change",
    },
    {
      date: "Jan 27, 2024",
      description: "Dr. Sarah Chen assigned as reviewer",
      actor: "Greg Seigworth",
      type: "assignment",
    },
    {
      date: "Jan 27, 2024",
      description: "Dr. David Thompson assigned as reviewer",
      actor: "Greg Seigworth",
      type: "assignment",
    },
    {
      date: "Jan 27, 2024",
      description: "Review request emails sent to reviewers",
      type: "email",
    },
    {
      date: "Feb 10, 2024",
      description: "Review submitted by Dr. Sarah Chen",
      actor: "Dr. Sarah Chen",
      type: "review",
    },
  ],
  "2024-028": [
    {
      date: "Jan 8, 2024",
      description: "Manuscript submitted",
      actor: "Bob Williams",
      type: "general",
    },
    {
      date: "Jan 9, 2024",
      description: "Moved to desk review",
      actor: "Greg Seigworth",
      type: "status-change",
    },
    {
      date: "Jan 14, 2024",
      description: "Desk review revision requested",
      actor: "Greg Seigworth",
      type: "email",
    },
    {
      date: "Jan 20, 2024",
      description: "Revised manuscript uploaded (v2)",
      actor: "Bob Williams",
      type: "file-upload",
      fileId: "file-028-2",
    },
    {
      date: "Jan 21, 2024",
      description: "Approved for peer review",
      actor: "Greg Seigworth",
      type: "decision",
    },
    {
      date: "Jan 22, 2024",
      description: "Dr. Elena Rodriguez assigned as reviewer",
      actor: "Greg Seigworth",
      type: "assignment",
    },
    {
      date: "Jan 22, 2024",
      description: "Dr. James Lee assigned as reviewer",
      actor: "Greg Seigworth",
      type: "assignment",
    },
    {
      date: "Feb 8, 2024",
      description: "Review submitted by Dr. Elena Rodriguez",
      actor: "Dr. Elena Rodriguez",
      type: "review",
    },
    {
      date: "Feb 9, 2024",
      description: "Review submitted by Dr. James Lee",
      actor: "Dr. James Lee",
      type: "review",
    },
  ],
  "2024-039": [
    {
      date: "Jan 22, 2024",
      description: "Manuscript submitted",
      actor: "Jane Doe",
      type: "general",
    },
    {
      date: "Jan 23, 2024",
      description: "Moved to desk review",
      actor: "Greg Seigworth",
      type: "status-change",
    },
    {
      date: "Jan 28, 2024",
      description: "Approved for peer review",
      actor: "Greg Seigworth",
      type: "decision",
    },
    {
      date: "Jan 29, 2024",
      description: "Dr. James Lee and Dr. Lisa Park assigned as reviewers",
      actor: "Greg Seigworth",
      type: "assignment",
    },
    {
      date: "Feb 3, 2024",
      description: "Review submitted by Dr. James Lee",
      actor: "Dr. James Lee",
      type: "review",
    },
    {
      date: "Feb 4, 2024",
      description: "Review submitted by Dr. Lisa Park",
      actor: "Dr. Lisa Park",
      type: "review",
    },
    {
      date: "Feb 5, 2024",
      description: "Reviews released to author",
      actor: "Greg Seigworth",
      type: "decision",
    },
    {
      date: "Feb 5, 2024",
      description: "Status set to Accept with Minor Changes",
      type: "status-change",
    },
    {
      date: "Feb 12, 2024",
      description: "Revised manuscript uploaded (v3)",
      actor: "Jane Doe",
      type: "file-upload",
      fileId: "file-039-3",
    },
  ],
  "2024-046": [
    {
      date: "Jan 5, 2024",
      description: "Manuscript submitted",
      actor: "Jenny Rice",
      type: "general",
    },
    {
      date: "Jan 6, 2024",
      description: "Moved to desk review",
      actor: "Greg Seigworth",
      type: "status-change",
    },
    {
      date: "Jan 10, 2024",
      description: "Desk review feedback sent",
      actor: "Greg Seigworth",
      type: "email",
    },
    {
      date: "Jan 18, 2024",
      description: "Revised manuscript uploaded (v2)",
      actor: "Jenny Rice",
      type: "file-upload",
      fileId: "file-046-2",
    },
    {
      date: "Jan 19, 2024",
      description: "Approved for peer review",
      actor: "Greg Seigworth",
      type: "decision",
    },
    {
      date: "Jan 20, 2024",
      description:
        "Dr. Sarah Chen and Dr. David Thompson assigned as reviewers",
      actor: "Greg Seigworth",
      type: "assignment",
    },
    {
      date: "Feb 14, 2024",
      description: "Review submitted by Dr. David Thompson",
      actor: "Dr. David Thompson",
      type: "review",
    },
    {
      date: "Feb 15, 2024",
      description: "Review submitted by Dr. Sarah Chen",
      actor: "Dr. Sarah Chen",
      type: "review",
    },
    {
      date: "Feb 18, 2024",
      description: "Reviews released to author. Status: Conditional Accept",
      actor: "Greg Seigworth",
      type: "decision",
    },
    {
      date: "Feb 22, 2024",
      description: "Revised manuscript uploaded (v3)",
      actor: "Jenny Rice",
      type: "file-upload",
      fileId: "file-046-3",
    },
  ],
  "2024-015": [
    {
      date: "Dec 5, 2023",
      description: "Manuscript submitted",
      actor: "David Miller",
      type: "general",
    },
    {
      date: "Dec 6, 2023",
      description: "Moved to desk review",
      actor: "Greg Seigworth",
      type: "status-change",
    },
    {
      date: "Dec 10, 2023",
      description: "Approved for peer review",
      actor: "Gail Hamner",
      type: "decision",
    },
    {
      date: "Dec 11, 2023",
      description: "Reviewers assigned",
      actor: "Greg Seigworth",
      type: "assignment",
    },
    {
      date: "Jan 4, 2024",
      description: "Reviews completed. Accept with Minor Changes.",
      type: "review",
    },
    {
      date: "Jan 8, 2024",
      description: "Reviews released to author",
      actor: "Greg Seigworth",
      type: "decision",
    },
    {
      date: "Jan 15, 2024",
      description: "Revised manuscript uploaded (v3)",
      actor: "David Miller",
      type: "file-upload",
      fileId: "file-015-3",
    },
    {
      date: "Jan 18, 2024",
      description: "Re-review completed. Accept.",
      type: "review",
    },
    {
      date: "Jan 20, 2024",
      description: "Final revision uploaded (v4)",
      actor: "David Miller",
      type: "file-upload",
      fileId: "file-015-4",
    },
    {
      date: "Jan 22, 2024",
      description: "Manuscript accepted",
      actor: "Greg Seigworth",
      type: "decision",
    },
  ],
  "2024-022": [
    {
      date: "Dec 18, 2023",
      description: "Manuscript submitted",
      actor: "Carol Davis",
      type: "general",
    },
    {
      date: "Dec 19, 2023",
      description: "Moved to desk review",
      type: "status-change",
    },
    {
      date: "Dec 22, 2023",
      description: "Approved for peer review",
      actor: "Greg Seigworth",
      type: "decision",
    },
    {
      date: "Dec 23, 2023",
      description: "Dr. Marcus Johnson and Dr. Elena Rodriguez assigned",
      actor: "Greg Seigworth",
      type: "assignment",
    },
    {
      date: "Jan 8, 2024",
      description: "Review submitted by Dr. Marcus Johnson",
      actor: "Dr. Marcus Johnson",
      type: "review",
    },
    {
      date: "Jan 9, 2024",
      description: "Review submitted by Dr. Elena Rodriguez",
      actor: "Dr. Elena Rodriguez",
      type: "review",
    },
    {
      date: "Jan 12, 2024",
      description: "Reviews released to author (editor softened Review 2)",
      actor: "Greg Seigworth",
      type: "decision",
    },
    {
      date: "Feb 1, 2024",
      description: "Submission rejected. Advisory email sent to author.",
      actor: "Greg Seigworth",
      type: "status-change",
    },
  ],
  "2024-019": [
    {
      date: "Dec 12, 2023",
      description: "Manuscript submitted",
      actor: "Marcus Bell",
      type: "general",
    },
    {
      date: "Dec 13, 2023",
      description: "Moved to desk review",
      type: "status-change",
    },
    {
      date: "Dec 18, 2023",
      description: "Approved for peer review",
      actor: "Greg Seigworth",
      type: "decision",
    },
    {
      date: "Dec 19, 2023",
      description: "Reviewers assigned",
      actor: "Greg Seigworth",
      type: "assignment",
    },
    {
      date: "Jan 10, 2024",
      description: "Review submitted by Dr. Priya Sharma",
      type: "review",
    },
    {
      date: "Jan 12, 2024",
      description: "Review submitted by Dr. Chad Shomura",
      type: "review",
    },
    {
      date: "Jan 18, 2024",
      description:
        "Status set to Revise & Resubmit. Advisory email sent to author.",
      actor: "Greg Seigworth",
      type: "decision",
    },
  ],
  "2024-010": [
    {
      date: "Nov 20, 2023",
      description: "Manuscript submitted",
      actor: "Sam Nguyen",
      type: "general",
    },
    {
      date: "Nov 21, 2023",
      description: "Moved to desk review",
      type: "status-change",
    },
    {
      date: "Nov 28, 2023",
      description: "Approved for peer review",
      type: "decision",
    },
    {
      date: "Dec 15, 2023",
      description: "Reviews completed. Accept.",
      type: "review",
    },
    {
      date: "Dec 20, 2023",
      description: "Manuscript accepted",
      type: "decision",
    },
    {
      date: "Jan 10, 2024",
      description: "Final version uploaded (v5)",
      actor: "Sam Nguyen",
      type: "file-upload",
      fileId: "file-010-5",
    },
    {
      date: "Feb 1, 2024",
      description: "Moved to copy editing",
      type: "status-change",
    },
    {
      date: "Feb 1, 2024",
      description: "Maria Santos and Samuel Pratt assigned as copy editors",
      actor: "Greg Seigworth",
      type: "assignment",
    },
    {
      date: "Feb 5, 2024",
      description: "Copy editing CE1 version uploaded",
      actor: "Maria Santos",
      type: "file-upload",
      fileId: "file-010-ce1",
    },
    {
      date: "Feb 6, 2024",
      description: "CE1 PDF sent to author for review",
      type: "email",
    },
  ],
  "2024-005": [
    {
      date: "Oct 15, 2023",
      description: "Manuscript submitted",
      actor: "Laura Chen",
      type: "general",
    },
    {
      date: "Oct 16, 2023",
      description: "Moved to desk review",
      type: "status-change",
    },
    {
      date: "Oct 22, 2023",
      description: "Approved for peer review",
      type: "decision",
    },
    {
      date: "Nov 15, 2023",
      description: "Reviews completed. Conditional Accept.",
      type: "review",
    },
    {
      date: "Nov 20, 2023",
      description: "Editor working with author on revisions",
      type: "general",
    },
    {
      date: "Dec 5, 2023",
      description: "Final version uploaded (v5)",
      actor: "Laura Chen",
      type: "file-upload",
      fileId: "file-005-5",
    },
    {
      date: "Dec 8, 2023",
      description: "Manuscript accepted",
      type: "decision",
    },
    {
      date: "Jan 5, 2024",
      description: "Moved to copy editing",
      type: "status-change",
    },
    {
      date: "Jan 5, 2024",
      description: "Maria Santos assigned as copy editor",
      actor: "Greg Seigworth",
      type: "assignment",
    },
    {
      date: "Jan 10, 2024",
      description: "Copy editing CE1 uploaded",
      actor: "Maria Santos",
      type: "file-upload",
      fileId: "file-005-ce1",
    },
    {
      date: "Jan 12, 2024",
      description: "CE1 PDF sent to author",
      type: "email",
    },
    {
      date: "Jan 18, 2024",
      description: "Author responded to CE1 comments",
      actor: "Laura Chen",
      type: "file-upload",
      fileId: "file-005-ce1-response",
    },
    {
      date: "Jan 22, 2024",
      description: "CE2 (final) version completed",
      actor: "Maria Santos",
      type: "file-upload",
      fileId: "file-005-final",
    },
    {
      date: "Jan 28, 2024",
      description: "Copy editing completed. Ready for production.",
      type: "status-change",
    },
  ],
  "2023-048": [
    {
      date: "Aug 1, 2023",
      description: "Manuscript submitted",
      actor: "Derek Massumi",
      type: "general",
    },
    {
      date: "Aug 5, 2023",
      description: "Moved to desk review",
      type: "status-change",
    },
    {
      date: "Aug 15, 2023",
      description: "Approved for peer review",
      type: "decision",
    },
    {
      date: "Sep 20, 2023",
      description: "Reviews completed. Accept.",
      type: "review",
    },
    {
      date: "Sep 25, 2023",
      description: "Manuscript accepted",
      type: "decision",
    },
    {
      date: "Nov 1, 2023",
      description: "Moved to copy editing",
      type: "status-change",
    },
    {
      date: "Nov 20, 2023",
      description: "Copy editing completed",
      type: "status-change",
    },
    {
      date: "Dec 1, 2023",
      description: "Ready for production",
      type: "status-change",
    },
    {
      date: "Jan 15, 2024",
      description: "Published in Issue 11",
      type: "status-change",
    },
  ],
  "2024-048": [
    {
      date: "Feb 10, 2024",
      description: "Dialogue entered by editor",
      actor: "Greg Seigworth",
      type: "general",
    },
    {
      date: "Feb 10, 2024",
      description: "Moved to desk review",
      type: "status-change",
    },
  ],
  "2024-055": [
    {
      date: "Feb 18, 2024",
      description: "Introduction entered by editor (invited)",
      actor: "Greg Seigworth",
      type: "general",
    },
    {
      date: "Feb 19, 2024",
      description: "Skipped to copy editing (invited content)",
      actor: "Greg Seigworth",
      type: "status-change",
    },
    {
      date: "Feb 20, 2024",
      description: "Maria Santos assigned as copy editor",
      actor: "Greg Seigworth",
      type: "assignment",
    },
  ],
  "2024-053": [
    {
      date: "Feb 16, 2024",
      description: "Book review submitted",
      actor: "Rosa Martinez",
      type: "general",
    },
    {
      date: "Feb 17, 2024",
      description: "Moved to desk review",
      actor: "Greg Seigworth",
      type: "status-change",
    },
  ],
  "2024-042": [
    {
      date: "Feb 1, 2024",
      description: "Interstice submitted",
      actor: "Hyun-ji Kim",
      type: "general",
    },
    {
      date: "Feb 1, 2024",
      description: "Confirmation email sent to author",
      type: "email",
    },
    {
      date: "Feb 2, 2024",
      description: "Moved to desk review",
      actor: "Greg Seigworth",
      type: "status-change",
    },
    {
      date: "Feb 5, 2024",
      description: "Desk review feedback sent to author",
      actor: "Greg Seigworth",
      type: "email",
    },
    {
      date: "Feb 10, 2024",
      description: "Revised interstice uploaded (v2)",
      actor: "Hyun-ji Kim",
      type: "file-upload",
      fileId: "file-042-2",
    },
    {
      date: "Feb 11, 2024",
      description: "Approved for peer review",
      actor: "Greg Seigworth",
      type: "decision",
    },
    {
      date: "Feb 12, 2024",
      description: "Dr. Anahid Nersessian assigned as reviewer",
      actor: "Greg Seigworth",
      type: "assignment",
    },
    {
      date: "Feb 12, 2024",
      description: "Dr. Lisa Park assigned as reviewer",
      actor: "Greg Seigworth",
      type: "assignment",
    },
    {
      date: "Feb 20, 2024",
      description: "Review submitted by Dr. Anahid Nersessian",
      actor: "Dr. Anahid Nersessian",
      type: "review",
    },
  ],
  "2024-057": [
    {
      date: "Feb 22, 2024",
      description: "Afterword entered by editor (invited)",
      actor: "Greg Seigworth",
      type: "general",
    },
    {
      date: "Feb 22, 2024",
      description: "Moved directly to desk review (invited content)",
      actor: "Greg Seigworth",
      type: "status-change",
    },
    {
      date: "Feb 23, 2024",
      description: "Light editorial review completed",
      actor: "Greg Seigworth",
      type: "decision",
    },
    {
      date: "Feb 23, 2024",
      description: "Manuscript accepted (invited afterword)",
      actor: "Greg Seigworth",
      type: "decision",
    },
  ],
};

// File versions keyed by submission ID
export const fileVersions: FileVersionsMap = {
  "2024-052": [
    {
      id: "file-052-1",
      filename: "torres_urban_sound_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "February 20, 2024",
      category: "manuscript",
      uploadedBy: "Maria Torres",
    },
    {
      id: "file-052-img1",
      filename: "figure_1_soundwave.png",
      version: 1,
      label: "Figure 1 (High-res)",
      uploadedDate: "February 20, 2024",
      category: "image",
      uploadedBy: "Maria Torres",
    },
    {
      id: "file-052-data1",
      filename: "sound_frequency_data.xlsx",
      version: 1,
      label: "Frequency Analysis Dataset",
      uploadedDate: "February 20, 2024",
      category: "supplement",
      uploadedBy: "Maria Torres",
    },
  ],
  "2024-050": [
    {
      id: "file-050-1",
      filename: "obrien_haptic_pedagogy_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "February 15, 2024",
      category: "manuscript",
      uploadedBy: "Kevin O'Brien",
    },
  ],
  "2024-034": [
    {
      id: "file-034-1",
      filename: "johnson_digital_community_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "January 15, 2024",
      category: "manuscript",
      uploadedBy: "Alice Johnson",
    },
    {
      id: "file-034-2",
      filename: "johnson_digital_community_v2.docx",
      version: 2,
      label: "Desk Review Revision",
      uploadedDate: "January 25, 2024",
      category: "manuscript",
      uploadedBy: "Alice Johnson",
    },
  ],
  "2024-028": [
    {
      id: "file-028-1",
      filename: "williams_architectural_affect_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "January 8, 2024",
      category: "manuscript",
      uploadedBy: "Bob Williams",
    },
    {
      id: "file-028-2",
      filename: "williams_architectural_affect_v2.docx",
      version: 2,
      label: "Desk Review Revision",
      uploadedDate: "January 20, 2024",
      category: "manuscript",
      uploadedBy: "Bob Williams",
    },
    {
      id: "file-028-img1",
      filename: "building_exterior.jpg",
      version: 1,
      label: "Figure 1 (High-res)",
      uploadedDate: "January 8, 2024",
      category: "image",
      uploadedBy: "Bob Williams",
    },
    {
      id: "file-028-img2",
      filename: "interior_space.jpg",
      version: 1,
      label: "Figure 2 (High-res)",
      uploadedDate: "January 8, 2024",
      category: "image",
      uploadedBy: "Bob Williams",
    },
  ],
  "2024-039": [
    {
      id: "file-039-1",
      filename: "doe_feeling_machines_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "January 22, 2024",
      category: "manuscript",
      uploadedBy: "Jane Doe",
    },
    {
      id: "file-039-2",
      filename: "doe_feeling_machines_v2.docx",
      version: 2,
      label: "Desk Review Revision",
      uploadedDate: "January 26, 2024",
      category: "manuscript",
      uploadedBy: "Jane Doe",
    },
    {
      id: "file-039-3",
      filename: "doe_feeling_machines_v3.docx",
      version: 3,
      label: "Minor Changes Revision",
      uploadedDate: "February 12, 2024",
      category: "manuscript",
      uploadedBy: "Jane Doe",
    },
  ],
  "2024-046": [
    {
      id: "file-046-1",
      filename: "rice_ambivalence_meat_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "January 5, 2024",
      category: "manuscript",
      uploadedBy: "Jenny Rice",
    },
    {
      id: "file-046-2",
      filename: "rice_ambivalence_meat_v2.docx",
      version: 2,
      label: "Desk Review Revision",
      uploadedDate: "January 18, 2024",
      category: "manuscript",
      uploadedBy: "Jenny Rice",
    },
    {
      id: "file-046-3",
      filename: "rice_ambivalence_meat_v3.docx",
      version: 3,
      label: "Conditional Accept Revision",
      uploadedDate: "February 22, 2024",
      category: "manuscript",
      uploadedBy: "Jenny Rice",
    },
  ],
  "2024-015": [
    {
      id: "file-015-1",
      filename: "miller_weight_of_breath_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "December 5, 2023",
      category: "manuscript",
      uploadedBy: "David Miller",
    },
    {
      id: "file-015-2",
      filename: "miller_weight_of_breath_v2.docx",
      version: 2,
      label: "Desk Review Revision",
      uploadedDate: "December 12, 2023",
      category: "manuscript",
      uploadedBy: "David Miller",
    },
    {
      id: "file-015-3",
      filename: "miller_weight_of_breath_v3.docx",
      version: 3,
      label: "Minor Changes Revision",
      uploadedDate: "January 15, 2024",
      category: "manuscript",
      uploadedBy: "David Miller",
    },
    {
      id: "file-015-4",
      filename: "miller_weight_of_breath_final.docx",
      version: 4,
      label: "Final Accepted Version",
      uploadedDate: "January 20, 2024",
      category: "manuscript",
      uploadedBy: "David Miller",
    },
  ],
  "2024-022": [
    {
      id: "file-022-1",
      filename: "davis_digital_empathy_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "December 18, 2023",
      category: "manuscript",
      uploadedBy: "Carol Davis",
    },
    {
      id: "file-022-2",
      filename: "davis_digital_empathy_v2.docx",
      version: 2,
      label: "Revision",
      uploadedDate: "January 25, 2024",
      category: "manuscript",
      uploadedBy: "Carol Davis",
    },
  ],
  "2024-019": [
    {
      id: "file-019-1",
      filename: "bell_sonic_vibrations_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "December 12, 2023",
      category: "manuscript",
      uploadedBy: "Marcus Bell",
    },
    {
      id: "file-019-data1",
      filename: "festival_survey_data.csv",
      version: 1,
      label: "Survey Dataset",
      uploadedDate: "December 12, 2023",
      category: "supplement",
      uploadedBy: "Marcus Bell",
    },
  ],
  "2024-010": [
    {
      id: "file-010-1",
      filename: "nguyen_queer_temporalities_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "November 20, 2023",
      category: "manuscript",
      uploadedBy: "Sam Nguyen",
    },
    {
      id: "file-010-2",
      filename: "nguyen_queer_temporalities_v2.docx",
      version: 2,
      label: "Desk Review Revision",
      uploadedDate: "December 1, 2023",
      category: "manuscript",
      uploadedBy: "Sam Nguyen",
    },
    {
      id: "file-010-3",
      filename: "nguyen_queer_temporalities_v3.docx",
      version: 3,
      label: "Post-Review Revision",
      uploadedDate: "December 28, 2023",
      category: "manuscript",
      uploadedBy: "Sam Nguyen",
    },
    {
      id: "file-010-4",
      filename: "nguyen_queer_temporalities_v4.docx",
      version: 4,
      label: "Final Accepted Version",
      uploadedDate: "January 8, 2024",
      category: "manuscript",
      uploadedBy: "Sam Nguyen",
    },
    {
      id: "file-010-5",
      filename: "nguyen_queer_temporalities_v5.docx",
      version: 5,
      label: "Copy Editing Working Version",
      uploadedDate: "January 10, 2024",
      category: "copyedit-word",
      uploadedBy: "Sam Nguyen",
    },
    {
      id: "file-010-ce1",
      filename: "nguyen_queer_temporalities_CE1.pdf",
      version: 5,
      label: "Copy Edit Round 1 (PDF for author)",
      uploadedDate: "February 5, 2024",
      category: "copyedit-pdf",
      uploadedBy: "Maria Santos",
    },
  ],
  "2024-005": [
    {
      id: "file-005-1",
      filename: "chen_choreography_protest_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "October 15, 2023",
      category: "manuscript",
      uploadedBy: "Laura Chen",
    },
    {
      id: "file-005-2",
      filename: "chen_choreography_protest_v2.docx",
      version: 2,
      label: "Desk Review Revision",
      uploadedDate: "October 28, 2023",
      category: "manuscript",
      uploadedBy: "Laura Chen",
    },
    {
      id: "file-005-3",
      filename: "chen_choreography_protest_v3.docx",
      version: 3,
      label: "Post-Review Revision",
      uploadedDate: "November 25, 2023",
      category: "manuscript",
      uploadedBy: "Laura Chen",
    },
    {
      id: "file-005-4",
      filename: "chen_choreography_protest_v4.docx",
      version: 4,
      label: "Conditional Accept Revision",
      uploadedDate: "December 3, 2023",
      category: "manuscript",
      uploadedBy: "Laura Chen",
    },
    {
      id: "file-005-5",
      filename: "chen_choreography_protest_final.docx",
      version: 5,
      label: "Final Accepted Version",
      uploadedDate: "December 5, 2023",
      category: "manuscript",
      uploadedBy: "Laura Chen",
    },
    {
      id: "file-005-ce0",
      filename: "chen_choreography_protest_CE0.docx",
      version: 5,
      label: "Copy Edit Original (untouched)",
      uploadedDate: "January 5, 2024",
      category: "copyedit-word",
      uploadedBy: "Maria Santos",
    },
    {
      id: "file-005-ce1",
      filename: "chen_choreography_protest_CE1.pdf",
      version: 6,
      label: "Copy Edit Round 1 (PDF for author)",
      uploadedDate: "January 10, 2024",
      category: "copyedit-pdf",
      uploadedBy: "Maria Santos",
    },
    {
      id: "file-005-ce1-response",
      filename: "chen_choreography_protest_CE1_response.pdf",
      version: 6,
      label: "Author Response to CE1",
      uploadedDate: "January 18, 2024",
      category: "copyedit-pdf",
      uploadedBy: "Laura Chen",
    },
    {
      id: "file-005-final",
      filename: "chen_choreography_protest_FINAL.docx",
      version: 7,
      label: "Final Copy Edited Version",
      uploadedDate: "January 22, 2024",
      category: "copyedit-word",
      uploadedBy: "Maria Santos",
    },
    {
      id: "file-005-img1",
      filename: "protest_march.jpg",
      version: 1,
      label: "Figure 1 (High-res)",
      uploadedDate: "October 15, 2023",
      category: "image",
      uploadedBy: "Laura Chen",
    },
    {
      id: "file-005-img2",
      filename: "dance_performance.jpg",
      version: 1,
      label: "Figure 2 (High-res)",
      uploadedDate: "October 15, 2023",
      category: "image",
      uploadedBy: "Laura Chen",
    },
  ],
  "2023-048": [
    {
      id: "file-048-final",
      filename: "massumi_atmospheric_attunements_FINAL.docx",
      version: 7,
      label: "Published Version",
      uploadedDate: "January 15, 2024",
      category: "manuscript",
      uploadedBy: "Matthew Arthur",
    },
  ],
  "2024-048": [
    {
      id: "file-048d-1",
      filename: "seigworth_stewart_dialogue_v1.docx",
      version: 1,
      label: "Initial Draft",
      uploadedDate: "February 10, 2024",
      category: "manuscript",
      uploadedBy: "Greg Seigworth",
    },
  ],
  "2024-055": [
    {
      id: "file-055-1",
      filename: "hamner_introduction_v1.docx",
      version: 1,
      label: "Initial Draft",
      uploadedDate: "February 18, 2024",
      category: "manuscript",
      uploadedBy: "Gail Hamner",
    },
    {
      id: "file-055-2",
      filename: "hamner_introduction_v2.docx",
      version: 2,
      label: "Editor Revised",
      uploadedDate: "February 19, 2024",
      category: "manuscript",
      uploadedBy: "Greg Seigworth",
    },
  ],
  "2024-053": [
    {
      id: "file-053-1",
      filename: "martinez_gut_feminism_review_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "February 16, 2024",
      category: "manuscript",
      uploadedBy: "Rosa Martinez",
    },
  ],
  "2024-042": [
    {
      id: "file-042-1",
      filename: "kim_three_gestures_v1.docx",
      version: 1,
      label: "Original Submission",
      uploadedDate: "February 1, 2024",
      category: "manuscript",
      uploadedBy: "Hyun-ji Kim",
    },
    {
      id: "file-042-2",
      filename: "kim_three_gestures_v2.docx",
      version: 2,
      label: "Desk Review Revision",
      uploadedDate: "February 10, 2024",
      category: "manuscript",
      uploadedBy: "Hyun-ji Kim",
    },
    {
      id: "file-042-img1",
      filename: "gesture_stillness_1.tiff",
      version: 1,
      label: "Figure 1 (High-res)",
      uploadedDate: "February 1, 2024",
      category: "image",
      uploadedBy: "Hyun-ji Kim",
    },
    {
      id: "file-042-img2",
      filename: "gesture_stillness_2.tiff",
      version: 1,
      label: "Figure 2 (High-res)",
      uploadedDate: "February 1, 2024",
      category: "image",
      uploadedBy: "Hyun-ji Kim",
    },
  ],
  "2024-057": [
    {
      id: "file-057-1",
      filename: "berlant_afterword_v1.docx",
      version: 1,
      label: "Initial Draft",
      uploadedDate: "February 22, 2024",
      category: "manuscript",
      uploadedBy: "Lauren Berlant",
    },
    {
      id: "file-057-2",
      filename: "berlant_afterword_v2.docx",
      version: 2,
      label: "Editor Revised",
      uploadedDate: "February 23, 2024",
      category: "manuscript",
      uploadedBy: "Greg Seigworth",
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

export function getAvailableCopyEditors(): CopyEditor[] {
  return copyEditors;
}

export function getSubmissionsByStatus(
  status: Submission["status"],
): Submission[] {
  return submissions.filter((s) => s.status === status);
}

export function getReviewsForSubmission(submissionId: string): Review[] {
  return reviews.filter((r) => r.submissionId === submissionId);
}

export function getReviewByReviewer(
  submissionId: string,
  reviewerId: string,
): Review | undefined {
  return reviews.find(
    (r) => r.submissionId === submissionId && r.reviewerId === reviewerId,
  );
}
