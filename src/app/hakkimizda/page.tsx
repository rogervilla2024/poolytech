import { Metadata } from 'next'
import Link from 'next/link'
import { categories } from '@/lib/categories'

export const metadata: Metadata = {
  title: 'Hakkımızda — Poolytech',
  description:
    'Poolytech, casino oyunları hakkında eğitici içerikler sunan bağımsız bir strateji platformudur.',
  alternates: {
    canonical: 'https://poolytech.com/hakkimizda',
  },
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-8">
        Hakkımızda
      </h1>

      <div className="prose prose-invert prose-lg max-w-none space-y-6">
        <p>
          <strong>Poolytech</strong>, casino oyunları hakkında matematiksel ve stratejik analizler sunan
          bağımsız bir eğitim platformudur. Amacımız, oyunculara bilinçli kararlar almaları için
          gerekli bilgiyi sağlamaktır.
        </p>

        <h2 className="font-display">Misyonumuz</h2>
        <p>
          Casino oyunlarındaki matematik, olasılık ve stratejiyi herkesin anlayabileceği bir dilde
          sunmak. Abartılı vaatler yerine, gerçek verilere dayalı analizler paylaşıyoruz.
        </p>

        <h2 className="font-display">Ne Bulacaksınız?</h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/kategori/${cat.slug}`} className="text-accent-gold hover:underline">
                {cat.icon} {cat.name}
              </Link>
              {' — '}{cat.description}
            </li>
          ))}
        </ul>

        <h2 className="font-display">Sorumluluk</h2>
        <p>
          Kumar bağımlılık yapabilir. Bu sitedeki içerikler tamamen eğitim amaçlıdır ve
          herhangi bir kazanç garantisi sunmaz. Lütfen sorumlu oynayın ve kaybetmeyi
          göze alabileceğinizden fazlasını riske atmayın.
        </p>
      </div>
    </div>
  )
}
