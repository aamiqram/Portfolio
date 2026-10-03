export type DocNavItem = {
  href: string;
  label: string;
  meta?: string;
};

export type DocNavSection = {
  title: string;
  items: DocNavItem[];
};