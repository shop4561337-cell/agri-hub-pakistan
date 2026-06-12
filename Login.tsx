import { useState, useRef, useEffect } from "react";
import {
  useGetChatHistory, useSendChatMessage, getGetChatHistoryQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import AppSidebar from "@/components/AppSidebar";
import { Send, Bot, User, Sprout, Loader2 } from "lucide-react";

const SUGGESTED = [
  "What fertilizer should I use for maize?",
  "How do I identify fall armyworm?",
  "Best time to plant tomatoes?",
  "How to improve soil health?",
];

export default function Chat() {
  const qc = useQueryClient();
  const { data: messages, isLoading } = useGetChatHistory();
  const sendMsg = useSendChatMessage();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sendMsg.isPending]);

  const handleSend = (content: string) => {
    if (!content.trim() || sendMsg.isPending) return;
    const text = content.trim();
    setInput("");
    sendMsg.mutate({ data: { content: text } }, {
      onSuccess: () => qc.invalidateQueries({ queryKey: getGetChatHistoryQueryKey() }),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(input); }
  };

  return (
    <AppSidebar>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border bg-card flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-[15px] text-gray-900">AI Agriculture Assistant</h1>
            <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Online — powered by Llama 3.3
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
          ) : (!messages || messages.length === 0) ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Your AI Agriculture Assistant</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                Ask me anything about crops, pests, fertilizers, weather interpretation, or farming best practices.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto">
                {SUGGESTED.map(s => (
                  <button key={s} onClick={() => handleSend(s)} className="text-left px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted text-sm text-foreground transition-colors shadow-sm" data-testid={`button-suggest-${s.slice(0, 20)}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`} data-testid={`msg-${msg.role}-${msg.id}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-[hsl(100,20%,92%)] border border-[hsl(100,15%,80%)]"}`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
                </div>
                {msg.role === "user" ? (
                  <div className="max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-3 bg-primary shadow-md">
                    <p className="text-[15px] font-semibold leading-relaxed text-white">{msg.content}</p>
                    <div className="text-[11px] mt-1.5 text-white/70 text-right font-medium">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[75%] rounded-2xl rounded-tl-sm px-4 py-3 bg-white border-2 border-[hsl(100,15%,82%)] shadow-md">
                    <p className="text-[15px] font-semibold leading-relaxed text-gray-900">{msg.content}</p>
                    <div className="text-[11px] mt-1.5 text-gray-500 font-medium">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {sendMsg.isPending && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="bg-card border border-card-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 pb-4 pt-2 border-t border-border bg-background flex-shrink-0">
          <div className="flex gap-2 items-end max-w-3xl mx-auto">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about crops, pests, fertilizers..."
              className="flex-1 px-4 py-3 rounded-xl border border-input bg-card text-[15px] font-medium text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-ring max-h-32 overflow-y-auto"
              data-testid="input-chat-message"
              style={{ minHeight: "46px" }}
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || sendMsg.isPending}
              className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 flex-shrink-0"
              data-testid="button-chat-send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
        </div>
      </div>
    </AppSidebar>
  );
}
