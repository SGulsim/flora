"use client";

import { useEffect } from "react";

const COLORS = ["#f43f5e", "#fb7185", "#e11d48", "#171717", "#a3a3a3", "#fda4af", "#fecdd3"];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  size: number;
  angle: number;
  spin: number;
  opacity: number;
}

export function Confetti() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d")!;

    const particles: Particle[] = Array.from({ length: 130 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 5 + Math.random() * 7,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.15,
      opacity: 1,
    }));

    let frame = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      let alive = 0;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.angle += p.spin;
        if (frame > 90) p.opacity -= 0.012;
        if (p.opacity <= 0 || p.y > canvas.height + 30) continue;
        alive++;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }

      if (alive > 0) { raf = requestAnimationFrame(draw); }
      else { canvas.remove(); }
    };

    raf = requestAnimationFrame(draw);
    const timeout = setTimeout(() => { cancelAnimationFrame(raf); canvas.remove(); }, 5000);

    return () => { cancelAnimationFrame(raf); clearTimeout(timeout); canvas.remove(); };
  }, []);

  return null;
}
