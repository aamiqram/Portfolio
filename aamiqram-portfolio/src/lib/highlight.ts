/**
 * A small, dependency-free syntax highlighter that runs at build time on the
 * server. It tokenises with sticky regexes one position at a time, which keeps
 * the rules readable and avoids fragile capture-group index math.
 *
 * Every matched slice is HTML-escaped before it is emitted, so this is safe to
 * render with `dangerouslySetInnerHTML`.
 */

type RuleInput = readonly [cls: string, source: string | RegExp];
type Rule = readonly [cls: string, re: RegExp];

function rules(...entries: RuleInput[]): Rule[] {
  return entries.map(([cls, source]) => [
    cls,
    typeof source === "string" ? new RegExp(source, "y") : source,
  ]);
}

const IDENT = "[A-Za-z_$][\\w$]*";

const JS_KEYWORDS =
  "as|async|await|break|case|catch|class|const|continue|declare|default|delete|do|else|export|" +
  "extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|" +
  "of|private|protected|public|readonly|return|satisfies|set|static|super|switch|this|throw|" +
  "try|type|typeof|var|void|while|with|yield";

const JS_LITERALS = "true|false|null|undefined|NaN|Infinity";

const SHARED = rules(
  ["tok-comment", "//[^\\n]*"],
  ["tok-comment", "/\\*[\\s\\S]*?\\*/"],
  ["tok-string", '"(?:[^"\\\\\\n]|\\\\.)*"?'],
  ["tok-string", "'(?:[^'\\\\\\n]|\\\\.)*'?"],
  ["tok-string", "`(?:[^`\\\\]|\\\\.)*`?"],
  ["tok-number", "\\b0[xXbBoO][0-9a-fA-F_]+\\b"],
  ["tok-number", "\\b\\d[\\d_]*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b"],
  ["tok-punct", "[{}()\\[\\];:,.<>=+\\-*/%&|!?~^@]"],
  ["", "\\s+"]
);

const JS = rules(
  ["tok-keyword", `\\b(?:${JS_KEYWORDS})\\b`],
  ["tok-number", `\\b(?:${JS_LITERALS})\\b`],
  ["tok-tag", `<\\/?${IDENT}(?:\\.[\\w$-]+)*`],
  ["tok-fn", `${IDENT}(?=\\s*\\()`],
  ["tok-prop", `(?<=\\.)${IDENT}`],
  ["tok-type", "\\b[A-Z][\\w$]*\\b"],
  ["", IDENT],
  ...SHARED
);

const TS = rules(
  ["tok-keyword", `\\b(?:${JS_KEYWORDS}|type|interface|enum|namespace|abstract)\\b`],
  ["tok-number", `\\b(?:${JS_LITERALS})\\b`],
  ["tok-tag", `<\\/?${IDENT}(?:\\.[\\w$-]+)*`],
  ["tok-prop", `(?<=\\.)${IDENT}(?=\\s*[:,(])`],
  ["tok-var", "\\b[A-Z][A-Z0-9_]{2,}\\b"],
  ["tok-type", "\\b[A-Z][\\w$]*\\b"],
  ["tok-fn", `${IDENT}(?=\\s*[(<])`],
  ["", IDENT],
  ...SHARED
);

const JSON_RULES = rules(
  ["tok-prop", '"(?:[^"\\\\]|\\\\.)*"(?=\\s*:)'],
  ["tok-string", '"(?:[^"\\\\]|\\\\.)*"'],
  ["tok-keyword", "\\b(?:true|false|null)\\b"],
  ["tok-number", "-?\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b"],
  ["tok-punct", "[{}\\[\\],:]"],
  ["", "\\s+"]
);

const BASH = rules(
  ["tok-comment", "#[^\\n]*"],
  ["tok-string", '"(?:[^"\\\\]|\\\\.)*"?'],
  ["tok-string", "'[^']*'?"],
  ["tok-var", "\\$\\{[^}]*\\}|\\$[A-Za-z_][\\w]*"],
  ["tok-flag", "(?<=\\s)--?[A-Za-z][\\w-]*"],
  ["tok-prop", "\\b[A-Za-z_][\\w-]*(?==)"],
  ["tok-punct", "[|&;()<>{}]"],
  ["tok-number", "\\b\\d+\\b"],
  ["", "[A-Za-z_][\\w./-]*"],
  ["", "\\s+"],
  ["tok-punct", "\\S"]
);

const SQL = rules(
  ["tok-comment", "--[^\\n]*"],
  ["tok-comment", "/\\*[\\s\\S]*?\\*/"],
  ["tok-string", "'(?:[^'\\\\]|\\\\.)*'?"],
  ["tok-string", '"(?:[^"\\\\]|\\\\.)*"?'],
  ["tok-keyword", "\\b(?:SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|PRIMARY|KEY|FOREIGN|REFERENCES|NOT|NULL|DEFAULT|UNIQUE|INDEX|AND|OR|AS|IN|EXISTS|CASE|WHEN|THEN|END|RETURNING|CONSTRAINT|REFERENCES|CHECK|CASCADE|COUNT|SUM|AVG|MIN|MAX)\\b"],
  ["tok-type", "\\b(?:int|integer|bigint|smallint|serial|text|varchar|char|boolean|bool|date|timestamp|timestamptz|numeric|decimal|real|double|json|jsonb|uuid|bytea|ARRAY)\\b"],
  ["tok-number", "\\b\\d+(?:\\.\\d+)?\\b"],
  ["tok-fn", "\\b[a-z_][\\w$]*(?=\\s*\\()"],
  ["", "[A-Za-z_][\\w$]*"],
  ["tok-punct", "[(),;.*=<>+\\-/]"],
  ["", "\\s+"],
  ["tok-punct", "\\S"]
);

