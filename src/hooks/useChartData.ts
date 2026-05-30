'use client';
import { useState, useEffect, useCallback } from 'react';
import Fuse from 'fuse.js';
import { ALL_CHARTS, ChartMeta, ClimateVariable, getChartsByVariable } from '@/lib/chartData';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━
// FUSE.JS SEARCH ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━
const fuse = new Fuse(ALL_CHARTS, {
  keys: ['variable', 'monthName', 'monthShort', 'tags', 'insight', 'id'],
  threshold: 0.35,
  includeScore: true,
  includeMatches: true,
});

export interface FilterState {
  variable: ClimateVariable | 'all';
  months: number[];
  season: string | 'all';
  searchQuery: string;
}

const DEFAULT_FILTERS: FilterState = {
  variable: 'all',
  months: [],
  season: 'all',
  searchQuery: '',
};

export function useChartFilter() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [results, setResults] = useState<ChartMeta[]>(ALL_CHARTS);
  const [isFiltering, setIsFiltering] = useState(false);

  const applyFilters = useCallback((f: FilterState) => {
    let filtered: ChartMeta[] = ALL_CHARTS;

    // Search
    if (f.searchQuery.trim()) {
      const searchResults = fuse.search(f.searchQuery.trim());
      filtered = searchResults.map(r => r.item);
    }

    // Variable filter
    if (f.variable !== 'all') {
      filtered = filtered.filter(c => c.variable === f.variable);
    }

    // Month filter
    if (f.months.length > 0) {
      filtered = filtered.filter(c => f.months.includes(c.month));
    }

    // Season filter
    if (f.season !== 'all') {
      filtered = filtered.filter(c => c.season === f.season);
    }

    setResults(filtered);
    setIsFiltering(false);
  }, []);

  useEffect(() => {
    setIsFiltering(true);
    const timeout = setTimeout(() => applyFilters(filters), 250);
    return () => clearTimeout(timeout);
  }, [filters, applyFilters]);

  const setVariable = (variable: ClimateVariable | 'all') =>
    setFilters(f => ({ ...f, variable }));

  const setSearchQuery = (searchQuery: string) =>
    setFilters(f => ({ ...f, searchQuery }));

  const toggleMonth = (month: number) =>
    setFilters(f => ({
      ...f,
      months: f.months.includes(month)
        ? f.months.filter(m => m !== month)
        : [...f.months, month],
    }));

  const setSeason = (season: string) =>
    setFilters(f => ({ ...f, season }));

  const reset = () => setFilters(DEFAULT_FILTERS);

  const activeFilterCount =
    (filters.variable !== 'all' ? 1 : 0) +
    filters.months.length +
    (filters.season !== 'all' ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return {
    filters,
    results,
    isFiltering,
    activeFilterCount,
    setVariable,
    setSearchQuery,
    toggleMonth,
    setSeason,
    reset,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━
// FAVORITES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cip-favorites');
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  const toggle = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('cip-favorites', JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const favoriteCharts = ALL_CHARTS.filter(c => favorites.includes(c.id));

  return { favorites, favoriteCharts, toggle, isFavorite };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━
// RECENTLY VIEWED
// ━━━━━━━━━━━━━━━━━━━━━━━━━━
export function useRecentlyViewed() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('cip-recent');
      if (stored) setRecent(JSON.parse(stored));
    } catch {}
  }, []);

  const addRecent = (id: string) => {
    setRecent(prev => {
      const next = [id, ...prev.filter(r => r !== id)].slice(0, 12);
      sessionStorage.setItem('cip-recent', JSON.stringify(next));
      return next;
    });
  };

  const recentCharts = recent
    .map(id => ALL_CHARTS.find(c => c.id === id))
    .filter(Boolean) as ChartMeta[];

  return { recentCharts, addRecent };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━
// KEYBOARD SHORTCUTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━
export function useKeyboardShortcuts(handlers: {
  onSearch?: () => void;
  onEsc?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        handlers.onSearch?.();
      }
      if (e.key === 'Escape') handlers.onEsc?.();
      if (e.key === 'ArrowRight') handlers.onNext?.();
      if (e.key === 'ArrowLeft') handlers.onPrev?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handlers]);
}
