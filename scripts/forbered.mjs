// Gör om docs/ till sidor för Astro Starlight i src/content/docs/.
//
// - Sidor som finns i adresser/gamla-adresser.csv får sin gamla adress som slug,
//   så att www.combineit.se/docs/<gammal-adress>/ fortsätter fungera.
// - Rubriken (första H1) blir sidans title.
// - Relativa länkar till .md-filer skrivs om till sidans riktiga adress.
// - Mermaid-diagram ritas till SVG vid bygget, så att texten finns i HTML:en.
// - meny.yml blir sidomenyn: nav för engelska och nav_sv för svenska.
// - Svenska sidor heter <sida>.sv.md och ligger bredvid den engelska. De får adressen
//   sv/<engelska adressen>, lang: sv och samma translation_key som den engelska.
// - Kategori- och taggadresser skrivs till dist-wordpress/htaccess-docs.txt för bytet i WordPress.
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync, existsSync, cpSync } from 'node:fs';
import { join, dirname, relative, posix } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import GithubSlugger from 'github-slugger';

const ROT = process.cwd();
const KALLA = join(ROT, 'docs');
const MAL = join(ROT, 'src/content/docs');
const GENERERAT = join(ROT, 'src/generated');
const CACHE = join(ROT, 'node_modules/.cache/mermaid');
// Samma bas som i astro.config.mjs
const BAS = process.env.FORHANDSVISNING === '1' ? '/docs-preview' : '/docs';

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

const SVENSK = /\.sv\.md$/;
// Engelska först, så att varje svensk sida kan hämta sin engelska sidas adress
const kallFiler = allaFiler(KALLA)
	.filter((f) => f.endsWith('.md'))
	.sort((a, b) => SVENSK.test(a) - SVENSK.test(b));
const sidor = new Map(); // relativ källfil -> { slug, data, body }

for (const fil of kallFiler) {
	const rel = relative(KALLA, fil).split('\\').join('/');
	// gray-matter cachar på texten och ger samma objekt för identiska filer, så datan kopieras
	const { data: lastData, content } = matter(readFileSync(fil, 'utf8'));
	const data = structuredClone(lastData);
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
	if (SVENSK.test(rel)) {
		const engelsk = sidor.get(rel.replace(SVENSK, '.md'));
		if (!engelsk) throw new Error(`${rel} saknar engelsk sida (${rel.replace(SVENSK, '.md')})`);
		const slug = engelsk.slug ? `sv/${engelsk.slug}` : 'sv';
		if (data.slug && data.slug !== slug) throw new Error(`${rel} har slug ${data.slug}, ska vara ${slug} (samma som den engelska med sv/ före)`);
		if (data.lang && data.lang !== 'sv') throw new Error(`${rel} har lang: ${data.lang}, ska vara sv`);
		const nyckel = engelsk.data.translation_key;
		if (data.translation_key && nyckel && data.translation_key !== nyckel) throw new Error(`${rel} har translation_key ${data.translation_key}, den engelska har ${nyckel}`);
		data.lang = 'sv';
		if (nyckel) data.translation_key = nyckel;
		sidor.set(rel, { slug, data, body, svensk: true });
		continue;
	}
	const slug = data.slug ?? (gamlaSlugs.has(rel) ? gamlaSlugs.get(rel) : vagSlug);
	sidor.set(rel, { slug, data, body });
}

const anvanda = new Map();
for (const [rel, { slug }] of sidor) {
	if (anvanda.has(slug)) throw new Error(`${rel} och ${anvanda.get(slug)} får samma adress: ${slug || '/'}`);
	anvanda.set(slug, rel);
}

const adress = (slug) => (slug ? `${BAS}/${slug}/` : `${BAS}/`);

