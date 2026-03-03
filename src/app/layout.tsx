import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Poolytech — Casino Taktikleri ve Strateji Rehberleri',
    template: '%s | Poolytech',
  },
  description:
    'Casino oyunları hakkında kapsamlı strateji rehberleri. Blackjack, rulet, poker, bakara ve slot taktikleri. Matematiksel analizler ve uzman tavsiyeleri.',
  metadataBase: new URL('https://poolytech.com'),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://poolytech.com',
    siteName: 'Poolytech',
    title: 'Poolytech — Casino Taktikleri ve Strateji Rehberleri',
    description:
      'Casino oyunları hakkında kapsamlı strateji rehberleri. Blackjack, rulet, poker, bakara ve slot taktikleri.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poolytech — Casino Taktikleri',
    description: 'Casino strateji rehberleri ve matematiksel analizler.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://poolytech.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="font-body antialiased min-h-screen flex flex-col bg-bg-primary text-text-primary">
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
