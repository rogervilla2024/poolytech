'use client'

import { useState } from 'react'
import Link from 'next/link'
import { categories } from '@/lib/categories'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl" aria-hidden="true">🎰</span>
            <span className="font-display text-xl font-bold gold-gradient">
              POOLYTECH
            </span>
          </Link>

          {/* Masaüstü navigasyon */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Ana navigasyon">
            <Link
              href="/"
              className="text-text-secondary hover:text-accent-gold transition-colors text-sm font-medium"
            >
              Ana Sayfa
            </Link>

            {/* Kategoriler Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCatOpen(!catOpen)}
                onBlur={() => setTimeout(() => setCatOpen(false), 150)}
                className="text-text-secondary hover:text-accent-gold transition-colors text-sm font-medium flex items-center gap-1"
                aria-expanded={catOpen}
                aria-haspopup="true"
              >
                Kategoriler
                <svg
                  className={`w-4 h-4 transition-transform ${catOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 glass-card p-2 animate-fadeIn">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/kategori/${cat.slug}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-bg-elevated transition-colors"
                      onClick={() => setCatOpen(false)}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-text-primary">{cat.name}</div>
                        <div className="text-xs text-text-secondary">{cat.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/hakkimizda"
              className="text-text-secondary hover:text-accent-gold transition-colors text-sm font-medium"
            >
              Hakkımızda
            </Link>
          </nav>

          {/* Mobil hamburger menü butonu */}
          <button
            className="md:hidden text-text-secondary hover:text-accent-gold"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-bg-primary/95 backdrop-blur-lg animate-slideUp" aria-label="Mobil navigasyon">
          <div className="px-4 py-4 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 text-text-secondary hover:text-accent-gold transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Ana Sayfa
            </Link>
            <div className="px-3 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Kategoriler
            </div>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                className="flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-accent-gold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
            <Link
              href="/hakkimizda"
              className="block px-3 py-2 text-text-secondary hover:text-accent-gold transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Hakkımızda
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
