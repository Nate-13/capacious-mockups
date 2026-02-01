type SubmissionStatus =
  | "Submitted"
  | "In Desk Review"
  | "In Peer Review"
  | "Revision Requested"
  | "Accepted"
  | "Conditional Accept"
  | "Rejected"
  | "In Copy Editing"
  | "Published";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<SubmissionStatus, string> = {
  Submitted: "bg-[#F5F5F5] text-[#666]",
  "In Desk Review": "bg-[#E0E0E0] text-[#333]",
  "In Peer Review": "bg-[#E0E0E0] text-[#333]",
  "Revision Requested": "bg-[#E0E0E0] text-[#333]",
  Accepted: "bg-[#333] text-white",
  "Conditional Accept": "bg-[#333] text-white",
  Rejected: "bg-[#999] text-[#333]",
  "In Copy Editing": "bg-[#E0E0E0] text-[#333]",
  Published: "bg-[#333] text-white",
};

const defaultStyles = "bg-[#E0E0E0] text-[#333]";

function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const baseStyles = "inline-block text-[13px] px-3 py-1 rounded-[4px]";
  const variantStyles =
    statusStyles[status as SubmissionStatus] || defaultStyles;

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
