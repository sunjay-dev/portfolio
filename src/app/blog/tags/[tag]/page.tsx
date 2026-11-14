import { Suspense } from "react";
import { posts } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogSearchList from "@/components/blog/BlogSearchList";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ tag: string }>;
};

// Generate static routes for all unique tags in published posts
export function generateStaticParams() {
  const tagsSet = new Set<string>();
  posts
    .filter((p) => p.published)
    .forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));

  return Array.from(tagsSet).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Posts tagged #${decodedTag} | Blog`,
    description: `Browse all articles and technical tutorials tagged with #${decodedTag}.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const published = posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const matchingPosts = published.filter((p) => p.tags.includes(decodedTag));
  if (matchingPosts.length === 0) notFound();

  return (
    <main className="flex flex-col gap-8">
      <Link
        href="/blog"
        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground w-fit"
      >
        <Icon
          icon="lucide:arrow-left"
          className="size-4 transition-transform group-hover:-translate-x-0.5"
        />
        <span>All posts</span>
      </Link>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-2xl font-bold sm:text-3xl">#</span>
          <SectionHeading>{decodedTag}</SectionHeading>
        </div>
        <p className="text-sm text-muted-foreground">
          {matchingPosts.length} post{matchingPosts.length !== 1 ? "s" : ""} filed under #{decodedTag}
        </p>
      </div>

      <Suspense fallback={null}>
        <BlogSearchList posts={published} initialTag={decodedTag} mode="routes" />
      </Suspense>
    </main>
  );
}
