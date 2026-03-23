import React from 'react';
import { Search, ShoppingCart, Bell, Rocket, Menu, Heart } from 'lucide-react';
import { useI18n } from '../i18n';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  cartCount: number;
  wishlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, cartCount, wishlistCount }) => {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-2 text-primary cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Rocket className="w-8 h-8 fill-primary/10" />
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">NexusMarket</h1>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {[
              { id: 'marketplace', label: t('nav.marketplace') },
              { id: 'tool', label: t('nav.tool') },
              { id: 'service', label: t('nav.service') },
              { id: 'software', label: t('nav.software') },
              { id: 'course', label: t('nav.course') },
              { id: 'orders', label: t('nav.orders') },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
                  currentPage === item.id
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'text-slate-600 hover:bg-primary hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4 px-4 lg:px-8">
          <div className="relative w-full max-w-xs lg:max-w-md hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('nav.searchPlaceholder')}
              className="w-full rounded-full border-none bg-primary/5 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('wishlist')}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-slate-600 hover:bg-primary hover:text-white transition-all cursor-pointer"
              aria-label={t('nav.wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate('cart')}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-slate-600 hover:bg-primary hover:text-white transition-all cursor-pointer"
              aria-label={t('nav.cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-slate-600 hover:bg-primary hover:text-white transition-all cursor-pointer"
              aria-label={t('nav.notifications')}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/20 bg-slate-100 overflow-hidden cursor-pointer"
              aria-label={t('nav.profile')}
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                alt="Người dùng"
                className="w-full h-full object-cover"
              />
            </button>
            <button className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-slate-600">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
