"use client";

import Icon from "@/components/ui/Icon";

export default function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const nowDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", nowDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={
        className ??
        "group relative flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground sm:h-10 sm:w-10"
      }
    >
      <Icon
        icon="lucide:sun"
        className="hidden h-4 w-4 dark:block sm:h-[1.1rem] sm:w-[1.1rem]"
      />
      <Icon
        icon="lucide:moon"
        className="block h-4 w-4 dark:hidden sm:h-[1.1rem] sm:w-[1.1rem]"
      />
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
        <span className="dark:hidden">Dark</span>
        <span className="hidden dark:inline">Light</span>
      </span>
    </button>
  );
}
