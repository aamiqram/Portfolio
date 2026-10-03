import Link from "next/link";
import type { DocNavSection } from "./nav";

/**
 * Secondary navigation for the documentation areas. Used by the persistent
 * desktop sidebar and by the mobile drawer.
 */
export default function DocsNav({
  sections,
  currentHref,
  headingId = "section-nav-heading",
  onNavigate,
}: {
  sections: DocNavSection[];
  currentHref: string;
  headingId?: string;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-labelledby={headingId} className="text-sm">
      <h2 id={headingId} className="sr-only">
        Section
      </h2>
      <ul className="space-y-6">
        {sections.map((section) => (
          <li key={section.title}>
            <p className="label mb-2 text-fg-muted">{section.title}</p>
            <ul className="space-y-0.5 border-l border-line">
              {section.items.map((item) => {
                const isActive = item.href === currentHref;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={isActive ? "page" : undefined}
                      className={`-ml-px flex flex-col gap-0.5 border-l-2 py-1.5 pl-3 pr-2 transition-colors ${
                        isActive
                          ? "border-accent text-accent-text"
                          : "border-transparent text-fg-secondary hover:border-line-strong hover:text-fg"
                      }`}
                    >
                      <span className="leading-snug">{item.label}</span>
                      {item.meta ? (
                        <span className="font-mono text-[11px] text-fg-muted">
                          {item.meta}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}