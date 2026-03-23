'use client';

import React, { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Users, Wrench, Handshake, Code, School, ArrowRight, Sparkles, Brain, Cpu, Zap, Shield, Globe, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS } from './lib/constants';
import { ProductCard } from './components/ProductCard';
import { useCart, useWishlist, useSelectedProduct } from './providers';
import { Product } from './lib/types';
import dynamic from 'next/dynamic';

const AIHeroScene = dynamic(() => import('./components/AIScene3D').then(m => ({ default: m.AIHeroScene })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950" />
});

const RobotHeroCanvas = dynamic(() => import('./components/RobotHero3D').then(m => ({ default: m.RobotHeroCanvas })), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />
});

const CATEGORIES = [
  { name: 'Tài khoản', sub: 'Lâu năm & số lượng lớn', icon: Users, gradient: 'from-violet-500 to-purple-600' },
  { name: 'Công cụ', sub: 'SEO & Marketing', icon: Wrench, gradient: 'from-cyan-500 to-blue-600' },
  { name: 'Dịch vụ', sub: 'Theo yêu cầu', icon: Handshake, gradient: 'from-pink-500 to-rose-600' },
  { name: 'Phần mềm', sub: 'Script tự động', icon: Code, gradient: 'from-emerald-500 to-green-600' },
  { name: 'Tài khoản AI', sub: 'Trí tuệ nhân tạo', icon: School, gradient: 'from-amber-500 to-orange-600' },
];

const STATS = [
  { val: '50K+', label: 'Người dùng', icon: Users },
  { val: 'AI', label: 'Hỗ trợ 24/7', icon: Brain },
  { val: '99.9%', label: 'Uptime', icon: Shield },
  { val: '150+', label: 'Quốc gia', icon: Globe },
];

