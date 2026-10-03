# Session Details: Portfolio Refinement

## Session Context
- Date: 2026-10-03
- Workspace: C:\Projects\AAMI\PORTFOLIO\aamiqram-portfolio
- Stack: Next.js 16.3.8, React 19.2.8, TypeScript, Tailwind CSS v4, lucide-react, react-icons
- Tooling: ESLint, TypeScript (noEmit), Playwright (Edge) for QA

## Objectives
Refine the portfolio into a hybrid: personal storytelling + stronger visual hierarchy from the old portfolio, selective inspiration from a friend's portfolio, while preserving:
- Routes /, /projects, /about (and others)
- Verified content, accessibility, responsive behavior, restrained red/navy identity
- No wholesale redesign, fabricated claims, fake forms, unnecessary dependencies, or commits

## Key Constraints/Notes
- Canonical identity: Abu Abdullah Md Iqram
- Portrait remains public/images/iqram-profile.png (unchanged)
- Real project captures added: unity-shop.webp, your-iyanat.webp, local-chef-bazaar.webp, finese.webp, firesheild.webp, prolific.webp (1600x1000 WebP)
- QA server at http://localhost:4325 (next start); kill port listener, rebuild/restart as needed
- No image inspection in this environment; pixel-level review remains manual (screenshots captured)
- Per AGENTS.md, read node_modules/next/dist/docs when relevant

## What Was Done

### 1) Homepage Composition Changes
- Replaced TechStrip band with a new **Profile** component that introduces the person with:
  - Portrait (4:5 frame) using existing Portrait component
  - Concise, fact-verified biography (route not invented: math degree, Programming Hero, focus on API/data layer)
  - Carries forward primary stack badges (secondary to writing)
  - Links to /about and /tech-stack
- Updated src/app/page.tsx to import/use Profile instead of TechStrip (section count remains 6)
- Enriched Hero:
  - Added name "Abu Abdullah Md Iqram" beneath role badge
  - Added POV line: "I would rather ship the whole thing than hand over a screen and wait..."
- Capped FeaturedProjects preview to **4** items (from showing all 7). Added "See the other 3 projects" CTA and dynamic "All {total} projects" text. Prevents homepage bloat while preserving directory behavior.

### 2) Image/Sizes Optimization (Performance)
- Made ProjectVisual accept optional sizes prop (with sensible default)
- Added optional sizes override to Portrait component (uses internal responsive defaults when not provided)
- Passed correct sizes:
  - ProjectFeature (homepage): sizes="(min-width: 1024px) 92vw, 100vw" ? fetches w=1920 for 1308px rendered box (sharp, no upscale blur)
  - ProjectCard (directory): sizes="(min-width: 768px) 46vw, 100vw" ? fetches w=750 for 636px rendered box
- Result: appropriate srcset widths for each layout; no failed image requests after proper scroll/dwell.

### 3) Documentation/Article UX
- Wired ReadingProgress into DocsShell (component existed, now rendered at top-16)
- Verified TOC behavior: desktop (xl+) visible with labelled nav, mobile drawer opens and contains TOC links
- Fixed interaction test to target TOC within the article context (selectors corrected)

### 4) QA/Regression (Playwright + Edge)
Executed comprehensive checks against http://localhost:4325:

- Structure: 6 homepage sections maintained; doc height reduced after preview cap
- Responsive (dark/light × 320/390/768/1024/1440 × routes /,/about,/projects,/contact): 40 renders, **0 failures** (no overflow, broken images, ellipsis, incorrect h1 counts, horizontal scroll). Decorated glows/SVG internals correctly excluded from overflow probes.
- Images: all project/profile images load (complete + naturalWidth>0) after scroll; homepage features load w=1920 at 1440 viewport, directory cards load w=750
- Filters/Search (7 projects total): All 7, Web Applications 6, E-Commerce 3, Full-Stack 5, Android 1, Experiments 2; search "chef" ? 1; clearing ? 7. aria-pressed states correct.
- Theme: toggle works; persists across hard reload (no seeding script)
- Focus: 22/22 tab stops show visible focus indicator
- Reduced motion: no running animations, no text hidden by entrance animations
- Engineering article: TOC visible/clickable at xl, mobile drawer contains TOC links; reading progress advances correctly (0% ? ~5% ? 100%)
- Console/Network: no console errors, no request failures observed

