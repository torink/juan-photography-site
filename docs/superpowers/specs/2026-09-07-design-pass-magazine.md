# Design pass: magazine cover (2026-09-07)

## Source
Juan's own words from the 2026-09-01 meeting: black background, minimal, "not Squarespace";
tab → page with a hero on top that is a **carousel**, then scroll; "editorial", liked "the hero
cover"; Bauhaus as the nearest label; shoots Fuji Pro 400H on a Minolta, likes "a little bit of
grit", images won't be tack sharp; sections "about, weddings, just whatever", weddings broken
into arrival / ceremony / dinner.

## Direction (chosen): magazine cover
- **Hero carousel** edge to edge on home and on every gallery page. Crossfade, 6s, counter
  `01 / 04`, no arrows on desktop (click/tap advances), swipe on mobile.
- **Masthead**: one large condensed grotesk (Archivo variable, wdth 62) over the hero, bottom-left.
  Site name on home, gallery title on gallery pages.
- **Metadata line** in small mono caps under every masthead: place · year · film stock, whichever
  are filled in. Empty fields vanish.
- **Body grid**: asymmetric. Photos alternate between full-bleed, two-up, and one narrow-offset;
  generous black space between. Not a uniform tile grid.
- **Grain**: a very light SVG-noise overlay on hero images only (opacity ~0.06). Flatters film
  scans; never applied to body photos.
- **Nav**: masthead-style, small caps mono, top-left name / top-right links. Overlay on heroes,
  solid elsewhere.
- **Sections inside a gallery** (optional): titled runs of photos (Arrival, Ceremony, Dinner).
  Galleries without sections render as one run.

## Schema changes (additive; existing content keeps working)
- siteSettings: `heroImages` (array) replaces `heroImage` in the Studio; front end reads either.
- gallery: `heroImages` (array, optional; falls back to `cover`), `place`, `year`, `film`
  (optional strings), `sections` (optional array of {title, photos}).

## Out of scope
Lightbox, page transitions, custom cursor, hover video. Keep it fast and still.
