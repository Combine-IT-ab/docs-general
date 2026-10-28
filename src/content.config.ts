import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Fälten kommer från mallarna i mallar/. Alla är frivilliga, så att äldre sidor utan dem byggs.
export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				summary: z.string().optional(),
				product: z.string().optional(),
				type: z.string().optional(),
				system: z.string().optional(),
				system_category: z.string().optional(),
				data_flows: z.number().optional(),
				last_reviewed: z.coerce.date().optional(),
				keywords: z.array(z.string()).optional(),
				lang: z.string().optional(),
				translation_key: z.string().optional(),
				appsource: z.string().url().optional(),
				faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
			}),
		}),
	}),
};
