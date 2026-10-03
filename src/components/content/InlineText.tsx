import type { ReactNode } from "react";

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/**
 * Renders the tiny inline markup used by the content blocks:
 * `[label](href)`, `` `code` `` and `**bold**`.
 *
 * A fresh regex is created per call so the module never holds mutable state,
 * which keeps concurrent renders from stepping on each other.
 */
export default function InlineText({ text }: { text: string }) {
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;
  const matches = Array.from(text.matchAll(pattern));

  if (matches.length === 0) {
    return <>{text}</>;
  }

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of matches) {
    const [full, linkLabel, linkHref, code, bold] = match;
    const start = match.index ?? 0;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    if (linkLabel !== undefined && linkHref !== undefined) {
      const external = isExternal(linkHref);
      nodes.push(
        <a
          key={key++}
          href={linkHref}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {linkLabel}
          {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
        </a>
      );
    } else if (code !== undefined) {
      nodes.push(<code key={key++}>{code}</code>);
    } else if (bold !== undefined) {
      nodes.push(<strong key={key++}>{bold}</strong>);
    } else {
      nodes.push(full);
    }

    lastIndex = start + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
}