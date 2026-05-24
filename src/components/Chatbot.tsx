"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, MapPin, Calendar, Globe, ChevronDown } from "lucide-react";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  time: string;
}

const DEMO_MESSAGES: Message[] = [
  {
    id: 1,
    role: "bot",
    text: "✨ Welcome to Royal Journeys! I'm your personal travel concierge. How can I craft your perfect getaway today?",
    time: "10:00 AM",
  },
  {
    id: 2,
    role: "user",
    text: "I'm looking for a luxury tour in Rajasthan.",
    time: "10:01 AM",
  },
  {
    id: 3,
    role: "bot",
    text: "Wonderful choice! Rajasthan is pure magic 🏰 — from the golden dunes of Jaisalmer to the majestic forts of Jodhpur. We offer an exclusive 8-night curated palace circuit. Shall I share the itinerary?",
    time: "10:01 AM",
  },
  {
    id: 4,
    role: "user",
    text: "Yes, please! What's included?",
    time: "10:02 AM",
  },
  {
    id: 5,
    role: "bot",
    text: "Our Royal Rajasthan package includes:\n• 5-star heritage palace stays\n• Private guided fort & temple tours\n• Sunset camel safari in Thar Desert\n• Traditional folk dance evenings\n• All transfers in AC luxury vehicles\n\nStarts from ₹1,20,000 per person. Want to book a consultation?",
    time: "10:02 AM",
  },
];

const QUICK_REPLIES = [
  { icon: MapPin,    label: "Top Destinations" },
  { icon: Calendar,  label: "Book a Tour"       },
  { icon: Globe,     label: "International"     },
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

type Breakpoint = "mobile" | "tablet" | "desktop";
function useBreakpoint(): Breakpoint {
  const get = (): Breakpoint => {
    if (typeof window === "undefined") return "desktop";
    if (window.innerWidth < 640)  return "mobile";
    if (window.innerWidth < 1024) return "tablet";
    return "desktop";
  };
  const [bp, setBp] = useState<Breakpoint>(get);
  useEffect(() => {
    const handler = () => setBp(get());
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return bp;
}

function BotFaceIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="20" height="16" rx="5" fill="white" fillOpacity="0.92" />
      <line x1="14" y1="8" x2="14" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="3" r="1.5" fill="#38bdf8" />
      <circle cx="10" cy="15" r="2" fill="#1e40af" />
      <circle cx="18" cy="15" r="2" fill="#1e40af" />
      <circle cx="10.7" cy="14.3" r="0.7" fill="white" />
      <circle cx="18.7" cy="14.3" r="0.7" fill="white" />
      <path d="M10.5 19.5 Q14 22 17.5 19.5" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <rect x="1.5"  y="13" width="3" height="5" rx="1.5" fill="white" fillOpacity="0.7" />
      <rect x="23.5" y="13" width="3" height="5" rx="1.5" fill="white" fillOpacity="0.7" />
    </svg>
  );
}

function ChatHeader({ onClose, bp }: { onClose: () => void; bp: Breakpoint }) {
  return (
    <div
      className="relative flex shrink-0 items-center gap-3 overflow-hidden px-5 py-4"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 65%, #0ea5e9 100%)" }}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
      <div className="pointer-events-none absolute -bottom-6 right-8 h-16 w-16 rounded-full"  style={{ background: "rgba(14,165,233,0.15)" }} />

      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
        <BotFaceIcon size={20} />
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0f172a] bg-emerald-400" />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`font-semibold leading-tight text-white ${bp === "mobile" ? "text-[15px]" : "text-[14px]"}`}>
          Royal Journeys AI
        </p>
        <p className="mt-0.5 text-[11px] text-white/60">Your personal travel concierge</p>
      </div>

      <button
        onClick={onClose}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white active:scale-90"
        aria-label="Close chat"
      >
        <X size={16} />
      </button>
    </div>
  );
}

