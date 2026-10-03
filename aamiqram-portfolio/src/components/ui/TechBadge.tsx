import { TECH_ICONS } from "@/components/ui/TechIcon";
import { cx } from "@/lib/utils";
import type { TechItem } from "@/content/tech";

type Props = {
  item: TechItem;
  size?: "sm" | "md";
  className?: string;
};

/** One technology mark, falling back to a monogram chip when no brand mark exists. */
export default function TechBadge({ item, size = "md", className }: Props) {
  const Icon = TECH_ICONS[item.key];
  const iconSize = size === "sm" ? "size-4" : "size-[18px]";

  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-md border border-line bg-surface px-2.5 py-1.5 text-fg-secondary transition-colors hover:border-line-strong hover:text-fg",
        className
      )}
    >
      {Icon ? (
        <Icon aria-hidden className={cx(iconSize, "shrink-0")} />
      ) : (
        <span
          aria-hidden
          className={cx(
            "grid shrink-0 place-items-center rounded-sm bg-surface-3 font-mono font-semibold uppercase text-fg-muted",
            size === "sm" ? "size-4 text-[9px]" : "size-[18px] text-[10px]"
          )}
        >
          {item.name.charAt(0)}
        </span>
      )}
      <span className={size === "sm" ? "text-xs" : "text-sm"}>{item.name}</span>
    </span>
  );
}