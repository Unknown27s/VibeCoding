"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Loader2 } from "lucide-react";
import { askGroqAI } from "@/lib/groq";

const quickActions = [
  "🎯 Recommend clubs for me",
  "📅 What events are this week?",
  "🏆 How do I earn more points?",
  "💡 Tips for starting a new club",
];

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! I'm **AstroBot** 🚀 — your AI assistant for AstroClub. Ask me about clubs, events, or anything campus-related!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const context = `User is a student named Harish Kumar. They've joined 4 clubs, attended 12 events, have 340 points, and are on a 7-day streak. Their interests include Technology, Design, and Business.`;
      const reply = await askGroqAI(userMsg, context);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
        style={{
          background: "var(--gradient-1)",
          boxShadow: "0 8px 32px rgba(108, 99, 255, 0.4)",
          zIndex: 9998,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={22} className="text-white" /> : <Bot size={22} className="text-white" />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 w-[360px] sm:w-[400px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              zIndex: 9998,
              maxHeight: "520px",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ background: "var(--gradient-1)" }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3
                  className="text-sm font-bold text-white"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  AstroBot AI
                </h3>
                <p className="text-[11px] text-white/70">Powered by Groq • llama-3.3</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Sparkles size={14} className="text-white/60" />
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
              style={{ minHeight: 280, maxHeight: 340 }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={{
                      background:
                        msg.role === "user" ? "var(--gradient-1)" : "var(--bg-card)",
                      color: msg.role === "user" ? "white" : "var(--text-primary)",
                      border:
                        msg.role === "user"
                          ? "none"
                          : "1px solid var(--border-color)",
                      borderTopRightRadius: msg.role === "user" ? "4px" : "16px",
                      borderTopLeftRadius: msg.role === "user" ? "16px" : "4px",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 rounded-2xl flex items-center gap-2"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      borderTopLeftRadius: "4px",
                    }}
                  >
                    <Loader2 size={14} className="animate-spin" style={{ color: "var(--accent-1)" }} />
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      Thinking...
                    </span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickActions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-[11px] px-3 py-1.5 rounded-full cursor-pointer transition-all hover:opacity-80"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="px-4 py-3 border-t"
              style={{ borderColor: "var(--border-color)" }}
            >
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask AstroBot anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  className="glass-input flex-1 py-2.5 text-sm"
                  id="ai-chat-input"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="btn-primary py-2.5 px-3.5"
                  style={{ opacity: loading || !input.trim() ? 0.5 : 1 }}
                  id="ai-chat-send"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
