import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Dekoratif arka plan */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-10 text-6xl opacity-5 animate-float">♠️</div>
        <div className="absolute top-20 right-20 text-7xl opacity-5 animate-float" style={{ animationDelay: '0.5s' }}>♥️</div>
        <div className="absolute bottom-10 left-1/4 text-5xl opacity-5 animate-float" style={{ animationDelay: '1s' }}>♦️</div>
        <div className="absolute bottom-20 right-1/3 text-6xl opacity-5 animate-float" style={{ animationDelay: '1.5s' }}>♣️</div>
        {/* Altın gradient arka plan */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Casino Stratejilerinde{' '}
          <span className="gold-gradient italic">Uzmanlaş</span>
        </h1>
        <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          Matematiksel analizler, kanıtlanmış stratejiler ve uzman tavsiyeleri ile
          casino oyunlarını derinlemesine öğrenin.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/kategori/blackjack" className="btn-primary inline-flex items-center gap-2">
            <span>♠️</span>
            Stratejileri Keşfet
          </Link>
          <Link href="/hakkimizda" className="btn-secondary inline-flex items-center gap-2">
            Nasıl Çalışır?
          </Link>
        </div>

        {/* İstatistik çubuğu */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="glass-card p-4">
            <div className="font-mono text-2xl font-bold text-accent-gold">30+</div>
            <div className="text-xs text-text-secondary mt-1">Rehber</div>
          </div>
          <div className="glass-card p-4">
            <div className="font-mono text-2xl font-bold text-accent-gold">6</div>
            <div className="text-xs text-text-secondary mt-1">Kategori</div>
          </div>
          <div className="glass-card p-4">
            <div className="font-mono text-2xl font-bold text-accent-gold">%100</div>
            <div className="text-xs text-text-secondary mt-1">Ücretsiz</div>
          </div>
        </div>
      </div>
    </section>
  )
}
