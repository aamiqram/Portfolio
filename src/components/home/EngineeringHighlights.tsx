import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getArticlesOrdered } from "@/content/engineering";
import { readingTime, formatDate } from "@/lib/reading-time";
import { extractToc } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * How I think about the work, stated as three positions rather than as a list of
 * technologies. Each one is argued at length in a note that exists on this site,
 * so every principle is a link to the reasoning rather than a slogan.
 */
const PRINCIPLES = [
  {
    area: "Data",
    slug: "delivery-and-coupon-rules",
    title: "Work out the model before the screen",
    text: "What an order is, what a variant may contain, what the database should refuse to store. Get that right and the interface usually writes itself.",
  },
  {
    area: "APIs",
    slug: "validate-once-at-the-boundary",
    title: "Validate once, at the boundary",
    text: "Parse the payload into a typed value at the route edge, then pass only that value inward. A handler should never trust a field the client did not send.",
  },
  {
    area: "Interfaces",
    slug: "server-state-is-not-client-state",
    title: "Server state is not client state",
    text: "One is authoritative in the database and cached by key. The other is authoritative in the browser. Treating them the same is how a data fetch becomes a rendering bug.",
  },
] as const;

/**
 * An editorial preview, not a three-up card grid.
 *
 * The first note leads as a wide feature with its metadata set as a caption;
 * the rest sit in a ruled list beside it. Numbered entries and hairline
 * separators carry the rhythm that three identical boxes did not.
 */
export default function EngineeringHighlights() {
  const articles = getArticlesOrdered().slice(0, 3);
  const [lead, ...rest] = articles;

  return (
    <section aria-labelledby="engineering-heading" className="border-b border-line bg-surface">
      <div className="mx-auto w-full max-w-[100rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          level="section"
          eyebrow="// How I approach it"
          id="engineering-heading"
          description="Three positions I keep coming back to, each argued in full in one of the notes below."
          action={
            <Link
              href="/engineering"
              className="group inline-flex items-center gap-2 rounded-md border border-line bg-canvas px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-line-strong"
            >
              All notes
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          }
        >
          Engineering is a set of habits, not a stack
        </SectionHeading>

        <ul className="mt-10 grid gap-x-8 gap-y-7 border-y border-line py-8 sm:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <li key={principle.slug}>
              <p className="label text-fg-muted">
                <span className="tabular-nums text-accent-text">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {` — ${principle.area}`}
              </p>
              <h3 className="mt-2.5 text-base font-semibold leading-snug tracking-tight text-fg">
                {principle.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                {principle.text}
              </p>
              <Link
                href={`/engineering/${principle.slug}`}
                className="group mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent-text"
              >
                Read the note
                <ArrowRight
                  aria-hidden
                  className="size-3 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>

        <p className="label mt-12 text-fg-muted">
          {"// Engineering notes — the reasoning, at length"}
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          {/* Lead note. */}
          <article className="flex flex-col">
            <p className="label text-accent-text">{lead.topic}</p>

            <h3 className="heading-subsection mt-3 text-fg">
              <Link
                href={`/engineering/${lead.slug}`}
                className="transition-colors hover:text-accent-text"
              >
                {lead.title}
              </Link>
            </h3>

            <p className="measure mt-3 text-sm leading-relaxed text-fg-secondary sm:text-base">
              {lead.description}
            </p>

            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-fg-muted">
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden className="size-3.5" />
                {readingTime(lead.body)} min read
              </span>
              {lead.updated ? <span>{formatDate(lead.updated)}</span> : null}
              <span>{extractToc(lead.body).length} sections</span>
            </p>

            <Link
              href={`/engineering/${lead.slug}`}
              className="group mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-accent-text"
            >
              Read the note
              <ArrowRight
                aria-hidden
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </article>

          {/* Remaining notes, as a ruled list. */}
          <ul className="flex flex-col">
            {rest.map((article) => (
              <li key={article.slug} className="border-t border-line first:border-t-0">
                <Link
                  href={`/engineering/${article.slug}`}
                  className="group flex flex-col py-5 first:pt-0"
                >
                  <p className="label text-fg-muted transition-colors group-hover:text-accent-text">
                    {article.topic}
                  </p>

                  <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight text-fg transition-colors group-hover:text-accent-text">
                    {article.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-secondary">
                    {article.description}
                  </p>

                  <p className="mt-3 flex flex-wrap items-center gap-x-4 font-mono text-[11px] text-fg-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock aria-hidden className="size-3.5" />
                      {readingTime(article.body)} min
                    </span>
                    <span>{extractToc(article.body).length} sections</span>
                  </p>
                </Link>
              </li>
            ))}

            <li className="border-t border-line pt-5">
              <Link
                href="/engineering"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent-text"
              >
                All {getArticlesOrdered().length} notes
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}