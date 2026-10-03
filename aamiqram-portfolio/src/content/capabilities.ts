export type CapabilityKey =
  | "frontend"
  | "fullstack"
  | "data"
  | "security"
  | "integrations"
  | "mobile";

export type Capability = {
  key: CapabilityKey;
  title: string;
  summary: string;
  points: string[];
};

export const capabilities: Capability[] = [
  {
    key: "frontend",
    title: "Frontend Engineering",
    summary:
      "The primary specialisation. Interfaces that stay readable and usable from a 320px phone to a wide desktop.",
    points: [
      "Responsive interfaces built with CSS Grid, Flexbox and Tailwind CSS",
      "React and Next.js application development",
      "Component composition and genuinely reusable UI",
      "Server state with TanStack Query, client state kept separate",
      "Semantic HTML, keyboard access and visible focus",
    ],
  },
  {
    key: "fullstack",
    title: "Full-Stack Application Development",
    summary:
      "Connecting a frontend to a service that behaves predictably, so the whole product can be reasoned about.",
    points: [
      "REST APIs and multi-step application workflows",
      "Node.js and Express service layers",
      "Authentication and role-based authorisation",
      "Media upload and transactional email pipelines",
      "Deployment as serverless functions on Vercel",
    ],
  },
  {
    key: "data",
    title: "Data Modelling & Persistence",
    summary:
      "Choosing the store that matches the domain, then making the schema do the integrity work.",
    points: [
      "PostgreSQL with Prisma for relational domains",
      "MongoDB with Mongoose for document-shaped domains",
      "Modelling orders, line items, variants and stock",
      "Input contracts with Zod at the route boundary",
      "Pricing and eligibility rules as pure functions",
    ],
  },
  {
    key: "security",
    title: "Authentication & Access Control",
    summary:
      "Identity and permissions, with the API as the only authority and validation at the edge.",
    points: [
      "JWT-based authentication and cookie handling",
      "Role-based access for customer, seller and administrative paths",
      "Request payload validation with Zod schemas",
      "Secret and publishable key separation between client and server",
      "Honest scope: application-level access control, not a security audit",
    ],
  },
  {
    key: "integrations",
    title: "Integrations & Real-Time Features",
    summary:
      "Third-party services wired into a usable interface, rather than sitting behind it.",
    points: [
      "Payment checkout with Stripe and SSLCommerz",
      "Local payment methods surfaced in the checkout flow",
      "Socket.IO for live order and notification events",
      "Cloudinary and Multer for product media",
      "Transactional email for order and account flows",
    ],
  },
  {
    key: "mobile",
    title: "Android & Native Work",
    summary:
      "One Kotlin application, maintained to understand what happens below the browser.",
    points: [
      "Kotlin with XML layouts",
      "Media playback and playback controls",
      "Watch progress persistence and episode navigation",
      "Skip-intro and skip-outro handling",
      "Compatibility work for older Android versions",
    ],
  },
];