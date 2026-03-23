'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield, EyeOff, Code2, Database, Cpu, Scan,
  Layers, Server, Star, ArrowRight,
  Download, RefreshCcw, Award, KeyRound,
  Search, ShoppingCart, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_PRODUCTS } from '../lib/constants';
import { ProductCard } from '../components/ProductCard';
import { useCart, useWishlist, useSelectedProduct } from '../providers';
import { Product } from '../lib/types';

const SOFTWARE = [
  { id: 1, name: 'CyberShield Pro', desc: 'Bảo mật endpoint, phát hiện mã độc zero-day với AI.', icon: Shield, gradient: 'from-cyan-400 to-blue-500', price: '399K', oldPrice: '599K', rating: 4.9, tag: 'Bảo mật', badge: 'Bán chạy' },
  { id: 2, name: 'GhostVPN Ultra', desc: 'Ẩn danh tuyệt đối, 500+ server, kill-switch.', icon: EyeOff, gradient: 'from-violet-400 to-purple-500', price: '199K', oldPrice: '349K', rating: 4.8, tag: 'Bảo mật', badge: '' },
  { id: 3, name: 'CodeForge IDE', desc: 'IDE với AI autocomplete, hỗ trợ 50+ ngôn ngữ.', icon: Code2, gradient: 'from-emerald-400 to-green-500', price: '299K', oldPrice: '', rating: 4.9, tag: 'Dev Tools', badge: 'Mới' },
  { id: 4, name: 'DataVault', desc: 'Mã hóa AES-256, backup tự động, khôi phục 1 click.', icon: Database, gradient: 'from-pink-400 to-rose-500', price: '249K', oldPrice: '399K', rating: 4.7, tag: 'Lưu trữ', badge: '' },
  { id: 5, name: 'BotMaster 3.0', desc: 'Tạo bot không code, tự động hóa, 200+ API.', icon: Cpu, gradient: 'from-amber-400 to-orange-500', price: '349K', oldPrice: '', rating: 4.8, tag: 'Tự động', badge: '' },
  { id: 6, name: 'NetProbe', desc: 'Quét mạng, phát hiện lỗ hổng, pentest tự động.', icon: Scan, gradient: 'from-red-400 to-rose-500', price: '499K', oldPrice: '799K', rating: 4.9, tag: 'Mạng', badge: '' },
  { id: 7, name: 'PixelForge', desc: 'Editor ảnh AI, xóa nền 1 click, upscale.', icon: Layers, gradient: 'from-fuchsia-400 to-purple-500', price: '279K', oldPrice: '', rating: 4.8, tag: 'Thiết kế', badge: '' },
  { id: 8, name: 'CloudSync Pro', desc: 'Đồng bộ cloud đa nền tảng, sharing linh hoạt.', icon: Server, gradient: 'from-teal-400 to-cyan-500', price: '159K', oldPrice: '299K', rating: 4.7, tag: 'Cloud', badge: 'Rẻ nhất' },
];

const TAGS = ['Tất cả', 'Bảo mật', 'Dev Tools', 'Tự động', 'Mạng', 'Thiết kế', 'Cloud', 'Lưu trữ'];

export default function SoftwarePage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { setSelectedProduct } = useSelectedProduct();
  const [activeTag, setActiveTag] = useState('Tất cả');
  const [search, setSearch] = useState('');

  const swProducts = MOCK_PRODUCTS.filter(p => p.category === 'Software' || p.category === 'Tools');
  const handleView = (p: Product) => { setSelectedProduct(p); router.push(`/product/${p.id}`); };

  const filtered = SOFTWARE.filter(s => {
    if (activeTag !== 'Tất cả' && s.tag !== activeTag) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <style jsx>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

      {/* ═══ PAGE HEADER ═══ */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-6">
        <h1 className="text-3xl font-bold text-white mb-1">Phần mềm</h1>
        <p className="text-sm text-white/30">Key chính hãng · Bảo hành trọn đời · Hoàn tiền 7 ngày</p>
      </div>

      {/* ═══ SEARCH + FILTER ═══ */}
      <div className="max-w-6xl mx-auto px-6 pb-6">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text" placeholder="Tìm phần mềm..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/40 transition-all"
          />
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {TAGS.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
                activeTag === tag
                  ? 'bg-cyan-500 text-white font-semibold'
                  : 'bg-white/[0.05] text-white/30 hover:text-white/50'
              }`}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ SOFTWARE LIST ═══ */}
      <div className="max-w-6xl mx-auto px-6 pb-10">
        <AnimatePresence mode="wait">
          <motion.div key={activeTag} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="space-y-3">
            {filtered.map((sw, i) => {
              const SwIcon = sw.icon;
              return (
                <motion.div key={sw.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl border border-white/[0.06] hover:border-white/[0.1] p-4 transition-all cursor-pointer group"
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sw.gradient} flex items-center justify-center flex-shrink-0`}>
                    <SwIcon className="w-6 h-6 text-white" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-white text-sm">{sw.name}</h3>
                      {sw.badge && (
                        <span className="bg-cyan-500/15 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full">{sw.badge}</span>
                      )}
                    </div>
                    <p className="text-xs text-white/25 truncate">{sw.desc}</p>
                  </div>

                  {/* Rating */}
                  <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm text-white/40">{sw.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 flex-shrink-0">
                    <span className="text-base font-bold text-cyan-400">{sw.price}</span>
                    {sw.oldPrice && <span className="text-xs text-white/15 line-through">{sw.oldPrice}</span>}
                  </div>

                  {/* Buy button */}
                  <button className="flex-shrink-0 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg px-4 py-2 text-sm transition-all flex items-center gap-1.5">
                    <ShoppingCart className="w-3.5 h-3.5" /> Mua
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/20">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p>Không tìm thấy phần mềm phù hợp</p>
          </div>
        )}
      </div>

      {/* ═══ TRUST INFO ═══ */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Shield, text: 'Malware-free 100%' },
            { icon: KeyRound, text: 'Key chính hãng' },
            { icon: RefreshCcw, text: 'Auto-update trọn đời' },
            { icon: Award, text: 'Hoàn tiền 7 ngày' },
          ].map((t, i) => {
            const TIcon = t.icon;
            return (
              <div key={i} className="flex items-center gap-2.5 text-white/25 text-sm">
                <TIcon className="w-4 h-4 text-cyan-400/60 flex-shrink-0" />
                <span>{t.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ MARKETPLACE ═══ */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">Từ Marketplace</h2>
          <button onClick={() => router.push('/marketplace')} className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {swProducts.slice(0, 8).map((p) => (
            <div key={p.id} className="flex-shrink-0 w-[210px]">
              <ProductCard product={p} onAddToCart={addToCart} onViewDetails={handleView}
                onToggleWishlist={toggleWishlist} isInWishlist={isInWishlist(p.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
