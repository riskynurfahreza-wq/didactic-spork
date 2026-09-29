import React from 'react'
import { NavLink } from 'react-router-dom'

const ITEMS = [
  { to: '/app', label: 'Beranda', emoji: '🏠', end: true },
  { to: '/app/saling-jaga', label: 'Saling Jaga', emoji: '🫂' },
  { to: '/app/tali-jaga', label: 'Tali Jaga', emoji: '🧵' },
  { to: '/app/kita-bisa', label: 'Kita Bisa', emoji: '🌿' },
  { to: '/app/lingkar-jaga', label: 'Lingkar', emoji: '🗣️' },
]

export default function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-30 border-t border-ink/10 bg-cream/95 backdrop-blur">
      <div className="flex items-stretch justify-between px-1 pb-[env(safe-area-inset-bottom,0px)]">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10.5px] transition-colors ${
                isActive ? 'text-leaf-dark' : 'text-inkmuted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`text-lg transition-transform ${isActive ? 'scale-110' : ''}`}>
                  {item.emoji}
                </span>
                <span className={isActive ? 'font-semibold' : ''}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
