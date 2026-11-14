---
name: portfolio-blog-writer
description: Write, edit, or review technical blog posts for this portfolio. Use when working on posts in content/posts or when asked to draft a blog in the portfolio's voice and MDX format.
metadata:
  short-description: Write blogs for this portfolio
---

# Portfolio blog writing

Write posts that sound like Sunjay sharing what he built, learned, and would do again. The existing post in `content/posts/` is the best voice reference: read it before drafting or making a substantial edit, and follow its clear first-person, practical engineering voice without copying its wording or forcing its exact structure onto every topic.

## Voice and substance

- Prefer a direct first-person account grounded in real project work. Explain the problem or friction that prompted the work, the options or decisions that mattered, what was implemented, and what changed as a result.
- Be specific about tools, code, configuration, and trade-offs. Explain enough context for another developer to follow; avoid unexplained jargon, generic advice, sales language, and inflated claims.
- Keep the tone approachable and candid. Include limitations, assumptions, and remaining manual work when they affect the reader's understanding.
- Never invent project details, outcomes, measurements, tests, or personal experiences. Use supplied notes and inspect the relevant implementation. If a material fact is missing, ask for it or clearly mark the draft's assumption for the author.
- Organize around the reader's path through the problem. Use descriptive headings and short paragraphs; add code or visuals where they clarify the explanation, not as decoration. End with the practical result or lesson when it fits.

## Repository format

- Add posts as `content/posts/<kebab-case-slug>.mdx`. The filename supplies the post slug; do not add a separate slug field unless the content schema changes.
- Start with YAML frontmatter. `title` is required (maximum 99 characters); `date` is required as a quoted ISO date (`YYYY-MM-DD`); `description` is optional (maximum 999 characters); `tags` is an array of strings; `published` defaults to `true`; `cover` and `updated` are optional. Keep descriptions accurate and useful as the blog listing and page summary.
- Set `published: false` for a draft that should not appear publicly. Use the post date that the author specifies; do not guess or backdate it. Add or change `updated` only when asked or when maintaining an already published post's actual update date.
- Use standard Markdown/MDX and fenced code blocks with an appropriate language where known. The renderer supports these project components: `Figure`, `Callout`, `Tabs`, `FileTree`, `FileTreeItem`, `StatGrid`, `StatCard`, and `InteractivePreview`. Check `src/components/blog/MdxComponents.tsx` for their current props and use them only when they improve the post.
- Put local blog images in a folder named after the post slug: `public/img/blog/<slug>/`, and reference them with site paths such as `/img/blog/<slug>/example.png`. Every image a post uses (cover, figures, diagrams) belongs in that post's folder so deleting the post removes its assets; keep genuinely shared assets out of post folders. For each `Figure`, provide accurate alt text and the real image dimensions; add a caption when it gives useful context. Do not create a reference to an image that does not exist.
- Posts are rendered in `src/app/blog/[slug]/page.tsx`, where the title, description, date, tags, reading time, and table of contents are displayed. The Velite collection and MDX processing are configured in `velite.config.ts`; check these files if repository behavior or schema appears to have changed.

## Workflow

1. Read the closest existing post and inspect the relevant source code, docs, or user notes before making factual claims.
2. Choose a clear angle and title that describe the actual lesson or outcome. Draft in the author's voice, with a useful opening and a logical explanation of the implementation and its trade-offs.
3. Add complete, valid frontmatter and ensure referenced code, links, component props, and images match the repository.
4. For edits or reviews, preserve the author's meaning and correct technical facts before polishing phrasing. Report unresolved factual questions instead of silently filling gaps.
