'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WeatherParticles from '@/components/layout/WeatherParticles';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MasonryGallery from '@/components/gallery/MasonryGallery';
import InsightsPanel from '@/components/analytics/InsightsPanel';
import TrendChart from '@/components/analytics/TrendChart';
import TimelineSlider from '@/components/timeline/TimelineSlider';
import FavoritesPanel from '@/components/favorites/FavoritesPanel';
import { useFavorites } from '@/hooks/useChartData';
import { VARIABLES, ClimateVariable, getChartsByVariable, ANALYTICS } from '@/lib/chartData';

interface VariablePageClientProps {
  variable: ClimateVariable;
}

export default function VariablePageClient({ variable }: VariablePageClientProps) {
  const meta = VARIABLES[variable];
  const allCharts = getChartsByVariable(variable);

  const [activeMonth, setActiveMonth] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const { favoriteCharts, toggle } = useFavorites();

  const filteredCharts = activeMonth
    ? allCharts.filter(c => c.month === activeMonth)
    : searchQuery
    ? allCharts.filter(c =>
        c.monthName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.monthShort.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.season.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allCharts;

  const handleMonthChange = (month: number | null | ((prev: number | null) => number | null)) => {
    if (typeof month === 'function') {
      setActiveMonth(prev => month(prev));
    } else {
      setActiveMonth(month);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      <WeatherParticles variant={variable === 'rainfall' ? 'rain' : variable === 'sunshine' ? 'rays' : 'mixed'} intensity={0.5} />
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen"
        style={{ marginLeft: 'var(--sidebar-offset, 240px)', paddingTop: 64, transition: 'margin-left 0.3s ease' }}>
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredCharts.length}
          onFavoritesOpen={() => setFavoritesOpen(true)}
        />

        <main className="flex-1 relative z-10">
          <div className="max-w-screen-2xl mx-auto px-6 py-6">

            {/* Variable Hero */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden mb-6 relative"
              style={{
                background: meta.bgGradient,
                border: `1px solid ${meta.color}25`,
                padding: '28px 32px',
              }}
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full"
                  style={{ background: `radial-gradient(circle, ${meta.color}08, transparent 70%)` }} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider"
                    style={{ background: `${meta.color}20`, border: `1px solid ${meta.color}40`, color: meta.color }}>
                    {meta.unit}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="status-dot" style={{ width: 5, height: 5 }} />
                    <span className="text-[10px] font-mono uppercase tracking-widest"
                      style={{ color: '#00ff88' }}>
                      {allCharts.length} monthly charts
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl font-black mb-2" style={{ color: '#e8f4ff' }}>
                  {meta.label}
                  <span className="text-base font-normal ml-3" style={{ color: meta.color }}>
                    {meta.labelAr}
                  </span>
                </h1>
                <p className="text-sm max-w-2xl" style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  {meta.description} · {ANALYTICS.totalYears}-year record ({ANALYTICS.dataYearStart}–{ANALYTICS.dataYearEnd})
                </p>
              </div>
            </motion.div>

            {/* Main grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="xl:col-span-1 space-y-4">
                <TimelineSlider activeMonth={activeMonth} onMonthChange={handleMonthChange} />
                <TrendChart variable={variable} />
                <InsightsPanel variable={variable} />
              </div>

              {/* Gallery */}
              <div className="xl:col-span-3">
                <MasonryGallery charts={filteredCharts} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <FavoritesPanel
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favoriteCharts={favoriteCharts}
        onRemove={toggle}
        onChartClick={() => {}}
      />
    </div>
  );
}
