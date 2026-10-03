# AAMIQRAM — portfolio

Documentation-style portfolio for **Abu Abdullah Md Iqram**, Frontend Developer in
Chattogram, Bangladesh. Built with Next.js 16 (App Router), React 19, TypeScript and
Tailwind CSS v4.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

The site is fully static: every project case study and engineering note is
prerendered at build time, and there is no runtime data fetching.

## Structure

```
src/
  app/            Routes. Root layout, SEO files, icon and 404.
    [slug]        Dynamic project and article pages, statically generated.
  components/
    content/      The documentation rendering pipeline (code, tables, diagrams, callouts).
    docs/         Three-column documentation shell: section nav, article, table of contents.
    engineering/  Article index.
    home/         Homepage sections.
    layout/       Header, footer, theme controls.
    projects/     Project cards and the filterable, searchable directory.
    ui/           Technology marks, badges, brand glyphs.
  content/        All copy and structured content as typed data.
  lib/            Highlighting, reading time, table-of-contents extraction, fonts.
public/
  images/
    iqram-profile.png   The portrait. Replace this one file to change it.
```

## Replacing the portrait

The portrait lives at a single path:

```
public/images/iqram-profile.png
```

`src/components/ui/Portrait.tsx` is the only thing that references it. Drop a new
photograph over that filename and rebuild — no component changes are needed.
A `.webp` or `.jpg` works equally well if you prefer; update the `src` constant at
the top of `Portrait.tsx` to match.

Two details worth keeping if you swap the image:

- Cropping is done in CSS (`object-cover` inside a fixed aspect-ratio frame), not
  in the file. Supply a reasonably large, upright portrait; the frame handles the
  rest. The current file is 1123×1400.
- If you use a very large source, converting it to `.webp` before committing
  will noticeably reduce the About page payload. The original is kept unmodified
  on purpose, so any compression is your choice, not something the build does
  silently.

The favicon and the `A` brand glyph are separate vector graphics and are
deliberately not derived from the photograph.

## Editing content

All prose lives in `src/content/` as typed data rather than MDX, so the compiler
rejects malformed content instead of failing at render time.

- `site.ts` — identity, navigation, canonical URL.
- `projects.ts` — the project directory and case-study bodies.
- `engineering.ts` — engineering notes.
- `tech.ts` — technology inventory, grouped by role.
- `capabilities.ts` — capability descriptions.
- `types.ts` — the `ContentBlock` union every body is built from.

Two things to keep in mind when editing:

1. `techKeys` must be a key that exists in `tech.ts`. Anything missing renders as a
   plain text chip.
2. Project entries carry a `verification` field, `"verified"` or `"reported"`. Keep
   it accurate. Only mark something verified if a public source was actually read.

## Theming

Dark by default, with a light theme. The choice is written to `data-theme` by an
inline script before hydration, so there is no flash of the wrong theme. Tokens live
in `src/app/globals.css` under `@theme`.

## Deployment

Static output, deployable to Vercel. `site.url` in `src/content/site.ts` drives the
canonical URLs, Open Graph tags and sitemap; update it if the domain changes.