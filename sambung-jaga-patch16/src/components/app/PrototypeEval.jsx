import React from 'react'
import { useApp } from '../../context/AppContext.jsx'

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-ink/10 py-2.5 text-[13px]">
      <span className="text-inkmuted">{label}</span>
      <span className="font-medium text-ink">{String(value)}</span>
    </div>
  )
}

export default function PrototypeEval({ onClose }) {
  const { evalIndicators } = useApp()
  const i = evalIndicators

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-[420px] overflow-y-auto rounded-t-organic bg-cream p-6 shadow-2xl sm:rounded-organic"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-ink">Evaluasi Prototipe</h2>
          <button onClick={onClose} className="text-inkmuted">✕</button>
        </div>
        <p className="mt-2 text-[12.5px] leading-relaxed text-inkmuted">
          Indikator keterlibatan penggunaan prototipe — bukan bukti efektivitas psikologis.
        </p>

        <div className="mt-5">
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-leaf-dark">Agency</h3>
          <Row label="Onboarding selesai" value={i.onboardingCompletion} />
          <Row label="Kabar Ta' terisi" value={i.kabarTaCompletion} />
          <Row label="Jalur yang pernah dipilih" value={i.selectedPathways.join(', ') || '—'} />
        </div>

        <div className="mt-5">
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-leaf-dark">Reciprocity</h3>
          <Row label="Pernah butuh & bisa membantu" value={i.bothNeedAndOffer} />
        </div>

        <div className="mt-5">
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-leaf-dark">Continuity</h3>
          <Row label="Koneksi berhasil dibuat" value={i.successfulConnections} />
          <Row label="Tali Jaga berlanjut (>1x)" value={i.taliJagaContinuation} />
        </div>

        <div className="mt-5">
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-leaf-dark">Community capacity</h3>
          <Row label="RSVP Lingkar Jaga" value={i.lingkarRSVPs} />
        </div>

        <div className="mt-5">
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-leaf-dark">Safety</h3>
          <Row label="Aktivitas Ruang Pulih selesai" value={`${i.ruangPulihCompleted}/${i.ruangPulihTotal}`} />
          <Row label="Kunjungan Rujukan" value={i.rujukanVisits} />
        </div>
      </div>
    </div>
  )
}
