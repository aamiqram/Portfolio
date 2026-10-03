import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProject } from "@/content/projects";
import { journey } from "@/content/journey";
import { techGroups } from "@/content/tech";
import Portrait from "@/components/ui/Portrait";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Abu Abdullah Md Iqram is a Frontend Developer in Chattogram, Bangladesh, working with React and Next.js and building the APIs and data layers those products need.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · AAMIQRAM",
    description:
      "Frontend Developer in Chattogram, Bangladesh. React, Next.js, and the layers underneath them.",
    url: "/about",
  },
};

/**
 * What I am doing now, stated as three short answers rather than a paragraph.
 *
 * Kept separate from the introduction so a reader who only wants to know whether
 * I am a fit does not have to read the biography first.
 */
const FOCUS = [
  {
    label: "Building",
    text: "Commerce products end to end — catalogue, checkout, delivery rules, order state — with the interface as the part I care about most.",
  },
  {
    label: "Learning",
    text: "The layer between the interface and the database. Almost every bug I have found there was an assumption somebody never wrote down.",
  },
  {
    label: "Looking for",
    text: "Project work where I can own a feature from the schema to the screen, on a team that cares what the code will look like in a year.",
  },
];

export default function AboutPage() {
  const featured = ["unity-shop", "your-iyanat", "local-chef-bazar"]
    .map(getProject)
    .filter((project) => project !== undefined);

  return (
    <div className="mx-auto w-full max-w-[100rem] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
      {/*
        Profile header. The portrait and the introduction are one composition:
        the photograph is the identity mark, the text is the short version of
        the argument made below. Dates are deliberately left out of this block —
        they are in the timeline further down, where they can be scanned.
      */}
      <div className="grid items-start gap-8 border-b border-line pb-12 sm:gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-14">
        <Portrait
          className="enter-rise w-full max-w-xs sm:max-w-sm lg:max-w-none"
          priority
        />

        <div className="enter-rise" style={{ animationDelay: "90ms" }}>
          <p className="label text-accent-text">{"// About"}</p>

          <h1 className="heading-page mt-3 tracking-tight text-fg">
            Abu Abdullah Md Iqram
          </h1>

          <p className="mt-3 font-mono text-sm text-fg-muted">
            Frontend Developer · Chattogram, Bangladesh
          </p>

          <div className="prose-docs measure mt-6">
            <p className="mt-0">
              I build web applications with React and Next.js, and I work on the
              API and data layers underneath them when a product needs those to
              exist. I am not trying to be a backend engineer who does some
              frontend — I am a frontend developer who would rather own the whole
              path than hand over a screen and wait.
            </p>

            <p>
              Most of my work sits in the middle ground between a pure frontend
              and a pure backend: the checkout that has to survive a failed
              request, the inventory record that has to stay consistent, the live
              order status that has to update without a page refresh. That is the
              part of development I find most interesting, and it is what the
              projects in this portfolio are mostly about.
            </p>

            <p>
              I am early in my career, and this site is written to be useful
              rather than impressive: every project says whether its claims were
              read out of source or taken from my own account of the work. What
              I do have is a working method, and enough projects to show it
              applied.
            </p>
          </div>
        </div>
      </div>

      {/* Current focus. Three answers, no biography required to read them. */}
      <section
        aria-labelledby="focus-heading"
        className="border-b border-line py-12"
      >
        <h2 id="focus-heading" className="label text-accent-text">
          {"// Current focus"}
        </h2>

        <ul className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-3">
          {FOCUS.map((item) => (
            <li key={item.label} className="border-t border-line pt-4">
              <p className="label text-fg-muted">{item.label}</p>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-secondary">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-10 pt-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <article className="prose-docs max-w-3xl">
          <h2>How I got into this</h2>

          <p>
            I started a BSc in Mathematics at Chittagong College in 2023, and
            picked up programming alongside it out of curiosity rather than
            plan. I wanted to find out whether the thing I was studying could be
            made to do anything useful. What kept me in it was not the theory but
            the moment an idea stops being a screen and becomes something a
            person can actually use.
          </p>

          <p>
            The mathematics turned out to be more useful than I expected. Proofs
            are mostly about being precise about the conditions under which a
            claim holds, and a large share of what presents as a frontend bug is
            an unchecked assumption about a shape or a boundary. That has been the
            most transferable thing I have picked up from the degree so far.
          </p>

          <h2>Education and training</h2>

          <p>
            Both of these are still running. This is the route in the order it
            happened, not a list of finished qualifications.
          </p>

          {/* A vertical timeline rather than another table. */}
          <ol className="mt-6 flex list-none flex-col gap-6 pl-0">
            {journey.map((entry) => (
              <li
                key={entry.id}
                className="before:hidden border-l-2 border-line pl-5"
              >
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-sm font-semibold tabular-nums text-accent-text">
                    {entry.since}
                  </span>
                  <span className="label text-fg-muted">
                    {entry.state === "current" ? "Current" : "Ongoing"}
                  </span>
                </p>
                <p className="mt-1.5 font-semibold text-fg">{entry.title}</p>
                <p className="mt-0.5 font-mono text-xs text-fg-muted">
                  {entry.place}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-secondary">
                  {entry.detail}
                </p>
              </li>
            ))}
          </ol>

          <h2>How I approach building applications</h2>

          <p>
            I start from the model rather than the screen. Working out what an
            order is, what a product variant is allowed to contain, and what the
            database should refuse to store tends to make the interface easier to
            build afterwards. Validation belongs at the API boundary with a schema
            the client and server both agree on, and pricing rules belong in pure
            functions that can be tested without a browser.
          </p>

          <p>
            On the frontend I keep server state and client state separate, because
            conflating the two is what turns a data fetch into a rendering bug. I
            care about the parts users actually feel: readable type, visible focus
            states, layouts that hold up from a 320px phone, and pages that do not
            shift while data loads.
          </p>

          <h2>What is here, and what is not</h2>

          <p>
            This is a documentation-style portfolio rather than a résumé. There
            is no employment timeline, because I would rather not pad one out with
            dates I cannot stand behind. What there is instead is a directory of
            projects with case studies, and engineering notes on the decisions
            behind them.
          </p>

          <p>
            Every project entry states how its claims were checked. Where a public
            repository exists I read the actual package manifest and say so; where
            one does not, the case study is labelled as reported rather than
            verified. That distinction runs through the whole directory, and it is
            the reason the engineering notes read the way they do.
          </p>

          <h2>Selected work</h2>

          <p>
            Three projects carry most of the weight here. Each one is written up
            with its architecture, its data model, and the parts that were harder
            than expected:
          </p>

          <ul>
            {featured.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`}>{project.name}</Link> —{" "}
                {project.tagline}
              </li>
            ))}
          </ul>

          <h2>What I am drawn to</h2>

          <p>
            Mostly the unglamorous parts. Data modelling, the boundary between a
            client and a server, and the accessibility work that decides whether
            the thing is usable by everyone. The{" "}
            <Link href="/engineering">engineering notes</Link> cover the same
            ground from the other direction, and the{" "}
            <Link href="/tech-stack">tech stack page</Link> lists every tool
            involved with the project each one came from.
          </p>

          <ul>
            {techGroups.map((group) => (
              <li key={group.id}>
                <span className="font-medium text-fg">{group.title}</span> —{" "}
                {group.summary}
              </li>
            ))}
          </ul>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h2 className="label text-fg-muted">At a glance</h2>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-sm font-medium text-fg">Name</dt>
                <dd className="mt-1 text-sm text-fg-secondary">
                  Abu Abdullah Md Iqram
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-fg">Role</dt>
                <dd className="mt-1 text-sm text-fg-secondary">Frontend Developer</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-fg">Based in</dt>
                <dd className="mt-1 text-sm text-fg-secondary">
                  Chattogram, Bangladesh
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-fg">Focus</dt>
                <dd className="mt-1 text-sm text-fg-secondary">
                  React, Next.js, Node.js, PostgreSQL, MongoDB
                </dd>
              </div>
              {/*
                Education and training are not repeated here. They are in the
                timeline above, and duplicating them in a sidebar is what turns a
                page into a résumé.
              */}
            </dl>

            <div className="mt-6 border-t border-line pt-4">
              <a
                href={site.resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-md border border-line px-4 py-2.5 text-sm text-fg transition-colors hover:border-line-strong"
              >
                {site.resume.label}
                <span className="font-mono text-[11px] text-fg-muted">
                  PDF ↗
                </span>
              </a>
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-line pt-4">
              <Link
                href="/projects"
                className="rounded-md bg-accent px-4 py-2.5 text-center text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
              >
                See the projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-line px-4 py-2.5 text-center text-sm font-medium text-fg transition-colors hover:border-line-strong"
              >
                Get in touch
                <ArrowRight aria-hidden className="size-3.5" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}