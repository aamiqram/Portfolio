import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, getProjectSlugs, projects } from "@/content/projects";
import { extractToc } from "@/lib/content";
import { readingTime } from "@/lib/reading-time";
import DocsShell from "@/components/docs/DocsShell";
import Breadcrumbs from "@/components/docs/Breadcrumbs";
import ReadingProgress from "@/components/docs/ReadingProgress";
import ContentRenderer from "@/components/content/ContentRenderer";
import { ProjectLinkButton } from "@/components/content/LinkList";
import ProjectVisual from "@/components/projects/ProjectVisual";
import TechBadge from "@/components/ui/TechBadge";
import { getTechItem } from "@/components/ui/tech";
import type { DocNavSection } from "@/components/docs/nav";

/**
 * Marks shown above the fold. The full `stack` list is still counted in the
 * read-metadata line below the summary, so nothing is hidden — it is only
 * moved out of the first screen.
 */
const TECH_LIMIT = 6;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} · AAMIQRAM`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} · AAMIQRAM`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const toc = extractToc(project.body);
  const ordered = projects.slice().sort((a, b) => a.order - b.order);
  const index = ordered.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? ordered[index - 1] : undefined;
  const next = index < ordered.length - 1 ? ordered[index + 1] : undefined;

  const sections: DocNavSection[] = [
    {
      title: "Projects",
      items: ordered.map((item) => ({
        href: `/projects/${item.slug}`,
        label: item.name,
        meta: item.contribution,
      })),
    },
    {
      title: "Engineering",
      items: [
        { href: "/engineering", label: "All notes" },
        { href: "/tech-stack", label: "Tech stack" },
      ],
    },
  ];

  return (
    <>
      <ReadingProgress />
      <DocsShell
      sections={sections}
      currentHref={`/projects/${project.slug}`}
      toc={toc}
header={
          <>
            <Breadcrumbs
              trail={[
                { href: "/", label: "Home" },
                { href: "/projects", label: "Projects" },
              ]}
              current={project.name}
            />

            {/*
              The product comes first. For six of the seven projects this is a
              real capture of the deployment, and it answers "what is this?"
              faster than any paragraph can. AAMIQU has no web build, so it gets
              the labelled schematic instead — the component already draws one
              when no screenshot is supplied, and captions it as a schematic.
            */}
            <div className="mt-6">
              <ProjectVisual
                variant={project.visual}
                label={project.name}
                screenshot={project.screenshot}
                /* The article column is max-w-3xl, so this is close to its
                   real rendered width rather than the viewport. */
                sizes="(min-width: 768px) 46rem, 100vw"
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <span className="label text-fg-muted">{project.contribution}</span>
              <span aria-hidden className="size-1 rounded-full bg-line-strong" />
              <span className="label text-fg-muted">{project.status}</span>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-3 text-base text-fg-muted">{project.tagline}</p>

            {/*
              Plain description of the product, ahead of the role and the
              evidence. A visitor skimming the top of the page should be able to
              stop after this paragraph and still know what they are looking at.
            */}
            <p className="measure mt-5 text-base leading-relaxed text-fg-secondary">
              {project.summary}
            </p>

            <dl className="mt-7 grid gap-4 border-y border-line py-5 sm:grid-cols-2">
              <div>
                <dt className="label text-fg-muted">Role</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-fg-secondary">
                  {project.role}
                </dd>
              </div>
              <div>
                <dt className="label text-fg-muted">Source status</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-fg-secondary">
                  {project.verification === "verified" ? "Verified" : "Reported"}
                  {" — "}
                  {project.verificationNote}
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {project.techKeys.slice(0, TECH_LIMIT).map((key) => {
                const item = getTechItem(key);
                return item ? <TechBadge key={key} item={item} size="sm" /> : null;
              })}
              {project.techKeys.length > TECH_LIMIT ? (
                <p className="font-mono text-[11px] text-fg-muted">
                  +{project.techKeys.length - TECH_LIMIT} more in the case study
                </p>
              ) : null}
            </div>

            {project.links.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <ProjectLinkButton key={link.href} link={link} />
                ))}
              </div>
            ) : null}
          </>
        }
      footer={
        <nav
          aria-label="Project pagination"
          className="grid gap-3 border-t border-line pt-6 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group rounded-lg border border-line px-4 py-3 transition-colors hover:border-line-strong"
            >
              <span className="label text-fg-muted">Previous</span>
              <span className="mt-1 flex items-center gap-1.5 text-sm font-medium text-fg">
                <ArrowLeft
                  aria-hidden
                  className="size-3.5 transition-transform group-hover:-translate-x-0.5"
                />
                {previous.name}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group rounded-lg border border-line px-4 py-3 text-right transition-colors hover:border-line-strong"
            >
              <span className="label text-fg-muted">Next</span>
              <span className="mt-1 flex items-center justify-end gap-1.5 text-sm font-medium text-fg">
                {next.name}
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ) : null}
        </nav>
      }
    >
      <p className="mb-8 font-mono text-xs text-fg-muted">
        {readingTime(project.body)} min read · {toc.length} sections ·{" "}
        {project.stack.length} technologies
      </p>

      <ContentRenderer blocks={project.body} />
    </DocsShell>
    </>
  );
}