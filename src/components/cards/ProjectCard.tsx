"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { TECH_MAPPING } from "@/data/tech_mapping";
import { getStackTags } from "@/lib/github";

type Repo = {
  html_url: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  default_branch: string;
  description: string;
  topics: string[];
  name: string;
  homepage: string;
};

function formatDate(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const isPresent = Math.abs(Date.now() - e.getTime()) < 1000 * 60 * 60 * 24 * 7;
  if (isPresent) return `${fmt(s)} – Present`;
  const same = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (same) return fmt(s);
  return `${fmt(s)} – ${fmt(e)}`;
}

function formatName(tech: string): string {
  const lower = tech.toLowerCase();
  if (TECH_MAPPING[lower]) return TECH_MAPPING[lower];
  return tech.split("-").map((w) => {
    const lw = w.toLowerCase();
    return TECH_MAPPING[lw] || w.charAt(0).toUpperCase() + w.slice(1);
  }).join(" ");
}

function PreviewImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="h-48 w-full bg-muted" />;
  }

  return (
    <div className="relative h-48 w-full">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        className="object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default function ProjectCard({ project }: { project: Repo }) {
  const branch = project.default_branch || "main";
  const previewUrl = `https://raw.githubusercontent.com/${project.full_name}/${branch}/assets/preview.webp`;
  const href = project.homepage || project.html_url;
  const tags = getStackTags(project.topics);

  return (
    <div className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border transition-all duration-200 hover:ring-2 hover:ring-muted">
      <Link href={href} target="_blank" rel="noopener noreferrer" className="block shrink-0">
        <PreviewImage src={previewUrl} alt={project.name} />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{formatName(project.name)}</h3>
            <time className="text-xs text-muted-foreground">
              {formatDate(project.created_at, project.updated_at)}
            </time>
          </div>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name}`}
            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon icon="lucide:arrow-up-right" className="size-4" />
          </Link>
        </div>

        <p className="max-w-full text-pretty text-xs leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex h-6 w-fit items-center rounded-md border border-border px-2 text-[11px] font-medium text-foreground"
              >
                {formatName(tag)}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {/* The repo's About-website URL from the GitHub API (homepage) */}
          {project.homepage && (
            <Link
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-6 items-center gap-1.5 rounded-md border border-border bg-black px-2 text-xs font-medium text-white dark:bg-white dark:text-black"
            >
              <Icon icon="lucide:globe" className="size-3" />
              Website
            </Link>
          )}
          <Link
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-6 items-center gap-1.5 rounded-md border border-border bg-black px-2 text-xs font-medium text-white dark:bg-white dark:text-black"
          >
            <Icon icon="lucide:github" className="size-3" />
            Source
          </Link>
        </div>
      </div>
    </div>
  );
}
