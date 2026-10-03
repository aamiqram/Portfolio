import Link from "next/link";
import {
  Code2,
  Database,
  LayoutTemplate,
  Lock,
  PlugZap,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { capabilities, type CapabilityKey } from "@/content/capabilities";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS: Record<CapabilityKey, LucideIcon> = {
  frontend: LayoutTemplate,
  fullstack: Code2,
  data: Database,
  security: Lock,
  integrations: PlugZap,
  mobile: Smartphone,
};

export default function Capabilities() {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="border-b border-line"
    >
      <div className="mx-auto w-full max-w-[100rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          level="section"
          eyebrow="// Capabilities"
          id="capabilities-heading"
          description="My specialisation is the interface. The rest of these areas exist because a product needs them to work, not because I am claiming to be primarily a backend engineer."
        >
          What I work on
        </SectionHeading>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = ICONS[capability.key];

            return (
              <li
                key={capability.key}
                className="group relative isolate overflow-hidden rounded-xl border border-line bg-surface p-5 shadow-1 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift"
              >
                {/* Accent wash that only appears on hover, so the resting grid
                    stays flat and calm. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-accent/[0.07] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <span className="mb-4 grid size-9 place-items-center rounded-lg border border-line bg-canvas text-accent-text transition-[border-color,transform] duration-300 group-hover:-rotate-6 group-hover:border-accent/50">
                  <Icon aria-hidden className="size-[18px]" />
                </span>

                <h3 className="text-base font-semibold text-fg">
                  {capability.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                  {capability.summary}
                </p>

                <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                  {capability.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 text-[13px] leading-relaxed text-fg-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.55em] size-1 shrink-0 rounded-[1px] bg-accent/70"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-sm text-fg-muted">
          Wondering whether a specific technology is in scope?{" "}
          <Link
            href="/tech-stack"
            className="text-accent-text underline underline-offset-4"
          >
            See the full inventory
          </Link>
          .
        </p>
      </div>
    </section>
  );
}