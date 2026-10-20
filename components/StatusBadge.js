import { Clock, Send, Star, CheckCircle2, XCircle } from "lucide-react";

const STATUS_CONFIG = {
  Applied: {
    bg: "rgba(111, 182, 255, 0.15)",
    fg: "#2563eb",
    border: "rgba(111, 182, 255, 0.35)",
    icon: Clock,
  },
  Invited: {
    bg: "var(--orb)",
    fg: "var(--or)",
    border: "rgba(240, 86, 29, 0.3)",
    icon: Send,
  },
  Shortlisted: {
    bg: "rgba(234, 179, 8, 0.15)",
    fg: "#b45309",
    border: "rgba(234, 179, 8, 0.35)",
    icon: Star,
  },
  Hired: {
    bg: "var(--ok-bg)",
    fg: "var(--ok)",
    border: "rgba(18, 163, 107, 0.3)",
    icon: CheckCircle2,
  },
  Rejected: {
    bg: "rgba(239, 68, 68, 0.12)",
    fg: "#dc2626",
    border: "rgba(239, 68, 68, 0.3)",
    icon: XCircle,
  },
};

export default function StatusBadge({ status }) {
  const normalized =
    status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() || "Applied";
  const cfg = STATUS_CONFIG[normalized] || STATUS_CONFIG.Applied;
  const isLive = ["Applied", "Shortlisted", "Invited"].includes(normalized);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 11px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: 600,
        backgroundColor: cfg.bg,
        color: cfg.fg,
        border: `1px solid ${cfg.border}`,
        whiteSpace: "nowrap",
        userSelect: "none",
        transition: "all 0.15s ease",
      }}
    >
      <Icon size={13} strokeWidth={2.4} />
      <span>{normalized}</span>
      {isLive && (
        <span
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            backgroundColor: cfg.fg,
            display: "inline-block",
            marginLeft: "1px",
          }}
        />
      )}
    </span>
  );
}
