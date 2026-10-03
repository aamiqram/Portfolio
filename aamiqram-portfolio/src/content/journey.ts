/**
 * Education, training and current direction.
 *
 * Every entry here is a fact that can be checked against something outside this
 * site: the degree and the college are real and still running, the training
 * programme is real and still running. Nothing is marked complete, and there is
 * deliberately no employment, client or open-source history in this file,
 * because there is none to state.
 *
 * The dates are the years each thing started. Where something is ongoing the
 * `state` field says so explicitly rather than leaving the reader to infer it
 * from a missing end date.
 */

export type JourneyState = "ongoing" | "current";

export type JourneyEntry = {
  id: string;
  /** Year the entry began. Rendered as the timeline marker. */
  since: string;
  title: string;
  /** Where it happened. */
  place: string;
  state: JourneyState;
  /** What it actually involved, in one or two sentences. */
  detail: string;
  /** The part of it that connects to the work on this site. */
  relevance?: string;
};

export const journey: JourneyEntry[] = [
  {
    id: "mathematics",
    since: "2023",
    title: "BSc in Mathematics",
    place: "Chittagong College",
    state: "ongoing",
    detail:
      "An undergraduate degree in mathematics, taken alongside the programming work rather than before it. Proofs, stated assumptions, and being told precisely where a claim stops being true.",
    relevance:
      "It trained the habit this portfolio keeps returning to: an interface bug is very often an assumption nobody checked.",
  },
  {
    id: "programming-hero",
    since: "2025",
    title: "MERN Stack Web Development",
    place: "Programming Hero",
    state: "ongoing",
    detail:
      "Full-stack web development coursework with a real scope per assignment: an Express and MongoDB API behind a React client, then Stripe checkout, then Firebase-backed authentication.",
    relevance:
      "Most of the projects in the directory came out of it. The coursework supplied the structure; the parts I kept were the decisions about where data lives and what the API is allowed to assume.",
  },
  {
    id: "now",
    since: "Now",
    title: "Building whole products, not screens",
    place: "Chattogram, Bangladesh",
    state: "current",
    detail:
      "Working end to end: the interface, the API, the schema and the deployment. Right now that means commerce — catalogues, checkout, delivery rules, order state — and the occasional native application when I want to understand a platform other than the browser.",
    relevance:
      "I am looking for work where I can own a feature end to end and keep learning in the layer between the interface and the database.",
  },
];

export const journeyById: Record<string, JourneyEntry> = Object.fromEntries(
  journey.map((entry) => [entry.id, entry])
);