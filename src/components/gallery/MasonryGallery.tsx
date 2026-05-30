'use client';
import React, { useState, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { AnimatePresence, motion } from 'framer-motion';
import { ChartMeta } from '@/lib/chartData';
import ChartCard from './ChartCard';
import Lightbox from './Lightbox';
import { useFavorites, useRecentlyViewed } from '@/hooks/useChartData';

interface MasonryGalleryProps {
  charts: ChartMeta[];
  isFiltering?: boolean;
}

const BREAKPOINTS = {
  default: 4,
  1400: 3,
  1024: 2,
  640: 1,
};

export default function MasonryGallery({ charts, isFiltering }: MasonryGalleryProps) {
  const [lightboxChart, setLightboxChart] = useState<ChartMeta | null>(null);
  const { isFavorite, toggle } = useFavorites();
  const { addRecent } = useRecentlyViewed();

  const openLightbox = useCallback((chart: ChartMeta) => {
    setLightboxChart(chart);
    addRecent(chart.id);
  }, [addRecent]);

  const closeLightbox = useCallback(() => setLightboxChart(null), []);

  const navigateLightbox = useCallback((chart: ChartMeta) => {
    setLightboxChart(chart);
    addRecent(chart.id);
  }, [addRecent]);

  if (charts.length === 0 && !isFiltering) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 gap-4"
      >
        <div className="text-5xl">🔍</div>
        <div className="text-lg font-semibold" style={{ color: '#e8f4ff' }}>No charts found</div>
        <div className="text-sm" style={{ color: '#4a6080' }}>Try adjusting your search or filters</div>
      </motion.div>
    );
  }

  return (
    <>
      {/* Results count bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isFiltering ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-neon-cyan border-t-transparent animate-spin"
                style={{ borderColor: '#00e5ff', borderTopColor: 'transparent' }} />
              <span className="text-xs" style={{ color: '#4a6080' }}>Filtering…</span>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.span
                key={charts.length}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="text-xs font-mono"
                style={{ color: '#4a6080' }}
              >
                <span style={{ color: '#00e5ff', fontWeight: 600 }}>{charts.length}</span> charts displayed
              </motion.span>
            </AnimatePresence>
          )}
        </div>
        <div className="text-[10px] font-mono" style={{ color: '#2d4060' }}>
          Click any chart to view full screen
        </div>
      </div>

      {/* Masonry Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={charts.map(c => c.id).join(',')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Masonry
            breakpointCols={BREAKPOINTS}
            className="masonry-grid"
            columnClassName="masonry-grid-col"
          >
            {charts.map((chart, index) => (
              <ChartCard
                key={chart.id}
                chart={chart}
                index={index}
                isFavorite={isFavorite(chart.id)}
                onToggleFavorite={toggle}
                onClick={() => openLightbox(chart)}
              />
            ))}
          </Masonry>
        </motion.div>
      </AnimatePresence>

      {/* Lightbox */}
      <Lightbox
        chart={lightboxChart}
        allCharts={charts}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
        isFavorite={lightboxChart ? isFavorite(lightboxChart.id) : false}
        onToggleFavorite={toggle}
      />
    </>
  );
}
