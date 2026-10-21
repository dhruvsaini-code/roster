const WORKFLOW_STEPS = [
  {
    step: "01",
    emoji: "📝",
    title: "1. Brief posted",
    desc: "Niche, budget brackets, deliverables, and deadline.",
    eta: "~5 mins",
  },
  {
    step: "02",
    emoji: "💬",
    title: "2. Creator pitches",
    desc: "Tailored creative note and commercial proposed fee.",
    eta: "~2-4 hrs",
  },
  {
    step: "03",
    emoji: "⭐",
    title: "3. Shortlisted",
    desc: "Verified channel stats compared side by side.",
    eta: "~12 hrs",
  },
  {
    step: "04",
    emoji: "🤝",
    title: "4. Hired",
    desc: "Creator is booked and notified in real-time.",
    eta: "Instant",
  },
  {
    step: "05",
    emoji: "💸",
    title: "5. Paid",
    desc: "Milestone escrow releases upon deliverable delivery.",
    eta: "Auto-escrow",
  },
];

export default function WorkflowSection() {
  return (
    <section style={{ background: "var(--alt)" }} id="how-it-works">
      <div className="w">
        <div className="wb-h" style={{ textAlign: "center", marginInline: "auto" }}>
          <h2>Workflows that think ahead</h2>
          <p>Every step hands off automatically to the next, so deals close without friction.</p>
        </div>

        <div className="wb-flow">
          {WORKFLOW_STEPS.map((s) => (
            <div
              key={s.step}
              className="wb-fl"
              style={{
                position: "relative",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <div className="wb-d">{s.emoji}</div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    color: "var(--or)",
                    backgroundColor: "var(--orb)",
                    padding: "2px 8px",
                    borderRadius: "99px",
                  }}
                >
                  {s.eta}
                </span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
