# Juan Photography Site

Personal side project for Torin: a portfolio website for Juan Briseno (Northwest Photography).
This is NOT part of the Microsoft Learn video pipeline. Ignore the pipeline instructions in
`~/Dev/CLAUDE.md` (Work Orders, ADO, skills, changelog drafting, tool STATUS files) while
working in this folder. Do not draft pipeline changelog entries for work done here.

## Direction (decided 2026-09-01)

- Keep it as simple as possible for Juan. He only ever works in Sanity Studio.
- Stack: Astro front end + Sanity CMS, hosted on Netlify. No backend, no booking, no payments.
- Torin owns layout, styling, and the Sanity schema. Juan fills in photos and copy.
- Look: black background, minimal, "not Squarespace-looking", one hero image per section.
- Launch schema stays tiny: gallery documents + one site-settings document.

## Environment

- Node lives at `/usr/local/bin`; run `export PATH="/usr/local/bin:$PATH"` before node/npm.
- npm goes through the corp proxy in `~/.npmrc`. New package versions are quarantined ~7 days;
  if a version 404s, pin an older one rather than working around the proxy.
- No PII rules beyond common sense; this is a public portfolio site.

## Dev server

Start it with `npm run dev` in background mode and read the URL from the output; stop it when done.

## Dependency gotchas (corp npm proxy, 2026-09-01)

- `package.json` `overrides` are load-bearing. `ui5: npm:@sanity/ui@5.0.0-alpha.5` because the
  proxy can't resolve the `alpha` dist-tag; `@sanity/ui: 4.0.6` because `@sanity/visual-editing`
  otherwise hoists a 3.x copy to the root and the Studio's `@sanity/ui/menu` imports break in dev.
- No `@astrojs/netlify` adapter. The site is fully static; the adapter's dev middleware tries to
  spawn Deno for edge functions and crashes `astro dev`. Netlify just publishes `dist/`.
- The dev-server launch config lives in `~/Dev/.claude/launch.json` as `juan-site-dev`
  (the Browser pane reads the session root, not this folder).
- `/studio` shows "Configuration must contain projectId" until `.env` is filled from `sanity init`.
