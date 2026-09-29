import React, { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { ThreadsIllustration } from '../shared/Illustrations.jsx'

const CARDS = [
  {
    emoji: '🌱',
    title: 'Pilih dukungan yang sesuai',
    body: 'Ingin mencoba sendiri, ditemani, mencari bantuan, atau membantu orang lain? Anda yang menentukan.',
  },
  {
    emoji: '🤝',
    title: 'Bisa membutuhkan, bisa membantu',
    body: 'Tidak ada label \u201ckorban\u201d atau \u201cpenolong\u201d. Kita dapat berada di kedua posisi.',
  },
  {
    emoji: '🔒',
    title: 'Tetap aman',
    body: 'Informasi pribadi tidak ditampilkan secara terbuka. Sambung Jaga juga bukan pengganti layanan profesional.',
  },
]

export default function Onboarding() {
  const { completeOnboarding } = useApp()
  const [screen, setScreen] = useState(1)

  return (
    <div className="flex min-h-[100dvh] flex-col bg-cream px-6 py-10">
      {screen === 1 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center animate-rise">
          <div className="font-serif text-2xl font-semibold tracking-tight text-leaf-dark">
            SAMBUNG JAGA
          </div>
          <ThreadsIllustration className="mt-8 w-56" />
          <p className="mt-8 max-w-xs font-serif text-xl font-medium leading-snug text-ink">
            Saling bantu saat krisis, saling jaga setelahnya.
          </p>
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-inkmuted">
            Ruang untuk tetap terhubung, saling membantu, dan berjalan bersama selama proses
            pemulihan.
          </p>
          <button
            onClick={() => setScreen(2)}
            className="mt-10 w-full max-w-xs rounded-full bg-leaf px-6 py-3.5 text-[15px] font-medium text-cream shadow-soft transition hover:bg-leaf-dark"
          >
            Mulai
          </button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col animate-rise">
          <h1 className="text-center font-serif text-2xl font-semibold leading-snug text-ink">
            Di sini, setiap orang punya pilihan.
          </h1>
          <div className="mt-8 flex-1 space-y-4">
            {CARDS.map((c) => (
              <div key={c.title} className="rounded-organic border border-ink/10 bg-white/70 p-5 shadow-card">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{c.emoji}</span>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-ink">{c.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-inkmuted">{c.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={completeOnboarding}
            className="mt-8 w-full rounded-full bg-leaf px-6 py-3.5 text-[15px] font-medium text-cream shadow-soft transition hover:bg-leaf-dark"
          >
            Lanjut
          </button>
        </div>
      )}
    </div>
  )
}
