'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ArrowRight,
  Coins,
  Sword,
  Gem,
  RefreshCcw,
  Calendar,
  CreditCard,
  Truck,
  Copy,
  Check,
  ExternalLink,
  FileText,
  ReceiptText,
  Eye
} from 'lucide-react';
import { MOCK_ORDERS } from '../lib/constants';
import { Order, ORDER_STATUS_LABELS } from '../lib/types';

const ICON_MAP: Record<string, React.ElementType> = {
  Coins,
  Sword,
  Gem,
  RefreshCcw,
};

type FilterStatus = 'all' | Order['status'];

const FILTER_TABS: { key: FilterStatus; label: string; icon: React.ElementType; color: string }[] = [
  { key: 'all', label: 'Tất cả', icon: Package, color: 'cyan' },
  { key: 'Completed', label: 'Hoàn tất', icon: CheckCircle2, color: 'emerald' },
  { key: 'Pending', label: 'Đang xử lý', icon: Clock, color: 'amber' },
  { key: 'Cancelled', label: 'Đã huỷ', icon: XCircle, color: 'red' },
];

const STATUS_CONFIG: Record<Order['status'], { color: string; bg: string; border: string; dot: string; icon: React.ElementType }> = {
  Completed: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400', icon: CheckCircle2 },
  Pending: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-400', icon: Clock },
  Cancelled: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-400', icon: XCircle },
};

// Timeline steps for completed/pending/cancelled
function getTimeline(status: Order['status'], date: string) {
  const base = [
    { label: 'Đặt hàng', desc: `Đơn hàng được tạo lúc ${date}`, done: true, icon: ShoppingBag },
    { label: 'Xác nhận', desc: 'Hệ thống xác nhận thanh toán', done: true, icon: CreditCard },
  ];
  if (status === 'Completed') {
    return [
      ...base,
      { label: 'Đang giao', desc: 'Sản phẩm đang được chuyển', done: true, icon: Truck },
      { label: 'Hoàn tất', desc: 'Giao dịch thành công', done: true, icon: CheckCircle2 },
    ];
  }
  if (status === 'Pending') {
    return [
      ...base,
      { label: 'Đang xử lý', desc: 'Đơn hàng đang được xử lý', done: false, icon: Clock },
      { label: 'Giao hàng', desc: 'Chờ giao hàng', done: false, icon: Truck },
    ];
  }
  return [
    ...base,
    { label: 'Đã huỷ', desc: 'Đơn hàng bị huỷ bởi hệ thống', done: false, icon: XCircle },
  ];
}

