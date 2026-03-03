import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllArticles, getArticleBySlug, getRelatedArticles } from '@/lib/articles'
import { getCategoryBySlug } from '@/lib/categories'
import { generateArticleSchema } from '@/components/SEOHead'
import ArticleCard from '@/components/ArticleCard'
import NewsletterForm from '@/components/NewsletterForm'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
    },
    alternates: {
      canonical: `https://poolytech.com/${article.slug}`,
    },
  }
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const category = getCategoryBySlug(article.category)
  const relatedArticles = getRelatedArticles(params.slug, 3)

  const schema = generateArticleSchema({
    title: article.title,
    description: article.description,
    canonical: `https://poolytech.com/${article.slug}`,
    article: {
      publishedTime: article.date,
      modifiedTime: article.date,
      author: article.author,
      tags: article.tags,
    },
  })

  // MDX içeriğini basit HTML'e çevirelim (basit markdown rendering)
  const htmlContent = renderMarkdown(article.content)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent-gold transition-colors">
            Ana Sayfa
          </Link>
          <span>/</span>
          <Link
            href={`/kategori/${article.category}`}
            className="hover:text-accent-gold transition-colors"
          >
            {category?.name}
          </Link>
          <span>/</span>
          <span className="text-text-primary">{article.title}</span>
        </nav>

        {/* Kategori badge + meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
          >
            <span>{category?.icon}</span>
            {category?.name}
          </span>
          <span className="text-xs text-text-secondary font-mono">{article.readTime}</span>
          <time className="text-xs text-text-secondary" dateTime={article.date}>
            {new Date(article.date).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        </div>

        {/* Başlık */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
          {article.title}
        </h1>

        {/* Açıklama */}
        <p className="text-lg text-text-secondary leading-relaxed mb-8 border-l-4 border-accent-gold pl-4">
          {article.description}
        </p>

        {/* Etiketler */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-bg-elevated text-text-secondary"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* İçerik */}
        <div
          className="prose prose-invert prose-lg max-w-none mdx-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Paylaş */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-display font-semibold text-text-primary mb-4">Bu Rehberi Paylaşın</h3>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://poolytech.com/${article.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm px-4 py-2"
              aria-label="Twitter'da paylaş"
            >
              Twitter
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${article.title} https://poolytech.com/${article.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm px-4 py-2"
              aria-label="WhatsApp'ta paylaş"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </article>

      {/* İlgili Makaleler */}
      {relatedArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-display text-2xl font-bold mb-6">
            İlgili <span className="gold-gradient italic">Rehberler</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterForm />
      </div>
    </>
  )
}

/** Basit markdown → HTML dönüştürücü (MDX içerikleri için) */
function renderMarkdown(md: string): string {
  let html = md
    // Başlıklar
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Linkler
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Sırasız liste
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Sıralı liste
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Paragraflar
    .replace(/\n\n/g, '</p><p>')

  // Tablo desteği
  html = html.replace(
    /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g,
    (_match, headerRow: string, bodyRows: string) => {
      const headers = headerRow.split('|').filter((s: string) => s.trim())
      const rows = bodyRows.trim().split('\n')
      let table = '<table><thead><tr>'
      headers.forEach((h: string) => { table += `<th>${h.trim()}</th>` })
      table += '</tr></thead><tbody>'
      rows.forEach((row: string) => {
        const cells = row.split('|').filter((s: string) => s.trim())
        table += '<tr>'
        cells.forEach((c: string) => { table += `<td>${c.trim()}</td>` })
        table += '</tr>'
      })
      table += '</tbody></table>'
      return table
    }
  )

  return `<p>${html}</p>`
}
