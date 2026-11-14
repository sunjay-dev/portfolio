import type { MetadataRoute } from "next";
import { posts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sunjay.xyz";

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slugPath}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const tagsSet = new Set<string>();
  posts
    .filter((p) => p.published)
    .forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));

  const tagRoutes: MetadataRoute.Sitemap = Array.from(tagsSet).map((tag) => ({
    url: `${baseUrl}/blog/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes, ...tagRoutes];
}
