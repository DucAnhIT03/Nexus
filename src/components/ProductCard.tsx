import React from 'react';
import { Star, ShoppingCart, ShieldCheck, Bolt, Heart } from 'lucide-react';
import { CATEGORY_LABELS, Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
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
              onClick={() => onViewDetails(product)}
              className="cursor-pointer rounded-lg bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/70 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
            >
              Chi tiết
            </button>
            <button 
              onClick={() => onAddToCart(product)}
              className="cursor-pointer rounded-lg bg-cyan-500/20 p-1.5 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
