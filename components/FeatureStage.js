"use client";

import { useState } from "react";

export default function FeatureStage() {
  const [activeStageTab, setActiveStageTab] = useState(0);

  return (
    <section id="features">
      <div className="w">
        <div className="wb-h">
          <h2>Everything connected. Everyone aligned.</h2>
          <p>
            More briefs filled, faster hires, and clearer commercial deals. Pick a step below to inspect how it works.
          </p>
        </div>

        <div className="wb-fs">
          {/* Interactive Feature Selectors */}
          <div className="wb-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={activeStageTab === 0}
              onClick={() => setActiveStageTab(0)}
            >
              <span className="e">🔎</span>
              <b>Discover creators</b>
              <span className="t">
                Filter by niche, city, follower tier, and real engagement rate without vanity numbers.
              </span>
            </button>

            <button
              role="tab"
              aria-selected={activeStageTab === 1}
              onClick={() => setActiveStageTab(1)}
            >
              <span className="e">📝</span>
              <b>Publish a brief</b>
              <span className="t">
                Set budget brackets, deliverables, and a countdown. Creators see an unambiguous ticket deal card.
              </span>
            </button>

            <button
              role="tab"
              aria-selected={activeStageTab === 2}
              onClick={() => setActiveStageTab(2)}
            >
              <span className="e">💬</span>
              <b>Review pitches</b>
              <span className="t">
                Compare commercial rates, verified stats, and tailored notes from every applicant in one unified list.
              </span>
            </button>

            <button
              role="tab"
              aria-selected={activeStageTab === 3}
              onClick={() => setActiveStageTab(3)}
            >
              <span className="e">🚦</span>
              <b>Move the pipeline</b>
              <span className="t">
                Shortlist, hire, or decline in one click. Creators get notified of their status in real-time.
              </span>
            </button>

            <button
              role="tab"
              aria-selected={activeStageTab === 4}
              onClick={() => setActiveStageTab(4)}
            >
              <span className="e">✅</span>
              <b>Verified channels</b>
              <span className="t">
                Google OAuth directly queries YouTube Data API for actual subscribers and video metrics.
              </span>
            </button>
          </div>

          {/* Dynamic Stage Preview */}
          <div className="wb-stage">
            {activeStageTab === 0 && (
              <div className="wb-pn">
                <div className="wb-pf">
                  <span className="on">Fashion</span>
                  <span>Tech</span>
                  <span>Beauty</span>
                  <span>Delhi</span>
                  <span>100K+</span>
                </div>
                <div className="wb-rw">
                  <span className="wb-av">👩‍🎤</span>
                  <span className="wb-n">
                    <b>Aanya Kapoor</b>
                    <small>Delhi · Instagram · 245K</small>
                  </span>
                  <span className="wb-st g">4.8% Eng</span>
                </div>
                <div className="wb-rw">
                  <span className="wb-av">🧑‍💻</span>
                  <span className="wb-n">
                    <b>Kunal Mehta</b>
                    <small>Pune · YouTube · 890K</small>
                  </span>
                  <span className="wb-st">3.9% Eng</span>
                </div>
                <div className="wb-rw">
                  <span className="wb-av">🏋️</span>
                  <span className="wb-n">
                    <b>Rohan Verma</b>
                    <small>Mumbai · YouTube · 512K</small>
                  </span>
                  <span className="wb-st g">6.1% Eng</span>
                </div>
              </div>
            )}

            {activeStageTab === 1 && (
              <div className="wb-pn">
                <div className="wb-tk">
                  <div className="wb-m">
                    <span className="wb-tg">Fashion</span>
                    <h4>Festive Capsule Wardrobe Edit</h4>
                    <small>2 Curated Guides · StyleLoop</small>
                  </div>
                  <div className="wb-s">
                    <small>10 days left</small>
                    <b>₹20K–35K</b>
                  </div>
                </div>

                <div className="wb-tk">
                  <div className="wb-m">
                    <span className="wb-tg">Beauty</span>
                    <h4>Monsoon Dew Launch Campaign</h4>
                    <small>1 Reel + 2 Stories · Glowly</small>
                  </div>
                  <div className="wb-s">
                    <small>12 days left</small>
                    <b>₹40K–60K</b>
                  </div>
                </div>
              </div>
            )}

            {activeStageTab === 2 && (
              <div className="wb-pn">
                <div className="wb-rw">
                  <span className="wb-av">👩‍🎤</span>
                  <span className="wb-n">
                    <b>Aanya Kapoor</b>
                    <small>Proposed ₹30,000 · &ldquo;3 evening styling concepts&rdquo;</small>
                  </span>
                  <span className="wb-st">Applied</span>
                </div>
                <div className="wb-rw">
                  <span className="wb-av">✨</span>
                  <span className="wb-n">
                    <b>Devika Rao</b>
                    <small>Proposed ₹45,000 · &ldquo;UV test comparison series&rdquo;</small>
                  </span>
                  <span className="wb-st a">Shortlisted</span>
                </div>
                <div className="wb-rw">
                  <span className="wb-av">🏋️</span>
                  <span className="wb-n">
                    <b>Rohan Verma</b>
                    <small>Proposed ₹60,000 · &ldquo;60-day shred challenge&rdquo;</small>
                  </span>
                  <span className="wb-st g">Hired</span>
                </div>
              </div>
            )}

            {activeStageTab === 3 && (
              <div className="wb-pn">
                <div className="wb-pf">
                  <span>Applied 12</span>
                  <span className="on">Shortlisted 5</span>
                  <span>Hired 3</span>
                  <span>Declined 4</span>
                </div>
                <div className="wb-br2">
                  <i style={{ width: "72%" }}></i>
                </div>
                <small style={{ color: "var(--mu)", fontSize: "13px" }}>
                  7 of 10 campaign influencer slots confirmed
                </small>
              </div>
            )}

            {activeStageTab === 4 && (
              <div className="wb-pn">
                <div className="wb-rw">
                  <span className="wb-av">▶️</span>
                  <span className="wb-n">
                    <b>YouTube Channel Connected</b>
                    <small>Google OAuth v3 API · 512K Subscribers</small>
                  </span>
                  <span className="wb-st g">Verified</span>
                </div>
                <div className="wb-br2">
                  <i style={{ width: "61%" }}></i>
                </div>
                <small style={{ color: "var(--mu)", fontSize: "13px" }}>
                  Calculated engagement rate: 6.1% from last 5 video uploads
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
