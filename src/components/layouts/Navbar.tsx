"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import ThemeToggle from "@/components/ui/ThemeToggle";

const NAV_ITEMS = [
  { id: "hero",            label: "Home",       icon: "lucide:home",           href: "#hero" },
  { id: "about",           label: "About",      icon: "lucide:user",           href: "#about" },
  { id: "experience",      label: "Experience", icon: "lucide:briefcase",      href: "#experience" },
  { id: "education",       label: "Education",  icon: "lucide:graduation-cap", href: "#education" },
  { id: "skills",          label: "Skills",     icon: "lucide:layers",         href: "#skills" },
  { id: "projects",        label: "Projects",   icon: "lucide:folder-git-2",   href: "#projects" },
  { id: "blog",            label: "Blog",       icon: "lucide:notebook-pen",   href: "/blog" },
  { id: "github-activity", label: "GitHub",     icon: "lucide:github",         href: "#github-activity" },
  { id: "connect",         label: "Connect",    icon: "lucide:mail",           href: "#connect" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { threshold: 0.4 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Site navigation"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/80 px-2 py-2 shadow-lg backdrop-blur-md sm:gap-1.5 sm:px-3">
        {NAV_ITEMS.map(({ id, label, icon, href }) => {
          const isActive = active === id;
          return (
            <Link
              key={id}
              href={href}
              aria-label={label}
              title={label}
              className={`group relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 sm:h-10 sm:w-10 ${
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon icon={icon} className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]" />
              {/* Tooltip */}
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </Link>
          );
        })}

        <div className="mx-1 h-5 w-px bg-border" aria-hidden />

        {/* Theme toggle */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
