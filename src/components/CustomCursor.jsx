import { useEffect, useRef } from 'react'

// Elements that should trigger the "interactive" cursor state
const HOVER_SELECTOR =
  'a, button, input, textarea, select, [role="button"], .card-hover, .row-card, .tag, .nav-link, .theme-toggle'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only take over the cursor on devices with a real pointing device.
    // Touchscreens / coarse pointers keep their native behaviour untouched.
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.classList.add('custom-cursor-active')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let hovering = false
    let pressed = false
    let revealed = false

    const reveal = () => {
      if (revealed) return
      revealed = true
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }
    const hide = () => {
      revealed = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      reveal()
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
    }
    const onOver = (e) => { hovering = !!e.target.closest?.(HOVER_SELECTOR) }
    const onDown = () => { pressed = true }
    const onUp = () => { pressed = false }
    const onWindowLeave = () => hide()

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onWindowLeave)

    // Reduced motion: follow instantly instead of lagging behind.
    const ease = reduceMotion ? 1 : 0.2
    let raf
    const loop = () => {
      rx += (mx - rx) * ease
      ry += (my - ry) * ease
      const scale = pressed ? 0.75 : hovering ? 1.9 : 1
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`
      ring.style.borderColor = hovering ? 'var(--accent)' : 'var(--accent-2)'
      ring.style.background = hovering ? 'var(--accent-soft)' : 'transparent'
      dot.style.background = hovering ? 'var(--accent)' : 'var(--ink)'
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onWindowLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
