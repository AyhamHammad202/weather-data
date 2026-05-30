'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, KeyRound, AlertCircle, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setLoading(true);

    // Add a slight artificial delay for a sci-fi decrypt/verification effect
    setTimeout(() => {
      const success = login(username, password);
      setLoading(false);
      if (!success) {
        setIsError(true);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void select-none overflow-hidden">
      {/* Dynamic Background Grid Pattern & Scanlines */}
      <div className="absolute inset-0 grid-bg scanlines pointer-events-none opacity-40" />

      {/* Cyberpunk ambient lighting dots */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #00e5ff 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: isError ? [-10, 10, -10, 10, -5, 5, 0] : 0,
        }}
        transition={{
          animate: { duration: 0.4 },
          default: { duration: 0.5, ease: 'easeOut' },
        }}
        className="w-full max-w-md p-8 glass-heavy rounded-2xl relative border-neon-cyan/20"
        style={{
          boxShadow: isError
            ? '0 0 30px rgba(255,23,68,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          borderColor: isError ? 'rgba(255,23,68,0.4)' : 'rgba(0,229,255,0.15)',
          transition: 'box-shadow 0.3s, border-color 0.3s',
        }}
      >
        {/* Top Scan Line Animation on Card */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-x-0 h-px opacity-30"
            style={{
              background: isError
                ? 'linear-gradient(90deg, transparent, #ff1744, transparent)'
                : 'linear-gradient(90deg, transparent, #00e5ff, transparent)',
              animation: 'scan-line 3s linear infinite',
            }}
          />
        </div>

        {/* Brand Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="flex justify-center mb-3">
            <motion.div
              animate={loading ? { rotateY: 360 } : {}}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: isError ? 'rgba(255,23,68,0.1)' : 'rgba(0,229,255,0.1)',
                border: isError ? '1px solid rgba(255,23,68,0.3)' : '1px solid rgba(0,229,255,0.3)',
                boxShadow: isError ? '0 0 15px rgba(255,23,68,0.2)' : '0 0 15px rgba(0,229,255,0.2)',
              }}
            >
              {isError ? (
                <ShieldAlert className="w-6 h-6 text-neon-red" style={{ color: '#ff1744' }} />
              ) : (
                <Lock className="w-6 h-6 text-neon-cyan" style={{ color: '#00e5ff' }} />
              )}
            </motion.div>
          </div>
          <h2 className="text-xl font-black uppercase tracking-[0.2em] gradient-text">
            Security Gateway
          </h2>
          <p className="text-[10px] uppercase tracking-widest mt-1 text-text-secondary" style={{ color: 'var(--text-muted)' }}>
            Baghdad Climate Observatory
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {/* Username */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary" style={{ color: 'var(--text-muted)' }}>
              Ident ID
            </label>
            <div className="relative flex items-center rounded-xl overflow-hidden border"
              style={{
                background: 'var(--bg-secondary)',
                borderColor: 'var(--border-glass-card)',
              }}
            >
              <div className="pl-3 pr-2 flex items-center justify-center text-text-muted">
                <User size={14} style={{ color: 'var(--text-muted)' }} />
              </div>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter Username (admin)"
                required
                disabled={loading}
                className="w-full bg-transparent py-3 pr-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
                style={{ fontSize: 13 }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary" style={{ color: 'var(--text-muted)' }}>
              Passkey Hash
            </label>
            <div className="relative flex items-center rounded-xl overflow-hidden border"
              style={{
                background: 'var(--bg-secondary)',
                borderColor: 'var(--border-glass-card)',
              }}
            >
              <div className="pl-3 pr-2 flex items-center justify-center text-text-muted">
                <KeyRound size={14} style={{ color: 'var(--text-muted)' }} />
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password (admin)"
                required
                disabled={loading}
                className="w-full bg-transparent py-3 pr-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
                style={{ fontSize: 13 }}
              />
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {isError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg text-xs font-semibold"
                style={{ background: 'rgba(255,23,68,0.1)', border: '1px solid rgba(255,23,68,0.2)', color: '#ff1744' }}
              >
                <AlertCircle size={14} className="flex-shrink-0" />
                <span>ACCESS DENIED: Invalid Passkey Credential.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all relative overflow-hidden active:scale-[0.98] disabled:opacity-50"
            style={{
              background: isError
                ? 'rgba(255,23,68,0.15)'
                : 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(41,121,255,0.15))',
              border: isError ? '1px solid rgba(255,23,68,0.4)' : '1px solid rgba(0,229,255,0.3)',
              color: isError ? '#ff1744' : '#00e5ff',
              boxShadow: isError ? '0 0 15px rgba(255,23,68,0.1)' : '0 0 15px rgba(0,229,255,0.1)',
            }}
          >
            {loading ? 'Verifying Credentials...' : 'Authenticate'}
          </button>
        </form>

        {/* Security Warning notice */}
        <div className="mt-8 text-center text-[9px] uppercase tracking-widest text-text-muted opacity-50 relative z-10" style={{ color: 'var(--text-muted)' }}>
          SECURE SECTOR ACCESS · AUTHORIZED METEOROLOGICAL STAFF ONLY
        </div>
      </motion.div>
    </div>
  );
}
