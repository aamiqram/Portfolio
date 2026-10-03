import type { ContentBlock, TocEntry } from "@/content/types";

/** Derives the table of contents from the `h2`/`h3` blocks in a body. */
export function extractToc(blocks: ContentBlock[]): TocEntry[] {
  const entries: TocEntry[] = [];

  for (const block of blocks) {
    if (block.kind === "h2") {
      entries.push({ id: block.id, text: block.text, level: 2 });
    } else if (block.kind === "h3") {
      entries.push({ id: block.id, text: block.text, level: 3 });
    }
  }

  return entries;
}

/** Every reader-facing string in a body, for word counts and search indexing. */
export function extractText(blocks: ContentBlock[]): string {
  const parts: string[] = [];

  const push = (value: string) => parts.push(value.replace(/[`*_]/g, " "));

  for (const block of blocks) {
    switch (block.kind) {
      case "p":
      case "quote":
        push(block.text);
        break;
      case "h2":
      case "h3":
        push(block.text);
        break;
      case "ul":
      case "ol":
        block.items.forEach(push);
        break;
      case "features":
        block.items.forEach((item) => {
          push(item.title);
          push(item.text);
        });
        break;
      case "code":
        parts.push(block.code);
        if (block.file) parts.push(block.file);
        break;
      case "callout":
        if (block.title) push(block.title);
        push(block.text);
        break;
      case "diagram":
        block.nodes.forEach((node) => {
          push(node.label);
          if (node.detail) push(node.detail);
        });
        if (block.caption) push(block.caption);
        if (block.note) push(block.note);
        break;
      case "stats":
        block.items.forEach((item) => {
          push(item.label);
          parts.push(item.value);
          if (item.note) push(item.note);
        });
        break;
      case "links":
        block.items.forEach((item) => {
          push(item.label);
          push(item.detail);
        });
        break;
      case "table":
        block.head.forEach(push);
        block.rows.forEach((row) => row.forEach(push));
        break;
      case "hr":
        break;
    }
  }

  return parts.join(" ");
}

/** Stable slug for a heading, matching `slugify`. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}