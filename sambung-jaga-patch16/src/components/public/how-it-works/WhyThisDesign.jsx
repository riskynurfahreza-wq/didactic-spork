import React, { useState } from 'react'
import { FOUNDATIONS, CAPITAL_LAYERS, LINKING_EXAMPLES } from './principlesData.js'

function CapitalVenn() {
  return (
    <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-10">
      <svg viewBox="0 0 220 160" className="h-36 w-48 shrink-0">
        <circle cx="90" cy="70" r="58" fill="#4A7C59" opacity="0.28" />
        <circle cx="130" cy="70" r="58" fill="#C97B5B" opacity="0.28" />
        <circle cx="110" cy="110" r="58" fill="#E8B08A" opacity="0.32" />
        <text x="62" y="55" className="fill-leaf-dark text-[11px] font-semibold">Bonding</text>
        <text x="140" y="55" className="fill-terracotta-dark text-[11px] font-semibold">Bridging</text>
        <text x="92" y="145" className="fill-ink text-[11px] font-semibold">Linking</text>
      </svg>
      <ul className="space-y-2 text-left">
        {CAPITAL_LAYERS.map((l) => (
          <li key={l.name} className="text-[13.5px] leading-relaxed text-inkmuted">
            <span className="font-semibold text-ink">{l.name}</span> — {l.desc}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function WhyThisDesign() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mx-auto flex items-center gap-1.5 rounded-full border border-ink/15 px-5 py-2.5 text-[13.5px] font-medium text-inkmuted transition hover:border-ink/30 hover:text-ink"
      >
        Kenapa desain ini? <span className="text-[15px]">{open ? '\u2212' : '+'}</span>
      </button>

      {open && (
        <div className="animate-rise mt-6 rounded-organic border border-ink/10 bg-white/70 p-7 sm:p-9">
          <div className="grid gap-6 sm:grid-cols-2">
            {FOUNDATIONS.map((f) => (
              <div key={f.title}>
                <h4 className="font-serif text-lg font-semibold text-ink">{f.title}</h4>
                <p className="mt-1.5 text-[14px] leading-relaxed text-inkmuted">{f.body}</p>
                <p className="mt-2 text-[11.5px] font-semibold uppercase tracking-wide text-terracotta-dark">
                  {f.tag}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-ink/10 pt-6 text-center">
            <p className="text-[13.5px] text-inkmuted">
              Ini bukan kotak satu-fitur — tiap lapisan modal sosial muncul di beberapa fitur
              sekaligus. Sebagai contoh, modal sosial <span className="font-medium text-ink">linking</span>{' '}
              didukung melalui:
            </p>
            <ul className="mx-auto mt-3 max-w-md space-y-1.5 text-left">
              {LINKING_EXAMPLES.map((e) => (
                <li key={e} className="text-[13.5px] leading-relaxed text-inkmuted">
                  · {e}
                </li>
              ))}
            </ul>
          </div>

          <CapitalVenn />
        </div>
      )}
    </div>
  )
}
