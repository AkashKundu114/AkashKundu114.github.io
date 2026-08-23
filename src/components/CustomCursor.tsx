import { useEffect, useRef } from 'react';

const TRAIL = 18;
const LERP = 0.14;
const LERP_RM = 1.0;
const HOVER_SEL =
  'a,button,input,textarea,select,[role="button"],.card-hover,.row-card,.tag,.nav-link,.theme-toggle,.btn';

const C_DOT_DEF = '#FEFAEF';
const C_DOT_HOV = '#B9915E';
const C_RING_DEF = [175, 210, 250];
const C_RING_HOV = [185, 145, 94];
const C_TRAIL_A = [185, 145, 94];
const C_TRAIL_B = [175, 210, 250];

function lerp(a, b, t) {
  return a + (b - a) * t;
}
function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

export default function CustomCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const lerpFactor = reduceMotion ? LERP_RM : LERP;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let mx = W / 2,
      my = H / 2;
    let fx = mx,
      fy = my;
    let hovering = false;
    let clicking = false;
    let revealed = false;

    const trail = Array.from({ length: TRAIL }, () => ({ x: fx, y: fy }));

    const ripples = [];

    document.body.style.cursor = 'none';

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      revealed = true;
    };
    const onOver = (e) => {
      hovering = !!e.target.closest?.(HOVER_SEL);
    };
    const onDown = () => {
      clicking = true;
      ripples.push({ x: mx, y: my, r: 0, life: 1 });
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

    function drawSmoothedTrail() {
      if (reduceMotion || trail.length < 3) return;

      const passes = [
        { width: 9, alpha: 0.06 },
        { width: 5, alpha: 0.14 },
        { width: 2.5, alpha: 0.38 },
        { width: 1, alpha: 0.7 },
      ];

      passes.forEach(({ width, alpha }) => {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);

        for (let i = 1; i < trail.length - 1; i++) {
          const mx2 = (trail[i].x + trail[i + 1].x) / 2;
          const my2 = (trail[i].y + trail[i + 1].y) / 2;
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, mx2, my2);
        }
        ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);

        const g = ctx.createLinearGradient(
          trail[0].x,
          trail[0].y,
          trail[trail.length - 1].x,
          trail[trail.length - 1].y
        );
        const [r0, g0, b0] = C_TRAIL_B;
        const [r1, g1, b1] = C_TRAIL_A;
        g.addColorStop(0, `rgba(${r0},${g0},${b0},0)`);
        g.addColorStop(0.5, `rgba(${r0},${g0},${b0},${alpha * 0.5})`);
        g.addColorStop(1, `rgba(${r1},${g1},${b1},${alpha})`);

        ctx.strokeStyle = g;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      });
    }

    function drawFollower() {
      const dx = mx - fx;
      const dy = my - fy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const stretch = clamp(1 + dist * 0.05, 1, 2.8);
      const squash = clamp(1 / stretch, 0.45, 1);

      const targetR = hovering ? 26 : clicking ? 14 : 18;
      const [rR, rG, rB] = hovering ? C_RING_HOV : C_RING_DEF;
      const ringAlpha = hovering ? 0.85 : 0.65;

      ctx.save();
      ctx.translate(fx, fy);
      ctx.rotate(angle);
      ctx.scale(stretch, squash);

      const s = targetR;
      ctx.beginPath();
      ctx.rect(-s, -s, s * 2, s * 2);

      if (hovering) {
        ctx.fillStyle = `rgba(${rR},${rG},${rB},0.10)`;
        ctx.fill();
      }
      ctx.strokeStyle = `rgba(${rR},${rG},${rB},${ringAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      if (hovering) {
        ctx.save();
        ctx.translate(fx, fy);
        ctx.strokeStyle = `rgba(${rR},${rG},${rB},0.3)`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(-34, 0);
        ctx.lineTo(34, 0);
        ctx.moveTo(0, -34);
        ctx.lineTo(0, 34);
        ctx.stroke();
        ctx.restore();
      }
    }

    function drawDot() {
      const col = hovering ? C_DOT_HOV : C_DOT_DEF;

      ctx.save();
      ctx.translate(mx, my);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = col;
      ctx.fillRect(-3, -3, 6, 6);
      ctx.restore();
    }

    function updateRipples() {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 3.5;
        rp.life -= 0.062;
        if (rp.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        const alpha = rp.life * 0.75;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(185,145,94,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (rp.r > 12) {
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r * 1.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(175,210,250,${alpha * 0.35})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      if (revealed) {
        fx = lerp(fx, mx, lerpFactor);
        fy = lerp(fy, my, lerpFactor);

        trail.push({ x: fx, y: fy });
        trail.shift();

        drawSmoothedTrail();
        drawFollower();
        drawDot();
        updateRipples();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-canvas" aria-hidden="true" />;
}
