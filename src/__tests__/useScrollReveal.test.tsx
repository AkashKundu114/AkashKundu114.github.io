import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { useScrollReveal, useRevealChildren } from '../hooks/useScrollReveal';

describe('useScrollReveal Hook', () => {
  let originalInnerHeight: number;
  let observeMock: ReturnType<typeof vi.fn>;
  let unobserveMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let observerCallback: IntersectionObserverCallback;
  let observerOptions: IntersectionObserverInit | undefined;
  let observerInstance: IntersectionObserver;

  beforeEach(() => {
    vi.useFakeTimers();
    originalInnerHeight = window.innerHeight;
    window.innerHeight = 800;

    observeMock = vi.fn();
    unobserveMock = vi.fn();
    disconnectMock = vi.fn();

    // Custom controllable IntersectionObserver
    class ControllableMockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];

      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        observerCallback = callback;
        observerOptions = options;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        observerInstance = this;
      }

      observe = observeMock as unknown as (target: Element) => void;
      unobserve = unobserveMock as unknown as (target: Element) => void;
      disconnect = disconnectMock as unknown as () => void;
      takeRecords = vi.fn().mockReturnValue([]) as unknown as () => IntersectionObserverEntry[];
    }

    vi.stubGlobal('IntersectionObserver', ControllableMockIntersectionObserver);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    window.innerHeight = originalInnerHeight;
    vi.unstubAllGlobals();
  });

  function SingleElementTestComponent({
    options,
    rect = { top: 1200, bottom: 1400 },
  }: {
    options?: Parameters<typeof useScrollReveal>[0];
    rect?: { top: number; bottom: number };
  }) {
    const ref = useScrollReveal(options);
    return (
      <div
        ref={(el) => {
          if (el) {
            el.getBoundingClientRect = () =>
              ({
                top: rect.top,
                bottom: rect.bottom,
                left: 0,
                right: 100,
                width: 100,
                height: 200,
              } as DOMRect);
          }
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        data-testid="reveal-target"
      >
        Target
      </div>
    );
  }

  it('marks element visible immediately if already within viewport', () => {
    // In viewport: top (200) < window.innerHeight (800) and bottom (400) > 0
    const { getByTestId } = render(
      <SingleElementTestComponent rect={{ top: 200, bottom: 400 }} />
    );

    const el = getByTestId('reveal-target');
    expect(el.classList.contains('visible')).toBe(true);
    // Should return early and not register observer
    expect(observeMock).not.toHaveBeenCalled();
  });

  it('observes element if out of viewport and adds visible when intersecting', () => {
    // Out of viewport: top (1200) > innerHeight (800)
    const { getByTestId } = render(
      <SingleElementTestComponent rect={{ top: 1200, bottom: 1500 }} />
    );

    const el = getByTestId('reveal-target');
    expect(el.classList.contains('visible')).toBe(false);
    expect(observeMock).toHaveBeenCalledWith(el);

    // Simulate intersection
    act(() => {
      observerCallback(
        [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
        observerInstance
      );
    });

    expect(el.classList.contains('visible')).toBe(true);
    expect(unobserveMock).toHaveBeenCalledWith(el);
  });

  it('passes custom options merged with default rootMargin & threshold', () => {
    render(
      <SingleElementTestComponent
        rect={{ top: 1500, bottom: 1700 }}
        options={{ threshold: 0.5, rootMargin: '10px' }}
      />
    );

    expect(observerOptions).toEqual({
      threshold: 0.5,
      rootMargin: '10px',
    });
  });

  it('activates resilient fallback timer after fallbackDelayMs if intersection does not trigger', () => {
    const { getByTestId } = render(
      <SingleElementTestComponent
        rect={{ top: 1200, bottom: 1400 }}
        options={{ fallbackDelayMs: 600 }}
      />
    );

    const el = getByTestId('reveal-target');
    expect(el.classList.contains('visible')).toBe(false);

    // Advance timers by 599ms -> still not visible
    act(() => {
      vi.advanceTimersByTime(599);
    });
    expect(el.classList.contains('visible')).toBe(false);

    // Advance by remaining 1ms -> timer fires, element marked visible
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(el.classList.contains('visible')).toBe(true);
  });

  it('immediately reveals element if IntersectionObserver is not supported', () => {
    // Temporarily remove IntersectionObserver
    // @ts-expect-error simulating legacy browser
    delete window.IntersectionObserver;

    const { getByTestId } = render(
      <SingleElementTestComponent rect={{ top: 1200, bottom: 1400 }} />
    );

    const el = getByTestId('reveal-target');
    expect(el.classList.contains('visible')).toBe(true);
  });

  it('disconnects observer and clears fallback timer on unmount', () => {
    const { unmount } = render(
      <SingleElementTestComponent rect={{ top: 1200, bottom: 1400 }} />
    );

    expect(disconnectMock).not.toHaveBeenCalled();
    unmount();
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it('handles null ref cleanly without errors', () => {
    function NullRefComponent() {
      useScrollReveal();
      return <div>No ref assigned</div>;
    }

    expect(() => render(<NullRefComponent />)).not.toThrow();
  });
});

describe('useRevealChildren Hook', () => {
  let originalInnerHeight: number;
  let observeMock: ReturnType<typeof vi.fn>;
  let unobserveMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let observerCallback: IntersectionObserverCallback;
  let observerInstance: IntersectionObserver;

  beforeEach(() => {
    vi.useFakeTimers();
    originalInnerHeight = window.innerHeight;
    window.innerHeight = 800;

    observeMock = vi.fn();
    unobserveMock = vi.fn();
    disconnectMock = vi.fn();

    class ControllableMockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];

      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        observerInstance = this;
      }

      observe = observeMock as unknown as (target: Element) => void;
      unobserve = unobserveMock as unknown as (target: Element) => void;
      disconnect = disconnectMock as unknown as () => void;
      takeRecords = vi.fn().mockReturnValue([]) as unknown as () => IntersectionObserverEntry[];
    }

    vi.stubGlobal('IntersectionObserver', ControllableMockIntersectionObserver);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    window.innerHeight = originalInnerHeight;
    vi.unstubAllGlobals();
  });

  function ContainerTestComponent({
    childRects,
    fallbackDelayMs,
  }: {
    childRects: Array<{ top: number; bottom: number }>;
    fallbackDelayMs?: number;
  }) {
    const ref = useRevealChildren(fallbackDelayMs);
    return (
      <div ref={ref} data-testid="container">
        {childRects.map((rect, idx) => (
          <div
            key={idx}
            className="reveal"
            data-testid={`child-${idx}`}
            ref={(el) => {
              if (el) {
                el.getBoundingClientRect = () =>
                  ({
                    top: rect.top,
                    bottom: rect.bottom,
                    left: 0,
                    right: 100,
                    width: 100,
                    height: 200,
                  } as DOMRect);
              }
            }}
          >
            Item {idx}
          </div>
        ))}
      </div>
    );
  }

  it('immediately reveals children above or inside window.innerHeight + 100', () => {
    const { getByTestId } = render(
      <ContainerTestComponent
        childRects={[
          { top: 500, bottom: 600 }, // < 900 -> immediate visible
          { top: 1200, bottom: 1300 }, // > 900 -> not immediately visible
        ]}
      />
    );

    const child0 = getByTestId('child-0');
    const child1 = getByTestId('child-1');

    expect(child0.classList.contains('visible')).toBe(true);
    expect(child1.classList.contains('visible')).toBe(false);

    // Both children are still observed by IntersectionObserver
    expect(observeMock).toHaveBeenCalledTimes(2);
  });

  it('reveals children when intersection callback is received', () => {
    const { getByTestId } = render(
      <ContainerTestComponent childRects={[{ top: 1200, bottom: 1300 }]} />
    );

    const child0 = getByTestId('child-0');
    expect(child0.classList.contains('visible')).toBe(false);

    act(() => {
      observerCallback(
        [{ isIntersecting: true, target: child0 } as unknown as IntersectionObserverEntry],
        observerInstance
      );
    });

    expect(child0.classList.contains('visible')).toBe(true);
    expect(unobserveMock).toHaveBeenCalledWith(child0);
  });

  it('reveals all remaining children after fallbackDelayMs timer', () => {
    const { getByTestId } = render(
      <ContainerTestComponent
        fallbackDelayMs={500}
        childRects={[
          { top: 1200, bottom: 1300 },
          { top: 1500, bottom: 1600 },
        ]}
      />
    );

    const child0 = getByTestId('child-0');
    const child1 = getByTestId('child-1');

    expect(child0.classList.contains('visible')).toBe(false);
    expect(child1.classList.contains('visible')).toBe(false);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(child0.classList.contains('visible')).toBe(true);
    expect(child1.classList.contains('visible')).toBe(true);
  });

  it('immediately reveals all children when IntersectionObserver is not supported', () => {
    // @ts-expect-error simulating legacy browser
    delete window.IntersectionObserver;

    const { getByTestId } = render(
      <ContainerTestComponent
        childRects={[
          { top: 1200, bottom: 1300 },
          { top: 1500, bottom: 1600 },
        ]}
      />
    );

    const child0 = getByTestId('child-0');
    const child1 = getByTestId('child-1');

    expect(child0.classList.contains('visible')).toBe(true);
    expect(child1.classList.contains('visible')).toBe(true);
  });

  it('handles empty container with no .reveal children without errors', () => {
    function EmptyContainerComponent() {
      const ref = useRevealChildren();
      return <div ref={ref} data-testid="empty-container">No children</div>;
    }

    expect(() => render(<EmptyContainerComponent />)).not.toThrow();
    expect(observeMock).not.toHaveBeenCalled();
  });

  it('cleans up observer and timer on unmount', () => {
    const { unmount } = render(
      <ContainerTestComponent childRects={[{ top: 1200, bottom: 1300 }]} />
    );

    unmount();
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
