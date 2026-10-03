"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { primaryNav, site } from "@/content/site";
import { cx } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

/**
 * Reads scroll position through `useSyncExternalStore` rather than an effect,
 * so a scroll cannot cause a state update inside an effect body. The snapshot
 * is a boolean, which means React only re-renders when the answer flips.
 */
function subscribeToScroll(listener: () => void) {
  window.addEventListener("scroll", listener, { passive: true });
  return () => window.removeEventListener("scroll", listener);
}

function useHasScrolled() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 12,
    () => false
  );
}

function useActivePath() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useHasScrolled();
  /**
   * The drawer records the path it was opened on, so navigating anywhere closes
   * it as a plain derivation rather than through an effect.
   */
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const isActive = useActivePath();

  const close = () => setOpenAt(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        // Only once the page has moved does the bar become glass, so the hero
        // is not immediately covered by a frosted panel.
        scrolled
          ? "glass-bottom border-glass-line shadow-1"
          : "border-transparent bg-canvas"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[100rem] items-center gap-4 px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-fg"
          aria-label={`${site.name} home`}
        >
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-md bg-accent font-mono text-[13px] font-bold text-accent-fg transition-transform duration-200 hover:scale-105"
          >
            A
          </span>
          <span className="font-mono text-sm font-semibold tracking-[0.18em]">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "relative block rounded-md px-3 py-2 text-sm transition-colors duration-200",
                      active
                        ? "font-medium text-fg"
                        : "text-fg-secondary hover:text-fg"
                    )}
                  >
                    {item.label}
                    {/* Active indicator. Reserves no extra space, so nothing shifts. */}
                    <span
                      aria-hidden
                      className={cx(
                        "absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ease-expo",
                        active ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="hidden size-8 items-center justify-center rounded-md border border-line text-fg-secondary transition-colors hover:border-line-strong hover:text-fg sm:inline-flex"
          >
            <GithubIcon className="size-4" />
          </a>

          <ThemeToggle />

          <Link
            href="/contact"
            className="hidden rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 sm:inline-block"
          >
            Contact
          </Link>

          <button
            type="button"
            onClick={() => setOpenAt(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-8 items-center justify-center rounded-md border border-line text-fg transition-colors hover:border-line-strong lg:hidden"
          >
            {open ? (
              <X aria-hidden className="size-4" />
            ) : (
              <Menu aria-hidden className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="glass border-t border-glass-line lg:hidden"
      >
        <nav aria-label="Primary mobile" className="px-5 py-4">
          <ul className="flex flex-col">
            {primaryNav.map((item) => {
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between border-b border-line py-3 text-base transition-colors ${
                      active ? "text-accent-text" : "text-fg"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
            <li>
<Link
              href="/contact"
              onClick={close}
              className="mt-4 block rounded-md bg-accent px-4 py-3 text-center text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-md border border-line px-4 py-3 text-sm text-fg-secondary transition-colors hover:border-line-strong hover:text-fg"
              >
                <GithubIcon className="size-4" />
                GitHub Profile
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}