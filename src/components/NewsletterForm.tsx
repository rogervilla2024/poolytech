'use client'

import { useState, FormEvent } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
          Strateji Bültenimize <span className="gold-gradient italic">Katılın</span>
        </h2>
        <p className="text-text-secondary mb-8">
          Yeni rehberler ve analizlerden ilk siz haberdar olun.
        </p>

        {submitted ? (
          <div className="glass-card p-6 animate-fadeIn">
            <div className="text-accent-emerald text-3xl mb-3">✓</div>
            <p className="text-text-primary font-medium">Kaydınız alındı!</p>
            <p className="text-text-secondary text-sm mt-1">En güncel stratejileri e-postanıza göndereceğiz.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">E-posta adresiniz</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-bg-elevated border border-border text-text-primary
                         placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-gold/50
                         transition-colors"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Abone Ol
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
