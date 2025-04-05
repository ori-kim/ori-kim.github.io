import { type CollectionEntry } from 'astro:content';

export type CollectionData = CollectionEntry<'dev' | 'docs' | 'snippet' | 'book' | 'life'> & {
  data: { image: string; description?: string };
} & { href: string; iconType: string };

export type AllCollectionEntry =
  | CollectionEntry<'dev'>
  | CollectionEntry<'docs'>
  | CollectionEntry<'snippet'>
  | CollectionEntry<'book'>
  | CollectionEntry<'life'>;
