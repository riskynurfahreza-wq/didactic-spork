import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import AppHeader from './AppHeader.jsx'

export default function AppShell() {
  return (
    <div className="min-h-[100dvh] bg-cream pt-[env(safe-area-inset-top,0px)] font-sans text-ink">
      <div className="mx-auto max-w-3xl px-5 pt-3">
        <Link
          to="/"
          className="inline-flex rounded-md py-1 text-[13px] text-inkmuted transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
        >
          ← Halaman Utama
        </Link>
      </div>

      <AppHeader />

      <main className="mx-auto w-full max-w-3xl px-5 pb-[calc(3rem+env(safe-area-inset-bottom,0px))] pt-8 sm:pt-12">
        <Outlet />
      </main>
    </div>
  )
}
