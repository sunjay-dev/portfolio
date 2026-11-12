"use client";

import { useMemo, useState } from "react";
import BlogPostCard from "@/components/cards/BlogPostCard";

type Post = {
  slugPath: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
  metadata?: {
    readingTime: number;
    wordCount: number;
  };
};

type Props = {
  posts: Post[];
};

export default function BlogSearchList({ posts }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return posts.filter((post) => {
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        (post.description?.toLowerCase().includes(q) ?? false) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="flex flex-col gap-6">
      {/* Search Input & Tag Filter */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, topic, or keyword..."
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-foreground/30 focus:ring-2 focus:ring-muted"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <button
              onClick={() => setSelectedTag(null)}
              type="button"
              className={`inline-flex h-6 items-center rounded-md px-2 text-xs font-medium transition-colors ${
                selectedTag === null
                  ? "bg-foreground text-background"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  type="button"
                  className={`inline-flex h-6 items-center rounded-md px-2 text-xs font-medium transition-colors ${
                    isSelected
                      ? "bg-foreground text-background"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Results */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No posts found matching your search.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.slugPath} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
