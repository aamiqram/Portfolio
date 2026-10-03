import { Fragment } from "react";
import type { ContentBlock } from "@/content/types";
import InlineText from "./InlineText";
import CodeBlock from "./CodeBlock";
import Callout from "./Callout";
import Diagram from "./Diagram";
import LinkList from "./LinkList";
import { ContentTable, FeatureList, StatGrid } from "./Blocks";

type Props = {
  blocks: ContentBlock[];
};

/**
 * Renders a content body. Static by design — everything here is a server
 * component, so a documentation page ships no JavaScript for its prose.
 */
export default function ContentRenderer({ blocks }: Props) {
  return (
    <div className="prose-docs" data-article-body>
      {blocks.map((block, index) => {
        const key = `${block.kind}-${index}`;

        switch (block.kind) {
          case "p":
            return (
              <p key={key}>
                <InlineText text={block.text} />
              </p>
            );

          case "h2":
            return (
              <h2 key={key} id={block.id}>
                <a href={`#${block.id}`} className="no-underline hover:underline">
                  {block.text}
                </a>
              </h2>
            );

          case "h3":
            return (
              <h3 key={key} id={block.id}>
                <a href={`#${block.id}`} className="no-underline hover:underline">
                  {block.text}
                </a>
              </h3>
            );

          case "ul":
            return (
              <ul key={key}>
                {block.items.map((item, itemIndex) => (
                  <li key={`${key}-${itemIndex}`}>
                    <InlineText text={item} />
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={key}>
                {block.items.map((item, itemIndex) => (
                  <li key={`${key}-${itemIndex}`}>
                    <InlineText text={item} />
                  </li>
                ))}
              </ol>
            );

          case "features":
            return <FeatureList key={key} items={block.items} />;

          case "code":
            return (
              <CodeBlock
                key={key}
                code={block.code}
                lang={block.lang}
                file={block.file}
                caption={block.caption}
              />
            );

          case "callout":
            return (
              <Callout key={key} tone={block.tone} title={block.title} text={block.text} />
            );

          case "quote":
            return (
              <blockquote key={key}>
                <p>
                  <InlineText text={block.text} />
                </p>
                {block.by ? (
                  <footer className="mt-2 font-mono text-xs text-fg-muted">
                    {block.by}
                  </footer>
                ) : null}
              </blockquote>
            );

          case "diagram":
            return (
              <Diagram key={key} nodes={block.nodes} caption={block.caption} note={block.note} />
            );

          case "stats":
            return <StatGrid key={key} items={block.items} caption={block.caption} />;

          case "links":
            return <LinkList key={key} items={block.items} />;

          case "table":
            return (
              <ContentTable key={key} head={block.head} rows={block.rows} caption={block.caption} />
            );

          case "hr":
            return <hr key={key} className="my-8 border-line" />;

          default:
            return <Fragment key={key} />;
        }
      })}
    </div>
  );
}