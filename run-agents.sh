#!/bin/bash
# ============================================
# POOLYTECH.COM — Multi-Agent Otomasyon
# Claude CLI ile aralıksız çalıştırma scripti
# ============================================

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
AGENTS_DIR="$PROJECT_DIR/agents"

echo "🎰 ═══════════════════════════════════════════"
echo "   POOLYTECH.COM Multi-Agent Build System"
echo "═══════════════════════════════════════════════"
echo ""

# ─────────────────────────────────────────────
# FAZA 1: OPUS — Altyapı & Tasarım
# ─────────────────────────────────────────────
echo "🏗️  FAZA 1: Opus Architect başlatılıyor..."
echo "   Model: claude-opus-4-6"
echo "   Görev: Proje iskeleti + tüm componentler"
echo "─────────────────────────────────────────────"

claude --model claude-opus-4-6 \
  --print \
  --system-prompt "$(cat $AGENTS_DIR/AGENT-OPUS-ARCHITECT.md)" \
  --allowedTools "Bash,Write,Read,Edit" \
  "Sen poolytech.com projesinin baş mimarısın. CLAUDE.md ve MASTER-PLAN.md dosyalarını oku ve FAZA 1'deki TÜM adımları (1-18) sırayla tamamla. Her dosyayı eksiksiz oluştur. Çalışma dizini: $PROJECT_DIR. Başla."

echo ""
echo "✅ FAZA 1 tamamlandı!"
echo ""

# ─────────────────────────────────────────────
# FAZA 2: SONNET — İçerik Üretimi (6 Batch)
# ─────────────────────────────────────────────
echo "📝 FAZA 2: Sonnet Writer başlatılıyor..."
echo "   Model: claude-sonnet-4-5-20250929"
echo "   Görev: 30 makale (6 batch x 5)"
echo "─────────────────────────────────────────────"

BATCHES=(
  "Batch 1: Blackjack kategorisinde 5 makale yaz. Sluglar: blackjack-temel-strateji, blackjack-kart-sayma, blackjack-soft-hand, blackjack-sigorta-bahsi, blackjack-masa-secimi"
  "Batch 2: Rulet kategorisinde 5 makale yaz. Sluglar: rulet-temel-rehber, rulet-martingale, rulet-fibonacci, rulet-avrupa-amerika, rulet-dagilim-analizi"
  "Batch 3: Poker kategorisinde 5 makale yaz. Sluglar: poker-texas-holdem-rehber, poker-pozisyon-avantaji, poker-blof-teknikleri, poker-pot-odds, poker-turnuva-strateji"
  "Batch 4: Bakara kategorisinde 5 makale yaz. Sluglar: bakara-temel-rehber, bakara-banker-player, bakara-yol-takibi, bakara-komisyon, bakara-mini-midi"
  "Batch 5: Slot kategorisinde 5 makale yaz. Sluglar: slot-rtp-rehberi, slot-volatilite, slot-bonus-turleri, slot-makinesi-secimi, slot-progressive-jackpot"
  "Batch 6: Genel strateji kategorisinde 5 makale yaz. Sluglar: bankroll-yonetimi, casino-matematik, sorumlu-oyun, canli-casino-rehber, casino-bonuslari"
)

BATCH_NUM=0
for BATCH_PROMPT in "${BATCHES[@]}"; do
  BATCH_NUM=$((BATCH_NUM + 1))
  echo ""
  echo "📄 Batch $BATCH_NUM / 6 yazılıyor..."

  claude --model claude-sonnet-4-5-20250929 \
    --print \
    --system-prompt "$(cat $AGENTS_DIR/AGENT-SONNET-WRITER.md)" \
    --allowedTools "Bash,Write,Read" \
    "$BATCH_PROMPT. Dosyaları $PROJECT_DIR/content/articles/ dizinine kaydet. Her makale 1500-2500 kelime, MDX formatında, frontmatter dahil. Hemen başla, tüm 5 makaleyi bu session'da yaz."

  echo "✅ Batch $BATCH_NUM tamamlandı!"
done

echo ""
echo "✅ FAZA 2 tamamlandı! 30 makale yazıldı."
echo ""

# ─────────────────────────────────────────────
# FAZA 3: SONNET — SEO Optimizasyonu
# ─────────────────────────────────────────────
echo "🔍 FAZA 3: Sonnet SEO başlatılıyor..."
echo "   Model: claude-sonnet-4-5-20250929"
echo "   Görev: SEO optimizasyonu"
echo "─────────────────────────────────────────────"

claude --model claude-sonnet-4-5-20250929 \
  --print \
  --system-prompt "$(cat $AGENTS_DIR/AGENT-SONNET-SEO.md)" \
  --allowedTools "Bash,Write,Read,Edit" \
  "SEO optimizasyonunu başlat. Çalışma dizini: $PROJECT_DIR. Görevlerin: 1) content/keyword-map.json oluştur 2) content/internal-links.json oluştur 3) scripts/generate-sitemap.ts oluştur 4) scripts/generate-rss.ts oluştur 5) public/robots.txt oluştur 6) Her makalenin frontmatter'ını kontrol et ve gerekiyorsa düzelt. Hemen başla."

echo ""
echo "✅ FAZA 3 tamamlandı!"
echo ""

# ─────────────────────────────────────────────
# FAZA 4: OPUS — Final Build & QA
# ─────────────────────────────────────────────
echo "🧪 FAZA 4: Opus Final QA başlatılıyor..."
echo "─────────────────────────────────────────────"

claude --model claude-opus-4-6 \
  --print \
  --system-prompt "$(cat $AGENTS_DIR/AGENT-OPUS-ARCHITECT.md)" \
  --allowedTools "Bash,Write,Read,Edit" \
  "Final QA zamanı. Çalışma dizini: $PROJECT_DIR. Şunları yap: 1) npm install çalıştır 2) npm run build ile production build dene 3) Hataları düzelt 4) Tüm sayfaların çalıştığını doğrula 5) Eksik import veya tip hatalarını gider. Build başarılı olana kadar iterasyon yap."

echo ""
echo "═══════════════════════════════════════════════"
echo "🎰 POOLYTECH.COM BUILD TAMAMLANDI!"
echo "═══════════════════════════════════════════════"
echo ""
echo "Sonraki adımlar:"
echo "  cd $PROJECT_DIR && npm run dev"
echo "  Vercel'e deploy: vercel --prod"
echo ""
