import Link from "next/link";
import Icon from "@/components/ui/Icon";

type Post = {
  slugPath: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slugPath}`}
      className="group flex flex-col gap-2 rounded-xl border border-border p-5 transition-all duration-200 hover:bg-accent/40 hover:ring-2 hover:ring-muted"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold leading-snug group-hover:underline group-hover:underline-offset-2">
          {post.title}
        </h3>
        <Icon
          icon="lucide:arrow-up-right"
          className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>

      {post.description && (
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {post.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 mt-1">
        <time className="text-xs text-muted-foreground">{formatDate(post.date)}</time>

        {post.tags.length > 0 && (
          <>
            <span className="text-muted-foreground/40 text-xs">·</span>
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 4).map((tag) => (
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
    </Link>
  );
}
