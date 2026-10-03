import type { Metadata } from "next";
import {
  projectCategories,
  projects,
  toProjectSummary,
} from "@/content/projects";
import ProjectDirectory from "@/components/projects/ProjectDirectory";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web, e-commerce, full-stack and Android projects, with the engineering behind each one and an explicit note on how the claims were verified.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects · AAMIQRAM",
    description:
      "Case studies covering commerce, data modelling, authentication, payments and one native Android application.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  const summaries = projects
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(toProjectSummary);

  return (
    <div className="mx-auto w-full max-w-[100rem] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeading
        level="page"
        eyebrow="// Directory"
        description="Commerce, full-stack and Android work. Each case study separates what was verified against source from what the developer reported, because a portfolio that cannot tell those apart is not worth reading."
      >
        Projects
      </SectionHeading>

      <div className="mt-14">
        <ProjectDirectory projects={summaries} categories={projectCategories} />
      </div>
    </div>
  );
}