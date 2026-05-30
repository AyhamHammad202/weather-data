'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Bell, Settings, Download, Star, Sun, Moon, Menu } from 'lucide-react';
import { ALL_CHARTS, ANALYTICS } from '@/lib/chartData';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchFocus?: () => void;
  resultCount?: number;
  onFavoritesOpen?: () => void;
}

export default function Header({
  searchQuery,
  onSearchChange,
  onSearchFocus,
  resultCount,
  onFavoritesOpen,
}: HeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [focused, setFocused] = useState(false);
  const { theme, toggleTheme, mobileSidebarOpen, toggleMobileSidebar } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      setDate(now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ctrl+F shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        inputRef.current?.focus();
        onSearchFocus?.();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onSearchFocus]);

  return (
    <header
      className="fixed top-0 right-0 z-40 h-16 flex items-center glass-heavy"
      style={{
        left: 'var(--sidebar-offset, 240px)',
        borderBottom: '1px solid rgba(0,229,255,0.08)',
        transition: 'left 0.3s ease',
      }}
    >
      {/* Mobile Hamburger Menu Button */}
      {isMobile && (
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-lg ml-4 mr-1 hover:bg-white/5 text-neon-cyan active:scale-95 transition-all"
          style={{ border: '1px solid rgba(0,229,255,0.15)', background: 'rgba(0,229,255,0.03)' }}
          aria-label="Toggle Menu"
        >
          {mobileSidebarOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      )}

      {/* Platform Title */}
      <div className="flex items-center gap-3 px-4 sm:px-6 border-r border-white/5 h-full">
        <div>
          <div className="text-xs sm:text-sm font-bold tracking-wider uppercase"
            style={{ color: '#e8f4ff', letterSpacing: '0.12em' }}>
            Climate Intel
          </div>
          <div className="hidden sm:flex items-center gap-2 mt-0.5">
            <div className="status-dot" style={{ width: 5, height: 5 }} />
            <span className="text-[9px] font-mono tracking-widest uppercase"
              style={{ color: '#00ff88' }}>
              Live · {ANALYTICS.totalCharts} Charts
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 px-3 sm:px-6 max-w-md sm:max-w-xl">
        <div
          className="relative flex items-center rounded-xl transition-all duration-300"
          style={{
            background: focused ? 'rgba(0,229,255,0.05)' : 'rgba(13,20,37,0.6)',
            border: focused ? '1px solid rgba(0,229,255,0.4)' : '1px solid rgba(30,45,74,0.8)',
            boxShadow: focused ? '0 0 20px rgba(0,229,255,0.12)' : 'none',
          }}
        >
          <Search size={14} className="ml-3 flex-shrink-0" style={{ color: focused ? '#00e5ff' : '#4a6080' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder={isMobile ? "Search..." : "Search charts, variables, months… (Ctrl+F)"}
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted"
            style={{ color: '#e8f4ff', fontSize: 13 }}
            id="global-search"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => onSearchChange('')}
                className="mr-2 p-1 rounded-md hover:bg-white/10 transition-colors"
              >
                <X size={12} style={{ color: '#4a6080' }} />
              </motion.button>
            )}
          </AnimatePresence>
          {searchQuery && (
            <div className="mr-3 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold"
              style={{ background: 'rgba(0,229,255,0.1)', color: '#00e5ff' }}>
              {resultCount ?? 0} results
            </div>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 px-4 ml-auto">
        {/* Live Clock */}
        <div className="hidden lg:flex flex-col items-end mr-2">
          <span className="text-xs font-mono font-semibold" style={{ color: '#00e5ff' }}>{time}</span>
          <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{date}</span>
        </div>

        {/* Theme Toggle */}
        <IconButton
          onClick={toggleTheme}
          icon={theme === 'light' ? Moon : Sun}
          label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          color={theme === 'light' ? '#7c3aed' : '#ffd60a'}
        />

        {/* Favorites */}
        <IconButton
          onClick={onFavoritesOpen}
          icon={Star}
          label="Favorites"
          color="#ffd60a"
        />

        {/* Keyboard Shortcuts hint */}
        <div className="hidden xl:flex items-center gap-1 px-2 py-1 rounded-md"
          style={{ background: 'var(--sidebar-active-bg)', border: '1px solid var(--border-glass)' }}>
          <kbd className="text-[9px] font-mono px-1 py-0.5 rounded"
            style={{ background: 'var(--kbd-bg)', color: 'var(--text-muted)' }}>ESC</kbd>
          <kbd className="text-[9px] font-mono px-1 py-0.5 rounded"
            style={{ background: 'var(--kbd-bg)', color: 'var(--text-muted)' }}>←→</kbd>
          <kbd className="text-[9px] font-mono px-1 py-0.5 rounded"
            style={{ background: 'var(--kbd-bg)', color: 'var(--text-muted)' }}>⌘F</kbd>
        </div>
      </div>
    </header>
  );
}

function IconButton({ onClick, icon: Icon, label, color }: {
  onClick?: () => void; icon: React.ElementType; label: string; color?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-all"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      aria-label={label}
      title={label}
    >
      <Icon size={14} style={{ color: color || '#8ba5c4' }} />
    </motion.button>
  );
}
