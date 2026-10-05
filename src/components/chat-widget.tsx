"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { chatCopy } from "@/lib/agents";

type View = "home" | "messages" | "help" | "chat";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

const HELP = [
  {
    title: "Which condos can I book?",
    body: "Two, three, and four-bedroom beachfront condos, each with a patio or balcony toward the grounds, pool, and gulf.",
  },
  {
    title: "Where is Sunchase?",
    body: "1010 Padre Blvd, South Padre Island, Texas. The gated complex is in the middle of the island, a short walk from restaurants and shops.",
  },
  {
    title: "Are pets allowed?",
    body: "Yes. Sunchase has pet-friendly rooms. Mention your pet when you inquire.",
  },
  {
    title: "How do I reach the staff?",
    body: "Call 956-761-1660, or leave your number with the voice assistant on this page.",
  },
];

const ACCENT = "#0e5c68";
const HEADER = "#14344c";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("home");
  const [draft, setDraft] = useState("");
  const [helpOpen, setHelpOpen] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: chatCopy.welcome,
    },
  ]);
  const [sending, setSending] = useState(false);
  const conversationId = useRef<string | undefined>(undefined);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [messages, view]);

  function startChat() {
    setView("chat");
  }

  async function send(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
    };
    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setView("chat");
    setSending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationId: conversationId.current,
        }),
      });
      const body = (await response.json()) as {
        reply?: string;
        conversationId?: string;
        error?: string;
      };
      if (body.conversationId) conversationId.current = body.conversationId;
      setMessages((current) => [
        ...current,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text:
            body.reply ||
            body.error ||
            "I could not reply just now. Call 956-761-1660 and the desk can help.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: "I could not reach the assistant. Call 956-761-1660 and the desk can help.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  const latest = [...messages].reverse().find((message) => message.role === "user");

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-3">
      {open ? (
        <section
          role="dialog"
          aria-label={`${chatCopy.name} chat`}
          className="flex h-[min(640px,70dvh)] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
        >
          {view === "home" ? (
            <HomeView
              latest={latest?.text}
              onStart={startChat}
              onOpenRecent={startChat}
              onHelp={() => setView("help")}
            />
          ) : null}
          {view === "messages" ? (
            <MessagesView
              latest={latest?.text}
              onOpen={startChat}
              onNew={startChat}
            />
          ) : null}
          {view === "help" ? (
            <HelpView openId={helpOpen} onToggle={setHelpOpen} />
          ) : null}
          {view === "chat" ? (
            <ChatView
              messages={messages}
              draft={draft}
              sending={sending}
              threadRef={threadRef}
              onDraft={setDraft}
              onSend={send}
              onBack={() => setView("home")}
            />
          ) : null}
          {view !== "chat" ? (
            <nav className="flex shrink-0 border-t border-neutral-100 bg-white px-2 py-1.5">
              {(
                [
                  ["home", "Home"],
                  ["messages", "Messages"],
                  ["help", "Help"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setView(id)}
                  className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium ${
                    view === id ? "text-neutral-900" : "text-neutral-500"
                  }`}
                >
                  <span style={{ color: view === id ? ACCENT : undefined }}>
                    {label === "Home" ? "⌂" : label === "Messages" ? "✎" : "?"}
                  </span>
                  {label}
                </button>
              ))}
            </nav>
          ) : null}
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat with Sunchase"}
        className="relative grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
        style={{
          background: `linear-gradient(145deg, ${ACCENT} 0%, #0a4550 55%, #072f36 100%)`,
        }}
      >
        {open ? <ChevronDown /> : <MessageIcon />}
        {open ? null : (
          <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#072f36]" />
        )}
      </button>
    </div>
  );
}

function HomeView({
  latest,
  onStart,
  onOpenRecent,
  onHelp,
}: {
  latest?: string;
  onStart: () => void;
  onOpenRecent: () => void;
  onHelp: () => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#F6F3EE]">
      <div
        className="relative min-h-[196px] shrink-0 px-5 pb-14 pt-5 text-white"
        style={{
          background: `linear-gradient(160deg, ${HEADER} 0%, #0e5c68 100%)`,
        }}
      >
        <div className="flex items-center gap-2.5">
          <Mark />
          <span className="text-sm font-semibold">{chatCopy.name}</span>
        </div>
        <h2 className="mt-5 text-[26px] font-semibold leading-[1.15] tracking-tight">
          {chatCopy.welcome}
        </h2>
      </div>
      <div className="relative -mt-11 min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-4">
        {latest ? (
          <button
            type="button"
            onClick={onOpenRecent}
            className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-left shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold text-neutral-900">
                Recent message
              </span>
              <span className="mt-1 block truncate text-sm text-neutral-600">
                {latest}
              </span>
            </span>
          </button>
        ) : null}
        <button
          type="button"
          onClick={onStart}
          className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-left shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-neutral-900">
              Send us a message
            </span>
            <span className="mt-0.5 block text-[12px] text-neutral-500">
              Ask about condos, the beach, or your dates
            </span>
          </span>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: ACCENT }}
          >
            <SendIcon />
          </span>
        </button>
        <button
          type="button"
          onClick={onHelp}
          className="flex w-full rounded-2xl bg-white px-4 py-3.5 text-left text-sm text-neutral-500 shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
        >
          Search for help
        </button>
      </div>
    </div>
  );
}

function MessagesView({
  latest,
  onOpen,
  onNew,
}: {
  latest?: string;
  onOpen: () => void;
  onNew: () => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      <header className="px-5 py-3.5 text-white" style={{ backgroundColor: HEADER }}>
        <h2 className="text-lg font-semibold">{chatCopy.name}</h2>
        <p className="text-xs text-white/75">Messages</p>
      </header>
      <div className="flex-1 px-4 py-4">
        {latest ? (
          <button
            type="button"
            onClick={onOpen}
            className="w-full rounded-2xl px-4 py-3.5 text-left shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
          >
            <span className="block text-sm font-semibold text-neutral-900">
              Current chat
            </span>
            <span className="mt-1 block truncate text-[12px] text-neutral-500">
              {latest}
            </span>
          </button>
        ) : (
          <p className="px-1 py-8 text-center text-sm text-neutral-500">
            No earlier chats yet. Start a conversation from Home.
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onNew}
        className="m-4 rounded-xl py-3 text-sm font-semibold text-white"
        style={{ backgroundColor: ACCENT }}
      >
        New message
      </button>
    </div>
  );
}

function HelpView({
  openId,
  onToggle,
}: {
  openId: string | null;
  onToggle: (id: string | null) => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      <header className="px-5 py-3.5 text-white" style={{ backgroundColor: HEADER }}>
        <h2 className="text-lg font-semibold">Help</h2>
        <p className="text-xs text-white/75">Sunchase Beachfront Condos</p>
      </header>
      <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-4">
        {HELP.map((item) => {
          const open = openId === item.title;
          return (
            <li key={item.title}>
              <button
                type="button"
                className="w-full rounded-2xl bg-[#F6F3EE] px-4 py-3 text-left"
                aria-expanded={open}
                onClick={() => onToggle(open ? null : item.title)}
              >
                <span className="block text-sm font-semibold text-neutral-900">
                  {item.title}
                </span>
                {open ? (
                  <span className="mt-2 block text-[13px] leading-relaxed text-neutral-600">
                    {item.body}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ChatView({
  messages,
  draft,
  sending,
  threadRef,
  onDraft,
  onSend,
  onBack,
}: {
  messages: ChatMessage[];
  draft: string;
  sending: boolean;
  threadRef: React.RefObject<HTMLDivElement | null>;
  onDraft: (value: string) => void;
  onSend: (event: FormEvent) => void;
  onBack: () => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      <header
        className="flex items-center gap-2 px-3 py-3 text-white"
        style={{ backgroundColor: HEADER }}
      >
        <button
          type="button"
          onClick={onBack}
          className="rounded-full px-2 py-1 text-sm text-white/90 hover:bg-white/10"
          aria-label="Back to home"
        >
          ←
        </button>
        <Mark />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{chatCopy.name}</p>
          <p className="text-[11px] text-white/70">Usually replies quickly</p>
        </div>
      </header>
      <div ref={threadRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <p className="text-center text-[11px] leading-relaxed text-neutral-400">
          {chatCopy.disclosure}
        </p>
        {messages.map((message) => (
          <p
            key={message.id}
            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
              message.role === "user"
                ? "ml-auto text-white"
                : "bg-neutral-100 text-neutral-800"
            }`}
            style={
              message.role === "user" ? { backgroundColor: ACCENT } : undefined
            }
          >
            {message.text}
          </p>
        ))}
        {sending ? (
          <p className="max-w-[85%] rounded-2xl bg-neutral-100 px-3.5 py-2.5 text-sm text-neutral-500">
            One moment…
          </p>
        ) : null}
      </div>
      <form onSubmit={onSend} className="flex items-center gap-2 border-t border-neutral-100 p-3">
        <input
          value={draft}
          onChange={(event) => onDraft(event.target.value)}
          placeholder={chatCopy.placeholder}
          disabled={sending}
          className="h-10 min-w-0 flex-1 rounded-full border border-neutral-200 px-4 text-sm outline-none focus:border-[#0e5c68] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={sending}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white disabled:opacity-60"
          style={{ backgroundColor: ACCENT }}
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

function Mark() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">
      S
    </span>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path
        d="M6 7.5h12v8H9l-3 2.5V7.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path
        d="M6 9.5 12 15l6-5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M5 12h12M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
