import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef<any>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.02, rootMargin: '0px 0px 60px 0px', ...options }
    );
    obs.observe(el);

    // Resilient fallback: ensure visibility
    const timer = setTimeout(() => {
      if (el) el.classList.add('visible');
    }, 1200);

    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);
  return ref;
}

export function useRevealChildren() {
  const ref = useRef<any>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const els = container.querySelectorAll('.reveal');

    // Immediately reveal elements already inside or above viewport
    els.forEach((el: Element) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        el.classList.add('visible');
      }
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.02, rootMargin: '0px 0px 80px 0px' }
    );
    els.forEach((el: Element) => obs.observe(el));

    // Resilient fallback: ensure everything is visible after 1.2s max
    const timer = setTimeout(() => {
      els.forEach((el: Element) => el.classList.add('visible'));
    }, 1200);

    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);
  return ref;
}
