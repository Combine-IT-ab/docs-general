// Gör om docs/ till sidor för Astro Starlight i src/content/docs/.
//
// - Sidor som finns i adresser/gamla-adresser.csv får sin gamla adress som slug,
//   så att www.combineit.se/docs/<gammal-adress>/ fortsätter fungera.
// - Rubriken (första H1) blir sidans title.
// - Relativa länkar till .md-filer skrivs om till sidans riktiga adress.
// - Mermaid-diagram ritas till SVG vid bygget, så att texten finns i HTML:en.
// - meny.yml blir sidomenyn.
// - Kategori- och taggadresser skrivs till dist-wordpress/htaccess-docs.txt för bytet i WordPress.
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync, existsSync, cpSync } from 'node:fs';
import { join, dirname, relative, posix } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const ROT = process.cwd();
const KALLA = join(ROT, 'docs');
const MAL = join(ROT, 'src/content/docs');
const GENERERAT = join(ROT, 'src/generated');
const CACHE = join(ROT, 'node_modules/.cache/mermaid');
const BAS = '/docs';

const allaFiler = (dir) =>
	readdirSync(dir).flatMap((namn) => {
		const p = join(dir, namn);
		return statSync(p).isDirectory() ? allaFiler(p) : [p];
	});

// Gamla adresser: fil -> slug
const csv = readFileSync(join(ROT, 'adresser/gamla-adresser.csv'), 'utf8').trim().split('\n').slice(1);
const gamlaSlugs = new Map();
const wordpressRader = [];
for (const rad of csv) {
	const [adress, typ, mal] = rad.split(',');
	if (!mal) continue;
	const fil = mal.replace(/^docs\//, '');
	if (typ === 'sida') gamlaSlugs.set(fil, adress.replace(/^\/docs\//, '').replace(/\/$/, ''));
	if (typ === 'start') gamlaSlugs.set(fil, '');
	if (typ === 'kategori' || typ === 'tagg') wordpressRader.push([adress, fil]);
}

const kallFiler = allaFiler(KALLA).filter((f) => f.endsWith('.md'));
const sidor = new Map(); // relativ källfil -> { slug, data, body }

for (const fil of kallFiler) {
	const rel = relative(KALLA, fil).split('\\').join('/');
	const { data, content } = matter(readFileSync(fil, 'utf8'));
	let body = content;
	// Starlight visar title som rubrik, så sidans egen H1 tas bort
	const h1 = body.match(/^\s*#\s+(.+?)\s*$/m);
	const forstaRaden = body.trimStart().split('\n')[0];
	if (!data.title) {
		if (!h1) throw new Error(`${rel} saknar rubrik (# ...) och title`);
		data.title = h1[1].replace(/\*\*/g, '').trim();
	}
	if (h1 && forstaRaden.startsWith('# ')) body = body.replace(h1[0], '');
	const vagSlug = rel.replace(/(^|\/)README\.md$/, '$1').replace(/\.md$/, '').replace(/\/$/, '').toLowerCase();
	const slug = data.slug ?? (gamlaSlugs.has(rel) ? gamlaSlugs.get(rel) : vagSlug);
	sidor.set(rel, { slug, data, body });
}

const anvanda = new Map();
for (const [rel, { slug }] of sidor) {
	if (anvanda.has(slug)) throw new Error(`${rel} och ${anvanda.get(slug)} får samma adress: ${slug || '/'}`);
	anvanda.set(slug, rel);
}

const adress = (slug) => (slug ? `${BAS}/${slug}/` : `${BAS}/`);

// Länkar: [text](../annan.md#ankare) -> [text](/docs/annan-slug/#ankare)
const skrivOmLankar = (rel, body) =>
	body.replace(/\]\((?!https?:|mailto:|#)([^)\s]+?\.md)(#[^)\s]*)?\)/g, (hel, lank, ankare = '') => {
		const mal = posix.normalize(posix.join(posix.dirname(rel), lank));
		const sida = sidor.get(mal);
		if (!sida) {
			console.warn(`varning: ${rel} länkar till ${lank}, som inte finns`);
			return hel;
		}
		return `](${adress(sida.slug)}${ankare})`;
	});

// Bilder i docs/assets/ läggs i public/assets/ och nås via /docs/assets/...
const skrivOmBilder = (rel, body) =>
	body.replace(/\]\((?!https?:)([^)\s]*assets\/[^)\s]+)\)/g, (hel, lank) => {
		const mal = posix.normalize(posix.join(posix.dirname(rel), lank));
		if (!mal.startsWith('assets/')) return hel;
		if (!existsSync(join(KALLA, mal))) throw new Error(`${rel} pekar på ${lank}, som inte finns`);
		return `](${BAS}/${mal})`;
	});

// Mermaid -> inbäddad SVG
mkdirSync(CACHE, { recursive: true });
const ritaMermaid = (kod) => {
	const hash = createHash('sha256').update(kod).digest('hex').slice(0, 16);
	const svgFil = join(CACHE, `${hash}.svg`);
	if (!existsSync(svgFil)) {
		const in_ = join(tmpdir(), `mermaid-${hash}.mmd`);
		writeFileSync(in_, kod);
		const konfig = join(ROT, 'scripts/mermaid.json');
		const pup = join(ROT, 'scripts/puppeteer.json');
		execFileSync(join(ROT, 'node_modules/.bin/mmdc'), ['-q', '-i', in_, '-o', svgFil, '-c', konfig, '-p', pup, '-b', 'transparent'], { stdio: 'inherit' });
	}
	let svg = readFileSync(svgFil, 'utf8');
	// Unikt id per diagram, så att stilarna inte krockar när flera diagram finns på samma sida
	svg = svg.replaceAll('my-svg', `mermaid-${hash}`);
	// Tom rad före och efter, annars slukar HTML-blocket nästa rubrik
	return `\n<figure class="diagram">${svg.replace(/\n/g, ' ')}</figure>\n`;
};
const ritaDiagram = (body) => body.replace(/^```mermaid\s*\n([\s\S]*?)^```\s*$/gm, (_, kod) => ritaMermaid(kod));

rmSync(MAL, { recursive: true, force: true });
for (const [rel, { slug, data, body }] of sidor) {
	const malRel = rel.replace(/(^|\/)README\.md$/, '$1index.md');
	const ut = join(MAL, malRel);
	mkdirSync(dirname(ut), { recursive: true });
	const nyData = { ...data, slug: slug || undefined };
	if (slug === '') delete nyData.slug;
	const text = ritaDiagram(skrivOmBilder(rel, skrivOmLankar(rel, body)));
	writeFileSync(ut, matter.stringify(text, JSON.parse(JSON.stringify(nyData))));
}
// Startsidan måste heta index.md utan slug
if (!sidor.has('README.md')) throw new Error('docs/README.md saknas');

// Bilder och filer i docs/assets följer med
if (existsSync(join(KALLA, 'assets'))) cpSync(join(KALLA, 'assets'), join(ROT, 'public/assets'), { recursive: true });

// Sidomenyn från meny.yml
const meny = yaml.load(readFileSync(join(ROT, 'meny.yml'), 'utf8')).nav;
const tillMeny = (post) => {
	const [etikett, varde] = Object.entries(post)[0];
	if (typeof varde === 'string') {
		const sida = sidor.get(varde);
		if (!sida) throw new Error(`meny.yml pekar på ${varde}, som inte finns`);
		return { label: etikett, link: adress(sida.slug) };
	}
	return { label: etikett, collapsed: true, items: varde.map(tillMeny) };
};
mkdirSync(GENERERAT, { recursive: true });
writeFileSync(join(GENERERAT, 'meny.json'), JSON.stringify(meny.map(tillMeny), null, 2));

// 301 för kategori- och taggadresser, läggs i WordPress .htaccess vid bytet
const wpDir = join(ROT, 'dist-wordpress');
mkdirSync(wpDir, { recursive: true });
const rader = wordpressRader.map(([gammal, fil]) => `RewriteRule ^${gammal.replace(/^\//, '').replace(/\/$/, '')}/?$ ${adress(sidor.get(fil).slug)} [R=301,L]`);
writeFileSync(join(wpDir, 'htaccess-docs.txt'), ['# Lägg in före WordPress-reglerna i .htaccess', ...rader, ''].join('\n'));

console.log(`${sidor.size} sidor förberedda, ${wordpressRader.length} omdirigeringar för WordPress`);
