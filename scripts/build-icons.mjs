// Generates the app icons in /icons from the artwork defined below.
// Usage: npm install --no-save sharp && node scripts/build-icons.mjs
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'icons');
mkdirSync(out, { recursive: true });

const INK = '#18263A';

// Sunburst rays around (512, 540).
const rays = Array.from({ length: 18 }, (_, i) => {
  if (i % 2) return '';
  const a0 = (i / 18) * Math.PI * 2, a1 = ((i + 1) / 18) * Math.PI * 2, R = 1000;
  const p = a => `${(512 + Math.cos(a) * R).toFixed(1)} ${(540 + Math.sin(a) * R).toFixed(1)}`;
  return `<path d="M512 540 L${p(a0)} L${p(a1)} Z"/>`;
}).join('');

const DEFS = `
<radialGradient id="bg" cx="512" cy="540" r="640" gradientUnits="userSpaceOnUse">
  <stop offset="0" stop-color="#FFC16E"/><stop offset=".55" stop-color="#FF8F3F"/><stop offset="1" stop-color="#EE5F17"/>
</radialGradient>
<linearGradient id="coral" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#FF7A6A"/><stop offset="1" stop-color="#E5404A"/>
</linearGradient>
<linearGradient id="hat" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#2CC7BB"/><stop offset="1" stop-color="#109087"/>
</linearGradient>
<radialGradient id="glow" cx="512" cy="560" r="380" gradientUnits="userSpaceOnUse">
  <stop offset="0" stop-color="#FFF4DC" stop-opacity=".95"/><stop offset=".6" stop-color="#FFE2B0" stop-opacity=".55"/><stop offset="1" stop-color="#FFD08A" stop-opacity="0"/>
</radialGradient>
<clipPath id="body"><rect x="342" y="372" width="340" height="490" rx="44"/></clipPath>
<clipPath id="cone"><path d="M420 352 L512 112 L604 352 Z"/></clipPath>`;

