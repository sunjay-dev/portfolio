import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import User from "@/data/user.json";
import ThemeInit from "@/components/ui/ThemeInit";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sunjay.xyz"),
  title: `${User.name} | ${User.title}`,
  description: User.about[0],
  openGraph: {
    title: `${User.name} – ${User.title}`,
    description: User.about[0],
    url: "https://sunjay.xyz",
    type: "website",
    images: ["https://sunjay.xyz/img/me.webp"],
  },
  // favicon comes from the src/app/icon.jpg file convention
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className={`${geist.variable} ${geistMono.variable} relative min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}
