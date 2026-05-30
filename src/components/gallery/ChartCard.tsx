'use client';
import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Maximize2, Eye } from 'lucide-react';
import { ChartMeta, VARIABLES } from '@/lib/chartData';

interface ChartCardProps {
  chart: ChartMeta;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: () => void;
  index: number;
}

export default function ChartCard({
  chart, isFavorite, onToggleFavorite, onClick, index
}: ChartCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const variable = VARIABLES[chart.variable];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.5) }}
      className="chart-card mb-4 relative rounded-xl overflow-hidden cursor-pointer group"
      style={{
        background: 'var(--bg-glass-card)',
        border: hovered ? `1px solid ${variable.color}50` : '1px solid var(--border-glass-card)',
        boxShadow: hovered
          ? `0 12px 40px var(--card-shadow), 0 0 30px ${variable.color}20`
          : '0 4px 16px var(--card-shadow)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Image container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {/* Loading skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse"
            style={{ background: 'linear-gradient(90deg, #0d1425 25%, #111827 50%, #0d1425 75%)', backgroundSize: '200% 100%' }} />
        )}

        {/* Chart Image */}
        {!imageError ? (
          <motion.div
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="w-full h-full"
          >
            <Image
              src={chart.path}
              alt={`${variable.label} - ${chart.monthName}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: 'rgba(8,13,26,0.8)' }}>
            <div className="text-2xl">📊</div>
            <div className="text-xs text-center px-2" style={{ color: 'var(--text-muted)' }}>
              {chart.filename}
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(2,4,8,0.6)', backdropFilter: 'blur(2px)' }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{
                  background: `${variable.color}20`,
                  border: `1px solid ${variable.color}50`,
                  boxShadow: `0 0 20px ${variable.color}30`,
                }}
              >
                <Maximize2 size={14} style={{ color: variable.color }} />
                <span className="text-xs font-semibold" style={{ color: variable.color }}>
                  View Full Screen
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Variable badge */}
        <div className="absolute top-2 left-2">
          <div
            className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: `${variable.color}20`,
              border: `1px solid ${variable.color}40`,
              color: variable.color,
              backdropFilter: 'blur(8px)',
            }}
          >
            {chart.monthShort}
          </div>
        </div>

        {/* Favorite button */}
        <div className="absolute top-2 right-2">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={e => { e.stopPropagation(); onToggleFavorite(chart.id); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{
              background: isFavorite ? 'rgba(255,214,10,0.2)' : 'rgba(0,0,0,0.5)',
              border: isFavorite ? '1px solid rgba(255,214,10,0.5)' : '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star
              size={12}
              style={{
                color: isFavorite ? '#ffd60a' : 'var(--text-muted)',
                fill: isFavorite ? '#ffd60a' : 'none',
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
              {chart.monthName}
            </div>
            <div className="text-[10px] font-medium mt-0.5" style={{ color: variable.color }}>
              {variable.label}
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: SEASON_COLORS[chart.season],
                boxShadow: `0 0 4px ${SEASON_COLORS[chart.season]}80`,
              }}
            />
            <span className="text-[9px] capitalize" style={{ color: 'var(--text-muted)' }}>
              {chart.season}
            </span>
          </div>
        </div>

        {/* Insight teaser */}
        <p className="text-[10px] mt-1.5 leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>
          {chart.insight}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
        style={{
          background: hovered
            ? `linear-gradient(90deg, transparent, ${variable.color}, transparent)`
            : 'transparent',
        }}
      />
    </motion.div>
  );
}

const SEASON_COLORS: Record<string, string> = {
  winter: '#90e0ef',
  spring: '#00ff88',
  summer: '#ffd60a',
  autumn: '#f77f00',
};
