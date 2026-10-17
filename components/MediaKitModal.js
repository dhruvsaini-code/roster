"use client";

import { useState } from "react";
import {
  Download,
  Share2,
  CheckCircle2,
  Check,
  X,
  TrendingUp,
  Users,
  MapPin,
  Sparkles,
  Zap,
} from "lucide-react";
import Avatar from "./Avatar";
import { Instagram, Youtube } from "./Icons";
import { formatMoney } from "./DealCard";
import { formatFollowers } from "./CreatorCard";

export default function MediaKitModal({ creator, onClose, onInvite, onToast }) {
  const [copied, setCopied] = useState(false);

  if (!creator) return null;

  const isInstagram = creator.platform?.toLowerCase() === "instagram";
  const rate = creator.rate || 25000;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.origin + `/#creator-${creator.id}`);
    setCopied(true);
    onToast?.(`Copied ${creator.name}'s verified Media Kit URL to clipboard! 📋`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    onToast?.(`Exporting ${creator.name}'s Media Kit & Rate Card (PDF)... 📄`);
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
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          maxHeight: "90vh",
          backgroundColor: "var(--card)",
          border: "1px solid var(--ln)",
          borderRadius: "26px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.28)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "22px 28px",
            borderBottom: "1px solid var(--ln)",
            backgroundColor: "var(--alt)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--or)",
                backgroundColor: "var(--orb)",
                padding: "3px 10px",
                borderRadius: "99px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Verified Creator Media Kit
            </span>
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

        {/* Scrollable Content */}
        <div style={{ padding: "28px", overflowY: "auto" }}>
          {/* Creator Profile Summary */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Avatar name={creator.name} size={64} />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                    {creator.name}
                  </h2>
                  <CheckCircle2 size={18} color="var(--ok)" />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                  <span style={{ fontSize: "13px", color: "var(--mu)", fontFamily: "var(--font-mono)" }}>
                    {creator.handle}
                  </span>
                  <span style={{ color: "var(--ln)" }}>•</span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      color: isInstagram ? "#db2777" : "#dc2626",
                      fontWeight: 600,
                    }}
                  >
                    {isInstagram ? <Instagram size={13} /> : <Youtube size={13} />}
                    {creator.platform}
                  </span>
                  <span style={{ color: "var(--ln)" }}>•</span>
                  <span style={{ fontSize: "12px", color: "var(--mu)", display: "flex", alignItems: "center", gap: "3px" }}>
                    <MapPin size={12} />
                    {creator.city || "Mumbai"}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={handleCopyLink}
                style={{
                  background: "var(--alt)",
                  border: "1px solid var(--ln)",
                  color: "var(--ink)",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                }}
              >
                {copied ? <Check size={14} color="var(--ok)" /> : <Share2 size={14} />}
                <span>{copied ? "Copied" : "Share"}</span>
              </button>

              <button
                onClick={handleDownload}
                style={{
                  background: "var(--alt)",
                  border: "1px solid var(--ln)",
                  color: "var(--ink)",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                }}
              >
                <Download size={14} />
                <span>PDF Kit</span>
              </button>
            </div>
          </div>

          <p style={{ fontSize: "14px", color: "var(--mu)", lineHeight: 1.6, marginBottom: "28px" }}>
            {creator.bio}
          </p>

          {/* Key Metric Gauges */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "14px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "var(--alt)",
                borderRadius: "16px",
                border: "1px solid var(--ln)",
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--mu)", textTransform: "uppercase" }}>
                Total Verified Followers
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink)",
                  marginTop: "4px",
                }}
              >
                {formatFollowers(creator.followers)}
              </div>
              <div style={{ fontSize: "11px", color: "var(--ok)", marginTop: "4px" }}>
                +14.2% MoM Growth
              </div>
            </div>

            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "var(--alt)",
                borderRadius: "16px",
                border: "1px solid var(--ln)",
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--mu)", textTransform: "uppercase" }}>
                Avg Engagement Rate
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                  color: "var(--ok)",
                  marginTop: "4px",
                }}
              >
                {creator.engagement}%
              </div>
              <div style={{ fontSize: "11px", color: "var(--mu)", marginTop: "4px" }}>
                Top 5% of {creator.niche}
              </div>
            </div>

            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "var(--alt)",
                borderRadius: "16px",
                border: "1px solid var(--ln)",
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--mu)", textTransform: "uppercase" }}>
                Avg Reel Impressions
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink)",
                  marginTop: "4px",
                }}
              >
                {Math.round(creator.followers * 0.42).toLocaleString()}
              </div>
              <div style={{ fontSize: "11px", color: "var(--mu)", marginTop: "4px" }}>
                Consistent algorithmic reach
              </div>
            </div>
          </div>

          {/* Demographics Breakdown */}
          <div
            style={{
              padding: "22px",
              backgroundColor: "var(--alt)",
              borderRadius: "18px",
              border: "1px solid var(--ln)",
              marginBottom: "32px",
            }}
          >
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", marginBottom: "16px" }}>
              Audience Demographics & Core Reach
            </h4>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {/* Age split */}
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--mu)", marginBottom: "10px" }}>
                  Age Distribution
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "3px" }}>
                      <span>18 – 24 years</span>
                      <strong style={{ fontFamily: "var(--font-mono)" }}>54%</strong>
                    </div>
                    <div style={{ height: "6px", backgroundColor: "var(--card)", borderRadius: "99px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: "54%", backgroundColor: "var(--or)" }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "3px" }}>
                      <span>25 – 34 years</span>
                      <strong style={{ fontFamily: "var(--font-mono)" }}>36%</strong>
                    </div>
                    <div style={{ height: "6px", backgroundColor: "var(--card)", borderRadius: "99px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: "36%", backgroundColor: "var(--or)", opacity: 0.8 }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "3px" }}>
                      <span>35+ years</span>
                      <strong style={{ fontFamily: "var(--font-mono)" }}>10%</strong>
                    </div>
                    <div style={{ height: "6px", backgroundColor: "var(--card)", borderRadius: "99px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: "10%", backgroundColor: "var(--or)", opacity: 0.5 }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gender & Top Cities */}
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--mu)", marginBottom: "10px" }}>
                  Gender Split & Top Cities
                </div>
                <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                  <div style={{ flex: 1, padding: "8px 12px", backgroundColor: "var(--card)", borderRadius: "10px", border: "1px solid var(--ln)" }}>
                    <div style={{ fontSize: "11px", color: "var(--mu)" }}>Female</div>
                    <div style={{ fontSize: "16px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>68%</div>
                  </div>
                  <div style={{ flex: 1, padding: "8px 12px", backgroundColor: "var(--card)", borderRadius: "10px", border: "1px solid var(--ln)" }}>
                    <div style={{ fontSize: "11px", color: "var(--mu)" }}>Male</div>
                    <div style={{ fontSize: "16px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>32%</div>
                  </div>
                </div>
                <div style={{ fontSize: "11px", color: "var(--mu)" }}>
                  Top Cities: <strong>Mumbai (34%)</strong>, <strong>Delhi NCR (28%)</strong>, <strong>Bengaluru (21%)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Standard Commercial Rate Card */}
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", marginBottom: "14px" }}>
              Standard Deliverable Packages & Rate Card
            </h4>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
              {/* Package 1 */}
              <div
                style={{
                  padding: "18px",
                  borderRadius: "16px",
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--ln)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--mu)", textTransform: "uppercase" }}>
                    Standard
                  </span>
                  <h5 style={{ fontSize: "15px", fontWeight: 700, margin: "4px 0 10px" }}>1 Dedicated Reel</h5>
                  <p style={{ fontSize: "12px", color: "var(--mu)", lineHeight: 1.5, marginBottom: "12px" }}>
                    45–60s video with product integration, custom hook, and 30-day usage rights.
                  </p>
                </div>
                <div style={{ fontSize: "18px", fontWeight: 800, fontFamily: "var(--font-mono)", color: "var(--ink)" }}>
                  {formatMoney(rate)}
                </div>
              </div>

              {/* Package 2 (Popular) */}
              <div
                style={{
                  padding: "18px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(255, 92, 0, 0.04)",
                  border: "2px solid var(--or)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "12px",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#fff",
                    backgroundColor: "var(--or)",
                    padding: "2px 8px",
                    borderRadius: "99px",
                    textTransform: "uppercase",
                  }}
                >
                  Most Popular
                </span>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--or)", textTransform: "uppercase" }}>
                    Growth Bundle
                  </span>
                  <h5 style={{ fontSize: "15px", fontWeight: 700, margin: "4px 0 10px" }}>Reel + 2 Stories</h5>
                  <p style={{ fontSize: "12px", color: "var(--mu)", lineHeight: 1.5, marginBottom: "12px" }}>
                    1 Reel + 2 Story frames with direct swipe-up link and 60-day organic exclusivity.
                  </p>
                </div>
                <div style={{ fontSize: "18px", fontWeight: 800, fontFamily: "var(--font-mono)", color: "var(--or)" }}>
                  {formatMoney(Math.round(rate * 1.35))}
                </div>
              </div>

              {/* Package 3 */}
              <div
                style={{
                  padding: "18px",
                  borderRadius: "16px",
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--ln)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--mu)", textTransform: "uppercase" }}>
                    Full Blitz
                  </span>
                  <h5 style={{ fontSize: "15px", fontWeight: 700, margin: "4px 0 10px" }}>Multi-Post Campaign</h5>
                  <p style={{ fontSize: "12px", color: "var(--mu)", lineHeight: 1.5, marginBottom: "12px" }}>
                    2 Reels + 4 Stories + Pinned Post + YouTube Shorts cross-promotion.
                  </p>
                </div>
                <div style={{ fontSize: "18px", fontWeight: 800, fontFamily: "var(--font-mono)", color: "var(--ink)" }}>
                  {formatMoney(Math.round(rate * 2.6))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: "18px 28px",
            borderTop: "1px solid var(--ln)",
            backgroundColor: "var(--alt)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--mu)" }}>
            ⚡ All bookings protected by Roster Automated Escrow
          </span>

          <button
            onClick={() => {
              onClose();
              onInvite?.(creator);
            }}
            className="b or"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              padding: "10px 22px",
              borderRadius: "12px",
            }}
          >
            Invite to Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
