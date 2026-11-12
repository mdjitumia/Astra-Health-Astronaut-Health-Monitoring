"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/lib/store";
import { SectionHeader, Panel, StatusPill } from "@/components/shared";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import {
  Bot,
  Send,
  Sparkles,
  User,
  Trash2,
  CircleAlert,
  ShieldQuestion,
  Radio,
  HeartPulse,
  Activity,
  Moon,
  TriangleAlert,
  Brain,
  GitCompare,
} from "lucide-react";

interface Msg {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
  source?: string;
  disclaimer?: string;
}

const SUGGESTIONS = [
  "What NASA OSD studies are integrated and what do they find?",
  "What real radiation dose did OSD-546 measure on the ISS?",
  "How does OSD-941 inform astronaut cognitive/neurodegenerative risk?",
  "How does OSD-1005 (PROMETEO 2) protect astronaut brains?",
  "How does OSD-344 inform astronaut cardiac health risk?",
  "Why is subject C002 (Dr. Sarah Chen) flagged for attention?",
];

// Quick-action buttons for common health-monitoring queries
const QUICK_ACTIONS = [
  { label: "Crew Health Summary", icon: HeartPulse, prompt: "Give me a concise summary of overall crew health status across all four astronauts." },
  { label: "Abnormal Indicators", icon: TriangleAlert, prompt: "Explain any abnormal or concerning health indicators currently present in the crew." },
  { label: "Sleep Trends", icon: Moon, prompt: "Analyze the crew's sleep trends and flag any crew member below healthy thresholds." },
  { label: "Recent Alerts", icon: Activity, prompt: "Review the recent health alerts and explain which ones are most actionable." },
  { label: "Explain a Recommendation", icon: Brain, prompt: "Explain the AI risk assessment recommendation for Dr. Sarah Chen and why it was generated." },
  { label: "Compare Metrics", icon: GitCompare, prompt: "Compare the available health metrics across all four crew members and highlight outliers." },
];

const WELCOME: Msg = {
  id: "welcome",
  role: "assistant",
  content:
    "**ASTRA Copilot online.** I'm grounded in **NASA GeneLab & ALSDA research data** from 15 OSD studies (OSD-118, 344, 353, 431, 546, 569, 570, 571, 574, 575, 635, 656, 937, 941, 1005).\n\nI know the crew subject IDs (C001–C004), their sex, the 7-point blood-sampling timeline (L-92→R+194), and the scientific findings — e.g. OSD-635 found microgravity alters **4,422 genes** in vascular smooth muscle cells, OSD-941 found spaceflight **accelerates Alzheimer's-associated molecular programs** in brain organoids, OSD-569 provides **complete blood counts (CBC)** + WGS + long-read RNA-seq from whole blood, and OSD-570 profiles **single-cell immune repertoires** (TCR/BCR) from PBMCs — all from the same Inspiration4 crew.\n\n**Data provenance:** NASA research data (study metadata, subject IDs, assay panels, scientific findings, and ISS radiation dosimetry) is authoritative. Physiological indicators are representative.\n\nI provide **decision support only** — not medical diagnosis. Ask me anything!",
  time: "T-00:00",
  source: "astra-system",
};


