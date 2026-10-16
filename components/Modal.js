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
        zIndex: 120,
        backgroundColor: "rgba(10, 10, 14, 0.65)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
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
          border: "1px solid var(--ln)",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "480px",
          padding: "26px 28px",
          maxHeight: "88vh",
          overflowY: "auto",
          boxShadow: "var(--sh)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "18px",
            borderBottom: "1px solid var(--ln)",
            paddingBottom: "14px",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 700,
                fontFamily: "var(--font-heading)",
                color: "var(--ink)",
                lineHeight: 1.25,
              }}
            >
              {title}
            </h3>
            {subtitle && (
              <p style={{ fontSize: "13px", color: "var(--mu)", marginTop: "4px" }}>
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              padding: "6px",
              borderRadius: "50%",
              color: "var(--mu)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--alt)",
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
