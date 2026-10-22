// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { readFileSync } from 'node:fs';

// scripts/forbered.mjs skapar menyn från meny.yml
const meny = JSON.parse(readFileSync(new URL('./src/generated/meny.json', import.meta.url), 'utf8'));

// FORHANDSVISNING=1 bygger till /docs-preview/ med noindex, för att prova på one.com före bytet
const forhandsvisning = process.env.FORHANDSVISNING === '1';

export default defineConfig({
	site: 'https://www.combineit.se',
	base: forhandsvisning ? '/docs-preview' : '/docs',
	trailingSlash: 'always',
	build: { format: 'directory' },
	integrations: [
		starlight({
			title: 'CombineIT Docs',
			description:
				'Documentation for Web Connect, Easy Connect and Job Queue Monitor: integrations for Microsoft Dynamics 365 Business Central that you configure yourself.',
			logo: { src: './src/assets/combineit-logo.png', alt: 'CombineIT', replacesTitle: true },
			locales: { root: { label: 'English', lang: 'en' } },
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
			},
			sidebar: meny,
			editLink: { baseUrl: 'https://github.com/Combine-IT-ab/docs-general/edit/main/' },
			lastUpdated: false,
			social: [{ icon: 'external', label: 'combineit.se', href: 'https://www.combineit.se' }],
		}),
	],
});
