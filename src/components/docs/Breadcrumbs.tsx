import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = {
  href: string;
  label: string;
};

export default function Breadcrumbs({
  trail,
  current,
}: {
  trail: Crumb[];
  current: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-fg-muted">
        {trail.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            <Link href={crumb.href} className="hover:text-fg">
              {crumb.label}
            </Link>
            <ChevronRight aria-hidden className="size-3.5 shrink-0" />
          </li>
        ))}
        <li
          aria-current="page"
          className="min-w-0 break-words font-medium text-fg"
        >
          {current}
        </li>
      </ol>
    </nav>
  );
}