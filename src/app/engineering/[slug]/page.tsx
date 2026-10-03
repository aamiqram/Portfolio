import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import {
  getArticle,
  getArticleNeighbours,
  getArticleSlugs,
  getArticlesOrdered,
  getRelatedArticles,
} from "@/content/engineering";
import { extractToc } from "@/lib/content";
import { formatDate, readingTime } from "@/lib/reading-time";
import DocsShell from "@/components/docs/DocsShell";
import Breadcrumbs from "@/components/docs/Breadcrumbs";
import ReadingProgress from "@/components/docs/ReadingProgress";
import ContentRenderer from "@/components/content/ContentRenderer";
import type { DocNavSection } from "@/components/docs/nav";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return { title: "Note not found" };

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/engineering/${article.slug}` },
    keywords: article.tags,
    openGraph: {
      title: `${article.title} · AAMIQRAM`,
      description: article.description,
      url: `/engineering/${article.slug}`,
      type: "article",
      publishedTime: article.updated,
      modifiedTime: article.updated,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} · AAMIQRAM`,
      description: article.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const toc = extractToc(article.body);
  const related = getRelatedArticles(article.related);
  const { previous, next } = getArticleNeighbours(article.slug);

  const sections: DocNavSection[] = [
    {
      title: "Engineering",
      items: getArticlesOrdered().map((item) => ({
        href: `/engineering/${item.slug}`,
        label: item.title,
        meta: `${readingTime(item.body)} min`,
      })),
    },
    {
      title: "Reference",
      items: [
        { href: "/projects", label: "Projects" },
        { href: "/tech-stack", label: "Tech stack" },
      ],
    },
  ];

  return (
    <>
      <ReadingProgress />
      <DocsShell
        sections={sections}
        currentHref={`/engineering/${article.slug}`}
        toc={toc}
      header={
        <>
          <Breadcrumbs
            trail={[
              { href: "/", label: "Home" },
              { href: "/engineering", label: "Engineering" },
            ]}
            current={article.title}
          />

          <p className="label mt-6 text-accent-text">{article.topic}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-fg-secondary">
            {article.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line py-4 font-mono text-xs text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden className="size-3.5" />
              {readingTime(article.body)} min read
            </span>
            {article.updated ? (
              <span>Updated {formatDate(article.updated)}</span>
            ) : null}
            <span>{toc.length} sections</span>
          </div>
        </>
      }
      footer={
        <>
          {related.length > 0 ? (
            <section aria-labelledby="related-heading" className="mb-10">
              <h2 id="related-heading" className="label mb-4 text-fg-muted">
                Related notes
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/engineering/${item.slug}`}
                      className="group flex h-full flex-col rounded-lg border border-line px-4 py-3 transition-colors hover:border-line-strong"
                    >
                      <span className="label text-fg-muted">{item.topic}</span>
                      <span className="mt-1.5 text-sm font-medium leading-snug text-fg transition-colors group-hover:text-accent-text">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <nav
            aria-label="Article pagination"
            className="grid gap-3 border-t border-line pt-6 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/engineering/${previous.slug}`}
                className="group rounded-lg border border-line px-4 py-3 transition-colors hover:border-line-strong"
              >
                <span className="label text-fg-muted">Previous</span>
                <span className="mt-1 flex items-center gap-1.5 text-sm font-medium text-fg">
                  <ArrowLeft
                    aria-hidden
                    className="size-3.5 transition-transform group-hover:-translate-x-0.5"
                  />
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                href={`/engineering/${next.slug}`}
                className="group rounded-lg border border-line px-4 py-3 text-right transition-colors hover:border-line-strong"
              >
                <span className="label text-fg-muted">Next</span>
                <span className="mt-1 flex items-center justify-end gap-1.5 text-sm font-medium text-fg">
                  {next.title}
                  <ArrowRight
                    aria-hidden
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ) : null}
          </nav>
        </>
      }
    >
      <ContentRenderer blocks={article.body} />
    </DocsShell>
    </>
  );
}