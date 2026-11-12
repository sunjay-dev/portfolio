type TocItem = {
  title: string;
  url: string;
  items?: TocItem[];
};

type Props = {
  toc: TocItem[];
};

export default function TableOfContents({ toc }: Props) {
  if (!toc || toc.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="my-2 rounded-xl border border-border bg-muted/30 p-4"
    >
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </div>
      <ul className="flex flex-col gap-1.5 text-xs">
        {toc.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </a>
            {item.items && item.items.length > 0 && (
              <ul className="ml-3 mt-1.5 flex flex-col gap-1 border-l border-border pl-2">
                {item.items.map((sub) => (
                  <li key={sub.url}>
                    <a
                      href={sub.url}
                      className="text-muted-foreground/80 transition-colors hover:text-foreground"
                    >
                      {sub.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
