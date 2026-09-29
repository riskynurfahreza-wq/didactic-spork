import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FEATURE_ROUTES } from './principlesData.js'
import { useInView } from '../../shared/scrollHooks.js'

export default function PrincipleCard({ principle }) {
  const [ref, inView] = useInView(0.3)
  const navigate = useNavigate()

  return (
    <div ref={ref} className={`reveal rounded-organic border border-ink/10 bg-white/70 p-7 ${inView ? 'in' : ''}`}>
      <p className="text-[12px] font-semibold tracking-widest text-terracotta-dark">{principle.n}</p>
      <h3 className="mt-1 font-serif text-2xl font-semibold text-ink">{principle.name}</h3>

      <p className="mt-4 text-[14.5px] italic leading-relaxed text-inkmuted">&#8220;{principle.insight}&#8221;</p>
      <p className="mt-4 text-[15.5px] font-medium leading-snug text-leaf-dark">{principle.principle}</p>

      <p className="mt-5 text-[11.5px] font-semibold uppercase tracking-wide text-ink/40">Didukung melalui</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {principle.features.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => FEATURE_ROUTES[f] && navigate(FEATURE_ROUTES[f])}
            className="rounded-full border border-leaf/30 bg-leaf/10 px-3 py-1.5 text-[13px] font-medium text-leaf-dark transition hover:bg-leaf/20"
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  )
}
