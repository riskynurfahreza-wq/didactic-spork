import React from 'react'
import { useNavigate } from 'react-router-dom'
import NetworkCanvas from '../../shared/NetworkCanvas.jsx'
import { useScrollProgress } from '../../shared/scrollHooks.js'

const NODES = [
  { x: 0.1, y: 0.35, color: '#4A7C59' },
  { x: 0.22, y: 0.62, color: '#C97B5B' },
  { x: 0.35, y: 0.25, color: '#6E9A7B' },
  { x: 0.48, y: 0.55, color: '#4A7C59' },
  { x: 0.6, y: 0.3, color: '#E8B08A' },
  { x: 0.72, y: 0.6, color: '#4A7C59' },
  { x: 0.85, y: 0.32, color: '#C97B5B' },
  { x: 0.92, y: 0.62, color: '#6E9A7B' },
  { x: 0.3, y: 0.82, color: '#4A7C59' },
  { x: 0.65, y: 0.85, color: '#E8B08A' },
]

// Ordered fragmented -> connected: early pairs first, long bridges last, so
// the reveal genuinely reads as scattered pockets joining into one network.
const EDGES = [
  [0, 1], [2, 3], [5, 6], [8, 1],
  [3, 4], [6, 7], [9, 5],
  [1, 3], [4, 6], [0, 8],
  [2, 4], [7, 9], [1, 5],
]

export default function Closing() {
  const [sectionRef, progress] = useScrollProgress()
  const navigate = useNavigate()
  const connectedRatio = 0.1 + progress * 0.75

  return (
    <section ref={sectionRef} className="relative flex min-h-[90vh] items-center overflow-hidden bg-cream">
      <NetworkCanvas nodes={NODES} edges={EDGES} connectedRatio={connectedRatio} lineColor="#4A7C59" />

      <div className="relative z-10 mx-auto max-w-xl px-5 text-center sm:px-8">
        <p className="font-serif text-3xl font-semibold leading-snug text-ink sm:text-4xl">
          Jaga kepedulian tetap terhubung.
        </p>
        <button
          onClick={() => navigate('/how-it-works')}
          className="mt-8 inline-flex rounded-full bg-leaf px-7 py-3.5 text-[15px] font-medium text-cream shadow-soft transition hover:bg-leaf-dark"
        >
          Lihat Cara Kerjanya →
        </button>
      </div>
    </section>
  )
}
