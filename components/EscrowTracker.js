"use client";

import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  Lock,
  AlertCircle,
  FileText,
  DollarSign,
  X,
  Copy,
  Check,
} from "lucide-react";
import { formatMoney } from "./DealCard";

export default function EscrowTracker({ deal, onClose, onToast }) {
  // Current milestone stage: 1 to 4
  const [currentStage, setCurrentStage] = useState(2);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const contractId = "ESC-2026-9812";

  const handleCopyContractId = () => {
    navigator.clipboard?.writeText(contractId);
    setCopiedId(true);
    onToast?.("Contract ID copied to clipboard! 📋");
    setTimeout(() => setCopiedId(false), 2000);
  };

  const budget = deal?.budgetMax || deal?.rate || 45000;
  const platformFee = Math.round(budget * 0.05);
  const netCreatorPayout = budget - platformFee;

  const milestones = [
    {
      step: 1,
      title: "Contract Signed & Escrow Funded",
      desc: "Brand deposited full campaign budget into protected escrow account.",
      timestamp: "Oct 15, 2026 • 10:24 AM",
      badge: "Completed",
    },
    {
      step: 2,
      title: "Script & Visual Concept Approved",
      desc: "Creator submitted outline, key hook, and visual storyboard for brand review.",
      timestamp: "Oct 16, 2026 • 04:12 PM",
      badge: currentStage >= 2 ? (currentStage === 2 ? "In Review" : "Approved") : "Pending",
    },
    {
      step: 3,
      title: "Deliverable Upload & Quality Check",
      desc: "Creator uploads unlisted video/post preview. Brand verifies tag compliance.",
      timestamp: currentStage >= 3 ? "Oct 17, 2026 • 11:30 AM" : "Estimated 2 days",
      badge: currentStage >= 3 ? (currentStage === 3 ? "Uploaded" : "Verified") : "Waiting",
    },
    {
      step: 4,
      title: "Proof of Post & Instant Payout Release",
      desc: "Live post link verified via API. Funds released to creator bank account instantly.",
      timestamp: currentStage >= 4 ? "Oct 17, 2026 • 01:45 PM" : "Awaiting step 3",
      badge: currentStage >= 4 ? "Funds Released" : "Locked",
    },
  ];

  const handleAdvance = () => {
    if (currentStage >= 4) {
      onToast?.("All milestones completed! Payout has already been settled. 💰");
      return;
    }
    setIsAdvancing(true);
    setTimeout(() => {
      const next = currentStage + 1;
      setCurrentStage(next);
      setIsAdvancing(false);
      if (next === 3) {
        onToast?.("Deliverables preview uploaded! Awaiting brand verification. 🎥");
      } else if (next === 4) {
        onToast?.(`Milestone reached! ₹${netCreatorPayout.toLocaleString()} released to creator account. 🚀`);
      }
    }, 600);
  };

  const handleDownloadSow = () => {
    onToast?.("Generated Statement of Work & Escrow Receipt (PDF) 📄");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(8px)",
        display: "grid",
        placeItems: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          backgroundColor: "var(--card)",
          border: "1px solid var(--ln)",
          borderRadius: "24px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "22px 28px",
            borderBottom: "1px solid var(--ln)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "var(--alt)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                backgroundColor: "var(--orb)",
                color: "var(--or)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                Milestone Escrow Contract
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                <span style={{ fontSize: "12px", color: "var(--mu)", fontFamily: "var(--font-mono)" }}>
                  ID: {contractId}
                </span>
                <button
                  onClick={handleCopyContractId}
                  title="Copy contract ID"
                  style={{
                    background: "var(--alt)",
                    border: "1px solid var(--ln)",
                    borderRadius: "6px",
                    padding: "2px 6px",
                    fontSize: "11px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    color: copiedId ? "var(--ok)" : "var(--mu)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {copiedId ? <Check size={11} strokeWidth={2.5} /> : <Copy size={11} />}
                  <span>{copiedId ? "Copied" : "Copy"}</span>
                </button>
                <span style={{ fontSize: "12px", color: "var(--mu)" }}>• {deal?.title || "Instagram Reels Campaign"}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--mu)",
              cursor: "pointer",
              padding: "6px",
              borderRadius: "8px",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "28px", overflowY: "auto" }}>
          {/* Escrow Financial Summary */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
              padding: "16px 20px",
              backgroundColor: "var(--alt)",
              borderRadius: "16px",
              border: "1px solid var(--ln)",
              marginBottom: "28px",
            }}
          >
            <div>
              <span style={{ fontSize: "11px", color: "var(--mu)", textTransform: "uppercase", fontWeight: 600 }}>
                Escrow Locked
              </span>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink)",
                  marginTop: "2px",
                }}
              >
                {formatMoney(budget)}
              </div>
            </div>

            <div>
              <span style={{ fontSize: "11px", color: "var(--mu)", textTransform: "uppercase", fontWeight: 600 }}>
                Platform Fee (5%)
              </span>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  color: "var(--mu)",
                  marginTop: "2px",
                }}
              >
                {formatMoney(platformFee)}
              </div>
            </div>

            <div>
              <span style={{ fontSize: "11px", color: "var(--ok)", textTransform: "uppercase", fontWeight: 600 }}>
                Creator Net Payout
              </span>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  color: "var(--ok)",
                  marginTop: "2px",
                }}
              >
                {formatMoney(netCreatorPayout)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink)" }}>
                Contract Lifecycle: Stage {currentStage} of 4
              </span>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--or)", fontWeight: 700 }}>
                {currentStage === 4 ? "100% Completed" : `${currentStage * 25}% Progress`}
              </span>
            </div>
            <div
              style={{
                height: "8px",
                width: "100%",
                backgroundColor: "var(--alt)",
                borderRadius: "99px",
                overflow: "hidden",
                border: "1px solid var(--ln)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(currentStage / 4) * 100}%`,
                  backgroundColor: currentStage === 4 ? "var(--ok)" : "var(--or)",
                  borderRadius: "99px",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>

          {/* Milestones Stepper */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {milestones.map((m) => {
              const isPast = m.step < currentStage;
              const isCurrent = m.step === currentStage;

              return (
                <div
                  key={m.step}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    opacity: m.step > currentStage ? 0.45 : 1,
                  }}
                >
                  {/* Step Node */}
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: isPast
                        ? "var(--ok-bg)"
                        : isCurrent
                        ? "var(--orb)"
                        : "var(--alt)",
                      color: isPast
                        ? "var(--ok)"
                        : isCurrent
                        ? "var(--or)"
                        : "var(--mu)",
                      border: `2px solid ${
                        isPast ? "var(--ok)" : isCurrent ? "var(--or)" : "var(--ln)"
                      }`,
                      boxShadow: isCurrent ? "0 0 0 4px var(--orb)" : "none",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      fontWeight: 700,
                      fontSize: "13px",
                      fontFamily: "var(--font-mono)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isPast ? <CheckCircle2 size={16} strokeWidth={2.5} /> : m.step}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                      <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                        {m.title}
                      </h4>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: "99px",
                          backgroundColor: isPast
                            ? "var(--ok-bg)"
                            : isCurrent
                            ? "var(--orb)"
                            : "var(--alt)",
                          color: isPast ? "var(--ok)" : isCurrent ? "var(--or)" : "var(--mu)",
                          border: "1px solid var(--ln)",
                        }}
                      >
                        {m.badge}
                      </span>
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--mu)", margin: "4px 0 2px", lineHeight: 1.5 }}>
                      {m.desc}
                    </p>
                    <div style={{ fontSize: "11px", color: "var(--mu)", fontFamily: "var(--font-mono)" }}>
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div
          style={{
            padding: "18px 28px",
            borderTop: "1px solid var(--ln)",
            backgroundColor: "var(--alt)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <button
            onClick={handleDownloadSow}
            style={{
              background: "none",
              border: "1px solid var(--ln)",
              color: "var(--ink)",
              fontSize: "12px",
              fontWeight: 600,
              padding: "8px 14px",
              borderRadius: "10px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            <Download size={14} />
            <span>Download SOW Agreement</span>
          </button>

          <button
            onClick={handleAdvance}
            disabled={isAdvancing || currentStage >= 4}
            className="b or"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              padding: "9px 20px",
              borderRadius: "10px",
              opacity: isAdvancing || currentStage >= 4 ? 0.6 : 1,
              cursor: isAdvancing || currentStage >= 4 ? "default" : "pointer",
            }}
          >
            {isAdvancing ? (
              <span>Updating Ledger...</span>
            ) : currentStage >= 4 ? (
              <span>Contract Settled</span>
            ) : (
              <span>Simulate Next Stage ({currentStage + 1}/4)</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
