import type { Metadata } from "next";
import {
  Clock,
  FileText,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Abu Abdullah Md Iqram, Frontend Developer in Chattogram, Bangladesh, by email, GitHub or LinkedIn.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · AAMIQRAM",
    description:
      "Email is the fastest way to reach me. GitHub and LinkedIn are linked below.",
    url: "/contact",
  },
};

/**
 * One channel card.
 *
 * Every card is an `<a>`, so the whole block is reachable and activatable by
 * keyboard, and each one is labelled by its own heading rather than relying on
 * the icon to carry the meaning.
 */
function ChannelCard({
  href,
  icon,
  title,
  value,
  note,
  external = false,
  descriptive = false,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  value: string;
  note: string;
  external?: boolean;
  /**
   * Set when `value` describes the destination rather than being it — the
   * résumé card links to a PDF, so its line reads as a description and must not
   * be underlined like an address.
   */
  descriptive?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
    >
      <span className="text-accent-text">{icon}</span>
      <h2 className="mt-4 text-base font-semibold tracking-tight text-fg">
        {title}
      </h2>
      <p
        className={`mt-1.5 text-sm leading-relaxed text-fg-secondary ${
          descriptive ? "" : "underline underline-offset-4 group-hover:text-fg"
        }`}
      >
        {value}
      </p>
      <p className="mt-4 font-mono text-[11px] text-fg-muted">{note}</p>
      {external ? (
        <span className="sr-only">(opens in a new tab)</span>
      ) : null}
    </a>
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-[100rem] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeading
        level="page"
        eyebrow="// Contact"
        description="Email is the most reliable channel, and it is the fastest way to reach me about a project, a role, or something in the case studies you would like challenged. I read everything that arrives, and I reply to project work within a few days."
      >
        Get in touch
      </SectionHeading>

      {/* Primary channels. */}
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        <ChannelCard
          href={`mailto:${site.email}`}
          icon={<Mail aria-hidden className="size-5" />}
          title="Email"
          value={site.email}
          note="Preferred · replies within a few days"
        />
        <ChannelCard
          href={site.links.github}
          icon={<GithubIcon className="size-5" />}
          title="GitHub"
          value="github.com/aamiqram"
          note="Source and deployed work"
          external
        />
        <ChannelCard
          href={site.links.linkedin}
          icon={<LinkedinIcon className="size-5" />}
          title="LinkedIn"
          value="linkedin.com/in/aamiqram"
          note="Professional profile"
          external
        />
      </div>

      {/* Secondary channels. */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ChannelCard
          href={`https://wa.me/${site.whatsapp.replace(/[\s+]/g, "")}`}
          icon={<MessageCircle aria-hidden className="size-5" />}
          title="WhatsApp"
          value={site.whatsapp}
          note="Fastest for a short question"
          external
        />
        <ChannelCard
          href={`tel:${site.phone.replace(/[\s+]/g, "")}`}
          icon={<Phone aria-hidden className="size-5" />}
          title="Phone"
          value={site.phone}
          note="Calls and messages, Bangladeshi hours"
        />
        <ChannelCard
          href={site.resume.href}
          icon={<FileText aria-hidden className="size-5" />}
          title={site.resume.label}
          value="Education, skills and project history"
          note="PDF via Google Drive"
          descriptive
          external
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <section
          aria-labelledby="reply-heading"
          className="rounded-xl border border-line bg-surface p-6 sm:p-8"
        >
          <h2
            id="reply-heading"
            className="text-lg font-semibold tracking-tight text-fg"
          >
            What helps me reply properly
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-secondary">
            Three lines are usually enough: what you are building, which parts
            already exist, and where you want me involved. If there is a codebase
            or a design, link to it.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm text-fg-secondary">
            {[
              "A live URL, repository or design file to look at first",
              "The deadline or the phase you are in, if there is one",
              "The stack already in use, if the project has one",
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/*
          City and country only. A street address is not something a visitor
          needs in order to decide whether to email me, and publishing one on a
          public page is a cost with no benefit.
        */}
        <section
          aria-labelledby="location-heading"
          className="rounded-xl border border-line bg-surface p-6 sm:p-8"
        >
          <h2
            id="location-heading"
            className="text-lg font-semibold tracking-tight text-fg"
          >
            Where I am
          </h2>

          <p className="mt-4 flex items-start gap-2.5 text-sm text-fg-secondary">
            <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-text" />
            {site.location}
          </p>
          <p className="mt-3 flex items-start gap-2.5 text-sm text-fg-secondary">
            <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-text" />
            {site.timezone}
          </p>
          <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-fg-muted">
            I work with people across time zones, so expect replies outside
            Bangladeshi hours rather than a promise of an instant answer.
          </p>
        </section>
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-fg-muted">
        There is no contact form here on purpose. A form needs a backend to
        receive it, and a mailto link that actually works is more honest than a
        form that silently drops submissions.
      </p>
    </div>
  );
}