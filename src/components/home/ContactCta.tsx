import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

/**
 * The close.
 *
 * Deliberately *not* a card. It is the one place on the homepage where the
 * geometry is allowed to sit in the composition rather than sit behind a panel,
 * so the page ends on open space with the motif as a quiet signature instead of
 * another bordered box.
 */
export default function ContactCta() {
  return (
    <section aria-labelledby="contact-cta-heading" className="relative overflow-hidden">
      {/* Motif, cropped hard against the right edge. Decorative only. */}
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 320 320"
        fill="none"
        className="pointer-events-none absolute -right-24 top-1/2 hidden aspect-square w-[26rem] -translate-y-1/2 opacity-60 md:block lg:-right-10"
      >
        <g stroke="var(--border-strong)" strokeWidth="1">
          {[152, 120, 88].map((r) => (
            <circle key={r} cx="160" cy="160" r={r} strokeOpacity="0.35" />
          ))}
        </g>
        <circle
          cx="160"
          cy="160"
          r="56"
          stroke="var(--accent)"
          strokeOpacity="0.5"
          strokeWidth="1.25"
        />
        <circle cx="160" cy="160" r="5" fill="var(--accent)" fillOpacity="0.8" />
        <g stroke="var(--border-strong)" strokeOpacity="0.4" strokeWidth="1">
          <line x1="160" y1="0" x2="160" y2="18" />
          <line x1="160" y1="302" x2="160" y2="320" />
          <line x1="0" y1="160" x2="18" y2="160" />
          <line x1="302" y1="160" x2="320" y2="160" />
        </g>
      </svg>

      <div className="relative mx-auto w-full max-w-[100rem] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
          <div>
            <SectionHeading
              level="section"
              eyebrow="// Get in touch"
              id="contact-cta-heading"
              description="I am a Frontend Developer working on React and Next.js applications, and comfortable owning the backend and data layers when a product needs them. The fastest way to reach me is email."
            >
              Have a project that needs a real interface?
            </SectionHeading>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="press group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
              >
                <Mail aria-hidden className="size-4" />
                {site.email}
              </a>
              <Link
                href="/contact"
                className="press group inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-line-strong"
              >
                Contact details
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          <dl className="flex flex-col gap-5 self-end border-t border-line pt-6 lg:border-t-0 lg:pt-0">
            <div className="flex items-start gap-3">
              <dt className="sr-only">Based in</dt>
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-text" />
              <dd className="text-sm text-fg-secondary">{site.location}</dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="sr-only">GitHub</dt>
              <GithubIcon className="mt-0.5 size-4 shrink-0 text-accent-text" />
              <dd className="text-sm">
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-secondary underline underline-offset-4 transition-colors hover:text-fg"
                >
                  github.com/aamiqram
                </a>
                <span className="sr-only">(opens in a new tab)</span>
              </dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="sr-only">LinkedIn</dt>
              <LinkedinIcon className="mt-0.5 size-4 shrink-0 text-accent-text" />
              <dd className="text-sm">
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-secondary underline underline-offset-4 transition-colors hover:text-fg"
                >
                  linkedin.com/in/aamiqram
                </a>
                <span className="sr-only">(opens in a new tab)</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}