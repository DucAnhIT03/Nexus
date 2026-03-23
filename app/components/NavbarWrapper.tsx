'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, Bell, Rocket, Menu, Heart, X } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useCart, useWishlist } from '../providers';

const NAV_ROUTES = [
  { path: '/marketplace', key: 'nav.marketplace' },
  { path: '/tool', key: 'nav.tool' },
  { path: '/service', key: 'nav.service' },
  { path: '/software', key: 'nav.software' },
  { path: '/course', key: 'nav.course' },
  { path: '/orders', key: 'nav.orders' },
];

export function NavbarWrapper() {
  const { t } = useI18n();
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const isHoveringRef = useRef(false);

  const hideAfterDelay = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!isHoveringRef.current) setVisible(false);
    }, 2500);
  }, []);

  useEffect(() => {
    hideAfterDelay();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [hideAfterDelay]);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(true);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    hideAfterDelay();
  };

  return (
    <>
      {/* Inject header animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes navGlowSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes navBorderPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .nav-active-link {
          position: relative;
          overflow: hidden;
        }
        .nav-active-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #22d3ee, transparent);
          border-radius: 2px;
        }
        .nav-link-hover {
          position: relative;
        }
        .nav-link-hover::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(34,211,238,0.08), rgba(139,92,246,0.08));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .nav-link-hover:hover::before {
          opacity: 1;
        }
        .search-glow {
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .search-glow:focus {
          box-shadow: 0 0 20px rgba(34,211,238,0.15), 0 0 40px rgba(139,92,246,0.08);
        }
        .icon-btn {
          position: relative;
        }
        .icon-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: radial-gradient(circle at center, rgba(34,211,238,0.2), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .icon-btn:hover::before {
          opacity: 1;
        }
      `}} />

      {/* Invisible trigger zone at top of screen */}
      <div
        className="fixed top-0 left-0 right-0 h-5 z-[60] cursor-pointer"
        onMouseEnter={handleMouseEnter}
      />

      <header
        ref={headerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
      >
        {/* Main header background with glassmorphism */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(15,10,30,0.92) 0%, rgba(20,15,40,0.88) 50%, rgba(10,15,35,0.92) 100%)',
            backdropFilter: 'blur(24px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
          }}
        />

        {/* Animated bottom border glow */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.3), rgba(139,92,246,0.4), rgba(34,211,238,0.3), transparent)',
            animation: 'navBorderPulse 3s ease-in-out infinite',
          }}
        />

        {/* Sliding glow accent on border */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '30%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.8), rgba(139,92,246,0.6), transparent)',
              animation: 'navGlowSlide 5s linear infinite',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div
                className="relative flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(139,92,246,0.2))',
                  border: '1px solid rgba(34,211,238,0.2)',
                  boxShadow: '0 0 15px rgba(34,211,238,0.1), inset 0 0 10px rgba(139,92,246,0.05)',
                }}
              >
                <Rocket className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </div>
              <h1
                className="text-xl font-extrabold tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #e2e8f0, #ffffff, #c4b5fd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                NexusMarket
              </h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ROUTES.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`nav-link-hover cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'nav-active-link text-cyan-300'
                        : 'text-white/60 hover:text-white/90'
                    }`}
                    style={isActive ? {
                      background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(139,92,246,0.1))',
                      border: '1px solid rgba(34,211,238,0.15)',
                      boxShadow: '0 0 12px rgba(34,211,238,0.08)',
                    } : undefined}
                  >
                    {t(item.key as any)}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Search + Actions */}
          <div className="flex flex-1 items-center justify-end gap-3 px-4 lg:px-8">
            {/* Search bar */}
            <div className={`relative w-full max-w-xs lg:max-w-md hidden sm:block transition-all duration-300 ${searchFocused ? 'max-w-lg' : ''}`}>
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${searchFocused ? 'text-cyan-400' : 'text-white/30'}`} />
              <input
                type="text"
                placeholder={t('nav.searchPlaceholder')}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="search-glow w-full rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                  border: `1px solid ${searchFocused ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  backdropFilter: 'blur(10px)',
                }}
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="icon-btn relative flex h-10 w-10 items-center justify-center rounded-full text-white/50 hover:text-cyan-300 transition-all duration-300 cursor-pointer"
                aria-label={t('nav.wishlist')}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{
                      background: 'linear-gradient(135deg, #ef4444, #f97316)',
                      boxShadow: '0 0 8px rgba(239,68,68,0.4)',
                      border: '2px solid rgba(15,10,30,0.9)',
                    }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="icon-btn relative flex h-10 w-10 items-center justify-center rounded-full text-white/50 hover:text-cyan-300 transition-all duration-300 cursor-pointer"
                aria-label={t('nav.cart')}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                      boxShadow: '0 0 8px rgba(139,92,246,0.4)',
                      border: '2px solid rgba(15,10,30,0.9)',
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              <button
                className="icon-btn relative flex h-10 w-10 items-center justify-center rounded-full text-white/50 hover:text-cyan-300 transition-all duration-300 cursor-pointer"
                aria-label={t('nav.notifications')}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <Bell className="w-5 h-5" />
                <span
                  className="absolute top-2 right-2 flex h-2.5 w-2.5 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
                    boxShadow: '0 0 6px rgba(34,211,238,0.6)',
                  }}
                />
              </button>

              {/* Profile avatar */}
              <Link
                href="/profile"
                className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                aria-label={t('nav.profile')}
                style={{
                  border: '2px solid rgba(34,211,238,0.25)',
                  boxShadow: '0 0 10px rgba(34,211,238,0.08)',
                }}
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                  alt="Người dùng"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.95)' }}
                />
              </Link>

              {/* Mobile menu button */}
              <button
                className="lg:hidden icon-btn flex h-10 w-10 items-center justify-center rounded-full text-white/50 hover:text-cyan-300 transition-all duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden relative z-10 border-t"
            style={{
              background: 'linear-gradient(180deg, rgba(15,10,30,0.98), rgba(10,8,25,0.99))',
              borderColor: 'rgba(34,211,238,0.1)',
            }}
          >
            <nav className="flex flex-col px-4 py-3 gap-1">
              {NAV_ROUTES.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-cyan-300'
                        : 'text-white/50 hover:text-white/80'
                    }`}
                    style={isActive ? {
                      background: 'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(139,92,246,0.08))',
                      border: '1px solid rgba(34,211,238,0.12)',
                    } : undefined}
                  >
                    {t(item.key as any)}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile search */}
            <div className="px-4 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder={t('nav.searchPlaceholder')}
                  className="w-full rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
