import type { TechKey } from "./types";

export type { TechKey };

/**
 * Technology inventory. Every entry corresponds to something actually used in a
 * project in the directory above, or to a tool the deployed code was observed
 * loading. Items with no brand mark in the icon set fall back to a plain text
 * chip rather than an invented logo.
 */

export type TechItem = {
  key: TechKey;
  name: string;
  note?: string;
  /** Shown in the homepage strip. */
  primary?: boolean;
};

export type TechGroup = {
  id: string;
  title: string;
  summary: string;
  items: TechItem[];
};

export const techGroups: TechGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    summary:
      "The part I specialise in. Component composition, responsive layout, and keeping data fetching out of components.",
    items: [
      { key: "react", name: "React", primary: true },
      { key: "nextjs", name: "Next.js", primary: true },
      { key: "javascript", name: "JavaScript", primary: true },
      { key: "typescript", name: "TypeScript", primary: true },
      { key: "tailwind", name: "Tailwind CSS", primary: true },
      { key: "html5", name: "HTML5" },
      { key: "css", name: "CSS" },
      { key: "reactrouter", name: "React Router", note: "Local Chef Bazaar" },
      { key: "tanstack", name: "TanStack Query", note: "Local Chef Bazaar" },
      { key: "recharts", name: "Recharts", note: "Unity Shop, Local Chef Bazaar" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Real-Time",
    summary:
      "Enough backend to connect the interface to something real: REST services, authentication and a live channel where a product needs one.",
    items: [
      { key: "node", name: "Node.js", primary: true },
      { key: "express", name: "Express.js", primary: true },
      { key: "socketio", name: "Socket.IO", note: "Unity Shop" },
    ],
  },
  {
    id: "data",
    title: "Data & Persistence",
    summary:
      "Relational when the domain is relational, documents when it is not, and a typed access layer in both cases.",
    items: [
      { key: "postgresql", name: "PostgreSQL", primary: true },
      { key: "prisma", name: "Prisma", primary: true },
      { key: "mongodb", name: "MongoDB", primary: true },
    ],
  },
  {
    id: "auth",
    title: "Authentication & Validation",
    summary:
      "Identity, permissions and input contracts, with the API as the only authority.",
    items: [
      { key: "jwt", name: "JWT", primary: true },
      { key: "zod", name: "Zod", primary: true },
      { key: "firebase", name: "Firebase", primary: true },
    ],
  },
  {
    id: "payments",
    title: "Payments & Media",
    summary:
      "Checkout flows that work with the payment methods customers in this market actually use, plus the media pipeline around them.",
    items: [
      { key: "stripe", name: "Stripe" },
      { key: "sslcommerz", name: "SSLCommerz" },
      { key: "cloudinary", name: "Cloudinary" },
      { key: "jspdf", name: "jsPDF", note: "Unity Shop" },
      { key: "multer", name: "Multer", note: "Unity Shop" },
      { key: "nodemailer", name: "Nodemailer", note: "Unity Shop" },
    ],
  },
  {
    id: "tooling",
    title: "Tooling & Platforms",
    summary: "Version control, build tooling and where these things run.",
    items: [
      { key: "git", name: "Git", primary: true },
      { key: "github", name: "GitHub" },
      { key: "vite", name: "Vite", note: "Local Chef Bazaar" },
      { key: "vercel", name: "Vercel" },
    ],
  },
  {
    id: "mobile",
    title: "Android",
    summary:
      "One native project, kept for the sake of understanding the platform rather than the browser.",
    items: [
      { key: "kotlin", name: "Kotlin", primary: true },
      { key: "android", name: "Android", primary: true },
    ],
  },
];

export const primaryTech: TechItem[] = techGroups
  .flatMap((group) => group.items)
  .filter((item) => item.primary);

export function getTechGroups(): TechGroup[] {
  return techGroups;
}