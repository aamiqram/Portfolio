import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { site } from "@/content/site";
import ApplicationLayers from "./ApplicationLayers";

/**
 * Line-by-line entrance. The delays are plain CSS, so the whole thing runs
 * without JavaScript and degrades to fully visible text under reduced motion.
 */
function Rise({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span
      className={`enter-rise ${className ?? ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" />
      <div aria-hidden className="glow-crimson pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[100rem] px-5 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:gap-16">
          {/* Copy */}
          <div className="max-w-2xl">
            <Rise delay={0}>
              <p className="label inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-fg-secondary">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                Frontend Developer / Web Applications
              </p>
            </Rise>

            <Rise delay={40}>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <p className="font-medium tracking-tight text-fg">
                  Abu Abdullah Md Iqram
                </p>
                <span aria-hidden className="text-fg-muted">
                  /
                </span>
                <p className="text-fg-muted">{site.location}</p>
              </div>
            </Rise>

            <h1 className="heading-hero mt-6 text-fg">
              <Rise delay={80} className="block">
                I build interfaces
              </Rise>
              <Rise delay={160} className="block">
                that become{" "}
                <span className="text-accent-text">complete products.</span>
              </Rise>
            </h1>

            <Rise delay={260}>
              <p className="measure-narrow mt-6 text-base leading-relaxed text-fg-secondary sm:text-lg">
                I build responsive React and Next.js products, with a particular
                interest in commerce and the connection between interface, API,
                and data.
              </p>
            </Rise>

            <Rise delay={300}>
              <p className="measure-narrow mt-4 border-l-2 border-accent/60 pl-4 text-base leading-relaxed text-fg">
                I would rather ship the whole thing than hand over a screen and
                wait. If the data model or the API is what stands between an idea
                and something usable, that is part of the work for me.
              </p>
            </Rise>

            <Rise delay={340}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="press group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
                >
                  Explore My Work
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press group inline-flex items-center gap-2 rounded-md border border-line bg-surface px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-line-strong"
                >
                  <GithubIcon className="size-4" />
                  GitHub Profile
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </Rise>
          </div>

          {/* Signature visual */}
          <div className="lg:pt-4">
            <div
              className="enter-rise lg:ml-auto lg:max-w-[36rem]"
              style={{ animationDelay: "200ms" }}
            >
              <ApplicationLayers />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
