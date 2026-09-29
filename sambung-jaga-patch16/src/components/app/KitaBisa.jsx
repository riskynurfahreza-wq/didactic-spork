import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { KB_AREAS, FILTERS, buildCards } from '../../lib/kitaBisaData.js'
import { ACTIVITIES as RUANG_PULIH } from '../../lib/ruangPulihData.js'

const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-cream'
const RUANG_COUNT = Object.keys(RUANG_PULIH).length

export default function KitaBisa() {
  const [area, setArea] = useState('Manggala')
  const [filter, setFilter] = useState('semua')
  const cards = buildCards(area, RUANG_COUNT).filter((c) => filter === 'semua' || c.tags.includes(filter))

  return (
    <div className="animate-rise">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-serif text-3xl font-semibold text-ink">Kita Bisa</h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink">Lihat apa yang sedang terjadi di sekitarmu.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-inkmuted">
          Temukan kebutuhan, bantuan, kegiatan, dan layanan yang tersedia di area yang kamu pilih.
        </p>
      </div>

      <div className="mx-auto mt-7 flex max-w-md flex-col items-center gap-1">
        <label className="flex items-center gap-3 rounded-full border border-ink/15 bg-white/80 py-1.5 pl-5 pr-2 text-[14px]">
          <span className="text-inkmuted">Area yang dilihat</span>
          <select value={area} onChange={(e) => setArea(e.target.value)} aria-label="Area yang dilihat"
            className={`min-h-[40px] rounded-full bg-sand px-4 font-medium text-ink ${ring}`}>
            {KB_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
        <p className="text-center text-[12.5px] text-inkmuted">Kamu memilih area sendiri. Kita Bisa tidak memakai lokasi GPS.</p>
      </div>

      <h2 className="mt-9 font-serif text-xl font-semibold text-ink">Apa yang sedang terjadi di sekitarmu?</h2>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter informasi">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}
            className={`min-h-[44px] rounded-full border px-4 text-[14px] font-medium transition ${filter === f.id ? 'border-leaf bg-leaf text-cream' : 'border-ink/15 bg-white/70 text-ink hover:border-ink/30'} ${ring}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <section key={c.id} className="flex flex-col justify-between gap-4 rounded-organic border border-ink/10 bg-white/80 p-5">
            <div>
              <h3 className="flex items-center gap-2 font-serif text-[16px] font-semibold text-ink">
                <span aria-hidden="true" className="text-xl">{c.emoji}</span>{c.title}
              </h3>
              {c.sub && <p className="mt-1 text-[13px] leading-relaxed text-inkmuted">{c.sub}</p>}
              <div className="mt-3 space-y-3">
                {c.rows.map((r) => (
                  <div key={r.t}>
                    <p className="text-ink"><span className="font-serif text-2xl font-semibold text-leaf-dark">{r.n}</span> <span className="text-[15px] font-medium">{r.u}</span></p>
                    <p className="text-[13.5px] text-inkmuted">{r.t}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link to={c.to} state={c.state}
              className={`inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-leaf px-6 text-[14.5px] font-medium text-cream transition hover:bg-leaf-dark active:scale-[0.98] ${ring}`}>
              {c.cta}
            </Link>
          </section>
        ))}
      </div>

      <p className="mt-8 text-center text-[12.5px] leading-relaxed text-inkmuted">
        Angka di sini merangkum bantuan dan kebutuhan komunitas tanpa menampilkan nama atau lokasi pribadi.
      </p>
    </div>
  )
}
