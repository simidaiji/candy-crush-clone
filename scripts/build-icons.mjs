// Generates the app icons in /icons from the artwork defined below.
// Usage: npm install --no-save sharp && node scripts/build-icons.mjs
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'icons');
mkdirSync(out, { recursive: true });

// Building artwork, shared with the game (100×100 symbols).
const DEFS = `
<symbol id="hdb" viewBox="0 0 100 100">
  <rect x="22" y="14" width="56" height="74" rx="4" fill="#F2684F"/>
  <path d="M66 14 H74 A4 4 0 0 1 78 18 V88 H66 Z" fill="#D14E38"/>
  <rect x="19" y="9" width="62" height="9" rx="3" fill="#FFB09E"/>
  <g fill="#FFF0EA"><rect x="28" y="24" width="33" height="5" rx="1.5"/><rect x="28" y="34" width="33" height="5" rx="1.5"/><rect x="28" y="44" width="33" height="5" rx="1.5"/><rect x="28" y="54" width="33" height="5" rx="1.5"/><rect x="28" y="64" width="33" height="5" rx="1.5"/></g>
  <g fill="#F4A893"><rect x="68.5" y="24" width="6" height="5" rx="1"/><rect x="68.5" y="34" width="6" height="5" rx="1"/><rect x="68.5" y="44" width="6" height="5" rx="1"/><rect x="68.5" y="54" width="6" height="5" rx="1"/><rect x="68.5" y="64" width="6" height="5" rx="1"/></g>
  <rect x="22" y="74" width="56" height="14" fill="#8A2C1E"/>
  <g fill="#F2684F"><rect x="27" y="76" width="5" height="12"/><rect x="47" y="76" width="5" height="12"/></g><rect x="67" y="76" width="5" height="12" fill="#D14E38"/>
</symbol>
<symbol id="condo" viewBox="0 0 100 100">
  <path d="M30 88 V30 A20 20 0 0 1 70 30 V88 Z" fill="#17A89E"/>
  <path d="M58 88 V11.7 A20 20 0 0 1 70 30 V88 Z" fill="#0D857C"/>
  <g fill="#DBFFFA" opacity=".9"><rect x="30" y="31" width="40" height="3.5"/><rect x="30" y="40" width="40" height="3.5"/><rect x="30" y="49" width="40" height="3.5"/><rect x="30" y="58" width="40" height="3.5"/><rect x="30" y="67" width="40" height="3.5"/></g>
  <path d="M36 22 L44 14 L44 70 L36 76 Z" fill="#fff" opacity=".22"/>
  <rect x="42" y="77" width="16" height="11" rx="2" fill="#0A5C56"/>
</symbol>
<symbol id="house" viewBox="0 0 100 100">
  <rect x="63" y="22" width="9" height="18" fill="#A8560F"/>
  <rect x="20" y="46" width="60" height="42" fill="#F7B52C"/>
  <rect x="66" y="46" width="14" height="42" fill="#D9921A"/>
  <path d="M10 51 L50 15 L90 51 Z" fill="#E0741B" stroke="#E0741B" stroke-width="3" stroke-linejoin="round"/>
  <path d="M10 51 L50 15 L50 22 L17 51 Z" fill="#F29A4A"/>
  <circle cx="50" cy="38" r="5.5" fill="#FFF5D9"/>
  <rect x="27" y="58" width="13" height="13" rx="2" fill="#FFF5D9"/>
  <rect x="64" y="58" width="11" height="13" rx="2" fill="#F5DCA2"/>
  <path d="M44 88 V71 A6.5 6.5 0 0 1 57 71 V88 Z" fill="#7B4510"/>
</symbol>`;

// Artwork on a 1024 canvas. The skyline is drawn at 1× and scaled per icon.
const ART = `
<g>
  <!-- confetti -->
  <rect x="226" y="330" width="48" height="24" rx="7" fill="#FFC83A" transform="rotate(-28 250 342)"/>
  <rect x="760" y="300" width="48" height="24" rx="7" fill="#E23D3D" transform="rotate(24 784 312)"/>
  <rect x="352" y="250" width="40" height="20" rx="6" fill="#6FA0F5" transform="rotate(32 372 260)"/>
  <!-- plinth -->
  <rect x="190" y="752" width="644" height="72" rx="36" fill="#DDF0E5"/>
  <!-- skyline -->
  <use href="#condo" x="140" y="492" width="300" height="300"/>
  <use href="#house" x="524" y="492" width="300" height="300"/>
  <use href="#hdb" x="292" y="418" width="380" height="380"/>
  <!-- sparkle -->
  <path d="M668 318 L684 366 L732 382 L684 398 L668 446 L652 398 L604 382 L652 366 Z" fill="#FFC83A" stroke="#18263A" stroke-width="9" stroke-linejoin="round"/>
</g>`;

// Board-style tiles behind the art.
const tiles = Array.from({ length: 16 }, (_, i) => {
  const r = Math.floor(i / 4), c = i % 4;
  return `<rect x="${c * 256 + 10}" y="${r * 256 + 10}" width="236" height="236" rx="40" fill="${(r + c) % 2 ? '#2A3C51' : '#25364A'}"/>`;
}).join('');

function iconSvg({ rounded = false, scale = 1 } = {}) {
  const clip = rounded ? `<clipPath id="clip"><rect width="1024" height="1024" rx="228"/></clipPath>` : '';
  // centre of the artwork is ~(512, 585); place it at (512, 512)
  const t = `translate(512 512) scale(${scale}) translate(-512 -585)`;
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" width="1024" height="1024">
<defs>${DEFS}${clip}</defs>
<g ${rounded ? 'clip-path="url(#clip)"' : ''}>
  <rect width="1024" height="1024" fill="#203041"/>${tiles}
</g>
<g transform="${t}">${ART}</g>
</svg>`;
}

const files = {
  'icon.svg': iconSvg({ rounded: true, scale: 1.22 }),   // "any" icon (desktop installs, favicons)
  'icon-maskable.svg': iconSvg({ scale: 0.98 }),          // full-bleed, art inside the 80% safe zone
  'icon-apple.svg': iconSvg({ scale: 1.18 }),             // full-bleed; iOS rounds the corners itself
};
for (const [name, svg] of Object.entries(files)) writeFileSync(join(out, name), svg);

const renders = [
  ['icon.svg', 'icon-192.png', 192],
  ['icon.svg', 'icon-512.png', 512],
  ['icon.svg', 'favicon-32.png', 32],
  ['icon-maskable.svg', 'icon-maskable-192.png', 192],
  ['icon-maskable.svg', 'icon-maskable-512.png', 512],
  ['icon-apple.svg', 'apple-touch-icon.png', 180],
];
for (const [src, dest, size] of renders) {
  await sharp(Buffer.from(files[src]), { density: 300 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(join(out, dest));
  console.log('wrote', dest);
}
