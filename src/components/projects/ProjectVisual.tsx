import Image from "next/image";
import { cx } from "@/lib/utils";

/**
 * Project visuals.
 *
 * Two kinds of visual, always labelled so they cannot be confused:
 *
 * - A capture of the project's own deployed build, used wherever a public
 *   deployment exists. This is the real interface.
 * - An abstract interface schematic, derived from facts read out of the public
 *   repository or deployed build, used for projects with no web deployment
 *   (AAMIQU is an Android app). Inventing screenshots or substituting stock
 *   photography would misrepresent the work, so the schematic is always
 *   captioned as a schematic.
 */

export type ProjectVisualVariant =
  | "commerce"
  | "storefront"
  | "marketplace"
  | "android";

type Screenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Props = {
  variant: ProjectVisualVariant;
  label: string;
  screenshot?: Screenshot;
  className?: string;
  /**
   * Responsive width hint for the capture. This has to describe the width the
   * image is actually rendered at in the calling layout, not the width of the
   * source file: the same visual appears roughly 640px wide inside a directory
   * card and roughly 1300px wide as a homepage feature, and an under-estimate
   * makes the browser fetch too small a file and upscale a visible blur.
   */
  sizes?: string;
};

/** A labelled placeholder block, used as interface furniture. */
function Block({
  x,
  y,
  w,
  h,
  tone = "line",
  radius = 3,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "line" | "fill" | "accent";
  radius?: number;
}) {
  const fill =
    tone === "accent"
      ? "var(--accent-soft)"
      : tone === "fill"
        ? "var(--surface-3)"
        : "none";

  const stroke =
    tone === "accent" ? "var(--accent)" : "var(--border-strong)";

  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={radius}
      fill={fill}
      stroke={stroke}
      strokeOpacity={tone === "accent" ? 0.55 : 0.42}
      strokeWidth="1"
    />
  );
}

function Label({
  x,
  y,
  children,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="fill-fg-muted font-mono"
      style={{ fontSize: 9, letterSpacing: "0.09em" }}
    >
      {children}
    </text>
  );
}

