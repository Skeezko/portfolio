import {useState} from "react";
import type {FC, ChangeEvent} from "react";
import type {ContactFormData} from "../data/types";

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "#0d0d1a",
  border: "1px solid #333",
  borderRadius: 4,
  color: "#E0E0E0",
  fontSize: 13,
  fontFamily: "'JetBrains Mono', monospace",
  outline: "none",
  boxSizing: "border-box",
};

interface Props {
  onClose: () => void;
}

const ContactForm: FC<Props> = ({ onClose }) => {
  const [form, setForm] = useState<ContactFormData>({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const isValid = form.name && form.email && form.msg;

  const handleChange = (field: keyof ContactFormData) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSend = async () => {
    if (!isValid || sending) return;
    
    setSending(true);
    setError("");
    
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.msg
        }),
      });
      setSent(true);
    } catch (err) {
      setError("Failed to send. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0d0d1a", border: "1px solid #277FFF",
          borderRadius: 8, width: "min(480px, 92vw)",
          boxShadow: "0 0 60px #367BF520",
        }}
      >
        <div
          style={{
            padding: "14px 20px", borderBottom: "1px solid #1a1a2e",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 10, color: "#277FFF", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>
              ┌── contact_form
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#E0E0E0", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>
              Send me a message
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#555", fontSize: 20, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace" }}
          >
            ×
          </button>
        </div>

        {!sent ? (
          <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, color: "#47D147", fontFamily: "'JetBrains Mono', monospace", display: "block", marginBottom: 4 }}>
                $ name
              </label>
              <input value={form.name} onChange={handleChange("name")} placeholder="Your name" style={INPUT_STYLE} />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, color: "#47D147", fontFamily: "'JetBrains Mono', monospace", display: "block", marginBottom: 4 }}>
                $ email
              </label>
              <input value={form.email} onChange={handleChange("email")} placeholder="your@email.com" style={INPUT_STYLE} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, color: "#47D147", fontFamily: "'JetBrains Mono', monospace", display: "block", marginBottom: 4 }}>
                $ message
              </label>
              <textarea
                value={form.msg}
                onChange={handleChange("msg")}
                placeholder="Your message..."
                rows={4}
                style={{ ...INPUT_STYLE, resize: "vertical" } as React.CSSProperties}
              />
            </div>
            {error && (
              <div style={{ color: "#FF5555", fontSize: 12, marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                {error}
              </div>
            )}
            <button
              onClick={handleSend}
              disabled={!isValid}
              style={{
                width: "100%", padding: 10,
                background: isValid ? "#277FFF" : "#1a1a2e",
                color: isValid ? "#FFF" : "#444",
                border: "none", borderRadius: 4, fontSize: 13, fontWeight: 600,
                cursor: isValid ? "pointer" : "not-allowed",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              send_message()
            </button>
          </div>
        ) : (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 10, color: "#47D147" }}>✓</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#47D147", fontFamily: "'JetBrains Mono', monospace" }}>
              Message sent!
            </div>
            <div style={{ fontSize: 12, color: "#888", fontFamily: "'JetBrains Mono', monospace", marginTop: 6 }}>
              Thanks {form.name}, I'll get back to you.
            </div>
            <button
              onClick={onClose}
              style={{
                marginTop: 20, padding: "8px 24px", background: "transparent",
                color: "#277FFF", border: "1px solid #277FFF", borderRadius: 4,
                fontSize: 12, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              close
            </button>
          </div>
        )}

        <div style={{ padding: "8px 20px", borderTop: "1px solid #1a1a2e", fontSize: 10, color: "#333", fontFamily: "'JetBrains Mono', monospace" }}>
          └── chaudhryhesham@gmail.com · github.com/Skeezko
        </div>
      </div>
    </div>
  );
};

export default ContactForm;