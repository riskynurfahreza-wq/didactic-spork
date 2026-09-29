import React from 'react'
import NetworkCanvas from '../../shared/NetworkCanvas.jsx'
import { useInView } from '../../shared/scrollHooks.js'
import { NETWORK_LEFT, NETWORK_RIGHT, NETWORK_EDGES } from './principlesData.js'

const leftY = [0.15, 0.4, 0.65, 0.9]
const rightY = [0.08, 0.248, 0.416, 0.584, 0.752, 0.92]

const NODES = [
  ...NETWORK_LEFT.map((_, i) => ({ x: 0.16, y: leftY[i], color: '#4A7C59', r: 6 })),
  ...NETWORK_RIGHT.map((_, i) => ({ x: 0.84, y: rightY[i], color: '#C97B5B', r: 5 })),
]

export default function OverlapNetwork() {
  const [ref, inView] = useInView(0.2)

  return (
    <section ref={ref} className="bg-cream px-5 py-24 sm:px-8">
      <h2 className={`reveal mx-auto max-w-xl text-center font-serif text-3xl font-semibold text-ink sm:text-4xl ${inView ? 'in' : ''}`}>
        Sebuah sistem yang saling terhubung, bukan kumpulan fitur terpisah.
      </h2>

      <div className="relative mx-auto mt-12 h-[420px] w-full max-w-2xl">
        <NetworkCanvas
          nodes={NODES}
          edges={NETWORK_EDGES}
          connectedRatio={inView ? 1 : 0.05}
          idle={false}
          lineColor="#4A7C59"
        />
        {NETWORK_LEFT.map((name, i) => (
          <span
            key={name}
            className="pointer-events-none absolute -translate-y-1/2 whitespace-nowrap pl-3 text-[13.5px] font-medium text-ink"
            style={{ left: '16%', top: `${leftY[i] * 100}%` }}
          >
            {name}
          </span>
        ))}
        {NETWORK_RIGHT.map((name, i) => (
          <span
            key={name}
            className="pointer-events-none absolute -translate-x-full -translate-y-1/2 whitespace-nowrap pr-3 text-[13px] text-inkmuted"
            style={{ left: '84%', top: `${rightY[i] * 100}%` }}
          >
            {name}
          </span>
        ))}
      </div>

      <p className={`reveal mx-auto mt-6 max-w-md text-center text-[13.5px] text-inkmuted ${inView ? 'in' : ''}`}>
        Setiap prinsip diwujudkan lewat beberapa fitur — dan setiap fitur mendukung lebih dari satu
        prinsip.
      </p>
    </section>
  )
}