// Rubrikernas ankare, på samma sätt som Astro räknar fram id:t på rubriken
const rubrikAnkare = (body) => {
	const slugger = new GithubSlugger();
	return body
		.replace(/^```[\s\S]*?^```/gm, '')
		.split('\n')
		.map((rad) => rad.match(/^#{1,6}\s+(.+?)\s*#*\s*$/))
		.filter(Boolean)
		.map((m) => slugger.slug(m[1].replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*_]/g, '').replace(/<[^>]+>/g, '')));
};
// En svensk sida har samma rubriker i samma ordning som den engelska, så ett engelskt ankare
// (#choose-your-setup) kan översättas till rubrikens svenska ankare (#välj-upplägg).
const ankarKarta = new Map();
const svenskaAnkare = (rel) => {
	if (!ankarKarta.has(rel)) {
		const en = rubrikAnkare(sidor.get(rel.replace(SVENSK, '.md')).body);
		const sv = rubrikAnkare(sidor.get(rel).body);
		if (en.length !== sv.length) console.warn(`varning: ${rel} har ${sv.length} rubriker, den engelska ${en.length}. Ankarlänkar översätts inte.`);
		ankarKarta.set(rel, en.length === sv.length ? new Map(en.map((a, i) => [a, sv[i]])) : new Map());
	}
	return ankarKarta.get(rel);
};
const oversattAnkare = (malRel, ankare) => {
	if (!ankare || !SVENSK.test(malRel)) return ankare;
	const id = decodeURIComponent(ankare.slice(1));
	const sv = svenskaAnkare(malRel).get(id);
	return sv ? `#${sv}` : ankare;
};

