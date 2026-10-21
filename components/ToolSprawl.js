"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

const SPRAWL_ITEMS = [
  { raw: "📸 Instagram DMs", count: "99+", solved: "Direct Deal Messenger" },
  { raw: "📊 Google Sheets", count: null, solved: "Live Kanban Pipeline" },
  { raw: "💬 WhatsApp", count: "47", solved: "Timecoded Revisions" },
  { raw: "✉️ Gmail", count: "999+", solved: "Verified SOW Briefs" },
  { raw: "📒 Notion", count: null, solved: "Synced Media Kits" },
  { raw: "🧾 UPI Screenshots", count: null, solved: "Milestone Escrow" },
];

export default function ToolSprawl() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="wb-sp2" id="next">
      <div className="w">
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--or)",
              backgroundColor: "var(--orb)",
              padding: "4px 12px",
              borderRadius: "99px",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Sparkles size={11} />
            <span>Consolidate Your Creator Stack</span>
          </span>
        </div>

        <h2>Too many tools, too little progress</h2>

        <div className="wb-chips">
          {SPRAWL_ITEMS.map((item, idx) => (
            <span
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                cursor: "pointer",
                transition: "all 0.15s ease",
                transform: hoveredIdx === idx ? "translateY(-2px)" : "none",
                borderColor: hoveredIdx === idx ? "var(--or)" : undefined,
              }}
              title={`Replaced by SponsorSync ${item.solved}`}
            >
              {hoveredIdx === idx ? (
                <strong style={{ color: "var(--or)", fontWeight: 600 }}>→ {item.solved}</strong>
              ) : (
                <>
                  {item.raw} {item.count && <em>{item.count}</em>}
                </>
              )}
            </span>
          ))}
        </div>

        <p>
          Brand deals live scattered across DMs, spreadsheets, and lost inboxes. Teams lose hours chasing replies, verifying screenshots, and haggling rates. SponsorSync keeps every brief, pitch, and hire in one coherent place.
        </p>
        <p className="big">What if deal-making was seamless?</p>
      </div>
    </section>
  );
}