### 5) Screenshots Captured (Manual Pixel Review)
Saved to: C:\Users\user\AppData\Local\Temp\opencode\qa\pass3\
- dark-desktop-home.png, dark-desktop-about.png, dark-desktop-projects.png, dark-desktop-contact.png
- dark-mobile-home.png, dark-mobile-about.png, dark-mobile-projects.png, dark-mobile-contact.png
- light-desktop-home.png, light-desktop-about.png, light-desktop-projects.png, light-desktop-contact.png
- light-mobile-home.png, light-mobile-about.png, light-mobile-projects.png, light-mobile-contact.png
(Note: pixel-level inspection is not possible in this environment; these are for user review.)

### 6) Build/Lint/Type Safety
- 
px tsc --noEmit: clean
- 
pm run lint: clean (ESLint)
- 
pm run build: compiled successfully (Next.js 16.3.8), generated 23 pages

## Files Modified
- src/app/page.tsx — use Profile instead of TechStrip
- src/components/home/Hero.tsx — add name + POV line
- src/components/home/Profile.tsx — **new** component (personal intro with portrait + primary stack)
- src/components/home/FeaturedProjects.tsx — cap preview to 4, add "see other N" CTA
- src/components/ui/Portrait.tsx — add optional sizes prop
- src/components/projects/ProjectVisual.tsx — add optional sizes prop
- src/components/projects/ProjectFeature.tsx — pass sizes="(min-width: 1024px) 92vw, 100vw"
- src/components/projects/ProjectCard.tsx — pass sizes="(min-width: 768px) 46vw, 100vw"
- src/components/docs/DocsShell.tsx — import and render ReadingProgress
- Removed: src/components/home/TechStrip.tsx

## QA Artifacts (Temporary)
- C:\Users\user\AppData\Local\Temp\opencode\qa\pass3\ — final screenshots
- C:\Users\user\AppData\Local\Temp\opencode\qa\pass3.mjs, interact_core.mjs, ix*.mjs, etc. — validation scripts (can be discarded)

## Summary
The homepage now reads more personally while keeping the original structure disciplined (section count unchanged). Image delivery is layout-aware and efficient. All responsive, accessibility, interaction, and build checks pass. No functional regressions introduced; behavior is preserved. Pixel-level review deferred to captured screenshots per constraints.

## Commit Policy
No commits made (per instructions). All changes are local and uncommitted.

## Pass 4 - Story, Journey, and Technical Depth

### Objective
Refine the existing portfolio without redesigning it: blend personal storytelling with the current
technical hierarchy, strengthen real-project presentation, and keep every verified/reported
distinction intact.

### Content Changes
- src/content/journey.ts (new): typed education/training timeline. 2023 BSc Mathematics at
  Chittagong College (ongoing), 2025 Programming Hero MERN Stack Web Development (ongoing), plus a
  current-direction entry. Exports `journey` and `journeyById`.
- src/content/types.ts: `highlights: string[]` is now required on Project.
- src/content/projects.ts: added two highlights to each of the 7 projects; `toProjectSummary` now
  projects `highlights`. FinEase, Firesheild and Prolific keep their existing reported caveats.
- src/content/site.ts: removed the full street `address`; added `timezone` (UTC+6). `/contact`
  rendered the street address, so the field is gone from the type rather than merely hidden.

### Component / Page Changes
- src/components/home/Profile.tsx: rewritten copy - the maths degree as the route in, the
  interface-to-data seam as the interest, commerce and Android products as what he enjoys building.
- src/components/home/Journey.tsx (new): responsive ruled timeline; mounted in src/app/page.tsx,
  so the homepage is now 7 sections (was 6).