/** Shared chrome: a window frame with a title bar, so every visual reads as one family. */
function Frame({
  children,
  label,
  kind,
}: {
  children: React.ReactNode;
  label: string;
  kind: "schematic" | "capture";
}) {
  return (
    <figure
      className={cx(
        "group/visual relative overflow-hidden rounded-xl border border-line bg-surface-2",
        "shadow-1"
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-grid opacity-40"
        style={{ backgroundSize: "22px 22px" }}
      />

      <div className="relative flex items-center justify-between border-b border-line px-3 py-2">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-accent/70" />
          <span aria-hidden className="size-1.5 rounded-full bg-line-strong/50" />
          <span aria-hidden className="size-1.5 rounded-full bg-line-strong/30" />
        </span>
        <span className="label min-w-0 break-words text-right text-fg-muted">
          {label}
        </span>
        <span className="label shrink-0 text-fg-muted/70">
          {kind === "capture" ? "live capture" : "schematic"}
        </span>
      </div>

      <div className="relative">{children}</div>
    </figure>
  );
}

export default function ProjectVisual({
  variant,
  label,
  screenshot,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: Props) {
  if (screenshot) {
    return (
      <div className={className}>
        <Frame label={label} kind="capture">
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={screenshot.width}
            height={screenshot.height}
            sizes={sizes}
            className="block h-auto w-full"
          />
        </Frame>
      </div>
    );
  }

  return (
    <div className={className}>
      <Frame label={label} kind="schematic">
        <svg
          aria-hidden
          focusable="false"
          viewBox="0 0 400 250"
          className="block w-full"
          fill="none"
        >
          {variant === "commerce" ? (
            <>
              <Block x={16} y={16} w={368} h={26} tone="fill" />
              <Label x={28} y={33}>catalog / multi-vendor</Label>
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <Block x={16 + i * 94} y={54} w={82} h={62} />
                  <Block x={24 + i * 94} y={62} w={66} h={30} tone="fill" radius={2} />
                  <Block x={24 + i * 94} y={98} w={44} h={6} radius={2} />
                  <Block x={24 + i * 94} y={108} w={28} h={6} radius={2} />
                </g>
              ))}
              <Block x={16} y={128} w={180} h={54} />
              <Label x={28} y={146}>cart / totals</Label>
              <Block x={28} y={152} w={156} h={6} radius={2} />
              <Block x={28} y={164} w={120} h={6} radius={2} />
              <Block x={208} y={128} w={176} h={54} tone="accent" />
              <Label x={220} y={146}>checkout / stripe</Label>
              <Block x={220} y={152} w={152} h={6} radius={2} />
              <Block x={220} y={164} w={96} h={6} radius={2} />
              <Block x={16} y={194} w={368} h={40} />
              <Label x={28} y={212}>order status / socket.io</Label>
              <circle cx="352" cy="214" r="4" fill="var(--accent)" />
            </>
          ) : null}

          {variant === "storefront" ? (
            <>
              <Block x={16} y={16} w={230} h={126} />
              <Label x={28} y={34}>storefront / next.js</Label>
              <Block x={28} y={42} w={206} h={40} tone="fill" radius={2} />
              <Block x={28} y={90} w={96} h={40} tone="fill" radius={2} />
              <Block x={138} y={90} w={96} h={40} tone="fill" radius={2} />
              <Block x={16} y={154} w={112} h={80} tone="accent" />
              <Label x={28} y={174}>delivery zones</Label>
              <Block x={28} y={182} w={88} h={6} radius={2} />
              <Block x={28} y={196} w={64} h={6} radius={2} />
              <Block x={28} y={210} w={76} h={6} radius={2} />
              <Block x={140} y={154} w={112} h={80} />
              <Label x={152} y={174}>taka pricing</Label>
              <Block x={152} y={182} w={88} h={6} radius={2} />
              <Block x={152} y={196} w={56} h={6} radius={2} />
              <Block x={264} y={16} w={120} h={126} />
              <Label x={276} y={34}>api / express</Label>
              <Block x={276} y={44} w={96} h={20} tone="fill" radius={2} />
              <Block x={276} y={70} w={96} h={20} tone="fill" radius={2} />
              <Block x={276} y={96} w={96} h={20} tone="fill" radius={2} />
              <Block x={264} y={154} w={120} h={80} />
              <Label x={276} y={174}>sslcommerz</Label>
              <Block x={276} y={182} w={96} h={6} radius={2} />
              <Block x={276} y={196} w={72} h={6} radius={2} />
              <circle cx="360" cy="212" r="4" fill="var(--accent)" />
            </>
          ) : null}

          {variant === "marketplace" ? (
            <>
              <Block x={16} y={16} w={120} h={218} />
              <Label x={28} y={34}>browse / menus</Label>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Block
                  key={i}
                  x={28}
                  y={46 + i * 30}
                  w={96}
                  h={22}
                  tone={i === 1 ? "accent" : "fill"}
                  radius={2}
                />
              ))}
              <Block x={148} y={16} w={236} h={104} />
              <Label x={160} y={34}>cook profile</Label>
              <circle cx="176" cy="66" r="16" fill="var(--surface-3)" />
              <Block x={200} y={54} w={120} h={10} radius={2} />
              <Block x={200} y={72} w={84} h={8} radius={2} />
              <Block x={160} y={94} w={212} h={6} radius={2} />
              <Block x={160} y={106} w={150} h={6} radius={2} />
              <Block x={148} y={132} w={236} h={102} tone="accent" />
              <Label x={160} y={152}>order / stripe</Label>
              <Block x={160} y={162} w={212} h={8} radius={2} />
              <Block x={160} y={178} w={148} h={8} radius={2} />
              <Block x={160} y={194} w={180} h={8} radius={2} />
              <Block x={160} y={212} w={64} h={12} tone="fill" radius={2} />
            </>
          ) : null}

          {variant === "android" ? (
            <>
              <Block x={126} y={14} w={148} h={222} radius={14} />
              <Block x={140} y={34} w={120} h={72} tone="fill" radius={4} />
              <circle cx="200" cy="70" r="16" />
              <circle cx="200" cy="70" r="3" fill="var(--accent)" />
              <Label x={200} y={124} anchor="middle">player</Label>
              <Block x={140} y={132} w={120} h={5} radius={2} />
              <circle cx="186" cy="134.5" r="5" fill="var(--accent)" />
              <Label x={200} y={158} anchor="middle">watch progress</Label>
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <Block
                    x={140}
                    y={168 + i * 16}
                    w={120}
                    h={11}
                    tone={i === 0 ? "accent" : "fill"}
                    radius={2}
                  />
                </g>
              ))}
              <Label x={200} y={228} anchor="middle">kotlin / xml</Label>
            </>
          ) : null}
        </svg>
      </Frame>

      <p className="mt-2.5 font-mono text-[11px] leading-relaxed text-fg-muted">
        Schematic, drawn from verified project structure. Not a screenshot of the
        application.
      </p>
    </div>
  );
}