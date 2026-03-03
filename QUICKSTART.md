# 🚀 HIZLI BAŞLANGIÇ

## Tek Komutla Her Şeyi Çalıştır
```bash
cd poolytech
./run-agents.sh
```

## Manuel Çalıştırma (Agent Agent)

### 1️⃣ Opus — Altyapı
```bash
claude --model claude-opus-4-6 \
  --system-prompt "$(cat agents/AGENT-OPUS-ARCHITECT.md)" \
  --allowedTools "Bash,Write,Read,Edit" \
  "CLAUDE.md ve MASTER-PLAN.md oku, FAZA 1 adımlarını tamamla."
```

### 2️⃣ Sonnet — Makale Yaz (Batch Batch)
```bash
# Batch 1
claude --model claude-sonnet-4-5-20250929 \
  --system-prompt "$(cat agents/AGENT-SONNET-WRITER.md)" \
  --allowedTools "Bash,Write,Read" \
  "Batch 1: Blackjack 5 makale yaz, content/articles/ dizinine kaydet."

# Batch 2-6 için aynı pattern, batch numarasını değiştir
```

### 3️⃣ Sonnet — SEO
```bash
claude --model claude-sonnet-4-5-20250929 \
  --system-prompt "$(cat agents/AGENT-SONNET-SEO.md)" \
  --allowedTools "Bash,Write,Read,Edit" \
  "Tüm SEO görevlerini tamamla."
```

### 4️⃣ Opus — Final Build
```bash
claude --model claude-opus-4-6 \
  --system-prompt "$(cat agents/AGENT-OPUS-ARCHITECT.md)" \
  --allowedTools "Bash,Write,Read,Edit" \
  "npm install && npm run build — hataları düzelt."
```

## Dosya Yapısı
```
poolytech/
├── MASTER-PLAN.md          ← Detaylı yol haritası
├── CLAUDE.md               ← Proje kuralları
├── run-agents.sh           ← Otomasyon scripti
├── agents/
│   ├── AGENT-OPUS-ARCHITECT.md
│   ├── AGENT-SONNET-WRITER.md
│   └── AGENT-SONNET-SEO.md
└── (src/, content/ vb. Opus tarafından oluşturulacak)
```

## Maliyet Tahmini
| Agent | Model | Tahmini Token | Tahmini Maliyet |
|-------|-------|--------------|-----------------|
| Opus Architect | opus | ~80K output | ~$1.20 |
| Sonnet Writer (x6) | sonnet | ~180K output | ~$2.70 |
| Sonnet SEO | sonnet | ~20K output | ~$0.30 |
| Opus QA | opus | ~15K output | ~$0.23 |
| **TOPLAM** | | **~295K** | **~$4.43** |
