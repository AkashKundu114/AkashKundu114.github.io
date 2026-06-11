import { useEffect, useRef } from 'react'

export default function AmbientBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animId
    let nodes = []
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const count = Math.max(14, Math.min(34, Math.floor((canvas.width * canvas.height) / 42000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.6,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        phase: Math.random() * Math.PI * 2,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const linkDist = 150

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      const rgb = isDark ? '241,240,237' : '17,24,39'

      nodes.forEach(n => {
        n.x += n.vx + Math.sin(t + n.phase) * 0.1
        n.y += n.vy + Math.cos(t + n.phase) * 0.1
        if (n.x < -20) n.x = canvas.width + 20
        if (n.x > canvas.width + 20) n.x = -20
        if (n.y < -20) n.y = canvas.height + 20
        if (n.y > canvas.height + 20) n.y = -20
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.05
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(${rgb},${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      nodes.forEach(n => {
        const alpha = 0.1 + Math.sin(t + n.phase) * 0.04
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${Math.max(alpha, 0.02)})`
        ctx.fill()
      })
    }

    const draw = () => {
      t += 0.01
      frame()
      animId = requestAnimationFrame(draw)
    }

    if (reduceMotion) {
      frame()
    } else {
      draw()
    }

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="ambient-bg" aria-hidden="true" />
}
