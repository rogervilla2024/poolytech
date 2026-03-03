import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import CategoryNav from '@/components/CategoryNav'
import NewsletterForm from '@/components/NewsletterForm'
import { getArticlesByCategory } from '@/lib/articles'
import { categories, getCategoryBySlug, isValidCategory } from '@/lib/categories'
import { CategorySlug } from '@/types'

interface PageProps {
  params: { cat: string }
}

export function generateStaticParams() {
  return categories.map((cat) => ({ cat: cat.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.cat)
  if (!category) return {}

  return {
    title: `${category.name} — Poolytech`,
    description: `${category.name} hakkında kapsamlı rehberler ve stratejiler. ${category.description}`,
    alternates: {
      canonical: `https://poolytech.com/kategori/${category.slug}`,
    },
  }
}

export default function CategoryPage({ params }: PageProps) {
  if (!isValidCategory(params.cat)) notFound()

  const category = getCategoryBySlug(params.cat)!
  const articles = getArticlesByCategory(params.cat as CategorySlug)

  return (
    <>
      {/* Kategori Başlığı */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">{category.name}</h1>
            <p className="text-text-secondary mt-1">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Kategori Navigasyon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <CategoryNav activeCategory={params.cat as CategorySlug} />
      </section>

      {/* Makaleler */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-text-secondary text-lg">
              Bu kategoride henüz makale bulunmuyor.
            </p>
          </div>
        )}
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterForm />
      </div>
    </>
  )
}