export default function OrdersPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    let orders = MOCK_ORDERS;
    if (filter !== 'all') {
      orders = orders.filter(o => o.status === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      orders = orders.filter(o =>
        o.productName.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q)
      );
    }
    return orders;
  }, [filter, search]);

  const stats = useMemo(() => ({
    total: MOCK_ORDERS.length,
    completed: MOCK_ORDERS.filter(o => o.status === 'Completed').length,
    pending: MOCK_ORDERS.filter(o => o.status === 'Pending').length,
    cancelled: MOCK_ORDERS.filter(o => o.status === 'Cancelled').length,
    totalSpent: MOCK_ORDERS.filter(o => o.status === 'Completed').reduce((s, o) => s + o.price, 0),
  }), []);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <style jsx>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        .shimmer-bg {
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.05), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        .float-orb-1 { animation: float-orb 8s ease-in-out infinite; }
        .float-orb-2 { animation: float-orb 12s ease-in-out infinite reverse; }
      `}</style>

      {/* ========= HERO HEADER ========= */}
      <section className="relative pt-28 pb-8 px-4 overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-[120px] float-orb-1" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[150px] float-orb-2" />

        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 px-3 py-1 text-[11px] font-bold text-cyan-300 mb-3">
                <ReceiptText className="w-3.5 h-3.5" />
                <span>Quản lý đơn hàng</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Đơn hàng
                </span>
                {' '}của tôi
              </h1>
              <p className="text-sm text-white/40 mt-2 max-w-lg">
                Theo dõi trạng thái, lịch sử và chi tiết tất cả đơn hàng trên NexusMarket.
              </p>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-[11px] text-white/30 uppercase tracking-widest font-bold">Tổng chi tiêu</div>
              <div className="text-2xl font-black text-white mt-0.5">
                ${stats.totalSpent.toFixed(2)}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========= STATS STRIP ========= */}
      <section className="px-4 pb-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Tổng đơn', value: stats.total, icon: Package, gradient: 'from-cyan-500 to-blue-600', textColor: 'text-cyan-400' },
              { label: 'Hoàn tất', value: stats.completed, icon: CheckCircle2, gradient: 'from-emerald-500 to-green-600', textColor: 'text-emerald-400' },
              { label: 'Đang xử lý', value: stats.pending, icon: Clock, gradient: 'from-amber-500 to-orange-600', textColor: 'text-amber-400' },
              { label: 'Đã huỷ', value: stats.cancelled, icon: XCircle, gradient: 'from-red-500 to-rose-600', textColor: 'text-red-400' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-cyan-500/20 transition-all group overflow-hidden"
              >
                <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-md`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className={`text-2xl font-black ${stat.textColor}`}>{stat.value}</div>
                    <div className="text-[11px] text-white/35 font-medium">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= FILTER & SEARCH ========= */}
      <section className="px-4 pb-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between"
          >
            {/* Filter tabs */}
            <div className="flex gap-1.5 bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
              {FILTER_TABS.map(tab => {
                const isActive = filter === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-white/10 text-cyan-300 shadow-sm'
                        : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 rounded-lg bg-white/10 border border-cyan-500/20"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Tìm theo mã hoặc tên..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========= ORDERS LIST ========= */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            {filteredOrders.length === 0 ? (
              /* Empty State */
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-2xl" />
                  <div className="relative w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <ShoppingBag className="w-9 h-9 text-white/20" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white/60 mb-1">Không tìm thấy đơn hàng</h3>
                <p className="text-xs text-white/30 mb-6 max-w-xs text-center">
                  {search ? 'Thử thay đổi từ khoá tìm kiếm hoặc bộ lọc.' : 'Bạn chưa có đơn hàng nào. Hãy khám phá sản phẩm!'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/marketplace')}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/20"
                >
                  Khám phá sản phẩm <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3"
              >
                {filteredOrders.map((order, i) => {
                  const config = STATUS_CONFIG[order.status];
                  const IconComp = ICON_MAP[order.icon] || Package;
                  const isExpanded = expandedId === order.id;
                  const timeline = getTimeline(order.status, order.date);

                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      layout
                      className="group relative bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/15 transition-all overflow-hidden"
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-cyan-500/[0.02] via-transparent to-purple-500/[0.02] pointer-events-none" />

                      {/* Main row */}
                      <div
                        className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-5 cursor-pointer"
                        onClick={() => setExpandedId(isExpanded ? null : order.id)}
                      >
                        {/* Icon */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={`flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl ${config.bg} border ${config.border}`}>
                            <IconComp className={`w-5 h-5 ${config.color}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <span className="text-[11px] font-mono font-bold text-cyan-400/70 bg-cyan-500/8 rounded px-1.5 py-0.5">
                                {order.id}
                              </span>
                              <button
                                onClick={e => { e.stopPropagation(); handleCopyId(order.id); }}
                                className="text-white/20 hover:text-cyan-400 transition-colors"
                                title="Copy mã đơn"
                              >
                                {copiedId === order.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                            <h3 className="text-sm font-bold text-white truncate">{order.productName}</h3>
                          </div>
                        </div>

                        {/* Meta info */}
                        <div className="flex items-center gap-4 md:gap-6 text-xs flex-shrink-0">
                          <div className="flex items-center gap-1.5 text-white/35">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{order.date}</span>
                          </div>

                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} border ${config.border}`}>
                            {order.status === 'Pending' && (
                              <span className={`w-1.5 h-1.5 rounded-full ${config.dot} pulse-dot`} />
                            )}
                            <config.icon className={`w-3 h-3 ${config.color}`} />
                            <span className={`font-bold ${config.color}`}>
                              {ORDER_STATUS_LABELS[order.status]}
                            </span>
                          </div>

                          <div className="text-right min-w-[80px]">
                            <div className="text-base font-black text-white">${order.price.toFixed(2)}</div>
                          </div>

                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-white/30"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Expanded Detail */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 md:px-5 pb-5 pt-1">
                              <div className="border-t border-white/5 pt-5">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  {/* Timeline */}
                                  <div className="md:col-span-2">
                                    <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
                                      <FileText className="w-3.5 h-3.5" /> Tiến trình đơn hàng
                                    </h4>
                                    <div className="relative">
                                      {timeline.map((step, si) => {
                                        const isLast = si === timeline.length - 1;
                                        return (
                                          <div key={si} className="flex gap-3 pb-4 last:pb-0">
                                            {/* Timeline dots and line */}
                                            <div className="flex flex-col items-center">
                                              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                                step.done
                                                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20'
                                                  : 'bg-white/5 border border-white/10'
                                              }`}>
                                                <step.icon className={`w-3.5 h-3.5 ${step.done ? 'text-white' : 'text-white/25'}`} />
                                              </div>
                                              {!isLast && (
                                                <div className={`w-[2px] flex-1 mt-1 rounded-full ${
                                                  step.done ? 'bg-gradient-to-b from-cyan-500/50 to-cyan-500/10' : 'bg-white/5'
                                                }`} />
                                              )}
                                            </div>
                                            <div className="pb-3">
                                              <div className={`text-sm font-bold ${step.done ? 'text-white' : 'text-white/30'}`}>{step.label}</div>
                                              <div className="text-xs text-white/30 mt-0.5">{step.desc}</div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  {/* Order Summary Card */}
                                  <div>
                                    <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
                                      <CreditCard className="w-3.5 h-3.5" /> Chi tiết thanh toán
                                    </h4>
                                    <div className="bg-white/[0.03] rounded-xl border border-white/5 p-4 space-y-3">
                                      <div className="flex justify-between text-xs">
                                        <span className="text-white/35">Mã đơn</span>
                                        <span className="font-mono font-bold text-cyan-400">{order.id}</span>
                                      </div>
                                      <div className="flex justify-between text-xs">
                                        <span className="text-white/35">Ngày đặt</span>
                                        <span className="text-white/70 font-medium">{order.date}</span>
                                      </div>
                                      <div className="flex justify-between text-xs">
                                        <span className="text-white/35">Phương thức</span>
                                        <span className="text-white/70 font-medium">Visa •••• 4242</span>
                                      </div>
                                      <div className="border-t border-white/5 pt-3 flex justify-between">
                                        <span className="text-xs text-white/35">Tổng cộng</span>
                                        <span className="text-lg font-black text-white">${order.price.toFixed(2)}</span>
                                      </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 mt-3">
                                      {order.status === 'Completed' && (
                                        <motion.button
                                          whileHover={{ scale: 1.02 }}
                                          whileTap={{ scale: 0.98 }}
                                          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-cyan-500/15"
                                        >
                                          <Eye className="w-3.5 h-3.5" /> Xem sản phẩm
                                        </motion.button>
                                      )}
                                      {order.status === 'Pending' && (
                                        <motion.button
                                          whileHover={{ scale: 1.02 }}
                                          whileTap={{ scale: 0.98 }}
                                          className="flex items-center justify-center gap-2 w-full bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-2.5 rounded-xl font-bold text-xs"
                                        >
                                          <Clock className="w-3.5 h-3.5" /> Theo dõi đơn
                                        </motion.button>
                                      )}
                                      <button className="flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 text-white/50 hover:text-white/70 px-4 py-2 rounded-xl font-bold text-xs transition-colors">
                                        <ExternalLink className="w-3.5 h-3.5" /> Liên hệ hỗ trợ
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
