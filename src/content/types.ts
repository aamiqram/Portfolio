export type Feature = {
  title: string;
  text: string;
};

export type DiagramNode = {
  label: string;
  detail?: string;
  tone?: "default" | "accent" | "info";
};

export type StatEntry = {
  label: string;
  value: string;
  note?: string;
};

export type LinkEntry = {
  label: string;
  href: string;
  detail: string;
};

/**
 * A typed, serialisable content block. Articles and project case studies share
 * this shape so both render through one documentation pipeline.
 */
export type ContentBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; id: string; text: string }
  | { kind: "h3"; id: string; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "features"; items: Feature[] }
  | { kind: "code"; lang: string; code: string; file?: string; caption?: string }
  | { kind: "callout"; tone: "note" | "warning" | "tip"; title?: string; text: string }
  | { kind: "quote"; text: string; by?: string }
  | { kind: "diagram"; nodes: DiagramNode[]; caption?: string; note?: string }
  | { kind: "stats"; items: StatEntry[]; caption?: string }
  | { kind: "links"; items: LinkEntry[] }
  | { kind: "table"; head: string[]; rows: string[][]; caption?: string }
  | { kind: "hr" };

export type TocEntry = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type ProjectCategory =
  | "Web Applications"
  | "E-Commerce"
  | "Full-Stack"
  | "AI Integration"
  | "Android"
  | "Experiments";

export type Contribution = "Team project" | "Individual project" | "Personal project";

export type Verification = "verified" | "reported";

export type TechKey =
  | "react"
  | "nextjs"
  | "javascript"
  | "typescript"
  | "tailwind"
  | "html5"
  | "css"
  | "node"
  | "express"
  | "socketio"
  | "postgresql"
  | "mongodb"
  | "prisma"
  | "jwt"
  | "zod"
  | "firebase"
  | "stripe"
  | "sslcommerz"
  | "cloudinary"
  | "jspdf"
  | "nodemailer"
  | "multer"
  | "recharts"
  | "tanstack"
  | "reactrouter"
  | "vite"
  | "git"
  | "github"
  | "vercel"
  | "kotlin"
  | "android";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "repo" | "profile";
};

/** Selects which abstract composition a project is drawn with. */
export type ProjectVisualVariant =
  | "commerce"
  | "storefront"
  | "marketplace"
  | "android";

export type ProjectScreenshot = {
  /** Path under `public/`. Captured from the project's own deployment. */
  src: string;
  /** Describes the visible page, for anyone who cannot see the image. */
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  /**
   * One or two capabilities worth knowing at a glance, in plain language. Used on
   * the directory card so a visitor learns what the product does before being
   * asked to read its stack. Kept short on purpose: the full feature list
   * belongs in the case study body.
   */
  highlights: string[];
  categories: ProjectCategory[];
  stack: string[];
  /** Keys into the technology inventory, used to render brand marks. */
  techKeys: TechKey[];
  visual: ProjectVisualVariant;
  /**
   * A real capture of the deployed application, when one exists. Preferred over
   * the abstract schematic, which stays as the fallback for projects with no
   * web deployment.
   */
  screenshot?: ProjectScreenshot;
  contribution: Contribution;
  status: string;
  role: string;
  links: ProjectLink[];
  /** What the reader can independently check, vs. what the developer reported. */
  verification: Verification;
  verificationNote: string;
  featured: boolean;
  order: number;
  body: ContentBlock[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  topic: string;
  tags: string[];
  /** ISO date. Omitted when it cannot be stated accurately. */
  updated?: string;
  related: string[];
  body: ContentBlock[];
};