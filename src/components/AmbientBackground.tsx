import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const canvasRef = useRef(null);
  const blobRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    let animId,
      t = 0;
    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let bx = mx,
      by = my;

    const motes = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const n = Math.max(8, Math.min(18, Math.floor((canvas.width * canvas.height) / 100000)));
      motes.length = 0;
      for (let i = 0; i < n; i++)
        motes.push({
          ox: Math.random() * canvas.width,
          oy: Math.random() * canvas.height,
          x: 0,
          y: 0,
          r: Math.random() * 2.2 + 0.5,
          fx: 0.04 + Math.random() * 0.08,
          fy: 0.03 + Math.random() * 0.07,
          ax: canvas.width * (0.015 + Math.random() * 0.025),
          ay: canvas.height * (0.015 + Math.random() * 0.025),
          px: Math.random() * Math.PI * 2,
          py: Math.random() * Math.PI * 2,
          base: 0.04 + Math.random() * 0.06,
          fs: 0.12 + Math.random() * 0.28,
          fp: Math.random() * Math.PI * 2,
        });
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      motes.forEach((m) => {
        m.x = m.ox + Math.sin(t * m.fx + m.px) * m.ax;
        m.y = m.oy + Math.cos(t * m.fy + m.py) * m.ay;
        const flicker = 0.6 + 0.4 * Math.sin(t * m.fs + m.fp);
        const alpha = m.base * flicker;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(175,210,250,${alpha})`;
        ctx.fill();
      });
      if (blobRef.current) {
        bx += (mx - bx) * 0.04;
        by += (my - by) * 0.04;
        blobRef.current.style.transform = `translate(${bx - 240}px,${by - 240}px)`;
      }
    };
    const draw = () => {
      t += 0.3;
      frame();
      animId = requestAnimationFrame(draw);
    };
    if (reduceMotion) frame();
    else draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <div ref={blobRef} className="ambient-blob" aria-hidden="true" />
      <canvas ref={canvasRef} className="ambient-bg" aria-hidden="true" style={{ opacity: 0.7 }} />
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
