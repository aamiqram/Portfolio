export type ClassValue = string | false | null | undefined;

/** Minimal class joiner. The project does not need a full `cn` dependency. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

/** Absolute URL helper so canonical/OG tags never produce a relative path. */
export function absoluteUrl(path: string, base: string): string {
  return new URL(path, base).toString();
}