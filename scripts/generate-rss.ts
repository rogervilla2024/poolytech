import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://poolytech.com';
const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'rss.xml');
const MAX_ITEMS = 20;

interface ArticleData {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

function getArticles(): ArticleData[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.mdx'));

  const articles: ArticleData[] = files.map((file) => {
    const filePath = path.join(ARTICLES_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);

    return {
      slug: (data.slug as string) ?? file.replace(/\.mdx$/, ''),
      title: (data.title as string) ?? 'Basliksiz Makale',
      description: (data.description as string) ?? '',
      date: (data.date as string) ?? new Date().toISOString().split('T')[0],
      category: (data.category as string) ?? 'genel',
    };
  });

  // Tarihe gore sirala (en yeni once), son MAX_ITEMS makaleyi al
  return articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_ITEMS);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822Date(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

function buildRssXml(articles: ArticleData[]): string {
  const buildDate = new Date().toUTCString();

  const items = articles
    .map((article) => {
      const link = `${BASE_URL}/makaleler/${article.slug}`;
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${link}</link>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${toRfc822Date(article.date)}</pubDate>
      <guid isPermaLink="true">${link}</guid>
      <category>${escapeXml(article.category)}</category>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Poolytech — Casino Taktikleri ve Strateji Rehberleri</title>
    <link>${BASE_URL}</link>
    <description>Blackjack, rulet, poker, bakara ve slot oyunlari icin stratejiler, taktikler ve uzman rehberler.</description>
    <language>tr</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

function main() {
  const articles = getArticles();
  const xml = buildRssXml(articles);

  fs.writeFileSync(OUTPUT_PATH, xml, 'utf-8');

  console.log(`RSS feed olusturuldu: ${OUTPUT_PATH}`);
  console.log(`  - ${articles.length} makale eklendi (en yeni ${MAX_ITEMS} makale)`);
  if (articles.length > 0) {
    console.log(`  - En yeni makale: ${articles[0].title} (${articles[0].date})`);
    console.log(`  - En eski makale: ${articles[articles.length - 1].title} (${articles[articles.length - 1].date})`);
  }
}

main();
