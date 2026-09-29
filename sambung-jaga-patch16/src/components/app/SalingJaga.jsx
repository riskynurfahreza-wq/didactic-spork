import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CATEGORIES } from '../../lib/salingJagaData.js'

const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-cream'
const card = 'rounded-organic border border-ink/10 bg-white/80 p-5'

const COPY = {
  need: {
    heading: 'Apa yang sedang kamu perlukan?',
    sub: 'Pilih jenis bantuan yang ingin kamu cari.',
    result: 'Ada yang bisa membantu',
  },
  offer: {
    heading: 'Apa yang sedang bisa kamu bantu?',
    sub: 'Pilih jenis bantuan yang bisa kamu bagikan.',
    result: 'Ada yang sedang membutuhkan',
  },
}

function Btn({ variant = 'solid', className = '', ...p }) {
  const v = variant === 'solid' ? 'bg-leaf text-cream hover:bg-leaf-dark' : 'border border-ink/15 text-ink hover:bg-ink/5'
  return (
    <button type="button" {...p}
      className={`min-h-[48px] rounded-full px-6 text-[14.5px] font-medium transition active:scale-[0.98] ${v} ${ring} ${className}`} />
  )
}

function Back({ onClick, children }) {
  return (
    <button type="button" onClick={onClick} className={`mb-4 rounded-md py-1 text-[13.5px] text-inkmuted hover:text-ink ${ring}`}>
      ← {children}
    </button>
  )
}

function Note({ title, children }) {
  return (
    <div className="rounded-organic bg-sand/70 p-4 text-[13.5px] leading-relaxed text-inkmuted">
      <p className="font-medium text-ink">{title}</p>
      <p className="mt-0.5">{children}</p>
    </div>
  )
}

// Small cue that both directions are two sides of the same system.
function Sides({ mode }) {
  const on = 'bg-leaf text-cream'
  const off = 'bg-ink/5 text-inkmuted'
  return (
    <div className="flex items-center gap-2 text-[12.5px] font-medium" aria-label="Butuh dan Bisa Membantu saling melengkapi">
      <span className={`rounded-full px-3 py-1 ${mode === 'need' ? on : off}`}>Butuh</span>
      <span aria-hidden="true" className="text-inkmuted">↔</span>
      <span className={`rounded-full px-3 py-1 ${mode === 'offer' ? on : off}`}>Bisa Membantu</span>
    </div>
  )
}

const PATHS = [
  { mode: 'need', emoji: '🤲', title: 'Butuh Bantuan', text: 'Cari dukungan yang sedang kamu perlukan.', tone: 'bg-terracotta/15' },
  { mode: 'offer', emoji: '🌱', title: 'Bisa Membantu', text: 'Bagikan sesuatu yang bisa kamu bantu.', tone: 'bg-leaf/15' },
]

