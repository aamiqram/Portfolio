const CENTER = 320;

/**
 * Ring radii, outermost first. Each one is a layer, in the same order as the
 * rows in the panel beside it: the surface you touch is the outside, the data
 * is deepest. That correspondence is the entire point of the drawing — hovering
 * a row highlights the ring it stands for, so the diagram is a legend rather
 * than decoration.
 */
export const LAYER_RADII = [286, 232, 178, 124] as const;

export default function HeroGeometry({ active }: { active: number | null }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 640 640"
      className="size-full"
      fill="none"
    >
      <defs>
        <radialGradient id="geo-haze" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--fg)" stopOpacity="0.09" />
          <stop offset="70%" stopColor="var(--fg)" stopOpacity="0.035" />
          <stop offset="100%" stopColor="var(--fg)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={CENTER} cy={CENTER} r="290" fill="url(#geo-haze)" />

      {/* One ring per layer. Drawn on entrance, then left perfectly still. */}
      {LAYER_RADII.map((radius, index) => {
        const isActive = active === index;
        const circumference = 2 * Math.PI * radius;

        return (
          <circle
            key={radius}
            cx={CENTER}
            cy={CENTER}
            r={radius}
            stroke={isActive ? "var(--accent)" : "var(--border-strong)"}
            strokeOpacity={isActive ? 0.95 : active === null ? 0.28 : 0.16}
            strokeWidth={isActive ? 1.5 : 1}
            strokeDasharray={circumference}
            strokeDashoffset={0}
            vectorEffect="non-scaling-stroke"
            className="geo-ring transition-[stroke,stroke-opacity,stroke-width] duration-500 ease-expo"
            style={
              {
                "--geo-delay": `${180 + index * 90}ms`,
                "--geo-circumference": circumference,
              } as React.CSSProperties
            }
          />
        );
      })}

      {/*
        Eight registration ticks on the outer ring only, so the drawing has a
        scale without turning into a measuring instrument. Static, and every
        fourth one carries the crimson accent.
      */}
      <g stroke="var(--border-strong)" strokeOpacity="0.5" strokeWidth="1">
        {Array.from({ length: 8 }, (_, index) => {
          const rad = (index * 45 * Math.PI) / 180;
          const major = index % 2 === 0;

          return (
            <line
              key={index}
              x1={CENTER + Math.cos(rad) * (major ? 268 : 274)}
              y1={CENTER + Math.sin(rad) * (major ? 268 : 274)}
              x2={CENTER + Math.cos(rad) * 282}
              y2={CENTER + Math.sin(rad) * 282}
              stroke={major ? "var(--accent)" : "var(--border-strong)"}
              strokeOpacity={major ? 0.55 : 0.4}
              vectorEffect="non-scaling-stroke"
              className="geo-tick transition-opacity duration-500"
              style={{ "--geo-delay": `${420 + index * 40}ms` } as React.CSSProperties}
            />
          );
        })}
      </g>

      {/*
        Core marker. The only thing on the page that keeps breathing: a slow
        opacity pulse, no rotation.
      */}
      <g className="geo-pulse">
        <circle
          cx={CENTER}
          cy={CENTER}
          r="34"
          stroke="var(--accent)"
          strokeOpacity="0.4"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={CENTER} cy={CENTER} r="4" fill="var(--accent)" fillOpacity="0.85" />
      </g>
    </svg>
  );
}
