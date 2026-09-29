import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { STATES, ACTIVITIES, LINKS } from '../../lib/ruangPulihData.js'

const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-cream'
const card = 'rounded-organic border border-ink/10 bg-white/80 p-5'
const btn = `inline-flex min-h-[48px] items-center justify-center rounded-full px-6 text-[14.5px] font-medium transition active:scale-[0.98] ${ring}`
const solid = `${btn} bg-leaf text-cream hover:bg-leaf-dark`
const ghost = `${btn} border border-ink/15 text-ink hover:bg-ink/5`

const Back = ({ onClick, children }) => (
  <button type="button" onClick={onClick} className={`mb-4 rounded-md py-1 text-[13.5px] text-inkmuted hover:text-ink ${ring}`}>← {children}</button>
)
const LinkBtn = ({ l, variant = ghost }) => <Link to={l.to} className={variant}>{l.label}</Link>
const norm = (c) => (typeof c === 'string' ? { label: c } : c)

function Boundary() {
  return (
    <p className="mt-8 rounded-organic bg-sand/70 p-4 text-[13.5px] leading-relaxed text-inkmuted">
      <span className="font-medium text-ink">Ruang Pulih adalah ruang dukungan mandiri, bukan layanan diagnosis atau terapi.</span>{' '}
      Jika kamu membutuhkan bantuan profesional, kamu dapat melihat pilihan di{' '}
      <Link to={LINKS.RJ.to} className="font-medium text-leaf-dark underline underline-offset-2">Rujukan</Link>.
    </p>
  )
}

function Finish({ closing, note, links = [], onMore, onDone }) {
  return (
    <div className="mt-6 rounded-organic border border-leaf/30 bg-leaf/10 p-5">
      {note && <p className="mb-2 text-[14.5px] leading-relaxed text-ink">{note}</p>}
      {closing && <p className="text-[14.5px] leading-relaxed text-ink">{closing}</p>}
      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((l) => <LinkBtn key={l.to} l={l} />)}
        <button type="button" onClick={onMore} className={solid}>Pilih Aktivitas Lain</button>
        <button type="button" onClick={onDone} className={ghost}>Selesai</button>
      </div>
    </div>
  )
}

