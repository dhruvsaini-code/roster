"use client";

import { Moon, Sun } from "lucide-react";
import { NICHES } from "@/lib/seedData";

export default function Navbar({ theme, onToggleTheme, onSelectRole, onSelectNiche }) {
  return (
    <header className="wb-header">
      <div className="wb-nav">
        <a className="wb-logo" href="#">
          <i></i>
          <span>Roster</span>
        </a>

        <nav className="wb-menu" aria-label="Main Navigation">
          <div className="wb-mi">
            <a className="has-arrow" href="#features">Product</a>
            <div className="wb-mm">
              <a href="#app-workspace" onClick={() => onSelectRole?.("brand", "find")}>
                🔎 Creator Discovery
                <small>Filter by niche, city, engagement rate</small>
              </a>
              <a href="#app-workspace" onClick={() => onSelectRole?.("brand", "campaigns")}>
                📝 Campaign Briefs
                <small>Post ticket deals in minutes</small>
              </a>
              <a href="#app-workspace" onClick={() => onSelectRole?.("brand", "campaigns")}>
                🚦 Applicant Pipeline
                <small>Shortlist, hire, or decline with 1-click</small>
              </a>
              <a href="#app-workspace" onClick={() => onSelectRole?.("creator", "profile")}>
                ✅ Verified Stats
                <small>Direct YouTube Data API sync</small>
              </a>
            </div>
          </div>

          <div className="wb-mi">
            <a className="has-arrow" href="#app-workspace">Solutions</a>
            <div className="wb-mm">
              <a href="#app-workspace" onClick={() => onSelectRole?.("brand", "find")}>
                🛍️ D2C Brands
                <small>Scalable creator campaign management</small>
              </a>
              <a href="#app-workspace" onClick={() => onSelectRole?.("brand", "campaigns")}>
                🏢 Agencies
                <small>Multi-client influencer rosters</small>
              </a>
              <a href="#app-workspace" onClick={() => onSelectRole?.("creator", "browse")}>
                🎬 Solo Creators
                <small>Guaranteed budget briefs & pitch tools</small>
              </a>
            </div>
          </div>

          <div className="wb-mi">
            <a className="has-arrow" href="#app-workspace">Niches</a>
            <div className="wb-mm">
              {NICHES.slice(0, 5).map((n) => (
                <a key={n} href="#app-workspace" onClick={() => onSelectNiche?.(n)}>
                  ✨ {n} Creators
                  <small>Vetted high-engagement talents</small>
                </a>
              ))}
            </div>
          </div>

          <div className="wb-mi">
            <a href="#how-it-works">How It Works</a>
          </div>

          <div className="wb-mi">
            <a href="#calculator">ROI Calculator</a>
          </div>

          <div className="wb-mi">
            <a href="#comparison">Why Roster</a>
          </div>

          <div className="wb-mi">
            <a href="#integrations">Integrations</a>
          </div>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              color: "var(--ink)",
              backgroundColor: "var(--alt)",
              border: "1px solid var(--ln)",
            }}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <a className="b hm" href="#app-workspace" style={{ fontSize: "14px", padding: "8px 16px" }}>
            Launch App
          </a>
          <a className="b d" href="#app-workspace" style={{ fontSize: "14px", padding: "8px 18px" }}>
            Start Free Trial
          </a>
        </div>
      </div>
    </header>
  );
}