const PRISMA = rules(
  ["tok-comment", "//[^\\n]*"],
  ["tok-string", '"(?:[^"\\\\]|\\\\.)*"?'],
  ["tok-keyword", "\\b(?:datasource|generator|model|enum|type|view|extend)\\b"],
  ["tok-keyword", "\\b(?:provider|output|url|relation|onDelete|onUpdate|map|default|updatedAt|dbgenerated|dbgenerated|matches|native|fulltext|index|fulltextIndex|previewFeatures|referentialActions|relationMode)\\b"],
  ["tok-flag", "@[A-Za-z][\\w]*"],
  ["tok-type", "\\b[A-Z][\\w$]*\\b"],
  ["tok-number", "\\b\\d+(?:\\.\\d+)?\\b"],
  ["tok-fn", `${IDENT}(?=\\()`],
  ["", IDENT],
  ["tok-punct", "[{}()\\[\\];:,.<>=+*/-]"],
  ["", "\\s+"],
  ["tok-punct", "\\S"]
);

const CSS = rules(
  ["tok-comment", "/\\*[\\s\\S]*?\\*/"],
  ["tok-string", '"(?:[^"\\\\]|\\\\.)*"?'],
  ["tok-string", "'[^']*'?"],
  ["tok-keyword", "@[a-z-]+"],
  ["tok-prop", "[-a-zA-Z]+(?=\\s*:)"],
  ["tok-number", "-?\\b\\d+(?:\\.\\d+)?(?:px|rem|em|%|vh|vw|s|ms|deg|fr|ch)?\\b"],
  ["tok-fn", "\\b[a-z-]+(?=\\()"],
  ["", "[A-Za-z-]+"],
  ["tok-punct", "[{}();:,>+~*]"],
  ["", "\\s+"],
  ["tok-punct", "\\S"]
);

const XML = rules(
  ["tok-comment", "<!--[\\s\\S]*?-->"],
  ["tok-tag", "</?[A-Za-z][\\w:.-]*"],
  ["tok-string", '"(?:[^"\\\\]|\\\\.)*"?'],
  ["tok-string", "'[^']*'?"],
  ["tok-attr", "[A-Za-z_][\\w:.-]*(?=\\s*=)"],
  ["tok-punct", "/?>|[<]"],
  ["tok-var", "&[A-Za-z#\\d]+;"],
  ["", "\\s+"],
  ["tok-punct", "\\S"]
);

const PLAIN: Rule[] = [];

const SETS: Record<string, Rule[]> = {
  ts: TS,
  tsx: TS,
  typescript: TS,
  js: JS,
  jsx: JS,
  javascript: JS,
  mjs: JS,
  json: JSON_RULES,
  jsonc: JSON_RULES,
  bash: BASH,
  sh: BASH,
  shell: BASH,
  console: BASH,
  sql: SQL,
  prisma: PRISMA,
  css: CSS,
  scss: CSS,
  xml: XML,
  html: XML,
  svg: XML,
  yml: BASH,
  yaml: BASH,
  env: BASH,
  dotenv: BASH,
  text: PLAIN,
  txt: PLAIN,
  diff: PLAIN,
};

export const SUPPORTED_LANGUAGES = Object.keys(SETS).filter((l) => l !== "text" && l !== "txt");

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ESCAPES[char]);
}

export function highlight(code: string, lang = "text"): string {
  const ruleSet = SETS[lang] ?? PLAIN;

  if (ruleSet.length === 0) return escapeHtml(code);

  let out = "";
  let i = 0;

  while (i < code.length) {
    let matched = false;

    for (const [cls, re] of ruleSet) {
      re.lastIndex = i;
      const match = re.exec(code);
      if (match && match[0].length > 0) {
        out += cls ? `<span class="${cls}">${escapeHtml(match[0])}</span>` : escapeHtml(match[0]);
        i += match[0].length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      out += escapeHtml(code[i]);
      i += 1;
    }
  }

  return out;
}

export function languageLabel(lang: string): string {
  const labels: Record<string, string> = {
    ts: "TypeScript",
    tsx: "TSX",
    typescript: "TypeScript",
    js: "JavaScript",
    jsx: "JSX",
    javascript: "JavaScript",
    mjs: "JavaScript",
    json: "JSON",
    bash: "Shell",
    sh: "Shell",
    console: "Console",
    sql: "SQL",
    prisma: "Prisma",
    css: "CSS",
    xml: "XML",
    html: "HTML",
    svg: "SVG",
    text: "Text",
  };
  return labels[lang] ?? lang.toUpperCase();
}