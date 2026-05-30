'use client';
import React, { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {
  X, ChevronLeft, ChevronRight, Star, ZoomIn, ZoomOut,
  RotateCcw, Download, Info, Calendar, Thermometer
} from 'lucide-react';
import { ChartMeta, VARIABLES } from '@/lib/chartData';

interface LightboxProps {
  chart: ChartMeta | null;
  allCharts: ChartMeta[];
  onClose: () => void;
  onNavigate: (chart: ChartMeta) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function Lightbox({
  chart, allCharts, onClose, onNavigate, isFavorite, onToggleFavorite
}: LightboxProps) {
  const [showInfo, setShowInfo] = useState(true);
  const currentIndex = chart ? allCharts.findIndex(c => c.id === chart.id) : -1;
  const variable = chart ? VARIABLES[chart.variable] : null;

  const goNext = useCallback(() => {
    if (!chart || allCharts.length === 0) return;
    const next = allCharts[(currentIndex + 1) % allCharts.length];
    onNavigate(next);
  }, [chart, allCharts, currentIndex, onNavigate]);

  const goPrev = useCallback(() => {
    if (!chart || allCharts.length === 0) return;
    const prev = allCharts[(currentIndex - 1 + allCharts.length) % allCharts.length];
    onNavigate(prev);
  }, [chart, allCharts, currentIndex, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!chart) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [chart, onClose, goNext, goPrev]);

  // Prevent body scroll
  useEffect(() => {
    if (chart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [chart]);

  return (
    <AnimatePresence>
      {chart && variable && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="lightbox-overlay flex"
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          {/* Navigation — Left */}
          <motion.button
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'var(--bg-glass-heavy)', border: '1px solid var(--border-glass)', boxShadow: '0 0 20px var(--border-glass)' }}
            aria-label="Previous chart"
          >
            <ChevronLeft size={20} style={{ color: '#00e5ff' }} />
          </motion.button>

          {/* Main content */}
          <div className="flex-1 flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: 'var(--border-glass)' }}>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider"
                  style={{ background: `${variable.color}20`, border: `1px solid ${variable.color}40`, color: variable.color }}>
                  {variable.label}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={13} style={{ color: 'var(--text-muted)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{chart.monthName}</span>
                </div>
                <div className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{ background: 'var(--sidebar-active-bg)', color: 'var(--text-muted)' }}>
                  {currentIndex + 1} / {allCharts.length}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Favorite */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onToggleFavorite(chart.id)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: isFavorite ? 'rgba(255,214,10,0.15)' : 'var(--sidebar-active-bg)',
                    border: isFavorite ? '1px solid rgba(255,214,10,0.4)' : '1px solid var(--border-glass)',
                  }}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Star size={15} style={{ color: isFavorite ? '#ffd60a' : 'var(--text-muted)', fill: isFavorite ? '#ffd60a' : 'none' }} />
                </motion.button>

                {/* Download */}
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={chart.path}
                  download={chart.filename}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--sidebar-active-bg)', border: '1px solid var(--border-glass)' }}
                  aria-label="Download chart"
                >
                  <Download size={15} style={{ color: 'var(--text-secondary)' }} />
                </motion.a>

                {/* Info toggle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowInfo(v => !v)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: showInfo ? 'rgba(0,229,255,0.1)' : 'var(--sidebar-active-bg)',
                    border: showInfo ? '1px solid rgba(0,229,255,0.3)' : '1px solid var(--border-glass)',
                  }}
                  aria-label="Toggle info panel"
                >
                  <Info size={15} style={{ color: showInfo ? '#00e5ff' : 'var(--text-secondary)' }} />
                </motion.button>

                {/* Close */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl flex items-center justify-center ml-2"
                  style={{ background: 'rgba(255,23,68,0.1)', border: '1px solid rgba(255,23,68,0.3)' }}
                  aria-label="Close lightbox"
                >
                  <X size={15} style={{ color: '#ff1744' }} />
                </motion.button>
              </div>
            </div>

            {/* Image + Info */}
            <div className="flex-1 flex min-h-0">
              {/* Image area */}
              <div className="flex-1 flex items-center justify-center p-6 min-w-0">
                <TransformWrapper
                  key={chart.id}
                  initialScale={1}
                  minScale={0.5}
                  maxScale={5}
                  centerOnInit
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                      {/* Zoom controls */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-2 rounded-xl"
                        style={{ background: 'var(--bg-glass-heavy)', border: '1px solid var(--border-glass)' }}>
                        <button onClick={() => zoomOut()} className="p-1 hover:text-neon-cyan transition-colors" aria-label="Zoom out">
                          <ZoomOut size={14} style={{ color: 'var(--text-secondary)' }} />
                        </button>
                        <div className="w-px h-4" style={{ background: 'var(--border-glass)' }} />
                        <button onClick={() => zoomIn()} className="p-1 hover:text-neon-cyan transition-colors" aria-label="Zoom in">
                          <ZoomIn size={14} style={{ color: 'var(--text-secondary)' }} />
                        </button>
                        <div className="w-px h-4" style={{ background: 'var(--border-glass)' }} />
                        <button onClick={() => resetTransform()} className="p-1 hover:text-neon-cyan transition-colors" aria-label="Reset zoom">
                          <RotateCcw size={14} style={{ color: 'var(--text-secondary)' }} />
                        </button>
                        <span className="text-[9px] ml-1 font-mono" style={{ color: 'var(--text-muted)' }}>
                          Scroll/Pinch to zoom
                        </span>
                      </div>

                      <TransformComponent
                        wrapperStyle={{ width: '100%', height: '100%', maxHeight: 'calc(100vh - 160px)' }}
                        contentStyle={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <motion.div
                          key={chart.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25 }}
                          className="rounded-xl overflow-hidden"
                          style={{ boxShadow: `0 0 60px ${variable.color}20, 0 20px 80px rgba(0,0,0,0.6)` }}
                        >
                          <img
                            src={chart.path}
                            alt={`${variable.label} — ${chart.monthName}`}
                            style={{ maxWidth: '80vw', maxHeight: 'calc(100vh - 200px)', objectFit: 'contain', display: 'block' }}
                            draggable={false}
                          />
                        </motion.div>
                      </TransformComponent>
                    </>
                  )}
                </TransformWrapper>
              </div>

              {/* Info panel */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, x: 20, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: 300 }}
                    exit={{ opacity: 0, x: 20, width: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="flex-shrink-0 overflow-hidden border-l"
                    style={{ borderColor: 'var(--border-glass)' }}
                  >
                    <div className="w-72 h-full overflow-y-auto p-5 space-y-4">
                      {/* Variable header */}
                      <div className="rounded-xl p-4"
                        style={{ background: `${variable.color}10`, border: `1px solid ${variable.color}25` }}>
                        <div className="text-xs font-bold uppercase tracking-wider mb-1"
                          style={{ color: variable.color }}>{variable.label}</div>
                        <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                          {chart.monthName}
                        </div>
                        <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                          Unit: {variable.unit}
                        </div>
                      </div>

                      {/* Scientific Insight */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                          Scientific Insight
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {chart.insight}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                          Classification
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {chart.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-medium capitalize"
                              style={{ background: 'var(--sidebar-active-bg)', border: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Variable summary */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                          30-Year Trend
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {variable.trendSummary}
                        </p>
                      </div>

                      {/* Keyboard hints */}
                      <div className="rounded-lg p-3" style={{ background: 'var(--sidebar-active-bg)', border: '1px solid var(--border-glass)' }}>
                        <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                          Keyboard Shortcuts
                        </div>
                        <div className="space-y-1">
                          {[['← →', 'Navigate'], ['ESC', 'Close'], ['Scroll', 'Zoom']].map(([k, v]) => (
                            <div key={k} className="flex justify-between items-center">
                              <kbd className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                                style={{ background: 'var(--kbd-bg)', color: 'var(--text-muted)' }}>{k}</kbd>
                              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation — Right */}
          <motion.button
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'var(--bg-glass-heavy)', border: '1px solid var(--border-glass)', boxShadow: '0 0 20px var(--border-glass)' }}
            aria-label="Next chart"
          >
            <ChevronRight size={20} style={{ color: '#00e5ff' }} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
