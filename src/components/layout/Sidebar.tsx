'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Thermometer, CloudRain, Droplets, Wind, Sun, Gauge,
  ChevronLeft, ChevronRight, Activity, Zap, LogOut
} from 'lucide-react';
import { VARIABLES, ClimateVariable } from '@/lib/chartData';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS: { variable: ClimateVariable; icon: React.ElementType; href: string }[] = [
  { variable: 'temperature', icon: Thermometer, href: '/temperature' },
  { variable: 'rainfall',    icon: CloudRain,   href: '/rainfall' },
  { variable: 'humidity',    icon: Droplets,    href: '/humidity' },
  { variable: 'evaporation', icon: Activity,    href: '/evaporation' },
  { variable: 'wind',        icon: Wind,        href: '/wind' },
  { variable: 'sunshine',    icon: Sun,         href: '/sunshine' },
  { variable: 'pressure',    icon: Gauge,       href: '/pressure' },
];

import { useTheme } from '@/context/ThemeContext';
import { useEffect } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const { mobileSidebarOpen, setMobileSidebarOpen } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setMobileSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setMobileSidebarOpen]);

  // Sync CSS custom variable for side offset dynamically
  useEffect(() => {
    if (isMobile) {
      document.documentElement.style.setProperty('--sidebar-offset', '0px');
    } else {
      document.documentElement.style.setProperty('--sidebar-offset', collapsed ? '64px' : '240px');
    }
  }, [collapsed, isMobile]);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname, setMobileSidebarOpen]);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isMobile && mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isMobile ? 240 : (collapsed ? 64 : 240),
          x: isMobile ? (mobileSidebarOpen ? 0 : -240) : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed left-0 top-0 bottom-0 z-50 flex flex-col glass-heavy overflow-hidden
          ${isMobile ? 'shadow-2xl shadow-black/80' : ''}`}
        style={{ borderRight: '1px solid var(--border-glass)' }}
      >
      {/* Logo */}
      <div className="flex items-center h-16 px-3 border-b border-white/5">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #00e5ff22, #2979ff22)', border: '1px solid rgba(0,229,255,0.3)' }}>
          <Zap size={18} className="text-neon-cyan" style={{ color: '#00e5ff' }} />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="ml-3 overflow-hidden"
            >
              <div className="text-xs font-bold tracking-widest uppercase"
                style={{ color: '#00e5ff', letterSpacing: '0.15em' }}>
                Climate
              </div>
              <div className="text-[10px] font-medium tracking-widest text-text-secondary uppercase"
                style={{ color: '#4a6080' }}>
                Intel Platform
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        {/* All Charts link */}
        <NavItem
          href="/"
          icon={Activity}
          label="All Charts"
          color="#00e5ff"
          isActive={pathname === '/'}
          collapsed={collapsed}
        />

        <div className="mx-3 my-3 border-t border-white/5" />
        <div className={`px-3 mb-2 transition-all duration-200 ${collapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase"
            style={{ color: '#2d4060' }}>Variables</span>
        </div>

        {NAV_ITEMS.map(item => {
          const meta = VARIABLES[item.variable];
          return (
            <NavItem
              key={item.variable}
              href={item.href}
              icon={item.icon}
              label={meta.label}
              color={meta.color}
              isActive={pathname === item.href}
              collapsed={collapsed}
            />
          );
        })}

        <div className="mx-3 my-2 border-t border-white/5" />

        <button
          onClick={logout}
          className="flex items-center gap-3 mx-2 my-0.5 px-2 py-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/5 w-[calc(100%-16px)] text-left"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-neon-red">
            <LogOut size={16} style={{ color: '#ff1744' }} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
                style={{ color: '#ff1744' }}
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* System Status */}
      <div className="p-3 border-t border-white/5">
        <AnimatePresence>
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-lg p-2.5"
              style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.1)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="status-dot" style={{ width: 6, height: 6 }} />
                <span className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: '#00ff88' }}>System Online</span>
              </div>
              <div className="text-[9px]" style={{ color: 'var(--text-muted)' }}>
                84 charts · 7 variables · 30yr
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <div className="status-dot" style={{ width: 6, height: 6 }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse Toggle */}
      {!isMobile && (
        <button
          onClick={() => setCollapsed(c => !c)}
          className="absolute -right-3 top-20 z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: 'var(--bg-glass-card)',
            border: '1px solid rgba(0,229,255,0.3)',
            boxShadow: '0 0 12px rgba(0,229,255,0.2)',
          }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight size={12} style={{ color: '#00e5ff' }} />
            : <ChevronLeft size={12} style={{ color: '#00e5ff' }} />}
        </button>
      )}
    </motion.aside>
  </>
  );
}

function NavItem({
  href, icon: Icon, label, color, isActive, collapsed
}: {
  href: string; icon: React.ElementType; label: string;
  color: string; isActive: boolean; collapsed: boolean;
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ x: collapsed ? 0 : 4 }}
        className={`flex items-center gap-3 mx-2 my-0.5 px-2 py-2.5 rounded-lg cursor-pointer transition-all duration-200
          ${isActive ? 'nav-item-active' : 'hover:bg-white/5'}`}
        style={isActive ? { borderLeft: `2px solid ${color}`, background: `${color}12` } : {}}
      >
        <div
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
          style={{
            background: isActive ? `${color}20` : 'transparent',
            boxShadow: isActive ? `0 0 12px ${color}40` : 'none',
          }}
        >
          <Icon
            size={16}
            style={{ color: isActive ? color : '#4a6080' }}
            strokeWidth={isActive ? 2.5 : 1.5}
          />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="text-sm font-medium whitespace-nowrap overflow-hidden"
              style={{ color: isActive ? color : '#8ba5c4' }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="active-indicator"
            className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
        )}
      </motion.div>
    </Link>
  );
}
