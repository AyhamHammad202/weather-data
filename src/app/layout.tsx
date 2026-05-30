import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider, AuthGate } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Climate Intelligence Platform | Baghdad Climate Observatory',
  description: '30-year scientific climate data analytics platform. Temperature, rainfall, humidity, evaporation, wind speed, and sunshine duration visualization for Baghdad, Iraq.',
  keywords: 'climate data, meteorology, temperature, rainfall, humidity, evaporation, wind, sunshine, analytics, Baghdad',
  openGraph: {
    title: 'Climate Intelligence Platform - Baghdad',
    description: 'Scientific climate analytics — 30 years of Baghdad climate observations',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="grid-bg scanlines" suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <AuthGate>
              {/* Ambient background gradients */}
              <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
                <div className="absolute top-0 left-60 w-96 h-96 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)', transform: 'translate(-50%, -30%)' }} />
                <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)' }} />
              </div>
              {children}
            </AuthGate>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