export default function HomePage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist, wishlist } = useWishlist();
  const { setSelectedProduct } = useSelectedProduct();

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    router.push(`/product/${product.id}`);
  };

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if ((window as any).__homeScrollPaused) return;
      const el = document.getElementById('home-product-scroll');
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
      {/* ========= CSS Keyframes ========= */}
      <style jsx>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(34,211,238,0.15), 0 0 60px rgba(99,102,241,0.1); }
          50% { box-shadow: 0 0 40px rgba(34,211,238,0.3), 0 0 80px rgba(99,102,241,0.2); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scan-line {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        .glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
        .float-gentle { animation: float-gentle 4s ease-in-out infinite; }
      `}</style>

      {/* ========= AI ROBOT HERO ========= */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-16">
        {/* 3D Neural overlay */}
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950" />}>
          <AIHeroScene />
        </Suspense>

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-slate-950" />

        {/* Content grid: text left, robot image right */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 px-4 py-1.5 text-xs font-bold text-cyan-300 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kỉ nguyên AI — Tốc độ tiến hóa vượt giới hạn</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Trí tuệ nhân tạo
                </span>
                <br />
                <span className="text-white/90">dẫn lối số hóa</span>
              </h1>

              <p className="text-sm text-white/45 max-w-md mb-6 leading-relaxed">
                NexusMarket — nền tảng giao dịch tài sản số được hỗ trợ bởi AI.
                Công cụ, tài khoản, dịch vụ — tất cả trong hệ sinh thái thông minh.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/marketplace')}
                  className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/20 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Khám phá Chợ <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/seller-register')}
                  className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" /> Trở thành người bán
                </motion.button>
              </div>

              {/* Stats inline */}
              <div className="grid grid-cols-4 gap-2 max-w-md">
                {STATS.map((s, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-md rounded-lg p-2 border border-white/5 text-center">
                    <div className="text-base font-black text-white">{s.val}</div>
                    <div className="text-[10px] text-white/35">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: 3D Animated Robot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:block relative w-full h-[480px]"
            >
              <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
                <RobotHeroCanvas />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========= AI EVOLUTION SPEED ========= */}
      <section className="relative px-4 py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950" />
        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-2 inline-block">Tiến hóa</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">Tốc độ tiến hóa AI</h2>
            <p className="text-xs text-white/35 mt-2 max-w-md mx-auto">Từ xử lý văn bản đơn giản đến sáng tạo nghệ thuật — AI tiến hóa nhanh hơn bất kỳ công nghệ nào trong lịch sử</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500/30 via-purple-500/30 to-transparent hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { year: '2020', title: 'GPT-3 ra đời', desc: '175 tỷ tham số — AI bắt đầu viết văn bản như con người', icon: Code, color: 'from-blue-500 to-cyan-500', side: 'left' },
                { year: '2022', title: 'ChatGPT bùng nổ', desc: '100 triệu người dùng trong 2 tháng — kỷ lục lịch sử công nghệ', icon: Zap, color: 'from-cyan-500 to-teal-500', side: 'right' },
                { year: '2023', title: 'AI đa phương thức', desc: 'Hiểu hình ảnh, âm thanh, video — AI không chỉ đọc mà còn "nhìn"', icon: Brain, color: 'from-purple-500 to-violet-500', side: 'left' },
                { year: '2024', title: 'AI Agent tự động', desc: 'AI tự lên kế hoạch, thực thi tác vụ phức tạp, viết code hoàn chỉnh', icon: Cpu, color: 'from-violet-500 to-pink-500', side: 'right' },
                { year: '2025', title: 'Siêu trí tuệ gần', desc: 'AI suy luận vượt con người ở nhiều lĩnh vực — kỉ nguyên mới bắt đầu', icon: Sparkles, color: 'from-pink-500 to-red-500', side: 'left' },
                { year: '2026', title: 'NexusMarket AI', desc: 'Nền tảng giao dịch số đầu tiên tích hợp toàn diện trí tuệ nhân tạo', icon: Globe, color: 'from-emerald-500 to-cyan-500', side: 'right' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: item.side === 'left' ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-cyan-500/20 transition-all group ${item.side === 'right' ? 'md:mt-8' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-md`}>
                      <item.icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black text-cyan-400 bg-cyan-500/10 rounded px-1.5 py-0.5">{item.year}</span>
                        <h4 className="font-bold text-white text-sm">{item.title}</h4>
                      </div>
                      <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========= CATEGORIES ========= */}
      <section className="relative px-4 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/10 to-slate-950" />
        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-2 inline-block">Danh mục</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">Duyệt theo danh mục</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/marketplace')}
                className="group flex flex-col items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 text-center hover:border-cyan-500/30 transition-all"
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} group-hover:shadow-lg transition-all`}>
                  <cat.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-white text-sm">{cat.name}</h4>
                <p className="text-[11px] text-white/40 mt-0.5">{cat.sub}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ========= FEATURED PRODUCTS ========= */}
      <section className="px-4 py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-1 inline-block">Nổi bật</span>
              <h2 className="text-2xl md:text-3xl font-black text-white mt-1">Sản phẩm nổi bật</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const el = document.getElementById('home-product-scroll');
                  if (el) el.scrollBy({ left: -el.offsetWidth * 0.8, behavior: 'smooth' });
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/50 hover:bg-cyan-500/30 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const el = document.getElementById('home-product-scroll');
                  if (el) el.scrollBy({ left: el.offsetWidth * 0.8, behavior: 'smooth' });
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/50 hover:bg-cyan-500/30 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
              <button onClick={() => router.push('/marketplace')} className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors ml-2">
                Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Carousel with effects */}
          <div className="relative group/carousel">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-2 w-12 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

            <div
              id="home-product-scroll"
              className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
              onMouseEnter={() => { (window as any).__homeScrollPaused = true; }}
              onMouseLeave={() => { (window as any).__homeScrollPaused = false; }}
            >
              {MOCK_PRODUCTS.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 100 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="flex-shrink-0 w-[calc(25%-9px)] min-w-[220px] snap-start"
                >
                  <ProductCard
                    product={product}
                    onAddToCart={addToCart}
                    onViewDetails={handleViewDetails}
                    onToggleWishlist={toggleWishlist}
                    isInWishlist={isInWishlist(product.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Animated glow bar */}
            <div className="mt-3 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-400 to-cyan-500 rounded-full"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                style={{ width: '40%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========= AI FEATURES ========= */}
      <section className="px-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950/15 to-slate-950" />
        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-2 inline-block">Công nghệ</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">Sức mạnh AI tích hợp</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Brain, title: 'Gợi ý thông minh', desc: 'AI phân tích hành vi và đề xuất sản phẩm phù hợp nhất với bạn', gradient: 'from-violet-500 to-purple-600' },
              { icon: Zap, title: 'Giao dịch tức thì', desc: 'Tự động hoá quy trình mua bán, nhận sản phẩm số trong vài giây', gradient: 'from-cyan-500 to-blue-600' },
              { icon: Shield, title: 'Bảo vệ AI', desc: 'Hệ thống chống gian lận tự động bảo vệ mọi giao dịch của bạn', gradient: 'from-emerald-500 to-green-600' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-cyan-500/20 transition-all"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} shadow-md mb-3`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{f.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= NEWSLETTER CTA ========= */}
      <section className="px-4 py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
        <div className="mx-auto max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.12),transparent_70%)]" />

            <div className="relative z-10 p-7 md:p-9 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <h3 className="text-xl font-black text-white mb-1">Tham gia 50K+ marketer số</h3>
                <p className="text-xs text-white/60">Nhận cập nhật hàng tuần về công cụ mới, chiến lược AI và mã giảm giá.</p>
              </div>
              <form className="flex w-full flex-col gap-2 sm:flex-row lg:max-w-sm" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 rounded-xl border-none bg-white/15 backdrop-blur-sm p-2.5 text-sm text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/30"
                />
                <button className="rounded-xl bg-white text-purple-700 px-5 py-2.5 font-bold text-sm hover:bg-white/90 transition-all">
                  Đăng ký
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
