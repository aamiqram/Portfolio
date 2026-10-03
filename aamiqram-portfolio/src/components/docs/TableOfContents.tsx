"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/content/types";

/**
 * Table of contents with an active-heading indicator, built on IntersectionObserver
 * so it costs nothing until the article is on screen. The parent shell only
 * renders this rail from 1200px, once the article and both navigation rails fit.
 */
export default function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (entries.length === 0) return;

    const elements = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          const id = record.target.id;
          if (record.isIntersecting) {
            visible.add(id);
          } else {
            visible.delete(id);
          }
        }

        const firstVisible = entries.find((entry) => visible.has(entry.id));
        if (firstVisible) setActiveId(firstVisible.id);
      },
      // Bias the viewport towards the top so the current section resolves early.
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    for (const element of elements) observer.observe(element);

    const onScroll = () => {
      if (window.scrollY < 120) setActiveId(entries[0].id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-labelledby="toc-heading" className="text-sm">
      <h2
        id="toc-heading"
        className="label mb-3 text-fg-muted"
      >
        On this page
      </h2>
      <ul className="space-y-1 border-l border-line">
        {entries.map((entry) => {
          const isActive = activeId === entry.id;

          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1 leading-snug transition-colors ${
                  entry.level === 3 ? "pl-6" : "pl-3"
                } ${
                  isActive
                    ? "border-accent font-medium text-accent-text"
                    : "border-transparent text-fg-muted hover:border-line-strong hover:text-fg"
                }`}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
