import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://poolytech.com';
const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

interface ArticleFrontmatter {
  slug: string;
  date: string;
  category: string;
}

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq: string;
  priority: number;
}

function getArticles(): ArticleFrontmatter[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.mdx'));

  return files.map((file) => {
    const filePath = path.join(ARTICLES_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);

    return {
      slug: data.slug ?? file.replace(/\.mdx$/, ''),
      date: data.date ?? new Date().toISOString().split('T')[0],
      category: data.category ?? 'genel',
    } as ArticleFrontmatter;
  });
}

function getUniqueCategories(articles: ArticleFrontmatter[]): string[] {
  return [...new Set(articles.map((a) => a.category))];
}

function buildEntries(articles: ArticleFrontmatter[]): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  // Ana sayfa
  entries.push({
    url: BASE_URL,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0,
  });

  // Kategori sayfaları
  const categories = getUniqueCategories(articles);
  for (const category of categories) {
    entries.push({
      url: `${BASE_URL}/kategori/${category}`,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // Makale sayfaları
  for (const article of articles) {
    entries.push({
      url: `${BASE_URL}/makaleler/${article.slug}`,
      lastmod: article.date,
      changefreq: 'weekly',
      priority: 0.6,
    });
  }

  return entries;
}

function renderXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const lastmodTag = entry.lastmod
        ? `\n    <lastmod>${entry.lastmod}</lastmod>`
        : '';
      return `  <url>
    <loc>${entry.url}</loc>${lastmodTag}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function main() {
  const articles = getArticles();
  const entries = buildEntries(articles);
  const xml = renderXml(entries);

  fs.writeFileSync(OUTPUT_PATH, xml, 'utf-8');

  console.log(`Sitemap olusturuldu: ${OUTPUT_PATH}`);
  console.log(`  - 1 ana sayfa`);
  console.log(`  - ${getUniqueCategories(articles).length} kategori sayfasi`);
  console.log(`  - ${articles.length} makale sayfasi`);
  console.log(`  - Toplam: ${entries.length} URL`);
}

main();
