"use client";

import { useEffect } from "react";

/**
 * Stops the ambient geometry from animating while the tab is in the
 * background. The attribute is written directly to the document because it is
 * external state, not component state — so nothing here can trigger a render.
 *
 * `prefers-reduced-motion` is handled entirely in CSS and needs no script.
 */
export default function MotionGate() {
  useEffect(() => {
    const root = document.documentElement;

    const sync = () => {
      if (document.hidden) {
        root.setAttribute("data-motion-paused", "true");
      } else {
        root.removeAttribute("data-motion-paused");
      }
    };

    sync();
    document.addEventListener("visibilitychange", sync);

    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return null;
}