- src/components/home/EngineeringHighlights.tsx: added three linked engineering principles
  (delivery-and-coupon-rules, validate-once-at-the-boundary, server-state-is-not-client-state) and a
  clearer heading.
- src/components/projects/ProjectCard.tsx: capture first, then contribution label, case-study link,
  tagline, plain summary, two highlights, four tech marks plus an overflow count, status, links.
  Tech cap TECH_LIMIT = 4.
- src/components/projects/ProjectFeature.tsx: tech marks capped at 5 plus an overflow count. Some
  projects listed ten or eleven marks, which made the homepage read as an inventory rather than an
  argument.
- src/app/projects/[slug]/page.tsx: the first viewport now leads with the product visual, then
  contribution/status, name, tagline, plain summary, role and source status, six tech marks, links.
  TECH_LIMIT = 6; the full stack list is still counted in the read-metadata line below.
- src/app/about/page.tsx: restructured into current focus (Building / Learning / Looking for), a
  "How I got into this" narrative, the education and training timeline from `journey`, how I
  approach building, what is here and what is not, selected work, and what I am drawn to. The
  sidebar "At a glance" no longer duplicates education and training.
- src/app/contact/page.tsx: fixed the misplaced nesting - the "What helps me reply properly" panel
  was sitting inside the "based in" card, and the WhatsApp / Resume / location cards had broken
  indentation. Rebuilt as primary channels (Email, GitHub, LinkedIn), secondary channels (WhatsApp,
  Phone, Resume), a "what helps me reply properly" panel, and a "where I am" panel using
  `site.location` and `site.timezone`. City and country only. Still no form.

### Issues Found and Fixed
- `/projects` had a heading-level skip: page h1 -> ProjectCard h3 with no h2 between. Cards are
  only used in the directory, which sits directly under the h1, so the card heading is now h2.
  This was present at every width in both themes before the fix.
- Removed the `ArrowRight` import left unused in Journey.tsx (ESLint warning).

### Validation
- npx tsc --noEmit: clean
- npm run lint: clean (ESLint, 0 errors, 0 warnings)
- npm run build: compiled successfully (Next.js 16.3.8), 23 pages
- Production server verified on http://localhost:4325

### QA (pass4.mjs, Playwright + Edge)
100 renders = 10 routes x 5 widths (320/390/768/1024/1440) x 2 themes: 0 failures.
Routes: /, /about, /projects, /projects/unity-shop, /projects/your-iyanat, /projects/aamiqu,
/engineering, /engineering/delivery-and-coupon-rules, /tech-stack, /contact
Checked per render: horizontal overflow, unloaded images, images without alt, h1 count, heading-level
skips, duplicate ids, links and buttons with no accessible name, document h-scroll, console errors,
page errors, and failed requests.
- Internal link crawl: 18 unique internal hrefs, all HTTP 200.
- No regressions. /about, /contact, /, /tech-stack, /engineering, /projects/aamiqu and
  /projects/your-iyanat are clean at every width in both themes.

### False Positive Investigated (not a bug)
The first pass4 run reported overflow on code tokens inside `<pre>` on /projects/unity-shop and
/engineering/delivery-and-coupon-rules at every width. Measured rather than assumed: 3 `<pre>` per
page, all 3 with scrollWidth greater than clientWidth, 0 unreachable, document overflow 0. Both
CodeBlock.tsx and Blocks.tsx use overflow-x-auto, so wide code scrolls inside its container by
design. The checker was updated to ignore elements inside a horizontally scrollable ancestor and the
runs came back clean.

### Screenshots
Saved to: C:\Users\user\AppData\Local\Temp\opencode\qa\pass4\ (24 files)
dark and light, desktop 1440 and mobile 390, for home, about, projects, case study, AAMIQU and
contact. Pixel-level inspection is not possible in this environment; these are for user review.

### Limitations / Not Verified
- No visual review of the 24 screenshots. Layout, spacing and typography are unverified by eye; only
  computed-geometry and DOM assertions were run.
- No keyboard walkthrough or screen-reader pass in this pass. The nameless-control and alt-text
  checks are automated approximations, not substitutes.
