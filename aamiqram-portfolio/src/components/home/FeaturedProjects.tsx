import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/content/projects";
import ProjectFeature from "@/components/projects/ProjectFeature";
import SectionHeading from "@/components/ui/SectionHeading";

/** How many projects the homepage previews before deferring to /projects. */
const PREVIEW_COUNT = 4;

export default function FeaturedProjects() {
  /*
   * Only the first few are previewed here. The full set lives on /projects,
   * which also owns search and the category filters. Without this cap every
   * project added to the directory would push the homepage further down, and a
   * section called "selected work" stops meaning anything once it lists
   * everything.
   */
  const featured = getFeaturedProjects().slice(0, PREVIEW_COUNT);
  const total = getFeaturedProjects().length;

  return (
    <section aria-labelledby="work-heading" className="border-b border-line">
      <div className="mx-auto w-full max-w-[100rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          level="section"
          eyebrow="// Selected work"
          id="work-heading"
          description="Each entry states how its claims were established. Where a source could be read, it was; where it could not, that is said plainly."
          action={
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-line-strong"
            >
              All {total} projects
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          }
        >
          Projects, with the engineering shown
        </SectionHeading>

        <div className="mt-10 space-y-5">
          {featured.map((project, index) => (
            <ProjectFeature
              key={project.slug}
              project={project}
              reverse={index % 2 === 1}
            />
          ))}
        </div>

        {total > featured.length ? (
          <p className="mt-8 flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-line-strong"
            >
              {`See the other ${total - featured.length} projects`}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}