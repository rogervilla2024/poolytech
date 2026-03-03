import { SEOMeta } from '@/types'

interface SEOHeadProps {
  meta: SEOMeta
}

export function generateArticleSchema(meta: SEOMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    author: {
      '@type': 'Organization',
      name: 'Poolytech',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Poolytech',
      url: 'https://poolytech.com',
    },
    datePublished: meta.article?.publishedTime,
    dateModified: meta.article?.modifiedTime,
    mainEntityOfPage: meta.canonical,
  }
}

export function generateFAQSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Poolytech',
    url: 'https://poolytech.com',
    description: 'Casino taktikleri ve strateji rehberleri',
    inLanguage: 'tr-TR',
  }
}

export default function SEOHead({ meta }: SEOHeadProps) {
  const schema = meta.article
    ? generateArticleSchema(meta)
    : generateWebsiteSchema()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
