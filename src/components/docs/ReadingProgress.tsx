"use client";

import { useSyncExternalStore } from "react";

function subscribe(listener: () => void) {
  window.addEventListener("scroll", listener, { passive: true });
  window.addEventListener("resize", listener, { passive: true });
  return () => {
    window.removeEventListener("scroll", listener);
    window.removeEventListener("resize", listener);
  };
}

/**
 * Reading progress through the article body, as a 0–1 ratio.
 *
 * Measured against the article element rather than the whole document, so the
 * bar fills when the last paragraph is reached instead of when the footer is.
 * The snapshot is a rounded number, which keeps re-renders to a handful per
 * scroll rather than one per pixel.
 */
function getProgress() {
  const article = document.querySelector<HTMLElement>("[data-article-body]");

  if (!article) return 0;

  const rect = article.getBoundingClientRect();
  const viewport = window.innerHeight;

  // Distance already scrolled through the article, clamped at both ends.
  const scrolled = -rect.top;
  const total = rect.height - viewport;

  if (total <= 0) return rect.top < 0 ? 1 : 0;

  const ratio = scrolled / total;

  return Math.min(1, Math.max(0, Math.round(ratio * 100) / 100));
}

export default function ReadingProgress() {
  const progress = useSyncExternalStore(
    subscribe,
    getProgress,
    () => 0
  );

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-16 z-40 h-px bg-transparent"
    >
      <div
        className="h-full origin-left bg-accent transition-[width] duration-150 ease-linear"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}