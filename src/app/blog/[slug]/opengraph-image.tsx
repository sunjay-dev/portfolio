import { ImageResponse } from "next/og";
import { posts } from "@/lib/content";
import User from "@/data/user.json";

export const alt = "Blog Post OpenGraph Image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slugPath }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slugPath === slug);

  const title = post?.title ?? "Blog Post";
  const date = post?.date ? formatDate(post.date) : "";
  const tags = post?.tags?.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d1117",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          color: "#f0f6fc",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
            display: "flex",
          }}
        />

        {/* Top bar: Site & author branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0d1117",
                fontWeight: 700,
                fontSize: "20px",
              }}
            >
              {User.name.charAt(0)}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", fontSize: "24px", fontWeight: 700, color: "#ffffff" }}>
                {User.name}
              </div>
              <div style={{ display: "flex", fontSize: "16px", color: "#8b949e" }}>
                sunjay.xyz/blog
              </div>
            </div>
          </div>

          {date ? (
            <div
              style={{
                display: "flex",
                fontSize: "18px",
                color: "#8b949e",
                backgroundColor: "#161b22",
                padding: "8px 18px",
                borderRadius: "20px",
                border: "1px solid #30363d",
              }}
            >
              {date}
            </div>
          ) : null}
        </div>

        {/* Center: Post title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            margin: "40px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: title.length > 55 ? "50px" : "62px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom bar: Tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: "16px",
                fontWeight: 600,
                color: "#79c0ff",
                backgroundColor: "rgba(56, 139, 253, 0.15)",
                border: "1px solid rgba(56, 139, 253, 0.4)",
                padding: "6px 16px",
                borderRadius: "8px",
              }}
            >
              #{tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
