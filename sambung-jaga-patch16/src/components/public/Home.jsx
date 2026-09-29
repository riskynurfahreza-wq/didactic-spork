import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ConnectionField from '../shared/ConnectionField.jsx'

const PRINCIPLES = [
  { emoji: '🤝', label: 'Saling membantu', color: 'text-leaf-dark' },
  { emoji: '🌱', label: 'Tetap terhubung', color: 'text-terracotta-dark' },
  { emoji: '🫂', label: 'Tetap punya pilihan', color: 'text-leaf-dark' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <section className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden">
      <ConnectionField />

      <div className="relative z-10 mx-auto max-w-2xl px-5 py-16 text-center sm:px-8">
        <h1 className="font-serif text-4xl font-semibold leading-[1.15] text-ink sm:text-5xl">
          Saling bantu saat krisis, saling jaga setelahnya.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-inkmuted">
          Pemulihan tidak selalu selesai ketika keadaan darurat berakhir — Sambung Jaga membantu
          hubungan dan dukungan itu tetap terhubung.
        </p>

        <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13.5px] font-medium">
          {PRINCIPLES.map((p, i) => (
            <React.Fragment key={p.label}>
              {i > 0 && <span className="text-ink/25">·</span>}
              <span className={p.color}>
                {p.emoji} {p.label}
              </span>
            </React.Fragment>
          ))}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate('/app')}
            className="rounded-full bg-leaf px-6 py-3 text-[15px] font-medium text-cream shadow-soft transition hover:bg-leaf-dark"
          >
            Mulai Sambung Jaga
          </button>
          <Link
            to="/about"
            className="rounded-full border border-ink/15 bg-cream px-6 py-3 text-[15px] font-medium text-ink transition hover:border-ink/30"
          >
            Kenali Sambung Jaga
          </Link>
        </div>

        <Link
          to="/how-it-works"
          className="mt-4 inline-block text-[13.5px] text-inkmuted underline decoration-ink/20 underline-offset-4 transition hover:text-ink"
        >
          Lihat cara kerjanya →
        </Link>
      </div>
    </section>
  )
}