- LinkedIn discrepancy unresolved: site.ts keeps https://www.linkedin.com/in/aamiqram/ while the
  brief said /in/aam-iqram. The existing verified value was preserved; needs a decision.
- Search and filter counts, theme persistence across reload, reduced-motion behaviour and reading
  progress were verified in pass 3 and not re-exercised here.

### Commit Policy
No commits made. All changes local and uncommitted.

## Pass 5 - Hero Focus and Docs Breakpoint (Codex desktop, independently re-validated)

### Origin
A Codex desktop thread titled "Review AAMIQRAM portfolio" ran two turns. Turn 1 was a
read-only visual review that reported three concerns (docs-shell dead space at 1240px, a
technical-leaning first screen, and image-forward project cards). Turn 2 acted on the first
two. It edited 9 files and made no commit.

Note for future sessions: Codex's working directory was the repo root
(C:\Projects\AAMI\PORTFOLIO), not the nested project, so its in-app diff counter
(+15865/-6180) reflects an untracked tree and has no relationship to git state.

### Files Changed
- src/components/home/Hero.tsx: name and location moved inline beside the headline; the
  separate MapPin line and its import removed; intro copy shortened and now leads with
  commerce plus the interface-to-API-and-data connection; `measure` -> `measure-narrow`;
  hero columns 1.1fr/0.9fr -> 1.18fr/0.82fr; geometry block given `lg:ml-auto lg:max-w-[36rem]`.
- src/components/home/HeroGeometry.tsx: inactive ring stroke opacity 0.42 -> 0.28 and
  0.2 -> 0.16, so the diagram reads quieter behind the copy.
- src/components/home/ApplicationLayers.tsx: dropped `sm:shrink-0` from a label span.
- src/app/globals.css: added `--breakpoint-docs: 75rem` inside `@theme inline`.
- src/components/docs/DocsShell.tsx: three-column grid now `docs:grid-cols-[11rem_minmax(0,1fr)_12rem]`;
  contents drawer `docs:hidden`; TOC rail `hidden docs:block`; article width is
  `max-w-3xl lg:max-w-[52rem] docs:max-w-3xl`.
- src/components/docs/DocsMobileNav.tsx: `xl:hidden` -> `docs:hidden` in three places.
- src/components/docs/TableOfContents.tsx: comment only.
- src/components/projects/ProjectCard.tsx and ProjectDirectory.tsx: responsive `sizes` hints
  retuned to track card width rather than a flat 46vw.

### The Tailwind Cascade Trap (worth remembering)
The first attempt used arbitrary variants: `min-[1200px]:grid-cols-...`. That does not work
here. Tailwind v4 emits the arbitrary `min-[1200px]` rule BEFORE the built-in `lg:` rule, so
the two-column layout won the cascade and the third column never appeared. The fix is a named
breakpoint: `--breakpoint-docs: 75rem` declared in `@theme inline`, then `docs:` variants,
which sort after `lg:`. Arbitrary min-width variants must not be used to override a built-in
named breakpoint in this project.

A second-order bug from the same change: the grid moved to `docs:` but the TOC aside was left
at `hidden xl:block`, which would have recreated the exact empty-right-column problem the
change was meant to fix. Caught and corrected in a follow-up patch.

### Also Of Note
The hero copy previously read "...real-time functionality and AI-powered features where they
add value." That vague capability claim was removed in this pass, which happens to align with
the project's rule against inflated claims.

### Verification (re-run independently, not taken from Codex's report)
- npx tsc --noEmit: clean
- npm run lint: clean
- npm run build: compiled successfully, 23 pages
- 140 renders = 10 routes x 7 widths (320/768/1024/1199/1200/1240/1440) x 2 themes:
  no horizontal overflow, no document h-scroll, no heading-level skips, no duplicate ids,
  no links or buttons without an accessible name, no console errors, page errors or failed
  requests.
