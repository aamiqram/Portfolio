import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { primaryNav } from "@/content/site";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-5 py-20 sm:px-6">
      <p className="label text-accent-text">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        This page does not exist
      </h1>
      <p className="mt-4 text-base leading-relaxed text-fg-secondary">
        The URL you followed is not part of this site. It may have been renamed,
        or the link that sent you here was wrong.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Back to home
        </Link>
        {primaryNav.slice(1).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex items-center rounded-md border border-line px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-line-strong"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}