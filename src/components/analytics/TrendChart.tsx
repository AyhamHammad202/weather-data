'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { VARIABLES, MONTHLY_AVERAGES, ClimateVariable } from '@/lib/chartData';
import { useTheme } from '@/context/ThemeContext';

interface TrendChartProps {
  variable: ClimateVariable;
  height?: number;
}

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function TrendChart({ variable, height = 160 }: TrendChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meta = VARIABLES[variable];
  const data = MONTHLY_AVERAGES[variable];
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const PAD = { top: 16, right: 16, bottom: 32, left: 44 };
    const chartW = W - PAD.left - PAD.right;
    const chartH = H - PAD.top - PAD.bottom;

    const minVal = Math.min(...data) * 0.9;
    const maxVal = Math.max(...data) * 1.05;
    const range = maxVal - minVal;

    const toX = (i: number) => PAD.left + (i / (data.length - 1)) * chartW;
    const toY = (v: number) => PAD.top + chartH - ((v - minVal) / range) * chartH;

    const isLight = theme === 'light';
    const gridColor = isLight ? 'rgba(15, 23, 42, 0.06)' : 'rgba(255, 255, 255, 0.04)';
    const textColor = isLight ? '#64748b' : '#2d4060';

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    for (let i = 0; i <= 4; i++) {
      const y = PAD.top + (i / 4) * chartH;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(W - PAD.right, y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Y axis labels
      const val = maxVal - (i / 4) * range;
      ctx.fillStyle = textColor;
      ctx.font = `500 9px 'Inter', sans-serif`;
      ctx.textAlign = 'right';
      ctx.fillText(val.toFixed(0), PAD.left - 6, y + 3);
    }

    // Area fill
    const gradient = ctx.createLinearGradient(0, PAD.top, 0, H - PAD.bottom);
    gradient.addColorStop(0, meta.color + '40');
    gradient.addColorStop(1, meta.color + '00');

    ctx.beginPath();
    ctx.moveTo(toX(0), toY(data[0]));
    for (let i = 1; i < data.length; i++) {
      const x0 = toX(i - 1), y0 = toY(data[i - 1]);
      const x1 = toX(i), y1 = toY(data[i]);
      const cpx = (x0 + x1) / 2;
      ctx.bezierCurveTo(cpx, y0, cpx, y1, x1, y1);
    }
    ctx.lineTo(toX(data.length - 1), H - PAD.bottom);
    ctx.lineTo(toX(0), H - PAD.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(data[0]));
    for (let i = 1; i < data.length; i++) {
      const x0 = toX(i - 1), y0 = toY(data[i - 1]);
      const x1 = toX(i), y1 = toY(data[i]);
      const cpx = (x0 + x1) / 2;
      ctx.bezierCurveTo(cpx, y0, cpx, y1, x1, y1);
    }
    ctx.strokeStyle = meta.color;
    ctx.lineWidth = 2;
    ctx.shadowColor = meta.color;
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Data points
    data.forEach((val, i) => {
      const x = toX(i), y = toY(val);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = meta.color;
      ctx.shadowColor = meta.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // X axis labels
    MONTH_LABELS.forEach((label, i) => {
      const x = toX(i);
      ctx.fillStyle = textColor;
      ctx.font = `500 9px 'Inter', sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(label, x, H - PAD.bottom + 14);
    });
  }, [variable, data, meta, theme]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--stats-bg)', border: '1px solid var(--stats-border)' }}
    >
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <div className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
          Monthly Average — {meta.label}
        </div>
        <div className="text-[10px] font-mono" style={{ color: meta.color }}>
          {meta.unit}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height }}
        className="block"
      />
    </motion.div>
  );
}
