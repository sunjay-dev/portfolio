"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message || "Failed to subscribe. Please try again.");
      } else {
        setStatus("success");
        setMessage(data.message || "You're subscribed! Thanks for joining.");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
        Newsletter
      </h4>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Get an email whenever I write a new deep-dive or tutorial. No spam.
      </p>

      {status === "success" ? (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <Icon icon="lucide:circle-check" className="size-4 shrink-0" />
          <span>{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              required
              disabled={status === "loading"}
              className="h-8 flex-1 rounded-lg border border-border bg-background px-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50 shrink-0 cursor-pointer"
            >
              {status === "loading" ? (
                <span>Joining...</span>
              ) : (
                <>
                  <span>Join</span>
                  <Icon icon="lucide:arrow-up-right" className="size-3" />
                </>
              )}
            </button>
          </div>
          {status === "error" && (
            <p className="text-[11px] text-destructive leading-tight">{message}</p>
          )}
        </form>
      )}
    </div>
  );
}
