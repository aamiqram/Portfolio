import type { ContentBlock } from "@/content/types";
import { extractText } from "./content";

const WORDS_PER_MINUTE = 220;

/** Reading time in whole minutes, floored at 1. */
export function readingTime(blocks: ContentBlock[]): number {
  const words = extractText(blocks).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return DATE_FORMAT.format(date);
}