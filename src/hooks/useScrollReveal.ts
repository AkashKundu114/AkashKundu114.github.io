import { useEffect, useRef, type RefObject } from 'react';

export interface ScrollRevealOptions extends IntersectionObserverInit {
  fallbackDelayMs?: number;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): RefObject<T | null> {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const targetElement = elementRef.current;
    if (!targetElement) return;

    if (typeof targetElement.isConnected === 'boolean' && !targetElement.isConnected) {
      return;
    }

    if (typeof window === 'undefined') return;

    const elementRect = targetElement.getBoundingClientRect();
    const isInitiallyInViewport = elementRect.top < window.innerHeight && elementRect.bottom > 0;

    if (isInitiallyInViewport) {
      targetElement.classList.add('visible');
      return;
    }

    if (!('IntersectionObserver' in window)) {
      targetElement.classList.add('visible');
      return;
    }

    const { fallbackDelayMs = 1200, ...observerInit } = options;

    const localObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observerInstance: IntersectionObserver) => {
        const activeObserver = observerInstance || localObserver;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target) {
            entry.target.classList.add('visible');
            if (typeof activeObserver?.unobserve === 'function') {
              activeObserver.unobserve(entry.target);
            }
          }
        }
      },
      {
        threshold: 0.02,
        rootMargin: '0px 0px 60px 0px',
        ...observerInit,
      }
    );

    localObserver.observe(targetElement);

    const fallbackTimerId = window.setTimeout(() => {
      if (targetElement && targetElement.isConnected) {
        targetElement.classList.add('visible');
      }
    }, fallbackDelayMs);

    return () => {
      localObserver.disconnect();
      window.clearTimeout(fallbackTimerId);
    };
  }, [options]);

  return elementRef;
}

export function useRevealChildren<T extends HTMLElement = HTMLDivElement>(
  fallbackDelayMs = 1200
): RefObject<T | null> {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    if (typeof containerElement.isConnected === 'boolean' && !containerElement.isConnected) {
      return;
    }

    if (typeof window === 'undefined') return;

    const revealChildren = Array.from(containerElement.querySelectorAll<HTMLElement>('.reveal'));

    if (revealChildren.length === 0) return;

    const viewportThreshold = window.innerHeight + 100;
    for (const child of revealChildren) {
      const childRect = child.getBoundingClientRect();
      if (childRect.top < viewportThreshold) {
        child.classList.add('visible');
      }
    }

    if (!('IntersectionObserver' in window)) {
      revealChildren.forEach((child) => child.classList.add('visible'));
      return;
    }

    const localObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observerInstance: IntersectionObserver) => {
        const activeObserver = observerInstance || localObserver;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target) {
            entry.target.classList.add('visible');
            if (typeof activeObserver?.unobserve === 'function') {
              activeObserver.unobserve(entry.target);
            }
          }
        }
      },
      { threshold: 0.02, rootMargin: '0px 0px 80px 0px' }
    );

    revealChildren.forEach((child) => {
      if (child.isConnected) {
        localObserver.observe(child);
      }
    });

    const fallbackTimerId = window.setTimeout(() => {
      revealChildren.forEach((child) => {
        if (child.isConnected) {
          child.classList.add('visible');
        }
      });
    }, fallbackDelayMs);

    return () => {
      localObserver.disconnect();
      window.clearTimeout(fallbackTimerId);
    };
  }, [fallbackDelayMs]);

  return containerRef;
}
