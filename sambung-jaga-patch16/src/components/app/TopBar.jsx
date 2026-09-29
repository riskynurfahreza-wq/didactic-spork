import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const TITLES = {
  '/app': '',
  '/app/ruang-pulih': 'Ruang Pulih',
  '/app/saling-jaga': 'Saling Jaga',
  '/app/tali-jaga': 'Tali Jaga',
  '/app/kita-bisa': 'Kita Bisa',
  '/app/lingkar-jaga': 'Lingkar Jaga',
  '/app/rujukan': 'Rujukan',
  '/app/aku': 'Ruangku',
}

export default function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const title = TITLES[location.pathname] ?? ''

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink/10 bg-cream/95 px-5 pt-[env(safe-area-inset-top,0px)] backdrop-blur">
      <div className="flex h-14 items-center gap-2">
        {location.pathname !== '/app' ? (
          <button
            onClick={() => navigate(-1)}
            aria-label="Kembali"
            className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            ←
          </button>
        ) : (
          <span className="font-serif text-[15px] font-semibold tracking-tight text-leaf-dark">
            SAMBUNG JAGA
          </span>
        )}
        {title && <span className="font-serif text-[15px] font-semibold text-ink">{title}</span>}
      </div>

      <div className="flex h-14 items-center gap-2">
        <button
          onClick={() => navigate('/app/rujukan')}
          aria-label="Rujukan"
          title="Rujukan"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg hover:bg-ink/5"
        >
          🛟
        </button>
        <button
          onClick={() => navigate('/app/aku')}
          aria-label="Ruangku"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf/15 text-sm font-semibold text-leaf-dark hover:bg-leaf/25"
        >
          A
        </button>
      </div>
    </header>
  )
}
