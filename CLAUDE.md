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

## Sanity project

Project `4e62iguy` ("Briseno-Guzman Portfolio", org owned by Torin, free plan), dataset `production`. CORS allows `http://localhost:4321`; add the Netlify URL when deploying. `.env` is filled locally and gitignored.

## Hosting (Netlify, 2026-09-03)

Site `juan-briseno-photography` on Torin's Netlify team (free), project id `c625e16d-da85-42fb-b81e-2fd7098521b5`.
URL https://juan-briseno-photography.netlify.app. Env vars `PUBLIC_SANITY_PROJECT_ID` / `PUBLIC_SANITY_DATASET`
are set on the site; the Netlify origin is in Sanity CORS. Deploy from the CLI with
`npx netlify-cli deploy --build --prod` (folder is linked; `.netlify/` is gitignored). Continuous deploy
from GitHub + the Sanity publish webhook require the repo to be linked in the Netlify dashboard.
Netlify build hook "Sanity publish" (id `6a9eeea69b7856a200c28aae`) is called by Sanity webhook
`vaz83yUZoxQqTCgL` ("Netlify rebuild on publish", document create/update/delete on gallery + siteSettings,
published only). Both need the GitHub repo linked to the Netlify site to actually build.
Repo is PUBLIC (2026-09-07) so Netlify's free-plan "unrecognized Git contributor" check stops
blocking git- and hook-triggered builds. Keep no secrets in git (.env is ignored). If a build is
ever blocked with that message again, push any commit first; the check goes stale after
visibility or membership changes.

## Hosting moved to Cloudflare Pages (2026-09-08)

See `docs/SERVICES.md` for the one-page map of every service, owner, and login.

Netlify's free plan is credit-based (300 credits/mo, 15 per deploy, 20/GB bandwidth) and ran out
in one afternoon; the Netlify site is now a dead end (keep it until DNS cuts over, then delete).
Cloudflare Pages project `galleriaguzman` lives in JUAN's Cloudflare account
(Northwestphotography503@gmail.com, account id 58ee1231bc1a3f59a44a6e055d02a2b1); Torin is a
Super Administrator member. Deploy from the CLI with
`CLOUDFLARE_ACCOUNT_ID=58ee1231bc1a3f59a44a6e055d02a2b1 npx wrangler pages deploy dist --project-name galleriaguzman --branch main`
after `npm run build`. `public/_redirects` rewrites `/studio/*`. Wrangler is logged in as Torin
(OAuth; token lacks zone/dns write, so zone creation and DNS record edits are dashboard-only).
Domains: galleriaguzman.studio (zone 4ad82add0e87ca5ea2f980361cd78d5e, Cloudflare NS eric/liz)
attached to Pages with www, LIVE 2026-09-08 (apex + www, CNAME → galleriaguzman.pages.dev, proxied); galleriabriseno.studio LIVE 2026-09-08 (zone 502a290719cab51943844e532ad5585f) = BACKUP. CONFIRMED 2026-09-08: galleriaguzman.studio is MAIN (canonical + astro `site`). No redirect rule yet on briseno (needs dashboard Redirect Rule; wrangler token lacks rulesets write). Both registered at Porkbun. Sanity CORS has all four hostnames + pages.dev.
DONE 2026-09-08: Pages project connected to GitHub (main, `npm run build`, `dist`, env PUBLIC_SANITY_* +
NODE_VERSION=24). package-lock MUST be generated with npm 10 (`npx npm@10 install --package-lock-only`):
npm 11 omits optional-platform subdeps and Cloudflare's npm 10 `npm ci` rejects that lock. Pages deploy hook
`cbfe8592-4fa6-4ca3-8a55-d33d236146e9` ("Sanity publish"); Sanity webhook vaz83yUZoxQqTCgL now points at it.
briseno → guzman 301 via a Page Rule on the briseno zone. Netlify site DELETED 2026-09-08.
