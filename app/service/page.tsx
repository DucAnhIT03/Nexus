'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Gamepad2, TrendingUp, Palette, Megaphone, Code, Shield, 
  Clock, Star, Search, Zap, CheckCircle, Users, ArrowRight, 
  Sparkles, Globe, Cpu, Layers, ChevronRight, Play,
  Rocket, Target, Award, HeartHandshake
} from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_PRODUCTS } from '../lib/constants';
import { ProductCard } from '../components/ProductCard';
import { useCart, useWishlist, useSelectedProduct } from '../providers';
import { Product } from '../lib/types';
import dynamic from 'next/dynamic';

// Lazy load 3D scene to avoid SSR issues
const HeroScene3D = dynamic(() => import('../components/Scene3D').then(m => ({ default: m.HeroScene3D })), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />
});

const SERVICE_CATEGORIES = [
  { name: 'Boost & Leveling', desc: 'Dịch vụ cày cấp, farm tài nguyên game MMO uy tín, nhanh chóng và an toàn', icon: Gamepad2, count: 156, gradient: 'from-violet-500 to-purple-600' },
  { name: 'SEO & Marketing', desc: 'Tối ưu website, backlink chất lượng, content marketing chuyên nghiệp', icon: TrendingUp, count: 89, gradient: 'from-cyan-500 to-blue-600' },
  { name: 'Thiết kế & Sáng tạo', desc: 'Logo, banner, UI/UX và đồ họa chất lượng cao, tối ưu cho mọi nền tảng', icon: Palette, count: 67, gradient: 'from-pink-500 to-rose-600' },
  { name: 'Quảng cáo & Growth', desc: 'Facebook Ads, Google Ads, TikTok Ads chuyên sâu cho mọi ngành nghề', icon: Megaphone, count: 48, gradient: 'from-amber-500 to-orange-600' },
  { name: 'Lập trình & Tech', desc: 'Phát triển web, app, bot tự động và các giải pháp công nghệ cao', icon: Code, count: 95, gradient: 'from-emerald-500 to-green-600' },
  { name: 'Bảo mật & An ninh', desc: 'Pentesting, audit bảo mật, bảo vệ dữ liệu và chống tấn công DDoS', icon: Shield, count: 34, gradient: 'from-red-500 to-rose-600' },
];

const PROCESS_STEPS = [
  { step: 1, title: 'Khám phá', desc: 'Duyệt danh mục dịch vụ phong phú, so sánh nhà cung cấp và đọc đánh giá thực tế', icon: Search, color: 'from-violet-500 to-purple-500' },
  { step: 2, title: 'Đặt đơn', desc: 'Mô tả yêu cầu chi tiết, chọn gói dịch vụ phù hợp và thanh toán an toàn qua ký quỹ', icon: CheckCircle, color: 'from-cyan-500 to-blue-500' },
  { step: 3, title: 'Thực hiện', desc: 'Chuyên gia bắt đầu công việc với cập nhật tiến độ theo thời gian thực', icon: Zap, color: 'from-amber-500 to-orange-500' },
  { step: 4, title: 'Hoàn tất', desc: 'Nhận kết quả chất lượng, xác nhận hoàn thành và đánh giá dịch vụ', icon: Star, color: 'from-emerald-500 to-green-500' },
];

