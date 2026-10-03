import Image from "next/image";

/**
 * Real portrait of the site owner.
 *
 * Source of truth is the photograph the owner supplied, copied to
 * `public/images/iqram-profile.png`. The file itself is never processed or
 * edited here; every crop is done with CSS so replacing it later means dropping
 * in a new file, not re-running a build step.
 *
 * Rendered on the server. There is no client component and no state, so a
 * static portrait costs no JavaScript.
 */
const PORTRAIT = {
  src: "/images/iqram-profile.png",
  alt: "Portrait of Abu Abdullah Md Iqram",
  /** Intrinsic size of the supplied file, used to reserve space and avoid layout shift. */
  width: 1123,
  height: 1400,
} as const;

type Frame = "editorial" | "chip";

type Props = {
  /**
   * `editorial` is the large About-page portrait: a natural rectangular crop.
   * `chip` is the small consistent avatar used in the footer.
   */
  variant?: Frame;
  /** Aspect ratio of the frame. Cropping happens in CSS, not in the file. */
  ratio?: string;
  /**
   * Overrides the responsive `srcset` hint. Supply this when the portrait is
   * rendered noticeably narrower or wider than the default assumes, so the
   * browser does not download a larger file than the frame can show.
   */
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export default function Portrait({
  variant = "editorial",
  ratio = "4 / 5",
  sizes,
  className = "",
  priority = false,
}: Props) {
  const chip = variant === "chip";

  return (
    <figure
      className={`relative isolate overflow-hidden border border-line bg-surface-2 shadow-1 ${className}`}
      style={{ borderRadius: chip ? "0.75rem" : "1rem" }}
    >
      {/* Soft crimson ambient accent, kept behind the frame edge and low
          opacity so the photograph stays the focus. `isolate` on the frame
          keeps this behind the content without it sliding under the page
          background, which a bare negative z-index would do. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] bg-accent/15 blur-xl"
      />

      <span
        className="relative block overflow-hidden"
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={PORTRAIT.src}
          alt={PORTRAIT.alt}
          width={PORTRAIT.width}
          height={PORTRAIT.height}
          sizes={
            sizes ??
            (chip
              ? "56px"
              : "(min-width: 1024px) 22rem, (min-width: 640px) 40vw, 100vw")
          }
          priority={priority}
          className="h-full w-full object-cover"
        />
      </span>
    </figure>
  );
}