import { highlight, languageLabel } from "@/lib/highlight";
import CopyButton from "./CopyButton";

type CodeBlockProps = {
  code: string;
  lang: string;
  file?: string;
  caption?: string;
};

/**
 * Server-rendered code block. Highlighting happens at build time, so no
 * highlighter runtime is shipped to the browser.
 */
export default function CodeBlock({ code, lang, file, caption }: CodeBlockProps) {
  const html = highlight(code.trim(), lang);

  return (
    <figure className="not-prose my-6">
      <div className="overflow-hidden rounded-lg border border-line bg-surface-2">
        {/*
          The file / ref line wraps rather than truncating. A repo@branch such
          as `UnityShop-Sever @ iqram` is evidence for the verification label,
          so an ellipsis would hide the citation on exactly the narrow screens
          where the reader is most likely to want to copy it.
        */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-line bg-surface px-3 py-2">
          <span className="min-w-0 break-words font-mono text-xs text-fg-secondary">
            {file ?? languageLabel(lang)}
          </span>
          <div className="flex shrink-0 items-center gap-2">
            <span className="label hidden text-fg-muted sm:inline">
              {languageLabel(lang)}
            </span>
            <CopyButton value={code.trim()} />
          </div>
        </div>
        <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed">
          <code
            className="font-mono text-fg-secondary"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </pre>
      </div>
      {caption ? (
        <figcaption className="mt-2 text-xs text-fg-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}