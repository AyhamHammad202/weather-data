'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: '#020408' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 px-8"
      >
        <div className="flex justify-center">
          <AlertTriangle size={48} style={{ color: '#ffd60a' }} />
        </div>
        <h1 className="text-4xl font-black gradient-text">404</h1>
        <p className="text-lg font-semibold" style={{ color: '#e8f4ff' }}>
          Page Not Found
        </p>
        <p className="text-sm" style={{ color: '#4a6080' }}>
          The requested climate variable or page does not exist.
        </p>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold mt-4"
            style={{
              background: 'rgba(0,229,255,0.1)',
              border: '1px solid rgba(0,229,255,0.3)',
              color: '#00e5ff',
            }}
          >
            <Home size={16} />
            Return to Dashboard
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
