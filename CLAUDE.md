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
