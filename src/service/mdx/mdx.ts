import { getCollection } from 'astro:content';

import { type CONTENT_TYPE_KEYS, CONTENT_TYPE_LIST, SITE } from '@/consts';

import type { AllCollectionEntry, CollectionData } from './type';

const getAllCollection = async () => {
  const posts = await Promise.all(CONTENT_TYPE_LIST.map(({ type }) => getCollection(type)));

  return posts.flat();
};

const isCollectionType = (type: string): type is CONTENT_TYPE_KEYS => {
  return CONTENT_TYPE_LIST.some((postType) => postType.type === type);
};

const isUrlString = (str?: string | null) => {
  return /^(http|https):\/\//.test(str || '');
};

export class ContentBuilder {
  public collections: CollectionData[];

  constructor(collections: AllCollectionEntry[]) {
    this.collections = collections
      .map((collection) => this.parseCollection(collection))
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  }

  static async ALL() {
    const collections = await getAllCollection();

    return new ContentBuilder(collections);
  }

  static async series(series: string) {
    const collections = await getAllCollection();

    return new ContentBuilder(collections).collections.filter((collection) => collection.data?.series === series);
  }

  static async collection(name: string) {
    const collections = isCollectionType(name) ? await getCollection(name) : await getAllCollection();

    return new ContentBuilder(collections);
  }

  static async getByTag(tag: string) {
    const collections = await getAllCollection();

    return new ContentBuilder(collections).collections.filter((collection) => collection.data.tags?.includes(tag));
  }

  static async getAdjacentType(post: AllCollectionEntry) {
    const collections = [...(await ContentBuilder.collection(post.data.type))];

    const index = collections.findIndex((collection) => collection.id === post.id);

    return {
      prev: collections[index + 1],
      next: collections[index - 1]
    };
  }

  static async getAllTags() {
    const collections = await getAllCollection();

    return collections
      .flatMap((collection) => collection.data.tags)
      .filter((tag) => tag)
      .reduce<string[]>((ac, tag) => {
        const tagSet = new Set(ac);

        if (!tag) return Array.from(tagSet);

        tagSet.add(tag);
        return Array.from(tagSet);
      }, []);
  }

  listByYear() {
    return this.collections.reduce(
      (acc, collection) => {
        const year = collection.data.date.getFullYear();

        if (!acc[year]) {
          acc[year] = [];
        }

        acc[year].push(collection);

        return acc;
      },
      {} as Record<number, CollectionData[]>
    );
  }

  sort(type: 'asc' | 'desc') {
    this.collections = this.collections.sort((a, b) =>
      type === 'asc' ? a.data.date.getTime() - b.data.date.getTime() : b.data.date.getTime() - a.data.date.getTime()
    );

    return this;
  }

  list() {
    return [...this];
  }

  parseCollection(collection: AllCollectionEntry) {
    return {
      ...collection,
      data: {
        ...collection.data,
        date: new Date(collection.data.date),
        description: collection.data.description || collection.body?.substring(0, 100),
        image: collection.data.image || new URL(`/og/${collection.data.slug}.png`, SITE.domain).toString()
      },
      iconType: isUrlString(collection.data.icon) ? 'url' : 'string',
      href: `/${SITE.HREF.POST}/${collection.data.slug}`
    };
  }

  *[Symbol.iterator]() {
    for (const collection of this.collections) {
      yield collection;
    }
  }
}
