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
  {
    id: 1,
    title: "Dashboard",
    description:
      "The Managing Editor sees all submissions across every status in the workflow.",
    role: "Managing Editor",
    route: "/dashboard",
  },
  {
    id: 2,
    title: "Submit",
    description:
      "An author submits their manuscript through the submission form.",
    role: "Author",
    route: "/submit",
  },
  {
    id: 3,
    title: "Desk Review",
    description:
      "The editor reviews a new submission and decides whether to send it for peer review.",
    role: "Managing Editor",
    route: "/dashboard/2024-052",
    tab: "submission",
  },
  {
    id: 4,
    title: "Assign Reviewers",
    description:
      "The editor assigns peer reviewers and monitors review progress.",
    role: "Managing Editor",
    route: "/dashboard/2024-034",
    tab: "reviews",
  },
  {
    id: 5,
    title: "Reviewer",
    description:
      "A peer reviewer sees their assignment and submits their evaluation.",
    role: "Reviewer",
    route: "/dashboard/2024-034",
    tab: "reviews",
  },
  {
    id: 6,
    title: "Decision",
    description:
      "With all reviews in, the editor reads feedback and renders a decision.",
    role: "Managing Editor",
    route: "/dashboard/2024-028",
    tab: "reviews",
  },
  {
    id: 7,
    title: "Copy Editing",
    description:
      "A copy editor works on the accepted manuscript, uploading edits and notes.",
    role: "Copy Editor",
    route: "/dashboard/2024-010",
    tab: "copy-editing",
  },
  {
    id: 8,
    title: "People",
    description: "The editor manages the reviewer and copy editor databases.",
    role: "Managing Editor",
    route: "/admin",
  },
];

export const TOTAL_STEPS = PRESENTATION_STEPS.length;
