import { CONTENT_TYPE_LIST, SITE } from '@/consts';
import { type CollectionData, ContentBuilder } from '@/service/mdx';

export async function GET() {
  const posts = (await ContentBuilder.ALL()).list();

  const result = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE.domain}</loc></url>
  ${createPostTypeSitemap()}
  ${createPostSitemap({ posts })}
</urlset>
  `.trim();

  return new Response(result, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}

const createPostSitemap = ({ posts }: { posts: CollectionData[] }) => {
  return posts
    .sort((a, b) => ((a.data.updated ?? a.data.date) > (b.data.updated ?? b.data.date) ? -1 : 1))
    .map((post) => {
      const lastMod = (post.data.updated ?? post.data.date).toISOString();
      return `<url>
      <loc>${new URL(post.href, SITE.domain)}/</loc>
      <lastmod>${lastMod}</lastmod>
      </url>`;
    })
    .join('\n');
};

const createPostTypeSitemap = () =>
  CONTENT_TYPE_LIST.map(({ type }) => `<url><loc>${new URL(type, SITE.domain)}</loc></url>`).join('\n');
