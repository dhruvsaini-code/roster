"use client";

import { Check, X, Sparkles, Shield, Zap, TrendingUp } from "lucide-react";

export default function ComparisonTable() {
  const comparisonData = [
    {
      feature: "Creator Discovery & Match",
      sponsorsync: "AI-powered niche graphing & verified demographic match",
      agency: "Limited agency-represented roster with biased push",
      manual: "Chaotic manual search & endless unanswered DMs",
      sponsorsyncWin: true,
    },
    {
      feature: "Payment Protection",
      sponsorsync: "Automated Milestone Escrow (Funds released upon proof)",
      agency: "Hefty 50% upfront fee with hidden clause retainers",
      manual: "Risky direct wire transfers with zero ghosting protection",
      sponsorsyncWin: true,
    },
    {
      feature: "Deliverable & Script Approvals",
      sponsorsync: "Structured inline preview studio with timecoded revisions",
      agency: "Slow multi-day email/phone relay between account managers",
      manual: "Disorganized WhatsApp/Telegram voice notes and lost files",
      sponsorsyncWin: true,
    },
    {
      feature: "Turnaround Time to Live",
      sponsorsync: "24 to 48 Hours from brief to signed deal",
      agency: "3 to 5 Weeks of bureaucratic SOW negotiations",
      manual: "2 to 4 Weeks of erratic ping-pong messaging",
      sponsorsyncWin: true,
    },
    {
      feature: "Performance & Conversion Tracking",
      sponsorsync: "Real-time UTM, click attribution & verified view telemetry",
      agency: "Lagging monthly PDFs with vanity metrics",
      manual: "Requesting cropped Instagram story screenshots",
      sponsorsyncWin: true,
    },
    {
      feature: "Pricing Transparency & Fees",
      sponsorsync: "Ultra-lean 5% platform fee with transparent creator rates",
      agency: "35% – 50% hidden agency margin markups",
      manual: "Arbitrary creator pricing with zero standardized benchmarks",
      sponsorsyncWin: true,
    },
  ];

  return (
    <section id="comparison" style={{ padding: "96px 0", background: "var(--bg)" }}>
      <div className="w">
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 48px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--or)",
              backgroundColor: "var(--orb)",
              padding: "5px 14px",
              borderRadius: "99px",
              display: "inline-block",
              marginBottom: "14px",
            }}
          >
            ⚖️ The Modern Advantage
          </span>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 52px)", marginBottom: "16px", letterSpacing: "-0.03em" }}>
            Why leading brands switch to <span className="serif" style={{ fontStyle: "italic", color: "var(--or)" }}>SponsorSync</span>
          </h2>
          <p style={{ color: "var(--mu)", fontSize: "17px", lineHeight: 1.6 }}>
            Eliminate middleman friction, erratic pricing, and payment uncertainty. Experience the creator deal infrastructure built for velocity.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--ln)",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "var(--sh-card)",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                minWidth: "720px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid var(--ln)", backgroundColor: "var(--alt)" }}>
                  <th style={{ padding: "20px 24px", fontSize: "14px", fontWeight: 700, color: "var(--mu)", width: "28%" }}>
                    Capability
                  </th>
                  <th
                    style={{
                      padding: "20px 24px",
                      fontSize: "15px",
                      fontWeight: 800,
                      color: "var(--ink)",
                      backgroundColor: "rgba(255, 92, 0, 0.04)",
                      borderLeft: "2px solid var(--or)",
                      borderRight: "1px solid var(--ln)",
                      width: "32%",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "var(--or)",
                          boxShadow: "0 0 8px var(--or)",
                        }}
                      />
                      <span>SponsorSync Workspace</span>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#fff",
                          backgroundColor: "var(--or)",
                          padding: "2px 7px",
                          borderRadius: "99px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Recommended
                      </span>
                    </div>
                  </th>
                  <th style={{ padding: "20px 24px", fontSize: "14px", fontWeight: 600, color: "var(--mu)", width: "20%" }}>
                    Legacy Talent Agencies
                  </th>
                  <th style={{ padding: "20px 24px", fontSize: "14px", fontWeight: 600, color: "var(--mu)", width: "20%" }}>
                    Manual DMs & Sheets
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: idx === comparisonData.length - 1 ? "none" : "1px solid var(--ln)",
                      transition: "background-color 0.15s ease",
                    }}
                  >
                    {/* Feature Name */}
                    <td style={{ padding: "20px 24px", fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}>
                      {row.feature}
                    </td>

                    {/* SponsorSync Column (Highlighted) */}
                    <td
                      style={{
                        padding: "20px 24px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--ink)",
                        backgroundColor: "rgba(255, 92, 0, 0.025)",
                        borderLeft: "2px solid var(--or)",
                        borderRight: "1px solid var(--ln)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "var(--ok-bg)",
                            color: "var(--ok)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: "1px",
                          }}
                        >
                          <Check size={13} strokeWidth={3} />
                        </div>
                        <span style={{ lineHeight: 1.5 }}>{row.sponsorsync || row.roster}</span>
                      </div>
                    </td>

                    {/* Agency Column */}
                    <td style={{ padding: "20px 24px", fontSize: "13px", color: "var(--mu)", lineHeight: 1.5 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                        <div
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(240, 68, 56, 0.1)",
                            color: "var(--err)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: "2px",
                          }}
                        >
                          <X size={11} strokeWidth={2.5} />
                        </div>
                        <span>{row.agency}</span>
                      </div>
                    </td>

                    {/* Manual DMs Column */}
                    <td style={{ padding: "20px 24px", fontSize: "13px", color: "var(--mu)", lineHeight: 1.5 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                        <div
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(240, 68, 56, 0.1)",
                            color: "var(--err)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: "2px",
                          }}
                        >
                          <X size={11} strokeWidth={2.5} />
                        </div>
                        <span>{row.manual}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Banner */}
          <div
            style={{
              padding: "20px 28px",
              backgroundColor: "var(--alt)",
              borderTop: "1px solid var(--ln)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Shield size={18} color="var(--or)" />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>
                Over 1,200 deals safely executed with 100% dispute resolution guarantee
              </span>
            </div>
            <a
              href="#deals"
              className="btn btn-primary"
              style={{ padding: "9px 20px", fontSize: "13px", borderRadius: "10px" }}
            >
              Start Your First Deal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
