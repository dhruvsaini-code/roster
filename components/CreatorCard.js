import { MapPin, CheckCircle, Send } from "lucide-react";
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
        border: "1px solid var(--line)",
        borderRadius: "18px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 10px 24px -6px rgba(18, 20, 29, 0.06)";
        e.currentTarget.style.borderColor = "var(--line-strong)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "var(--line)";
      }}
    >
      <div>
        {/* Header with avatar, handle and verified platform */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
          <Avatar name={creator.name} size={44} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <h3
                style={{
                  fontSize: "16px",
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
              <CheckCircle size={14} color="var(--cobalt)" fill="var(--cobalt-soft)" />
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--slate)",
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
              padding: "6px 8px",
              borderRadius: "8px",
              backgroundColor: isInstagram ? "#FDF2F8" : "#FEF2F2",
              color: isInstagram ? "#DB2777" : "#DC2626",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              fontWeight: 600,
            }}
            title={creator.platform}
          >
            {isInstagram ? <Instagram size={14} /> : <Youtube size={14} />}
            <span style={{ display: "none" }}>{creator.platform}</span>
          </div>
        </div>

        {/* Bio */}
        <p
          style={{
            fontSize: "13px",
            color: "var(--ink-soft)",
            lineHeight: 1.5,
            marginBottom: "16px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {creator.bio}
        </p>

        {/* City tag if available */}
        {creator.city && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              color: "var(--slate)",
              marginBottom: "14px",
            }}
          >
            <MapPin size={12} />
            <span>{creator.city}</span>
          </div>
        )}

        {/* Key Metrics Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            padding: "12px 0",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            marginBottom: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "11px", color: "var(--slate)", fontWeight: 500, marginBottom: "2px" }}>
              Audience
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
                color: "var(--ink)",
              }}
            >
              {formatFollowers(creator.followers)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "var(--slate)", fontWeight: 500, marginBottom: "2px" }}>
              Engagement
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
                color: "var(--green)",
              }}
            >
              {creator.engagement}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "var(--slate)", fontWeight: 500, marginBottom: "2px" }}>
              Rate / Post
            </div>
            <div
              style={{
                fontSize: "13px",
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
            padding: "3px 8px",
            borderRadius: "6px",
            backgroundColor: "var(--paper-warm)",
            color: "var(--ink-soft)",
          }}
        >
          {creator.niche}
        </span>

        <button
          onClick={() => onInvite(creator)}
          style={{
            fontSize: "12px",
            fontWeight: 600,
            padding: "6px 14px",
            borderRadius: "8px",
            backgroundColor: "var(--ink)",
            color: "var(--paper)",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Send size={12} />
          <span>Invite</span>
        </button>
      </div>
    </div>
  );
}
