import { ArrowRight } from "lucide-react";
import type { DiagramNode } from "@/content/types";

type DiagramProps = {
  nodes: DiagramNode[];
  caption?: string;
  note?: string;
};

const TONE_CLASS: Record<NonNullable<DiagramNode["tone"]>, string> = {
  default: "bg-surface-2 text-fg-secondary",
  accent: "bg-accent-soft text-fg border-accent/40",
  info: "bg-surface-3 text-fg-secondary",
};

/**
 * A deliberately plain architecture strip: labelled boxes connected by
 * directional markers, reflowing to a single column on narrow screens.
 */
export default function Diagram({ nodes, caption, note }: DiagramProps) {
  if (nodes.length === 0) return null;

  return (
    <figure className="not-prose my-6">
      <div className="rounded-lg border border-line bg-surface p-4">
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))] lg:gap-0">
          {nodes.map((node, index) => (
            <li key={`${node.label}-${index}`} className="relative flex items-stretch">
              <div
                className={`flex w-full flex-col justify-center rounded-md border border-line px-3 py-3 ${
                  TONE_CLASS[node.tone ?? "default"]
                }`}
              >
                <span className="label mb-1 text-fg-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold leading-snug text-fg">
                  {node.label}
                </span>
                {node.detail ? (
                  <span className="mt-0.5 font-mono text-[11px] leading-relaxed text-fg-muted">
                    {node.detail}
                  </span>
                ) : null}
              </div>
              {index < nodes.length - 1 ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-line-strong lg:block"
                >
                  <ArrowRight className="size-4" />
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
      {caption ? (
        <figcaption className="mt-2 text-xs text-fg-secondary">{caption}</figcaption>
      ) : null}
      {note ? <p className="mt-1.5 text-xs text-fg-muted">{note}</p> : null}
    </figure>
  );
}