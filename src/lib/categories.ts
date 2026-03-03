import { Category, CategorySlug } from '@/types'

export const categories: Category[] = [
  {
    slug: 'blackjack',
    name: 'Blackjack Taktikleri',
    description: 'Temel strateji, kart sayma ve masa seçimi rehberleri',
    color: '#1B5E20',
    icon: '♠️',
  },
  {
    slug: 'rulet',
    name: 'Rulet Stratejileri',
    description: 'Bahis sistemleri, dağılım analizi ve rulet matematiği',
    color: '#B71C1C',
    icon: '🔴',
  },
  {
    slug: 'poker',
    name: 'Poker Rehberi',
    description: 'Texas Hold\'em, pozisyon avantajı ve blöf teknikleri',
    color: '#0D47A1',
    icon: '♦️',
  },
  {
    slug: 'bakara',
    name: 'Bakara Analizleri',
    description: 'Banker vs Player, yol takibi ve komisyon analizi',
    color: '#4A148C',
    icon: '👑',
  },
  {
    slug: 'slot',
    name: 'Slot Makineleri',
    description: 'RTP rehberi, volatilite analizi ve bonus türleri',
    color: '#E65100',
    icon: '🎰',
  },
  {
    slug: 'genel',
    name: 'Genel Strateji',
    description: 'Bankroll yönetimi, casino matematiği ve sorumlu oyun',
    color: '#263238',
    icon: '📊',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug)
}

export function isValidCategory(slug: string): slug is CategorySlug {
  return categories.some((cat) => cat.slug === slug)
}
