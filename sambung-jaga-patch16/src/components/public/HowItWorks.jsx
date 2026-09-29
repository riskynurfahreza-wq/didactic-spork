import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PRINCIPLES } from './how-it-works/principlesData.js'
import PrincipleCard from './how-it-works/PrincipleCard.jsx'
import WhyThisDesign from './how-it-works/WhyThisDesign.jsx'
import OverlapNetwork from './how-it-works/OverlapNetwork.jsx'

function FlowLegend() {
  const steps = ['Yang dibutuhkan komunitas', 'Prinsip desain', 'Bagaimana Sambung Jaga merespons']
  return (
    <div className="mx-auto mt-8 flex max-w-xs flex-col items-center gap-1.5">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <span className="rounded-full bg-sand px-4 py-1.5 text-[12.5px] font-medium text-inkmuted">{s}</span>
          {i < steps.length - 1 && <span className="text-ink/30">↓</span>}
        </React.Fragment>
      ))}
    </div>
  )
}

export default function HowItWorks() {
  const navigate = useNavigate()

  return (
    <div>
      <section className="mx-auto max-w-2xl px-5 pb-4 pt-16 text-center sm:px-8">
        <p className="text-sm font-medium text-terracotta-dark">Cara Kerja</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-ink sm:text-4xl">
          Wawasan tentang manusia dan komunitas, diterjemahkan menjadi desain.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-inkmuted">
          Empat prinsip membentuk Sambung Jaga. Masing-masing diwujudkan lewat lebih dari satu
          fitur — ini bukan pemetaan satu-lawan-satu.
        </p>
        <FlowLegend />
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-6 pt-14 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <PrincipleCard key={p.n} principle={p} />
          ))}
        </div>
        <WhyThisDesign />
      </section>

      <OverlapNetwork />

      <section className="border-t border-ink/10 bg-sand/60">
        <div className="mx-auto max-w-2xl px-5 py-16 text-center sm:px-8">
          <p className="font-serif text-2xl font-semibold leading-snug text-ink sm:text-3xl">
            Dari wawasan menuju desain.
            <br />
            Dari desain menuju koneksi.
          </p>
          <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-relaxed text-inkmuted">
            Sambung Jaga menerjemahkan wawasan psikologis dan komunitas menjadi cara nyata untuk
            menjaga orang, sumber daya, dan aksi kolektif tetap terhubung sepanjang proses
            pemulihan.
          </p>
          <button
            onClick={() => navigate('/features')}
            className="mt-7 rounded-full bg-terracotta px-7 py-3 text-[15px] font-medium text-cream shadow-soft transition hover:bg-terracotta-dark"
          >
            Jelajahi Fitur →
          </button>
        </div>
      </section>
    </div>
  )
}
