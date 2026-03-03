'use client'

import Link from 'next/link'
import { categories } from '@/lib/categories'
import { CategorySlug } from '@/types'

interface CategoryNavProps {
  activeCategory?: CategorySlug | 'all'
}

export default function CategoryNav({ activeCategory = 'all' }: CategoryNavProps) {
  return (
    <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide" aria-label="Kategori filtresi">
      <Link
        href="/"
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
          activeCategory === 'all'
            ? 'bg-accent-gold text-bg-primary'
            : 'bg-bg-elevated text-text-secondary hover:text-text-primary hover:bg-bg-elevated/80'
        }`}
      >
        Tümü
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/kategori/${cat.slug}`}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            activeCategory === cat.slug
              ? 'text-white'
              : 'bg-bg-elevated text-text-secondary hover:text-text-primary hover:bg-bg-elevated/80'
          }`}
          style={activeCategory === cat.slug ? { backgroundColor: cat.color } : undefined}
        >
          <span>{cat.icon}</span>
          {cat.name}
        </Link>
      ))}
    </nav>
  )
}
