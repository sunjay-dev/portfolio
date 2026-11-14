import { Suspense } from "react";
import { posts } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogSearchList from "@/components/blog/BlogSearchList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, tutorials, and deep-dives on web development.",
  alternates: {
    types: {
      "application/rss+xml": "https://sunjay.xyz/feed.xml",
    },
  },
};

export default function BlogPage() {
  const published = posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <SectionHeading>Blog</SectionHeading>
          <p className="text-sm text-muted-foreground">
            {published.length} post{published.length !== 1 ? "s" : ""} — thoughts on building things for the web.
          </p>
        </div>

        {/* RSS Feed link */}
        <a
          href="/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
          title="RSS Feed"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <svg
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1" />
          </svg>
          <span>RSS</span>
        </a>
      </div>

      <Suspense fallback={null}>
        <BlogSearchList posts={published} />
      </Suspense>
    </main>
  );
}
