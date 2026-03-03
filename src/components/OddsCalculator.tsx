'use client'

import { useState } from 'react'

type OddsFormat = 'decimal' | 'fractional' | 'american'

export default function OddsCalculator() {
  const [stake, setStake] = useState<string>('100')
  const [odds, setOdds] = useState<string>('2.50')
  const [format, setFormat] = useState<OddsFormat>('decimal')
  const [probability, setProbability] = useState<string>('40')

  const decimalOdds = (() => {
    const val = parseFloat(odds)
    if (isNaN(val)) return 0
    switch (format) {
      case 'decimal':
        return val
      case 'fractional': {
        const parts = odds.split('/')
        if (parts.length !== 2) return 0
        return parseFloat(parts[0]) / parseFloat(parts[1]) + 1
      }
      case 'american':
        return val > 0 ? val / 100 + 1 : 100 / Math.abs(val) + 1
      default:
        return 0
    }
  })()

  const stakeNum = parseFloat(stake) || 0
  const probNum = parseFloat(probability) || 0
  const potentialWin = stakeNum * decimalOdds
  const profit = potentialWin - stakeNum
  const impliedProb = decimalOdds > 0 ? (1 / decimalOdds) * 100 : 0
  const ev = (probNum / 100) * profit - ((100 - probNum) / 100) * stakeNum

  return (
    <section className="glass-card p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold mb-6">
        <span className="gold-gradient">Oran Hesaplayıcı</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Bahis miktarı */}
        <div>
          <label htmlFor="calc-stake" className="block text-sm text-text-secondary mb-1">
            Bahis Miktarı (₺)
          </label>
          <input
            id="calc-stake"
            type="number"
            min="0"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border text-text-primary
                       font-mono focus:outline-none focus:border-accent-gold/50 transition-colors"
          />
        </div>

        {/* Oran */}
        <div>
          <label htmlFor="calc-odds" className="block text-sm text-text-secondary mb-1">
            Oran
          </label>
          <input
            id="calc-odds"
            type="text"
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border text-text-primary
                       font-mono focus:outline-none focus:border-accent-gold/50 transition-colors"
          />
        </div>

        {/* Oran formatı */}
        <div>
          <label htmlFor="calc-format" className="block text-sm text-text-secondary mb-1">
            Oran Formatı
          </label>
          <select
            id="calc-format"
            value={format}
            onChange={(e) => setFormat(e.target.value as OddsFormat)}
            className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border text-text-primary
                       focus:outline-none focus:border-accent-gold/50 transition-colors"
          >
            <option value="decimal">Ondalık (2.50)</option>
            <option value="fractional">Kesirli (3/2)</option>
            <option value="american">Amerikan (+150)</option>
          </select>
        </div>

        {/* Gerçek olasılık */}
        <div>
          <label htmlFor="calc-prob" className="block text-sm text-text-secondary mb-1">
            Tahmini Olasılık (%)
          </label>
          <input
            id="calc-prob"
            type="number"
            min="0"
            max="100"
            value={probability}
            onChange={(e) => setProbability(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border text-text-primary
                       font-mono focus:outline-none focus:border-accent-gold/50 transition-colors"
          />
        </div>
      </div>

      {/* Sonuçlar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-bg-primary rounded-lg p-4 text-center">
          <div className="text-xs text-text-secondary mb-1">Potansiyel Kazanç</div>
          <div className="font-mono text-lg font-bold text-accent-emerald">
            ₺{potentialWin.toFixed(2)}
          </div>
        </div>
        <div className="bg-bg-primary rounded-lg p-4 text-center">
          <div className="text-xs text-text-secondary mb-1">Net Kâr</div>
          <div className="font-mono text-lg font-bold text-accent-gold">
            ₺{profit.toFixed(2)}
          </div>
        </div>
        <div className="bg-bg-primary rounded-lg p-4 text-center">
          <div className="text-xs text-text-secondary mb-1">Zımni Olasılık</div>
          <div className="font-mono text-lg font-bold text-text-primary">
            %{impliedProb.toFixed(1)}
          </div>
        </div>
        <div className="bg-bg-primary rounded-lg p-4 text-center">
          <div className="text-xs text-text-secondary mb-1">Beklenen Değer</div>
          <div className={`font-mono text-lg font-bold ${ev >= 0 ? 'text-accent-emerald' : 'text-accent-ruby'}`}>
            ₺{ev.toFixed(2)}
          </div>
        </div>
      </div>

      <p className="text-xs text-text-secondary mt-4">
        Beklenen değer (EV) pozitifse bahis matematiksel olarak avantajlıdır.
      </p>
    </section>
  )
}