// Länkar: [text](../annan.md#ankare) -> [text](/docs/annan-slug/#ankare)
// En svensk sida som länkar till en engelsk sida hamnar på den svenska versionen om den finns.
const skrivOmLankar = (rel, body) =>
	body.replace(/\]\((#[^)\s]+)\)/g, (hel, ankare) => (SVENSK.test(rel) ? `](${oversattAnkare(rel, ankare)})` : hel)).replace(/\]\((?!https?:|mailto:|#)([^)\s]+?\.md)(#[^)\s]*)?\)/g, (hel, lank, ankare = '') => {
		const mal = posix.normalize(posix.join(posix.dirname(rel), lank));
		const svMal = mal.replace(/(?<!\.sv)\.md$/, '.sv.md');
		const malRel = SVENSK.test(rel) && sidor.has(svMal) ? svMal : mal;
		const sida = sidor.get(malRel);
		if (!sida) {
			console.warn(`varning: ${rel} länkar till ${lank}, som inte finns`);
			return hel;
		}
		return `](${adress(sida.slug)}${oversattAnkare(malRel, ankare)})`;
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

// Första stycket i brödtexten blir sidans beskrivning, om frontmatter saknar description
const beskrivning = ({ data, body }) => {
	if (data.description) return data.description;
	// Hoppar över rubriker, tabeller, listor, kod och korta fältrader som "Direction: ..." eller svenskt vynamn
	const text = body.split(/\n\s*\n/)
		.map((s) => s.trim())
		.filter((s) => s && !/^[#|<>`!-]/.test(s) && !/^\d+\./.test(s))
		.map((s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').replace(/\s+/g, ' '))
		.find((s) => !/^(Direction|Error message|Swedish Business Central view name|Riktning|Felmeddelande|Namn i svenska Business Central):/.test(s));
	if (!text) return '';
	return text.length > 200 ? `${text.slice(0, 197).replace(/\s\S*$/, '')}...` : text;
};

rmSync(MAL, { recursive: true, force: true });
for (const [rel, { slug, data, body }] of sidor) {
	const malRel = rel.replace(/(^|\/)README\.md$/, '$1index.md');
	const ut = join(MAL, malRel);
	mkdirSync(dirname(ut), { recursive: true });
	// Utan egen beskrivning får alla sidor sajtens standardtext i Google (docs-internal#51)
	const nyData = { ...data, slug: slug || undefined, description: beskrivning({ data, body }) || undefined };
	if (slug === '') delete nyData.slug;
	const text = ritaDiagram(skrivOmBilder(rel, skrivOmLankar(rel, body)));
	writeFileSync(ut, matter.stringify(text, JSON.parse(JSON.stringify(nyData))));
}
// Startsidan måste heta index.md utan slug
if (!sidor.has('README.md')) throw new Error('docs/README.md saknas');

// Bilder och filer i docs/assets följer med
if (existsSync(join(KALLA, 'assets'))) cpSync(join(KALLA, 'assets'), join(ROT, 'public/assets'), { recursive: true });

// Sidomenyn från meny.yml
const menyer = yaml.load(readFileSync(join(ROT, 'meny.yml'), 'utf8'));
const meny = menyer.nav;
const menySv = menyer.nav_sv ?? [];
const tillMeny = (post) => {
	const [etikett, varde] = Object.entries(post)[0];
	if (typeof varde === 'string') {
		const sida = sidor.get(varde);
		if (!sida) throw new Error(`meny.yml pekar på ${varde}, som inte finns`);
		// Starlight lägger själv till basen (/docs) framför menylänkar
		return { label: etikett, link: sida.slug ? `/${sida.slug}/` : '/' };
	}
	return { label: etikett, collapsed: true, items: varde.map(tillMeny) };
};
mkdirSync(GENERERAT, { recursive: true });
writeFileSync(join(GENERERAT, 'meny.json'), JSON.stringify(meny.map(tillMeny), null, 2));

// Den svenska menyn visas på svenska sidor i stället för den engelska (src/routeData.ts).
// Den pekar bara på svenska sidor, så att ingen svensk sida länkar till en engelsk kopia.
// En rad vars .sv.md inte finns än hoppas över, och en grupp utan sidor försvinner. Så kan
// menyn stå klar före översättningarna. Den engelska sidan måste finnas, så att stavfel stoppar.
const iMenySv = new Set();
const tillMenySv = (post) => {
	const [etikett, varde] = Object.entries(post)[0];
	if (typeof varde === 'string') {
		if (!SVENSK.test(varde)) throw new Error(`nav_sv i meny.yml pekar på ${varde}, som inte är en svensk sida (.sv.md)`);
		const sida = sidor.get(varde);
		if (!sida) {
			if (!sidor.has(varde.replace(SVENSK, '.md'))) throw new Error(`nav_sv i meny.yml pekar på ${varde}, och den engelska sidan finns inte heller`);
			return [];
		}
		iMenySv.add(varde);
		return [{ label: etikett, href: adress(sida.slug) }];
	}
	const items = varde.flatMap(tillMenySv);
	return items.length ? [{ label: etikett, collapsed: true, items }] : [];
};
writeFileSync(join(GENERERAT, 'meny-sv.json'), JSON.stringify(menySv.flatMap(tillMenySv), null, 2));
for (const [rel, { svensk }] of sidor) if (svensk && !iMenySv.has(rel)) console.warn(`varning: ${rel} finns inte i nav_sv i meny.yml`);

// Vilka sidor som finns på svenska. Starlight gör en engelsk kopia under /sv/ av varje sida som
// saknar svensk version. Kopiorna tas bort efter bygget och hålls borta från sitemap, språkväljare
// och hreflang (astro.config.mjs, src/routeData.ts).
const svenska = [...sidor.values()].filter((s) => s.svensk).map((s) => s.slug).sort();
writeFileSync(join(GENERERAT, 'sprak.json'), JSON.stringify({ svenska }, null, 2));

// 301 för kategori- och taggadresser, läggs i WordPress .htaccess vid bytet
const wpDir = join(ROT, 'dist-wordpress');
mkdirSync(wpDir, { recursive: true });
const rader = wordpressRader.map(([gammal, fil]) => `RewriteRule ^${gammal.replace(/^\//, '').replace(/\/$/, '')}/?$ ${adress(sidor.get(fil).slug)} [R=301,L]`);
writeFileSync(join(wpDir, 'htaccess-docs.txt'), ['# Lägg in före WordPress-reglerna i .htaccess', ...rader, ''].join('\n'));

// robots.txt och llms.txt i WordPress rot, läggs upp med workflowet "Rotfiler i WordPress" (docs-internal#51).
// robots.txt ersätter den som WordPress skapar själv och pekar även på sitemapen för /docs.
// llms.txt är en innehållsförteckning för AI-assistenter, se llmstxt.org.
const SAJT = 'https://www.combineit.se';
writeFileSync(join(wpDir, 'robots.txt'), [
	'User-agent: *',
	'Disallow: /wp-admin/',
	'Allow: /wp-admin/admin-ajax.php',
	'',
	`Sitemap: ${SAJT}/wp-sitemap.xml`,
	`Sitemap: ${SAJT}/docs/sitemap-index.xml`,
	'',
].join('\n'));
const llmsRader = (post, vag = []) => {
	const [etikett, varde] = Object.entries(post)[0];
	if (typeof varde !== 'string') return varde.flatMap((p) => llmsRader(p, [...vag, etikett]));
	const sida = sidor.get(varde);
	const namn = [...vag.slice(1), etikett].filter((d) => d !== 'Overview' && d !== 'Översikt').join(' / ') || sida.data.title;
	const text = beskrivning(sida);
	return [`- [${namn}](${SAJT}/docs/${sida.slug ? `${sida.slug}/` : ''})${text ? `: ${text}` : ''}`];
};
const start = sidor.get('README.md');
// Svenska sidor i en egen rubrik, i samma ordning som den svenska menyn
const finnsSv = (post) => {
	const varde = Object.values(post)[0];
	return typeof varde === 'string' ? sidor.has(varde) : varde.some(finnsSv);
};
const bara = (poster) =>
	poster.filter(finnsSv).map((p) => {
		const [etikett, varde] = Object.entries(p)[0];
		return typeof varde === 'string' ? p : { [etikett]: bara(varde) };
	});
const llmsSv = bara(menySv).flatMap((p) => {
	const [etikett, varde] = Object.entries(p)[0];
	if (typeof varde === 'string') return llmsRader(p);
	return [`### ${etikett}`, '', ...varde.flatMap((u) => llmsRader(u, [etikett])), ''];
});
const llms = [
	'# CombineIT',
	'',
	`> ${beskrivning(start)}`,
	'',
	`CombineIT AB builds apps for Microsoft Dynamics 365 Business Central. Full documentation: ${SAJT}/docs/`,
	...meny.filter((p) => typeof Object.values(p)[0] !== 'string').flatMap((p) => {
		const [etikett, varde] = Object.entries(p)[0];
		return ['', `## ${etikett}`, '', ...varde.flatMap((u) => llmsRader(u, [etikett]))];
	}),
	...(llmsSv.length ? ['', '## På svenska', '', ...llmsSv] : []),
	'',
];
writeFileSync(join(wpDir, 'llms.txt'), llms.join('\n').replace(/\n{3,}/g, '\n\n'));

// docs.combineit.se (gamla MkDocs-sajten på GitHub Pages) skickas vidare till samma sida på
// www.combineit.se/docs. MkDocs-adressen är filens sökväg, README.md blir mappen.
const pagesDir = join(ROT, 'dist-pages');
rmSync(pagesDir, { recursive: true, force: true });
const omdirigering = (mal) =>
	`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved to www.combineit.se/docs</title>` +
	`<link rel="canonical" href="${mal}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${mal}">` +
	`<script>location.replace(${JSON.stringify(mal)} + location.hash)</script></head>` +
	`<body><p>This page has moved to <a href="${mal}">${mal}</a>.</p></body></html>\n`;
const PROD = 'https://www.combineit.se/docs';
for (const [rel, { slug, svensk }] of sidor) {
	// Svenska sidor fanns aldrig på MkDocs-sajten
	if (svensk) continue;
	const mkdocsVag = rel.replace(/(^|\/)README\.md$/, '$1').replace(/\.md$/, '/');
	const ut = join(pagesDir, mkdocsVag, 'index.html');
	mkdirSync(dirname(ut), { recursive: true });
	writeFileSync(ut, omdirigering(slug ? `${PROD}/${slug}/` : `${PROD}/`));
}
writeFileSync(join(pagesDir, '404.html'), omdirigering(`${PROD}/`));
writeFileSync(join(pagesDir, 'CNAME'), 'docs.combineit.se\n');
writeFileSync(join(pagesDir, '.nojekyll'), '');

console.log(`${sidor.size} sidor förberedda, ${wordpressRader.length} omdirigeringar för WordPress`);
