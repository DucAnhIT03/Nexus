import React from 'react';
import { Trash2, ShoppingCart, ChevronRight, Heart } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface WishlistProps {
  items: Product[];
  onAddToCart: (product: Product) => void;
  onRemove: (id: string) => void;
  onViewDetails: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ items, onAddToCart, onRemove, onViewDetails, onNavigate }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-primary">Trang chủ</button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium">Yêu thích</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Danh sách yêu thích</h1>
        <p className="text-slate-500">Bạn có {items.length} sản phẩm đã lưu.</p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-primary/10 rounded-2xl p-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="p-4 bg-primary/5 rounded-full">
              <Heart className="w-12 h-12 text-primary/20" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Danh sách yêu thích trống</h2>
          <p className="text-slate-500 mb-8">Lưu sản phẩm bạn quan tâm để theo dõi dễ hơn.</p>
          <button 
            onClick={() => onNavigate('marketplace')}
            className="rounded-xl bg-primary px-8 py-3 font-bold text-white hover:bg-primary-hover transition-all"
          >
            Khám phá chợ
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart} 
                onViewDetails={onViewDetails} 
              />
              <button 
                onClick={() => onRemove(product.id)}
                className="absolute top-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-red-500 shadow-sm hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
