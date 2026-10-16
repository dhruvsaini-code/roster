export default function WorkflowSection() {
  return (
    <section style={{ background: "var(--alt)" }} id="how-it-works">
      <div className="w">
        <div className="wb-h" style={{ textAlign: "center", marginInline: "auto" }}>
          <h2>Workflows that think ahead</h2>
          <p>Every step hands off automatically to the next, so deals close without friction.</p>
        </div>

        <div className="wb-flow">
          <div className="wb-fl">
            <div className="wb-d">📝</div>
            <h3>1. Brief posted</h3>
            <p>Niche, budget brackets, deliverables, and deadline.</p>
          </div>
          <div className="wb-fl">
            <div className="wb-d">💬</div>
            <h3>2. Creator pitches</h3>
            <p>Tailored creative note and commercial proposed fee.</p>
          </div>
          <div className="wb-fl">
            <div className="wb-d">⭐</div>
            <h3>3. Shortlisted</h3>
            <p>Verified channel stats compared side by side.</p>
          </div>
          <div className="wb-fl">
            <div className="wb-d">🤝</div>
            <h3>4. Hired</h3>
            <p>Creator is booked and notified in real-time.</p>
          </div>
          <div className="wb-fl">
            <div className="wb-d">💸</div>
            <h3>5. Paid</h3>
            <p>Milestone escrow releases upon deliverable delivery.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
