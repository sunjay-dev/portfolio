import Link from "next/link";
import Icon from "@/components/ui/Icon";
import User from "@/data/user.json";
import NewsletterForm from "@/components/blog/NewsletterForm";

export default function BlogFooter() {
  const connectLinks = [
    { label: "GitHub", href: User.social.github.url, icon: "lucide:github" },
    { label: "LinkedIn", href: User.social.linkedin, icon: "lucide:linkedin" },
    { label: "X / Twitter", href: `https://x.com/i/user/${User.social.xId}`, icon: "simple-icons:x" },
    { label: "Book a Call", href: User.social.calCom, icon: "lucide:calendar" },
    { label: "Email", href: `mailto:${User.contact.email}`, icon: "lucide:mail" },
    { label: "RSS Feed", href: "/feed.xml", icon: "lucide:notebook-pen" },
  ];

  const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Experience", href: "/#experience" },
    { label: "All Posts", href: "/blog" },
  ];

  return (
    <footer className="mt-8 border-t border-border/70 pt-8 text-sm">
      <div className="flex flex-col gap-10">
        <div className="rounded-xl border border-border/80 bg-muted/20 p-5 backdrop-blur-xs">
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-12">
          <div className="flex flex-col gap-2.5 sm:col-span-6">
            <Link
              href="/"
              className="font-bold tracking-tight text-foreground transition-colors hover:text-foreground/80 text-base"
            >
              {User.name}
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Documenting lessons learned, experiments, and deep-dives across the full-stack ecosystem.
            </p>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open for new opportunities &amp; projects</span>
            </div>
          </div>

          {/* Explore Links */}
          <div className="flex flex-col gap-2.5 sm:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Explore
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div className="flex flex-col gap-2.5 sm:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              {connectLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon icon={item.icon} className="size-3.5 text-muted-foreground/80 group-hover:text-foreground transition-colors" />
                    <span>{item.label}</span>
                    <Icon icon="lucide:arrow-up-right" className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
