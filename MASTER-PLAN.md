# 🎰 POOLYTECH.COM — Multi-Agent Üretim Planı

## Domain: poolytech.com
## Dil: Türkçe
## Konu: Casino Taktikleri, Strateji Rehberleri, Oyun Analizi
## Mimari: Next.js 14 (App Router) + MDX + Tailwind CSS

---

## 🏗️ MİMARİ ÖZET

```
poolytech/
├── MASTER-PLAN.md              ← Bu dosya (ana yol haritası)
├── CLAUDE.md                   ← Claude CLI ana config
├── agents/
│   ├── AGENT-OPUS-ARCHITECT.md ← Opus: Mimari, tasarım, altyapı
│   ├── AGENT-SONNET-WRITER.md  ← Sonnet: İçerik üretimi (düşük token)
│   └── AGENT-SONNET-SEO.md     ← Sonnet: SEO optimizasyonu
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout (Opus)
│   │   ├── page.tsx            ← Ana sayfa (Opus)
│   │   ├── globals.css         ← Global stiller (Opus)
│   │   ├── [slug]/
│   │   │   └── page.tsx        ← Makale detay sayfası
│   │   ├── kategori/
│   │   │   └── [cat]/
│   │   │       └── page.tsx    ← Kategori sayfaları
│   │   └── hakkimizda/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Header.tsx          ← (Opus)
│   │   ├── Footer.tsx          ← (Opus)
│   │   ├── HeroSection.tsx     ← (Opus)
│   │   ├── ArticleCard.tsx     ← (Opus)
│   │   ├── CategoryNav.tsx     ← (Opus)
│   │   ├── OddsCalculator.tsx  ← (Opus) interaktif araç
│   │   ├── StrategyTable.tsx   ← (Opus) strateji tablosu
│   │   ├── NewsletterForm.tsx  ← (Opus)
│   │   └── SEOHead.tsx         ← (Opus)
│   ├── lib/
│   │   ├── articles.ts         ← Makale yükleyici
│   │   └── categories.ts       ← Kategori tanımları
│   └── types/
│       └── index.ts            ← TypeScript tipleri
├── content/
│   ├── articles/               ← Sonnet tarafından yazılacak MDX makaleler
│   │   ├── blackjack-temel-strateji.mdx
│   │   ├── rulet-dagilim-analizi.mdx
│   │   ├── poker-pozisyon-avantaji.mdx
│   │   ├── bakara-taktikleri.mdx
│   │   ├── slot-rtp-rehberi.mdx
│   │   └── ... (50+ makale)
│   └── categories.json
├── public/
│   ├── og-image.png
│   └── favicon.ico
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── scripts/
    ├── generate-sitemap.ts
    └── generate-rss.ts
```

---

## 🤖 AGENT TANIMLARI

### AGENT 1: OPUS — Mimar & Tasarımcı
**Model:** claude-opus-4-6
**Rol:** Altyapı kurulumu, component tasarımı, layout, stil, interaktif araçlar
**Sorumluluklar:**
- Next.js proje iskeleti
- Tüm React componentleri
- Tailwind tema & tasarım sistemi
- Interaktif araçlar (odds calculator, strateji tablosu)
- SEO altyapısı (meta, OG, schema.org)
- Responsive tasarım
- Performance optimizasyonu

**Token Kullanımı:** Yüksek (karmaşık kod üretimi)
**Öncelik:** İlk çalışır, altyapıyı kurar

### AGENT 2: SONNET — İçerik Yazarı
**Model:** claude-sonnet-4-5-20250929
**Rol:** Türkçe makale üretimi, MDX formatında
**Sorumluluklar:**
- 50+ makale üretimi (her biri 1500-2500 kelime)
- MDX frontmatter (title, description, category, date, author)
- Doğal Türkçe, SEO uyumlu başlıklar
- İç linkler (cross-linking)
- Tablo ve liste formatları
- Her makalede CTA (call-to-action)

