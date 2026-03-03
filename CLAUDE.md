# CLAUDE.md — Poolytech.com Proje Konfigürasyonu

## Proje
Casino taktikleri ve strateji rehberleri sitesi. Türkçe. Domain: poolytech.com

## Teknoloji
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MDX (makale içerikleri)
- Vercel deployment hedefi

## Dizin Yapısı
- `src/app/` — Next.js App Router sayfaları
- `src/components/` — React componentleri
- `src/lib/` — Utility fonksiyonları
- `src/types/` — TypeScript tip tanımları
- `content/articles/` — MDX makale dosyaları
- `public/` — Statik dosyalar
- `agents/` — Multi-agent system prompt dosyaları
- `scripts/` — Build/generation scriptleri

## Kurallar
- Tüm UI metinleri Türkçe
- Koyu tema (casino luxury aesthetic)
- Her component fully typed (TypeScript strict)
- Tailwind — inline style KULLANMA
- Component dosya adları PascalCase
- Makale dosya adları kebab-case
- Her makalede frontmatter zorunlu
- SEO: Her sayfada unique title + description
- Accessibility: ARIA labels Türkçe
- Mobile-first responsive tasarım

## Agent Kullanımı
Bu proje multi-agent mimarisi ile geliştirilir:
1. **Opus** (`agents/AGENT-OPUS-ARCHITECT.md`): Altyapı, tasarım, componentler
2. **Sonnet Writer** (`agents/AGENT-SONNET-WRITER.md`): Makale içerikleri
3. **Sonnet SEO** (`agents/AGENT-SONNET-SEO.md`): SEO optimizasyonu

## Komutlar
```bash
npm run dev          # Development server
npm run build        # Production build
npm run generate:sitemap  # Sitemap üret
npm run generate:rss      # RSS feed üret
```
