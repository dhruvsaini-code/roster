"use client";

import { useState, useMemo } from "react";
import { Calculator, ArrowRight, Zap, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import { formatMoney } from "./DealCard";

export default function RoiCalculator() {
  const [budget, setBudget] = useState(75000);

  const calculations = useMemo(() => {
    // Estimated CPM and engagement rate for Indian creator economy
    const cpm = 180; // ₹180 per 1000 views
    const estimatedImpressions = Math.round((budget / cpm) * 1000);
    const avgEngagement = 0.052; // 5.2%
    const estimatedEngagements = Math.round(estimatedImpressions * avgEngagement);
    
    let creatorMix = "1 Dedicated Creator";
    if (budget >= 300000) {
      creatorMix = "2 Top Creators + 4 Micro-Niche Creators";
    } else if (budget >= 150000) {
      creatorMix = "1 Mid-tier Creator + 2 Micro Creators";
    } else if (budget >= 50000) {
      creatorMix = "2-3 High-Engagement Niche Creators";
    } else {
      creatorMix = "1 High-ROI Niche Creator";
    }

    return {
      impressions: estimatedImpressions,
      engagements: estimatedEngagements,
      creatorMix,
    };
  }, [budget]);

  return (
    <section id="calculator" style={{ padding: "80px 0", background: "var(--alt)" }}>
      <div className="w">
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 36px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--or)",
              backgroundColor: "var(--orb)",
              padding: "4px 14px",
              borderRadius: "99px",
              display: "inline-block",
              marginBottom: "12px",
            }}
          >
            📊 Interactive ROI Estimator
          </span>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 54px)", marginBottom: "14px" }}>
            Model your campaign outcomes
          </h2>
          <p style={{ color: "var(--mu)", fontSize: "18px" }}>
            Adjust your marketing budget slider below to project guaranteed reach, audience engagement, and optimal creator mix.
          </p>
        </div>

        <div
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            backgroundColor: "var(--card)",
            border: "1px solid var(--ln)",
            borderRadius: "26px",
            padding: "36px 40px",
            boxShadow: "var(--sh-card)",
          }}
        >
          {/* Slider Controls */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "14px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--mu)", textTransform: "uppercase" }}>
                  Selected Campaign Budget
                </label>
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    color: "var(--ink)",
                    lineHeight: 1.1,
                    marginTop: "4px",
                  }}
                >
                  {formatMoney(budget)}
                </div>
              </div>

              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--ok)",
                  backgroundColor: "var(--ok-bg)",
                  padding: "4px 10px",
                  borderRadius: "8px",
                }}
              >
                0% Agency Markup
              </span>
            </div>

            <input
              type="range"
              min="20000"
              max="500000"
              step="5000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="wb-slider"
            />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px", color: "var(--mu)", fontFamily: "var(--font-mono)" }}>
              <span>₹20,000 (Test Brief)</span>
              <span>₹2,50,000 (Launch Scale)</span>
              <span>₹5,00,000 (Category Dominance)</span>
            </div>
          </div>

          {/* Real-time Projections Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--alt)",
                border: "1px solid var(--ln)",
                borderRadius: "18px",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "var(--or)" }}>
                <TrendingUp size={16} />
                <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase" }}>Est. Impressions</span>
              </div>
              <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--ink)" }}>
                {calculations.impressions.toLocaleString("en-IN")}+
              </div>
              <small style={{ color: "var(--mu)", fontSize: "12px" }}>Across Reels & YouTube Shorts</small>
            </div>

            <div
              style={{
                backgroundColor: "var(--alt)",
                border: "1px solid var(--ln)",
                borderRadius: "18px",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "var(--ok)" }}>
                <Zap size={16} />
                <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase" }}>Audience Actions</span>
              </div>
              <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--ink)" }}>
                {calculations.engagements.toLocaleString("en-IN")}+
              </div>
              <small style={{ color: "var(--mu)", fontSize: "12px" }}>Likes, shares & bio clicks</small>
            </div>

            <div
              style={{
                backgroundColor: "var(--alt)",
                border: "1px solid var(--ln)",
                borderRadius: "18px",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#6366f1" }}>
                <Users size={16} />
                <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase" }}>Recommended Mix</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink)", marginTop: "6px" }}>
                {calculations.creatorMix}
              </div>
              <small style={{ color: "var(--mu)", fontSize: "12px" }}>Optimized for verified conversions</small>
            </div>
          </div>

          {/* Action Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "20px",
              borderTop: "1px solid var(--ln)",
              flexWrap: "wrap",
              gap: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--mu)" }}>
              <CheckCircle2 size={16} color="var(--ok)" />
              <span>Includes milestone escrow security and contract automation</span>
            </div>

            <a href="#app-workspace" className="b or" style={{ padding: "10px 22px" }}>
              <span>Publish This Brief</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
