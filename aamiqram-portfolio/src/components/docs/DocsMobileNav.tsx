"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { List, X } from "lucide-react";
import type { TocEntry } from "@/content/types";
import type { DocNavSection } from "./nav";

/**
 * Drawer holding the documentation section nav and, on long articles, the table
 * of contents. Closes on Escape, on route change, and when focus leaves.
 */
export default function DocsMobileNav({
  sections,
  currentHref,
  toc,
}: {
  sections: DocNavSection[];
  currentHref: string;
  toc: TocEntry[];
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-sm font-medium text-fg transition-colors hover:border-line-strong docs:hidden"
      >
        <List aria-hidden className="size-4" />
        Contents
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] docs:hidden">
          <button
            type="button"
            aria-label="Close contents"
            onClick={close}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Documentation contents"
            className="absolute inset-y-0 left-0 flex w-[min(20rem,85vw)] flex-col border-r border-line bg-canvas"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="label text-fg-muted">Contents</p>
              <button
                type="button"
                onClick={close}
                aria-label="Close contents"
                className="rounded-md border border-line p-1.5 text-fg-secondary transition-colors hover:border-line-strong hover:text-fg"
              >
                <X aria-hidden className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
              <DocsNavList
                sections={sections}
                currentHref={currentHref}
                onNavigate={close}
              />

              {toc.length > 0 ? (
                <div className="mt-7 border-t border-line pt-5">
                  <p className="label mb-2 text-fg-muted">On this page</p>
                  <ul className="space-y-1">
                    {toc.map((entry) => (
                      <li key={entry.id}>
                        <a
                          href={`#${entry.id}`}
                          onClick={close}
                          className={`block py-1 leading-snug text-fg-secondary hover:text-fg ${
                            entry.level === 3 ? "pl-4" : ""
                          }`}
                        >
                          {entry.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function DocsNavList({
  sections,
  currentHref,
  onNavigate,
}: {
  sections: DocNavSection[];
  currentHref: string;
  onNavigate: () => void;
}) {
  return (
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
                    className={`-ml-px block border-l-2 py-1.5 pl-3 ${
                      isActive
                        ? "border-accent text-accent-text"
                        : "border-transparent text-fg-secondary hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}