function MessageList({
  messages,
  typing,
  bottomRef,
  bp,
}: {
  messages: Message[];
  typing: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
  bp: Breakpoint;
}) {
  const textSize = bp === "mobile" ? "text-[14px]" : "text-[13.5px]";

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-slate-50 px-4 pb-3 overscroll-contain">
      {messages.map((msg, idx) => {
        const isBot     = msg.role === "bot";
        const prevRole  = idx > 0 ? messages[idx - 1].role : null;
        const showAvatar = isBot && prevRole !== "bot";

        return (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`flex gap-2.5 ${isBot ? "flex-row" : "flex-row-reverse"}`}
          >
            {isBot && (
              <div className="mt-auto flex h-7 w-7 shrink-0 items-center justify-center">
                {showAvatar && (
                  <div
                    className="h-7 w-7 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0f172a, #0ea5e9)" }}
                  >
                    <Sparkles size={11} className="text-white" />
                  </div>
                )}
              </div>
            )}

            <div className={`flex flex-col gap-1 ${isBot ? "max-w-[78%]" : "max-w-[78%] items-end"}`}>
              <div
                className={`px-4 py-2.5 ${textSize} leading-relaxed whitespace-pre-line`}
                style={
                  isBot
                    ? {
                        background: "#ffffff",
                        color: "#1e293b",
                        borderRadius: showAvatar ? "4px 18px 18px 18px" : "18px",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)",
                      }
                    : {
                        background: "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)",
                        color: "#ffffff",
                        borderRadius: "18px 4px 18px 18px",
                      }
                }
              >
                {msg.text}
              </div>
              <span className="px-1 text-[10px] text-slate-400">{msg.time}</span>
            </div>
          </motion.div>
        );
      })}

      <AnimatePresence>
        {typing && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="flex items-end gap-2.5"
          >
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, #0f172a, #0ea5e9)" }}
            >
              <Sparkles size={11} className="text-white" />
            </div>
            <div
              className="flex items-center gap-1 px-4 py-3"
              style={{
                background: "#fff",
                borderRadius: "4px 18px 18px 18px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-2 w-2 rounded-full bg-slate-300"
                  style={{ animation: `typingBounce 1.2s ${i * 0.2}s infinite ease-in-out` }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={bottomRef} />
    </div>
  );
}

function ChatFooter({
  input,
  setInput,
  onSend,
  inputRef,
  bp,
}: {
  input: string;
  setInput: (v: string) => void;
  onSend: (text: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  bp: Breakpoint;
}) {
  const inputTextSize = bp === "mobile" ? "text-[15px]" : "text-[13.5px]";
  const inputPy       = bp === "mobile" ? "py-3.5"      : "py-2.5";

  return (
    <div className="shrink-0 bg-white">
      <div className="flex gap-2 overflow-x-auto px-4 pb-2.5 pt-2.5 scrollbar-hide">
        {QUICK_REPLIES.map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={() => onSend(label)}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 text-[11.5px] font-medium text-slate-600 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
          >
            <Icon size={12} className="shrink-0" />
            {label}
          </button>
        ))}
      </div>

      <div className="h-px bg-slate-100 mx-4" />

      <div className="flex items-center gap-2 px-4 py-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend(input)}
          placeholder="Ask about tours, packages…"
          className={`flex-1 rounded-xl bg-slate-100 px-4 ${inputPy} ${inputTextSize} text-slate-700 placeholder:text-slate-400 focus:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-200 transition`}
        />
        <motion.button
          onClick={() => onSend(input)}
          disabled={!input.trim()}
          whileHover={{ scale: input.trim() ? 1.05 : 1 }}
          whileTap={{ scale: input.trim() ? 0.93 : 1 }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition disabled:opacity-35"
          style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)" }}
          aria-label="Send"
        >
          <Send size={16} />
        </motion.button>
      </div>

      <div className="flex items-center justify-center gap-1 pb-3">
        <span className="text-[10px] text-slate-400">Powered by</span>
        <span className="text-[10px] font-semibold text-slate-500">Royal Journeys AI</span>
      </div>
    </div>
  );
}

function ChatPanel({
  messages,
  typing,
  input,
  setInput,
  onSend,
  onClose,
  inputRef,
  bottomRef,
  bp,
}: {
  messages: Message[];
  typing: boolean;
  input: string;
  setInput: (v: string) => void;
  onSend: (text: string) => void;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  bp: Breakpoint;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ChatHeader onClose={onClose} bp={bp} />
      <div className="flex shrink-0 items-center gap-3 bg-slate-50 px-5 py-2.5">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Today</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      <MessageList messages={messages} typing={typing} bottomRef={bottomRef} bp={bp} />
      <ChatFooter input={input} setInput={setInput} onSend={onSend} inputRef={inputRef} bp={bp} />
    </div>
  );
}

export default function ChatBot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState<Message[]>(DEMO_MESSAGES);
  const [input,    setInput]    = useState("");
  const [typing,   setTyping]   = useState(false);
  const [unread,   setUnread]   = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const bp = useBreakpoint();

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 180);
    }
  }, [open, messages]);

  useEffect(() => {
    if (bp === "mobile") {
      document.body.style.overflow = open ? "hidden" : "";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open, bp]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", text: text.trim(), time: getTime() },
    ]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text: "Thank you for your query! Our travel experts will get back to you shortly. In the meantime, feel free to browse our featured packages or call us at +91 98765 43210. 🌟",
          time: getTime(),
        },
      ]);
      setTyping(false);
    }, 1400);
  }, []);

  const panelProps = {
    messages, typing, input, setInput,
    onSend: sendMessage,
    onClose: () => setOpen(false),
    inputRef, bottomRef, bp,
  };

  const fabBottom = bp === "mobile" ? "1rem" : "1.5rem";
  const fabRight  = bp === "mobile" ? "1rem" : "1.5rem";
  const fabSize   = bp === "mobile" ? "52px" : "58px";

  return (
    <>
      {bp === "mobile" && (
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[45] bg-black/40"
                onClick={() => setOpen(false)}
              />
              <motion.div
                key="sheet"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 340, damping: 34 }}
                className="fixed inset-x-0 bottom-0 z-[50] flex flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl"
                style={{ height: "90dvh" }}
              >
                {/* Drag handle */}
                <div className="flex shrink-0 justify-center pt-3 pb-1">
                  <div className="h-1 w-10 rounded-full bg-slate-200" />
                </div>
                <ChatPanel {...panelProps} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      {bp === "tablet" && (
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[45] bg-black/30"
                onClick={() => setOpen(false)}
              />
              <motion.div
                key="panel"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0,      opacity: 1 }}
                exit={{ x: "100%",    opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="fixed right-0 top-0 z-[50] flex h-full w-[380px] flex-col overflow-hidden bg-white shadow-2xl"
                style={{
                  borderLeft: "1px solid rgba(15,23,42,0.06)",
                }}
              >
                <ChatPanel {...panelProps} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}
      {bp === "desktop" && (
        <AnimatePresence>
          {open && (
            <motion.div
              key="popup"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{ opacity: 0,    y: 24, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="fixed z-40 flex flex-col overflow-hidden rounded-[24px]"
              style={{
                bottom:    "96px",
                right:     "1.5rem",
                width:     "min(370px, calc(100vw - 3rem))",
                maxHeight: "72vh",
                background: "#ffffff",
                boxShadow:
                  "0 24px 64px rgba(15,23,42,0.18), 0 8px 24px rgba(15,23,42,0.08), 0 0 0 1px rgba(15,23,42,0.06)",
              }}
            >
              <ChatPanel {...panelProps} />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div
        className="fixed z-[55] flex flex-col items-end gap-3"
        style={{ bottom: fabBottom, right: fabRight }}
      >
        {bp !== "mobile" && (
          <AnimatePresence>
            {!open && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1   }}
                exit={{ opacity: 0,    y: 6, scale: 0.92 }}
                transition={{ duration: 0.22 }}
                className="relative flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-lg ring-1 ring-black/6"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[13px] font-medium text-slate-700">Chat with us</span>
                <span className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.06)]" />
              </motion.div>
            )}
          </AnimatePresence>
        )}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Toggle chat"
          className="relative flex items-center justify-center rounded-full shadow-xl"
          style={{
            height: fabSize,
            width:  fabSize,
            background: "linear-gradient(145deg, #0f172a 0%, #1d4ed8 55%, #0ea5e9 100%)",
            boxShadow: "0 8px 32px rgba(14,165,233,0.28), 0 2px 8px rgba(0,0,0,0.18)",
          }}
        >
          <span
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 0 8px rgba(14,165,233,0.10)" }}
          />

          <AnimatePresence>
            {!open && unread > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white"
              >
                {unread}
              </motion.span>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{ rotate: 90,     opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <ChevronDown size={22} className="text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ rotate: 90,  opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{ rotate: -90,    opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <BotFaceIcon size={26} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30%            { transform: translateY(-5px); opacity: 1; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}