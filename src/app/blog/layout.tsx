import Link from "next/link";
import Icon from "@/components/ui/Icon";
import ThemeToggle from "@/components/ui/ThemeToggle";
import User from "@/data/user.json";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-10">
      {/* Clean blog top bar with back link to portfolio and theme toggle */}
      <header className="flex items-center justify-between pb-4 border-b border-border">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon
            icon="lucide:arrow-left"
            className="size-4 transition-transform group-hover:-translate-x-0.5"
          />
          <span>{User.name}</span>
        </Link>
        <ThemeToggle className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground sm:h-9 sm:w-9" />
      </header>

      {children}
    </div>
  );
}
