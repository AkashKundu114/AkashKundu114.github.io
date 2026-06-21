import { useEffect, useRef } from 'react'

export default function AmbientBackground() {
  const canvasRef = useRef(null)
  const blobRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animId
    let motes = []
    let t = 0

    // mouse-follow glow blob state
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let bx = mx
    let by = my

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const count = Math.max(7, Math.min(16, Math.floor((canvas.width * canvas.height) / 110000)))
      motes = Array.from({ length: count }, () => ({
        ox: Math.random() * canvas.width,
        oy: Math.random() * canvas.height,
        x: 0,
        y: 0,
        r: Math.random() * 2.6 + 0.6,
        fx: 0.05 + Math.random() * 0.09,
        fy: 0.04 + Math.random() * 0.08,
        ax: canvas.width  * (0.02 + Math.random() * 0.03),
        ay: canvas.height * (0.02 + Math.random() * 0.03),
        px: Math.random() * Math.PI * 2,
        py: Math.random() * Math.PI * 2,
        baseAlpha: 0.06 + Math.random() * 0.08,
        flickerSpeed: 0.15 + Math.random() * 0.35,
        flickerPhase: Math.random() * Math.PI * 2,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      // dark: Powder Blue dust on Deep Blue · light: Deep Blue dust on Floral White
      const rgb = isDark ? '175,210,250' : '24,35,80'

      motes.forEach(m => {
        m.x = m.ox + Math.sin(t * m.fx + m.px) * m.ax
        m.y = m.oy + Math.cos(t * m.fy + m.py) * m.ay
        const flicker = 0.65 + 0.35 * Math.sin(t * m.flickerSpeed + m.flickerPhase)
        const alpha = m.baseAlpha * flicker

        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${alpha})`
        ctx.fill()
      })

      if (blobRef.current) {
        bx += (mx - bx) * 0.045
        by += (my - by) * 0.045
        blobRef.current.style.transform = `translate(${bx - 210}px, ${by - 210}px)`
      }
    }

    const draw = () => {
      t += 0.35
      frame()
      animId = requestAnimationFrame(draw)
    }

    if (reduceMotion) frame()
    else draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div ref={blobRef} className="ambient-blob" aria-hidden="true" />
      <canvas ref={canvasRef} className="ambient-bg" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
    </>
  )
}
