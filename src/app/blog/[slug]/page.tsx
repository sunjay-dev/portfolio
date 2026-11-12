import { notFound } from "next/navigation";
import { posts } from "@/lib/content";
import { MDXContent } from "@/components/MDXContent";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// Pre-generate all post URLs at build time
export function generateStaticParams() {
  return posts
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slugPath }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slugPath === slug);
  if (!post) return {};

  const ogImages = post.cover ? [post.cover] : undefined;

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    openGraph: {
      title: `${post.title} | Blog`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Blog`,
      description: post.description,
      ...(ogImages ? { images: ogImages } : {}),
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slugPath === slug && p.published);

  if (!post) notFound();

  return (
    <article className="flex flex-col gap-8 pb-16">
      {/* Back link */}
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

      {/* Post header */}
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>

          {post.tags.length > 0 && (
            <>
              <span className="text-muted-foreground/40">·</span>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex h-5 items-center rounded-md border border-border px-1.5 text-[10px] font-medium text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {post.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{post.description}</p>
        )}
      </header>

      <hr className="border-border" />

      {/* MDX body — styled with @tailwindcss/typography */}
      <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-foreground prose-a:underline-offset-4 prose-code:before:content-none prose-code:after:content-none">
        <MDXContent code={post.body} />
      </div>

      <hr className="border-border mt-8" />

      {/* Post footer navigation */}
      <div className="flex items-center justify-between pt-2">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon
            icon="lucide:arrow-left"
            className="size-4 transition-transform group-hover:-translate-x-0.5"
          />
          <span>Back to all posts</span>
        </Link>
        <Link
          href="/"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Portfolio home →
        </Link>
      </div>
    </article>
  );
}
