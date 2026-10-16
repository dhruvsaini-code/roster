const TESTIMONIALS = [
  {
    quote: "We filled our Diwali launch brief in 48 hours. The verified engagement filter completely eliminated vanity metrics.",
    author: "Priya Nair",
    role: "Growth Lead, Glowly Skincare",
    avatar: "👩‍💼",
  },
  {
    quote: "The ticket deal cards make deliverables and budget crystal clear. No more haggling over WhatsApp DMs.",
    author: "Arjun Mehta",
    role: "Tech YouTuber (890K subs)",
    avatar: "🧑‍💻",
  },
  {
    quote: "Applied, Shortlisted, Hired in a single pipeline replaced 4 chaotic Google Sheets and 3 shared inboxes.",
    author: "Tara Simmons",
    role: "Influencer Marketing Director, Nuvo Audio",
    avatar: "👩‍🚀",
  },
  {
    quote: "Direct YouTube OAuth verification gave our finance team immediate confidence to release milestone payments.",
    author: "Sofia Reyes",
    role: "Brand Partnership Manager, FitFuel",
    avatar: "🧑‍🎤",
  },
];

export default function TestimonialMarquee() {
  return (
    <section style={{ padding: "60px 0" }}>
      <div className="w" style={{ marginBottom: "32px" }}>
        <div className="wb-h">
          <h2>See why teams love Roster</h2>
          <p>Direct feedback from growth leads, brand founders, and full-time creators.</p>
        </div>
      </div>

      <div className="wb-mq">
        <div className="wb-tr">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
            <figure key={idx}>
              <span style={{ fontSize: "15px", lineHeight: 1.55 }}>&ldquo;{t.quote}&rdquo;</span>
              <figcaption>
                <span className="wb-av">{t.avatar}</span>
                <span>
                  <b>{t.author}</b>
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
