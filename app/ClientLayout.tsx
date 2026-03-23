'use client';

import React from 'react';
import { AppProviders } from './providers';
import { I18nProvider } from './lib/i18n';
import { NavbarWrapper } from './components/NavbarWrapper';
import { Footer } from './components/Footer';
import { GeminiAssistant } from './components/GeminiAssistant';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <I18nProvider>
      <AppProviders>
        <div className="flex flex-col min-h-screen">
          {!isAuthPage && <NavbarWrapper />}
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
          {!isAuthPage && <Footer />}
          {!isAuthPage && <GeminiAssistant />}
        </div>
      </AppProviders>
    </I18nProvider>
  );
}
