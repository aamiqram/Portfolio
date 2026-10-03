import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import Portrait from "@/components/ui/Portrait";
import { footerNav, site } from "@/content/site";

export default function SiteFooter() {
  // Rendered on the server, so the year is correct without a client component.
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      {/*
        Motif, cropped off the left edge and behind the content. Static, and
        present on every page as the closing signature. Decorative only.
      */}
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 240 240"
        fill="none"
        className="pointer-events-none absolute -left-20 bottom-0 hidden aspect-square w-72 opacity-40 lg:block"
      >
        <g stroke="var(--border-strong)" strokeWidth="1" strokeOpacity="0.4">
          <circle cx="120" cy="120" r="112" />
          <circle cx="120" cy="120" r="84" />
        </g>
        <circle
          cx="120"
          cy="120"
          r="56"
          stroke="var(--accent)"
          strokeOpacity="0.4"
          strokeWidth="1.25"
        />
      </svg>

      <div className="relative mx-auto w-full max-w-[100rem] px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            {/* Small portrait, matching the About-page crop. Keeps the same
                face on every page without repeating a large image. */}
            <div className="flex items-center gap-3">
              <Portrait
                variant="chip"
                ratio="1 / 1"
                className="size-14 shrink-0"
              />
              <p className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="grid size-7 place-items-center rounded-md bg-accent font-mono text-[13px] font-bold text-accent-fg"
                >
                  A
                </span>
                <span className="font-mono text-sm font-semibold tracking-[0.18em] text-fg">
                  {site.name}
                </span>
              </p>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-secondary">
              {site.author} — {site.role}. Building modern, responsive web
              applications with React and Next.js.
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={`Footer: ${group.title}`}>
              <p className="label mb-3 text-fg-muted">{group.title}</p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-fg-secondary transition-colors hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="label mb-3 text-fg-muted">Elsewhere</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg"
                >
                  <GithubIcon className="size-4" />
                  GitHub
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg"
                >
                  <LinkedinIcon className="size-4" />
                  LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-fg"
                >
                  <Mail aria-hidden className="size-4" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-fg-secondary">
                <MapPin aria-hidden className="size-4 shrink-0" />
                {site.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="font-mono text-xs text-fg-muted">
            © {year} {site.name}. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}