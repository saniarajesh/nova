import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Static & drifting stars
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.3 - 0.05,
      alpha: Math.random() * 0.8 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      isStar: Math.random() > 0.4,
    }));

    // Shooting stars array
    const shootingStars = [];
    let lastSpawnTime = Date.now();

    const spawnShootingStar = () => {
      const isFromLeft = Math.random() > 0.3;
      const startX = isFromLeft ? Math.random() * (width * 0.7) : width + 20;
      const startY = Math.random() * (height * 0.45);

      const angle = (Math.PI / 180) * (Math.random() * 20 + 35);
      const speed = Math.random() * 10 + 14;

      shootingStars.push({
        x: startX,
        y: startY,
        length: Math.random() * 90 + 110,
        speed: speed,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.012,
        color: '216, 180, 254', // violet star tail
        headColor: '#ffffff',
      });
    };

    spawnShootingStar();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const baseColor = '168, 85, 247';
      const accentColor = '236, 72, 153';

      // 1. Draw static / floating stars
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        p.alpha += Math.sin(Date.now() * 0.002 + idx) * 0.01;
        const currentAlpha = Math.max(0.15, Math.min(0.85, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = idx % 3 === 0 
          ? `rgba(${accentColor}, ${currentAlpha})` 
          : `rgba(${baseColor}, ${currentAlpha})`;
        ctx.shadowBlur = p.isStar ? 6 : 0;
        ctx.shadowColor = `rgba(${baseColor}, 0.8)`;
        ctx.fill();
      });

      // 2. Spawn shooting stars periodically
      const now = Date.now();
      if (now - lastSpawnTime > Math.random() * 2000 + 2500) {
        spawnShootingStar();
        lastSpawnTime = now;
      }

      // 3. Render and update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];

        star.x += star.dx;
        star.y += star.dy;
        star.alpha -= star.decay;

        if (star.alpha <= 0 || star.x > width + 200 || star.y > height + 200) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = star.x - (star.dx / star.speed) * star.length;
        const tailY = star.y - (star.dy / star.speed) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
        gradient.addColorStop(0.2, `rgba(${star.color}, ${star.alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(${star.color}, 0)`);

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${star.color}, 0.9)`;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(star.x, star.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ffffff';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