export function CopilotModule() {
  const { chat, pushChat, clearChat } = useApp();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<{ source?: string; disclaimer?: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages: Msg[] = chat.length ? (chat as Msg[]) : [WELCOME];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, loading]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const userMsg: Msg = {
      id: `u-${Date.now()}`,
      role: "user",
      content,
      time: nowT(),
    };
    pushChat(userMsg);
    setInput("");
    setLoading(true);
    setMeta(null);

    const history = [...(chat.length ? chat : [WELCOME]), userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      const reply: Msg = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: data.reply ?? "I couldn't process that request.",
        time: nowT(),
        source: data.source,
        disclaimer: data.disclaimer,
      };
      pushChat(reply);
      setMeta({ source: data.source, disclaimer: data.disclaimer });
    } catch {
      pushChat({
        id: `a-${Date.now()}`,
        role: "assistant",
        content:
          "I'm having trouble reaching the inference service. In deep-space mode this is expected — try again when the link stabilizes.",
        time: nowT(),
        source: "astra-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="ASTRA AI Copilot"
        subtitle="Ask questions about crew health, trends, risks, and mission operations"
        icon={<Bot className="h-4 w-4" />}
        action={
          chat.length > 0 ? (
            <Button variant="outline" size="sm" onClick={clearChat} className="gap-1.5">
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </Button>
          ) : null
        }
      />

      <Panel
        className="flex h-[calc(100vh-220px)] min-h-[460px] flex-col"
        bodyClassName="flex flex-1 flex-col gap-3 overflow-hidden p-0"
      >
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto scrollbar-thin p-4">
          {messages.map((m) => (
            <MessageBubble key={m.id} m={m} />
          ))}
          {loading && (
            <div className="flex items-start gap-3">
              <Avatar />
              <div className="rounded-2xl rounded-tl-sm border border-white/[0.08] bg-card/40 px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse text-teal-300" />
                  ASTRA is reasoning
                  <span className="inline-flex gap-0.5">
                    <span className="h-1 w-1 animate-bounce rounded-full bg-teal-300 [animation-delay:0ms]" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-teal-300 [animation-delay:150ms]" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-teal-300 [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Source / disclaimer strip */}
        {meta?.disclaimer && (
          <div className="flex items-center gap-2 border-t border-border/40 px-4 py-1.5 text-[10px] text-muted-foreground">
            <CircleAlert className="h-3 w-3 shrink-0 text-amber-300" />
            <span>{meta.disclaimer}</span>
            {meta.source === "astra-fallback" && (
              <span className="ml-auto flex items-center gap-1 rounded bg-amber-400/10 px-1.5 py-0.5 text-amber-300">
                <Radio className="h-3 w-3" /> offline fallback
              </span>
            )}
            {meta.source === "astra-llm" && (
              <span className="ml-auto flex items-center gap-1 rounded bg-status-good/10 px-1.5 py-0.5 text-status-good">
                <Sparkles className="h-3 w-3" /> live model
              </span>
            )}
          </div>
        )}

        {/* Quick actions — always visible for fast access */}
        <div className="border-t border-white/[0.06] px-3 pt-2.5 pb-1">
          <div className="mb-1.5 flex items-center gap-1.5 px-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-2.5 w-2.5 text-teal-300" /> Quick Actions
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_ACTIONS.map((qa) => {
              const Icon = qa.icon;
              return (
                <button
                  key={qa.label}
                  onClick={() => send(qa.prompt)}
                  disabled={loading}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-medium text-foreground/80 backdrop-blur-sm transition-all hover:border-teal-400/30 hover:bg-teal-400/10 hover:text-foreground disabled:opacity-40 disabled:hover:border-white/[0.07] disabled:hover:bg-white/[0.03]"
                >
                  <Icon className="h-3 w-3 text-teal-300" />
                  {qa.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Context suggestions — only when chat is empty */}
        {chat.length === 0 && (
          <div className="px-3 pb-2 pt-1">
            <div className="mb-1.5 flex items-center gap-1.5 px-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <Brain className="h-2.5 w-2.5 text-teal-300" /> Try asking
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] text-muted-foreground transition-all hover:border-teal-400/30 hover:bg-teal-400/10 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border/40 p-3">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask ASTRA about crew health, risks, countermeasures…"
              rows={2}
              className="resize-none border-border/50 bg-card/30 text-sm focus-visible:ring-primary/40"
            />
            <Button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              size="icon"
              className="h-[60px] w-12 shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 px-1 text-[10px] text-muted-foreground">
            <ShieldQuestion className="h-3 w-3" />
            Decision support only — not medical diagnosis. Press Enter to send, Shift+Enter for newline.
          </div>
        </div>
      </Panel>
    </div>
  );
}

function MessageBubble({ m }: { m: Msg }) {
  const isUser = m.role === "user";
  return (
    <div className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}>
      {isUser ? <UserAvatar /> : <Avatar />}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl border px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "rounded-tr-sm border-primary/30 bg-primary/10 text-foreground"
            : "rounded-tl-sm border-border/50 bg-card/40 text-foreground",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{m.content}</p>
        ) : (
          <div className="prose-chat">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0">{children}</ul>,
                ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0">{children}</ol>,
                strong: ({ children }) => <strong className="font-semibold text-cyan-300">{children}</strong>,
                em: ({ children }) => <em className="text-muted-foreground">{children}</em>,
                code: ({ children }) => (
                  <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px] text-cyan-200">{children}</code>
                ),
              }}
            >
              {m.content}
            </ReactMarkdown>
          </div>
        )}
        <div
          className={cn(
            "mt-1.5 flex items-center gap-2 text-[10px] text-muted-foreground/70",
            isUser && "justify-end",
          )}
        >
          <span className="font-mono">{m.time}</span>
          {!isUser && m.source && (
            <span className="flex items-center gap-1">
              <Sparkles className="h-2.5 w-2.5" />
              {m.source === "astra-llm" ? "live model" : m.source === "astra-fallback" ? "offline fallback" : "system"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/30 to-blue-600/20 ring-1 ring-cyan-400/30">
      <Bot className="h-4 w-4 text-cyan-300" />
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
      <User className="h-4 w-4 text-primary" />
    </div>
  );
}

function nowT() {
  return `T-${String(Math.floor(Math.random() * 59)).padStart(2, "0")}:${String(Math.floor(Math.random() * 59)).padStart(2, "0")}`;
}
