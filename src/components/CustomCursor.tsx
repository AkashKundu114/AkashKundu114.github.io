import { useEffect, useRef, memo } from 'react';

const INTERACTIVE_ELEMENTS_SELECTOR =
  'a, button, input, textarea, select, [role="button"], .card-hover, .row-card, .tag, .nav-link, .theme-toggle, .btn, .evil-shiny-btn, .evil-tactile-btn, .evil-glass-btn, .evil-glitch-btn';

const DEFAULT_PRECISION_DOT_COLOR = '#FEFAEF';
const HOVER_PRECISION_DOT_COLOR = '#B9915E';

type RgbColor = readonly [number, number, number];
const DEFAULT_RING_RGB: RgbColor = [175, 210, 250];
const HOVER_RING_RGB: RgbColor = [185, 145, 94];

const LERP_SMOOTHING_FACTOR = 0.35;
const OFFSCREEN_COORDINATE = -100;

interface Point2D {
  x: number;
  y: number;
}

function linearInterpolate(currentValue: number, targetValue: number, factor: number): number {
  return currentValue + (targetValue - currentValue) * factor;
}

function drawFollowerRing(
  context: CanvasRenderingContext2D,
  center: Point2D,
  radius: number,
  rgb: RgbColor,
  isHovering: boolean
): void {
  const [red, green, blue] = rgb;
  const strokeOpacity = isHovering ? 0.75 : 0.45;

  context.save();
  context.beginPath();
  context.arc(center.x, center.y, radius, 0, Math.PI * 2);

  if (isHovering) {
    context.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.12)`;
    context.fill();
  }

  context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${strokeOpacity})`;
  context.lineWidth = isHovering ? 1.5 : 1;
  context.stroke();
  context.restore();
}

function drawPrecisionReticle(
  context: CanvasRenderingContext2D,
  position: Point2D,
  fillColor: string
): void {
  context.save();
  context.translate(position.x, position.y);
  context.rotate(Math.PI / 4);
  context.fillStyle = fillColor;
  context.fillRect(-2.5, -2.5, 5, 5);
  context.restore();
}

function CustomCursorComponent() {
  const canvasReference = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const finePointerQuery = window.matchMedia?.('(pointer:fine)');
    if (!finePointerQuery?.matches) {
      return;
    }

    const canvas = canvasReference.current;
    if (!canvas) {
      return;
    }

    const renderingContext = canvas.getContext('2d', { alpha: true });
    if (!renderingContext) {
      return;
    }

    let viewportWidth = Math.max(1, window.innerWidth);
    let viewportHeight = Math.max(1, window.innerHeight);
    canvas.width = viewportWidth;
    canvas.height = viewportHeight;

    let targetMouseX = OFFSCREEN_COORDINATE;
    let targetMouseY = OFFSCREEN_COORDINATE;
    let followerX = OFFSCREEN_COORDINATE;
    let followerY = OFFSCREEN_COORDINATE;

    let isHoveringInteractive = false;
    let isMousePressed = false;
    let isCursorRevealed = false;
    let animationFrameId: number = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = event.clientX;
      targetMouseY = event.clientY;

      if (!isCursorRevealed) {
        followerX = targetMouseX;
        followerY = targetMouseY;
        isCursorRevealed = true;
      }
    };

    const handleMouseOver = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement | null;
      isHoveringInteractive = Boolean(targetElement?.closest?.(INTERACTIVE_ELEMENTS_SELECTOR));
    };

    const handleMouseDown = () => {
      isMousePressed = true;
    };

    const handleMouseUp = () => {
      isMousePressed = false;
    };

    const handleMouseLeaveWindow = () => {
      isCursorRevealed = false;
    };

    const handleWindowResize = () => {
      viewportWidth = Math.max(1, window.innerWidth);
      viewportHeight = Math.max(1, window.innerHeight);
      canvas.width = viewportWidth;
      canvas.height = viewportHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    window.addEventListener('resize', handleWindowResize, { passive: true });

    const renderLoop = () => {
      renderingContext.clearRect(0, 0, viewportWidth, viewportHeight);

      if (isCursorRevealed && targetMouseX >= 0 && targetMouseY >= 0) {
        followerX = linearInterpolate(followerX, targetMouseX, LERP_SMOOTHING_FACTOR);
        followerY = linearInterpolate(followerY, targetMouseY, LERP_SMOOTHING_FACTOR);

        const targetRadius = isHoveringInteractive ? 22 : isMousePressed ? 12 : 16;
        const activeRingColor = isHoveringInteractive ? HOVER_RING_RGB : DEFAULT_RING_RGB;
        const activeDotColor = isHoveringInteractive
          ? HOVER_PRECISION_DOT_COLOR
          : DEFAULT_PRECISION_DOT_COLOR;

        drawFollowerRing(
          renderingContext,
          { x: followerX, y: followerY },
          targetRadius,
          activeRingColor,
          isHoveringInteractive
        );

        drawPrecisionReticle(
          renderingContext,
          { x: targetMouseX, y: targetMouseY },
          activeDotColor
        );
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasReference}
      className="cursor-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
}

export default memo(CustomCursorComponent);
