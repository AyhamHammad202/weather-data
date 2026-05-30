'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ChevronRight } from 'lucide-react';
import { ChartMeta, VARIABLES } from '@/lib/chartData';

interface FavoritesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteCharts: ChartMeta[];
  onRemove: (id: string) => void;
  onChartClick: (chart: ChartMeta) => void;
}

export default function FavoritesPanel({
  isOpen, onClose, favoriteCharts, onRemove, onChartClick
}: FavoritesPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(2,4,8,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col"
            style={{
              width: 340,
              background: 'var(--bg-glass-heavy)',
              borderLeft: '1px solid var(--border-glass)',
              backdropFilter: 'blur(32px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: 'var(--border-glass)' }}>
              <div className="flex items-center gap-2">
                <Star size={16} style={{ color: '#ffd60a', fill: '#ffd60a' }} />
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Favorites</span>
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold"
                  style={{ background: 'rgba(255,214,10,0.15)', color: '#ffd60a' }}>
                  {favoriteCharts.length}
                </span>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Close favorites">
                <X size={14} style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {favoriteCharts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <Star size={32} style={{ color: 'var(--text-muted)' }} />
                  <div className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>No favorites yet</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Click the ★ on any chart card to save it here
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {favoriteCharts.map((chart, i) => {
                    const variable = VARIABLES[chart.variable];
                    return (
                      <motion.div
                        key={chart.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer group transition-all"
                        style={{
                          background: 'var(--bg-glass-card)',
                          border: '1px solid var(--border-glass-card)',
                        }}
                        onClick={() => { onChartClick(chart); onClose(); }}
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0"
                          style={{ border: `1px solid ${variable.color}30` }}>
                          <img src={chart.path} alt={chart.monthName}
                            className="w-full h-full object-cover" loading="lazy" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                            {chart.monthName}
                          </div>
                          <div className="text-[10px] font-medium mt-0.5" style={{ color: variable.color }}>
                            {variable.label}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={e => { e.stopPropagation(); onRemove(chart.id); }}
                            className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
                            aria-label="Remove from favorites"
                          >
                            <X size={10} style={{ color: '#ff1744' }} />
                          </button>
                          <ChevronRight size={12} style={{ color: 'var(--text-muted)' }} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {favoriteCharts.length > 0 && (
              <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--border-glass)' }}>
                <button
                  onClick={() => window.print()}
                  className="w-full py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(41,121,255,0.15))',
                    border: '1px solid rgba(0,229,255,0.25)',
                    color: '#00e5ff',
                  }}
                >
                  Export Report (PDF)
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
