'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Thermometer, CloudRain, Droplets, Activity, Wind, Sun, Gauge, Grid3X3
} from 'lucide-react';
import { VARIABLES, MONTHS, ClimateVariable } from '@/lib/chartData';
import { FilterState } from '@/hooks/useChartData';

interface FilterPanelProps {
  filters: FilterState;
  onVariableChange: (v: ClimateVariable | 'all') => void;
  onMonthToggle: (m: number) => void;
  onSeasonChange: (s: string) => void;
  onReset: () => void;
  activeCount: number;
}

const ICONS: Record<string, React.ElementType> = {
  temperature: Thermometer,
  rainfall: CloudRain,
  humidity: Droplets,
  evaporation: Activity,
  wind: Wind,
  sunshine: Sun,
  pressure: Gauge,
};

const SEASONS = [
  { id: 'winter', label: 'Winter', color: '#90e0ef', months: 'Dec–Feb' },
  { id: 'spring', label: 'Spring', color: '#00ff88', months: 'Mar–May' },
  { id: 'summer', label: 'Summer', color: '#ffd60a', months: 'Jun–Aug' },
  { id: 'autumn', label: 'Autumn', color: '#f77f00', months: 'Sep–Nov' },
];

export default function FilterPanel({
  filters, onVariableChange, onMonthToggle, onSeasonChange, onReset, activeCount
}: FilterPanelProps) {
  return (
    <div className="rounded-xl p-4 space-y-5"
      style={{ background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass-card)' }}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
            Filters
          </span>
          {activeCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
              style={{ background: 'rgba(0,229,255,0.2)', color: '#00e5ff' }}
            >
              {activeCount}
            </motion.span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-[10px] font-medium transition-colors hover:text-neon-cyan"
            style={{ color: 'var(--text-muted)' }}
          >
            Reset all
          </button>
        )}
      </div>

      {/* Variable Filter */}
      <div className="space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Variable</div>
        <div className="grid grid-cols-2 gap-1.5">
          {/* All */}
          <VariableChip
            id="all"
            label="All"
            icon={Grid3X3}
            color="#00e5ff"
            isActive={filters.variable === 'all'}
            onClick={() => onVariableChange('all')}
          />
          {(Object.keys(VARIABLES) as ClimateVariable[]).map(v => (
            <VariableChip
              key={v}
              id={v}
              label={VARIABLES[v].label}
              icon={ICONS[v]}
              color={VARIABLES[v].color}
              isActive={filters.variable === v}
              onClick={() => onVariableChange(v)}
            />
          ))}
        </div>
      </div>

      {/* Season Filter */}
      <div className="space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Season</div>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => onSeasonChange('all')}
            className="px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all text-center"
            style={{
              background: filters.season === 'all' ? 'rgba(0,229,255,0.1)' : 'var(--sidebar-active-bg)',
              border: filters.season === 'all' ? '1px solid rgba(0,229,255,0.3)' : '1px solid var(--border-glass)',
              color: filters.season === 'all' ? '#00e5ff' : 'var(--text-muted)',
            }}
          >
            All Seasons
          </button>
          {SEASONS.map(s => (
            <button
              key={s.id}
              onClick={() => onSeasonChange(s.id)}
              className="px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all text-left"
              style={{
                background: filters.season === s.id ? `${s.color}15` : 'var(--sidebar-active-bg)',
                border: filters.season === s.id ? `1px solid ${s.color}40` : '1px solid var(--border-glass)',
                color: filters.season === s.id ? s.color : 'var(--text-muted)',
              }}
            >
              <div>{s.label}</div>
              <div className="text-[9px] opacity-60 mt-0.5">{s.months}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Month Filter */}
      <div className="space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Month</div>
        <div className="grid grid-cols-4 gap-1">
          {MONTHS.map(m => {
            const isActive = filters.months.includes(m.num);
            return (
              <button
                key={m.num}
                onClick={() => onMonthToggle(m.num)}
                className="py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all"
                style={{
                  background: isActive
                    ? `${SEASON_COLORS[m.season]}20`
                    : 'var(--sidebar-active-bg)',
                  border: isActive
                    ? `1px solid ${SEASON_COLORS[m.season]}40`
                    : '1px solid var(--border-glass)',
                  color: isActive ? SEASON_COLORS[m.season] : 'var(--text-muted)',
                }}
              >
                {m.short}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VariableChip({ id, label, icon: Icon, color, isActive, onClick }: {
  id: string; label: string; icon: React.ElementType; color: string; isActive: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all text-left"
      style={{
        background: isActive ? `${color}15` : 'var(--sidebar-active-bg)',
        border: isActive ? `1px solid ${color}40` : '1px solid var(--border-glass)',
        color: isActive ? color : 'var(--text-muted)',
        boxShadow: isActive ? `0 0 12px ${color}15` : 'none',
      }}
    >
      <Icon size={11} style={{ color: isActive ? color : 'var(--text-muted)', flexShrink: 0 }} />
      <span className="truncate">{label}</span>
    </button>
  );
}

const SEASON_COLORS: Record<string, string> = {
  winter: '#90e0ef',
  spring: '#00ff88',
  summer: '#ffd60a',
  autumn: '#f77f00',
};
