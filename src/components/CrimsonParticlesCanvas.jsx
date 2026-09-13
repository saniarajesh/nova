import React, { useEffect, useRef } from 'react';

export default function CrimsonParticlesCanvas({ staffBurst, cursorPosition }) {
  const canvasRef   = useRef(null);
  const state       = useRef({
    particles:  [],
    smoke:      [],
    sparks:     [],
    trail:      [],
    stars:      [],   // shooting stars
    constellations: [], // floating dots
    t:          0,
  });

  /* ── Bootstrap ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const S = state.current;

    /* ── Rising golden embers ─────────────────────────────────────────────── */
    S.particles = Array.from({ length: 70 }, () => ({
      x:          Math.random() * canvas.width,
      y:          Math.random() * canvas.height,
      size:       Math.random() * 2.6 + 0.7,
      speedY:     Math.random() * 0.65 + 0.25,
      speedX:     (Math.random() - 0.5) * 0.35,
      alpha:      Math.random() * 0.75 + 0.2,
      pulseSpeed: Math.random() * 0.025 + 0.008,
      twinkle:    Math.random() * Math.PI * 2,   // phase offset
      color: Math.random() > 0.4
        ? '#fcd34d'
        : Math.random() > 0.5 ? '#f87171' : '#fb923c',
    }));

    /* ── Crimson smoke puffs ──────────────────────────────────────────────── */
    S.smoke = Array.from({ length: 14 }, () => ({
      x:      Math.random() * canvas.width,
      y:      canvas.height * (0.45 + Math.random() * 0.6),
      radius: Math.random() * 160 + 100,
      vx:     (Math.random() - 0.5) * 0.22,
      vy:     -0.08 - Math.random() * 0.13,
      alpha:  Math.random() * 0.065 + 0.025,
    }));

    /* ── Constellation ambient dots ───────────────────────────────────────── */
    S.constellations = Array.from({ length: 40 }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height * 0.7,
      r:       Math.random() * 1.2 + 0.4,
      alpha:   Math.random() * 0.5 + 0.1,
      phase:   Math.random() * Math.PI * 2,
      speed:   Math.random() * 0.015 + 0.005,
    }));

    /* ── Shooting stars queue ─────────────────────────────────────────────── */
    let lastStar = Date.now();

    const spawnStar = () => {
      S.stars.push({
        x:     Math.random() * canvas.width * 0.6,
        y:     Math.random() * canvas.height * 0.4,
        len:   Math.random() * 120 + 60,
        speed: Math.random() * 6 + 4,
        alpha: 1,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      });
    };

    /* ── Main render loop ─────────────────────────────────────────────────── */
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      S.t += 0.016;

      /* Smoke */
      S.smoke.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < canvas.height * 0.3) { p.y = canvas.height + 40; p.x = Math.random() * canvas.width; }
        if (p.x < -180) p.x = canvas.width + 180;
        if (p.x > canvas.width + 180) p.x = -180;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        g.addColorStop(0, `rgba(185,28,28,${p.alpha})`);
        g.addColorStop(0.55, `rgba(127,29,29,${p.alpha * 0.45})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      /* Constellation dots + faint connecting lines */
      ctx.save();
      S.constellations.forEach((d, i) => {
        d.phase += d.speed;
        const a = d.alpha * (0.5 + 0.5 * Math.sin(d.phase));

        /* faint lines to nearest neighbour */
        const next = S.constellations[(i + 1) % S.constellations.length];
        const dist = Math.hypot(next.x - d.x, next.y - d.y);
        if (dist < 180) {
          ctx.strokeStyle = `rgba(220,38,38,${a * 0.15 * (1 - dist / 180)})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(next.x, next.y);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(251,191,36,${a})`;
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur  = 6;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      /* Shooting stars */
      const now = Date.now();
      if (now - lastStar > 3200 + Math.random() * 4000) {
        spawnStar();
        lastStar = now;
      }
      for (let i = S.stars.length - 1; i >= 0; i--) {
        const s = S.stars[i];
        s.x    += Math.cos(s.angle) * s.speed;
        s.y    += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.012;
        if (s.alpha <= 0) { S.stars.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = s.alpha;
        const g = ctx.createLinearGradient(
          s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len,
          s.x, s.y
        );
        g.addColorStop(0, 'transparent');
        g.addColorStop(0.7, 'rgba(251,191,36,0.6)');
        g.addColorStop(1, '#fff');
        ctx.strokeStyle = g;
        ctx.lineWidth   = 1.5;
        ctx.shadowColor = '#fcd34d';
        ctx.shadowBlur  = 10;
        ctx.beginPath();
        ctx.moveTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.restore();
      }

      /* Rising embers */
      S.particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(S.t * 0.8 + p.twinkle) * 0.28;
        p.twinkle += 0.03;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        const a = Math.max(0.08, Math.min(0.92, p.alpha + Math.sin(S.t * p.pulseSpeed * 60) * 0.12));
        ctx.save();
        ctx.shadowColor  = p.color;
        ctx.shadowBlur   = p.size * 5;
        ctx.fillStyle    = p.color;
        ctx.globalAlpha  = a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.size > 2.0) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth   = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 2.2, p.y); ctx.lineTo(p.x + p.size * 2.2, p.y);
          ctx.moveTo(p.x, p.y - p.size * 2.2); ctx.lineTo(p.x, p.y + p.size * 2.2);
          ctx.stroke();
        }
        ctx.restore();
      });

      /* Cursor trail */
      for (let i = S.trail.length - 1; i >= 0; i--) {
        const t = S.trail[i];
        t.life -= 0.022; t.x += t.vx; t.y += t.vy; t.size *= 0.95;
        if (t.life <= 0) { S.trail.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha  = t.life * 0.75;
        ctx.fillStyle    = t.color;
        ctx.shadowColor  = t.color;
        ctx.shadowBlur   = 8;
        ctx.beginPath();
        ctx.arc(t.x, t.y, Math.max(0.4, t.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      /* Staff burst sparks */
      for (let i = S.sparks.length - 1; i >= 0; i--) {
        const s = S.sparks[i];
        s.x += s.vx; s.y += s.vy;
        s.vx *= 0.965; s.vy *= 0.965;
        s.life -= 0.016;
        if (s.life <= 0) { S.sparks.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha  = s.life;
        ctx.fillStyle    = s.color;
        ctx.shadowColor  = s.color;
        ctx.shadowBlur   = 14;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle  = s.color;
        ctx.lineWidth    = 0.9 * s.life;
        ctx.beginPath();
        ctx.moveTo(s.x - s.size * 2.5 * s.life, s.y);
        ctx.lineTo(s.x + s.size * 2.5 * s.life, s.y);
        ctx.moveTo(s.x, s.y - s.size * 2.5 * s.life);
        ctx.lineTo(s.x, s.y + s.size * 2.5 * s.life);
        ctx.stroke();
        ctx.restore();
      }

      raf = requestAnimationFrame(render);
    };

    render();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  /* ── Cursor trail ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!cursorPosition) return;
    const S = state.current;
    if (Math.random() > 0.35) {
      S.trail.push({
        x:     cursorPosition.x + (Math.random() - 0.5) * 16,
        y:     cursorPosition.y + (Math.random() - 0.5) * 16,
        vx:    (Math.random() - 0.5) * 0.9,
        vy:    (Math.random() - 0.5) * 0.9 - 0.5,
        size:  Math.random() * 3 + 1,
        life:  1,
        color: Math.random() > 0.4 ? '#fcd34d' : '#f43f5e',
      });
    }
  }, [cursorPosition]);

  /* ── Staff burst ──────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!staffBurst) return;
    const canvas = canvasRef.current;
    const S = state.current;
    const ox = staffBurst.x || (canvas?.width  ?? window.innerWidth)  * 0.28;
    const oy = staffBurst.y || (canvas?.height ?? window.innerHeight) * 0.26;
    const colors = ['#fbbf24', '#e879f9', '#ffffff', '#f87171', '#38bdf8'];
    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80 + (Math.random() - 0.5) * 0.35;
      const speed = Math.random() * 9 + 3.5;
      S.sparks.push({
        x: ox, y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size:  Math.random() * 4 + 2,
        life:  1,
        color: colors[i % colors.length],
      });
    }
  }, [staffBurst]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20 w-full h-full"
    />
  );
}
