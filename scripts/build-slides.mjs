import { readdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

const slidesDir = join(process.cwd(), 'slides');
const outBase = join(process.cwd(), 'dist', 'openclaw-blog', 'slides');

if (!existsSync(slidesDir)) {
  console.log('No slides directory found, skipping.');
  process.exit(0);
}

const decks = readdirSync(slidesDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .filter(d => existsSync(join(slidesDir, d.name, 'slides.md')));

if (decks.length === 0) {
  console.log('No slide decks found.');
  process.exit(0);
}

for (const deck of decks) {
  const slidePath = join(slidesDir, deck.name, 'slides.md');
  const outDir = join(outBase, deck.name);
  console.log(`Building slides: ${deck.name} → ${outDir}`);
  execSync(
    `npx slidev build "${slidePath}" --base /openclaw-blog/slides/${deck.name}/ --out "${outDir}"`,
    { stdio: 'inherit' }
  );
}

console.log(`Built ${decks.length} slide deck(s).`);
