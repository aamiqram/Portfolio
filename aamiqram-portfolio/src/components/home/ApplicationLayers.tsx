"use client";

import { useState } from "react";
import HeroGeometry from "./HeroGeometry";

const LAYERS = [
  { id: "interface", label: "Interface", detail: "React · Next.js" },
  { id: "logic", label: "Application logic", detail: "Node.js · Express" },
  {
    id: "data",
    label: "Data & access",
    detail: "PostgreSQL · Prisma · MongoDB",
  },
  {
    id: "integrations",
    label: "Integrations",
    detail: "Payments · Real-time · AI",
  },
] as const;

/**
 * The hero's signature moment: the application stack drawn as nested layers
 * with a live readout beside it.
 *
 * Each ring in the diagram is one of the four rows, in order, outermost first.
 * Hovering or focusing a row raises its ring to crimson, which is what makes the
 * drawing legible as an explanation rather than a texture. Focus behaves exactly
 * like hover, so the interaction is reachable from the keyboard, and the readout
 * is a real ordered list that still reads correctly with no pointer at all.
 *
 * `FIGURE / 01` lives in a grid rail rather than an absolute offset, so it stays
 * centred against the panel at every width instead of only at the one it was
 * tuned for.
 */
export default function ApplicationLayers() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative grid items-center gap-x-6 xl:grid-cols-[auto_minmax(0,1fr)]">
      {/*
        Metadata rail. Only appears when there is room for it, and it is a grid
        item, so `self-center` aligns it to the panel's optical middle at any
        size. No magic offsets.

        No `order-*` here: the rail is already `hidden` below `xl`, so source
        order can stay rail-then-panel. Adding `order-1`/`order-0` would place
        the panel in the `auto` track and the rail in the `minmax(0,1fr)`
        track, which collapses the rail to zero width.
      */}
      <p
        aria-hidden
        className="label hidden self-center -rotate-90 whitespace-nowrap text-fg-muted xl:block"
      >
        figure / 01
      </p>

      <div className="relative">
        {/*
          Geometry. Centred on the panel, and sized so the outer ring overhangs
          by roughly 5% — which lands inside the page padding at every
          breakpoint, so the ring is never clipped by the section's overflow.
          Painted before the panel in source order rather than pulled behind it
          with a negative z-index, which would risk sliding under the section
          background.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2"
        >
          <HeroGeometry active={active} />
        </div>

        <div className="glass rounded-2xl p-4 shadow-2 sm:p-5">
          <div className="flex items-baseline justify-between gap-3 border-b border-glass-line pb-3">
            <p className="label text-fg-muted">Application layers</p>
            <span className="font-mono text-[11px] tabular-nums text-fg-muted">
              {active === null ? "4 rings" : `ring ${active + 1} / 4`}
            </span>
          </div>

          <ol className="mt-4 flex flex-col gap-2">
            {LAYERS.map((layer, index) => {
              const isActive = active === index;

              return (
                <li
                  key={layer.id}
                  className="geo-row"
                  style={{ "--geo-delay": `${520 + index * 70}ms` } as React.CSSProperties}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(index)}
                    onBlur={() => setActive(null)}
                    className={`press flex w-full items-baseline justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left transition-colors duration-200 ${
                      isActive
                        ? "border-accent bg-accent-soft"
                        : "border-glass-line hover:border-line-strong"
                    }`}
                  >
                    <span className="flex min-w-0 items-baseline gap-2.5">
                      <span
                        className={`font-mono text-[11px] tabular-nums transition-colors ${
                          isActive ? "text-accent-text" : "text-fg-muted"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isActive ? "text-accent-text" : "text-fg"
                        }`}
                      >
                        {layer.label}
                      </span>
                    </span>

                    {/*
                      Wrapped rather than `shrink-0`, so a long technology list
                      drops under the label on a narrow screen instead of
                      overlapping it.
                    */}
                    <span className="font-mono text-[11px] leading-relaxed text-fg-muted">
                      {layer.detail}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-4 border-t border-glass-line pt-3">
            <p className="font-mono text-[11px] leading-relaxed text-fg-muted">
              Rings run outward in, interface to integrations. A simplified view
              of the shape of the work, not a claim that every project uses every
              layer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
