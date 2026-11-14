import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      // Relative path from project root — avoids Windows absolute path issue
      "@velite": "./.velite",
    },
  },
  images: {
    qualities: [75, 100],
    // Needed so <Figure> can render SVG diagrams from /public
    dangerouslyAllowSVG: true,
    // The diagram embeds Geist/Geist Mono as data: fonts and an inline <style>
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; style-src 'unsafe-inline' 'self' data:; font-src 'self' data:; sandbox",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
