'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('cip-auth');
      if (stored === 'true') {
        setIsAuthenticated(true);
      }
    } catch {}
    setMounted(true);
  }, []);

  const login = (u: string, p: string): boolean => {
    if (u === 'admin' && p === 'admin') {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('cip-auth', 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('cip-auth');
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {mounted ? children : <div className="min-h-screen bg-void" />}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import LoginScreen from '@/components/auth/LoginScreen';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <LoginScreen />;
}
