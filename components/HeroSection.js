"use client";

import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

const HERO_WORDS = [
  { emoji: "📝", text: "Briefs." },
  { emoji: "💬", text: "Pitches." },
  { emoji: "🤝", text: "Hires." },
  { emoji: "🎟️", text: "Deals." },
  { emoji: "💸", text: "Payouts." },
];

export default function HeroSection() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotating(true);
      setTimeout(() => {
        setHeroIndex((prev) => (prev + 1) % HERO_WORDS.length);
        setIsRotating(false);
      }, 250);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="wb-hero" style={{ position: "relative" }}>
      {/* Ambient Backdrop Glow */}
      <div className="ambient-glow" />

      <div className="w" style={{ position: "relative", zIndex: 1 }}>
        {/* Announcement Banner Pill */}
        <a href="#app-workspace" className="announcement-pill">
          <span className="announcement-badge">New</span>
          <span>Roster 2.0: Automated Pitch Pipelines & YouTube API Sync</span>
          <ArrowRight size={13} color="var(--or)" />
        </a>

        <h1>
          Built for{" "}
          <span className="wb-em">
            {HERO_WORDS[heroIndex].emoji}
          </span>{" "}
          <span className={`wb-rot ${isRotating ? "o" : ""}`}>
            {HERO_WORDS[heroIndex].text}
          </span>
          <br />
          Powered by Creators.
        </h1>

        <p>
          Bring brands, creators, and commercial deals together in one intelligent operating system designed for faster collaborations.
        </p>

        <div className="wb-cta">
          <a className="b d" href="#app-workspace">
            <span>Explore Live Deal Board</span>
            <ArrowRight size={15} />
          </a>
          <a className="b" href="#calculator">
            <span>Calculate Campaign ROI</span>
          </a>
        </div>

        {/* Stacked Dashboards Mockup */}
        <div className="wb-stack">
          {/* Top Layer */}
          <div className="wb-ly wb-l1">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="mac-dots">
                <span className="mac-dot mac-red" />
                <span className="mac-dot mac-yellow" />
                <span className="mac-dot mac-green" />
              </div>
              <span style={{ marginLeft: "4px" }}>Creators Directory</span>
            </div>
            <small>Find and compare 2,400+ verified creators</small>
          </div>

          {/* Middle Layer */}
          <div className="wb-ly wb-l2">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--ok)", boxShadow: "0 0 8px var(--ok)" }} />
              <span>Good morning, Nuvo Audio</span>
            </div>
            <small>Current streak: 12 successful creator hires</small>
          </div>

          {/* Main Showcase Frame */}
          <div className="wb-fr">
            {/* Left Sidebar */}
            <div className="wb-sd">
              <div className="wb-logo" style={{ fontSize: "18px", paddingBottom: "16px" }}>
                <i></i>
                <span>Roster</span>
              </div>

              <div className="wb-ws">
                <span className="a">🎧</span>
                <span>
                  <b>Nuvo Audio</b>
                  <small>Brand Workspace</small>
                </span>
              </div>

              <h6>Outcome</h6>
              <p>▦ Overview</p>
              <p>👁 Discover</p>

              <h6>Track</h6>
              <p className="on">📝 Briefs</p>
              <p>💬 Applicants</p>
              <p>🤝 Hired</p>
              <p>💸 Payments</p>
            </div>

            {/* Main Pane */}
            <div className="wb-mn">
              <div className="wb-tp">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>Briefs</span>
                  <span style={{ fontSize: "11px", backgroundColor: "var(--ok-bg)", color: "var(--ok)", padding: "2px 8px", borderRadius: "99px", fontWeight: 600 }}>
                    ● Live Pipeline
                  </span>
                </div>
                <span>👩‍🎤 🧑‍💻 👩‍💼 &nbsp; Active Campaigns</span>
              </div>

              <div className="wb-ban">
                <div>
                  <h3>Deal tracking. Creator insights.</h3>
                  <p>
                    See how many creators apply to each brief, compare rates against real reach, and grow your hire rate.
                  </p>
                </div>
                <a href="#app-workspace" className="b">
                  View campaigns
                </a>
              </div>

              <div className="wb-k">
                <div>
                  Total briefs
                  <b>14</b>
                  <i>↑ 4% vs last month</i>
                </div>
                <div>
                  Applicants
                  <b>248</b>
                  <i>↑ 12% increase</i>
                </div>
                <div>
                  Shortlisted
                  <b>31</b>
                  <i>High match rate</i>
                </div>
                <div>
                  Hire rate
                  <b>36%</b>
                  <i>↑ 8% velocity</i>
                </div>
              </div>

              <div className="wb-fl2">
                <span>
                  <em style={{ background: "#2b6cf0" }}>12</em>
                  All niches ⌄
                </span>
                <span>
                  <em style={{ background: "var(--or)" }}>06</em>
                  Tech ⌄
                </span>
                <span>
                  <em style={{ background: "var(--ok)" }}>09</em>
                  Delhi NCR ⌄
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
