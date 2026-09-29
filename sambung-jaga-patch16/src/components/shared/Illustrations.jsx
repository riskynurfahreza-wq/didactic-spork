import React from 'react'

// Abstract organic illustration: connected forms, threads, hands — no literal figures, no stock imagery.
export function ThreadsIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 480 480"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ilustrasi bentuk organik yang saling terhubung"
    >
      <defs>
        <linearGradient id="tg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4A7C59" />
          <stop offset="100%" stopColor="#6E9A7B" />
        </linearGradient>
      </defs>
      <circle cx="240" cy="240" r="200" fill="#EDE7D9" />
      <path
        className="thread-line"
        d="M95 260 C 150 180, 210 180, 240 240 C 270 300, 340 300, 385 220"
        stroke="#C97B5B"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        style={{ animationDelay: '0s' }}
      />
      <path
        className="thread-line"
        d="M110 340 C 170 300, 220 340, 260 300 C 300 260, 360 260, 395 320"
        stroke="#4A7C59"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        style={{ animationDelay: '1.4s' }}
      />
      <circle className="thread-node" style={{ animationDelay: '0s' }} cx="150" cy="200" r="34" fill="url(#tg1)" />
      <circle className="thread-node" style={{ animationDelay: '0.5s' }} cx="270" cy="150" r="22" fill="#C97B5B" />
      <circle className="thread-node" style={{ animationDelay: '1s' }} cx="330" cy="260" r="46" fill="#4A7C59" opacity="0.9" />
      <circle className="thread-node" style={{ animationDelay: '1.6s' }} cx="200" cy="320" r="28" fill="#E8B08A" opacity="0.9" />
      <circle className="thread-node" style={{ animationDelay: '2.1s' }} cx="360" cy="150" r="16" fill="#375E43" />
      <circle className="thread-node" style={{ animationDelay: '2.7s' }} cx="120" cy="330" r="14" fill="#A85F42" />
    </svg>
  )
}

export function HandsIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ilustrasi dua bentuk organik saling menopang"
    >
      <ellipse cx="200" cy="150" rx="190" ry="140" fill="#F5F1E8" />
      <path
        d="M70 190 C 90 140, 150 120, 190 150 C 200 158, 200 172, 190 180 C 150 210, 90 220, 70 190 Z"
        fill="#C97B5B"
        opacity="0.9"
      />
      <path
        d="M330 170 C 310 120, 250 100, 210 130 C 200 138, 200 152, 210 160 C 250 190, 310 200, 330 170 Z"
        fill="#4A7C59"
        opacity="0.9"
      />
      <circle cx="200" cy="155" r="10" fill="#2E2A22" opacity="0.15" />
    </svg>
  )
}

export function CircleIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ilustrasi lingkaran orang-orang kecil yang saling terhubung"
    >
      <circle cx="150" cy="150" r="90" fill="none" stroke="#4A7C59" strokeWidth="2" strokeDasharray="4 8" opacity="0.5" />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x = 150 + 90 * Math.cos(rad)
        const y = 150 + 90 * Math.sin(rad)
        const colors = ['#4A7C59', '#C97B5B', '#6E9A7B', '#A85F42', '#4A7C59', '#C97B5B']
        return <circle key={i} cx={x} cy={y} r="16" fill={colors[i]} opacity="0.9" />
      })}
      <circle cx="150" cy="150" r="10" fill="#2E2A22" opacity="0.7" />
    </svg>
  )
}
