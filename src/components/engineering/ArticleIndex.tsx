import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getArticlesOrdered } from "@/content/engineering";
import { extractToc } from "@/lib/content";
import { formatDate, readingTime } from "@/lib/reading-time";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * A ruled editorial index rather than a stack of blog cards.
 *
 * The number is a real ordinal, the topic and section count act as a caption,
 * and hairline rules do the separating that a bordered box was doing. Each row
 * is a single link so the whole target is clickable, and the visible focus ring
 * is drawn around the row rather than only the title.
 */
export default function ArticleIndex() {
  const articles = getArticlesOrdered();

  return (
    <div className="mx-auto w-full max-w-[100rem] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeading
        level="page"
        eyebrow="// Engineering"
        description="Write-ups on the decisions behind the projects in the directory: where data should live, what belongs at the API boundary, and what a client-rendered application actually costs. Each note names the project it comes from, and each project entry says whether its source could be inspected."
      >
        Engineering notes
      </SectionHeading>

      <ol className="mt-14 max-w-5xl">
        {articles.map((article, index) => {
          const toc = extractToc(article.body);

          return (
            <li key={article.slug} className="border-t border-line">
              <Link
                href={`/engineering/${article.slug}`}
                className="group grid gap-x-6 gap-y-3 py-7 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:items-baseline"
              >
                <span
                  aria-hidden
                  className="font-mono text-sm text-fg-muted transition-colors group-hover:text-accent-text"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>
                  <span className="label block text-fg-muted transition-colors group-hover:text-accent-text">
                    {article.topic}
                  </span>

                  <span className="heading-subsection mt-2 block text-fg transition-colors group-hover:text-accent-text">
                    {article.title}
                  </span>

                  <span className="measure mt-2.5 block text-sm leading-relaxed text-fg-secondary">
                    {article.description}
                  </span>

                  <span className="mt-3 flex flex-wrap items-center gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-fg-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>

                <span className="flex flex-col items-start gap-2 sm:items-end">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-fg-muted">
                    <Clock aria-hidden className="size-3.5" />
                    {readingTime(article.body)} min
                  </span>
                  {article.updated ? (
                    <span className="font-mono text-[11px] text-fg-muted">
                      {formatDate(article.updated)}
                    </span>
                  ) : null}
                  <span className="font-mono text-[11px] text-fg-muted">
                    {toc.length} sections
                  </span>

                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text">
                    Read
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}