import { useEffect, useRef } from 'react';

const HOVER_SEL =
  'a, button, input, textarea, select, [role="button"], .card-hover, .row-card, .tag, .nav-link, .theme-toggle, .btn, .evil-shiny-btn, .evil-tactile-btn, .evil-glass-btn, .evil-glitch-btn';

const C_DOT_DEF = '#FEFAEF';
const C_DOT_HOV = '#B9915E';
const C_RING_DEF = [175, 210, 250];
const C_RING_HOV = [185, 145, 94];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (!window.matchMedia('(pointer:fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let mx = -100,
      my = -100;
    let fx = -100,
      fy = -100;
    let hovering = false;
    let clicking = false;
    let revealed = false;

    // Use a responsive, responsive lerp (0.35 = snappy and fluid)
    const LERP_SPEED = 0.35;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!revealed) {
        fx = mx;
        fy = my;
        revealed = true;
      }
    };

    const onOver = (e: MouseEvent) => {
      hovering = !!(e.target as HTMLElement)?.closest?.(HOVER_SEL);
    };

    const onDown = () => {
      clicking = true;
    };

    const onUp = () => {
      clicking = false;
    };

    const onLeave = () => {
      revealed = false;
    };

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      if (revealed && mx >= 0 && my >= 0) {
        // Smooth follower ring
        fx = lerp(fx, mx, LERP_SPEED);
        fy = lerp(fy, my, LERP_SPEED);

        const targetRadius = hovering ? 22 : clicking ? 12 : 16;
        const [r, g, b] = hovering ? C_RING_HOV : C_RING_DEF;

        // 1. Follower Ring (smooth lerp)
        ctx.save();
        ctx.beginPath();
        ctx.arc(fx, fy, targetRadius, 0, Math.PI * 2);
        if (hovering) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.12)`;
          ctx.fill();
        }
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${hovering ? 0.75 : 0.45})`;
        ctx.lineWidth = hovering ? 1.5 : 1;
        ctx.stroke();
        ctx.restore();

        // 2. Center Precision Dot (INSTANT 1:1 with real mouse position — ZERO lag)
        ctx.save();
        ctx.translate(mx, my);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = hovering ? C_DOT_HOV : C_DOT_DEF;
        ctx.fillRect(-2.5, -2.5, 5, 5);
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
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
