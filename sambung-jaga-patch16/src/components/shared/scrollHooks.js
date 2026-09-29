import { useEffect, useRef, useState } from 'react'

// Fires once when the element enters the viewport (used for one-time reveal
// animations — fade/slide-in, staggered cards, etc).
export function useInView(threshold = 0.25, once = true) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, once])

  return [ref, inView]
}

// Continuous 0→1 progress of how far a section has travelled through the
// viewport: 0 when its top just reaches the bottom of the screen, 1 when its
// bottom reaches the top. Used to tie network-connection state to scroll
// position rather than a single fade-in.
export function useScrollProgress() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function measure() {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const total = rect.height + vh
      const covered = vh - rect.top
      setProgress(Math.min(1, Math.max(0, covered / total)))
    }

    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return [ref, progress]
}
