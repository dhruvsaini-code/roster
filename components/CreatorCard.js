import { MapPin, CheckCircle, Send, Users, ShieldCheck } from "lucide-react";
import { Instagram, Youtube } from "./Icons";
import Avatar from "./Avatar";
import { formatMoney } from "./DealCard";

export const formatFollowers = (n) => {
  if (!n) return "0";
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
};

export default function CreatorCard({ creator, onInvite }) {
  const isInstagram = creator.platform?.toLowerCase() === "instagram";

  return (
    <div
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--ln)",
        borderRadius: "22px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease",
        boxShadow: "0 4px 18px rgba(0, 0, 0, 0.03)",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "var(--sh-card)";
        e.currentTarget.style.borderColor = "var(--or)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 18px rgba(0, 0, 0, 0.03)";
        e.currentTarget.style.borderColor = "var(--ln)";
      }}
    >
      <div>
        {/* Header with avatar, handle and verified platform */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
          <Avatar name={creator.name} size={48} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  fontFamily: "var(--font-heading)",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {creator.name}
              </h3>
              <CheckCircle size={15} color="var(--ok)" />
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--mu)",
                fontFamily: "var(--font-mono)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {creator.handle}
            </p>
          </div>

          <div
            style={{
              padding: "6px 10px",
              borderRadius: "10px",
              backgroundColor: isInstagram ? "rgba(219, 39, 119, 0.1)" : "rgba(220, 38, 38, 0.1)",
              color: isInstagram ? "#db2777" : "#dc2626",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "11px",
              fontWeight: 700,
            }}
            title={creator.platform}
          >
            {isInstagram ? <Instagram size={14} /> : <Youtube size={14} />}
            <span>{creator.platform}</span>
          </div>
        </div>

        {/* Bio */}
        <p
          style={{
            fontSize: "13px",
            color: "var(--mu)",
            lineHeight: 1.55,
            marginBottom: "14px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {creator.bio}
        </p>

        {/* City and Audience Breakdown */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
            color: "var(--mu)",
            marginBottom: "14px",
            flexWrap: "wrap",
          }}
        >
          {creator.city && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                backgroundColor: "var(--alt)",
                padding: "2px 8px",
                borderRadius: "6px",
              }}
            >
              <MapPin size={11} color="var(--or)" />
              {creator.city}
            </span>
          )}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: "var(--alt)",
              padding: "2px 8px",
              borderRadius: "6px",
            }}
          >
            <Users size={11} color="var(--ok)" />
            84% India Audience
          </span>
        </div>

        {/* Key Metrics Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            padding: "12px 0",
            borderTop: "1px solid var(--ln)",
            borderBottom: "1px solid var(--ln)",
            marginBottom: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "11px", color: "var(--mu)", fontWeight: 500, marginBottom: "2px" }}>
              Audience
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
                color: "var(--ink)",
              }}
            >
              {formatFollowers(creator.followers)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "var(--mu)", fontWeight: 500, marginBottom: "2px" }}>
              Engagement
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
                color: "var(--ok)",
              }}
            >
              {creator.engagement}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "var(--mu)", fontWeight: 500, marginBottom: "2px" }}>
              Rate / Post
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
                color: "var(--ink)",
              }}
            >
              {formatMoney(creator.rate)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Niche & Invite action */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: "99px",
            backgroundColor: "var(--alt)",
            color: "var(--ink)",
            border: "1px solid var(--ln)",
          }}
        >
          {creator.niche}
        </span>

        <button
          onClick={() => onInvite(creator)}
          className="b d"
          style={{
            fontSize: "12px",
            fontWeight: 600,
            padding: "8px 18px",
            borderRadius: "10px",
          }}
        >
          <Send size={12} />
          <span>Invite</span>
        </button>
      </div>
    </div>
  );
}
