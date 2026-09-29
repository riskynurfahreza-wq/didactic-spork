import React from 'react'
import NetworkCanvas from '../../shared/NetworkCanvas.jsx'

const NODES = [
  { x: 0.08, y: 0.3, color: '#4A7C59' },
  { x: 0.18, y: 0.55, color: '#6E9A7B' },
  { x: 0.28, y: 0.2, color: '#C97B5B' },
  { x: 0.35, y: 0.68, color: '#4A7C59' },
  { x: 0.45, y: 0.35, color: '#E8B08A' },
  { x: 0.52, y: 0.6, color: '#6E9A7B' },
  { x: 0.6, y: 0.22, color: '#4A7C59' },
  { x: 0.68, y: 0.48, color: '#C97B5B' },
  { x: 0.75, y: 0.72, color: '#4A7C59' },
  { x: 0.82, y: 0.28, color: '#6E9A7B' },
  { x: 0.9, y: 0.55, color: '#E8B08A' },
  { x: 0.15, y: 0.82, color: '#C97B5B' },
]

// Deliberately sparse — this is "the crisis" moment, not yet reconnecting.
// The reconnection story is told at the end of the page (Closing.jsx), not here.
const EDGES = [
  [0, 1], [2, 4], [6, 9], [7, 8],
  [11, 3], [9, 10],
]

export default function Hero() {
  return (
    <section className="relative flex min-h-[100vh] items-center overflow-hidden bg-cream">
      <NetworkCanvas nodes={NODES} edges={EDGES} connectedRatio={0.55} lineColor="#4A7C59" />

      <div className="relative z-10 mx-auto max-w-xl px-5 text-center sm:px-8">
        <h1 className="font-serif text-4xl font-semibold leading-[1.15] text-ink sm:text-5xl">
          Krisis mungkin berakhir.
          <br />
          Kepedulian tidak harus ikut berakhir.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-inkmuted">
          Sambung Jaga adalah inisiatif berbasis komunitas yang dirancang untuk menjaga dukungan
          sosial, sumber daya, dan aksi kolektif tetap terhubung sepanjang proses pemulihan
          pascabencana.
        </p>
      </div>
    </section>
  )
}
