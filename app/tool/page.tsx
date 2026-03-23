'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import {
  Wrench, Search, Zap, Bot, BarChart3, Globe, Lock, Link2,
  Star, ChevronRight, ArrowRight, Sparkles, Shield, Cpu,
  CheckCircle, Users, Clock, Target, Activity,
  TrendingUp, Eye, Download, RefreshCcw,
  Rocket, Award, HeartHandshake, Gauge,
  Code, Settings, Database, Workflow, TerminalSquare, Puzzle,
  ChevronLeft, Quote, Hexagon, Radio, Wifi, MonitorDot
} from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_PRODUCTS } from '../lib/constants';
import { ProductCard } from '../components/ProductCard';
import { useCart, useWishlist, useSelectedProduct } from '../providers';
import { Product } from '../lib/types';
import dynamic from 'next/dynamic';

const ToolHeroScene3D = dynamic(() => import('../components/ToolScene3D').then(m => ({ default: m.ToolHeroScene3D })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-[#020a18] via-[#041428] to-[#020a18]" />
});

// ─── TOOL DATA ────────────────────────────────────────
const TOOL_GRID = [
  { name: 'SEO Master Pro', desc: 'Nghiên cứu từ khóa, phân tích đối thủ, audit website tự động', icon: Search, gradient: 'from-cyan-400 to-blue-500', users: '12K+', rating: 4.9, price: '299K', hot: true },
  { name: 'AutoBot AI', desc: 'Bot tự động MXH — lên lịch, post, tương tác thông minh', icon: Bot, gradient: 'from-violet-400 to-purple-500', users: '8.5K+', rating: 4.8, price: '199K', hot: false },
  { name: 'SpyLens', desc: 'Spy ads đối thủ, phân tích chiến lược marketing', icon: Eye, gradient: 'from-rose-400 to-pink-500', users: '5.2K+', rating: 4.7, price: '349K', hot: false },
  { name: 'ProxyNova', desc: '10M+ IP residential, 190+ quốc gia, xoay tự động', icon: Globe, gradient: 'from-emerald-400 to-teal-500', users: '15K+', rating: 4.9, price: '149K', hot: true },
  { name: 'RankTracker', desc: 'Theo dõi thứ hạng keyword real-time, báo cáo tự động', icon: TrendingUp, gradient: 'from-amber-400 to-orange-500', users: '6.3K+', rating: 4.8, price: '179K', hot: false },
  { name: 'ShieldGuard', desc: 'Bảo vệ website, chống DDoS, quét lỗ hổng', icon: Shield, gradient: 'from-red-400 to-rose-500', users: '3.8K+', rating: 4.9, price: '259K', hot: false },
];

const CATEGORIES = [
  { name: 'SEO & Marketing', icon: Search, count: 128, color: '#22d3ee' },
  { name: 'Auto & Bot', icon: Bot, count: 95, color: '#a78bfa' },
  { name: 'Analytics & Spy', icon: BarChart3, count: 67, color: '#f472b6' },
  { name: 'Proxy & Network', icon: Globe, count: 84, color: '#34d399' },
  { name: 'Security', icon: Lock, count: 42, color: '#fb923c' },
  { name: 'Dev & API', icon: Code, count: 61, color: '#60a5fa' },
];

const LIVE_STATS = [
  { label: 'Tools hoạt động', value: '547', icon: Wrench, color: '#22d3ee', suffix: '' },
  { label: 'Giao dịch hôm nay', value: '1,284', icon: Activity, color: '#34d399', suffix: '' },
  { label: 'Online ngay', value: '3,891', icon: Radio, color: '#a78bfa', suffix: '' },
  { label: 'Uptime', value: '99.97', icon: Wifi, color: '#f472b6', suffix: '%' },
];

const REVIEWS = [
  { name: 'Minh Trí', role: 'SEO Lead @ VNG', text: 'Tăng 300% organic traffic trong 3 tháng nhờ SEO Master Pro.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MinhTri', rating: 5 },
  { name: 'Hà Linh', role: 'Growth @ Tiki', text: 'AutoBot AI tiết kiệm 4h mỗi ngày cho team marketing.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HaLinh', rating: 5 },
  { name: 'Đức Anh', role: 'Freelancer', text: 'ProxyNova ổn định nhất thị trường, chạy 24/7 không lỗi.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DucAnh', rating: 5 },
  { name: 'Thu Hương', role: 'CMO @ Shopee VN', text: 'SpyLens giúp tôi luôn nắm bắt chiến lược đối thủ.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThuHuong', rating: 5 },
];

export default function ToolPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { setSelectedProduct } = useSelectedProduct();
  const [activeCat, setActiveCat] = useState(0);

  const toolProducts = MOCK_PRODUCTS.filter(p => p.category === 'Tools' || p.category === 'Software');

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    router.push(`/product/${product.id}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if ((window as any).__toolScrollPaused) return;
      const el = document.getElementById('tool-product-scroll');
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max - 10) el.scrollTo({ left: 0, behavior: 'smooth' });
      else el.scrollBy({ left: 280, behavior: 'smooth' });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#030b1a] min-h-screen text-white overflow-hidden">
      {/* ═══════════════════ GLOBAL STYLES ═══════════════════ */}
      <style jsx>{`
        @keyframes hex-float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(3deg)} }
        @keyframes scan { 0%{top:-2px;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:100%;opacity:0} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.3} 100%{transform:scale(2.5);opacity:0} }
        @keyframes data-flow { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes glow { 0%,100%{box-shadow:0 0 15px rgba(34,211,238,0.15)} 50%{box-shadow:0 0 30px rgba(34,211,238,0.3)} }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .hex-float { animation: hex-float 6s ease-in-out infinite; }
        .scan-line { animation: scan 4s linear infinite; }
        .pulse-ring { animation: pulse-ring 2s ease-out infinite; }
        .glow-box { animation: glow 3s ease-in-out infinite; }
        .data-flow { background: linear-gradient(90deg, transparent, rgba(34,211,238,0.1), transparent); background-size: 200% 100%; animation: data-flow 3s linear infinite; }
        .ticker-scroll { animation: ticker 40s linear infinite; }
        .ticker-scroll:hover { animation-play-state: paused; }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.06); }
        .glass-bright { background: rgba(255,255,255,0.05); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.1); }
        .holo-border { border: 1px solid; border-image: linear-gradient(135deg, rgba(34,211,238,0.3), rgba(167,139,250,0.3), rgba(34,211,238,0.1)) 1; }
      `}</style>

      {/* ═══════════════════ HERO — IMMERSIVE DIGITAL WORLD ═══════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background fills entire hero */}
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-[#020a18] via-[#041428] to-[#020a18]" />}>
          <ToolHeroScene3D />
        </Suspense>

        {/* Hex grid overlay */}
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 15v22L30 52 0 37V15z' fill='none' stroke='rgba(34,211,238,0.04)' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 52px'
        }} />

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#030b1a]/40 via-transparent to-[#030b1a]" />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,transparent_20%,#030b1a_80%)]" />

        {/* Scan line effect */}
        <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent z-[3] scan-line" />

        {/* Floating HUD panels — top-left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-28 left-6 z-10 hidden xl:block"
        >
          <div className="glass rounded-xl p-3 w-48 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Live System</span>
            </div>
            {LIVE_STATS.slice(0, 2).map((s, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-t border-white/5">
                <span className="text-[10px] text-white/30">{s.label}</span>
                <span className="text-xs font-black" style={{ color: s.color }}>{s.value}{s.suffix}</span>
              </div>
            ))}
          </div>
          <div className="glass rounded-xl p-3 w-48">
            <div className="text-[10px] text-white/30 mb-1">Network Status</div>
            <div className="flex gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{
                  height: `${8 + Math.random() * 16}px`,
                  background: `linear-gradient(to top, rgba(34,211,238,0.3), rgba(34,211,238,${0.1 + Math.random() * 0.5}))`
                }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Floating HUD panels — top-right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute top-28 right-6 z-10 hidden xl:block"
        >
          <div className="glass rounded-xl p-3 w-48 mb-3">
            {LIVE_STATS.slice(2).map((s, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-1.5">
                  <s.icon className="w-3 h-3" style={{ color: s.color }} />
                  <span className="text-[10px] text-white/30">{s.label}</span>
                </div>
                <span className="text-xs font-black" style={{ color: s.color }}>{s.value}{s.suffix}</span>
              </div>
            ))}
          </div>
          <div className="glass rounded-xl p-3 w-48">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-white/30">Threat Shield</span>
              <span className="text-[10px] font-bold text-emerald-400">ACTIVE</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                initial={{ width: '0%' }}
                animate={{ width: '97%' }}
                transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* ── Center content ── */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-5 py-2 text-xs font-bold text-cyan-300 mb-6 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>THẾ GIỚI SỐ ĐỊNH NGHĨA CUỘC CHƠI</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-5 leading-[0.9] tracking-tight">
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Vũ khí số
              </span>
              <span className="block text-white/90 mt-1">
                cho cuộc chơi lớn
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/35 max-w-2xl mx-auto mb-8 leading-relaxed">
              500+ công cụ hàng đầu thế giới. SEO, automation, analytics, proxy —
              <br className="hidden md:block" />
              tất cả trong một hệ sinh thái thông minh, sẵn sàng chiến đấu.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34,211,238,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('tool-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-2xl shadow-cyan-500/30 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Truy cập kho vũ khí <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 glass-bright text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
              >
                <MonitorDot className="w-4 h-4 text-cyan-400" /> Live Demo
              </motion.button>
            </div>

            {/* Animated stat counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-6 glass rounded-2xl px-8 py-4"
            >
              {LIVE_STATS.map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="w-[1px] h-8 bg-white/10" />}
                  <div className="text-center">
                    <div className="text-lg font-black" style={{ color: s.color }}>{s.value}{s.suffix}</div>
                    <div className="text-[10px] text-white/30 mt-0.5">{s.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border border-white/15 flex items-start justify-center p-1.5">
            <div className="w-1 h-2.5 rounded-full bg-cyan-400" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ CATEGORY DASHBOARD STRIP ═══════════════════ */}
      <section className="relative -mt-1 z-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="glass-bright rounded-2xl p-1 flex gap-1 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat, i) => {
              const CatIcon = cat.icon;
              return (
                <button
                  key={i}
                  onClick={() => setActiveCat(i)}
                  className={`flex-1 min-w-[140px] flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all ${
                    activeCat === i
                      ? 'bg-white/[0.08] shadow-lg'
                      : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <CatIcon className="w-4 h-4 flex-shrink-0" style={{ color: cat.color }} />
                  <div className="text-left min-w-0">
                    <div className={`text-xs font-bold truncate ${activeCat === i ? 'text-white' : 'text-white/50'}`}>{cat.name}</div>
                    <div className="text-[10px] text-white/25">{cat.count} tools</div>
                  </div>
                  {activeCat === i && <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TOOL GRID — HOLOGRAPHIC CARDS ═══════════════════ */}
      <section id="tool-grid" className="relative px-4 py-20">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(34,211,238,0.04)_0%,transparent_70%)]" />

        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Arsenal</span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-center">
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">Kho vũ khí số</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOL_GRID.map((tool, i) => {
              const ToolIcon = tool.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative glass rounded-2xl overflow-hidden cursor-pointer glow-box"
                >
                  {/* Top gradient strip */}
                  <div className={`h-[2px] bg-gradient-to-r ${tool.gradient}`} />

                  {/* Scan line on hover */}
                  <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent scan-line" />
                  </div>

                  <div className="p-5 relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} shadow-lg`}>
                          <ToolIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base">{tool.name}</h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-[11px] font-bold text-white/60">{tool.rating}</span>
                            <span className="text-[11px] text-white/25">• {tool.users}</span>
                          </div>
                        </div>
                      </div>
                      {tool.hot && (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-gradient-to-r from-rose-500/20 to-orange-500/20 text-rose-400 border border-rose-500/20">
                          HOT
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-white/35 leading-relaxed mb-5">{tool.desc}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                      <div>
                        <span className="text-xl font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{tool.price}</span>
                        <span className="text-[10px] text-white/25 ml-1">/tháng</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-[11px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all"
                      >
                        Xem <ChevronRight className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRODUCT CAROUSEL ═══════════════════ */}
      <section className="px-4 py-14 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030b1a] via-[#061225] to-[#030b1a]" />
        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-4 rounded-full bg-cyan-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Marketplace</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">Sản phẩm từ cộng đồng</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                onClick={() => { const el = document.getElementById('tool-product-scroll'); if (el) el.scrollBy({ left: -el.offsetWidth * 0.8, behavior: 'smooth' }); }}
                className="flex h-9 w-9 items-center justify-center rounded-full glass text-white/50 hover:text-cyan-300 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                onClick={() => { const el = document.getElementById('tool-product-scroll'); if (el) el.scrollBy({ left: el.offsetWidth * 0.8, behavior: 'smooth' }); }}
                className="flex h-9 w-9 items-center justify-center rounded-full glass text-white/50 hover:text-cyan-300 transition-all">
                <ChevronRight className="w-4 h-4" />
              </motion.button>
              <button onClick={() => router.push('/marketplace')} className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 ml-2">
                Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          <div className="relative group/c">
            <div className="absolute left-0 top-0 bottom-2 w-16 bg-gradient-to-r from-[#061225] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-[#061225] to-transparent z-10 pointer-events-none" />
            <div id="tool-product-scroll" className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
              onMouseEnter={() => { (window as any).__toolScrollPaused = true; }}
              onMouseLeave={() => { (window as any).__toolScrollPaused = false; }}>
              {toolProducts.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 100 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="flex-shrink-0 w-[calc(25%-9px)] min-w-[220px] snap-start">
                  <ProductCard product={p} onAddToCart={addToCart} onViewDetails={handleViewDetails}
                    onToggleWishlist={toggleWishlist} isInWishlist={isInWishlist(p.id)} />
                </motion.div>
              ))}
            </div>
            <div className="mt-3 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-cyan-500 via-blue-400 to-violet-500 rounded-full"
                animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 4, ease: 'linear' }} style={{ width: '40%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ECOSYSTEM COMMAND CENTER ═══════════════════ */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(34,211,238,0.03),transparent_60%)]" />

        <div className="mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — Visual dashboard mockup */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative">
                {/* Main dashboard panel */}
                <div className="glass-bright rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                    <span className="text-[10px] text-white/20 ml-2 font-mono">nexus://command-center</span>
                  </div>

                  {/* Fake chart */}
                  <div className="mb-4">
                    <div className="text-[10px] text-white/25 mb-2">Revenue Analytics</div>
                    <div className="flex items-end gap-1 h-20">
                      {[35, 55, 45, 70, 60, 85, 75, 90, 80, 95, 70, 88].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-500/40 to-cyan-400/10"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Mini cards */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Active Tools', val: '24', color: 'text-cyan-400' },
                      { label: 'API Calls', val: '1.2M', color: 'text-violet-400' },
                      { label: 'Saved', val: '₫4.8M', color: 'text-emerald-400' },
                    ].map((m, i) => (
                      <div key={i} className="bg-white/[0.03] rounded-lg p-2.5 border border-white/[0.04]">
                        <div className="text-[9px] text-white/25">{m.label}</div>
                        <div className={`text-sm font-black ${m.color}`}>{m.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating mini panel */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -right-4 glass rounded-xl p-3 w-40 shadow-2xl shadow-black/30"
                >
                  <div className="text-[9px] text-white/25 mb-1">Pipeline Status</div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-bold text-emerald-400">7 active flows</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right — Feature text */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 rounded-full bg-cyan-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Command Center</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Trung tâm điều khiển<br /><span className="text-white/50">trong tầm tay</span>
              </h2>
              <p className="text-sm text-white/35 leading-relaxed mb-8">
                Kết nối tất cả tool thành một hệ sinh thái thống nhất. Theo dõi, tối ưu, và tự động hoá
                mọi quy trình marketing từ một dashboard duy nhất.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Workflow, title: 'Pipeline Builder', desc: 'Kéo thả workflow, kết nối tool tự động', color: '#22d3ee' },
                  { icon: Zap, title: 'Smart Triggers', desc: 'Kích hoạt hành động dựa trên sự kiện', color: '#a78bfa' },
                  { icon: BarChart3, title: 'Unified Analytics', desc: 'Tổng hợp dữ liệu từ mọi nguồn', color: '#34d399' },
                ].map((f, i) => {
                  const FIcon = f.icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 glass rounded-xl p-4 hover:border-cyan-500/20 transition-all cursor-pointer"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}>
                        <FIcon className="w-5 h-5" style={{ color: f.color }} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-white">{f.title}</h4>
                        <p className="text-[11px] text-white/30">{f.desc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/15" />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIAL TICKER ═══════════════════ */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030b1a] via-[#051020] to-[#030b1a]" />
        <div className="relative z-10">
          <div className="text-center mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Trusted by</span>
            <h2 className="text-2xl font-black text-white mt-1">25,000+ marketer tin dùng</h2>
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030b1a] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030b1a] to-transparent z-10" />
            <div className="flex gap-5 ticker-scroll" style={{ width: 'max-content' }}>
              {[...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS].map((r, i) => (
                <div key={i} className="flex-shrink-0 w-[320px] glass rounded-xl p-5 hover:border-cyan-500/15 transition-all">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed mb-4">"{r.text}"</p>
                  <div className="flex items-center gap-2.5">
                    <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full border border-white/10" />
                    <div>
                      <div className="text-xs font-bold text-white/70">{r.name}</div>
                      <div className="text-[10px] text-white/25">{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUST STRIP ═══════════════════ */}
      <section className="px-4 py-10 relative">
        <div className="mx-auto max-w-6xl">
          <div className="glass rounded-2xl p-1 flex flex-wrap">
            {[
              { icon: Shield, title: 'Bảo hành key', desc: 'Đổi miễn phí nếu lỗi', color: '#22d3ee' },
              { icon: RefreshCcw, title: 'Auto update', desc: 'Phiên bản mới nhất', color: '#a78bfa' },
              { icon: Award, title: '100% chính hãng', desc: 'Nhà cung cấp verified', color: '#34d399' },
              { icon: Clock, title: 'Hoàn tiền 7 ngày', desc: 'Không hài lòng = refund', color: '#f472b6' },
            ].map((t, i) => {
              const TIcon = t.icon;
              return (
                <div key={i} className="flex-1 min-w-[200px] flex items-center gap-3 p-4 border-r border-white/[0.04] last:border-r-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${t.color}10` }}>
                    <TIcon className="w-4 h-4" style={{ color: t.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white/70">{t.title}</div>
                    <div className="text-[10px] text-white/25">{t.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA — REFINED HOLOGRAPHIC ═══════════════════ */}
      <section className="px-4 py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(34,211,238,0.03),transparent_70%)]" />
        <div className="mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Dark glass background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-white/[0.04] backdrop-blur-xl" />
            <div className="absolute inset-[0] rounded-2xl border border-white/[0.08]" />

            {/* Animated border glow */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 opacity-60 blur-sm" />
            <div className="absolute inset-0 rounded-2xl bg-[#030b1a]" />
            <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.03]" />

            {/* Hex pattern overlay */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 15v22L30 52 0 37V15z' fill='none' stroke='rgba(34,211,238,0.06)' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '30px 26px'
            }} />

            {/* Floating dots decoration */}
            {[
              { top: '15%', left: '8%', size: '3px', color: 'cyan', delay: 0 },
              { top: '70%', left: '12%', size: '2px', color: 'violet', delay: 1 },
              { top: '25%', right: '10%', size: '4px', color: 'cyan', delay: 0.5 },
              { top: '65%', right: '15%', size: '2px', color: 'emerald', delay: 1.5 },
              { top: '40%', right: '5%', size: '3px', color: 'violet', delay: 0.8 },
            ].map((dot, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 3, delay: dot.delay }}
                className="absolute rounded-full"
                style={{
                  top: dot.top, left: dot.left, right: (dot as any).right,
                  width: dot.size, height: dot.size,
                  background: dot.color === 'cyan' ? '#22d3ee' : dot.color === 'violet' ? '#a78bfa' : '#34d399'
                }}
              />
            ))}

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              {/* Left side — text */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/15 px-3 py-1.5 text-[11px] font-bold text-cyan-300 mb-4">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}>
                    <Sparkles className="w-3 h-3" />
                  </motion.div>
                  Ưu đãi giới hạn
                </div>
                <h2 className="text-2xl md:text-3xl font-black mb-2">
                  <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                    Giảm 30%
                  </span>
                  <span className="text-white/40 ml-2">đơn hàng đầu</span>
                </h2>
                <p className="text-xs text-white/30 leading-relaxed max-w-md mb-6">
                  Trang bị vũ khí số cho cuộc chơi lớn. Nhận voucher giảm giá độc quyền khi đăng ký tài khoản mới.
                </p>

                {/* Countdown */}
                <div className="flex gap-3 mb-6 justify-center md:justify-start">
                  {[
                    { val: '02', label: 'Ngày' },
                    { val: '18', label: 'Giờ' },
                    { val: '45', label: 'Phút' },
                    { val: '12', label: 'Giây' },
                  ].map((t, i) => (
                    <div key={i} className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-lg font-black text-cyan-300 font-mono">
                        {t.val}
                      </div>
                      <div className="text-[8px] text-white/20 mt-1 uppercase tracking-wider">{t.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(34,211,238,0.25)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push('/register')}
                    className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-7 py-3 rounded-xl text-sm shadow-xl shadow-cyan-500/20 inline-flex items-center gap-2 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Nhận ưu đãi <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="glass text-white/60 font-bold px-7 py-3 rounded-xl text-sm hover:text-white hover:bg-white/[0.06] transition-all"
                  >
                    Tìm hiểu thêm
                  </motion.button>
                </div>
              </div>

              {/* Right side — visual element */}
              <div className="hidden md:flex flex-col items-center gap-4">
                <div className="relative">
                  {/* Glowing percentage */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="w-36 h-36 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/15 flex items-center justify-center relative"
                  >
                    <div className="text-center">
                      <span className="text-5xl font-black bg-gradient-to-b from-cyan-300 to-cyan-500 bg-clip-text text-transparent">30</span>
                      <span className="text-xl font-black text-cyan-400">%</span>
                      <div className="text-[9px] text-white/25 mt-0.5 uppercase tracking-wider">Discount</div>
                    </div>
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/40 rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/40 rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/40 rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/40 rounded-br-lg" />
                  </motion.div>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-2xl border border-cyan-500/10 pulse-ring" />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/25">
                  <CheckCircle className="w-3 h-3 text-emerald-400" /> Áp dụng cho tất cả tool
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