export default function SalingJaga() {
  const location = useLocation()
  const [mode, setMode] = useState(location.state?.mode ?? null) // null | 'need' | 'offer'
  const [catId, setCatId] = useState(null)
  const [idx, setIdx] = useState(0)
  const cat = CATEGORIES.find((c) => c.id === catId)
  const c = mode && COPY[mode]
  const ex = cat && cat.examples[idx]
  const cap = ex && (ex.share
    ? { label: 'Bisa dibagikan', items: [ex.type, ex.share] }
    : { label: 'Tersedia', items: [`Waktu: ${ex.when}`, 'Area: Sekitar ruang komunitas'] })

  const reset = () => { setMode(null); setCatId(null); setIdx(0) }

  return (
    <div className="animate-rise">
      {/* 1. Landing: two equal paths */}
      {!mode && (
        <>
          <div className="mx-auto max-w-xl text-center">
            <h1 className="font-serif text-3xl font-semibold text-ink">Saling Jaga</h1>
            <p className="mt-3 text-[16px] leading-relaxed text-ink">
              Kita semua bisa membutuhkan bantuan. Kita semua juga punya sesuatu untuk dibagikan.
            </p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-inkmuted">
              Di sini, anggota komunitas bisa mencari dukungan atau membagikan sesuatu yang bisa mereka bantu.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {PATHS.map((p) => (
              <section key={p.mode} className={`${card} flex flex-col gap-5 p-6 shadow-card`}>
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl ${p.tone}`}>{p.emoji}</span>
                  <div>
                    <h2 className="font-serif text-lg font-semibold text-ink">{p.title}</h2>
                    <p className="mt-0.5 text-[14px] leading-relaxed text-inkmuted">{p.text}</p>
                  </div>
                </div>
                <Btn onClick={() => setMode(p.mode)} className="w-full">{p.title}</Btn>
              </section>
            ))}
          </div>
        </>
      )}

      {/* 2. Same five categories for both directions */}
      {mode && !cat && (
        <>
          <Back onClick={reset}>Saling Jaga</Back>
          <Sides mode={mode} />
          <h1 className="mt-4 font-serif text-2xl font-semibold text-ink">{c.heading}</h1>
          <p className="mt-1 text-[14.5px] text-inkmuted">{c.sub}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {CATEGORIES.map((x) => (
              <button key={x.id} type="button" onClick={() => { setCatId(x.id); setIdx(0) }}
                className={`${card} flex items-start gap-3 text-left transition hover:border-leaf active:scale-[0.99] ${ring}`}>
                <span aria-hidden="true" className="text-xl">{x.emoji}</span>
                <span>
                  <span className="block font-serif text-[15.5px] font-semibold text-ink">{x.name}</span>
                  <span className="mt-1 block text-[12.5px] leading-relaxed text-inkmuted">{x.types.join(', ')}</span>
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* 3. One fictional example, then back */}
      {mode && cat && (
        <>
          <Back onClick={() => setCatId(null)}>Pilih kategori</Back>
          <Sides mode={mode} />

          <div className="mt-4">
            <p className="text-[13px] font-semibold text-leaf-dark">Contoh di komunitas</p>
            <p className="text-[13px] text-inkmuted">Beberapa contoh di bawah ini menunjukkan bagaimana Saling Jaga dapat digunakan.</p>
          </div>

          <div className={`${card} mt-4`}>
            <p className="text-[12.5px] text-inkmuted">{cat.name}</p>
            <h2 className="mt-1 font-serif text-[17px] font-semibold text-ink">{ex.type}</h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink">
              {mode === 'need' ? ex.ask : ex.need}
            </p>
            {mode === 'offer' && (
              <p className="mt-2 text-[13px] font-medium text-leaf-dark">Ini adalah kebutuhan yang bisa kamu bantu.</p>
            )}
          </div>

          <div aria-hidden="true" className="py-2 text-center text-inkmuted">↓</div>

          <div className="rounded-organic border border-leaf/30 bg-leaf/10 p-5">
            <h2 className="font-serif text-lg font-semibold text-ink">{c.result}</h2>
            <p className="mt-2 font-medium text-ink">{ex.type}</p>
            <p className="mt-1 text-[14.5px] leading-relaxed text-inkmuted">
              {mode === 'need'
                ? ex.offer
                : cat.cue || 'Kalau kamu punya yang bisa dibagikan, kamu bisa membantu kebutuhan ini.'}
            </p>
            {mode === 'offer' && (
              <>
                <div className="mt-3 rounded-organic bg-white/70 p-3">
                  <p className="text-[12px] text-inkmuted">Contoh kapasitas</p>
                  <p className="text-[13px] font-semibold text-ink">{cap.label}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {cap.items.map((i) => (
                      <span key={i} className="rounded-full bg-sand px-2.5 py-1 text-[12.5px] text-ink">{i}</span>
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-[13px] italic text-inkmuted">Bantu sesuai waktu dan kemampuanmu.</p>
              </>
            )}
          </div>

          <p className="mt-4 text-center text-[13.5px] text-inkmuted">
            {mode === 'offer'
              ? 'Kebutuhan ini dapat bertemu dengan kapasitas yang kamu punya.'
              : 'Ada yang sedang dibutuhkan. Ada pula yang bisa dibagikan.'}
          </p>

          <div className="mt-5 space-y-3">
            {ex.note && <Note title={ex.note[0]}>{ex.note[1]}</Note>}
            {cat.offline && (
              <Note title="Untuk pertemuan langsung">
                Pilih ruang komunitas atau tempat layanan yang jelas. Alamat rumah dan lokasi pribadi tidak perlu dibagikan.
              </Note>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Btn onClick={() => setIdx((idx + 1) % cat.examples.length)}>Lihat Contoh Lain</Btn>
            <Btn variant="ghost" onClick={() => setCatId(null)}>Pilih Kategori Lain</Btn>
            <Btn variant="ghost" onClick={reset}>Kembali ke Saling Jaga</Btn>
          </div>
        </>
      )}
    </div>
  )
}
