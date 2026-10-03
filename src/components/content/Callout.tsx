import { Info, TriangleAlert, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import InlineText from "./InlineText";

type CalloutProps = {
  tone: "note" | "warning" | "tip";
  title?: string;
  text: string;
};

const TONE: Record<
  CalloutProps["tone"],
  { icon: LucideIcon; label: string; className: string }
> = {
  note: {
    icon: Info,
    label: "Note",
    className: "border-l-info text-fg",
  },
  warning: {
    icon: TriangleAlert,
    label: "Warning",
    className: "border-l-warning text-fg",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    className: "border-l-success text-fg",
  },
};

export default function Callout({ tone, title, text }: CalloutProps) {
  const { icon: Icon, label, className } = TONE[tone];

  return (
    <aside
      className={`my-6 rounded-r-lg border border-line border-l-2 bg-surface px-4 py-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-current" />
        <div className="min-w-0 flex-1">
          <p className="label mb-1.5">
            {title ?? label}
            <span className="sr-only">: </span>
          </p>
          <p className="text-sm leading-relaxed text-fg-secondary">
            <InlineText text={text} />
          </p>
        </div>
      </div>
    </aside>
  );
}