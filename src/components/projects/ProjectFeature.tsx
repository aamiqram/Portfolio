import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/content/types";
import TechBadge from "@/components/ui/TechBadge";
import { getTechItem } from "@/components/ui/tech";
import ProjectVisual from "@/components/projects/ProjectVisual";

const VERIFICATION_BADGE = {
  verified: { label: "Source verified", className: "border-success/40 text-success" },
  reported: {
    label: "Reported, not verified",
    className: "border-warning/40 text-warning",
  },
} as const;

/**
 * How many technology marks a homepage feature shows.
 *
 * Some of these projects list ten or eleven technologies, and rendering all of
 * them made the preview read as an inventory rather than an argument. The full
 * list is on the case study.
 */
const TECH_LIMIT = 5;

type Props = {
  project: Project;
  /** Alternates the preview side down the page to give the list a rhythm. */
  reverse?: boolean;
};

/**
 * One project, presented editorially: preview on one side, the argument on the
 * other. The two sides swap on alternating entries instead of repeating an
 * identical card four times.
 */
export default function ProjectFeature({ project, reverse = false }: Props) {
  const badge = VERIFICATION_BADGE[project.verification];

  return (
    <article className="group grid items-center gap-7 rounded-2xl border border-line bg-surface p-5 shadow-1 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift sm:p-7 lg:gap-12 lg:p-8">
      <div
        className={
          reverse
            ? "min-w-0 lg:order-2"
            : "min-w-0"
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="label text-fg-muted">{project.contribution}</span>
          <span aria-hidden className="size-1 rounded-full bg-line-strong" />
          <span className="label text-fg-muted">{project.status}</span>
          <span className={`label rounded border px-2 py-0.5 ${badge.className}`}>
            {badge.label}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors hover:text-accent-text"
          >
            {project.name}
            <span className="sr-only"> — case study</span>
          </Link>
        </h3>

        <p className="mt-1.5 text-sm text-fg-muted">{project.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-fg-secondary">
          {project.summary}
        </p>

        <ul className="mt-5 flex flex-wrap items-center gap-1.5">
          {project.techKeys.slice(0, TECH_LIMIT).map((key) => {
            const item = getTechItem(key);
            return item ? (
              <li key={key}>
                <TechBadge item={item} size="sm" />
              </li>
            ) : null;
          })}
          {project.techKeys.length > TECH_LIMIT ? (
            <li className="font-mono text-[11px] text-fg-muted">
              +{project.techKeys.length - TECH_LIMIT} more
            </li>
          ) : null}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-fg-secondary transition-colors hover:text-accent-text"
            >
              {link.label}
              <ExternalLink
                aria-hidden
                className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}

          <Link
            href={`/projects/${project.slug}`}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent-text"
          >
            Read case study
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-fg-muted">
          {project.verificationNote}
        </p>
      </div>

      <div className={reverse ? "min-w-0 lg:order-1" : "min-w-0"}>
        <div className="transition-transform duration-500 ease-expo group-hover:scale-[1.02]">
          <ProjectVisual
            variant={project.visual}
            label={project.name}
            screenshot={project.screenshot}
            /* Full container width here, unlike the narrower directory card. */
            sizes="(min-width: 1024px) 92vw, 100vw"
          />
        </div>
      </div>
    </article>
  );
}