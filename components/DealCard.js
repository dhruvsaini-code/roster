import { Calendar, Sparkles, ArrowRight, Video, Flame, ShieldCheck, MessageSquare } from "lucide-react";
import StatusBadge from "./StatusBadge";

export const formatMoney = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function DealCard({
  offer,
  appliedStatus,
  onApply,
  onViewEscrow,
  onOpenChat,
  isBrandView,
  rightContent,
}) {
  const brandName = offer.brand || offer.brandProfile?.companyName || "Verified Brand";
  const dealRef = `REF: #DL-${(offer.id || "1").slice(-4).toUpperCase()}`;

  return (
    <div className="ticket-card">
      {/* Main Ticket Information */}
      <div style={{ flex: 1, padding: "22px 26px", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
              Verified Deal
            </span>
          </div>

          <span
            style={{
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              color: "var(--mu)",
              letterSpacing: "0.05em",
            }}
          >
            {dealRef}
          </span>
        </div>

        <h3
          style={{
            fontSize: "20px",
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
              fontWeight: 600,
              backgroundColor: "var(--alt)",
              color: "var(--ink)",
              border: "1px solid var(--ln)",
            }}
          >
            {offer.niche}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              padding: "4px 10px",
              borderRadius: "8px",
              fontWeight: 500,
              backgroundColor: "var(--alt)",
              color: "var(--mu)",
              border: "1px solid var(--ln)",
            }}
          >
            <Video size={13} color="var(--or)" />
            {offer.deliverables}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "12px",
            color: "var(--mu)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Calendar size={13} />
            <span>{offer.days || 14} days left to apply</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--ok)", fontWeight: 500 }}>
            <Flame size={13} />
            <span>High response rate</span>
          </div>
        </div>
      </div>

      {/* Perforated Stub Section */}
      <div className="ticket-divider">
        <div className="ticket-notch-top" />
        <div className="ticket-notch-bottom" />

        <div style={{ textAlign: "center", marginBottom: "12px", width: "100%" }}>
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
            Guaranteed Budget
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
              marginTop: "2px",
            }}
          >
            – {formatMoney(offer.budgetMax)}
          </div>
        </div>

        {rightContent ? (
          rightContent
        ) : appliedStatus ? (
          <div style={{ width: "100%", marginBottom: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ textAlign: "center" }}>
              <StatusBadge status={appliedStatus} />
            </div>
            <div style={{ display: "flex", gap: "6px", width: "100%" }}>
              {onViewEscrow && (
                <button
                  onClick={onViewEscrow}
                  style={{
                    flex: 1,
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "6px 8px",
                    borderRadius: "8px",
                    backgroundColor: "var(--alt)",
                    border: "1px solid var(--ln)",
                    color: "var(--ink)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                  title="View Milestone Escrow Tracker"
                >
                  <ShieldCheck size={12} color="var(--or)" />
                  <span>Escrow</span>
                </button>
              )}
              {onOpenChat && (
                <button
                  onClick={onOpenChat}
                  style={{
                    flex: 1,
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "6px 8px",
                    borderRadius: "8px",
                    backgroundColor: "var(--alt)",
                    border: "1px solid var(--ln)",
                    color: "var(--ink)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                  title="Chat with Brand"
                >
                  <MessageSquare size={12} color="var(--or)" />
                  <span>Chat</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "6px", marginBottom: "10px" }}>
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
              <span>Apply Now</span>
              <ArrowRight size={14} />
            </button>
            {onViewEscrow && (
              <button
                onClick={onViewEscrow}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--mu)",
                  fontSize: "11px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "3px",
                }}
              >
                <ShieldCheck size={11} color="var(--or)" />
                <span>Escrow Protected</span>
              </button>
            )}
          </div>
        )}

        {/* Decorative Ticket Barcode */}
        <div className="ticket-barcode" aria-hidden="true">
          <span style={{ width: "2px" }} />
          <span style={{ width: "1px" }} />
          <span style={{ width: "3px" }} />
          <span style={{ width: "1px" }} />
          <span style={{ width: "2px" }} />
          <span style={{ width: "4px" }} />
          <span style={{ width: "1px" }} />
          <span style={{ width: "2px" }} />
          <span style={{ width: "3px" }} />
          <span style={{ width: "1px" }} />
          <span style={{ width: "2px" }} />
          <span style={{ width: "1px" }} />
          <span style={{ width: "3px" }} />
          <span style={{ width: "2px" }} />
        </div>
      </div>
    </div>
  );
}
