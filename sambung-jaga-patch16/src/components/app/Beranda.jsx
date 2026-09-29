import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Order here = mobile stacking order.
const FEATURES = [
  {
    id: 'saling-jaga',
    tier: 'primary',
    emoji: '🫂',
    name: 'Saling Jaga',
    desc: 'Cari atau tawarkan bantuan kepada anggota komunitas.',
    cta: 'Cari / Tawarkan Bantuan',
  },
  {
    id: 'ruang-pulih',
    tier: 'secondary',
    emoji: '🌱',
    name: 'Ruang Pulih',
    desc: 'Aktivitas mandiri untuk membantu menjalani hari.',
    cta: 'Mulai Aktivitas',
  },
  {
    id: 'tali-jaga',
    tier: 'secondary',
    emoji: '🧵',
    name: 'Tali Jaga',
    desc: 'Tetap terhubung setelah bantuan pertama selesai.',
    cta: 'Lihat Koneksi',
  },
  {
    id: 'kita-bisa',
    tier: 'supporting',
    emoji: '🌿',
    name: 'Kita Bisa',
    desc: 'Lihat apa yang sedang tersedia dan dibutuhkan di sekitarmu.',
    cta: 'Lihat yang Tersedia',
  },
  {
    id: 'lingkar-jaga',
    tier: 'supporting',
    emoji: '🗣️',
    name: 'Lingkar Jaga',
    desc: 'Temukan kegiatan untuk berkumpul dan tetap terhubung.',
    cta: 'Lihat Kegiatan',
  },
  {
    id: 'rujukan',
    tier: 'support',
    emoji: '🛟',
    name: 'Rujukan',
    desc: 'Temukan layanan profesional atau bantuan formal.',
    cta: 'Cari Layanan',
  },
]

const BTN_BASE =
  'inline-flex min-h-[48px] items-center justify-center rounded-full px-6 text-[14.5px] font-medium transition duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

const TIERS = {
  primary: {
    card: 'border-leaf-dark/20 bg-leaf p-6 text-cream shadow-soft sm:col-span-2 sm:flex-row sm:items-center sm:justify-between sm:p-8',
    badge: 'h-12 w-12 bg-[#F0C36A] text-2xl',
    title: 'font-serif text-2xl font-semibold text-cream',
    desc: 'mt-1.5 max-w-md text-[15px] leading-relaxed text-cream/90',
    btn: 'w-full bg-cream text-leaf-dark hover:bg-white ring-cream ring-offset-leaf sm:w-auto sm:shrink-0',
  },
  secondary: {
    card: 'border-ink/10 bg-white/80 p-5 shadow-card transition-shadow hover:shadow-soft sm:p-6',
    badge: 'h-11 w-11 bg-leaf/15 text-xl',
    title: 'font-serif text-lg font-semibold text-ink',
    desc: 'mt-1 text-[14px] leading-relaxed text-inkmuted',
    btn: 'w-full bg-leaf text-cream hover:bg-leaf-dark ring-leaf ring-offset-cream',
  },
  supporting: {
    card: 'border-ink/10 bg-white/50 p-5 transition-shadow hover:shadow-card',
    badge: 'h-10 w-10 bg-sand text-lg',
    title: 'font-serif text-[16px] font-semibold text-ink',
    desc: 'mt-1 text-[13.5px] leading-relaxed text-inkmuted',
    btn: 'w-full border border-leaf/40 text-leaf-dark hover:bg-leaf/10 ring-leaf ring-offset-cream',
  },
  support: {
    card: 'border-terracotta/30 bg-terracotta/10 p-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between',
    badge: 'h-10 w-10 bg-terracotta/15 text-lg',
    title: 'font-serif text-[16px] font-semibold text-ink',
    desc: 'mt-1 text-[13.5px] leading-relaxed text-inkmuted',
    btn: 'w-full border border-terracotta/50 text-terracotta-dark hover:bg-terracotta/10 ring-terracotta ring-offset-cream sm:w-auto sm:shrink-0',
  },
}

function FeatureCard({ feature, onSelect }) {
  const t = TIERS[feature.tier]
  return (
    <section className={`flex flex-col justify-between gap-5 rounded-organic border ${t.card}`}>
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center rounded-full ${t.badge}`}
        >
          {feature.emoji}
        </span>
        <div>
          <h2 className={t.title}>{feature.name}</h2>
          <p className={t.desc}>{feature.desc}</p>
        </div>
      </div>
      <button type="button" onClick={() => onSelect(feature)} className={`${BTN_BASE} ${t.btn}`}>
        {feature.cta}
      </button>
    </section>
  )
}

export default function Beranda() {
  const navigate = useNavigate()
  const [notice, setNotice] = useState('')
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  // Temporary placeholder: feature logic arrives in later patches.
  const handleSelect = (feature) => {
    const LIVE = { 'saling-jaga': '/app/saling-jaga', 'ruang-pulih': '/app/ruang-pulih', 'tali-jaga': '/app/tali-jaga', 'lingkar-jaga': '/app/lingkar-jaga', 'rujukan': '/app/rujukan', 'kita-bisa': '/app/kita-bisa' }
    if (LIVE[feature.id]) {
      navigate(LIVE[feature.id])
      return
    }
    setNotice(`${feature.name} akan tersedia di pembaruan berikutnya.`)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setNotice(''), 2600)
  }

  return (
    <div>
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">Sambung Jaga</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-inkmuted">
          Temukan cara untuk saling membantu, tetap terhubung, dan menjaga komunitas.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <FeatureCard key={f.id} feature={f} onSelect={handleSelect} />
        ))}
      </div>

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] z-40 flex justify-center px-5"
      >
        {notice && (
          <div className="animate-rise rounded-full bg-ink px-5 py-3 text-[13.5px] text-cream shadow-soft">
            {notice}
          </div>
        )}
      </div>
    </div>
  )
}
