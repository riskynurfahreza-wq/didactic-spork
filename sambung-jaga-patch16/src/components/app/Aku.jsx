import React, { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { CATEGORIES, RUANG_PULIH_CONTENT } from '../../lib/dummyData.js'
import { clearAll } from '../../lib/storage.js'
import PrototypeEval from './PrototypeEval.jsx'

export default function Aku() {
  const { state } = useApp()
  const [showEval, setShowEval] = useState(false)
  const [tapCount, setTapCount] = useState(0)

  const doneActivities = Object.values(RUANG_PULIH_CONTENT)
    .flatMap((c) => c.activities)
    .filter((a) => state.ruangPulihDone.includes(a.id))

  const activeConns = state.connections.filter((c) => c.status === 'active')
  const offeredCats = [...new Set(state.offers.map((o) => o.categoryId))]
    .map((id) => CATEGORIES.find((c) => c.id === id))
    .filter(Boolean)

  const handleTitleTap = () => {
    const next = tapCount + 1
    setTapCount(next)
    if (next >= 5) {
      setShowEval(true)
      setTapCount(0)
    }
  }

  const handleReset = () => {
    if (confirm('Hapus semua data prototipe di perangkat ini?')) {
      clearAll()
      window.location.reload()
    }
  }

  return (
    <div className="px-5 pb-10 pt-5">
      <button onClick={handleTitleTap} className="text-left">
        <h1 className="font-serif text-2xl font-semibold text-ink">Ruangku</h1>
      </button>

      <div className="mt-6">
        <h3 className="font-serif text-[15px] font-semibold text-ink">🌱 Yang pernah saya coba</h3>
        {doneActivities.length === 0 ? (
          <p className="mt-2 text-[13.5px] text-inkmuted">Belum ada aktivitas yang dicoba.</p>
        ) : (
          <ul className="mt-2 space-y-1.5">
            {doneActivities.map((a) => (
              <li key={a.id} className="text-[13.5px] text-inkmuted">
                ✓ {a.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-serif text-[15px] font-semibold text-ink">🫂 Tali Jaga saya</h3>
        {activeConns.length === 0 ? (
          <p className="mt-2 text-[13.5px] text-inkmuted">Belum ada Tali Jaga yang aktif.</p>
        ) : (
          <ul className="mt-2 space-y-1.5">
            {activeConns.map((c) => (
              <li key={c.id} className="text-[13.5px] text-inkmuted">
                Dengan {c.withInitial} · {c.duration}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-serif text-[15px] font-semibold text-ink">👐 Yang bisa saya bantu</h3>
        {offeredCats.length === 0 ? (
          <p className="mt-2 text-[13.5px] text-inkmuted">Belum ada kemampuan yang ditawarkan.</p>
        ) : (
          <div className="mt-2 flex flex-wrap gap-2">
            {offeredCats.map((c) => (
              <span key={c.id} className="rounded-full bg-sand px-3 py-1 text-[12.5px] text-ink">
                {c.emoji} {c.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 rounded-organic border border-ink/10 bg-white/70 p-4">
        <h3 className="font-serif text-[15px] font-semibold text-ink">🔒 Privasi</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-inkmuted">
          Nama Anda ditampilkan sebagai inisial. Lokasi hanya ditampilkan pada tingkat area umum
          (RW/kelurahan), bukan alamat lengkap. Riwayat check-in bersifat privat dan hanya terlihat
          oleh Anda.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-serif text-[15px] font-semibold text-ink">⚙️ Pengaturan</h3>
        <button
          onClick={handleReset}
          className="mt-3 w-full rounded-full border border-terracotta/40 px-4 py-2.5 text-[13.5px] font-medium text-terracotta-dark"
        >
          Hapus data prototipe di perangkat ini
        </button>
      </div>

      {showEval && <PrototypeEval onClose={() => setShowEval(false)} />}
    </div>
  )
}
