"use client";

import { useState } from "react";

type Props = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">Share:</span>
      <a
        href={xShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        <span>X</span>
      </a>
      <a
        href={linkedInShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
        </svg>
        <span>LinkedIn</span>
      </a>
      <button
        onClick={handleCopy}
        type="button"
        className={`inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-xs transition-colors ${
          copied
            ? "border-foreground/30 bg-accent text-foreground"
            : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
        }`}
      >
        {copied ? (
          <>
            <svg className="size-3 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-foreground font-medium">Copied!</span>
          </>
        ) : (
          <>
            <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span>Copy link</span>
          </>
        )}
      </button>
    </div>
  );
}
