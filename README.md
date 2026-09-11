# Al Rowad Auto — site 13 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with Al Rowad Auto, and not an official site.**

- **Live:** https://al-rowad-auto-site.vercel.app
- **Repo:** [al-rowad-auto-site](https://github.com/omaralaa0707/al-rowad-auto-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: Their showroom floor lifted to a paper ground #F2EFE9 over the near-black wall #12141A the slogan is painted on, with their shield red taken down to #B8261F so it clears AA on both light surfaces — plus a **status green #17663E**, the first green in the set, used only to mark immediate delivery and explicitly not claimed as theirs

**Type pairing**
: Bricolage Grotesque + Onest / Reem Kufi + Vazirmatn (AR)

**3D / signature technique**
: **Perspective road type**: their slogan laid on a real 3D ground plane running to a vanishing point, drei SDF `Text` lying flat so each repeat foreshortens correctly, instanced lane dashes, fog for the horizon, and a pointer-steered camera yaw. It never stops moving, which is the claim

**Motion language**
: Roll: content is already moving when it arrives and comes to rest, entering along the reading direction — RTL from the right, LTR from the left

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/alrowadauto/
- Facebook: https://www.facebook.com/alrowadauto/
- Google Maps: https://www.google.com/maps/place/Al+Rowad+Auto/data=!4m2!3m1!1s0x0:0x4c23400b08f191d4

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
