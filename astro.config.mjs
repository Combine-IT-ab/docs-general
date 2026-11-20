// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// scripts/forbered.mjs skapar menyn från meny.yml och listan över svenska sidor
const meny = JSON.parse(readFileSync(new URL('./src/generated/meny.json', import.meta.url), 'utf8'));
const { svenska } = JSON.parse(readFileSync(new URL('./src/generated/sprak.json', import.meta.url), 'utf8'));
const svenskaSidor = new Set(svenska);

// FORHANDSVISNING=1 bygger till /docs-preview/ med noindex, för att prova på one.com före bytet
const forhandsvisning = process.env.FORHANDSVISNING === '1';
const bas = forhandsvisning ? '/docs-preview' : '/docs';

// Starlight gör en engelsk kopia under /sv/ av varje sida som saknar svensk version.
// Kopiorna ska inte finnas: samma text på två adresser, och bara riktiga översättningar ska ha hreflang.
const arKopia = (vag) => {
	const slug = vag.replace(/^\/+|\/+$/g, '');
	return (slug === 'sv' || slug.startsWith('sv/')) && !svenskaSidor.has(slug);
};
const taBortKopior = {
	name: 'ta-bort-svenska-kopior',
	hooks: {
		// Körs före Starlights hook, så att kopiorna inte heller hamnar i sökindexet
		'astro:build:done': ({ dir, logger }) => {
			const rot = fileURLToPath(dir);
			let antal = 0;
			const gaIgenom = (rel) => {
				const katalog = join(rot, rel);
				if (!existsSync(katalog)) return;
				if (existsSync(join(katalog, 'index.html')) && arKopia(rel)) {
					rmSync(join(katalog, 'index.html'));
					antal++;
				}
				for (const post of readdirSync(katalog, { withFileTypes: true })) if (post.isDirectory()) gaIgenom(`${rel}/${post.name}`);
				if (readdirSync(katalog).length === 0) rmSync(katalog, { recursive: true });
			};
			gaIgenom('sv');
			logger.info(`${antal} engelska kopior under /sv/ borttagna, ${svenskaSidor.size} svenska sidor kvar`);
		},
	},
};

export default defineConfig({
	site: 'https://www.combineit.se',
	base: forhandsvisning ? '/docs-preview' : '/docs',
	trailingSlash: 'always',
	build: { format: 'directory' },
	integrations: [
		taBortKopior,
		// Egen sitemap i stället för Starlights, så att kopiorna under /sv/ inte kommer med
		sitemap({
			i18n: { defaultLocale: 'root', locales: { root: 'en', sv: 'sv' } },
			filter: (sida) => !arKopia(new URL(sida).pathname.slice(bas.length)),
		}),
		starlight({
			title: 'CombineIT Docs',
			description:
				'Documentation for Web Connect, Easy Connect and Job Queue Monitor: integrations for Microsoft Dynamics 365 Business Central that you configure yourself.',
			logo: { src: './src/assets/combineit-logo.png', alt: 'CombineIT', replacesTitle: true },
			// Engelska utan prefix, svenska under /sv/. Ingen automatisk omdirigering mellan språken.
			locales: { root: { label: 'English', lang: 'en' }, sv: { label: 'Svenska', lang: 'sv' } },
			routeMiddleware: './src/routeData.ts',
			customCss: [
				'@fontsource/instrument-sans/400.css',
				'@fontsource/instrument-sans/600.css',
				'@fontsource/instrument-sans/700.css',
				'@fontsource/jetbrains-mono/400.css',
				'./src/styles/tema.css',
			],
			components: {
				Head: './src/components/Head.astro',
				PageTitle: './src/components/PageTitle.astro',
				LanguageSelect: './src/components/LanguageSelect.astro',
			},
			sidebar: meny,
			editLink: { baseUrl: 'https://github.com/Combine-IT-ab/docs-general/edit/main/' },
			lastUpdated: false,
			social: [{ icon: 'external', label: 'combineit.se', href: 'https://www.combineit.se' }],
		}),
	],
});