const ART = `
<g>
  <!-- streamers -->
  <g fill="none" stroke-width="18" stroke-linecap="round">
    <path d="M118 360 q 40 -46 80 0 t 80 0" stroke="#FFE45C"/>
    <path d="M744 214 q 36 -44 72 0 t 72 0" stroke="#FF4F8B"/>
    <path d="M770 660 q 40 -46 80 0 t 80 0" stroke="#2CC7BB"/>
    <path d="M96 640 q 36 -44 72 0 t 72 0" stroke="#6FA0F5"/>
  </g>
  <!-- confetti -->
  <g stroke="${INK}" stroke-width="8" stroke-linejoin="round">
    <rect x="230" y="200" width="56" height="30" rx="8" fill="#FFE45C" transform="rotate(-24 258 215)"/>
    <rect x="790" y="390" width="56" height="30" rx="8" fill="#6FA0F5" transform="rotate(30 818 405)"/>
    <rect x="176" y="478" width="48" height="26" rx="7" fill="#FF4F8B" transform="rotate(38 200 491)"/>
    <rect x="828" y="800" width="48" height="26" rx="7" fill="#FFE45C" transform="rotate(-30 852 813)"/>
    <circle cx="214" cy="798" r="20" fill="#2CC7BB"/>
    <circle cx="742" cy="120" r="18" fill="#FFE45C"/>
    <circle cx="300" cy="96" r="14" fill="#6FA0F5"/>
  </g>
  <!-- sparkles -->
  <g fill="#FFFFFF" stroke="${INK}" stroke-width="9" stroke-linejoin="round">
    <path d="M808 520 L822 562 L864 576 L822 590 L808 632 L794 590 L752 576 L794 562 Z"/>
    <path d="M226 590 L236 620 L266 630 L236 640 L226 670 L216 640 L186 630 L216 620 Z"/>
  </g>

  <!-- glow behind the character -->
  <circle cx="512" cy="560" r="380" fill="url(#glow)"/>
  <!-- ground shadow -->
  <ellipse cx="512" cy="876" rx="250" ry="34" fill="${INK}" opacity=".3"/>

  <!-- the block -->
  <rect x="342" y="372" width="340" height="490" rx="44" fill="url(#coral)"/>
  <g clip-path="url(#body)">
    <rect x="612" y="372" width="70" height="490" fill="#B92F3A" opacity=".45"/>
    <rect x="342" y="372" width="30" height="490" fill="#fff" opacity=".2"/>
    <g fill="#FFF1E8"><rect x="384" y="424" width="50" height="28" rx="8"/><rect x="455" y="424" width="50" height="28" rx="8"/><rect x="526" y="424" width="50" height="28" rx="8"/></g>
    <rect x="597" y="424" width="50" height="28" rx="8" fill="#FFC2B0"/>
    <rect x="342" y="774" width="340" height="90" fill="#72202C"/>
    <g fill="#FF6E66"><rect x="384" y="774" width="38" height="90"/><rect x="493" y="774" width="38" height="90"/></g>
    <rect x="602" y="774" width="38" height="90" fill="#CF4450"/>
    <rect x="342" y="764" width="340" height="14" fill="${INK}" opacity=".25"/>
  </g>
  <rect x="342" y="372" width="340" height="490" rx="44" fill="none" stroke="${INK}" stroke-width="18"/>

  <!-- face -->
  <g stroke="${INK}" stroke-width="14">
    <ellipse cx="446" cy="556" rx="52" ry="58" fill="#fff"/>
    <ellipse cx="578" cy="556" rx="52" ry="58" fill="#fff"/>
  </g>
  <circle cx="458" cy="568" r="26" fill="${INK}"/><circle cx="590" cy="568" r="26" fill="${INK}"/>
  <circle cx="468" cy="556" r="10" fill="#fff"/><circle cx="600" cy="556" r="10" fill="#fff"/>
  <ellipse cx="398" cy="652" rx="28" ry="17" fill="#FF8FB0"/><ellipse cx="626" cy="652" rx="28" ry="17" fill="#FF8FB0"/>
  <path d="M458 646 Q512 736 566 646 Z" fill="${INK}" stroke="${INK}" stroke-width="14" stroke-linejoin="round"/>
  <ellipse cx="512" cy="680" rx="24" ry="11" fill="#FF5D73"/>

  <!-- roof -->
  <rect x="318" y="344" width="388" height="60" rx="28" fill="#FFC2B0" stroke="${INK}" stroke-width="18"/>

  <!-- party hat -->
  <g transform="rotate(-10 512 346)">
    <path d="M420 352 L512 112 L604 352 Z" fill="url(#hat)"/>
    <g clip-path="url(#cone)" fill="#FFE45C">
      <path d="M380 300 L640 220 L640 262 L380 342 Z"/>
      <path d="M380 210 L640 130 L640 172 L380 252 Z"/>
    </g>
    <path d="M420 352 L512 112 L604 352 Z" fill="none" stroke="${INK}" stroke-width="18" stroke-linejoin="round"/>
    <circle cx="512" cy="106" r="38" fill="#FF4F8B" stroke="${INK}" stroke-width="16"/>
    <circle cx="500" cy="94" r="10" fill="#fff" opacity=".7"/>
  </g>
</g>`;

function iconSvg({ rounded = false, scale = 1 } = {}) {
  const clip = rounded ? `<clipPath id="clip"><rect width="1024" height="1024" rx="228"/></clipPath>` : '';
  // the artwork's visual centre is ~(512, 500)
  const t = `translate(512 512) scale(${scale}) translate(-512 -500)`;
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" width="1024" height="1024">
<defs>${DEFS}${clip}</defs>
<g ${rounded ? 'clip-path="url(#clip)"' : ''}>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <g fill="#FFFFFF" opacity=".13">${rays}</g>
</g>
<g transform="${t}">${ART}</g>
</svg>`;
}

const files = {
  'icon.svg': iconSvg({ rounded: true, scale: 1.0 }),    // "any" icon (desktop installs, favicons)
  'icon-maskable.svg': iconSvg({ scale: 0.84 }),          // full-bleed, art inside the 80% safe zone
  'icon-apple.svg': iconSvg({ scale: 0.98 }),             // full-bleed; iOS rounds the corners itself
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
