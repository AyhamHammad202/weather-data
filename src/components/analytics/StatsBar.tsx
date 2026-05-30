'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { VARIABLES, ANALYTICS, MONTHLY_AVERAGES } from '@/lib/chartData';

const STATS = [
  { label: 'Total Charts', value: `${ANALYTICS.totalCharts}`, unit: 'PNG', color: '#00e5ff' },
  { label: 'Variables', value: `${ANALYTICS.totalVariables}`, unit: 'types', color: '#2979ff' },
  { label: 'Data Period', value: `${ANALYTICS.totalYears}`, unit: 'years', color: '#a855f7' },
  { label: 'Peak Temp', value: '44', unit: '°C', color: '#ff6b35' },
  { label: 'Max Rain', value: '32', unit: 'mm', color: '#00b4d8' },
  { label: 'Max Sun', value: '12.5', unit: 'hrs/day', color: '#ffd60a' },
  { label: 'Max Evap', value: '16', unit: 'mm/day', color: '#f77f00' },
  { label: 'Year Start', value: `${ANALYTICS.dataYearStart}`, unit: '', color: '#00ff88' },
];

export default function StatsBar() {
  return (
    <div className="rounded-xl overflow-hidden mb-6"
      style={{ background: 'var(--stats-bg)', border: '1px solid var(--stats-border)' }}>
      {/* Top accent */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #00e5ff40, #2979ff40, #7c3aed40, transparent)' }} />

      <div className="grid grid-cols-4 md:grid-cols-8 divide-x"
        style={{ borderColor: 'var(--chart-grid-color)' }}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="px-3 py-3 text-center border-r"
            style={{ borderColor: 'var(--chart-grid-color)' }}
          >
            <div className="text-lg font-black font-mono leading-none" style={{ color: stat.color }}>
              {stat.value}
              {stat.unit && (
                <span className="text-[9px] font-normal ml-0.5" style={{ color: `${stat.color}80` }}>
                  {stat.unit}
                </span>
              )}
            </div>
            <div className="text-[9px] mt-1 font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
