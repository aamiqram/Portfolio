import type { Project, ProjectCategory } from "./types";

/**
 * Every factual claim below is tagged with how it was established:
 *
 *  - "verified"  the linked public repository or the deployed site's own output
 *                was read directly while writing this entry.
 *  - "reported"  described by the developer and not independently checked,
 *                because no public source was available.
 *
 * Feature lists that came from the project team rather than from the developer
 * are labelled as team features so the individual contribution is not implied.
 */

export const projects: Project[] = [
  {
    slug: "unity-shop",
    name: "Unity Shop",
    tagline: "A multi-vendor marketplace, built on Next.js with real-time order updates.",
    summary:
      "A team-built marketplace covering 22 product categories, twelve currencies, seller onboarding, flash-sale countdowns and a real-time order surface. The published frontend talks to MongoDB directly from Next.js route handlers.",
    highlights: [
      "Multi-vendor catalogue with 22 product categories and a twelve-currency switcher",
      "Time-boxed flash sales with live countdowns, alongside a real-time order surface",
    ],
    categories: ["E-Commerce", "Web Applications", "Full-Stack"],
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Socket.IO",
      "Stripe",
      "Cloudinary",
      "Recharts",
    ],
    techKeys: [
      "nextjs",
      "react",
      "node",
      "express",
      "mongodb",
      "tailwind",
      "socketio",
      "stripe",
      "cloudinary",
    ],
    visual: "commerce",
    screenshot: {
      src: "/images/projects/unity-shop.webp",
      alt: "The deployed Unity Shop storefront: a top announcement bar over a banner carousel, a row of product category tiles, and a grid of discounted product cards with prices in taka.",
      width: 1600,
      height: 1000,
    },
    contribution: "Team project",
    status: "Live on Vercel",
    role: "Frontend developer within a team. This page documents the shipped codebase, not an individual contribution split.",
    links: [
      { label: "Live site", href: "https://unity-shop.vercel.app", kind: "live" },
      { label: "Frontend repo", href: "https://github.com/aamiqram/unity-shop", kind: "repo" },
      {
        label: "Server repo (iqram branch)",
        href: "https://github.com/ArifulIslam016/UnityShop-Sever/tree/iqram",
        kind: "repo",
      },
    ],
    verification: "verified",
    verificationNote:
      "Read from the package manifests of both public repositories, and from the server-rendered homepage of the deployed site.",
    featured: true,
    order: 1,
    body: [
      {
        kind: "p",
        text: "Unity Shop is the largest application I have worked on, and the first one built with other people rather than alone. It is a multi-vendor marketplace: vendors list products, buyers browse and check out, and administrators moderate the catalogue.",
      },
      {
        kind: "p",
        text: "The version documented here is the one deployed at the link below. Everything in the next sections was read out of the published repository or out of the deployed page itself.",
      },

      { kind: "h2", id: "what-it-does", text: "What the product does" },
      {
        kind: "features",
        items: [
          {
            title: "22 product categories",
            text: "Electronics, Fashion, Home & Living, Kitchen, Bedroom, Office, Mobiles, Watches, Audio, Cameras, Gaming, Lighting, Beauty, Health, Sports, Outdoor, Books, Stationery, Toys & Baby, Grocery, Tools and Automotive.",
          },
          {
            title: "Twelve-currency storefront",
            text: "A currency switcher covering USD, EUR, GBP, JPY, CNY, INR, AED, CAD, AUD, SAR and BDT alongside the Bangladeshi Taka.",
          },
          {
            title: "Seller onboarding",
            text: "A \"New Seller Products\" rail promotes recently listed inventory from vendors who joined the platform.",
          },
          {
            title: "Flash sales with countdowns",
            text: "Time-boxed offers with a live countdown and a per-offer discount figure.",
          },
          {
            title: "Local payment methods",
            text: "bKash and Nagad are surfaced directly in the checkout messaging, alongside free-delivery thresholds.",
          },
          {
            title: "Real-time channel",
            text: "Socket.IO and its client are both in the dependency list, which is what backs the live order surface.",
          },
          {
            title: "Admin analytics",
            text: "Recharts is used for the reporting surfaces behind the administrative views.",
          },
          {
            title: "Branch-per-contributor",
            text: "The backend repository carries one branch per contributor, which is the clearest record of how the team split the work.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "note",
        title: "Team features, not individual ones",
        text: "This was a team project. The features above belong to the product as a whole. I have deliberately not split them into per-person contributions, because the repository history does not record an agreed split and guessing one would misrepresent the work. My own work is on the `iqram` branch of the backend and in the frontend repository, and this page documents both.",
      },

      { kind: "h2", id: "architecture", text: "Architecture" },
      {
        kind: "diagram",
        caption: "The deployed frontend reaches the database through its own route handlers.",
        nodes: [
          { label: "Browser", detail: "Server-rendered Next.js pages", tone: "default" },
          { label: "Route handlers", detail: "app/api/*", tone: "info" },
          { label: "Mongoose", detail: "Models defined in-process", tone: "info" },
          { label: "MongoDB", detail: "Primary datastore", tone: "accent" },
          { label: "Socket.IO", detail: "Order events pushed to clients", tone: "default" },
        ],
        note: "A separate Express backend exists on another branch of a teammate's repository; it is described below.",
      },
      {
        kind: "p",
        text: "The interesting decision is that Mongoose is a direct dependency of the frontend repository. Rather than running a second Express service for the deployed build, the data access layer lives in Next.js route handlers. For a team that wants one deployment, one environment variable set and one place to look at logs, that is a defensible trade. It also means the database schema is coupled to the app's deploy cycle, and the frontend bundle is responsible for the availability of the data layer.",
      },

      { kind: "h3", id: "server-repository", text: "The server repository" },
      {
        kind: "p",
        text: "There is a second, separate backend: an Express service in a teammate's repository. Its work lives on a branch named `iqram`, and the repository carries one branch per contributor (`Arif`, `ahsan`, `develop`, `iqram`, `main`, `rimiruma`, `sakib`), which is the clearest available evidence of how the team divided the work. The manifest below was read from that branch.",
      },
      {
        kind: "code",
        lang: "json",
        file: "UnityShop-Sever @ iqram — package.json (dependencies)",
        caption: "Read directly from the public repository, `iqram` branch.",
        code: `{
  "name": "backend",
  "dependencies": {
    "@google/genai": "*",
    "bcrypt": "*",
    "bcryptjs": "*",
    "cloudinary": "*",
    "cors": "*",
    "dotenv": "*",
    "express": "*",
    "jsonwebtoken": "*",
    "mongodb": "*",
    "mongoose": "*",
    "multer": "*",
    "node-cron": "*",
    "nodemailer": "*",
    "openai": "*",
    "replicate": "*",
    "sharp": "*",
    "socket.io": "*",
    "stripe": "*",
    "ws": "*"
  },
  "devDependencies": {
    "nodemon": "*"
  }
}`,
      },
      {
        kind: "ul",
        items: [
          "**Two authentication libraries.** `bcrypt` and `bcryptjs` are both present. They implement the same algorithm, so one of them is redundant; a codebase that installs both usually accumulated them at different times.",
          "**Two real-time transports.** `socket.io` and the raw `ws` package are both installed. They solve the same problem at different abstraction levels, which is worth knowing before writing any new live feature.",
          "`sharp` for server-side image processing alongside `multer` for uploads and `cloudinary` for storage, so media is transformed as well as stored.",
          "`node-cron` for scheduled work, which only makes sense on a long-lived process. This service cannot be deployed to serverless functions without replacing it with a platform cron.",
          "`nodemailer` again on the server side, so transactional mail exists on both sides of this project.",
        ],
      },
      {
        kind: "callout",
        tone: "note",
        title: "Installed is not the same as shipped",
        text: "A dependency in `package.json` proves the package was installed, not that the feature reached production. The list above is reported as a manifest, and none of it is claimed as a deployed capability unless it was also observed on the live site.",
      },

      { kind: "h2", id: "engineering-notes", text: "Engineering notes" },
      { kind: "h3", id: "media-pipeline", text: "Media pipeline" },
      {
        kind: "p",
        text: "`multer` and `cloudinary` are both present. Multer handles the multipart request in the route handler and Cloudinary stores the asset, which keeps the Next.js server from holding user uploads on disk. Product imagery on the deployed page is served through the Next.js image optimiser rather than being hot-linked.",
      },
      {
        kind: "code",
        lang: "json",
        file: "package.json (excerpt, dependencies)",
        caption: "Read directly from the published repository.",
        code: `{
  "dependencies": {
    "cloudinary": "^2.9.0",
    "jspdf": "^4.2.0",
    "mongoose": "^9.2.1",
    "multer": "^2.0.2",
    "next": "16.1.6",
    "nodemailer": "^8.0.1",
    "react": "19.2.3",
    "recharts": "^3.7.0",
    "socket.io": "^4.8.3",
    "socket.io-client": "^4.8.3",
    "stripe": "^20.3.1"
  }
}`,
      },
      {
        kind: "code",
        lang: "json",
        file: "package.json (excerpt, scripts)",
        code: `{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}`,
      },

      { kind: "h3", id: "document-generation", text: "Document generation" },
      {
        kind: "p",
        text: "`jspdf` is in the dependency list, which is how the application produces downloadable order documents from the browser without a server-side PDF service. That keeps invoice generation out of the request path that handles payments.",
      },

      { kind: "h3", id: "notification-email", text: "Transactional email" },
      {
        kind: "p",
        text: "`nodemailer` handles outbound mail. On a Vercel deployment there is no long-lived process, so any scheduled or retried mail has to be driven from a request or a platform cron rather than an in-process queue.",
      },

      { kind: "h2", id: "trade-offs", text: "Trade-offs" },
      {
        kind: "ul",
        items: [
          "**One deployable instead of two.** Fewer moving parts and a single environment variable set, at the cost of losing a hard network boundary between the UI and the data layer.",
          "**Client-side PDF generation.** No rendering service to operate, but layout fidelity is limited to what the browser engine supports.",
          "**Currency formatting in the client.** A twelve-currency switcher is simple to implement locally and becomes a correctness problem as soon as prices are persisted in more than one currency.",
        ],
      },

      { kind: "h2", id: "verification-status", text: "Verification status" },
      {
        kind: "callout",
        tone: "note",
        title: "What is verified here",
        text: "The dependency list, the scripts, the category list, the currency list, the coupon code UNITY20, the bKash and Nagad messaging and the presence of a Bangla promotional ticker were all read directly from the public repositories and the deployed page.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "What is not claimed here",
        text: "AI SDKs (`@google/genai`, `openai`, `replicate`) are installed in the backend manifest, so the capability was at least intended. No AI surface was visible in the server-rendered homepage of the deployment, so AI is not listed above as a shipped user-facing feature — an installed dependency is not a delivered one. The language switcher also currently exposes only an English option even though Bangla content is present, so I describe the storefront as bilingual in content rather than as a fully localised product.",
      },

      { kind: "h2", id: "links", text: "Links" },
      {
        kind: "links",
        items: [
          {
            label: "unity-shop.vercel.app",
            href: "https://unity-shop.vercel.app",
            detail: "Deployed application",
          },
          {
            label: "github.com/aamiqram/unity-shop",
            href: "https://github.com/aamiqram/unity-shop",
            detail: "Public frontend repository, default branch master",
          },
          {
            label: "ArifulIslam016/UnityShop-Sever @ iqram",
            href: "https://github.com/ArifulIslam016/UnityShop-Sever/tree/iqram",
            detail: "Public Express backend, my branch",
          },
        ],
      },
    ],
  },

  {
    slug: "your-iyanat",
    name: "Your Iyanat",
    tagline: "A jewellery storefront built for the Bangladeshi market, with checkout and after-sales workflows.",
    summary:
      "An individual e-commerce build for a luxury ornament retailer: six jewellery categories, Taka pricing, four-zone delivery, coupon and flash-sale logic, order tracking and an after-sales surface, backed by a PostgreSQL database modelled with Prisma.",
    highlights: [
      "Taka-native storefront across six jewellery categories, with a gift finder to route shoppers",
      "Checkout built around how customers here actually pay: bKash, Nagad, cards and cash on delivery",
    ],
    categories: ["E-Commerce", "Web Applications", "Full-Stack"],
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Zod",
      "JWT",
      "SSLCommerz",
    ],
    techKeys: [
      "nextjs",
      "react",
      "typescript",
      "node",
      "express",
      "postgresql",
      "prisma",
      "zod",
      "jwt",
    ],
    visual: "storefront",
    screenshot: {
      src: "/images/projects/your-iyanat.webp",
      alt: "The deployed Your Iyanat storefront: an offers and giveaway banner above a hero section with jewellery collection imagery, followed by category tiles for bracelets, earrings and necklaces.",
      width: 1600,
      height: 1000,
    },
    contribution: "Individual project",
    status: "Live on Vercel",
    role: "Built the frontend and the API, including the schema, validation layer and checkout flow.",
    links: [{ label: "Live site", href: "https://your-iyanat.vercel.app", kind: "live" }],
    verification: "reported",
    verificationNote:
      "The deployment is public and was inspected, but the frontend and backend repositories are not published, so the data model and API internals could not be read.",
    featured: true,
    order: 2,
    body: [
      {
        kind: "p",
        text: "Your Iyanat is a luxury jewellery store aimed at the Bangladeshi market. The interesting constraint was never the catalogue; it was the checkout. Prices are quoted in Taka, delivery is priced by zone, and the payment methods a Bangladeshi customer actually uses are mobile financial services and cash on delivery.",
      },
      {
        kind: "p",
        text: "This page is written carefully: the storefront is public and I have inspected it directly, but the application code is not published, so anything about internals is marked as reported rather than verified.",
      },

      { kind: "h2", id: "what-it-does", text: "What the product does" },
      {
        kind: "features",
        items: [
          {
            title: "Six jewellery categories",
            text: "Bracelets, Bangles, Earrings, Pendants, Necklaces and Rings, with a gift finder to route shoppers to a starting point.",
          },
          {
            title: "Taka-native pricing",
            text: "Prices render with the ৳ symbol, for example `Eclipse Bangle ৳ 960` and `Lunar Ring ৳ 3,200`.",
          },
          {
            title: "Delivery pricing",
            text: "A flat `৳50 Delivery Anywhere` charge advertised across Bangladesh, alongside a reported four-zone model in the application logic.",
          },
          {
            title: "Coupon and flash-sale logic",
            text: "`IYANAT15` is surfaced as 15% off with a minimum order of ৳500, alongside member-only flash sales.",
          },
          {
            title: "Order tracking and after-sales",
            text: "Dedicated Track Order, Returns, Custom Orders and After-Sales surfaces, plus a concierge help channel.",
          },
          {
            title: "Local payment methods",
            text: "The storefront states `Pay safely with bKash, Nagad, cards, or cash on delivery.`",
          },
        ],
      },

      { kind: "h2", id: "architecture", text: "Architecture" },
      {
        kind: "diagram",
        caption: "Storefront, API and relational store are three deployable concerns.",
        nodes: [
          { label: "Next.js storefront", detail: "App Router, Turbopack build", tone: "default" },
          { label: "Express API", detail: "JWT-authenticated routes", tone: "info" },
          { label: "Prisma client", detail: "Typed access layer", tone: "info" },
          { label: "PostgreSQL", detail: "Jewellery, orders, users", tone: "accent" },
        ],
        note: "The deployed storefront is a Next.js App Router application; 374 static chunks and a Turbopack chunk are present in its HTML, with no client-side data-fetching library in use.",
      },
      {
        kind: "p",
        text: "Choosing PostgreSQL and Prisma over a document store is the decision that shaped most of this project. A jewellery catalogue is relational in a real way: an order has line items, a line item points at a variant, a variant carries its own stock, and a customer can have many orders. Document modelling that shape means either duplicating data or assembling it on every read.",
      },

      { kind: "h2", id: "engineering-notes", text: "Engineering notes" },
      { kind: "h3", id: "validation-boundary", text: "Validation at the boundary" },
      {
        kind: "p",
        text: "Zod sits between the HTTP layer and the database. The reason to validate there rather than in the database is that the schemas describe intent: a coupon payload is not just any object, it is a code, a percentage, an expiry and a minimum. Expressing that in one schema means the route handler, the type inference and the runtime check all agree, and an invalid payload is rejected before it can reach a transaction.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "The general pattern",
        text: "Parse the payload into a typed value at the route boundary, then pass only that value deeper into the application. It removes the class of bugs where a handler trusts a field that the client never sent.",
      },

      { kind: "h3", id: "zone-pricing", text: "Delivery zones as a pure function" },
      {
        kind: "p",
        text: "Four-zone delivery pricing is the kind of rule that reads like data and behaves like code. The useful move is to keep it as a pure function that takes a district and a cart total and returns a number, so that the checkout screen, the order creation endpoint and the admin estimate all call the same implementation instead of three copies of the same conditional.",
      },
      {
        kind: "callout",
        tone: "note",
        title: "Why this matters for payments",
        text: "Delivery cost is part of the amount charged. If three code paths can disagree about it, the customer is quoted one figure and charged another, which is exactly the class of bug a payment gateway cannot reconcile for you.",
      },

      { kind: "h3", id: "checkout-flow", text: "Checkout and payment" },
      {
        kind: "p",
        text: "The reported integration is SSLCommerz, which is the gateway that fronts bKash, Nagad and card payments for Bangladeshi merchants. That matches what the storefront advertises to customers. The shape of the flow is the standard one: create an order in a pending state, hand the customer to the gateway, and move the order to paid only when the gateway calls back. The callback is the only thing that should be allowed to mark an order as settled.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "A real deployment concern",
        text: "A gateway callback is unauthenticated in the sense that it arrives from outside your application. The endpoint needs the gateway's own signature check and must be idempotent, because gateways retry. Those are reported intentions here, not verified behaviour, since the API source is not public.",
      },

      { kind: "h3", id: "role-based-access", text: "Role-based access" },
      {
        kind: "p",
        text: "The application distinguishes customer, admin and seller capabilities using JWT-based auth. The admin surface adds business statistics and low-stock workflows on top of the catalogue, which is the part that makes the difference between a storefront and a shop that its own staff can run.",
      },

      { kind: "h2", id: "trade-offs", text: "Trade-offs" },
      {
        kind: "ul",
        items: [
          "**A relational store for a read-heavy catalogue.** Prisma and migrations cost more upfront than a document store, but order and stock integrity are enforced by the database rather than by application discipline.",
          "**A separate API service.** More deployments and one more network hop, in exchange for a clean boundary and a backend that can move independently of the storefront.",
          "**Server-rendered marketing surface.** The homepage ships its full copy in the HTML, which is what makes it indexable; the trade is that the cached HTML is regenerated whenever catalogue or promotional data changes.",
        ],
      },

      { kind: "h2", id: "verification-status", text: "Verification status" },
      {
        kind: "callout",
        tone: "note",
        title: "Verified from the deployed site",
        text: "Title and metadata, Next.js App Router with a Turbopack build, the six categories, Taka pricing with the ৳ symbol, the ৳50 delivery message, the IYANAT15 coupon terms, the Track Order / Returns / Custom Orders / After-Sales surfaces, the bKash / Nagad / card / cash-on-delivery statement, Cloudinary-hosted imagery and a `iyanat-theme` localStorage key.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Not verified",
        text: "The frontend and backend repositories are not published, so the Prisma schema, the Zod schemas, the SSLCommerz integration and the four-zone delivery implementation could not be read. Those sections describe the reported approach and the reasoning behind it, not code I have inspected. There are also four statistics on the storefront homepage that currently render as `0` in the server HTML, which is worth fixing before this page is used as a reference.",
      },

      { kind: "h2", id: "links", text: "Links" },
      {
        kind: "links",
        items: [
          {
            label: "your-iyanat.vercel.app",
            href: "https://your-iyanat.vercel.app",
            detail: "Deployed storefront, currently canonicalising to your-iyanat.com",
          },
        ],
      },
    ],
  },

  {
    slug: "local-chef-bazaar",
    name: "Local Chef Bazaar",
    tagline: "A full-stack food marketplace connecting customers with home cooks.",
    summary:
      "A marketplace built as a React single-page app on Vite, talking to an Express and Mongoose API. Menu browsing, ordering, reviews, role-based workflows, Stripe checkout and Firebase-backed authentication and storage.",
    highlights: [
      "Home cooks publish a menu and customers order from it, with reviews closing the loop",
      "Customer, cook and admin paths separated by JWT on the API, with Firebase handling sign-in",
    ],
    categories: ["E-Commerce", "Full-Stack", "Web Applications"],
    stack: [
      "React",
      "Vite",
      "React Router",
      "Tailwind CSS",
      "TanStack Query",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Firebase",
      "Stripe",
    ],
    techKeys: [
      "react",
      "vite",
      "reactrouter",
      "tailwind",
      "tanstack",
      "node",
      "express",
      "mongodb",
      "firebase",
      "stripe",
    ],
    visual: "marketplace",
    screenshot: {
      src: "/images/projects/local-chef-bazaar.webp",
      alt: "The deployed Local Chef Bazaar homepage: the LocalChefBazaar wordmark and navigation above a 'Fresh Homemade Meals From Local Chefs' hero panel, a 'How It Works' section, and cards for individual chefs and meals.",
      width: 1600,
      height: 1000,
    },
    contribution: "Individual project",
    status: "Live on Vercel, API on Vercel",
    role: "Built both sides: the React client and the Express API.",
    links: [
      { label: "Live site", href: "https://local-chef-bazar.vercel.app", kind: "live" },
      {
        label: "Client repo",
        href: "https://github.com/aamiqram/Assignment_11-Client",
        kind: "repo",
      },
      {
        label: "Server repo",
        href: "https://github.com/aamiqram/Assignment_11-Server",
        kind: "repo",
      },
    ],
    verification: "verified",
    verificationNote:
      "Both repositories are public. Every technology listed was read from their package manifests, and the deployed site was inspected.",
    featured: true,
    order: 3,
    body: [
      {
        kind: "p",
        text: "Local Chef Bazaar connects customers with independent home cooks. A cook publishes a menu, a customer orders from it, and the platform handles the payment and the review loop in between.",
      },
      {
        kind: "p",
        text: "Both halves are public, so this case study is written directly from the source rather than from a description.",
      },

      { kind: "h2", id: "what-it-does", text: "What the product does" },
      {
        kind: "features",
        items: [
          {
            title: "Menu browsing and ordering",
            text: "Menus are published per cook and become the catalogue a customer orders from.",
          },
          {
            title: "Reviews",
            text: "Customer reviews close the loop after an order is delivered.",
          },
          {
            title: "Role-based workflows",
            text: "JWT authentication on the API plus Firebase on the client separates customer, cook and administrative paths.",
          },
          {
            title: "Stripe checkout",
            text: "Both repositories depend on Stripe, and the client loads Stripe.js and the React bindings.",
          },
          {
            title: "Dashboards with charts",
            text: "Recharts is used for the reporting views behind the dashboards.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "note",
        title: "Firebase does two different jobs here",
        text: "`firebase-admin` on the server and `firebase` on the client are both present, which means authentication is brokered through Firebase while administrative access is verified with server-issued JWTs. That is a real pattern, but it means there are two token systems to reason about and one authority for authorization: the API.",
      },

      { kind: "h2", id: "architecture", text: "Architecture" },
      {
        kind: "diagram",
        caption: "Two independently deployed Vercel projects.",
        nodes: [
          { label: "React SPA", detail: "Vite build, React Router 6", tone: "default" },
          { label: "Express API", detail: "Express 5, single entry point", tone: "info" },
          { label: "MongoDB", detail: "via Mongoose 9", tone: "accent" },
          { label: "Stripe", detail: "Payment intents", tone: "default" },
          { label: "Firebase", detail: "Auth and storage", tone: "default" },
        ],
      },
      {
        kind: "p",
        text: "The API is a single `index.js` entry point deployed to `lcb-server.vercel.app`, with `vercel.json` in the repository to route requests to it. The client is a Vite build whose entire body is a single empty mount point, which is the normal shape for a client-rendered single-page application.",
      },
      {
        kind: "code",
        lang: "json",
        file: "Assignment_11-Server/package.json",
        caption: "Server dependencies, read from the public repository.",
        code: `{
  "name": "localchefbazaar-server",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "firebase-admin": "^13.6.0",
    "jsonwebtoken": "^9.0.3",
    "mongodb": "^7.0.0",
    "mongoose": "^9.0.2",
    "stripe": "^20.1.0"
  }
}`,
      },
      {
        kind: "code",
        lang: "json",
        file: "Assignment_11-Client/package.json (excerpt)",
        code: `{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@stripe/react-stripe-js": "^5.4.1",
    "@tanstack/react-query": "^5.90.12",
    "axios": "^1.13.2",
    "firebase": "^12.7.0",
    "react": "^19.2.0",
    "react-hook-form": "^7.68.0",
    "react-router-dom": "^6.30.2",
    "recharts": "^3.6.0",
    "stripe": "^20.1.0"
  }
}`,
      },

      { kind: "h2", id: "engineering-notes", text: "Engineering notes" },
      { kind: "h3", id: "server-state", text: "Server state and client state" },
      {
        kind: "p",
        text: "The client uses TanStack Query for everything that lives on the API and React context for everything that does not, which is the split I try to hold everywhere. Cart contents, the signed-in user and Stripe's publishable-key handshake are client state. Menus, orders and reviews are server state and should be cached, deduplicated and invalidated by key rather than mirrored into a global store.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Why it matters",
        text: "Mirroring server data into a global store creates two sources of truth for the same record. The usual symptom is a screen that shows a stale total after an order succeeds, because the mutation invalidated the query cache but the copied value was never touched.",
      },

      { kind: "h3", id: "authorization", text: "Authorization belongs to the API" },
      {
        kind: "p",
        text: "The API signs its own JWTs with `jsonwebtoken` and reads them with `cookie-parser`. Hiding a cook's dashboard in the React router is a usability feature, not a security control: the route handlers have to reject the request themselves, because anything in the browser can be edited by the person running it.",
      },

      { kind: "h3", id: "payments", text: "Payments" },
      {
        kind: "p",
        text: "Stripe appears on both sides of the wire, which is the correct shape: the client needs Stripe.js to mount the payment element, and the server needs the secret key to create and confirm the intent. No secret belongs in the client bundle, and `VITE_`-prefixed variables are the ones a Vite build will publish, so only the publishable key goes there.",
      },

      { kind: "h2", id: "trade-offs", text: "Trade-offs" },
      {
        kind: "ul",
        items: [
          "**A client-rendered SPA.** Simple mental model and cheap navigation, but the served HTML contains only an empty mount point, so the marketplace's pages are not indexable and there is nothing to render before JavaScript runs.",
          "**Two token systems.** Firebase on the client, JWT on the API. Convenient for Firebase features, at the cost of a second thing to keep valid.",
          "**One server entry file.** Fast to start and easy to deploy as a single function, but it is the first thing I would split when the route count grows.",
        ],
      },

      { kind: "h2", id: "verification-status", text: "Verification status" },
      {
        kind: "callout",
        tone: "note",
        title: "Verified",
        text: "All dependencies and scripts above were read from the two public repositories. The deployed client serves an empty `#root` with a single Vite-style module bundle, no meta description and no Open Graph tags, which is why this project is described as a client-rendered SPA rather than a server-rendered storefront.",
      },

      { kind: "h2", id: "links", text: "Links" },
      {
        kind: "links",
        items: [
          {
            label: "local-chef-bazar.vercel.app",
            href: "https://local-chef-bazar.vercel.app",
            detail: "Deployed React client",
          },
          {
            label: "lcb-server.vercel.app",
            href: "https://lcb-server.vercel.app",
            detail: "Deployed Express API",
          },
          {
            label: "github.com/aamiqram/Assignment_11-Client",
            href: "https://github.com/aamiqram/Assignment_11-Client",
            detail: "Public client repository",
          },
          {
            label: "github.com/aamiqram/Assignment_11-Server",
            href: "https://github.com/aamiqram/Assignment_11-Server",
            detail: "Public server repository, default branch main",
          },
        ],
      },
    ],
  },

  {
    slug: "aamiqu",
    name: "AAMIQU",
    tagline: "A personal Android media player, written in Kotlin.",
    summary:
      "A native Android application for playing episodic media, with watch progress and history, episode navigation, playback controls, skip-intro and skip-outro, extension support and attention to older Android versions.",
    highlights: [
      "Episodic playback with persistent watch progress and history, so a series resumes where it stopped",
      "Skip-intro and skip-outro, plus deliberate compatibility work for older Android versions",
    ],
    categories: ["Android", "Experiments"],
    stack: ["Kotlin", "Android SDK", "XML layouts"],
    techKeys: ["kotlin", "android"],
    visual: "android",
    contribution: "Personal project",
    status: "In development",
    role: "Sole developer.",
    links: [{ label: "GitHub profile", href: "https://github.com/aamiqram", kind: "profile" }],
    verification: "reported",
    verificationNote:
      "The application is described by the developer. No public repository is available, so nothing below has been read from source.",
    featured: true,
    order: 4,
    body: [
      {
        kind: "p",
        text: "AAMIQU is the one project in this portfolio that is not a web application. It is a native Android media player written in Kotlin, and it exists because I wanted to understand the platform rather than only the browser.",
      },
      {
        kind: "p",
        text: "This page is deliberately shorter than the others, because the honest reason is that there is no public source to document. Everything here comes from my own account of the project, and I have marked it as such rather than writing a case study I cannot stand behind.",
      },

      { kind: "h2", id: "scope", text: "Development context" },
      {
        kind: "features",
        items: [
          { title: "Kotlin, XML layouts", text: "The view system rather than a Compose-first codebase." },
          { title: "Media playback", text: "The core purpose of the application: playing episodic video." },
          { title: "Watch progress and history", text: "Persist how far someone has watched so they can resume." },
          { title: "Episode navigation", text: "Moving between episodes of a series without leaving the player." },
          {
            title: "Playback controls",
            text: "Standard transport controls plus skip-intro and skip-outro, which is the feature that matters most on episodic content.",
          },
          {
            title: "Extension and add-on integration",
            text: "The application is designed to pull additional sources through an extension mechanism.",
          },
          {
            title: "Older Android compatibility",
            text: "Deliberate work to keep playback working on older Android versions.",
          },
        ],
      },

      { kind: "h2", id: "why-android", text: "Why this project exists" },
      {
        kind: "p",
        text: "Every other project here is a web application, where the browser hides a lot of the platform from you. Android removes those abstractions. Media playback in particular is unforgiving: the platform's own decoders, the audio focus rules, the difference in behaviour between Android versions, and a screen that can be rotated or backgrounded mid-playback. Getting a video to keep playing correctly is a genuinely different problem from getting a component to re-render.",
      },
      {
        kind: "callout",
        tone: "note",
        title: "What I learned that does not transfer to the web",
        text: "Resource ownership. On the web, a video element that gets unmounted is cleaned up by the framework. On Android, a player holds a codec, a surface and a network connection, and leaking any of them is a real cost to the device. Learning to release them deliberately changed how I think about effect cleanup in React too.",
      },

      { kind: "h2", id: "compatibility", text: "Working on older Android versions" },
      {
        kind: "p",
        text: "Supporting older versions is mostly a series of specific, unglamorous decisions: which media APIs are available at which API level, what to do when a codec the app expects is missing, and which system behaviours changed between releases. The reported work here was exactly that: identifying the compatibility problems and resolving them rather than simply raising the minimum supported version.",
      },

      { kind: "h2", id: "verification-status", text: "Verification status" },
      {
        kind: "callout",
        tone: "warning",
        title: "Reported, not verified",
        text: "There is no public repository for AAMIQU, so this page does not describe a specific architecture, a library list, test coverage or a set of shipped features. Where I was not certain that a feature had shipped rather than merely being planned, I have left it out. The GitHub profile link is provided instead of a repository link because I cannot verify a repository URL. If you want the implementation detail, ask me and I will publish the source.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "A note on publishing",
        text: "An Android media player with an extension mechanism raises questions about what sources it can load. If the source is ever opened up, the extension interface needs the same care as any other plugin boundary, which is a topic I would rather write about honestly than speculate on now.",
      },
    ],
  },
{
    slug: "finese",
    name: "FinEase",
    tagline: "A personal finance manager for expenses, budgets and savings goals.",
    summary:
      "A full-stack finance tracker where the interface is the product: entry forms, category breakdowns and budget progress are the three screens that matter, and they are the three I spent the most time on.",
    highlights: [
      "Expense entry, per-category budgets and savings goals tracked in one loop",
      "Charts summarising spending over time, rendered with Chart.js",
    ],
    categories: ["Full-Stack", "Web Applications"],
    stack: ["React", "Express", "MongoDB", "Chart.js", "JWT", "Firebase"],
    techKeys: ["react", "node", "express", "mongodb", "jwt", "firebase"],
    visual: "commerce",
    screenshot: {
      src: "/images/projects/finese.webp",
      alt: "The deployed FinEase landing page: a 'Smart Financial Management' badge above the headline 'All of your finances, all in one place', a sign-in and sign-up panel, and a row of smart budgeting tips.",
      width: 1600,
      height: 1000,
    },
    contribution: "Personal project",
    status: "Live on Firebase Hosting",
    role: "Sole developer, working from the Programming Hero full-stack track.",
    links: [
      { label: "Live site", href: "https://finese-client.web.app", kind: "live" },
      { label: "Repository", href: "https://github.com/aamiqram/Finease", kind: "repo" },
    ],
    verification: "reported",
    verificationNote:
      "The repository is public and the deployment is live, so the landing page and sign-in flow can be checked directly. I have not written a deep case study here because I would be describing my own earlier coursework rather than a decision I would defend today.",
    featured: true,
    order: 5,
    body: [
      {
        kind: "p",
        text: "FinEase began as the capstone project for my full-stack coursework: a personal finance manager where a person records what they spend, sets a budget against a category, and watches the month close. The coursework supplied the structure. What I cared about was making three screens feel calm, because a finance tool that makes you feel anxious is a finance tool nobody keeps using.",
      },
      { kind: "h2", id: "scope", text: "What it does" },
      {
        kind: "p",
        text: "The application covers the loop that matters for tracking money day to day.",
      },
      {
        kind: "features",
        items: [
          {
            title: "Expense entry",
            text: "Recording an amount against a category, which is the action the whole application exists to support.",
          },
          {
            title: "Budget planning",
            text: "Setting a limit per category and seeing how much of it has been consumed.",
          },
          {
            title: "Financial analytics",
            text: "Charts summarising spending over time, rendered with Chart.js.",
          },
          {
            title: "Goal setting",
            text: "Tracking a savings target separately from monthly spending.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "note",
        title: "Reported, not verified",
        text: "Sign-in is reachable at the live URL, but the application sits behind authentication, so I cannot demonstrate the dashboard, the analytics or the budget logic from outside. This page therefore describes the intended behaviour rather than claiming each screen is verified. If you want the implementation detail, the repository is linked above.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Why it is still here",
        text: "Every project on this page that came later was built faster because of the routing, authentication and data-modelling decisions I got wrong here first. Keeping it visible is more honest than quietly dropping the project that did the teaching.",
      },
    ],
  },
  {
    slug: "firesheild-game-library",
    name: "Firesheild Game Library",
    tagline: "A game library and review community built on Firebase and Express.",
    summary:
      "A catalogue of games with user profiles, ratings and written reviews. The interesting part was the read model: a library page that has to stay fast while several users are reviewing the same title.",
    highlights: [
      "A browsable catalogue where each title has a page, a rating and written reviews",
      "Per-user profiles, with shared ratings and reviews kept consistent under concurrent writes",
    ],
    categories: ["Web Applications", "Full-Stack"],
    stack: ["React", "Firebase", "Node.js", "Express", "MongoDB"],
    techKeys: ["react", "firebase", "node", "express", "mongodb"],
    visual: "storefront",
    screenshot: {
      src: "/images/projects/firesheild.webp",
      alt: "The deployed Firesheild game library: 'Gamehub' masthead with Home, All Games, About, Login and Register navigation, a featured Minecraft panel, and a Popular Games row of game cards with star ratings.",
      width: 1600,
      height: 1000,
    },
    contribution: "Personal project",
    status: "Live on Firebase Hosting",
    role: "Sole developer.",
    links: [
      {
        label: "Live site",
        href: "https://firesheild-game-library.web.app",
        kind: "live",
      },
      {
        label: "Repository",
        href: "https://github.com/aamiqram/firesheild_game_library",
        kind: "repo",
      },
    ],
    verification: "reported",
    verificationNote:
      "The catalogue, ratings and profile routes render publicly at the live URL and the source is public. Sign-in-gated actions are described as intended behaviour, not verified functionality.",
    featured: true,
    order: 6,
    body: [
      {
        kind: "p",
        text: "Firesheild is a game library: a browsable catalogue where each title has a page, a rating, and written reviews from other users, alongside per-user profiles. It is the first project here where the difficulty was not building a form but keeping a shared list correct while people write on it at the same time.",
      },
      { kind: "h2", id: "shape", text: "How it is put together" },
      {
        kind: "p",
        text: "The client is React. Firebase handles authentication and the realtime behaviour a review feed needs, while an Express and MongoDB layer holds the catalogue and the written reviews.",
      },
      {
        kind: "diagram",
        nodes: [
          { label: "React client", detail: "Catalogue, title pages, profiles" },
          { label: "Firebase Auth", detail: "Accounts and sessions" },
          { label: "Express API", detail: "Catalogue and reviews" },
          { label: "MongoDB", detail: "Games, ratings, reviews" },
        ],
        caption: "Client, authentication, and the catalogue API as separate concerns.",
        note: "A simplified map of the deployed shape. Ratings and reviews are the shared state that made this the hardest part.",
      },
      {
        kind: "callout",
        tone: "note",
        title: "Reported, not verified",
        text: "Catalogue browsing and ratings are visible without an account. Writing a review, editing a profile and anything else behind the login are described here as intended behaviour; I have not verified each authenticated route from outside the app.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "About the cover art",
        text: "The deployed build lists real commercial titles and displays artwork belonging to their publishers. That imagery belongs to those publishers and is present because the catalogue is populated with real games. I have deliberately not reused any of it as design material elsewhere on this site, and a real project of mine would source its own assets or use placeholders.",
      },
    ],
  },
  {
    slug: "prolific-app-devs",
    name: "Prolific App Devs",
    tagline: "A simulated app marketplace, built as a frontend marketing and catalogue exercise.",
    summary:
      "A marketplace-style landing page with a services section, a trending app catalogue and a contact flow. It is a simulation built for layout and interaction practice, and this page describes it that way.",
    highlights: [
      "A responsive card grid that holds its shape from a narrow phone to a wide desktop",
      "Category filtering across the catalogue and a contact form wired through the Node backend",
    ],
    categories: ["Experiments", "Web Applications"],
    stack: ["React", "Node.js", "MongoDB", "Email.js", "CSS3"],
    techKeys: ["react", "node", "mongodb", "css"],
    visual: "marketplace",
    screenshot: {
      src: "/images/projects/prolific.webp",
      alt: "The deployed Prolific App Devs marketplace: a 'HERO.IO' masthead with Apps, Installation and Contribute navigation, a 'We Build Productive Apps' hero, a trusted-by strip, and a Trending Apps grid of application cards.",
      width: 1600,
      height: 1000,
    },
    contribution: "Personal project",
    status: "Live on Netlify",
    role: "Sole developer.",
    links: [
      {
        label: "Live site",
        href: "https://prolific-app-devs.netlify.app",
        kind: "live",
      },
      {
        label: "Repository",
        href: "https://github.com/aamiqram/Prolific_App_Devs",
        kind: "repo",
      },
    ],
    verification: "reported",
    verificationNote:
      "The public landing page and catalogue render at the live URL and the source is public. It is a simulation: the products, the 'trusted by' figures and any testimonials in the build are placeholder content, not real customers or real clients.",
    featured: true,
    order: 7,
    body: [
      {
        kind: "p",
        text: "This is the least technically ambitious project here and the most useful as layout practice. I built a marketplace-style site: a services pitch, a catalogue of applications with icons and categories, and a contact form, with a React client, a Node and MongoDB backend, and Email.js handling the contact form.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "What this project is, stated plainly",
        text: "The build presents itself as an app marketplace and the catalogue is populated with real applications from the Google Play store, using their icons and a 'trusted by' claim. None of that describes a real company, a real client or a real product. My own repository describes it as an application that simulates a feature-rich app marketplace, which is the accurate description, so that is what this page says. I keep it listed because the layout, responsive behaviour and form handling are real work, and hiding it would be less honest than explaining it.",
      },
      { kind: "h2", id: "worth", text: "What it was actually for" },
      {
        kind: "p",
        text: "The exercise was responsive layout under pressure. A catalogue of cards has to survive a narrow phone, a tablet and a wide desktop without the grid falling apart, and every card carries an icon, a title and a category that all want different amounts of space. Getting the card internals to agree with each other at every width was the whole point, and it is the habit that shows up in the commerce work above.",
      },
      {
        kind: "ul",
        items: [
          "A responsive card grid that holds its shape from 360px upward",
          "A services section with alternating content and image placement",
          "A contact form wired to Email.js through the Node backend",
          "Category filtering across the catalogue",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "What I would change",
        text: "I would source placeholder content of my own instead of leaning on another company's brand and store assets, and I would not ship placeholder metrics in a build that could be mistaken for a client site. The layout work stands; the framing did not, and I have said so here rather than quietly presenting it as an agency project.",
      },
    ],
  },
];

export const projectCategories: ProjectCategory[] = [
  "Web Applications",
  "E-Commerce",
  "Full-Stack",
  "AI Integration",
  "Android",
  "Experiments",
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured).sort((a, b) => a.order - b.order);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

/** The card-facing projection of a project. Safe to send to a client component. */
export type ProjectSummary = Omit<Project, "body" | "role">;

export function toProjectSummary(project: Project): ProjectSummary {
  return {
    slug: project.slug,
    name: project.name,
tagline: project.tagline,
    summary: project.summary,
    highlights: project.highlights,
    categories: project.categories,
    stack: project.stack,
    techKeys: project.techKeys,
    visual: project.visual,
    screenshot: project.screenshot,
    contribution: project.contribution,
    status: project.status,
    links: project.links,
    verification: project.verification,
    verificationNote: project.verificationNote,
    featured: project.featured,
    order: project.order,
  };
}