**Token Kullanımı:** DÜŞÜK (Sonnet = maliyet-etkin)
**Öncelik:** Opus altyapıyı kurduktan sonra paralel çalışır

### AGENT 3: SONNET — SEO Uzmanı
**Model:** claude-sonnet-4-5-20250929
**Rol:** SEO optimizasyonu ve meta veri üretimi
**Sorumluluklar:**
- Her makale için meta title + description
- Schema.org JSON-LD (Article, FAQPage, HowTo)
- Internal linking stratejisi
- Sitemap.xml üretimi
- robots.txt
- Canonical URL'ler
- Anahtar kelime haritalama

**Token Kullanımı:** DÜŞÜK
**Öncelik:** Writer ile paralel veya sonrasında

---

## 📋 ÇALIŞMA SIRASI (Execution Order)

### FAZA 1 — Altyapı (Opus)
```
Adım 1.1: Proje iskeleti (next.config, package.json, tsconfig, tailwind)
Adım 1.2: Tip tanımları (types/index.ts)
Adım 1.3: Tema & global stiller (globals.css, tailwind.config)
Adım 1.4: Layout + Header + Footer
Adım 1.5: Ana sayfa (HeroSection, ArticleCard grid)
Adım 1.6: Makale detay sayfası ([slug]/page.tsx)
Adım 1.7: Kategori sayfası
Adım 1.8: İnteraktif araçlar (OddsCalculator, StrategyTable)
Adım 1.9: SEO componentleri (SEOHead, schema.org)
Adım 1.10: Newsletter form
```

### FAZA 2 — İçerik (Sonnet Writer) — Opus bitince başlar
```
Batch 1: Blackjack makaleleri (5 adet)
Batch 2: Rulet makaleleri (5 adet)
Batch 3: Poker makaleleri (5 adet)
Batch 4: Bakara makaleleri (5 adet)
Batch 5: Slot makaleleri (5 adet)
Batch 6: Genel strateji makaleleri (5 adet)
Batch 7-10: Genişleme (20+ adet)
```

### FAZA 3 — SEO Polish (Sonnet SEO) — Writer ile paralel
```
Adım 3.1: Anahtar kelime haritası oluştur
Adım 3.2: Her makaleye schema.org ekle
Adım 3.3: Internal linking matrisi
Adım 3.4: Sitemap + RSS
Adım 3.5: robots.txt + canonical
```

---

## 📂 KATEGORİLER

| Slug | Kategori Adı | Renk Kodu | İkon |
|------|-------------|-----------|------|
| blackjack | Blackjack Taktikleri | #1B5E20 | ♠️ |
| rulet | Rulet Stratejileri | #B71C1C | 🔴 |
| poker | Poker Rehberi | #0D47A1 | ♦️ |
| bakara | Bakara Analizleri | #4A148C | 👑 |
| slot | Slot Makineleri | #E65100 | 🎰 |
| genel | Genel Strateji | #263238 | 📊 |

---

## 🎨 TASARIM SİSTEMİ (Opus Kararları)

### Renk Paleti
```css
--bg-primary: #0A0A0F;        /* Koyu arka plan */
--bg-secondary: #12121A;      /* Kart arka plan */
--bg-elevated: #1A1A2E;       /* Yükseltilmiş yüzey */
--accent-gold: #D4AF37;       /* Altın vurgu */
--accent-emerald: #00C853;    /* Yeşil CTA */
--accent-ruby: #E53935;       /* Kırmızı vurgu */
--text-primary: #F5F5F5;      /* Ana metin */
--text-secondary: #9E9E9E;    /* İkincil metin */
--border: #2A2A3E;            /* Kenarlık */
```

### Tipografi
- Display: "Playfair Display" (başlıklar, lüks his)
- Body: "DM Sans" (okunabilir, modern)
- Mono: "JetBrains Mono" (tablolar, sayılar)

### Tasarım Dili
- Casino lüks estetiği: koyu tema, altın aksan
- Cam-efekti (glassmorphism) kartlar
- Subtle parıltı animasyonları
- Yeşil masası texture ipuçları
- Şık tipografi hiyerarşisi

