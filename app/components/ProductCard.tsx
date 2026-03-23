'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Star, ShoppingCart, ShieldCheck, Bolt, Heart, Check } from 'lucide-react';
import { CATEGORY_LABELS, Product } from '../lib/types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isInWishlist?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onViewDetails,
  onToggleWishlist,
  isInWishlist = false
}) => {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (added) return; // prevent spam
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }, [added, onAddToCart, product]);

  return (
    <motion.div 
      whileHover={{ y: -3 }}
      className="flex flex-col rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/5 transition-all group cursor-pointer"
    >
      <div className="relative h-36 w-full overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
        <div className="absolute right-2 top-2 flex flex-col gap-1.5">
          {product.server && (
            <div className="rounded-md bg-black/50 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur-sm">
              {product.server}
            </div>
          )}
          {onToggleWishlist && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product);
              }}
              className={`cursor-pointer rounded-md p-1.5 backdrop-blur-sm transition-all ${
                isInWishlist ? 'bg-red-500 text-white' : 'bg-black/40 text-white/70 hover:text-red-400'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* "Added to cart" floating toast */}
        <AnimatePresence>
          {added && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold text-white whitespace-nowrap z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(34,211,238,0.9), rgba(139,92,246,0.85))',
                boxShadow: '0 4px 20px rgba(34,211,238,0.3), 0 0 40px rgba(34,211,238,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Check className="w-3.5 h-3.5" /> Đã thêm vào giỏ
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="p-3.5 flex flex-col flex-1">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-cyan-400">{CATEGORY_LABELS[product.category]}</span>
          <div className="flex items-center gap-0.5 text-yellow-500">
            <Star className="w-2.5 h-2.5 fill-current" />
            <span className="text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>
        
        <h4 className="mb-0.5 font-bold text-white text-sm line-clamp-1">{product.name}</h4>
        <p className="mb-3 text-[10px] text-white/40">
          Bởi <span className="text-cyan-400 font-medium">{product.seller.name}</span>
          {product.seller.isPro && <Bolt className="inline w-2.5 h-2.5 ml-0.5 text-emerald-400 fill-current" />}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-[9px] text-white/30 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
            <span className="text-base font-extrabold text-white">${product.price.toFixed(2)}</span>
          </div>
          <div className="flex gap-1.5">
            <button 
              onClick={handleViewDetails}
              className="cursor-pointer rounded-lg bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/70 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
            >
              Chi tiết
            </button>
            <button 
              onClick={handleAddToCart}
              className={`cursor-pointer rounded-lg p-1.5 transition-all duration-300 ${
                added 
                  ? 'bg-emerald-500 text-white scale-110' 
                  : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white'
              }`}
              style={added ? { boxShadow: '0 0 12px rgba(52,211,153,0.4)' } : {}}
            >
              {added ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