- Docs breakpoint confirmed by computed geometry rather than by class name. Article prose width
  measured 832px at 1199px, 704px at 1200px, 744px at 1240px, 768px at 1440px. The TOC rail is
  visible at >=1200px and hidden below; the contents drawer is hidden at >=1200px and present
  below. The 1024-1199px dead strip is resolved.
- Internal link crawl: 18 unique hrefs, all HTTP 200.
- Image integrity: all 105 unique srcset candidate URLs fetched directly, all HTTP 200. With the
  original scroll dwell, 0 unloaded images on / and /projects at 320px and 1440px.

### Two Suspicions That Turned Out To Be False Alarms
- The retuned `sizes` on ProjectCard looks under-declared (declares 640px at a 1440px viewport
  where the card actually renders 680px). Measured: it under-declares by about 40px, so the
  browser rounds up to w=750. That is the safe direction and costs a slight over-fetch, not
  softness. Left as is.
- A lean QA run reported 28 "unloaded image" failures on / and /projects. That was the harness,
  not the site: the scroll dwell had been cut to 25ms per step, which starved lazy decode.
  Restoring the original dwell cleared it. Do not shorten the dwell below ~100ms per step.

### Known Outstanding
- LinkedIn discrepancy still unresolved: site.ts keeps https://www.linkedin.com/in/aamiqram/
  while the original brief said /in/aam-iqram. Needs an explicit decision from the owner.
- Pixel-level review of the pass-4 and pass-5 screenshots is still outstanding; only computed
  geometry and DOM assertions have been run.

### Commit Policy
No commit was made by either agent. HEAD remains f711467 on main, the pre-existing root
deletions and the untracked aamiqram-portfolio/ directory are unchanged.

## Pass 6B - Content Correction and Release Investigation

### Confirmed Content Correction
- `src/content/projects.ts`: removed the duplicated opening sentence from the Unity Shop Architecture diagram note. The diagram caption still states that the deployed frontend reaches MongoDB through its own route handlers; the note now moves directly to the separate Express backend on a teammate's branch. The following paragraph retains the explanation of the deployment trade-off.
- Rendered the corrected route in the in-app browser at `http://localhost:3000/projects/unity-shop#architecture`. It now reads once before the note about the separate backend. The existing `next start` process on port 4325 continued serving its cached pre-change rendering after the build; it was left running and not restarted. The 3000 dev server served the current source.

### Current-Session Checks
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed with Next.js 16.3.8; 23 routes were generated.
- The Unity Shop Architecture section was checked in the browser on port 3000 after the change. No screenshot was created in this pass.
- These results are from Pass 6B. The broader responsive/theme, accessibility, image and docs-breakpoint results above remain historical Pass 5 reports, not tests rerun here.

### Vercel / Public Deployment Investigation
- The actual Next.js project root is `C:\Projects\AAMI\PORTFOLIO\aamiqram-portfolio`. The outer Git root is `C:\Projects\AAMI\PORTFOLIO`, whose `origin` remote is `https://github.com/aamiqram/Portfolio.git`. The nested Next.js project has no separate `.git` directory and is still an untracked directory from the outer repository's view.
- No `.vercel` project link exists at either the outer or nested root. Vercel CLI 51.2.1 is installed, but `vercel whoami` found no saved credentials; the attempted login discovery failed TLS certificate validation. Account-level project settings and deployment history therefore could not be inspected. The exact connected Vercel repository, configured root directory, production branch, and deployment history remain unverified.
- The public GitHub repository's visible root contains the earlier static portfolio files. The public portfolio URL still serves an older single-page site. Its rendered page contains skill-percentage bars and testimonials with unverified provenance, a full street address, and a contact form. The claims are unverified, not established as fabricated. The address was not copied into this handoff. The form was not submitted, so successful operation is unverified.
- `next.config.ts` has no custom deployment configuration. The application is statically generated and the only `process.env` occurrence found is in a code example in an engineering article; no app runtime environment variable is required by the current implementation. Vercel project-level preview variables, if any, could not be inspected.
- No preview was created: the Vercel project link and account access are unavailable, and the nested source is untracked and absent from the remote repository. Linking or deploying it against an unidentified Vercel project would not be safe. Safe next steps: in Vercel, open the project serving `portfolio-aami.vercel.app`; verify Settings > Git, General (Root Directory), and Deployments (production branch and latest deployment). After confirming the intended project, authenticate Vercel CLI, link from the nested project root to that existing project, and use `vercel deploy` (without `--prod`) for a preview. Review the resulting preview before any separately approved production action.

