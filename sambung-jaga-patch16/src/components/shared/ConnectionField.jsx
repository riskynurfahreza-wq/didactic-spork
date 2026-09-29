import React, { useEffect, useRef } from 'react'

// Ambient "living network" background: soft nodes drifting slowly, connected by
// organic curves, gently drawn toward the cursor. Pure canvas, no dependency —
// kept restrained (low node count, slow speed, muted palette) on purpose so it
// reads as calm texture behind the hero text, not a flashy tech-startup effect.

const COLORS = ['#4A7C59', '#6E9A7B', '#C97B5B', '#A85F42', '#E8B08A', '#375E43']
const NODE_COUNT = 25
const LINK_DIST = 150
const CURSOR_DIST = 170
const NODE_ALPHA = 0.32
const LINE_ALPHA = 0.16

export default function ConnectionField({ className = '' }) {
  const canvasRef = useRef(null)
  const nodesRef = useRef([])
  const cursorRef = useRef(null)
  const rafRef = useRef(null)
  const sizeRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function resize() {
      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      sizeRef.current = { w: rect.width, h: rect.height }
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function initNodes() {
      const { w, h } = sizeRef.current
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 3 + Math.random() * 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    resize()
    initNodes()

    function handleResize() {
      resize()
      const { w, h } = sizeRef.current
      nodesRef.current.forEach((n) => {
        n.x = Math.min(n.x, w)
        n.y = Math.min(n.y, h)
      })
    }
    window.addEventListener('resize', handleResize)

    function handleMove(e) {
      const rect = parent.getBoundingClientRect()
      cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    function handleLeave() {
      cursorRef.current = null
    }
    parent.addEventListener('mousemove', handleMove)
    parent.addEventListener('mouseleave', handleLeave)

    function curve(x1, y1, x2, y2, alpha, color) {
      const mx = (x1 + x2) / 2
      const my = (y1 + y2) / 2
      const dx = x2 - x1
      const dy = y2 - y1
      const dist = Math.hypot(dx, dy) || 1
      const off = Math.min(18, dist * 0.12)
      const cx = mx - (dy / dist) * off
      const cy = my + (dx / dist) * off
      ctx.strokeStyle = color
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.quadraticCurveTo(cx, cy, x2, y2)
      ctx.stroke()
    }

    function step() {
      const { w, h } = sizeRef.current
      const nodes = nodesRef.current
      const cursor = cursorRef.current

      if (!reduceMotion) {
        nodes.forEach((n) => {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
          n.x = Math.max(0, Math.min(w, n.x))
          n.y = Math.max(0, Math.min(h, n.y))

          if (cursor) {
            const dx = cursor.x - n.x
            const dy = cursor.y - n.y
            const d = Math.hypot(dx, dy)
            if (d < CURSOR_DIST && d > 0.001) {
              n.vx += (dx / d) * 0.0025
              n.vy += (dy / d) * 0.0025
            }
          }
          const speed = Math.hypot(n.vx, n.vy)
          const maxSpeed = 0.5
          if (speed > maxSpeed) {
            n.vx = (n.vx / speed) * maxSpeed
            n.vy = (n.vy / speed) * maxSpeed
          }
        })
      }

      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1.2

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DIST) {
            curve(a.x, a.y, b.x, b.y, (1 - d / LINK_DIST) * LINE_ALPHA, '#4A7C59')
          }
        }
        if (cursor) {
          const a = nodes[i]
          const d = Math.hypot(a.x - cursor.x, a.y - cursor.y)
          if (d < CURSOR_DIST) {
            curve(a.x, a.y, cursor.x, cursor.y, (1 - d / CURSOR_DIST) * (LINE_ALPHA + 0.14), '#C97B5B')
          }
        }
      }

      ctx.globalAlpha = NODE_ALPHA
      nodes.forEach((n) => {
        ctx.fillStyle = n.color
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      if (!reduceMotion && document.visibilityState === 'visible') {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    step()

    function handleVisibility() {
      cancelAnimationFrame(rafRef.current)
      if (document.visibilityState === 'visible') step()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
      parent.removeEventListener('mousemove', handleMove)
      parent.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />
  )
}
