import Link from 'next/link'
import { Article } from '@/types'
import { getCategoryBySlug } from '@/lib/categories'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const category = getCategoryBySlug(article.category)

  return (
    <Link href={`/${article.slug}`} className="group block">
      <article className="glass-card-hover p-6 h-full flex flex-col">
        {/* Kategori badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
          >
            <span>{category?.icon}</span>
            {category?.name}
          </span>
          <span className="text-xs text-text-secondary font-mono">{article.readTime}</span>
        </div>

        {/* Başlık */}
        <h3 className="font-display text-lg font-semibold text-text-primary group-hover:text-accent-gold transition-colors mb-2 line-clamp-2">
          {article.title}
        </h3>

        {/* Açıklama */}
        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3 flex-1">
          {article.description}
        </p>

        {/* Alt bilgi */}
        <div className="flex items-center justify-between text-xs text-text-secondary pt-3 border-t border-border/50">
          <span>{article.author}</span>
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        </div>
      </article>
    </Link>
  )
}