### Git / Release State
- Branch `main`, HEAD `f7114670ac883923b8aad0c9d76f20c08ec1bfd6`.
- The existing root-level worktree deletions and untracked `aamiqram-portfolio/` directory remain. Pass 6B changed `src/content/projects.ts` and appended this entry to `session-details.md` inside that untracked project directory; no existing root deletion was staged or restored.
- No commit, push, preview deployment, or production deployment was made.

## Pass 6C - Final Polish Review and Handoff (2026-10-04)

### Workspace and Servers
- Re-read `AGENTS.md`, `README.md`, `session-details.md`, and the relevant source. The Next.js project root is `C:\Projects\AAMI\PORTFOLIO\aamiqram-portfolio`; the outer Git root is `C:\Projects\AAMI\PORTFOLIO`.
- The outer repository remains on `main` at `f7114670ac883923b8aad0c9d76f20c08ec1bfd6`. Its existing root deletions and untracked `aamiqram-portfolio/` directory remain. No staging, reset, restore, or commit was performed. The project directory is untracked from the outer repository's perspective, so its existing work remains inside that untracked directory.
- Port 3000 serves the current Next.js development preview (started for this review after confirming it was absent). Port 4325 remains served by the existing `next start` process (PID 10336); it was not restarted. Both listeners were present after validation.

### Existing Pass 5 Behavior Confirmed
- The Pass 5 implementation remains in place: personal product-building hero and restrained geometry; a named `docs` breakpoint at 75rem (1200px), avoiding Tailwind arbitrary-breakpoint utility ordering ambiguity; responsive project-image `sizes`; and uncropped project captures (`h-auto w-full`).
- Fresh documentation-shell measurements: at 1199px the 832px article column is used, the TOC rail is hidden and Contents drawer is available; at 1200px the shell switches to the desktop three-column layout (704px article), TOC visible and drawer hidden; at 1240px article is 744px; at 1440px it is 768px. At 1024px article is 752px; at 768px, 390px and 320px the article widths are 720px, 350px and 280px. Document/body widths matched each viewport, with no horizontal overflow.
- Project screenshot `sizes` hints remain responsive. The images are rendered uncropped; visual inspection at desktop and mobile showed real product captures retain their full frame. Pass 5's image source sizing history is recorded above; this pass did not independently fetch all `srcset` candidates.

