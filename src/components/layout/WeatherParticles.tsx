'use client';
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: 'rain' | 'dot' | 'ray';
  life: number;
  maxLife: number;
  color: string;
}

interface WeatherParticlesProps {
  variant?: 'rain' | 'particles' | 'rays' | 'mixed';
  intensity?: number;
}

export default function WeatherParticles({ variant = 'mixed', intensity = 0.6 }: WeatherParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#00e5ff22', '#2979ff18', '#7c3aed15', '#00ff8812'];
    const count = Math.floor(80 * intensity);

    const spawnParticle = (): Particle => {
      const type = variant === 'rain' ? 'rain'
        : variant === 'rays' ? 'ray'
        : variant === 'particles' ? 'dot'
        : (Math.random() > 0.5 ? 'dot' : 'rain');

      if (type === 'rain') {
        return {
          x: Math.random() * canvas.width,
          y: -20,
          vx: 0.5 + Math.random() * 0.5,
          vy: 3 + Math.random() * 4,
          size: 1 + Math.random(),
          opacity: 0.1 + Math.random() * 0.3,
          type: 'rain',
          life: 0,
          maxLife: 200,
          color: '#00e5ff',
        };
      } else if (type === 'ray') {
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.2 - Math.random() * 0.3,
          size: 40 + Math.random() * 80,
          opacity: 0.02 + Math.random() * 0.04,
          type: 'ray',
          life: 0,
          maxLife: 300 + Math.random() * 200,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      } else {
        return {
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -0.5 - Math.random() * 1.5,
          size: 1 + Math.random() * 3,
          opacity: 0.1 + Math.random() * 0.5,
          type: 'dot',
          life: 0,
          maxLife: 250 + Math.random() * 150,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      }
    };

    particlesRef.current = Array.from({ length: count }, spawnParticle);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.map(p => {
        const progress = p.life / p.maxLife;
        const fade = progress < 0.1 ? progress / 0.1 : progress > 0.8 ? 1 - (progress - 0.8) / 0.2 : 1;

        if (p.type === 'rain') {
          ctx.save();
          ctx.globalAlpha = p.opacity * fade;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 4, p.y + p.vy * 4);
          ctx.stroke();
          ctx.restore();
        } else if (p.type === 'ray') {
          ctx.save();
          ctx.globalAlpha = p.opacity * fade;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          grad.addColorStop(0, p.color.replace(/[0-9a-f]{2}$/, 'ff'));
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size, p.size * 0.3, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.save();
          ctx.globalAlpha = p.opacity * fade;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        const next = {
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life + 1,
        };

        if (next.life >= next.maxLife || next.y > canvas.height + 20 || next.y < -50) {
          return spawnParticle();
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [variant, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}
