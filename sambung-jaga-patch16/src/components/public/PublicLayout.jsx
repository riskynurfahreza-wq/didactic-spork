import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/features', label: 'Features' },
]

export default function PublicLayout() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cream text-ink font-sans">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <NavLink to="/" className="font-serif text-lg font-semibold tracking-tight text-leaf-dark">
            SAMBUNG JAGA
          </NavLink>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `text-[15px] transition-colors ${
                    isActive ? 'text-leaf-dark font-semibold' : 'text-inkmuted hover:text-ink'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => navigate('/app')}
            className="hidden rounded-full bg-leaf px-5 py-2.5 text-[15px] font-medium text-cream shadow-card transition hover:bg-leaf-dark md:inline-block"
          >
            Mulai Sambung Jaga
          </button>

          <button
            aria-label="Buka menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-lg">{open ? '✕' : '☰'}</span>
          </button>
        </div>

        {open && (
          <div className="border-t border-ink/10 bg-cream px-5 py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-[15px] ${isActive ? 'font-semibold text-leaf-dark' : 'text-inkmuted'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <button
                onClick={() => navigate('/app')}
                className="mt-2 rounded-full bg-leaf px-5 py-2.5 text-[15px] font-medium text-cream"
              >
                Mulai Sambung Jaga
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-ink/10 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="font-serif text-base font-semibold text-leaf-dark">SAMBUNG JAGA</div>
            <p className="mt-1 max-w-sm text-sm text-inkmuted">
              Saling bantu saat krisis, saling jaga setelahnya.
            </p>
          </div>
          <p className="text-xs text-inkmuted">Prototipe produk · data yang ditampilkan bersifat contoh.</p>
        </div>
      </footer>
    </div>
  )
}
