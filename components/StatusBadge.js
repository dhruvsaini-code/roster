import { Clock, Send, Star, CheckCircle2, XCircle } from "lucide-react";

const STATUS_CONFIG = {
  Applied: {
    bg: "var(--cobalt-soft)",
    fg: "var(--cobalt)",
    border: "#C7D2FE",
    icon: Clock,
  },
  Invited: {
    bg: "#EDE9FE",
    fg: "#6366F1",
    border: "#DDD6FE",
    icon: Send,
  },
  Shortlisted: {
    bg: "var(--gold-soft)",
    fg: "var(--gold)",
    border: "#FDE68A",
    icon: Star,
  },
  Hired: {
    bg: "var(--green-soft)",
    fg: "var(--green)",
    border: "#A7F3D0",
    icon: CheckCircle2,
  },
  Rejected: {
    bg: "var(--red-soft)",
    fg: "var(--red)",
    border: "#FECDD3",
    icon: XCircle,
  },
};

export default function StatusBadge({ status }) {
  const normalized =
    status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() || "Applied";
  const cfg = STATUS_CONFIG[normalized] || STATUS_CONFIG.Applied;
  const Icon = cfg.icon;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "4px 10px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: 600,
        backgroundColor: cfg.bg,
        color: cfg.fg,
        border: `1px solid ${cfg.border}`,
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={13} strokeWidth={2.4} />
      {normalized}
    </span>
  );
}
