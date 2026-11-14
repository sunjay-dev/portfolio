import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import ThemeToggle from "@/components/ui/ThemeToggle";
import User from "@/data/user.json";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import BlogFooter from "@/components/blog/BlogFooter";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Subtle top animated grid pattern matching homepage */}
      <div
        className="absolute inset-x-0 top-0 z-0 h-32 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.08}
          duration={3}
          repeatDelay={0.5}
          className="h-full w-full [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
      </div>

      {/* Modern sticky top navigation header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-6">
          {/* Breadcrumb brand */}
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="group flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <div className="relative size-6 overflow-hidden rounded-full border border-border shadow-xs">
                <Image
                  src="/img/me.webp"
                  alt={User.name}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
              <span className="font-medium">{User.name}</span>
            </Link>

            <span className="text-muted-foreground/40 font-normal">/</span>

            <Link
              href="/blog"
              className="font-semibold text-foreground transition-colors hover:text-foreground/80"
            >
              blog
            </Link>
          </div>

          {/* Right actions: Portfolio link & Theme toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <span>Portfolio</span>
              <Icon icon="lucide:arrow-up-right" className="size-3.5" />
            </Link>

            <div className="hidden h-4 w-px bg-border sm:block" aria-hidden />

            <ThemeToggle className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground sm:size-8" />
          </div>
        </div>
      </header>

      {/* Main blog content container */}
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 py-8 pb-16 sm:py-12 flex-1">
        {children}
        <BlogFooter />
      </div>
    </div>
  );
}
