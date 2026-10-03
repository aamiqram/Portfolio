import Link from "next/link";
import { journey } from "@/content/journey";

/**
 * Education, training and current direction, as a ruled timeline.
 *
 * Deliberately not a résumé and not a set of cards. The three entries are laid
 * out as columns on a wide screen and stack on a narrow one, each one opening
 * with the year it started, because what matters here is the order and the fact
 * that two of the three are still running — which the explicit state label says
 * outright rather than leaving a reader to infer it from a missing end date.
 *
 * The data lives in `content/journey.ts` and is shared with the About page, so
 * the two cannot drift apart.
 */
export default function Journey() {
  return (
    <section aria-labelledby="journey-heading" className="border-b border-line">
      <div className="mx-auto w-full max-w-[100rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="measure">
            <p className="label text-accent-text">{"// Education & learning"}</p>
            <h2 id="journey-heading" className="heading-section mt-3 text-fg">
              How I got here, and what I am doing now
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-secondary">
              Two of these are still running. Nothing below is a completed
              qualification or a past role — it is the route, in the order it
              happened.
            </p>
          </div>
        </div>

        <ol className="mt-12 grid gap-x-10 gap-y-10 lg:grid-cols-3">
          {journey.map((entry) => (
            <li key={entry.id} className="border-t border-line pt-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <p className="font-mono text-sm font-semibold tabular-nums text-accent-text">
                  {entry.since}
                </p>
                <p className="label inline-flex items-center gap-1.5 text-fg-muted">
                  <span
                    aria-hidden
                    className={`size-1.5 rounded-full ${
                      entry.state === "current" ? "bg-accent" : "bg-line-strong"
                    }`}
                  />
                  {entry.state === "current" ? "Current" : "Ongoing"}
                </p>
              </div>

              <h3 className="heading-subsection mt-3 text-fg">{entry.title}</h3>
              <p className="mt-1.5 font-mono text-xs text-fg-muted">
                {entry.place}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-fg-secondary">
                {entry.detail}
              </p>

              {entry.relevance ? (
                <p className="mt-4 border-l-2 border-accent/50 pl-3.5 text-sm leading-relaxed text-fg-muted">
                  {entry.relevance}
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-fg-muted">
          The longer version, including how I decide where data should live, is
          on the{" "}
          <Link
            href="/about"
            className="text-accent-text underline underline-offset-4"
          >
            about page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}