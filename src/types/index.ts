export interface Article {
  title: string
  description: string
  category: CategorySlug
  slug: string
  date: string
  author: string
  readTime: string
  tags: string[]
  image?: string
  content: string
}

export interface ArticleFrontmatter {
  title: string
  description: string
  category: CategorySlug
  slug: string
  date: string
  author: string
  readTime: string
  tags: string[]
  image?: string
}

export type CategorySlug = 'blackjack' | 'rulet' | 'poker' | 'bakara' | 'slot' | 'genel'

export interface Category {
  slug: CategorySlug
  name: string
  description: string
  color: string
  icon: string
}

export interface SEOMeta {
  title: string
  description: string
  canonical: string
  ogImage?: string
  ogType?: string
  article?: {
    publishedTime: string
    modifiedTime: string
    author: string
    tags: string[]
  }
}

export interface TableOfContentsItem {
  id: string
  text: string
  level: number
}

export interface InternalLink {
  slug: string
  title: string
  category: CategorySlug
}
