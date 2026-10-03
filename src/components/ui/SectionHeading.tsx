import { cx } from "@/lib/utils";

type Props = {
  /**
   * `eyebrow` is the monospace `// label` above the heading. `page` is for a
   * route's `h1`; `section` is for a section's `h2`.
   */
  level: "page" | "section";
  eyebrow: string;
  children: React.ReactNode;
  id?: string;
  description?: React.ReactNode;
  /** Rendered on the right at the section level, e.g. a "see all" link. */
  action?: React.ReactNode;
  className?: string;
};

/**
 * The single heading treatment used across every route.
 *
 * Previously each section hand-rolled `text-2xl sm:text-3xl`, which is how the
 * same heading ended up at four different sizes on four different pages. One
 * component plus the `heading-*` classes in globals.css means a change to the
 * scale lands everywhere at once.
 *
 * The action sits in the same row as the heading rather than below it, and the
 * whole block collapses to a single column on narrow screens.
 */
export default function SectionHeading({
  level,
  eyebrow,
  children,
  id,
  description,
  action,
  className = "",
}: Props) {
  const isPage = level === "page";
  const Heading = isPage ? "h1" : "h2";

  return (
    <div
      className={cx(
        "flex flex-wrap items-end justify-between gap-x-8 gap-y-4",
        className
      )}
    >
      <div className={isPage ? "measure-narrow" : "measure"}>
        <p className="label text-accent-text">{eyebrow}</p>

        <Heading
          id={id}
          className={cx(
            "mt-3 tracking-tight text-fg",
            isPage ? "heading-page" : "heading-section"
          )}
        >
          {children}
        </Heading>

        {description ? (
          <div className="mt-4 text-base leading-relaxed text-fg-secondary">
            {description}
          </div>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}