### Content and Visual Review
- The Unity Shop Architecture sentence duplication had already been corrected in Pass 6B. The current source retains the diagram caption and the distinct note about the separate Express backend. The rendered `/projects/unity-shop#architecture` page shows the database/route-handlers sentence once, followed by the separate backend note and an additional distinct trade-off explanation. No source change was needed in this pass.
- Captured screenshots outside the repository at `C:\Users\user\AppData\Local\Temp\opencode\qa\final-polish-2026-10\`. Reviewed screenshots include all six requested local routes at 1240px light mode, and mobile/desktop samples at 320px, 390px and 1440px in light/dark modes. Selected pixel-level inspections covered the homepage, Projects, About portrait, Contact, Unity Shop, and an engineering article. The screenshots show a clear identity-led homepage, restrained visual system, uncropped case-study imagery, readable article flow, and a portrait that remains consistent with the existing About content. The Next.js development-tools badge is visible in local dev screenshots and is not part of the site UI.
- A fresh 72-render browser pass covered `/`, `/projects`, `/about`, `/contact`, `/projects/unity-shop`, and an engineering article at 1440, 1240, 1024, 768, 390 and 320px in both themes. It reported no overflow, console/page errors, or failed local requests; all rendered pages had one H1, no heading-level skips or duplicate IDs, and named links/buttons. A separate fresh geometry pass covered the docs breakpoint widths above.
- Fresh interaction checks passed: project Full-Stack filter count, search for `chef` and clearing search; mobile navigation opening and Escape dismissal; theme toggle and `aamiqram-theme` persistence after reload; documentation Contents dialog and Escape dismissal; reduced motion (no running animation and `scroll-behavior: auto`); and visible 2px keyboard focus outlines across the first 25 Tab stops.
- Screenshots were captured and inspected directly. Automated checks do not constitute a full assistive-technology audit. The accessibility tree was inspected for Unity Shop and the public deployment.

### Fresh Commands in Pass 6C
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed on Next.js 16.3.8; 23 static routes were generated.
- The Unity Shop rendered-content check, responsive/theme browser pass, Docs-shell geometry pass, and interaction checks listed above were run during this pass. Historical Pass 5 image candidate checks and Pass 6B command results remain historical and are not represented as newly rerun here.

### Public Site and Reference Limitations
- `src/content/site.ts` still sets the canonical/site URL to `https://portfolio-aami.vercel.app/`. Opening that public URL in the in-app browser shows the older single-page portfolio rather than this local Next.js project. Its visible content includes numerical skill-percentage claims and testimonials whose provenance is unverified; the contact form was not submitted, so successful operation is unknown. The page also exposes a full street address; it is intentionally not copied into this record or captured in a screenshot.
- The supplied Cloudflare preview URL failed with `ERR_NAME_NOT_RESOLVED` during this review. The Joydeep reference loaded in the in-app browser and its page structure was reviewed; the separate pixel screenshot attempt remained on its loading overlay, so no pixel-level style comparison is claimed. The local screenshots and the deployed page confirm the local and public versions differ.
- Deployment linkage, Vercel root directory, production branch and deployment history remain unverified for the reasons documented in Pass 6B (no `.vercel` link or authenticated account access). No deployment was triggered and no Vercel setting or DNS record was changed.

### Current Handoff State
- This pass made no application-source changes. The only intentional change in this pass is this additive handoff entry. Existing Pass 6B source correction and prior work were preserved.
- Current Git state is unchanged from the initial review: root-level tracked deletions plus untracked `aamiqram-portfolio/`; no files staged and no commit made. No push, preview deployment, or production deployment occurred.
## Pass 6D - Production Preview Verification (2026-10-04)

### Current Workspace and Preview Processes
- Re-read `AGENTS.md`, `README.md`, and this handoff. The nested Next.js project root is `C:\Projects\AAMI\PORTFOLIO\aamiqram-portfolio`; the outer Git root is `C:\Projects\AAMI\PORTFOLIO`.
- Outer Git remains on `main` at `f7114670ac883923b8aad0c9d76f20c08ec1bfd6`. Existing root-level deletions remain and the nested project remains untracked (`?? aamiqram-portfolio/` from the outer root). No staging, reset, clean, stash, commit, or push was performed.
- At the start of this pass port 3000 was owned by PID 8716 running this project's `next dev`; it was left running throughout. Port 4325 had no listener, so there was no existing process to restart. After the fresh build, started this project's `next start --port 4325`; PID 5876 now serves the current `.next` production build. Both servers returned HTTP 200.

### Unity Shop Content Check
- Source search found the Architecture sentence, `The deployed frontend reaches the database through its own route handlers.`, exactly once, in the diagram caption in `src/content/projects.ts`.
- Checked the production route in Edge/Playwright at `http://localhost:4325/projects/unity-shop` and inspected the rendered screenshot. The sentence occurs once in visible body content. The caption, separate Express-backend note, preceding team-project context, and following explanation of the single-deployment/data-layer trade-off remain present. No application source change was needed.

