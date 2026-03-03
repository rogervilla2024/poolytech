import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Article, ArticleFrontmatter, CategorySlug } from '@/types'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) return []
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const frontmatter = data as ArticleFrontmatter

  return {
    ...frontmatter,
    slug,
    content,
  }
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs()
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return getAllArticles().filter((article) => article.category === category)
}

export function getRelatedArticles(currentSlug: string, limit = 4): Article[] {
  const current = getArticleBySlug(currentSlug)
  if (!current) return []

  return getAllArticles()
    .filter((a) => a.slug !== currentSlug)
    .filter((a) => a.category === current.category || a.tags.some((t) => current.tags.includes(t)))
    .slice(0, limit)
}
