'use client';
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import WeatherParticles from '@/components/layout/WeatherParticles';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MasonryGallery from '@/components/gallery/MasonryGallery';
import FilterPanel from '@/components/filters/FilterPanel';
import StatsBar from '@/components/analytics/StatsBar';
import InsightsPanel from '@/components/analytics/InsightsPanel';
import TrendChart from '@/components/analytics/TrendChart';
import CorrelationMatrix from '@/components/analytics/CorrelationMatrix';
import TimelineSlider from '@/components/timeline/TimelineSlider';
import FavoritesPanel from '@/components/favorites/FavoritesPanel';
import { useChartFilter, useFavorites, useRecentlyViewed } from '@/hooks/useChartData';
import { ANALYTICS, VARIABLES } from '@/lib/chartData';

export default function DashboardPage() {
  const { filters, results, isFiltering, activeFilterCount, setVariable, setSearchQuery, toggleMonth, setSeason, reset } = useChartFilter();
  const { favoriteCharts, toggle: toggleFavorite } = useFavorites();
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [activeMonth, setActiveMonth] = useState<number | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Sync timeline month with month filter
  const handleMonthChange = useCallback((month: number | null | ((prev: number | null) => number | null)) => {
    if (typeof month === 'function') {
      setActiveMonth(prev => {
        const next = month(prev);
        if (next !== null) toggleMonth(next);
        return next;
      });
    } else {
      setActiveMonth(month);
      if (month !== null) {
        // Set single month
        if (filters.months.length === 1 && filters.months[0] === month) {
          // deselect
        } else {
          reset();
          toggleMonth(month);
        }
      } else {
        reset();
      }
    }
  }, [filters.months, reset, toggleMonth]);

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      <WeatherParticles variant="mixed" intensity={0.5} />
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen"
        style={{ marginLeft: 'var(--sidebar-offset, 240px)', paddingTop: 64, transition: 'margin-left 0.3s ease' }}>
        <Header
          searchQuery={filters.searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={results.length}
          onFavoritesOpen={() => setFavoritesOpen(true)}
        />

        <main className="flex-1 relative z-10">
          <div className="max-w-screen-2xl mx-auto px-6 py-6">

            {/* Hero banner */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 rounded-2xl overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, rgba(0,229,255,0.06), rgba(41,121,255,0.04), rgba(124,58,237,0.06))',
                border: '1px solid rgba(0,229,255,0.1)',
                padding: '28px 32px',
              }}
            >
              {/* Scan line animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-x-0 h-px opacity-20"
                  style={{ background: 'linear-gradient(90deg, transparent, #00e5ff, transparent)', animation: 'scan-line 4s linear infinite', top: '30%' }} />
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="status-dot" style={{ width: 6, height: 6 }} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#00ff88' }}>
                        LIVE CLIMATE INTELLIGENCE SYSTEM
                      </span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight mb-2 gradient-text">
                      {ANALYTICS.station}
                    </h1>
                    <p className="text-sm max-w-xl" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {ANALYTICS.totalCharts} monthly climate charts across {ANALYTICS.totalVariables} atmospheric variables.
                      {ANALYTICS.totalYears}-year observational record ({ANALYTICS.dataYearStart}–{ANALYTICS.dataYearEnd}).
                      {ANALYTICS.region} meteorological observatory dataset.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowAnalytics(a => !a)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                      style={{
                        background: showAnalytics ? 'rgba(0,229,255,0.15)' : 'rgba(255,255,255,0.05)',
                        border: showAnalytics ? '1px solid rgba(0,229,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
                        color: showAnalytics ? '#00e5ff' : '#4a6080',
                      }}
                    >
                      {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats bar */}
            <StatsBar />

            {/* Analytics panels */}
            {showAnalytics && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6"
              >
                <div className="space-y-4">
                  <TrendChart variable={filters.variable !== 'all' ? filters.variable : 'temperature'} />
                  <InsightsPanel variable={filters.variable} />
                </div>
                <CorrelationMatrix />
              </motion.div>
            )}

            {/* Main content grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Left sidebar - filters */}
              <div className="xl:col-span-1 space-y-4">
                <TimelineSlider activeMonth={activeMonth} onMonthChange={handleMonthChange} />
                <FilterPanel
                  filters={filters}
                  onVariableChange={setVariable}
                  onMonthToggle={toggleMonth}
                  onSeasonChange={setSeason}
                  onReset={reset}
                  activeCount={activeFilterCount}
                />

                {/* Recently viewed */}
                <RecentlyViewed />
              </div>

              {/* Gallery */}
              <div className="xl:col-span-3">
                <MasonryGallery charts={results} isFiltering={isFiltering} />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t py-4 px-6"
          style={{ borderColor: 'var(--border-glass)', background: 'var(--footer-bg)' }}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
              CLIMATE INTELLIGENCE PLATFORM · {ANALYTICS.region.toUpperCase()} · {ANALYTICS.totalYears}-YR DATASET
            </div>
            <div className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
              {ANALYTICS.dataYearStart}–{ANALYTICS.dataYearEnd} · {ANALYTICS.totalCharts} CHARTS · 7 VARIABLES
            </div>
          </div>
        </footer>
      </div>

      {/* Favorites panel */}
      <FavoritesPanel
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favoriteCharts={favoriteCharts}
        onRemove={toggleFavorite}
        onChartClick={() => {}}
      />
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━
// RECENTLY VIEWED
// ━━━━━━━━━━━━━━━━━━━━━━━━━━
function RecentlyViewed() {
  const { recentCharts } = useRecentlyViewed();

  if (recentCharts.length === 0) return null;

  return (
    <div className="rounded-xl p-4"
      style={{ background: 'rgba(13,20,37,0.5)', border: '1px solid rgba(30,45,74,0.7)' }}>
      <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#4a6080' }}>
        Recently Viewed
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {recentCharts.slice(0, 6).map(chart => {
          const color = VARIABLES[chart.variable].color;
          return (
            <div key={chart.id}
              className="rounded-lg overflow-hidden cursor-pointer transition-all hover:opacity-80"
              style={{ aspectRatio: '4/3', border: `1px solid ${color}25` }}>
              <img src={chart.path} alt={chart.monthName} className="w-full h-full object-cover" loading="lazy" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
