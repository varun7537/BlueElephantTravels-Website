"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, MapPin, Calendar, Globe, ChevronDown, Copy, Maximize2 } from "lucide-react";
import { getAIResponse } from "@/lib/chatbot/ai-service";
import { CONFIG } from "@/lib/chatbot/config";

export interface QuickReplyItem {
  icon?: any;
  label: string;
}

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "bot",
    text: "Welcome to Blue Elephant Travels. I am your personal travel assistant. How may I assist you with your journey today?",
    time: getTime(),
  },
];

const INITIAL_QUICK_REPLIES: QuickReplyItem[] = [
  { icon: MapPin, label: "Top Destinations" },
  { icon: Calendar, label: "Book a Consultation" },
  { icon: Globe, label: "Wildlife Safaris" },
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

type Breakpoint = "mobile" | "tablet" | "desktop";
function useBreakpoint(): Breakpoint {
  const get = (): Breakpoint => {
    if (typeof window === "undefined") return "desktop";
    if (window.innerWidth < 640) return "mobile";
    if (window.innerWidth < 1024) return "tablet";
    return "desktop";
  };
  const [bp, setBp] = useState<Breakpoint>("desktop");
  useEffect(() => {
    setBp(get());
    const handler = () => setBp(get());
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return bp;
}

function ChatHeader({ onClose, bp }: { onClose: () => void; bp: Breakpoint }) {
  return (
    <div className="relative overflow-hidden flex shrink-0 items-center justify-between px-6 py-5 rounded-t-2xl sm:rounded-t-3xl bg-gradient-brand">
      {/* Decorative gradient orb */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent/30 rounded-full blur-xl pointer-events-none" />

      <div className="relative flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md shadow-inner border border-white/30">
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <p className={`font-heading font-bold text-white tracking-wide ${bp === "mobile" ? "text-[15px]" : "text-lg"}`}>

            Blue Elephants
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <p className="text-[11px] text-white/80 font-body uppercase tracking-wider">Online</p>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="relative flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-all duration-200"
        aria-label="Close chat"
      >
        <X size={18} />
      </button>
    </div>
  );
}

function RichMessageContent({ text, onSend }: { text: string; onSend: (text: string) => void }) {
  let cleanText = text;
  let inlineButtons: string[] = [];
  let showCalendar = false;

  const btnRegex = /\[BUTTON:([^\]]+)\]/g;
  let btnMatch;
  while ((btnMatch = btnRegex.exec(cleanText)) !== null) {
    inlineButtons.push(btnMatch[1]);
  }
  cleanText = cleanText.replace(btnRegex, "");

  if (cleanText.includes("[SHOW_CALENDAR]")) {
    showCalendar = true;
    cleanText = cleanText.replace(/\[SHOW_CALENDAR\]/g, "");
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanText.trim());
  };

  const formatMarkdown = (text: string) => {
    let formatted = text.trim();
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-primary underline hover:text-primary-light">$1</a>');
    formatted = formatted.replace(/\n/g, '<br/>');
    return formatted;
  };

  return (
    <div className="flex flex-col gap-3 font-body text-[14px] leading-relaxed">
      <div className="relative group">
        <div dangerouslySetInnerHTML={{ __html: formatMarkdown(cleanText) }} className="break-words" />
        <button
          onClick={handleCopy}
          className="absolute -top-3 -right-3 p-1.5 bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          title="Copy message"
        >
          <Copy size={12} className="text-slate-600 hover:text-primary" />
        </button>
      </div>

      {inlineButtons.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-2">
          {inlineButtons.map((btnLabel, idx) => (
            <button
              key={idx}
              onClick={() => onSend(btnLabel)}
              className="px-4 py-1.5 text-[12px] font-semibold text-primary bg-primary/5 hover:bg-primary hover:text-white rounded-full transition-colors border border-primary/20 shadow-sm"
            >
              {btnLabel}
            </button>
          ))}
        </div>
      )}

      {showCalendar && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 rounded-2xl overflow-hidden border border-border bg-white shadow-card"
        >
          <div className="bg-slate-50 border-b border-border px-4 py-2 flex items-center gap-2">
            <Calendar size={14} className="text-primary" />
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest">Schedule Consultation</span>
          </div>
          <iframe
            src={`https://cal.com/${CONFIG.CALCOM_USERNAME}`}
            width="100%"
            height="380"
            frameBorder="0"
            title="Book Consultation"
            className="bg-white"
          />
        </motion.div>
      )}
    </div>
  );
}

