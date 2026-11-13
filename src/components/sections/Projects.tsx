import ProjectCard from "@/components/cards/ProjectCard";
import Icon from "@/components/ui/Icon";
import User from "@/data/user.json";
import { FEATURED_TOPIC } from "@/lib/github";

type Repo = {
  name: string;
  html_url: string;
  description: string;
  topics: string[];
  fork: boolean;
  created_at: string;
  updated_at: string;
  full_name: string;
  default_branch: string;
  homepage: string;
};

export default async function Projects() {
  const filtered: Repo[] = [];
  const userName = User.social.github.userName;
  const repoCount = User.social.github.reposFetchLimit || 20;
  let publicRepos = 0;

  try {
    const res = await fetch(`https://api.github.com/users/${userName}/repos?sort=created&direction=desc&per_page=${repoCount}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch repos");
    const repos: Repo[] = await res.json();

    // Only repos tagged with the featured topic are showcased, up to 4.
    for (const repo of repos) {
      if (filtered.length >= 4) break;
      if (!repo.fork && repo.topics?.includes(FEATURED_TOPIC)) filtered.push(repo);
    }

    // Real total across the profile — drives the meta line in the header.
    const userRes = await fetch(`https://api.github.com/users/${userName}`, {
      next: { revalidate: 3600 },
    });
    if (userRes.ok) {
      const user: { public_repos?: number } = await userRes.json();
      publicRepos = user.public_repos ?? 0;
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <section id="projects" className="flex flex-col gap-y-8">
      <div className="w-full">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tighter">
            Latest{" "}
            <span className="relative inline-block">
              Work
              <svg
                aria-hidden
                viewBox="0 0 120 10"
                fill="none"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-2.5 w-full text-foreground/70"
              >
                <path d="M2 6 C 20 2, 45 9, 70 5 S 110 3, 118 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <a
            href={User.social.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon icon="lucide:github" className="size-3.5" />
            GitHub
          </a>
        </div>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {String(publicRepos).padStart(2, "0")} public repos · {filtered.length} featured below
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.length > 0 ? (
          filtered.map((project, i) => <ProjectCard key={i} project={project} />)
        ) : (
          <p className="text-center text-muted-foreground text-sm">
            No projects to display yet. Make sure your GitHub repos have the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{FEATURED_TOPIC}</code> topic.
          </p>
        )}
      </div>
    </section>
  );
}
