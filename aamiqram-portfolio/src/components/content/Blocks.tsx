import type { Feature, StatEntry } from "@/content/types";
import InlineText from "./InlineText";

export function FeatureList({ items }: { items: Feature[] }) {
  return (
    <ul className="not-prose my-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.title}
          className="rounded-lg border border-line bg-surface px-4 py-3.5"
        >
          <h3 className="mb-1 text-sm font-semibold text-fg">{item.title}</h3>
          <p className="text-sm leading-relaxed text-fg-secondary">
            <InlineText text={item.text} />
          </p>
        </li>
      ))}
    </ul>
  );
}

export function StatGrid({
  items,
  caption,
}: {
  items: StatEntry[];
  caption?: string;
}) {
  return (
    <figure className="not-prose my-6">
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-line bg-surface px-4 py-3"
          >
            <dt className="label text-fg-muted">{item.label}</dt>
            <dd className="mt-1.5 font-mono text-lg font-semibold text-fg">
              {item.value}
            </dd>
            {item.note ? (
              <p className="mt-1 text-xs leading-relaxed text-fg-muted">{item.note}</p>
            ) : null}
          </div>
        ))}
      </dl>
      {caption ? (
        <figcaption className="mt-2 text-xs text-fg-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function ContentTable({
  head,
  rows,
  caption,
}: {
  head: string[];
  rows: string[][];
  caption?: string;
}) {
  return (
    <figure className="not-prose my-6">
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-surface">
              {head.map((cell) => (
                <th
                  key={cell}
                  scope="col"
                  className="label whitespace-nowrap px-4 py-3 text-fg-secondary"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-line last:border-0">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${rowIndex}-${cellIndex}`}
                    className={`px-4 py-3 align-top leading-relaxed ${
                      cellIndex === 0
                        ? "font-medium text-fg"
                        : "text-fg-secondary"
                    }`}
                  >
                    <InlineText text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? (
        <figcaption className="mt-2 text-xs text-fg-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}