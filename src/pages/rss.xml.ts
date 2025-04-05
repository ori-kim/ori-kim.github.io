import rss from '@astrojs/rss';

import { SITE } from '@/consts';
import { ContentBuilder } from '@/service/mdx';

type Context = {
  site: string;
};

export async function GET(context: Context) {
  const items = (await ContentBuilder.ALL()).list();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description || '',
      pubDate: item.data.date,
      link: item.href
    }))
  });
}
