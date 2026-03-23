import React, { useState } from 'react';
import { ChevronRight, Filter, Star, Shield, Zap, Search } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Product, Category } from '../types';

interface MarketplaceProps {
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onAddToCart, onViewDetails, onToggleWishlist, wishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMinPrice = !priceRange.min || p.price >= parseFloat(priceRange.min);
    const matchesMaxPrice = !priceRange.max || p.price <= parseFloat(priceRange.max);
    
    return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  const categories: (Category | 'All')[] = ['All', 'Accounts', 'Tools', 'Services', 'Software', 'Courses'];
  const categoryLabels: Record<Category | 'All', string> = {
    All: 'Tất cả',
    Accounts: 'Tài khoản',
    Tools: 'Công cụ',
    Services: 'Dịch vụ',
    Software: 'Phần mềm',
    Courses: 'Tài khoản AI',
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-white/30">
          <a href="#" className="hover:text-cyan-400 transition-colors">Trang chủ</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/60">Chợ</span>
        </nav>

        <div className="flex flex-col gap-3 mb-8">
          <h1 className="text-2xl font-black tracking-tight text-white">Chợ số</h1>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-xs text-white/40 flex-1">Khám phá {filteredProducts.length} tin đăng đang hoạt động.</p>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-sm text-white placeholder:text-white/30 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Filters */}
          <aside className="flex flex-col gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-wider text-white/40">Danh mục</h3>
              <div className="flex flex-col gap-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      selectedCategory === cat 
                        ? 'bg-cyan-500/15 text-cyan-400' 
                        : 'text-white/50 hover:bg-white/5 hover:text-white/70'
                    }`}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-wider text-white/40">Khoảng giá</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/30 text-xs">$</span>
                    <input 
                      type="number" 
                      placeholder="Min"
                      className="w-full rounded-lg border border-white/10 bg-white/5 pl-6 pr-2 py-1.5 text-xs text-white placeholder:text-white/25 focus:border-cyan-500/30 outline-none"
                      value={priceRange.min}
                      onChange={e => setPriceRange({...priceRange, min: e.target.value})}
                    />
                  </div>
                  <div className="relative flex-1">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/30 text-xs">$</span>
                    <input 
                      type="number" 
                      placeholder="Max"
                      className="w-full rounded-lg border border-white/10 bg-white/5 pl-6 pr-2 py-1.5 text-xs text-white placeholder:text-white/25 focus:border-cyan-500/30 outline-none"
                      value={priceRange.max}
                      onChange={e => setPriceRange({...priceRange, max: e.target.value})}
                    />
                  </div>
                </div>
                <button className="w-full rounded-lg bg-cyan-500/20 py-1.5 text-xs font-bold text-cyan-400 hover:bg-cyan-500 hover:text-white transition-colors">
                  Áp dụng
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-wider text-white/40">Cấp độ người bán</h3>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Pro đã xác minh', icon: Star, color: 'text-yellow-500' },
                  { label: 'Người bán uy tín', icon: Shield, color: 'text-white/40' },
                  { label: 'Đánh giá cao (4.5+)', icon: Zap, color: 'text-cyan-400' }
                ].map(level => (
                  <label key={level.label} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/30" />
                    <span className="flex items-center gap-1 text-[11px] text-white/50 group-hover:text-white/70 transition-colors">
                      <level.icon className={`w-3 h-3 ${level.color} fill-current`} /> {level.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 px-4 py-5 text-white">
              <div className="relative z-10 flex flex-col gap-1.5">
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-70">Bán tài sản của bạn</p>
                <h4 className="text-sm font-bold">Thanh toán nhanh, giá tốt</h4>
                <button className="mt-1 w-fit rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold text-blue-700">Đăng bán</button>
              </div>
              <Zap className="absolute -bottom-3 -right-3 w-16 h-16 opacity-15 rotate-12" />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-white/40">Hiển thị {filteredProducts.length} kết quả</p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-white/40">Sắp xếp:</span>
                <select className="rounded-lg border border-white/10 bg-white/5 text-xs text-white/60 py-1 px-2 focus:border-cyan-500/30 outline-none">
                  <option>Mới nhất</option>
                  <option>Giá: Thấp→Cao</option>
                  <option>Giá: Cao→Thấp</option>
                  <option>Đánh giá</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart} 
                  onViewDetails={onViewDetails} 
                  onToggleWishlist={onToggleWishlist}
                  isInWishlist={wishlist.some(p => p.id === product.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-center gap-1.5">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/30 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-[11px] font-bold text-white">1</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[11px] font-bold text-white/50 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">2</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[11px] font-bold text-white/50 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">3</button>
              <span className="px-1 text-white/30 text-xs">...</span>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/30 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

