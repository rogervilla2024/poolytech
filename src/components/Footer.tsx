import Link from 'next/link'
import { categories } from '@/lib/categories'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Açıklama */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎰</span>
              <span className="font-display text-lg font-bold gold-gradient">POOLYTECH</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Casino oyunları hakkında kapsamlı strateji rehberleri ve matematiksel analizler.
            </p>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="font-display font-semibold text-text-primary mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className="text-sm text-text-secondary hover:text-accent-gold transition-colors flex items-center gap-2"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="font-display font-semibold text-text-primary mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-text-secondary hover:text-accent-gold transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-sm text-text-secondary hover:text-accent-gold transition-colors">
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>

          {/* Yasal */}
          <div>
            <h3 className="font-display font-semibold text-text-primary mb-4">Yasal</h3>
            <div className="text-xs text-text-secondary leading-relaxed space-y-2">
              <p>
                Bu site yalnızca eğitim amaçlıdır. Kumar bağımlılık yapabilir.
              </p>
              <p>
                Lütfen sorumlu oynayın ve kaybetmeyi göze alabileceğinizden fazlasını riske atmayın.
              </p>
              <p className="text-accent-ruby">18+ | Sorumlu Oyun</p>
            </div>
          </div>
        </div>

        {/* Alt çizgi */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Poolytech. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4 text-text-secondary">
            <span className="text-lg opacity-30">♠️</span>
            <span className="text-lg opacity-30">♥️</span>
            <span className="text-lg opacity-30">♦️</span>
            <span className="text-lg opacity-30">♣️</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
