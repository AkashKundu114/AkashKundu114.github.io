import { useEffect, useRef } from 'react'
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }, { threshold: 0.08, ...options })
    observer.observe(el); return () => observer.disconnect()
  }, [])
  return ref
}
export function useRevealChildren() {
  const containerRef = useRef(null)
  useEffect(() => {
    const container = containerRef.current; if (!container) return
    const children = container.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) } })
    }, { threshold: 0.08 })
    children.forEach(el => observer.observe(el)); return () => observer.disconnect()
  }, [])
  return containerRef
}
