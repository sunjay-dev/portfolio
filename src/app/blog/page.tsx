import { posts } from "@/lib/content";
import BlogPostCard from "@/components/cards/BlogPostCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, tutorials, and deep-dives on web development.",
};

export default function BlogPage() {
  const published = posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <SectionHeading>Blog</SectionHeading>
        <p className="text-sm text-muted-foreground">
          {published.length} post{published.length !== 1 ? "s" : ""} — thoughts on building things for the web.
        </p>
      </div>

      {published.length === 0 ? (
        <p className="text-sm text-muted-foreground">No posts yet. Check back soon!</p>
      ) : (
        <div className="flex flex-col gap-3">
          {published.map((post) => (
            <BlogPostCard key={post.slugPath} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
