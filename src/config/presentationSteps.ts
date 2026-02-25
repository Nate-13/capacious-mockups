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
  // --- Managing Editor workflow ---
  {
    id: 1,
    title: "Dashboard",
    description:
      "The Managing Editor sees all submissions across every status, with filters for status and content type.",
    role: "Managing Editor",
    route: "/dashboard",
  },
  {
    id: 2,
    title: "Desk Review",
    description:
      "The editor reviews a new submission and decides whether to send it out for peer review.",
    role: "Managing Editor",
    route: "/dashboard/2024-052",
    tab: "submission",
  },
  {
    id: 3,
    title: "Peer Review",
    description:
      "The editor assigns peer reviewers and tracks which reviews have come in.",
    role: "Managing Editor",
    route: "/dashboard/2024-034",
    tab: "reviews",
  },
  {
    id: 4,
    title: "Editor Decision",
    description:
      "With all reviews in, the editor reads the feedback and renders a decision on the manuscript.",
    role: "Managing Editor",
    route: "/dashboard/2024-028",
    tab: "reviews",
  },
  {
    id: 5,
    title: "Copy Editing",
    description:
      "The editor oversees the copy editing process — marked-up versions are exchanged between copy editor and author.",
    role: "Managing Editor",
    route: "/dashboard/2024-010",
    tab: "copy-editing",
  },
  {
    id: 6,
    title: "Activity Log",
    description:
      "A complete timeline of every action taken on a submission — from initial submission through production.",
    role: "Managing Editor",
    route: "/dashboard/2024-005",
    tab: "activity",
  },
  {
    id: 7,
    title: "People Management",
    description:
      "The editor manages the reviewer and copy editor databases — tracking expertise, turnaround times, and availability.",
    role: "Managing Editor",
    route: "/admin",
  },
  // --- Other perspectives ---
  {
    id: 8,
    title: "Author View",
    description:
      "Authors only see their own submissions, action items, and the submission form.",
    role: "Author",
    route: "/dashboard",
  },
  {
    id: 9,
    title: "Reviewer View",
    description:
      "Reviewers see only the submissions they've been assigned to review, and can submit their evaluations.",
    role: "Reviewer",
    route: "/dashboard/2024-034",
    tab: "reviews",
  },
  {
    id: 10,
    title: "Copy Editor View",
    description:
      "Copy editors see only manuscripts in copy editing, and work through the markup and review cycle.",
    role: "Copy Editor",
    route: "/dashboard/2024-010",
    tab: "copy-editing",
  },
];

export const TOTAL_STEPS = PRESENTATION_STEPS.length;
