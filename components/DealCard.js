import { Calendar, Sparkles, ArrowRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

export const formatMoney = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function DealCard({ offer, appliedStatus, onApply, isBrandView, rightContent }) {
  const brandName = offer.brand || offer.brandProfile?.companyName || "Verified Brand";

  return (
    <div className="ticket-card">
      {/* Main Ticket Information */}
      <div style={{ flex: 1, padding: "20px 24px", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--mu)",
            }}
          >
            {brandName}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
              fontSize: "10px",
              backgroundColor: "var(--orb)",
              color: "var(--or)",
              padding: "2px 7px",
              borderRadius: "6px",
              fontWeight: 600,
            }}
          >
            <Sparkles size={10} color="var(--or)" />
            Verified Brief
          </span>
        </div>

        <h3
          style={{
            fontSize: "19px",
            fontWeight: 700,
            color: "var(--ink)",
            fontFamily: "var(--font-heading)",
            lineHeight: 1.25,
            marginBottom: "12px",
          }}
        >
          {offer.title}
        </h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
          <span
            style={{
              fontSize: "12px",
              padding: "4px 10px",
              borderRadius: "8px",
              fontWeight: 500,
              backgroundColor: "var(--alt)",
              color: "var(--ink)",
              border: "1px solid var(--ln)",
            }}
          >
            {offer.niche}
          </span>
          <span
            style={{
              fontSize: "12px",
              padding: "4px 10px",
              borderRadius: "8px",
              fontWeight: 500,
              backgroundColor: "var(--alt)",
              color: "var(--mu)",
              border: "1px solid var(--ln)",
            }}
          >
            {offer.deliverables}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            color: "var(--mu)",
          }}
        >
          <Calendar size={13} />
          <span>{offer.days || 14} days left to apply</span>
        </div>
      </div>

      {/* Perforated Stub Section */}
      <div className="ticket-divider">
        <div className="ticket-notch-top" />
        <div className="ticket-notch-bottom" />

        <div style={{ textAlign: "center", marginBottom: "14px", width: "100%" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--mu)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "3px",
            }}
          >
            Budget Bracket
          </div>
          <div
            style={{
              fontSize: "17px",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              color: "var(--ink)",
              lineHeight: 1.1,
            }}
          >
            {formatMoney(offer.budgetMin)}
          </div>
          <div
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-mono)",
              color: "var(--mu)",
              marginTop: "1px",
            }}
          >
            – {formatMoney(offer.budgetMax)}
          </div>
        </div>

        {rightContent ? (
          rightContent
        ) : appliedStatus ? (
          <div style={{ width: "100%", textAlign: "center" }}>
            <StatusBadge status={appliedStatus} />
          </div>
        ) : (
          <button
            onClick={onApply}
            className="b or"
            style={{
              width: "100%",
              padding: "8px 14px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <span>Apply</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
