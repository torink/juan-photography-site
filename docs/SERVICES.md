# Services map

Everything the site depends on, who owns it, and where to go. Updated 2026-09-08.

| Service | Does | Account owner | Torin's access | Where |
|---|---|---|---|---|
| **Sanity** | Content: photos, galleries, text, prices. Studio at `/studio`. | Torin's org ("Juan Briseno Photography" org, free plan). Project id `4e62iguy`, dataset `production`. | Org owner + project Admin | https://www.sanity.io/manage/project/4e62iguy |
| **Cloudflare** | Hosting (Pages project `galleriaguzman`), DNS for both domains, redirect rule, HTTPS. | **Juan** (Northwestphotography503@gmail.com, account id `58ee1231bc1a3f59a44a6e055d02a2b1`) | Super Administrator member | https://dash.cloudflare.com/58ee1231bc1a3f59a44a6e055d02a2b1 |
| **Porkbun** | Domain registrar for `galleriaguzman.studio` and `galleriabriseno.studio`. Renewals only; DNS is at Cloudflare. | Juan | Has the login (shared by Juan) | https://porkbun.com/account/domainsSpeedy |
| **GitHub** | Site code. Cloudflare builds from `main` on every push. | Torin (`torink`) | Owner | https://github.com/torink/juan-photography-site |
| **Google Fonts** | Alumni Sans SC (headings), Nunito Sans (body). Loaded at runtime, no account. | n/a | n/a | linked from `src/layouts/Base.astro` |

## Who logs in where

- **Juan edits the site**: galleriaguzman.studio/studio, using the Sanity invite (Admin). Nothing else.
- **Torin changes the design or structure**: edit the repo, push to `main`. Cloudflare rebuilds.
- **Torin deploys by hand** (rarely needed): `npm run build`, then
  `CLOUDFLARE_ACCOUNT_ID=58ee1231bc1a3f59a44a6e055d02a2b1 npx wrangler pages deploy dist --project-name galleriaguzman --branch main`

## How a publish reaches the site

Juan presses Publish in Studio → Sanity webhook `vaz83yUZoxQqTCgL` ("Cloudflare rebuild on publish", fires on
gallery / siteSettings / pricing changes, published docs only) → Cloudflare Pages deploy hook
`cbfe8592-4fa6-4ca3-8a55-d33d236146e9` → Cloudflare clones `main`, runs `npm run build`, publishes `dist`.
About one minute end to end.

## Addresses

- Main: https://galleriaguzman.studio (canonical; `www` also serves)
- Backup: https://galleriabriseno.studio → 301 to main (Page Rule on the briseno zone)
- Cloudflare's own: https://galleriaguzman.pages.dev (always the latest deploy)
- Juan's guide: https://galleriaguzman.studio/guide (unlinked, noindex)

## Handoff later

- Sanity: transfer the org, or invite Juan to the org as Owner and set him as billing contact. Project already his (Admin).
- Cloudflare: already his. Remove Torin as member when done.
- GitHub: transfer the repo to a Juan-owned GitHub account, then re-link it in Cloudflare Pages → Settings → Builds.

## Free-plan limits worth knowing

- Sanity free: 100 GB assets, 100 GB bandwidth/month, 250k API requests. Usage at 2026-09-08: 39 images, 85 MB.
- Cloudflare Pages free: 500 builds/month, unlimited bandwidth.
- Neither bills overage; both restrict. Check usage on each dashboard if the site ever misbehaves.
