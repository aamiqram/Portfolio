import type { ReactNode } from "react";
import type { TocEntry } from "@/content/types";
import DocsNav from "./DocsNav";
import DocsMobileNav from "./DocsMobileNav";
import ReadingProgress from "./ReadingProgress";
import TableOfContents from "./TableOfContents";
import type { DocNavSection } from "./nav";

type DocsShellProps = {
  sections: DocNavSection[];
  currentHref: string;
  toc: TocEntry[];
  header: ReactNode;
  children: ReactNode;
  /** Rendered under the article, inside the main column. */
  footer?: ReactNode;
};

/**
 * Three-area documentation layout: section nav, content, table of contents.
 * The left rail appears from `lg`; the table of contents joins at 1200px,
 * where all three columns still leave a readable article measure. Below that,
 * the existing contents drawer stays available.
 */
export default function DocsShell({
  sections,
  currentHref,
  toc,
  header,
  children,
  footer,
}: DocsShellProps) {
  return (
    <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-6 lg:px-8">
      <ReadingProgress />
      <div className="grid items-start gap-x-8 lg:grid-cols-[11rem_minmax(0,1fr)] docs:grid-cols-[11rem_minmax(0,1fr)_12rem]">
        {/* Left rail: section navigation */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10 pr-1">
            <DocsNav sections={sections} currentHref={currentHref} />
          </div>
        </aside>

        {/* Main column */}
        <div className="min-w-0 py-8 sm:py-10">
          <div className="mb-6 docs:hidden">
            <DocsMobileNav sections={sections} currentHref={currentHref} toc={toc} />
          </div>

          <div className="max-w-3xl lg:max-w-[52rem] docs:max-w-3xl">{header}</div>

          <div className="mt-8 max-w-3xl lg:max-w-[52rem] docs:max-w-3xl">
            {children}
          </div>

          {footer ? (
            <div className="mt-14 max-w-3xl lg:max-w-[52rem] docs:max-w-3xl">
              {footer}
            </div>
          ) : null}
        </div>

        {/* Right rail: table of contents */}
        <aside className="hidden docs:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10 pl-1">
            <TableOfContents entries={toc} />
          </div>
        </aside>
      </div>
    </div>
  );
}
