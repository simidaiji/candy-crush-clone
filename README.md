# Block Party

A property-themed match-3 puzzle game, inspired by Candy Crush. Match Singapore homes — HDB flats, condos, terrace houses, shophouses, bungalows and office towers — to build out the estate across 15 blocks.

It's a Progressive Web App: install it to your phone's home screen and it runs full-screen and works offline.

## Gameplay

- **8×8 board, 15 levels** with move limits, goals and 1–3 stars per level
- **Power-ups:** match 4 for a **Bulldozer** (clears a row or column), an L or T shape for a **Renovation** (3×3 blast), match 5 for a **SOLD sign** (clears every home of one kind). Swap two power-ups together for a bigger blast.
- **Obstacles:** **empty plots** to build on, **scaffolding** that locks homes in place, and **roadblocks** that need matches beside them
- Swipe or tap-tap to swap, hints after a pause, auto-reshuffle, sound effects, vibration (Android), keyboard play
- Progress and best scores are saved on the device

## Project structure

```
index.html              The whole game (HTML, CSS and JS in one file)
manifest.webmanifest    PWA manifest: name, colours, icons, screenshots
sw.js                   Service worker: offline play and instant loading
vercel.json             Headers for the service worker, manifest and assets
fonts/                  Self-hosted Bricolage Grotesque (SIL OFL, see OFL.txt)
icons/                  App icons (PNG + SVG source)
screenshots/            Shown in Android's install dialog
scripts/build-icons.mjs Regenerates icons/ from the icon artwork
```

No build step and no dependencies: it's a static site.

## Deploy to Vercel

1. In Vercel, choose **Add New → Project** and import this GitHub repo.
2. Leave the defaults: Framework Preset **Other**, no build command, output directory = the repo root.
3. Deploy. Every push to `main` redeploys automatically.

Or from a terminal: `npx vercel` (preview) / `npx vercel --prod`.

## Install on your phone

The app must be served over HTTPS (your Vercel URL is), then:

- **iPhone / iPad (Safari):** open the site, tap **Share**, then **Add to Home Screen**.
- **Android (Chrome):** open the site and tap **Install** on the map screen, or use the browser menu → **Install app**.

## Run locally

Service workers need a real server, so don't open the file directly:

```sh
npx serve .
# or
python3 -m http.server 8000
```

Add `?debug` to the URL to expose test hooks on `window.__BP`.

## Updating

Installed copies pick up a new `index.html` the next time they're opened online. If you change cached assets (icons, font), bump `VERSION` in `sw.js` so phones drop the old cache.

To regenerate icons after editing the artwork in `scripts/build-icons.mjs`:

```sh
npm install --no-save sharp && node scripts/build-icons.mjs
```
