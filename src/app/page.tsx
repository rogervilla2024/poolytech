import { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import ArticleCard from '@/components/ArticleCard'
import CategoryNav from '@/components/CategoryNav'
import OddsCalculator from '@/components/OddsCalculator'
import StrategyTable from '@/components/StrategyTable'
import NewsletterForm from '@/components/NewsletterForm'
import SEOHead, { generateWebsiteSchema } from '@/components/SEOHead'
import { getAllArticles } from '@/lib/articles'
import { categories } from '@/lib/categories'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Poolytech — Casino Taktikleri ve Strateji Rehberleri',
  description:
    'Casino oyunları hakkında kapsamlı strateji rehberleri. Blackjack, rulet, poker, bakara ve slot taktikleri. Matematiksel analizler ve uzman tavsiyeleri.',
}

export default function HomePage() {
  const articles = getAllArticles()
  const latestArticles = articles.slice(0, 6)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteSchema()) }}
      />

      {/* Hero */}
      <HeroSection />

      {/* Kategori Navigasyon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryNav />
      </section>

      {/* Son Makaleler */}
      {latestArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
            Son <span className="gold-gradient italic">Rehberler</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Kategoriler Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-center">
          Tüm <span className="gold-gradient italic">Kategoriler</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategori/${cat.slug}`}
              className="glass-card-hover p-6 flex items-center gap-4"
            >
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <h3 className="font-display font-semibold text-text-primary">{cat.name}</h3>
                <p className="text-sm text-text-secondary">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* İnteraktif Araçlar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-center">
          İnteraktif <span className="gold-gradient italic">Araçlar</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <OddsCalculator />
          <StrategyTable />
        </div>
      </section>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterForm />
      </div>
    </>
  )
}
