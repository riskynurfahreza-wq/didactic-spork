import React from 'react'
import { useInView } from '../../shared/scrollHooks.js'

export default function CoreIdea() {
  const [ref, inView] = useInView(0.35)

  return (
    <section ref={ref} className="bg-sand/40 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className={`reveal font-serif text-3xl font-semibold leading-snug text-ink sm:text-4xl ${inView ? 'in' : ''}`}>
          Tantangannya bukan menciptakan solidaritas.
          <br />
          Tapi menjaga solidaritas itu tetap terhubung.
        </p>

        <svg viewBox="0 0 120 24" className="mx-auto mt-8 h-5 w-28">
          <circle cx="8" cy="12" r="4" fill="#4A7C59" />
          <circle cx="112" cy="12" r="4" fill="#C97B5B" />
          <path
            d="M14 12 H106"
            stroke="#4A7C59"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="1"
            className="draw-line"
            style={{ transitionDelay: inView ? '0.45s' : '0s', strokeDashoffset: inView ? 0 : 1 }}
          />
        </svg>

        <p
          className={`reveal mt-8 text-[15.5px] leading-relaxed text-inkmuted ${inView ? 'in' : ''}`}
          style={{ transitionDelay: '0.55s' }}
        >
          Sambung Jaga dibangun di atas praktik saling membantu yang sudah ada, membantu komunitas
          menjaga hubungan antara kebutuhan, sumber daya, orang, dan dukungan seiring berjalannya
          proses pemulihan.
        </p>
      </div>
    </section>
  )
}
