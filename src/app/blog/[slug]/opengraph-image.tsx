import { ImageResponse } from "next/og";
import { posts } from "@/lib/content";
import User from "@/data/user.json";
import fs from "fs";
import path from "path";

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

  let avatarDataUri = "";
  try {
    const avatarPath = path.join(process.cwd(), "public/img/me.png");
    if (fs.existsSync(avatarPath)) {
      const buffer = fs.readFileSync(avatarPath);
      avatarDataUri = `data:image/png;base64,${buffer.toString("base64")}`;
    }
  } catch {
    avatarDataUri = "";
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          padding: "68px 80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-120px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 45%, rgba(0, 0, 0, 0) 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)",
            display: "flex",
          }}
        />

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
              gap: "18px",
            }}
          >
            {avatarDataUri ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarDataUri}
                alt={User.name}
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1.5px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.12)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000000",
                  fontWeight: 800,
                  fontSize: "24px",
                }}
              >
                {User.name.charAt(0)}
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                {User.name}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#a1a1aa",
                  letterSpacing: "0.01em",
                }}
              >
                sunjay.xyz / blog
              </div>
            </div>
          </div>

          {date ? (
            <div
              style={{
                display: "flex",
                fontSize: "15px",
                fontWeight: 500,
                color: "#d4d4d8",
                backgroundColor: "#18181b",
                padding: "8px 20px",
                borderRadius: "9999px",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              {date}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            margin: "30px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: title.length > 55 ? "50px" : "62px",
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: "-0.035em",
              color: "#ffffff",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#e4e4e7",
                  backgroundColor: "#18181b",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  padding: "6px 16px",
                  borderRadius: "8px",
                }}
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
