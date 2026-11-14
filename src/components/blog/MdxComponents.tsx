"use client";

import React, { useState } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/* --------------------------------------------------------------------------
   1. Callout / Alert Component (info, tip, warning, danger)
   -------------------------------------------------------------------------- */
type CalloutType = "info" | "tip" | "warning" | "danger";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = {
    info: {
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      text: "text-blue-600 dark:text-blue-400",
      icon: "lucide:info",
      defaultTitle: "Note",
    },
    tip: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      icon: "lucide:circle-check",
      defaultTitle: "Tip / Best Practice",
    },
    warning: {
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-400",
      icon: "lucide:alert-triangle",
      defaultTitle: "Warning",
    },
    danger: {
      border: "border-rose-500/30",
      bg: "bg-rose-500/10",
      text: "text-rose-600 dark:text-rose-400",
      icon: "lucide:circle-x",
      defaultTitle: "Important",
    },
  }[type];

  return (
    <aside className={`my-6 rounded-xl border ${config.border} ${config.bg} p-4 text-sm leading-relaxed not-prose`}>
      <div className={`flex items-center gap-2 font-semibold ${config.text} mb-1.5`}>
        <Icon icon={config.icon} className="size-4 shrink-0" />
        <span>{title || config.defaultTitle}</span>
      </div>
      <div className="text-foreground/90 text-[13px] leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">{children}</div>
    </aside>
  );
}

/* --------------------------------------------------------------------------
   2. Code Tabs / Switcher Component (e.g. pnpm | npm | yarn | bun)
   -------------------------------------------------------------------------- */
interface TabItem {
  label: string;
  children: React.ReactNode;
}

interface TabsProps {
  items: string[];
  children: React.ReactNode;
}

export function Tabs({ items, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const childArray = React.Children.toArray(children);

  return (
    <div className="my-6 rounded-xl border border-border bg-card overflow-hidden not-prose shadow-xs">
      <div className="flex border-b border-border bg-muted/40 px-2 pt-1 gap-1 overflow-x-auto">
        {items.map((item, idx) => (
          <button
            key={item}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`px-3 py-1.5 text-xs font-medium rounded-t-lg transition-colors border-b-2 -mb-px ${
              activeTab === idx
                ? "border-foreground text-foreground bg-background font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="p-4 text-sm font-mono">{childArray[activeTab]}</div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   3. File Tree Component (visual folder / file directory structure)
   -------------------------------------------------------------------------- */
interface FileTreeItemProps {
  name: string;
  type?: "file" | "folder";
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

export function FileTreeItem({ name, type = "file", children, defaultOpen = true }: FileTreeItemProps) {
  const isFolder = type === "folder" || Boolean(children);

  if (!isFolder) {
    return (
      <li className="flex items-center gap-2 py-0.5 text-xs text-muted-foreground hover:text-foreground">
        <Icon icon="lucide:file-text" className="size-3.5 text-muted-foreground/70 shrink-0" />
        <span>{name}</span>
      </li>
    );
  }

  return (
    <li className="py-0.5 text-xs not-prose">
      <details open={defaultOpen} className="group/tree">
        <summary className="flex cursor-pointer list-none items-center gap-1.5 font-medium text-foreground select-none">
          <Icon icon="lucide:chevron-down" className="size-3 text-muted-foreground transition-transform group-open/tree:rotate-0 -rotate-90" />
          <Icon icon="lucide:folder-git-2" className="size-3.5 text-amber-500 shrink-0" />
          <span>{name}</span>
        </summary>
        <ul className="ml-4 mt-1 border-l border-border/80 pl-3 flex flex-col gap-0.5">{children}</ul>
      </details>
    </li>
  );
}

export function FileTree({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-border bg-muted/20 p-4 not-prose font-mono">
      <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">Project Directory</div>
      <ul className="flex flex-col gap-1">{children}</ul>
    </div>
  );
}

/* --------------------------------------------------------------------------
   4. Stat Metric / Key Value Pill
   -------------------------------------------------------------------------- */
interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
}

export function StatCard({ label, value, subtext }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-muted/30 p-4 not-prose">
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
      {subtext && <span className="text-[11px] text-muted-foreground/80">{subtext}</span>}
    </div>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-3 not-prose">{children}</div>;
}

/* --------------------------------------------------------------------------
   5. Interactive Live Preview / Sandbox Box
   -------------------------------------------------------------------------- */
export function InteractivePreview({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-border bg-card overflow-hidden not-prose shadow-xs">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground">
        <span>{title || "Live Component Preview"}</span>
        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
          Interactive
        </span>
      </div>
      <div className="p-6 flex items-center justify-center bg-muted/10">{children}</div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   6. Captioned Figure / Screenshot
   -------------------------------------------------------------------------- */
interface FigureProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
}

export function Figure({ src, alt, width, height, caption, className }: FigureProps) {
  return (
    <figure className="not-prose my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 672px"
        className={`w-full rounded-xl border border-border bg-muted/20${className ? ` ${className}` : ""}`}
      />
      {caption && <figcaption className="mt-2 text-center text-xs leading-relaxed text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

/* --------------------------------------------------------------------------
   Hint / inline tooltip — underlined text with a message on hover or focus
   -------------------------------------------------------------------------- */
interface HintProps {
  message: string;
  children: React.ReactNode;
}

export function Hint({ message, children }: HintProps) {
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-help text-inherit underline decoration-dotted underline-offset-4 decoration-muted-foreground/60 transition-colors hover:decoration-foreground">
        {children}
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={6}>
        {message}
      </TooltipContent>
    </Tooltip>
  );
}

/* --------------------------------------------------------------------------
   Links — real URLs get a solid underline and open in a new tab;
   in-page #anchors (heading autolinks, TOC) keep their existing styling
   -------------------------------------------------------------------------- */
export function a({ href = "", children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = /^https?:\/\//i.test(href);
  const inPage = href.startsWith("#");

  const classes = inPage
    ? className
    : `${className ?? ""} underline decoration-solid underline-offset-4 transition-colors hover:text-muted-foreground`.trim();

  return (
    <a {...props} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={classes}>
      {children}
    </a>
  );
}
