export default function Avatar({ name, size = 40, className = "" }) {
  const cleanName = name || "User";
  const initials = cleanName
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Procedural deterministic pastel hue
  const hue = (cleanName.charCodeAt(0) * 43 + (cleanName.charCodeAt(cleanName.length - 1) || 0) * 17) % 360;

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        flexShrink: 0,
        backgroundColor: `hsl(${hue}, 55%, 91%)`,
        color: `hsl(${hue}, 65%, 26%)`,
        border: `1.5px solid hsl(${hue}, 45%, 82%)`,
        fontSize: Math.max(12, Math.round(size * 0.36)),
        fontFamily: "var(--font-heading)",
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
}
