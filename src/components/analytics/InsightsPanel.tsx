'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { VARIABLES, ClimateVariable, ANALYTICS } from '@/lib/chartData';

interface InsightsPanelProps {
  variable: ClimateVariable | 'all';
}

const GLOBAL_INSIGHTS = [
  {
    icon: TrendingUp,
    color: '#ff6b35',
    title: 'Long-term Warming Trend',
    body: 'Mean annual temperature has increased by +0.8°C per decade, consistent with regional climate change projections for Baghdad and central Iraq.',
    severity: 'warning',
  },
  {
    icon: AlertTriangle,
    color: '#ffd60a',
    title: 'Rainfall Variability Increasing',
    body: 'Interannual variability in winter precipitation has amplified post-2010, with more frequent extremes on both ends of the distribution.',
    severity: 'caution',
  },
  {
    icon: TrendingUp,
    color: '#f77f00',
    title: 'Evaporation Demand Rising',
    body: 'Annual pan evaporation has increased by +3.2% per decade, driven by temperature rise and declining relative humidity in summer.',
    severity: 'warning',
  },
  {
    icon: CheckCircle,
    color: '#00ff88',
    title: 'Solar Resource Stable',
    body: 'Sunshine hours remain consistently high (>3,000 hrs/year), confirming the region\'s exceptional solar energy potential remains undiminished.',
    severity: 'positive',
  },
  {
    icon: TrendingDown,
    color: '#48cae4',
    title: 'Spring Humidity Declining',
    body: 'A statistically significant drying trend is detectable in March-May relative humidity values over the 30-year observation window.',
    severity: 'info',
  },
];

export default function InsightsPanel({ variable }: InsightsPanelProps) {
  const meta = variable !== 'all' ? VARIABLES[variable] : null;
  const insights = meta ? meta.keyInsights : GLOBAL_INSIGHTS.map(i => i.body);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 rounded-full" style={{ background: meta?.color || '#00e5ff' }} />
        <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>
          {meta ? `${meta.label} Insights` : 'Climate Intelligence Insights'}
        </h3>
      </div>

      {/* Trend summary */}
      {meta && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4 mb-4"
          style={{ background: `${meta.color}08`, border: `1px solid ${meta.color}20` }}
        >
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: meta.color }}>
            30-Year Trend Summary
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {meta.trendSummary}
          </p>
        </motion.div>
      )}

      {/* Key insights */}
      {meta ? (
        <div className="space-y-2">
          {meta.keyInsights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-3 p-3 rounded-xl"
              style={{ background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass-card)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: meta.color }} />
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{insight}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {GLOBAL_INSIGHTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-3 p-4 rounded-xl"
              style={{
                background: `${item.color}08`,
                border: `1px solid ${item.color}20`,
              }}
            >
              <item.icon size={14} style={{ color: item.color, flexShrink: 0, marginTop: 1 }} />
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: item.color }}>
                  {item.title}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Data source footer */}
      <div className="rounded-lg px-3 py-2 mt-4"
        style={{ background: 'var(--sidebar-active-bg)', border: '1px solid var(--border-glass)' }}>
        <div className="text-[9px] font-mono" style={{ color: 'var(--text-muted)' }}>
          DATA SOURCE · {ANALYTICS.station.toUpperCase()} · {ANALYTICS.dataYearStart}–{ANALYTICS.dataYearEnd}
          · {ANALYTICS.region.toUpperCase()} · {ANALYTICS.totalCharts} monthly charts
        </div>
      </div>
    </div>
  );
}
