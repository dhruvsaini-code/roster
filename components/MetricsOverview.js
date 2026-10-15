import { Briefcase, Users, TrendingUp, Sparkles } from "lucide-react";
import { formatMoney } from "./DealCard";

export default function MetricsOverview({ offersCount, creatorsCount, totalValue, avgEngagement }) {
  const metrics = [
    {
      label: "Active Briefs",
      value: offersCount || 6,
      sub: "Open for pitches",
      icon: Briefcase,
      color: "var(--cobalt)",
      bg: "var(--cobalt-soft)",
    },
    {
      label: "Vetted Creators",
      value: creatorsCount || 9,
      sub: "Verified analytics",
      icon: Users,
      color: "var(--gold)",
      bg: "var(--gold-soft)",
    },
    {
      label: "Deal Flow Value",
      value: totalValue ? formatMoney(totalValue) : "₹3,45,000",
      sub: "Allocated budget",
      icon: Sparkles,
      color: "var(--green)",
      bg: "var(--green-soft)",
    },
    {
      label: "Avg. Engagement",
      value: `${avgEngagement || "5.8"}%`,
      sub: "Across all platforms",
      icon: TrendingUp,
      color: "#6366F1",
      bg: "#EDE9FE",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: "14px",
        marginBottom: "28px",
      }}
    >
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--line)",
              borderRadius: "16px",
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                backgroundColor: m.bg,
                color: m.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={20} />
            </div>

            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--slate)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  fontFamily: "var(--font-heading)",
                  color: "var(--ink)",
                  lineHeight: 1.2,
                  marginTop: "2px",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--ink-soft)",
                  marginTop: "1px",
                }}
              >
                {m.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
