import React, { useEffect, useRef } from 'react'

// Draws `nodes` (normalized 0-1 coordinates) connected by a subset of `edges`.
// `connectedRatio` (0-1) controls how many edges — in the given order — are
// currently "on"; each edge fades toward its target instead of snapping, so
// scroll-driven changes read as gradual reconnection rather than a toggle.
// Fixed layout + a curated edge order (not random) so the fragmented/connected
// states are legible, not just noisy dots.
export default function NetworkCanvas({
  nodes,
  edges,
  connectedRatio = 0,
  idle = true,
  lineColor = '#4A7C59',
  nodeRadius = 5,
  className = '',
}) {
  const canvasRef = useRef(null)
  const ratioRef = useRef(connectedRatio)
  const drawRef = useRef(() => {})
  ratioRef.current = connectedRatio

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = null

    const positions = nodes.map(() => ({ x: 0, y: 0, vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12 }))
    const edgeAlpha = edges.map(() => 0)

    function layout() {
      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodes.forEach((n, i) => {
        positions[i].x = n.x * w
        positions[i].y = n.y * h
      })
    }
    layout()
    window.addEventListener('resize', layout)

    function curve(x1, y1, x2, y2, alpha) {
      const mx = (x1 + x2) / 2
      const my = (y1 + y2) / 2
      const dx = x2 - x1
      const dy = y2 - y1
      const dist = Math.hypot(dx, dy) || 1
      const off = Math.min(26, dist * 0.16)
      const cx = mx - (dy / dist) * off
      const cy = my + (dx / dist) * off
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.quadraticCurveTo(cx, cy, x2, y2)
      ctx.stroke()
    }

    function draw(lerp) {
      const activeCount = Math.round(ratioRef.current * edges.length)
      edges.forEach((_, i) => {
        const target = i < activeCount ? 1 : 0
        edgeAlpha[i] += (target - edgeAlpha[i]) * lerp
      })

      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1.4
      ctx.strokeStyle = lineColor
      edges.forEach(([a, b], i) => {
        if (edgeAlpha[i] > 0.01) {
          curve(positions[a].x, positions[a].y, positions[b].x, positions[b].y, edgeAlpha[i] * 0.42)
        }
      })
      ctx.globalAlpha = 1

      nodes.forEach((n, i) => {
        const p = positions[i]
        ctx.beginPath()
        ctx.globalAlpha = 0.85
        ctx.fillStyle = n.color || lineColor
        ctx.arc(p.x, p.y, n.r || nodeRadius, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
    }

    drawRef.current = () => draw(1)

    function frame() {
      if (idle) {
        positions.forEach((p) => {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 16 || p.x > w - 16) p.vx *= -1
          if (p.y < 16 || p.y > h - 16) p.vy *= -1
        })
      }
      draw(0.07)
      raf = requestAnimationFrame(frame)
    }

    if (reduceMotion) {
      draw(1)
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', layout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges, idle, lineColor, nodeRadius])

  // Reduced-motion viewers get no rAF loop, so redraw by hand whenever the
  // scroll-driven ratio changes.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawRef.current()
    }
  }, [connectedRatio])

  return (
    <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />
  )
}