function Activity({ act, onMore, onDone }) {
  const [picked, setPicked] = useState(null)
  const [step, setStep] = useState(0)
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)
  const fin = { onMore, onDone }

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink">{act.title}</h1>

      {act.type === 'pick' && (
        <>
          <p className="mt-3 text-[15px] leading-relaxed text-ink">{act.prompt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {act.choices.map(norm).map((c) => (
              <button key={c.label} type="button" onClick={() => setPicked(c)}
                className={`min-h-[44px] rounded-full border px-4 py-2 text-left text-[14px] font-medium transition ${picked === c ? 'border-leaf bg-leaf text-cream' : 'border-ink/15 bg-white/70 text-ink hover:border-ink/30'} ${ring}`}>
                {c.label}
              </button>
            ))}
          </div>
          {picked && <Finish closing={act.closing} links={picked.links || act.links} {...fin} />}
        </>
      )}

      {act.type === 'write' && (
        <>
          <label className="mt-3 block">
            <span className="text-[15px] leading-relaxed text-ink">{act.prompt}</span>
            <textarea rows={3} maxLength={200} value={text} onChange={(e) => setText(e.target.value)} placeholder={act.placeholder}
              className="mt-3 w-full rounded-organic border border-ink/15 bg-white px-4 py-3 text-[14.5px] outline-none focus:border-leaf" />
            <span className="mt-1 block text-[12.5px] italic text-inkmuted">Ceritakan seperlunya. Kamu tidak perlu membagikan hal pribadi.</span>
          </label>
          {!done
            ? <button type="button" onClick={() => { setText(''); setDone(true) }} className={`${solid} mt-4`}>Selesai</button>
            : <Finish closing={act.closing} {...fin} />}
        </>
      )}

      {act.type === 'steps' && (() => {
        const last = step === act.steps.length - 1
        const fb = act.feedback
        return (
          <>
            <p className="mt-4 min-h-[3.5rem] rounded-organic bg-white/80 p-5 text-[16px] leading-relaxed text-ink" aria-live="polite">{act.steps[step]}</p>
            {!last && <button type="button" onClick={() => setStep(step + 1)} className={`${solid} mt-4`}>Lanjut</button>}
            {last && fb && (
              <div className="mt-5">
                <p className="text-[15px] font-medium text-ink">{fb.q}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {fb.choices.map((c) => (
                    <button key={c.label} type="button" onClick={() => setPicked(c)}
                      className={`min-h-[44px] rounded-full border px-4 py-2 text-left text-[14px] font-medium transition ${picked === c ? 'border-leaf bg-leaf text-cream' : 'border-ink/15 bg-white/70 text-ink hover:border-ink/30'} ${ring}`}>
                      {c.label}
                    </button>
                  ))}
                </div>
                {picked && <Finish closing={act.closing} note={picked.note} links={picked.links} {...fin} />}
              </div>
            )}
            {last && !fb && <Finish closing={act.closing} {...fin} />}
          </>
        )
      })()}

      {act.type === 'support' && (
        <>
          <p className="mt-3 text-[15px] leading-relaxed text-ink">{act.prompt}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {act.routes.map((r) => (
              <Link key={r.to} to={r.to} className={`${card} block transition hover:border-leaf ${ring}`}>
                <span className="font-serif text-[16px] font-semibold text-ink">{r.label}</span>
                <span className="mt-1 block text-[13.5px] text-inkmuted">{r.hint}</span>
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={onMore} className={ghost}>Pilih Aktivitas Lain</button>
            <button type="button" onClick={onDone} className={ghost}>Selesai</button>
          </div>
        </>
      )}
    </div>
  )
}

export default function RuangPulih() {
  const [stateId, setStateId] = useState(null)
  const [actId, setActId] = useState(null)
  const st = STATES.find((s) => s.id === stateId)

  const toCheckin = () => { setStateId(null); setActId(null) }

  return (
    <div className="animate-rise">
      {!st && (
        <>
          <div className="mx-auto max-w-xl text-center">
            <h1 className="font-serif text-3xl font-semibold text-ink">Ruang Pulih</h1>
            <p className="mt-3 font-serif text-xl text-ink">Bagaimana kabarmu hari ini?</p>
            <p className="mt-2 text-[15px] leading-relaxed text-inkmuted">
              Tidak harus selalu ada yang salah untuk memberi dirimu sedikit ruang. Pilih yang paling dekat dengan keadaanmu saat ini.
            </p>
            <p className="mt-1 text-[13px] text-inkmuted">Tidak ada jawaban yang benar atau salah.</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {STATES.map((s) => (
              <button key={s.id} type="button" onClick={() => setStateId(s.id)}
                className={`${card} flex items-start gap-3 text-left transition hover:border-leaf active:scale-[0.99] ${ring}`}>
                <span aria-hidden="true" className="text-2xl">{s.emoji}</span>
                <span>
                  <span className="block font-serif text-[16px] font-semibold text-ink">{s.label}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-relaxed text-inkmuted">{s.desc}</span>
                </span>
              </button>
            ))}
          </div>

          <section className="mt-4 flex flex-col gap-4 rounded-organic border border-terracotta/30 bg-terracotta/10 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span aria-hidden="true" className="text-2xl">💬</span>
              <div>
                <h2 className="font-serif text-[16px] font-semibold text-ink">Aku ingin mencari bantuan</h2>
                <p className="mt-0.5 text-[13.5px] leading-relaxed text-inkmuted">Kamu bisa langsung melihat pilihan dukungan profesional atau bantuan formal.</p>
              </div>
            </div>
            <Link to={LINKS.RJ.to} className={`${btn} w-full border border-terracotta/50 text-terracotta-dark hover:bg-terracotta/10 sm:w-auto sm:shrink-0`}>Lihat Rujukan</Link>
          </section>
          <Boundary />
        </>
      )}

      {st && !actId && (
        <>
          <Back onClick={toCheckin}>Bagaimana kabarmu?</Back>
          <p className="text-[13px] text-inkmuted"><span aria-hidden="true">{st.emoji}</span> {st.label}</p>
          <h1 className="mt-1 font-serif text-2xl font-semibold text-ink">Kamu ingin melakukan apa sekarang?</h1>
          <p className="mt-1 text-[14.5px] text-inkmuted">Pilih aktivitas yang terasa paling sesuai. Kamu bisa berhenti kapan saja.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {st.activities.map((id) => (
              <button key={id} type="button" onClick={() => setActId(id)}
                className={`${card} text-left transition hover:border-leaf active:scale-[0.99] ${ring}`}>
                <span className="block font-serif text-[16px] font-semibold text-ink">{ACTIVITIES[id].title}</span>
                <span className="mt-1 block text-[13.5px] leading-relaxed text-inkmuted">{ACTIVITIES[id].desc}</span>
              </button>
            ))}
          </div>
          <Boundary />
        </>
      )}

      {st && actId && (
        <>
          <Back onClick={() => setActId(null)}>Pilihan aktivitas</Back>
          <Activity key={actId} act={ACTIVITIES[actId]} onMore={() => setActId(null)} onDone={toCheckin} />
        </>
      )}
    </div>
  )
}
