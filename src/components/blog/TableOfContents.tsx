"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";

type TocItem = {
  title: string;
  url: string;
  items?: TocItem[];
};

type Props = {
  toc: TocItem[];
};

export default function TableOfContents({ toc }: Props) {
  const [activeId, setActiveId] = useState<string>("");
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Calculate total headings count for mobile badge
  const countItems = (items: TocItem[]): number =>
    items.reduce((acc, curr) => acc + 1 + (curr.items ? countItems(curr.items) : 0), 0);
  const totalCount = toc ? countItems(toc) : 0;

  const handleLinkClick = () => {
    // Automatically close the mobile collapsible dropdown when a link is tapped
    if (detailsRef.current && detailsRef.current.open) {
      detailsRef.current.removeAttribute("open");
    }
  };

  useEffect(() => {
    // Collect all heading IDs in the TOC
    const ids: string[] = [];
    const collectIds = (items: TocItem[]) => {
      items.forEach((item) => {
        if (item.url?.startsWith("#")) {
          ids.push(item.url.slice(1));
        }
        if (item.items) collectIds(item.items);
      });
    };
    collectIds(toc);

    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible entries
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!toc || toc.length === 0) return null;

  return (
    <>
      {/* 1. Mobile & Tablet TOC: Collapsible, elegant disclosure widget */}
      <details
        ref={detailsRef}
        className="group my-2 block rounded-xl border border-border/70 bg-muted/40 dark:bg-muted/20 backdrop-blur-sm p-3.5 transition-all xl:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-medium select-none">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <svg
              className="size-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            <span>On this page</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/50">
              {totalCount} {totalCount === 1 ? "section" : "sections"}
            </span>
            <Icon
              icon="lucide:chevron-down"
              className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
            />
          </div>
        </summary>

        <nav aria-label="Table of contents" className="mt-3 border-t border-border/60 pt-3">
          <ul className="flex flex-col gap-1 text-xs">
            {toc.map((item) => {
              const targetId = item.url.replace(/^#/, "");
              const isActive = activeId === targetId;

              return (
                <li key={item.url}>
                  <a
                    href={item.url}
                    onClick={handleLinkClick}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    <span>{item.title}</span>
                    {isActive && (
                      <span className="size-1.5 rounded-full bg-foreground" />
                    )}
                  </a>

                  {item.items && item.items.length > 0 && (
                    <ul className="ml-3 mt-1 flex flex-col gap-1 border-l border-border/70 pl-2.5">
                      {item.items.map((sub) => {
                        const subId = sub.url.replace(/^#/, "");
                        const isSubActive = activeId === subId;

                        return (
                          <li key={sub.url}>
                            <a
                              href={sub.url}
                              onClick={handleLinkClick}
                              className={`flex items-center justify-between rounded-md px-2 py-1 transition-colors ${
                                isSubActive
                                  ? "bg-accent/80 text-accent-foreground font-medium"
                                  : "text-muted-foreground/80 hover:bg-accent/40 hover:text-foreground"
                              }`}
                            >
                              <span>{sub.title}</span>
                              {isSubActive && (
                                <span className="size-1.5 rounded-full bg-foreground" />
                              )}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </details>

      {/* 2. Floating Right Sidebar TOC for larger screens (xl: 1280px+) */}
      <aside
        aria-label="Table of contents sidebar"
        className="hidden xl:block absolute left-full top-0 ml-12 h-full w-56"
      >
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
            On this page
          </div>
          <ul className="flex flex-col gap-2 text-xs border-l border-border pl-3">
            {toc.map((item) => {
              const targetId = item.url.replace(/^#/, "");
              const isActive = activeId === targetId;

              return (
                <li key={item.url} className="relative">
                  <a
                    href={item.url}
                    className={`block leading-relaxed transition-colors ${
                      isActive
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.title}
                  </a>
                  {item.items && item.items.length > 0 && (
                    <ul className="mt-1.5 flex flex-col gap-1.5 pl-3">
                      {item.items.map((sub) => {
                        const subId = sub.url.replace(/^#/, "");
                        const isSubActive = activeId === subId;
                        return (
                          <li key={sub.url}>
                            <a
                              href={sub.url}
                              className={`block leading-relaxed transition-colors ${
                                isSubActive
                                  ? "font-semibold text-foreground"
                                  : "text-muted-foreground/75 hover:text-foreground"
                              }`}
                            >
                              {sub.title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
