"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { ProjectCategory } from "@/content/types";
import ProjectCard, { type ProjectCardProps } from "./ProjectCard";

const ALL = "All" as const;
type FilterValue = ProjectCategory | typeof ALL;

type Props = {
  projects: ProjectCardProps[];
  categories: ProjectCategory[];
};

export default function ProjectDirectory({ projects, categories }: Props) {
  const [filter, setFilter] = useState<FilterValue>(ALL);
  const [query, setQuery] = useState("");

  const normalisedQuery = query.trim().toLowerCase();

  const counts = useMemo(() => {
    const map = new Map<FilterValue, number>([[ALL, projects.length]]);

    for (const project of projects) {
      for (const category of project.categories) {
        map.set(category, (map.get(category) ?? 0) + 1);
      }
    }

    return map;
  }, [projects]);

  const visible = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        filter === ALL || project.categories.includes(filter);

      if (!matchesCategory) return false;
      if (normalisedQuery.length === 0) return true;

      const haystack = [
        project.name,
        project.tagline,
        project.summary,
        project.contribution,
        ...project.categories,
        ...project.techKeys,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalisedQuery);
    });
  }, [projects, filter, normalisedQuery]);

  const hasActiveFilter = filter !== ALL || normalisedQuery.length > 0;

  const reset = () => {
    setFilter(ALL);
    setQuery("");
  };

  return (
    <div>
      {/* Controls */}
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="label shrink-0 text-fg-muted">Filter</span>
            <ul className="flex flex-wrap gap-1.5">
              <li>
                <FilterChip
                  active={filter === ALL}
                  onClick={() => setFilter(ALL)}
                  count={counts.get(ALL) ?? 0}
                >
                  {ALL}
                </FilterChip>
              </li>
              {categories.map((category) => {
                const count = counts.get(category) ?? 0;
                if (count === 0) return null;

                return (
                  <li key={category}>
                    <FilterChip
                      active={filter === category}
                      onClick={() => setFilter(category)}
                      count={count}
                    >
                      {category}
                    </FilterChip>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <label htmlFor="project-search" className="sr-only">
                Search projects by name, stack or category
              </label>
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg-muted"
              />
              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects"
                className="w-full rounded-md border border-line bg-canvas py-2.5 pl-9 pr-9 text-sm text-fg placeholder:text-fg-muted focus:border-line-strong focus:outline-none"
              />
              {query.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-fg-muted transition-colors hover:text-fg"
                >
                  <X aria-hidden className="size-4" />
                </button>
              ) : null}
            </div>

            <p
              aria-live="polite"
              className="shrink-0 font-mono text-xs text-fg-muted"
            >
              {visible.length} of {projects.length} projects
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      {visible.length > 0 ? (
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {visible.map((project) => (
            <li key={project.slug} className="h-full">
              <ProjectCard {...project} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-line px-6 py-14 text-center">
          <p className="text-base font-medium text-fg">No projects match</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-fg-secondary">
            {normalisedQuery
              ? `Nothing matches “${query.trim()}”. Try a technology name such as React, or clear the search.`
              : "No projects in this category yet."}
          </p>
          {hasActiveFilter ? (
            <button
              type="button"
              onClick={reset}
              className="mt-5 inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-line-strong"
            >
              <X aria-hidden className="size-4" />
              Reset filters
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm transition-colors ${
        active
          ? "border-accent bg-accent-soft font-medium text-accent-text"
          : "border-line text-fg-secondary hover:border-line-strong hover:text-fg"
      }`}
    >
      {children}
      <span
        className={`font-mono text-[11px] ${
          active ? "text-accent-text" : "text-fg-muted"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
