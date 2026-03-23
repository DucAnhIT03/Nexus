import React, { useState } from 'react';
import { ChevronRight, Star, Shield, Clock, Bolt, ShoppingCart, MessageSquare, Store, CheckCircle2, Minus, Plus, Trash2, Heart } from 'lucide-react';
import { Product, CartItem } from '../types';
import { motion } from 'motion/react';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigate: (page: string) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onAddToCart, 
  onNavigate,
  onToggleWishlist,
  isInWishlist
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
        <button onClick={() => onNavigate('home')} className="hover:text-primary">Trang chủ</button>
        <ChevronRight className="w-4 h-4" />
        <button onClick={() => onNavigate('marketplace')} className="hover:text-primary">Chợ</button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left Column: Media */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-primary/5 border border-primary/10">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                  i === 1 ? 'border-primary ring-2 ring-primary/20' : 'border-primary/10 hover:border-primary'
                }`}
              >
                <img 
                  src={product.image} 
                  alt="Ảnh thu nhỏ" 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Info & Buy */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-4 uppercase tracking-wider">
              <Bolt className="w-3 h-3 fill-primary" /> Giao ngay
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 lg:text-4xl leading-tight">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-500' : ''}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-500">({product.reviews} đánh giá)</span>
              <span className="h-4 w-px bg-slate-300"></span>
              <span className="text-sm font-medium text-green-600">842 đã bán trong 24h</span>
            </div>
          </div>

          <div className="rounded-xl bg-primary/5 p-6 border border-primary/10">
            <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-black text-slate-900">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-slate-500 line-through mb-1">${product.oldPrice.toFixed(2)}</span>
                  <span className="rounded bg-green-500 px-2 py-0.5 text-xs font-bold text-white mb-2">
                    GIẢM {Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-sm font-bold text-slate-700">Chọn số lượng</label>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-32 items-center justify-between rounded-lg border border-primary/20 bg-white px-2 shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded hover:bg-primary/10 text-primary"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded hover:bg-primary/10 text-primary"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-slate-500">Tồn kho: <span className="font-bold text-slate-900">12.400+ sản phẩm</span></span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button 
                onClick={() => {
                  onAddToCart(product, quantity);
                  onNavigate('checkout');
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all"
              >
                <Bolt className="w-5 h-5 fill-white" /> Mua ngay
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={() => onAddToCart(product, quantity)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-primary/20 bg-white py-4 text-lg font-bold text-primary hover:bg-primary/5 transition-all"
                >
                  <ShoppingCart className="w-5 h-5" /> Thêm vào giỏ
                </button>
                <button 
                  onClick={() => onToggleWishlist(product)}
                  className={`flex h-[60px] w-[60px] items-center justify-center rounded-xl border-2 transition-all ${
                    isInWishlist 
                      ? 'bg-red-500 border-red-500 text-white' 
                      : 'border-primary/20 bg-white text-slate-400 hover:text-red-500 hover:border-red-500'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="rounded-xl border border-primary/10 p-5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden border-2 border-primary/20">
                <img src={product.seller.avatar} alt={product.seller.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900">{product.seller.name}</h3>
                  {product.seller.isPro && <CheckCircle2 className="w-4 h-4 text-blue-500 fill-current" />}
                </div>
                <p className="text-xs text-slate-500">Cấp 50 · Người bán đã xác minh • Thành viên từ 2019</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-amber-500">
                  <Star className="w-3 h-3 fill-amber-500" />
                  <span className="text-sm font-bold">4.9</span>
                </div>
                <p className="text-xs text-slate-500">Tỷ lệ thành công 99,8%</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg bg-slate-100 py-2 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-3 h-3" /> Nhắn người bán
              </button>
              <button className="flex-1 rounded-lg bg-slate-100 py-2 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                <Store className="w-3 h-3" /> Xem cửa hàng
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-lg border border-primary/5 bg-slate-50 p-3">
              <Shield className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs font-bold">Giao dịch an toàn</span>
                <span className="text-[10px] text-slate-500">Bảo vệ đảm bảo</span>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-primary/5 bg-slate-50 p-3">
              <Clock className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs font-bold">Thời gian giao</span>
                <span className="text-[10px] text-slate-500">Trong 15 phút</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16 border-b border-primary/10">
        <div className="flex gap-8">
          <button className="border-b-2 border-primary pb-4 text-sm font-bold text-primary">Mô tả</button>
          <button className="pb-4 text-sm font-bold text-slate-500 hover:text-slate-900">Đánh giá ({product.reviews})</button>
          <button className="pb-4 text-sm font-bold text-slate-500 hover:text-slate-900">Hướng dẫn an toàn</button>
          <button className="pb-4 text-sm font-bold text-slate-500 hover:text-slate-900">Hỏi đáp</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <section>
            <h2 className="text-xl font-bold mb-4">Mô tả sản phẩm</h2>
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
              <p>{product.description}</p>
              <h3 className="font-bold text-slate-900">Phương thức giao:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Giao trực tiếp:</strong> Gặp mặt tại thành phố lớn. Vui lòng đặt một vật phẩm rác trong cửa sổ giao dịch.</li>
                <li><strong>Thư trong game:</strong> Nhận ngay sau khi chúng tôi gửi. An toàn và tiện lợi nhất.</li>
                <li><strong>Nhà đấu giá:</strong> Đăng vật phẩm hiếm/epic và chúng tôi sẽ mua (Lưu ý: AH thu phí 5%).</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
