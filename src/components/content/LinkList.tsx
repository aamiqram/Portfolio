import { ExternalLink, Globe, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { LinkEntry, ProjectLink } from "@/content/types";

const KIND_ICON = {
  live: Globe,
  repo: GithubIcon,
  profile: ArrowUpRight,
} as const;

export function ProjectLinkButton({ link }: { link: ProjectLink }) {
  const Icon = KIND_ICON[link.kind];

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent-text"
    >
      <Icon aria-hidden className="size-4" />
      {link.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function LinkList({ items }: { items: LinkEntry[] }) {
  return (
    <ul className="not-prose my-6 grid gap-2">
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 transition-colors hover:border-accent"
          >
            <ExternalLink
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-fg-muted transition-colors group-hover:text-accent-text"
            />
            <span className="min-w-0">
              <span className="block break-words font-mono text-sm font-medium text-fg">
                {item.label}
              </span>
              <span className="mt-0.5 block text-sm text-fg-muted">{item.detail}</span>
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}