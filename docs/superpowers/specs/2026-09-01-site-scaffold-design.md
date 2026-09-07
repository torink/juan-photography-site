# Site scaffold design (2026-09-01)

## Goal

A minimal, black, photo-first portfolio for Juan Briseno. Torin owns layout and schema.
Juan edits everything through Sanity Studio and never touches code.

## Pages

| Route | Content |
|---|---|
| `/` | Full-bleed hero image, tagline, grid of gallery tiles (cover image + title) |
| `/gallery/[slug]` | Gallery title, optional blurb, vertical stack of photos |
| `/about` | Portrait image + about text |
| `/contact` | Email + Instagram, one line of copy |
| `/studio` | Embedded Sanity Studio (login-gated), Juan's only entry point |

## Sanity schema (launch)

- **gallery**: `title`, `slug`, `description` (short text), `cover` (image), `photos` (image array), `order` (number).
- **siteSettings** (singleton): `name`, `tagline`, `heroImage`, `aboutImage`, `aboutText`, `email`, `instagram`.

No booking, no pricing, no payments. Adding a section later = one schema type + one page.

## Stack

- Astro (static output) + `@sanity/astro` with embedded Studio (`@astrojs/react`).
- Images served through Sanity's CDN via `@sanity/image-url`; the front end requests
  sized variants, so Juan can upload full-res.
- Netlify hosting. A Sanity webhook hits Netlify's build hook on publish.

## Data flow

Build-time GROQ queries in each page → static HTML. Empty dataset must still build
(every query has a fallback) so the site deploys before Juan adds content.

## Config

`.env` holds `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET`. `.env.example` is
committed; the real values come from `sanity init` once Torin creates the project.

## Out of scope

Design polish beyond a clean dark baseline, lightbox, animations, SEO metadata beyond
title/description, analytics.

## Build notes (as shipped)

- Static output, no Netlify adapter (see CLAUDE.md gotchas). `/studio` is prerendered as a
  single-page app; `netlify.toml` rewrites `/studio/*` to it.
- Verified: `npm run build` succeeds against an empty/placeholder dataset; home, about, and
  contact render the dark baseline with "add this in Site settings" hints.
