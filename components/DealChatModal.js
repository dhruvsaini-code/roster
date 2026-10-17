"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  X,
  Paperclip,
  CheckCheck,
  Sparkles,
  ShieldCheck,
  Video,
  FileCheck,
} from "lucide-react";
import Avatar from "./Avatar";

export default function DealChatModal({ deal, partnerName = "Brand Marketing Lead", onClose, onToast }) {
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "them",
      text: `Hey! Thanks for applying to "${deal?.title || "Brand Campaign"}". We really loved your recent content and authentic engagement.`,
      time: "Yesterday, 3:45 PM",
    },
    {
      id: "msg-2",
      sender: "me",
      text: "Thanks so much! I'm really excited about this brief. I've already mapped out a high-energy hook and transition showcasing the product in my everyday routine.",
      time: "Yesterday, 4:10 PM",
    },
    {
      id: "msg-3",
      type: "system",
      text: "🔒 Milestone Escrow Funded: ₹35,000 locked safely in Roster Escrow",
      time: "Yesterday, 5:30 PM",
    },
    {
      id: "msg-4",
      sender: "them",
      text: "Awesome! The concept looks great. Just ensure the key benefit is mentioned within the first 8 seconds before the cut. Looking forward to the draft link!",
      time: "Today, 11:15 AM",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text,
      time: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage("");

    // Simulate instant counterpart response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: "them",
          text: "Noted with thanks! Our creative team is reviewing this right away. We'll update the milestone status within 2 hours. 👍",
          time: "Just now",
        },
      ]);
      onToast?.("New reply received in Deal Messenger 💬");
    }, 1200);
  };

  const quickChips = [
    "Draft uploaded to Drive! 🎬",
    "Hook revised as requested ✅",
    "Could we extend deadline by 24h? ⏳",
    "Approved! Ready to publish live 🚀",
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(8px)",
        display: "grid",
        placeItems: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          height: "640px",
          backgroundColor: "var(--card)",
          border: "1px solid var(--ln)",
          borderRadius: "24px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.28)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Messenger Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid var(--ln)",
            backgroundColor: "var(--alt)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Avatar name={partnerName} size={40} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                  {partnerName}
                </h3>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--ok)",
                    boxShadow: "0 0 6px var(--ok)",
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--mu)",
                  margin: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "340px",
                }}
              >
                Deal: {deal?.title || "Campaign Discussion"}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--or)",
                backgroundColor: "var(--orb)",
                padding: "4px 10px",
                borderRadius: "99px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <ShieldCheck size={13} />
              <span>Escrow Active</span>
            </span>

            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "var(--mu)",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "8px",
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div
          style={{
            flex: 1,
            padding: "20px 24px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            backgroundColor: "var(--bg)",
          }}
        >
          {messages.map((m) => {
            if (m.type === "system") {
              return (
                <div
                  key={m.id}
                  style={{
                    alignSelf: "center",
                    backgroundColor: "var(--alt)",
                    border: "1px solid var(--ln)",
                    borderRadius: "99px",
                    padding: "6px 16px",
                    fontSize: "12px",
                    color: "var(--mu)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    margin: "8px 0",
                  }}
                >
                  <Sparkles size={12} color="var(--or)" />
                  <span>{m.text}</span>
                </div>
              );
            }

            const isMe = m.sender === "me";

            return (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMe ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  alignSelf: isMe ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    backgroundColor: isMe ? "var(--btn)" : "var(--card)",
                    color: isMe ? "var(--btnt)" : "var(--ink)",
                    border: isMe ? "none" : "1px solid var(--ln)",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  {m.text}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--mu)",
                    marginTop: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>{m.time}</span>
                  {isMe && <CheckCheck size={13} color="var(--or)" />}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div
              style={{
                alignSelf: "flex-start",
                backgroundColor: "var(--card)",
                border: "1px solid var(--ln)",
                borderRadius: "16px",
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--mu)" }}>{partnerName} is typing</span>
              <span
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  backgroundColor: "var(--or)",
                  borderRadius: "50%",
                  animation: "pulse 1s infinite",
                }}
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div
          style={{
            padding: "8px 16px",
            borderTop: "1px solid var(--ln)",
            backgroundColor: "var(--alt)",
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              style={{
                fontSize: "12px",
                fontWeight: 500,
                padding: "5px 12px",
                borderRadius: "99px",
                backgroundColor: "var(--card)",
                border: "1px solid var(--ln)",
                color: "var(--ink)",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{
            padding: "14px 20px",
            borderTop: "1px solid var(--ln)",
            backgroundColor: "var(--card)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            type="button"
            onClick={() => onToast?.("Select draft video or script PDF to attach 📎")}
            style={{
              background: "none",
              border: "none",
              color: "var(--mu)",
              cursor: "pointer",
              padding: "6px",
            }}
            title="Attach file"
          >
            <Paperclip size={18} />
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message, script revision, or draft link..."
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: "12px",
              border: "1px solid var(--ln)",
              backgroundColor: "var(--alt)",
              color: "var(--ink)",
              fontSize: "14px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="b or"
            style={{
              padding: "10px 16px",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              opacity: !inputMessage.trim() ? 0.5 : 1,
            }}
          >
            <span>Send</span>
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