function MessageList({
  messages,
  typing,
  onSend,
  bottomRef,
}: {
  messages: Message[];
  typing: boolean;
  onSend: (text: string) => void;
  bottomRef: React.RefObject<HTMLDivElement>;
}) {
  const lastBotMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typing) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [typing, bottomRef]);

  useEffect(() => {
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role === "user") {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } else if (lastMsg.role === "bot") {
      setTimeout(() => {
        lastBotMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }, [messages, bottomRef]);

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-6 relative [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)" }}>
      {messages.map((msg, idx) => {
        const isBot = msg.role === "bot";

        return (
          <motion.div
            layout
            key={msg.id}
            ref={idx === messages.length - 1 && isBot ? lastBotMessageRef : null}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col gap-1.5 max-w-[88%] ${isBot ? "items-start" : "items-end"}`}
          >
            <div className="flex items-end gap-2">
              {isBot && (
                <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-gradient-brand shadow-sm mb-0.5">
                  <Sparkles size={12} className="text-white" />
                </div>
              )}
              <div
                className={`px-5 py-3.5 rounded-3xl shadow-sm ${isBot
                  ? "bg-white border border-slate-100 text-slate-700 rounded-bl-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
                  : "bg-gradient-brand text-white rounded-br-sm shadow-[0_8px_24px_-8px_rgba(15,82,186,0.3)]"
                  }`}
              >
                {isBot ? <RichMessageContent text={msg.text} onSend={onSend} /> : <div className="font-body text-sm whitespace-pre-line">{msg.text}</div>}
              </div>
            </div>
            <span className={`text-[10px] text-slate-400 font-medium px-2 ${isBot ? "ml-9" : ""}`}>{msg.time}</span>
          </motion.div>
        );
      })}

      <AnimatePresence>
        {typing && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="flex flex-col gap-1.5 items-start max-w-[88%]"
          >
            <div className="flex items-end gap-2">
              <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-gradient-brand shadow-sm mb-0.5">
                <Sparkles size={12} className="text-white" />
              </div>
              <div className="px-5 py-4 bg-white border border-slate-100 rounded-3xl rounded-bl-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-1.5 h-10">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-slate-400"
                    style={{ animation: `typingBounce 1.4s ${i * 0.15}s infinite ease-in-out` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={bottomRef} className="h-4" />
    </div>
  );
}

function ChatFooter({
  input,
  setInput,
  onSend,
  inputRef,
  quickReplies,
}: {
  input: string;
  setInput: (v: string) => void;
  onSend: (text: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  quickReplies: QuickReplyItem[];
}) {
  return (
    <div className="shrink-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-5 py-4 flex flex-col gap-3 relative z-10">
      <AnimatePresence>
        {quickReplies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
          >
            {quickReplies.map(({ icon: Icon, label }, i) => (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={label}
                onClick={() => onSend(label)}
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white/50 px-4 py-1.5 text-[11px] uppercase tracking-wider font-semibold text-slate-600 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200 shadow-sm"
              >
                {Icon && <Icon size={12} className="shrink-0 text-primary/70" />}
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-3xl p-1.5 focus-within:bg-white focus-within:border-primary/40 focus-within:shadow-[0_0_0_4px_rgba(15,82,186,0.1)] transition-all duration-300">
        <textarea
          ref={inputRef}
          rows={1}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend(input);
              e.currentTarget.style.height = 'auto';
            }
          }}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent px-4 py-2.5 text-sm font-body text-slate-700 placeholder:text-slate-400 focus:outline-none resize-none max-h-[120px] scrollbar-hide"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSend(input)}
          disabled={!input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send"
        >
          <Send size={15} className="ml-0.5" />
        </motion.button>
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
  quickReplies,
}: {
  messages: Message[];
  typing: boolean;
  input: string;
  setInput: (v: string) => void;
  onSend: (text: string) => void;
  onClose: () => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  bp: Breakpoint;
  quickReplies: QuickReplyItem[];
}) {
  return (
    <div className="flex h-full flex-col bg-white">
      <ChatHeader onClose={onClose} bp={bp} />
      <MessageList messages={messages} typing={typing} onSend={onSend} bottomRef={bottomRef} />
      <ChatFooter input={input} setInput={setInput} onSend={onSend} inputRef={inputRef} quickReplies={quickReplies} />
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [quickReplies, setQuickReplies] = useState<QuickReplyItem[]>(INITIAL_QUICK_REPLIES);

  const chatHistoryRef = useRef<any[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bp = useBreakpoint();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "auto" });
        inputRef.current?.focus();
      }, 150);
    }
  }, [open]);

  useEffect(() => {
    if (bp === "mobile") {
      document.body.style.overflow = open ? "hidden" : "";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open, bp]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim(), time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setQuickReplies([]);
    setTyping(true);

    try {
      const result = await getAIResponse(text.trim(), chatHistoryRef.current);

      const botMsg: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: result.response,
        time: getTime(),
      };

      setMessages((prev) => [...prev, botMsg]);

      if (result.quickReplies && result.quickReplies.length > 0) {
        setQuickReplies(result.quickReplies.map((label: string) => ({ label })));
      }
    } catch (error: any) {
      console.error("AI Response Error:", error);
      const isTimeout = error.message?.includes('timed out');

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text: isTimeout
            ? "I'm sorry, that request took too long. Could you please try asking again?"
            : "I'm having trouble connecting right now. Please try again later or contact our team directly.",
          time: getTime(),
        },
      ]);
    } finally {
      setTyping(false);
    }
  }, []);

  const panelProps = {
    messages, typing, input, setInput,
    onSend: sendMessage,
    onClose: () => setOpen(false),
    inputRef, bottomRef, bp, quickReplies
  };

  const fabBottom = bp === "mobile" ? "1.5rem" : "2rem";
  const fabRight = bp === "mobile" ? "1.5rem" : "2rem";
  const fabSize = bp === "mobile" ? "56px" : "64px";

  if (!mounted) return null;

  return createPortal(
    <>
      {bp === "mobile" && (
        <>
          <AnimatePresence>
            {open && (
              <motion.div
                key="scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9998] bg-slate-900/40 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {open && (
              <motion.div
                key="sheet"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 350, damping: 35, bounce: 0 }}
                className="fixed inset-x-0 bottom-0 z-[9999] flex flex-col overflow-hidden rounded-t-3xl shadow-lift"
                style={{ height: "92dvh", background: "white" }}
              >
                <div className="flex shrink-0 justify-center pt-4 pb-2 absolute top-0 w-full z-10 pointer-events-none">
                  <div className="h-1.5 w-12 rounded-full bg-white/40 shadow-sm backdrop-blur-sm" />
                </div>
                <ChatPanel {...panelProps} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {bp !== "mobile" && (
        <AnimatePresence>
          {open && (
            <motion.div
              key="popup"
              initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed z-[9999] flex flex-col overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/5"
              style={{
                bottom: "100px",
                right: "2.5rem",
                width: "420px",
                height: "680px",
                maxHeight: "calc(100vh - 140px)",
                background: "white",
              }}
            >
              <ChatPanel {...panelProps} />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div
        className="fixed z-[10000] flex flex-col items-end gap-4"
        style={{ bottom: fabBottom, right: fabRight }}
      >
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ delay: 0.2 }}
              className="relative flex items-center gap-2 rounded-2xl bg-white px-5 py-3 shadow-card ring-1 ring-slate-100 cursor-pointer hover:shadow-lift transition-shadow"
              onClick={() => setOpen(true)}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-[13px] font-semibold text-slate-700 tracking-wide font-heading">Plan Your Trip</span>
              <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-white border-b border-r border-slate-100" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle chat"
          className="relative flex items-center justify-center rounded-full bg-gradient-brand text-white shadow-lift transition-shadow hover:shadow-[0_20px_40px_-10px_rgba(15,82,186,0.5)] z-20 group"
          style={{ height: fabSize, width: fabSize }}
        >
          {/* Subtle pulse ring behind button */}
          {!open && (
            <span className="absolute inset-0 rounded-full animate-ping bg-primary/30 z-[-1]" style={{ animationDuration: '3s' }} />
          )}
          <div className="absolute inset-0 rounded-full bg-white/20 blur-sm opacity-0 hover:opacity-100 transition-opacity" />

          <AnimatePresence>
            {!open && unread > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[11px] font-bold text-white ring-2 ring-white shadow-sm"
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
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={28} />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles size={26} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <style>{`
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>,
    document.body
  );
}