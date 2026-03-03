'use client'

import { useState } from 'react'

type Action = 'H' | 'S' | 'D' | 'P' | 'Ds'

interface CellInfo {
  action: Action
  label: string
  color: string
  bgColor: string
}

const actionMap: Record<Action, CellInfo> = {
  H: { action: 'H', label: 'Hit', color: '#FFFFFF', bgColor: '#1B5E20' },
  S: { action: 'S', label: 'Stand', color: '#FFFFFF', bgColor: '#B71C1C' },
  D: { action: 'D', label: 'Double', color: '#000000', bgColor: '#D4AF37' },
  P: { action: 'P', label: 'Split', color: '#FFFFFF', bgColor: '#0D47A1' },
  Ds: { action: 'Ds', label: 'Double/Stand', color: '#FFFFFF', bgColor: '#4A148C' },
}

// Blackjack temel strateji tablosu — Hard toplam
const hardTable: Action[][] = [
  // Dealer: 2  3  4  5  6  7  8  9  10  A
  /*  8 */ ['H','H','H','H','H','H','H','H','H','H'],
  /*  9 */ ['H','D','D','D','D','H','H','H','H','H'],
  /* 10 */ ['D','D','D','D','D','D','D','D','H','H'],
  /* 11 */ ['D','D','D','D','D','D','D','D','D','D'],
  /* 12 */ ['H','H','S','S','S','H','H','H','H','H'],
  /* 13 */ ['S','S','S','S','S','H','H','H','H','H'],
  /* 14 */ ['S','S','S','S','S','H','H','H','H','H'],
  /* 15 */ ['S','S','S','S','S','H','H','H','H','H'],
  /* 16 */ ['S','S','S','S','S','H','H','H','H','H'],
  /* 17 */ ['S','S','S','S','S','S','S','S','S','S'],
]

const hardRows = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17+']
const dealerCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A']

export default function StrategyTable() {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  return (
    <section className="glass-card p-6 sm:p-8 overflow-x-auto">
      <h2 className="font-display text-2xl font-bold mb-2">
        <span className="gold-gradient">Blackjack Temel Strateji Tablosu</span>
      </h2>
      <p className="text-sm text-text-secondary mb-6">Hard toplam — Dealer açık kartına göre</p>

      {/* Renk açıklaması */}
      <div className="flex flex-wrap gap-3 mb-4">
        {Object.values(actionMap).map((info) => (
          <div key={info.action} className="flex items-center gap-1.5 text-xs">
            <span
              className="w-4 h-4 rounded"
              style={{ backgroundColor: info.bgColor }}
            />
            <span className="text-text-secondary">{info.label}</span>
          </div>
        ))}
      </div>

      <table className="w-full border-collapse min-w-[500px]">
        <thead>
          <tr>
            <th className="px-2 py-2 text-xs font-mono text-text-secondary text-left bg-bg-primary rounded-tl-lg">
              El / Dealer
            </th>
            {dealerCards.map((card) => (
              <th
                key={card}
                className="px-2 py-2 text-xs font-mono text-accent-gold text-center bg-bg-primary"
              >
                {card}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hardTable.map((row, rowIdx) => (
            <tr key={rowIdx}>
              <td className="px-2 py-2 text-xs font-mono text-accent-gold bg-bg-primary font-bold">
                {hardRows[rowIdx]}
              </td>
              {row.map((action, colIdx) => {
                const cellId = `${rowIdx}-${colIdx}`
                const info = actionMap[action]
                const isHovered = hoveredCell === cellId
                return (
                  <td
                    key={colIdx}
                    className="px-2 py-2 text-center cursor-pointer transition-all duration-150"
                    style={{
                      backgroundColor: info.bgColor,
                      opacity: isHovered ? 1 : 0.85,
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                    onMouseEnter={() => setHoveredCell(cellId)}
                    onMouseLeave={() => setHoveredCell(null)}
                    title={`${hardRows[rowIdx]} vs ${dealerCards[colIdx]}: ${info.label}`}
                  >
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: info.color }}
                    >
                      {action}
                    </span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-text-secondary mt-4">
        H = Hit, S = Stand, D = Double Down, P = Split. 4-8 deste standart kurallar için geçerlidir.
      </p>
    </section>
  )
}