const TOP_PROVIDERS = [
  { name: 'ProBoost VN', specialty: 'Game Boosting', rating: 4.9, orders: 2340, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProBoost', verified: true },
  { name: 'SEO Master', specialty: 'SEO & Marketing', rating: 4.8, orders: 1890, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SEOMaster', verified: true },
  { name: 'Design Hub', specialty: 'Thiết kế đồ họa', rating: 4.9, orders: 1560, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DesignHub', verified: true },
  { name: 'Ads Expert', specialty: 'Quảng cáo số', rating: 4.7, orders: 1230, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdsExpert', verified: false },
  { name: 'Content Pro', specialty: 'Content Marketing', rating: 4.8, orders: 980, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ContentPro', verified: true },
  { name: 'Tech Nova', specialty: 'Lập trình & Bot', rating: 4.9, orders: 870, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechNova', verified: true },
];

const STATS = [
  { val: '360+', label: 'Dịch vụ', icon: Layers },
  { val: '12K+', label: 'Khách hàng', icon: Users },
  { val: '99.2%', label: 'Hài lòng', icon: Star },
  { val: '24/7', label: 'Hỗ trợ', icon: HeartHandshake },
];

export default function ServicePage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { setSelectedProduct } = useSelectedProduct();
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const serviceProducts = MOCK_PRODUCTS.filter(p => p.category === 'Services');

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    router.push(`/product/${product.id}`);
  };

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if ((window as any).__scrollPaused) return;
      const el = document.getElementById('service-scroll');
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 260, behavior: 'smooth' });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* ========= HERO with 3D Scene ========= */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />}>
          <HeroScene3D />
        </Suspense>

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,23,0.8)_80%)]" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 text-xs font-bold text-purple-300 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Nền tảng dịch vụ MMO #1 Việt Nam</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-[0.95] tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Dịch vụ
              </span>{' '}
              <span className="text-white/90">thế hệ mới</span>
            </h1>

            <p className="text-sm md:text-base text-white/50 max-w-xl mx-auto mb-7 leading-relaxed">
              Kết nối với hàng trăm chuyên gia hàng đầu. Từ SEO, game boosting đến thiết kế —
              mọi dịch vụ số bạn cần, chỉ trong vài cú click.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-purple-500/25 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Khám phá ngay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
              >
                <Play className="w-4 h-4 text-purple-400" /> Xem giới thiệu
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto"
          >
            {STATS.map((s, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10 hover:border-purple-500/30 transition-all group">
                <s.icon className="w-4 h-4 text-purple-400 mb-1 group-hover:text-purple-300 transition-colors" />
                <div className="text-xl font-black text-white">{s.val}</div>
                <div className="text-xs text-white/40 font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-3 rounded-full bg-purple-400" />
          </motion.div>
        </div>
      </section>

      {/* ========= CATEGORIES GRID ========= */}
      <section id="categories" className="relative px-4 py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-2 inline-block">Danh mục</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">Dịch vụ đa dạng</h2>
            <p className="text-white/40 mt-2 text-sm max-w-md mx-auto">Lựa chọn từ hàng trăm dịch vụ chất lượng cao trong mọi lĩnh vực</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICE_CATEGORIES.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.01 }}
                onMouseEnter={() => setHoveredCategory(i)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="relative group cursor-pointer rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 overflow-hidden hover:border-purple-500/30 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl group-hover:from-purple-500/20 transition-all duration-500" />

                <div className="relative z-10">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} shadow-md mb-4`}>
                    <cat.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">{cat.name}</h3>
                  <p className="text-xs text-white/40 leading-relaxed mb-3">{cat.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400">{cat.count} dịch vụ</span>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= FEATURED SERVICES ========= */}
      <section className="px-4 py-14 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-1 inline-block">Nổi bật</span>
              <h2 className="text-2xl md:text-3xl font-black text-white mt-1">Dịch vụ được yêu thích</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const el = document.getElementById('service-scroll');
                  if (el) el.scrollBy({ left: -el.offsetWidth * 0.8, behavior: 'smooth' });
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/50 hover:bg-purple-500/30 hover:text-purple-300 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const el = document.getElementById('service-scroll');
                  if (el) el.scrollBy({ left: el.offsetWidth * 0.8, behavior: 'smooth' });
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/50 hover:bg-purple-500/30 hover:text-purple-300 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Carousel container with gradient fade edges */}
          <div className="relative group/carousel">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-2 w-12 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

            <div
              id="service-scroll"
              className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
              onMouseEnter={() => { (window as any).__scrollPaused = true; }}
              onMouseLeave={() => { (window as any).__scrollPaused = false; }}
            >
              {serviceProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 100 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="flex-shrink-0 w-[calc(25%-9px)] min-w-[220px] snap-start"
                >
                  <ProductCard 
                    product={p} 
                    onAddToCart={addToCart} 
                    onViewDetails={handleViewDetails} 
                    onToggleWishlist={toggleWishlist} 
                    isInWishlist={isInWishlist(p.id)} 
                  />
                </motion.div>
              ))}
            </div>

            {/* Animated glow bar */}
            <div className="mt-3 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 rounded-full"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                style={{ width: '40%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========= PROCESS STEPS ========= */}
      <section className="px-4 py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-950/20 to-slate-950" />
        <div className="mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-2 inline-block">Quy trình</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">Đơn giản, nhanh chóng</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center group"
              >
                {i < 3 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                )}

                <div className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-white/20 flex items-center justify-center text-[10px] font-black text-white">
                    {s.step}
                  </div>
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= TOP PROVIDERS ========= */}
      <section className="px-4 py-14 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-2 inline-block">Chuyên gia</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">Nhà cung cấp hàng đầu</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOP_PROVIDERS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -3 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-purple-500/30 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-xl border-2 border-white/10" />
                    {p.verified && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{p.name}</h4>
                    <p className="text-xs text-white/40">{p.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-white">{p.rating}</span>
                  </div>
                  <span className="text-xs text-white/30">{p.orders.toLocaleString()} đơn hoàn thành</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= TRUST & FEATURES ========= */}
      <section className="px-4 py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-950/20 to-slate-950" />
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: 'Thanh toán ký quỹ', desc: 'Tiền được giữ an toàn cho đến khi bạn xác nhận hài lòng với dịch vụ', gradient: 'from-violet-500 to-purple-600' },
              { icon: Clock, title: 'Giao hàng đúng hạn', desc: 'Cam kết thời gian hoàn thành rõ ràng. Hoàn tiền nếu trễ hạn', gradient: 'from-cyan-500 to-blue-600' },
              { icon: Award, title: 'Chất lượng đảm bảo', desc: '100% đánh giá xác thực từ khách hàng thực tế. Nhà cung cấp được kiểm duyệt', gradient: 'from-amber-500 to-orange-600' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-purple-500/20 transition-all"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${t.gradient} shadow-md mb-4`}>
                  <t.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{t.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= CTA ========= */}
      <section className="px-4 py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
        <div className="mx-auto max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-pink-600" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_70%)]" />
            
            <div className="relative z-10 p-8 md:p-10 text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-white/90 mb-4">
                <Rocket className="w-3.5 h-3.5" /> Miễn phí đăng ký
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                Trở thành chuyên gia trên NexusMarket
              </h2>
              <p className="text-sm text-white/70 mb-7 max-w-md mx-auto">
                Tiếp cận hàng nghìn khách hàng tiềm năng, phát triển thương hiệu cá nhân và tăng thu nhập
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/seller-register')}
                  className="bg-white text-purple-700 font-bold px-6 py-2.5 rounded-xl text-sm shadow-lg shadow-black/20 transition-all inline-flex items-center gap-2"
                >
                  Bắt đầu ngay <ArrowRight className="w-4 h-4" />
                </motion.button>
                <button className="border-2 border-white/30 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-all">
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
