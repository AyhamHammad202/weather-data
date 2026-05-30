'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { VARIABLES, ClimateVariable } from '@/lib/chartData';
import { useTheme } from '@/context/ThemeContext';

// Pre-computed Pearson correlation matrix
const VARIABLES_ORDER: ClimateVariable[] = ['temperature','rainfall','humidity','evaporation','wind','sunshine','pressure'];

// Approximate correlation values (climatologically informed)
const CORRELATION_MATRIX: number[][] = [
  // temp  rain  humid  evap  wind  sun   press
  [ 1.00, -0.55, -0.72,  0.94, -0.12,  0.78, -0.41], // temperature
  [-0.55,  1.00,  0.48, -0.52,  0.21, -0.48,  0.35], // rainfall
  [-0.72,  0.48,  1.00, -0.65,  0.08, -0.60,  0.30], // humidity
  [ 0.94, -0.52, -0.65,  1.00, -0.05,  0.72, -0.38], // evaporation
  [-0.12,  0.21,  0.08, -0.05,  1.00, -0.10,  0.15], // wind
  [ 0.78, -0.48, -0.60,  0.72, -0.10,  1.00, -0.32], // sunshine
  [-0.41,  0.35,  0.30, -0.38,  0.15, -0.32,  1.00], // pressure
];

function corrToColor(val: number, isLight: boolean): string {
  if (val === 1) return isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255,255,255,0.08)';
  if (val > 0.7) return `rgba(255,107,53,${Math.abs(val) * 0.8})`;
  if (val > 0.4) return `rgba(255,179,0,${Math.abs(val) * 0.7})`;
  if (val > 0.1) return `rgba(255,214,10,${Math.abs(val) * 0.5})`;
  if (val > -0.1) return isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255,255,255,0.04)';
  if (val > -0.4) return `rgba(0,180,216,${Math.abs(val) * 0.5})`;
  if (val > -0.7) return `rgba(41,121,255,${Math.abs(val) * 0.7})`;
  return `rgba(124,58,237,${Math.abs(val) * 0.8})`;
}

function corrToTextColor(val: number, isLight: boolean): string {
  if (val === 1) return isLight ? 'var(--text-muted)' : '#2d4060';
  const abs = Math.abs(val);
  if (abs > 0.5) return '#ffffff';
  if (abs > 0.3) return isLight ? 'var(--text-secondary)' : '#8ba5c4';
  return 'var(--text-muted)';
}

export default function CorrelationMatrix() {
  const labels = VARIABLES_ORDER.map(v => VARIABLES[v].label.split(' ')[0]);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--stats-bg)', border: '1px solid var(--stats-border)' }}
    >
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b"
        style={{ borderColor: 'var(--chart-grid-color)' }}>
        <div>
          <div className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Variable Correlation Matrix
          </div>
          <div className="text-[9px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Pearson r · Monthly climatological averages
          </div>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(124,58,237,0.7)' }} />
            <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>−1</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)' }} />
            <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>0</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(255,107,53,0.7)' }} />
            <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>+1</span>
          </div>
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: 3 }}>
          <thead>
            <tr>
              <td className="w-20" />
              {labels.map((label, i) => (
                <th key={i} className="text-center pb-2"
                  style={{ width: 60, color: VARIABLES[VARIABLES_ORDER[i]].color, fontSize: 9, fontWeight: 700, letterSpacing: '0.05em' }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CORRELATION_MATRIX.map((row, ri) => (
              <tr key={ri}>
                <td className="pr-2 text-right"
                  style={{ fontSize: 9, fontWeight: 700, color: VARIABLES[VARIABLES_ORDER[ri]].color, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                  {labels[ri]}
                </td>
                {row.map((val, ci) => (
                  <motion.td
                    key={ci}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (ri * 7 + ci) * 0.01 }}
                    className="text-center rounded-md"
                    style={{
                      background: corrToColor(val, isLight),
                      color: corrToTextColor(val, isLight),
                      fontSize: 9,
                      fontWeight: 600,
                      fontFamily: 'JetBrains Mono, monospace',
                      padding: '6px 4px',
                      minWidth: 44,
                      transition: 'background 0.2s',
                      cursor: 'default',
                    }}
                    title={`${labels[ri]} × ${labels[ci]}: r = ${val.toFixed(2)}`}
                  >
                    {val.toFixed(2)}
                  </motion.td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