---

## 🔑 İÇERİK STRATEJİSİ

### Makale Şablonu (Sonnet için)
```mdx
---
title: "Başlık — SEO Uyumlu"
description: "155 karakterlik meta description"
category: "blackjack"
slug: "blackjack-temel-strateji"
date: "2026-03-03"
author: "Poolytech Editör"
readTime: "8 dk"
tags: ["blackjack", "temel strateji", "kart sayma"]
---

## Giriş
[Hook paragraf — okuyucuyu yakala]

## Ana Bölüm 1
[Detaylı açıklama + tablo/liste]

## Ana Bölüm 2
[Strateji detayları]

## Pratik İpuçları
[Numaralı liste]

## Sık Sorulan Sorular
[FAQ formatında — schema.org FAQPage için]

## Sonuç
[Özet + CTA]
```

### Hedef Anahtar Kelimeler (İlk 30)
1. casino taktikleri
2. blackjack strateji
3. rulet kazanma yolları
4. poker taktikleri
5. bakara nasıl oynanır
6. slot RTP nedir
7. blackjack kart sayma
8. rulet sistemleri
9. texas holdem strateji
10. casino oyun rehberi
11. martingale sistemi
12. blackjack temel strateji tablosu
13. canlı casino taktikleri
14. poker pozisyon avantajı
15. bakara banker mi player mı
16. slot makinesi seçimi
17. casino bankroll yönetimi
18. rulet dağılım analizi
19. poker blöf teknikleri
20. online casino rehberi
21. blackjack sigorta bahsi
22. rulet düzen bahisleri
23. poker pot odds hesaplama
24. casino matematik avantajı
25. slot volatilite rehberi
26. blackjack soft hand strateji
27. rulet fibonacci sistemi
28. poker turnuva stratejisi
29. bakara yol takibi
30. casino para yönetimi

---

## 🖥️ CLAUDE CLI KOMUTLARI

### Opus Agent — Altyapı Kurulumu
```bash
claude --model claude-opus-4-6 \
  --system-prompt "$(cat agents/AGENT-OPUS-ARCHITECT.md)" \
  "FAZA 1'i başlat. Tüm adımları sırayla tamamla. Her dosyayı oluştur."
```

### Sonnet Agent — Makale Üretimi (Batch)
```bash
claude --model claude-sonnet-4-5-20250929 \
  --system-prompt "$(cat agents/AGENT-SONNET-WRITER.md)" \
  "Batch 1: Blackjack kategorisinde 5 makale yaz."
```

### Sonnet Agent — SEO
```bash
claude --model claude-sonnet-4-5-20250929 \
  --system-prompt "$(cat agents/AGENT-SONNET-SEO.md)" \
  "Tüm makalelerin SEO optimizasyonunu yap."
```

---

## ✅ KONTROL LİSTESİ

- [ ] Opus: Proje iskeleti kuruldu
- [ ] Opus: Tailwind tema + global stiller
- [ ] Opus: Header + Footer
- [ ] Opus: Ana sayfa
- [ ] Opus: Makale detay sayfası
- [ ] Opus: Kategori sayfası
- [ ] Opus: OddsCalculator
- [ ] Opus: StrategyTable
- [ ] Opus: SEO Head + Schema
- [ ] Sonnet: Batch 1 (Blackjack x5)
- [ ] Sonnet: Batch 2 (Rulet x5)
- [ ] Sonnet: Batch 3 (Poker x5)
- [ ] Sonnet: Batch 4 (Bakara x5)
- [ ] Sonnet: Batch 5 (Slot x5)
- [ ] Sonnet: Batch 6 (Genel x5)
- [ ] SEO: Anahtar kelime haritası
- [ ] SEO: Schema.org tüm makalelere
- [ ] SEO: Sitemap + RSS
- [ ] SEO: robots.txt
- [ ] Final: Build test
- [ ] Final: Lighthouse audit
