import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ title, subtitle, onClose, children }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        backgroundColor: "rgba(18, 20, 29, 0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="animate-slide-down"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--line-strong)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "480px",
          padding: "24px 28px",
          maxHeight: "88vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(18, 20, 29, 0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "18px",
            borderBottom: "1px solid var(--line)",
            paddingBottom: "14px",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                fontFamily: "var(--font-heading)",
                color: "var(--ink)",
                lineHeight: 1.3,
              }}
            >
              {title}
            </h3>
            {subtitle && (
              <p style={{ fontSize: "12px", color: "var(--slate)", marginTop: "2px" }}>
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              padding: "6px",
              borderRadius: "50%",
              color: "var(--slate)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--paper)",
            }}
            title="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
