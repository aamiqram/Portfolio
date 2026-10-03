import type { Article } from "./types";

/**
 * Engineering notes, written to be useful rather than impressive. Each one is
 * grounded in work that appears in the project directory, and each is explicit
 * about whether the underlying project source could be inspected.
 *
 * Snippets show the shape of the pattern rather than verbatim file dumps, and
 * say so where that matters.
 */

const AUTHORED = "2026-10-02";

export const articles: Article[] = [
  {
    slug: "validate-once-at-the-boundary",
    title: "Validate once, at the boundary",
    description:
      "Why schema validation belongs in the HTTP layer, and how Zod turns a validation step into the single source of truth for a route's types.",
    topic: "APIs",
    tags: ["Zod", "Express", "TypeScript", "Validation"],
    updated: AUTHORED,
    related: ["server-state-is-not-client-state", "delivery-and-coupon-rules"],
    body: [
      {
        kind: "p",
        text: "The cheapest bugs in an Express API are the ones that never needed to be possible. A handler that reads `req.body.email` and passes it straight to a database query has already accepted undefined, a number, an object and a very long string, each of which is a bug waiting for the right input.",
      },
      {
        kind: "p",
        text: "The fix is not defensive coding scattered through the handler. It is one validation step at the edge of the application, after which everything downstream can be trusted.",
      },

      { kind: "h2", id: "the-shape", text: "The shape of the fix" },
      {
        kind: "p",
        text: "A validation library that infers its own types removes the worst part of this work, which is keeping a hand-written TypeScript interface and a hand-written runtime check in agreement. Zod does that: define the schema once, and the type falls out of it.",
      },
      {
        kind: "code",
        lang: "ts",
        file: "schemas/order.ts",
        caption: "Condensed from the pattern used in the jewellery storefront API.",
        code: `import { z } from "zod";

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        variantId: z.string().uuid(),
        quantity: z.number().int().min(1).max(20),
      })
    )
    .min(1),
  deliveryZone: z.enum(["inside-dhaka", "outside-dhaka", "suburban", "remote"]),
  couponCode: z.string().trim().min(3).max(32).optional(),
});`},
      {
        kind: "p",
        text: "Two things in that schema matter more than the field list. `min(1)` on the array makes an empty cart a validation error rather than a zero-value order. `max(20)` on quantity stops a client from asking for a million units of something, which is a denial-of-service vector dressed up as a form field.",
      },

      { kind: "h2", id: "parse-dont-check", text: "Parse, don't check" },
      {
        kind: "p",
        text: "The important habit is calling `parse` and using the *result*, not calling `safeParse` and then continuing to read from `req.body`. The whole benefit comes from the type change. If you validate and then keep using the original object, you have added a runtime check without removing any of the uncertainty, and the next developer will not know which value is trustworthy.",
      },
      {
        kind: "code",
        lang: "ts",
        file: "routes/orders.ts",
        code: `router.post("/orders", requireAuth, async (req, res) => {
  // Throws a ZodError that the error middleware turns into a 400.
  const payload = createOrderSchema.parse(req.body);

  const subtotal = await priceBasket(payload.items);
  const delivery = deliveryCost(payload.deliveryZone, subtotal);
  const discount = await resolveCoupon(payload.couponCode, subtotal);

  const order = await db.order.create({
    data: {
      userId: req.user.id,
      items: payload.items,
      subtotal,
      delivery,
      discount,
      status: "pending",
    },
  });

  res.status(201).json({ id: order.id, subtotal, delivery, discount });
});`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Let it throw",
        text: "Zod throws on failure. Catching that in every handler is the wrong move; a single error middleware that recognises validation failures and returns a 400 with the field paths turns thirty call sites into zero.",
      },

      { kind: "h2", id: "zod-in-the-database-layer", text: "Push the rules to where the data is" },
      {
        kind: "p",
        text: "Validation is not only about incoming requests. Any value that is computed rather than supplied should be validated before it is trusted. Coupon percentages, delivery costs and stock counts are all attacker-influenced in the sense that a client chose the inputs that produced them.",
      },
      {
        kind: "code",
        lang: "ts",
        file: "lib/coupon.ts",
        code: `import { z } from "zod";

const appliedCoupon = z.object({
  code: z.string(),
  percentOff: z.number().min(0).max(90),
  minSubtotal: z.number().min(0),
  expiresAt: z.date(),
});

export async function resolveCoupon(code: string | undefined, subtotal: number) {
  if (!code) return 0;

  const row = await db.coupon.findUnique({ where: { code } });
  if (!row) return 0;

  // Validate the stored row before trusting anything computed from it.
  const coupon = appliedCoupon.safeParse({
    code: row.code,
    percentOff: row.percentOff,
    minSubtotal: row.minSubtotal,
    expiresAt: row.expiresAt,
  });

  if (!coupon.success) return 0;
  if (subtotal < coupon.data.minSubtotal) return 0;
  if (coupon.data.expiresAt.getTime() < Date.now()) return 0;

  return Math.floor((subtotal * coupon.data.percentOff) / 100);
}`,
      },
      {
        kind: "p",
        text: "The `max(90)` there is not about coupons. It is about the fact that a percentage above 100 would produce a negative total, and a negative total is a fascinating thing to hand to a payment gateway.",
      },

      { kind: "h2", id: "what-it-does-not-cover", text: "What validation does not do" },
      {
        kind: "p",
        text: "Validation checks shape. It does not check authorisation, and it is not a defence against injection on its own — that comes from parameterised queries, which Prisma and Mongoose both give you by default if you let them. A schema that validates `role: z.enum([\"customer\"])` does not stop someone calling an admin route; it only stops them claiming a role in the payload.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "The mistake worth naming",
        text: "Validating the payload is not the same as authorising the request. Every route that reads a user identity needs its own check. In the code above that is the `requireAuth` middleware, and it is doing work the schema cannot do.",
      },
    ],
  },

  {
    slug: "delivery-and-coupon-rules",
    title: "Delivery and coupon rules belong in pure functions",
    description:
      "Zone-based delivery pricing and coupon logic look like data and behave like code. Keeping them pure is what stops the quoted price and the charged price from disagreeing.",
    topic: "Commerce logic",
    tags: ["Pricing", "Testing", "Pure functions", "Design"],
    updated: AUTHORED,
    related: ["validate-once-at-the-boundary", "server-state-is-not-client-state"],
    body: [
      {
        kind: "p",
        text: "Every store I have built eventually grows a delivery rule. It starts as free delivery above a threshold, and it becomes a table of zones with different rates, and sometimes different rates per zone depending on the order total. The zone table is a small piece of business logic that grows tentacles.",
      },
      {
        kind: "p",
        text: "The failure mode is always the same, and it is always expensive: three code paths compute the delivery cost, one of them is stale, and a customer is quoted ৳50 and charged ৳120.",
      },

      { kind: "h2", id: "make-it-a-function", text: "Make it a function" },
      {
        kind: "p",
        text: "The whole fix is to make pricing a pure function of its inputs: a zone, a subtotal, and the rule table. No database access inside it, no clock reads that are not passed in, no branching on anything the caller did not supply. Then the checkout screen, the order endpoint and the admin estimate can all call it and be certain they agree.",
      },
      {
        kind: "code",
        lang: "ts",
        file: "lib/delivery.ts",
        code: `export type Zone = "inside-dhaka" | "outside-dhaka" | "suburban" | "remote";

type Rule = { zone: Zone; flat: number; freeAbove: number | null };

const RULES: Rule[] = [
  { zone: "inside-dhaka", flat: 60, freeAbove: 3000 },
  { zone: "outside-dhaka", flat: 80, freeAbove: 5000 },
  { zone: "suburban", flat: 100, freeAbove: null },
  { zone: "remote", flat: 130, freeAbove: null },
];

export function deliveryCost(zone: Zone, subtotal: number): number {
  const rule = RULES.find((r) => r.zone === zone);
  if (!rule) throw new Error(\`Unknown delivery zone: \${zone}\`);
  if (isInvalidSubtotal(subtotal)) throw new Error("Invalid subtotal");

  if (rule.freeAbove !== null && subtotal >= rule.freeAbove) return 0;
  return rule.flat;
}

// Kept separate so the guard reads as a precondition, not as logic.
function isInvalidSubtotal(subtotal: number): boolean {
  return !Number.isFinite(subtotal) || subtotal < 0;
}`,
      },
      {
        kind: "p",
        text: "Two details are doing real work. The rule for an unknown zone throws rather than defaulting to zero, because a default of zero means a typo in a form silently gives away free delivery. And the negative-subtotal guard exists because this function will eventually be called with a coupon applied twice, and the second application is how a total goes below zero.",
      },

      { kind: "h2", id: "order-of-operations", text: "Fix the order of operations once" },
      {
        kind: "p",
        text: "The subtler bug is not the rate, it is the sequence. If the discount is applied before delivery is priced, the customer can cross the free-delivery threshold with a coupon and get delivery free. If delivery is priced first, they do not. Both are defensible products. What is not defensible is different code choosing different orders.",
      },
      {
        kind: "code",
        lang: "ts",
        file: "lib/quote.ts",
        code: `export type Quote = {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
};

/**
 * The single canonical order: subtotal, then discount, then delivery on the
 * discounted subtotal, then tax-free total.
 */
export function quote(params: {
  lines: { unitPrice: number; quantity: number }[];
  zone: Zone;
  percentOff: number;
}): Quote {
  const subtotal = params.lines.reduce(
    (sum, line) => sum + line.unitPrice * line.quantity,
    0
  );

  const discount = Math.floor((subtotal * clampPercent(params.percentOff)) / 100);
  const delivery = deliveryCost(params.zone, subtotal - discount);

  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

function clampPercent(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.min(value, 90);
}`,
      },

      { kind: "h2", id: "test-it", text: "This is the code worth testing" },
      {
        kind: "p",
        text: "A pure function with no dependencies is trivially testable, and pricing is exactly the logic you cannot afford to get wrong. The table does not need to be large to be useful: boundary values around each free-delivery threshold catch most real mistakes.",
      },
      {
        kind: "code",
        lang: "ts",
        file: "lib/delivery.test.ts",
        code: `import { describe, it, expect } from "vitest";
import { deliveryCost } from "./delivery";

describe("deliveryCost", () => {
  it("charges the flat rate below the free threshold", () => {
    expect(deliveryCost("inside-dhaka", 2999)).toBe(60);
  });

  it("is free exactly at the threshold", () => {
    expect(deliveryCost("inside-dhaka", 3000)).toBe(0);
  });

  it("always charges remote zones", () => {
    expect(deliveryCost("remote", 99_999)).toBe(130);
  });

  it("rejects an unknown zone rather than defaulting to free", () => {
    expect(() => deliveryCost("mars" as Zone, 1000)).toThrow();
  });

  it("rejects a negative subtotal", () => {
    expect(() => deliveryCost("inside-dhaka", -1)).toThrow();
  });
});`,
      },
      {
        kind: "callout",
        tone: "note",
        title: "Why not do it in the database",
        text: "It is possible to express free delivery over ৳3000 inside a SQL query. Then the checkout preview and the order record disagree whenever the query and the UI round differently, and there is no single place to read the rule. Business logic in a query is fine for reporting; it is a poor home for the number a customer is charged.",
      },
    ],
  },

  {
    slug: "server-state-is-not-client-state",
    title: "Server state is not client state",
    description:
      "A React app has two kinds of state, and putting both in a global store is how stale totals survive a successful order. TanStack Query as the boundary.",
    topic: "Frontend architecture",
    tags: ["React", "TanStack Query", "State management", "Caching"],
    updated: AUTHORED,
    related: ["validate-once-at-the-boundary", "client-only-spas-and-seo"],
    body: [
      {
        kind: "p",
        text: "In a React application backed by an API there are two different things called state, and they have opposite rules. Client state is authoritative in the browser: the contents of a cart, whether a menu is open, the Stripe publishable key. Server state is a copy of something that lives on the API, and it is always a copy, no matter how confident the UI looks.",
      },
      {
        kind: "p",
        text: "The Local Chef Bazaar client uses TanStack Query for the second kind and React context for the first, and the reason is not preference. It is that the two have different lifecycles.",
      },

      { kind: "h2", id: "the-symptom", text: "How this goes wrong" },
      {
        kind: "p",
        text: "Mirror server data into a global store and it looks fine until a mutation succeeds. The order is created, the API returns 201, the query cache is invalidated and refetched, and the new value arrives in the query cache. The copy in the global store is a different object, held by a different subscriber, and nobody told it. The user sees the old total next to the confirmation.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "The rule that prevents it",
        text: "A value that came from the API should be read through the query cache and written through a mutation. If it is also in a context, it has two sources of truth and one of them is already wrong.",
      },

      { kind: "h2", id: "keys", text: "Query keys are the design" },
      {
        kind: "p",
        text: "The key is the address of a piece of server state, and getting the shape right does more work than any other single decision in a data layer. The rule that holds up: a key describes everything that changes the result, and nothing else.",
      },
      {
        kind: "code",
        lang: "ts",
        file: "features/orders/api.ts",
        caption: "Condensed from the pattern used in the food marketplace client.",
        code: `import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// The key factory is the important part: one place defines every address,
// and every hook derives its key from it.
export const orderKeys = {
  all: ["orders"] as const,
  list: (cookId?: string) => [...orderKeys.all, "list", { cookId }] as const,
  detail: (id: string) => [...orderKeys.all, "detail", id] as const,
};

export function useOrder(id: string) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => api.get(\`/orders/\${id}\`).then((r) => r.data),
  });
}

export function useCancelOrder() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.post(\`/orders/\${id}/cancel\`),
    onSuccess: (_data, id) => {
      // Targeted invalidation: refetch this order, plus any list it appears in.
      qc.invalidateQueries({ queryKey: orderKeys.detail(id) });
      qc.invalidateQueries({ queryKey: orderKeys.list() });
    },
  });
}`,
      },
      {
        kind: "p",
        text: "A key factory is worth the extra file. The alternative is key strings written at each call site, and the first time someone writes `\"orders\"` instead of `orderKeys.all` the cache splits in two and a mutation invalidates half of it.",
      },

      { kind: "h2", id: "mutations", text: "Mutations are the interesting part" },
      {
        kind: "p",
        text: "A query answers \"what is true now\". A mutation changes what is true, and its callbacks are where the cache is repaired. Three callbacks cover almost everything.",
      },
      {
        kind: "features",
        items: [
          {
            title: "onMutate",
            text: "Runs before the request. Cancel in-flight queries for the same key and snapshot the previous value, so the UI can show an optimistic update and roll back if the request fails.",
          },
          {
            title: "onSuccess",
            text: "The mutation succeeded. Either write the returned value into the cache with `setQueryData`, which avoids a round trip entirely, or invalidate the affected keys.",
          },
          {
            title: "onError",
            text: "Restore the snapshot taken in `onMutate`. This is the step people skip, and skipping it is how an optimistic update becomes permanent.",
          },
        ],
      },
      {
        kind: "code",
        lang: "ts",
        file: "features/orders/usePlaceOrder.ts",
        code: `export function usePlaceOrder() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: PlaceOrderInput) =>
      api.post("/orders", input).then((r) => r.data as Order),

    onSuccess: (order) => {
      // The response IS the new state. No refetch needed for this key.
      qc.setQueryData(orderKeys.detail(order.id), order);
      qc.invalidateQueries({ queryKey: orderKeys.list() });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Could not place the order");
    },
  });
}`,
      },
      {
        kind: "p",
        text: "Using `setQueryData` with the response rather than invalidating is the cheapest performance win in a data layer. The server has already told you the answer. Throwing it away and asking again is a wasted request on every single mutation.",
      },

      { kind: "h2", id: "forms", text: "Forms are not server state" },
      {
        kind: "p",
        text: "An in-progress order form is client state, even though it will become server state. The client also uses `react-hook-form`, and the split is clean: the form library owns field values, validation messages and dirty state, and the moment the form is submitted the values leave for the mutation and the form is reset.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "A quick test for which bucket you are in",
        text: "Ask whether reloading the page should keep the value. If yes it is client state and the browser is the source of truth. If no, it is server state and the API is.",
      },
    ],
  },

  {
    slug: "mongodb-in-next-route-handlers",
    title: "MongoDB from Next.js route handlers",
    description:
      "Connecting a Mongoose model to an App Router route handler without opening a new pool per request, and being honest about what the single-service boundary costs you.",
    topic: "Full-stack",
    tags: ["Next.js", "MongoDB", "Mongoose", "Server"],
    updated: AUTHORED,
    related: ["server-state-is-not-client-state", "client-only-spas-and-seo"],
    body: [
      {
        kind: "p",
        text: "The Unity Shop frontend talks to MongoDB directly, with Mongoose as a dependency of the Next.js application rather than of a separate service. That is a legitimate architecture for a small team, and the reason it can work at all is connection reuse.",
      },
      {
        kind: "p",
        text: "Get that wrong and every request opens its own set of sockets, which is the single most common way a serverless deployment runs out of file descriptors or hits the connection limit.",
      },

      { kind: "h2", id: "reuse-the-connection", text: "Reuse the connection" },
      {
        kind: "p",
        text: "The driver manages a pool underneath, and `mongoose.connect` will reuse an existing connection if one is already open. The pattern is to keep the promise in a module-level variable that survives between requests in the same instance, and await that promise on each call.",
      },
      {
        kind: "code",
        lang: "ts",
        file: "lib/mongoose.ts",
        caption: "Condensed from the connection pattern this project relies on.",
        code: `import mongoose from "mongoose";

// Survives across requests handled by the same warm instance.
let connection: Promise<typeof mongoose> | null = null;

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not set");

export function connect() {
  connection ??= mongoose
    .connect(uri, {
      // Fail fast instead of buffering commands until the timeout.
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    })
    .catch((error) => {
      // Clear the cached promise so the next request can retry.
      connection = null;
      throw error;
    });

  return connection;
}`,
      },
      {
        kind: "callout",
        tone: "warning",
        title: "The line that matters",
        text: "Setting the cached promise back to `null` in the catch block. Without it, a single failed cold start leaves a rejected promise cached forever and every later request fails with the same first error, long after the database is reachable again.",
      },
      {
        kind: "p",
        text: "`bufferCommands: false` is the other decision worth making. The default is to queue operations while the driver is connecting, which turns a slow connection into a slow request instead of a clear error. Turning it off means a cold start fails fast and the platform can retry the invocation, which is the behaviour you actually want.",
      },

      { kind: "h2", id: "the-handler", text: "A handler that leans on it" },
      {
        kind: "code",
        lang: "ts",
        file: "app/api/products/route.ts",
        code: `import { NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export async function GET(req: Request) {
  await connect();

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(48, Number(searchParams.get("limit") ?? 24));

  const [items, total] = await Promise.all([
    Product.find({ status: "active" })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Product.countDocuments({ status: "active" }),
  ]);

  return NextResponse.json({ items, total, page, limit });
}`,
      },
      {
        kind: "p",
        text: "Three details there are ordinary and easy to get wrong. `limit` is clamped so a client cannot ask for the entire collection. The two queries run concurrently with `Promise.all` rather than in sequence, because on a cold connection the round trip dominates. And `.lean()` skips Mongoose's document hydration, which matters when you are serialising the whole result to JSON anyway.",
      },

      { kind: "h2", id: "what-it-costs", text: "What the single-service boundary costs" },
      {
        kind: "p",
        text: "Running the data access inside the frontend deploy is convenient, and the costs are worth writing down rather than discovering.",
      },
      {
        kind: "ul",
        items: [
          "**The database's availability is now the app's availability.** There is no second service that can absorb a traffic spike, so everything scales together or not at all.",
          "**Schema changes ship with the UI.** A migration that breaks the API breaks the pages, and there is no window where the two can be deployed independently.",
          "**Cold starts are on the critical path.** The first request after a period of inactivity pays for the database handshake. Keeping the connection warm is the mitigation.",
          "**There is no network boundary to enforce anything.** Anything that can reach a route handler can reach the models, so authorisation has to be explicit in each handler rather than implied by deployment topology.",
        ],
      },
      {
        kind: "callout",
        tone: "note",
        title: "When I would split it",
        text: "The moment something else needs the data. A second consumer, a mobile client, a worker that has to run on a schedule, or a requirement that the API keep serving while the frontend is being deployed. Any of those makes the separate service worth its cost.",
      },
    ],
  },

  {
    slug: "client-only-spas-and-seo",
    title: "The cost of a client-only SPA",
    description:
      "An empty mount point is not a rendering detail. What a Vite single-page app gives up in SEO, first paint and failure modes, and what the alternatives cost.",
    topic: "Frontend architecture",
    tags: ["React", "Vite", "SEO", "Rendering"],
    updated: AUTHORED,
    related: ["server-state-is-not-client-state", "mongodb-in-next-route-handlers"],
    body: [
      {
        kind: "p",
        text: "The Local Chef Bazaar deployment serves a complete HTML document whose entire body is `<div id=\"root\"></div>`. That is a normal, correct Vite output and the application works perfectly once JavaScript runs. But it is worth being precise about what that means, because \"it works in the browser\" and \"it is a working web page\" are different claims.",
      },

      { kind: "h2", id: "what-arrives", text: "What actually arrives" },
      {
        kind: "code",
        lang: "html",
        file: "Response body, in full",
        code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Local_Chef_Bazaar</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
      },
      {
        kind: "p",
        text: "No headings, no navigation, no product names, no prices, no meta description, no Open Graph tags. Everything the user sees is constructed after the bundle downloads and executes.",
      },

      { kind: "h2", id: "consequences", text: "The four consequences" },
      {
        kind: "features",
        items: [
          {
            title: "Nothing to index",
            text: "A crawler that does not execute JavaScript sees an empty page. The catalogue, the cook profiles and the reviews are all invisible to it.",
          },
          {
            title: "No preview on a link",
            text: "Sharing a link to a cook's page in a chat app renders as a bare title, because there are no Open Graph tags to describe it.",
          },
          {
            title: "A blank first paint",
            text: "On a mid-range Android device the useful content arrives after the bundle has downloaded, parsed and executed. Time to first byte is fine; time to first content is not.",
          },
          {
            title: "A hard failure mode",
            text: "If the bundle fails to load, there is no content at all and no server-rendered fallback to show.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "note",
        title: "Not an indictment",
        text: "For a dashboard behind a login, or an internal tool, all four are irrelevant and a client-only SPA is the right call. The question is only whether a public marketplace is that kind of application. It is not.",
      },

      { kind: "h2", id: "the-options", text: "The options, honestly costed" },
      {
        kind: "table",
        head: ["Approach", "Gains", "Costs"],
        rows: [
          [
            "Client-only SPA",
            "Simplest mental model, cheap navigation, one build step",
            "No indexable content, blank first paint, hard JS dependency",
          ],
          [
            "Static generation",
            "Real HTML per route, fast, cheap hosting",
            "Content is frozen at build time, so catalogue updates need a rebuild",
          ],
          [
            "Incremental static generation",
            "HTML per route, rebuilt on demand",
            "Needs a platform that supports revalidation; stale windows to reason about",
          ],
          [
            "Server rendering per request",
            "Always-fresh HTML, per-user content possible",
            "Every request pays render cost; more moving parts in production",
          ],
        ],
      },
      {
        kind: "p",
        text: "For a catalogue that changes when a cook adds a dish, incremental static generation is usually the right answer: the listing pages are regenerated on a schedule, and the checkout path is client-rendered anyway because it depends on the signed-in user.",
      },

      { kind: "h2", id: "if-you-stay", text: "If you stay client-only" },
      {
        kind: "p",
        text: "The choice is reversible, but the cheap mitigations are worth doing regardless of whether rendering ever moves server-side.",
      },
      {
        kind: "ol",
        items: [
          "Write a real `<title>` per route instead of leaving the default. In a SPA that means updating `document.title` on navigation.",
          "Add a meta description and Open Graph tags so shared links render.",
          "Set `lang` on the `<html>` element to the language the interface actually uses.",
          "Ship the title and description in the initial HTML even if the body is empty; a crawler reads the head.",
          "Keep the bundle small. Most of the perceived-performance gap here is bundle weight, not architecture.",
        ],
      },
      {
        kind: "code",
        lang: "tsx",
        file: "Routes with document metadata",
        code: `import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TITLES: Record<string, string> = {
  "/": "Local Chef Bazaar — home cooks near you",
  "/browse": "Browse menus",
  "/orders": "Your orders",
};

export function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const title = TITLES[pathname] ?? "Local Chef Bazaar";
    document.title = title;

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    description?.setAttribute(
      "content",
      "Order from independent home cooks near you."
    );
  }, [pathname]);

  return null;
}`,
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Metadata written from an effect is late",
        text: "That component works for humans and for crawlers that execute JavaScript, which is most of them but not all. It does not help a crawler that reads the head and stops. If discoverability matters, the fix is server-rendered metadata, not client-side patching.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticleSlugs(): string[] {
  return articles.map((article) => article.slug);
}

/** Sorts by authored date, newest first. */
export function getArticlesOrdered(): Article[] {
  return [...articles].sort((a, b) =>
    (b.updated ?? "").localeCompare(a.updated ?? "")
  );
}

export function getArticleNeighbours(slug: string): {
  previous?: Article;
  next?: Article;
} {
  const ordered = getArticlesOrdered();
  const index = ordered.findIndex((article) => article.slug === slug);

  return {
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}

export function getRelatedArticles(slugs: string[]): Article[] {
  return slugs
    .map((slug) => getArticle(slug))
    .filter((article): article is Article => Boolean(article));
}