import { RoleType } from "@/context/RoleContext";
import { TabType } from "@/components/submission-detail/TabsCard";

export interface PresentationStep {
  id: number;
  title: string;
  description: string;
  role: RoleType;
  route: string;
  tab?: TabType;
}

export const PRESENTATION_STEPS: PresentationStep[] = [
  // === Act 1: "The Editor's Day" (Managing Editor) ===
  {
    id: 1,
    title: "Dashboard Overview",
    description:
      "The Managing Editor sees all submissions across every status, with filters for status and content type.",
    role: "Managing Editor",
    route: "/dashboard",
  },
  {
    id: 2,
    title: "New Submission",
    description:
      "A new submission has arrived. The editor reviews it and decides whether to send it out for peer review.",
    role: "Managing Editor",
    route: "/dashboard/2024-052",
    tab: "submission",
  },
  {
    id: 3,
    title: "Assigning Reviewers",
    description:
      "After approving for peer review, the editor selects and assigns subject-matter experts as reviewers.",
    role: "Managing Editor",
    route: "/dashboard/2024-052",
    tab: "reviews",
  },
  {
    id: 4,
    title: "Review Approval",
    description:
      "Reviews are in. The editor reads each review, can edit the comments before releasing them to the author.",
    role: "Managing Editor",
    route: "/dashboard/2024-028",
    tab: "reviews",
  },
  {
    id: 5,
    title: "Editor Decision",
    description:
      "After approving reviews, the editor renders a decision on the manuscript.",
    role: "Managing Editor",
    route: "/dashboard/2024-028",
    tab: "reviews",
  },
  {
    id: 6,
    title: "Copy Editing",
    description:
      "The editor oversees the copy editing process — marked-up versions are exchanged between copy editor and author.",
    role: "Managing Editor",
    route: "/dashboard/2024-010",
    tab: "copy-editing",
  },
  {
    id: 7,
    title: "Activity Log",
    description:
      "A complete timeline of every action taken on a submission — from initial submission through production.",
    role: "Managing Editor",
    route: "/dashboard/2024-005",
    tab: "activity",
  },
  {
    id: 8,
    title: "People Management",
    description:
      "The editor manages the reviewer and copy editor databases — tracking expertise and availability.",
    role: "Managing Editor",
    route: "/admin",
  },
  // === Act 2: "The Other Side" ===
  {
    id: 9,
    title: "Reviewer's Dashboard",
    description:
      "Reviewers see only the submissions they've been assigned to review.",
    role: "Reviewer",
    route: "/dashboard",
  },
  {
    id: 10,
    title: "Submitting a Review",
    description:
      "A reviewer completes their evaluation, provides a recommendation, and submits their review.",
    role: "Reviewer",
    route: "/dashboard/2024-034",
    tab: "reviews",
  },
  // === Act 3: "Closing the Loop" ===
  {
    id: 11,
    title: "Author's View",
    description:
      "Authors see only their own submissions and any action items requiring their attention.",
    role: "Author",
    route: "/dashboard",
  },
  {
    id: 12,
    title: "Copy Editor's View",
    description:
      "Copy editors see only manuscripts in copy editing, and work through the markup and review cycle.",
    role: "Copy Editor",
    route: "/dashboard/2024-010",
    tab: "copy-editing",
  },
];

export const TOTAL_STEPS = PRESENTATION_STEPS.length;
