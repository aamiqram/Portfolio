import { techGroups, type TechItem, type TechKey } from "@/content/tech";

const techItemByKey = new Map<string, TechItem>(
  techGroups.flatMap((group) => group.items).map((item) => [item.key, item])
);

/** Resolves a technology key to its inventory entry, or `undefined`. */
export function getTechItem(key: TechKey): TechItem | undefined {
  return techItemByKey.get(key);
}