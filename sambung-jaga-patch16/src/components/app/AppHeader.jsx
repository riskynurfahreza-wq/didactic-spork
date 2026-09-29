import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-cream'

export default function AppHeader() {
  return (
    <header className="border-b border-ink/10">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5">
        <Link
          to="/app"
          className={`rounded-md font-serif text-[18px] font-semibold tracking-tight text-leaf-dark ${focusRing}`}
        >
          Sambung Jaga
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/app/tentang"
            aria-label="Tentang Sambung Jaga"
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-[15px] font-semibold text-inkmuted transition hover:bg-ink/5 active:bg-ink/10 ${focusRing}`}
          >
            ?
          </Link>
          <NavLink
            to="/app/profil"
            className={({ isActive }) =>
              `flex h-10 items-center justify-center rounded-full border px-4 text-[14px] font-medium transition active:bg-ink/10 ${focusRing} ${
                isActive
                  ? 'border-leaf bg-leaf/10 text-leaf-dark'
                  : 'border-ink/15 text-ink hover:bg-ink/5'
              }`
            }
          >
            Profil
          </NavLink>
        </div>
      </div>
    </header>
  )
}
