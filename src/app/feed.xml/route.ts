import { posts } from "@/lib/content";
import User from "@/data/user.json";

export async function GET() {
  const siteUrl = "https://sunjay.xyz";
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const itemsXml = publishedPosts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slugPath}`;
      const ogImageUrl = post.cover
        ? (post.cover.startsWith("http") ? post.cover : `${siteUrl}${post.cover}`)
        : `${siteUrl}/blog/${post.slugPath}/opengraph-image`;

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.description ?? ""}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator><![CDATA[${User.name}]]></dc:creator>
      <author>${User.contact.email} (${User.name})</author>
      <enclosure url="${ogImageUrl}" length="0" type="image/png" />
      <media:content url="${ogImageUrl}" medium="image" />
      <media:credit><![CDATA[${User.name}]]></media:credit>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/"
>
  <channel>
    <title><![CDATA[${User.name}'s Blog]]></title>
    <link>${siteUrl}/blog</link>
    <description><![CDATA[Thoughts, tutorials, and engineering articles by ${User.name}.]]></description>
    <language>en-US</language>
    <managingEditor>${User.contact.email} (${User.name})</managingEditor>
    <webMaster>${User.contact.email} (${User.name})</webMaster>
    <copyright><![CDATA[${User.name}]]></copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/img/me.webp</url>
      <title><![CDATA[${User.name}'s Blog]]></title>
      <link>${siteUrl}/blog</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
