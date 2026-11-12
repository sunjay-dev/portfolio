import { notFound } from "next/navigation";
import { posts } from "@/lib/content";
import { MDXContent } from "@/components/MDXContent";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import TableOfContents from "@/components/blog/TableOfContents";
import CodeBlockCopy from "@/components/blog/CodeBlockCopy";
import ShareButtons from "@/components/blog/ShareButtons";
import User from "@/data/user.json";
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

  // Sorted list of published posts (newest first)
  const sortedPosts = posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const currentIndex = sortedPosts.findIndex((p) => p.slugPath === slug);
  if (currentIndex === -1) notFound();

  const post = sortedPosts[currentIndex];

  // In newest-first order:
  // previous article (older) is at currentIndex + 1
  // next article (newer) is at currentIndex - 1
  const prevPost = currentIndex + 1 < sortedPosts.length ? sortedPosts[currentIndex + 1] : null;
  const nextPost = currentIndex - 1 >= 0 ? sortedPosts[currentIndex - 1] : null;

  const pageUrl = `https://sunjay.xyz/blog/${post.slugPath}`;
  const ogImageUrl = post.cover
    ? (post.cover.startsWith("http") ? post.cover : `https://sunjay.xyz${post.cover}`)
    : `${pageUrl}/opengraph-image`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    image: [ogImageUrl],
    author: {
      "@type": "Person",
      name: User.name,
      url: "https://sunjay.xyz",
      image: "https://sunjay.xyz/img/me.webp",
      jobTitle: User.title,
      sameAs: [
        User.social.github.url,
        User.social.linkedin,
        `https://x.com/i/user/${User.social.xId}`,
      ],
    },
    publisher: {
      "@type": "Person",
      name: User.name,
      url: "https://sunjay.xyz",
      logo: {
        "@type": "ImageObject",
        url: "https://sunjay.xyz/img/me.webp",
      },
    },
    keywords: post.tags,
    wordCount: post.metadata?.wordCount,
    inLanguage: "en-US",
  };

  return (
    <article className="relative flex flex-col gap-8 pb-4">
      <CodeBlockCopy />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      <header className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {post.updated ? (
            <time dateTime={post.updated}>Updated {formatDate(post.updated)}</time>
          ) : (
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          )}

          {post.metadata?.readingTime ? (
            <>
              <span className="text-muted-foreground/40">·</span>
              <span>{post.metadata.readingTime} min read ({post.metadata.wordCount} words)</span>
            </>
          ) : null}
        </div>

        {post.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{post.description}</p>
        )}
      </header>

      {/* Table of Contents if available */}
      {post.toc && post.toc.length > 0 && (
        <TableOfContents toc={post.toc} />
      )}

      <hr className="border-border" />

      {/* MDX body — styled with @tailwindcss/typography */}
      <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-foreground prose-a:underline-offset-4 prose-code:before:content-none prose-code:after:content-none">
        <MDXContent code={post.body} />
      </div>

      <div className="flex flex-col gap-6 pt-8">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground mr-1">Tags:</span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tags/${tag}`}
                className="inline-flex h-6 items-center rounded-md border border-border bg-muted/30 px-2 text-xs font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        <ShareButtons title={post.title} url={pageUrl} />

        {(prevPost || nextPost) && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slugPath}`}
                className="group flex flex-col gap-1 rounded-xl border border-border p-4 transition-all duration-200 hover:bg-accent/40 hover:ring-2 hover:ring-muted"
              >
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  ← Older post
                </span>
                <span className="text-sm font-semibold text-foreground line-clamp-1 group-hover:underline">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block" aria-hidden="true" />
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slugPath}`}
                className="group flex flex-col gap-1 rounded-xl border border-border p-4 text-left transition-all duration-200 hover:bg-accent/40 hover:ring-2 hover:ring-muted sm:text-right"
              >
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Newer post →
                </span>
                <span className="text-sm font-semibold text-foreground line-clamp-1 group-hover:underline">
                  {nextPost.title}
                </span>
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}
