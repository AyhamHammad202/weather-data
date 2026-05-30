'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack } from 'lucide-react';
import { MONTHS } from '@/lib/chartData';

interface TimelineSliderProps {
  activeMonth: number | null;
  onMonthChange: (month: number | null | ((prev: number | null) => number | null)) => void;
}

export default function TimelineSlider({ activeMonth, onMonthChange }: TimelineSliderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        onMonthChange(prev => {
          const current = typeof prev === 'number' ? prev : 0;
          return current >= 12 ? 1 : current + 1;
        });
      }, 900);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, onMonthChange]);

  const SEASON_BG: Record<string, string> = {
    winter: '#90e0ef',
    spring: '#00ff88',
    summer: '#ffd60a',
    autumn: '#f77f00',
  };

  return (
    <div className="rounded-xl p-4"
      style={{ background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass-card)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Timeline
          </div>
          {activeMonth && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-2 py-0.5 rounded-md text-[10px] font-bold"
              style={{ background: 'rgba(0,229,255,0.1)', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.2)' }}
            >
              {MONTHS[activeMonth - 1]?.name}
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { onMonthChange(null); setIsPlaying(false); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
            style={{ border: '1px solid var(--border-glass)' }}
            aria-label="Reset timeline"
          >
            <SkipBack size={11} style={{ color: 'var(--text-muted)' }} />
          </button>
          <button
            onClick={() => setIsPlaying(p => !p)}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{
              background: isPlaying ? 'rgba(0,229,255,0.15)' : 'var(--sidebar-active-bg)',
              border: isPlaying ? '1px solid rgba(0,229,255,0.3)' : '1px solid var(--border-glass)',
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying
              ? <Pause size={11} style={{ color: '#00e5ff' }} />
              : <Play size={11} style={{ color: 'var(--text-muted)' }} />}
          </button>
        </div>
      </div>

      {/* Month pills */}
      <div className="grid grid-cols-6 gap-1 mb-3">
        {MONTHS.map(m => {
          const isActive = activeMonth === m.num;
          const color = SEASON_BG[m.season];
          return (
            <motion.button
              key={m.num}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onMonthChange(isActive ? null : m.num)}
              className="relative py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wide transition-all"
              style={{
                background: isActive ? `${color}25` : 'var(--sidebar-active-bg)',
                border: isActive ? `1px solid ${color}50` : '1px solid var(--border-glass)',
                color: isActive ? color : 'var(--text-muted)',
                boxShadow: isActive ? `0 0 10px ${color}30` : 'none',
              }}
            >
              {m.short}
              {isActive && (
                <motion.div
                  layoutId="month-indicator"
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full mx-2"
                  style={{ background: color }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Season strip */}
      <div className="flex rounded-lg overflow-hidden h-1">
        {['DJF', 'MAM', 'JJA', 'SON'].map((season, i) => {
          const colors = ['#90e0ef', '#00ff88', '#ffd60a', '#f77f00'];
          return <div key={season} className="flex-1" style={{ background: `${colors[i]}40` }} />;
        })}
      </div>
      <div className="flex mt-0.5">
        {['Winter', 'Spring', 'Summer', 'Autumn'].map((s, i) => {
          const colors = ['#90e0ef', '#00ff88', '#ffd60a', '#f77f00'];
          return (
            <div key={s} className="flex-1 text-center text-[8px]" style={{ color: `${colors[i]}80` }}>
              {s}
            </div>
          );
        })}
      </div>
    </div>
  );
}
