import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useInView } from '../shared/scrollHooks.js'

const CARDS = [
  {
    emoji: '🤝',
    title: 'Saling Jaga',
    tagline: 'Temukan bantuan atau kebutuhan di komunitas.',
    body: 'Lihat bantuan yang tersedia atau kebutuhan yang sedang dicari, lalu temukan bentuk dukungan yang sesuai.',
    cta: 'Buka Saling Jaga',
    route: '/app/saling-jaga',
    accent: 'terracotta',
  },
  {
    emoji: '🌱',
    title: 'Ruang Pulih',
    tagline: 'Ambil jeda dan lakukan sesuatu untuk dirimu.',
    body: 'Pilih aktivitas mandiri yang dapat membantu menjalani hari, tanpa diagnosis atau penilaian kondisi psikologis.',
    cta: 'Buka Ruang Pulih',
    route: '/app/ruang-pulih',
    accent: 'leaf',
  },
  {
    emoji: '🔗',
    title: 'Tali Jaga',
    tagline: 'Jaga kesinambungan dukungan.',
    body: 'Jika sebuah dukungan perlu berlanjut, tentukan apa yang ingin dipertahankan dan berapa lama kamu ingin tetap terhubung.',
    cta: 'Buka Tali Jaga',
    route: '/app/tali-jaga',
    accent: 'peach',
  },
  {
    emoji: '🌿',
    title: 'Lingkar Jaga',
    tagline: 'Kembali terhubung melalui kegiatan bersama.',
    body: 'Temukan kegiatan komunitas untuk bertemu, beraktivitas, dan kembali menjadi bagian dari lingkungan sekitar.',
    cta: 'Buka Lingkar Jaga',
    route: '/app/lingkar-jaga',
    accent: 'leaf',
  },
  {
    emoji: '👀',
    title: 'Kita Bisa',
    tagline: 'Lihat apa yang sedang terjadi di sekitarmu.',
    body: 'Lihat kebutuhan, bantuan, kegiatan, dukungan, dan layanan yang tersedia di area yang kamu pilih.',
    cta: 'Buka Kita Bisa',
    route: '/app/kita-bisa',
    accent: 'terracotta-dark',
  },
  {
    emoji: '🧭',
    title: 'Rujukan',
    tagline: 'Temukan jalur menuju bantuan profesional atau formal.',
    body: 'Gunakan Rujukan untuk menemukan layanan kesehatan, kesehatan mental, atau bantuan formal yang sesuai dengan kebutuhanmu.',
    cta: 'Buka Rujukan',
    route: '/app/rujukan',
    accent: 'terracotta',
  },
]

const ACCENTS = {
  leaf: {
    ring: 'border-leaf/20',
    glow: 'hover:shadow-[0_0_36px_-6px_rgba(74,124,89,0.5)] hover:border-leaf/40',
    blob: 'bg-leaf/25',
    btn: 'text-leaf-dark border-leaf/30 hover:bg-leaf/10',
  },
  terracotta: {
    ring: 'border-terracotta/20',
    glow: 'hover:shadow-[0_0_36px_-6px_rgba(201,123,91,0.5)] hover:border-terracotta/40',
    blob: 'bg-terracotta/25',
    btn: 'text-terracotta-dark border-terracotta/30 hover:bg-terracotta/10',
  },
  'terracotta-dark': {
    ring: 'border-terracotta-dark/20',
    glow: 'hover:shadow-[0_0_36px_-6px_rgba(168,95,66,0.5)] hover:border-terracotta-dark/40',
    blob: 'bg-terracotta-dark/20',
    btn: 'text-terracotta-dark border-terracotta-dark/30 hover:bg-terracotta-dark/10',
  },
  peach: {
    ring: 'border-[#E8B08A]/40',
    glow: 'hover:shadow-[0_0_36px_-6px_rgba(232,176,138,0.6)] hover:border-[#E8B08A]/60',
    blob: 'bg-[#E8B08A]/35',
    btn: 'text-[#A85F42] border-[#E8B08A]/50 hover:bg-[#E8B08A]/15',
  },
}

function FeatureCard({ card, index }) {
  const [ref, inView] = useInView(0.2)
  const navigate = useNavigate()
  const a = ACCENTS[card.accent]

  return (
    <div
      ref={ref}
      className={`reveal group relative overflow-hidden rounded-organic border ${a.ring} bg-white/80 p-7 transition-all duration-300 hover:-translate-y-1 ${a.glow} ${inView ? 'in' : ''}`}
      style={{ transitionDelay: inView ? `${index * 0.08}s` : '0s' }}
    >
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${a.blob} animate-breathe`} />

      <div className="relative flex items-center gap-3">
        <span className="text-2xl transition-transform duration-300 group-hover:scale-110">{card.emoji}</span>
        <h3 className="font-serif text-xl font-semibold text-ink">{card.title}</h3>
      </div>

      <p className="relative mt-4 text-[15px] font-medium leading-snug text-ink">{card.tagline}</p>
      <p className="relative mt-2 text-[13.5px] leading-relaxed text-inkmuted">{card.body}</p>

      <button
        type="button"
        onClick={() => navigate(card.route)}
        className={`relative mt-6 w-full rounded-full border bg-white px-5 py-3 text-[14.5px] font-medium transition ${a.btn}`}
      >
        {card.cta}
      </button>
    </div>
  )
}

export default function Features() {
  const [headRef, headIn] = useInView(0.3)

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-medium text-terracotta-dark">Fitur</p>
        <h1 ref={headRef} className={`reveal mt-3 font-serif text-3xl font-semibold text-ink sm:text-4xl ${headIn ? 'in' : ''}`}>
          Enam fitur, satu sistem yang saling terhubung.
        </h1>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {CARDS.map((card, i) => (
          <FeatureCard key={card.title} card={card} index={i} />
        ))}
      </div>
    </section>
  )
}
