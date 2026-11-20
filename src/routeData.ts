// Svenska sidor (docs-internal#84): egen meny och hreflang bara där en översättning finns.
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import menySv from './generated/meny-sv.json';
import sprak from './generated/sprak.json';

type MenyPost = { label: string; href?: string; collapsed?: boolean; items?: MenyPost[] };
type Lank = { type: 'link'; label: string; href: string; isCurrent: boolean; badge: undefined; attrs: Record<string, never> };
type Grupp = { type: 'group'; label: string; collapsed: boolean; badge: undefined; entries: (Lank | Grupp)[] };

const svenska = new Set(sprak.svenska);
const utanSnedstreck = (s: string) => s.replace(/\/+$/, '');

const byggMeny = (poster: MenyPost[], aktuell: string): (Lank | Grupp)[] =>
	poster.map((p) => {
		if (p.href) {
			return { type: 'link', label: p.label, href: p.href, isCurrent: utanSnedstreck(p.href) === aktuell, badge: undefined, attrs: {} };
		}
		const entries = byggMeny(p.items ?? [], aktuell);
		const innehallerAktuell = JSON.stringify(entries).includes('"isCurrent":true');
		return { type: 'group', label: p.label, collapsed: Boolean(p.collapsed) && !innehallerAktuell, badge: undefined, entries };
	});

const lankar = (poster: (Lank | Grupp)[]): Lank[] => poster.flatMap((p) => (p.type === 'link' ? [p] : lankar(p.entries)));

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const engelskId = route.id.replace(/^sv(\/|$)/, '');
	const harSvenska = svenska.has(engelskId ? `sv/${engelskId}` : 'sv');

	// Starlight lägger hreflang för alla språk på alla sidor. Behåll dem bara där sidan finns på båda.
	if (!harSvenska) {
		route.head = route.head.filter((t) => !(t.tag === 'link' && t.attrs?.rel === 'alternate' && t.attrs?.hreflang));
	}

	if (route.locale === 'sv') {
		// Ingen svensk startsida än: loggan går till den engelska
		if (!svenska.has('sv')) route.siteTitleHref = route.siteTitleHref.replace(/sv\/?$/, '');
		const sidebar = byggMeny(menySv as MenyPost[], utanSnedstreck(context.url.pathname));
		route.sidebar = sidebar;
		const alla = lankar(sidebar);
		const i = alla.findIndex((l) => l.isCurrent);
		route.pagination = { prev: i > 0 ? alla[i - 1] : undefined, next: i >= 0 && i < alla.length - 1 ? alla[i + 1] : undefined };
	}
});