### Fresh Commands and Browser Verification
- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed with Next.js 16.3.8; 23 static routes generated.
- Production browser route checks: `/`, `/projects`, `/about`, `/contact`, `/projects/unity-shop`, and `/engineering/delivery-and-coupon-rules` each returned HTTP 200 at 1440px and 390px. No horizontal overflow, console errors, page errors, or failed requests were observed. The case study also rendered without overflow at 1240, 1200, 1199, 1024, 768 and 320px.
- Documentation breakpoint geometry: at 1199px the TOC rail is hidden and Contents drawer visible; at 1200px the TOC rail is visible and drawer hidden. Body/document width matched viewport at all eight measured widths (1440, 1240, 1200, 1199, 1024, 768, 390, 320).
- Internal link crawl: 18 unique local routes, all HTTP 200. Project category filter (Full-Stack = 5 of 7), search (`chef` = 1 of 7), and resetting to All passed. Mobile menu opened and closed on Escape. Theme switched from light to dark and remained dark after reload. Reduced-motion emulation reported `scroll-behavior: auto` and no running CSS animations.
- After scrolling with lazy-load dwell, every image on `/`, `/projects`, `/projects/unity-shop`, and `/about` completed with a nonzero natural width. The inspected production screenshots are outside the repository at `C:\Users\user\AppData\Local\Temp\opencode\qa\final-production-2026-10\`; the `loaded-` full-page captures for Home, Projects and Unity Shop were inspected directly. Additional desktop route screenshots and mobile viewport screenshots are in the same directory.

### Vercel Readiness (Investigation Only)
- No `.vercel` project link exists in the nested project directory. `npx --no-install vercel whoami` reports: `No existing credentials found. Starting login flow...` followed by an OpenID discovery request error for `https://vercel.com/.well-known/openid-configuration`: `unable to verify the first certificate`.
- TLS verification was not disabled. No Vercel link or deployment command was run. The connected project, configured root directory, Git source, and production branch remain unverified. The nested project is still untracked and the public URL still serves the older site; do not deploy until the owner confirms the correct Vercel project and the intended source has been safely published to its Git repository.

### Changes This Pass
- The only intentional file change in this pass is this additive handoff entry. Existing Unity Shop correction and other user work remain untouched. No commit, push, or deployment occurred.
## Pass 6E - Read-only Release Readiness Audit (2026-10-04)

- Repository: outer root `C:\Projects\AAMI\PORTFOLIO`, branch `main`, HEAD `f7114670ac883923b8aad0c9d76f20c08ec1bfd6`, locally tracks `origin/main`. No fetch was run, so the remote-tracking ref may be stale. The index has no staged changes. There are 10 pre-existing root-level worktree deletions and 84 non-ignored untracked files under `aamiqram-portfolio/`.
- The legacy portfolio source is repository-root `index.html`, tracked in HEAD (165,388 bytes) but absent in the worktree and marked deleted. There is no separate archive directory. The old HTML refers to root-level image/icon files which are also among the existing worktree deletions. If only the new nested project is staged, these unstaged deletions stay out of the commit and the root HTML/assets remain in the Git tree. Do not stage the root deletions.
- The nested project has 84 non-ignored candidate files spanning package/config files, app/components/content/lib sources, handoff docs, portrait, and six project captures. Its `.gitignore` excludes `node_modules/`, `.next/`, `next-env.d.ts`, `*.tsbuildinfo`, `.env*`, and `.vercel`; no `.env*`, `.vercel/`, or `vercel.json` is present. No app runtime environment variable was identified in the prior source audit.
- Build configuration required for Vercel: Root Directory `aamiqram-portfolio`; Framework Preset Next.js; install command detected from `package-lock.json` (npm); build command `npm run build` / Next.js default `next build`; leave Output Directory unset for Next.js. `next.config.ts` has no custom export/output setting. A fresh local production build passed in Pass 6D, but account-level Vercel configuration cannot be confirmed here.
- Rechecked `npx --no-install vercel whoami`: no saved credentials; OpenID discovery failed TLS certificate verification. No TLS bypass, link, commit, push, or deployment was performed. Existing Vercel repository, production branch, Root Directory, and domain assignment remain unverified.
- This audit made no application changes. This handoff entry is the only intentional file update; existing root deletions remain unstaged and preserved.