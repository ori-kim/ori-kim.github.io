import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

interface PostCollectionOptions {
  type: string;
}

const definePostCollection = (options: PostCollectionOptions) =>
  defineCollection({
    type: 'content_layer',
    loader: glob({
      pattern: `**/*.{mdx,md}`,
      base: `./content/${options.type}`
    }),
    schema: z.object({
      title: z.string(),
      date: z.coerce.date(),
      type: z.string().default(options.type),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      updated: z.coerce.date().optional().nullable(),
      icon: z.string().optional().nullable(),
      series: z.string().optional().nullable(),
      tags: z.array(z.string()).default([]).optional(),
      slug: z.string()
    })
  });

const dev = definePostCollection({ type: 'dev' });
const docs = definePostCollection({ type: 'docs' });
const snippet = definePostCollection({ type: 'snippet' });
const book = definePostCollection({ type: 'book' });
const life = definePostCollection({ type: 'life' });

const ppt = defineCollection({
  type: 'content_layer',
  loader: glob({
    pattern: `**/*.{mdx,md}`,
    base: `./content/ppt`
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    slug: z.string()
  })
});

export const collections = { dev, docs, snippet, book, life, ppt };
