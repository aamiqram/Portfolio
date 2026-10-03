import Link from "next/link";
import { ArrowUpRight, Globe, User } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type {
  ProjectCategory,
  ProjectLink,
  ProjectScreenshot,
  ProjectVisualVariant,
  TechKey,
  Verification,
} from "@/content/types";
import TechBadge from "@/components/ui/TechBadge";
import { getTechItem } from "@/components/ui/tech";
import ProjectVisual from "@/components/projects/ProjectVisual";

const KIND_ICON = {
  live: Globe,
  repo: GithubIcon,
  profile: User,
} as const;

export type ProjectCardProps = {
  name: string;
  slug: string;
  tagline: string;
  summary: string;
  highlights: string[];
  categories: ProjectCategory[];
  techKeys: TechKey[];
  visual: ProjectVisualVariant;
  screenshot?: ProjectScreenshot;
  contribution: string;
  status: string;
  verification: Verification;
  links: ProjectLink[];
};

/**
 * How many technology marks a card shows.
 *
 * The full inventory is on the case study and on /tech-stack. Six badges per
 * card turned the directory into a wall of chips and made the projects look
 * identical, so this is deliberately short and the rest is one link away.
 */
const TECH_LIMIT = 4;

/**
 * One project in the directory.
 *
 * Ordered the way a visitor reads: what it looks like, what it is, what it
 * does, then the evidence. The product capture leads because for six of these
 * seven projects it is the actual deployed product, and it is the fastest way to
 * tell a marketplace apart from a finance tracker. Categories are omitted
 * because the filter bar above already says where each project sits, and the
 * category text was competing with the summary for the same line.
 */
export default function ProjectCard({
  name,
  slug,
  tagline,
  summary,
  highlights,
  techKeys,
  visual,
  screenshot,
  contribution,
  status,
  verification,
  links,
}: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-line bg-surface p-4 shadow-1 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift sm:p-5">
      <ProjectVisual
        variant={visual}
        label={name}
        screenshot={screenshot}
        /* Roughly half of the two-column directory grid, less the gap. */
        sizes="(min-width: 1600px) min(45rem, calc(50vw - 5rem)), (min-width: 1024px) calc(50vw - 5rem), (min-width: 768px) calc(50vw - 4.5rem), (min-width: 640px) calc(100vw - 5.5rem), calc(100vw - 4.5rem)"
      />

      <div className="mt-5 flex flex-1 flex-col">
        <p className="label text-fg-muted">{contribution}</p>

        {/*
          Heading level 2, not 3: this card only ever appears in the project
          directory, which sits directly under the page's h1, so h3 skipped a
          level for anyone navigating by heading.
        */}
        <h2 className="mt-2.5 text-lg font-semibold tracking-tight text-fg">
          <Link
            href={`/projects/${slug}`}
            className="transition-colors hover:text-accent-text"
          >
            {name}
            <span className="sr-only"> — case study</span>
          </Link>
        </h2>

        <p className="mt-1.5 text-sm text-fg-muted">{tagline}</p>

        {/*
          What the product does, in the plainest language available. The full
          summary sits at the top of the case study; this is the short form so a
          scanning visitor gets the point before the metadata.
        */}
        <p className="mt-3.5 text-sm leading-relaxed text-fg-secondary">
          {summary}
        </p>

        {highlights.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2.5 text-[13px] leading-relaxed text-fg-secondary"
              >
                <span
                  aria-hidden
                  className="mt-[0.55em] size-1 shrink-0 rounded-[1px] bg-accent/70"
                />
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {techKeys.slice(0, TECH_LIMIT).map((key) => {
            const item = getTechItem(key);
            return item ? (
              <li key={key}>
                <TechBadge item={item} size="sm" />
              </li>
            ) : null;
          })}
          {techKeys.length > TECH_LIMIT ? (
            <li className="self-center font-mono text-[11px] text-fg-muted">
              +{techKeys.length - TECH_LIMIT} more
            </li>
          ) : null}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
          {/*
            Status is kept because "is this live" is a real question, but it sits
            under the rule with the links rather than above the title, where it
            was reading as a second label competing with the project name.
          */}
          <p className="font-mono text-[11px] text-fg-muted">{status}</p>

          <div className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-2">
            {links.map((link) => {
              const Icon = KIND_ICON[link.kind];

              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-fg-secondary transition-colors hover:text-accent-text"
                >
                  <Icon aria-hidden className="size-3.5" />
                  {link.label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              );
            })}

            <Link
              href={`/projects/${slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text"
            >
              Case study
              <ArrowUpRight aria-hidden className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/*
        The verification distinction has to survive into the directory, because
        it is the reason the rest of the site is worth reading. It is available to
        a screen reader here rather than shown as a fourth badge.
      */}
      <p className="sr-only">
        Source status:{" "}
        {verification === "verified"
          ? "claims verified against a public source"
          : "claims reported by the developer, not independently verified"}
      </p>
    </article>
  );
}
