import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { techGroups } from "@/content/tech";
import { site } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";
import TechBadge from "@/components/ui/TechBadge";

export const metadata: Metadata = {
  title: "Tech stack",
  description:
    "The frameworks, languages, data stores and services used across the projects in this portfolio, grouped by role, with the project each one came from.",
  alternates: { canonical: "/tech-stack" },
  openGraph: {
    title: "Tech stack · AAMIQRAM",
    description:
      "Every technology listed here appears in a project in the directory, or was observed in the deployed code.",
    url: "/tech-stack",
  },
};

export default function TechStackPage() {
  return (
    <div className="mx-auto w-full max-w-[100rem] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header>
        <SectionHeading
          level="page"
          eyebrow="// Reference"
          description="Nothing on this page is aspirational. Each entry is either listed in the package manifest of a public repository, or was observed in the deployed build. Where a technology is specific to one project, that project is named."
        >
          Tech stack
        </SectionHeading>

        <p className="mt-5 inline-flex items-start gap-2 rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-fg-secondary">
          <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-text" />
          <span>
            <span className="text-fg">{site.author}</span> works primarily in the
            browser with React and Next.js, and takes ownership of the API and data
            layers when a product needs them.
          </span>
        </p>
      </header>

      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {techGroups.map((group) => (
          <section
            key={group.id}
            aria-labelledby={`group-${group.id}`}
            className="rounded-xl border border-line bg-surface p-5"
          >
            <h2
              id={`group-${group.id}`}
              className="text-base font-semibold tracking-tight text-fg"
            >
              {group.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
              {group.summary}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item.key}>
                  <TechBadge item={item} size="md" />
                </li>
              ))}
            </ul>

            {group.items.some((item) => item.note) ? (
              <dl className="mt-5 space-y-1.5 border-t border-line pt-4 text-xs">
                {group.items
                  .filter((item) => item.note)
                  .map((item) => (
                    <div
                      key={item.key}
                      className="flex gap-2 font-mono text-fg-muted"
                    >
                      <dt className="shrink-0 text-fg-secondary">{item.name}</dt>
                      <dd aria-hidden className="shrink-0">
                        —
                      </dd>
                      <dd>{item.note}</dd>
                    </div>
                  ))}
              </dl>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}