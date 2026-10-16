import { useEffect } from "react";
import { CheckCircle2, Info, X } from "lucide-react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3800);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className="animate-slide-down"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 200,
        backgroundColor: "var(--btn)",
        color: "var(--btnt)",
        padding: "12px 18px",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 14px 28px rgba(0, 0, 0, 0.28)",
        fontSize: "13px",
        fontWeight: 500,
        maxWidth: "90vw",
        border: "1px solid var(--ln)",
      }}
    >
      {isSuccess ? (
        <CheckCircle2 size={16} color="var(--ok)" />
      ) : (
        <Info size={16} color="var(--or)" />
      )}
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          marginLeft: "8px",
          color: "var(--mu)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
