import React from 'react';
import { motion } from 'motion/react';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import {
  Megaphone,
  Search,
  Palette,
  TrendingUp,
  Swords,
  Star,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Users,
  Zap,
  Bolt,
} from 'lucide-react';

interface ServicesProps {
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
  onNavigate: (page: string) => void;
}

const SERVICE_CATEGORIES = [
  {
    name: 'Boost & Leveling',
    description: 'Dịch vụ nâng cấp nhân vật, danh hiệu, thứ hạng trong game',
    icon: Swords,
    color: 'from-red-500 to-orange-500',
    bgLight: 'bg-red-50',
    textColor: 'text-red-600',
    count: '120+',
  },
  {
    name: 'SEO & Marketing',
    description: 'Tối ưu website, backlink, chiến dịch quảng cáo số',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600',
    count: '85+',
  },
  {
    name: 'Thiết kế & Sáng tạo',
    description: 'Logo, banner, video, nội dung sáng tạo chuyên nghiệp',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-600',
    count: '60+',
  },
  {
    name: 'Quảng cáo & Growth',
    description: 'Chạy ads, tăng trưởng kênh, tối ưu chuyển đổi',
    icon: Megaphone,
    color: 'from-green-500 to-emerald-500',
    bgLight: 'bg-green-50',
    textColor: 'text-green-600',
    count: '95+',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Chọn dịch vụ',
    description: 'Duyệt danh mục và chọn dịch vụ phù hợp với nhu cầu của bạn.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Đặt đơn hàng',
    description: 'Mô tả yêu cầu chi tiết và tiến hành thanh toán an toàn.',
    icon: CheckCircle2,
  },
  {
    step: '03',
    title: 'Nhà cung cấp xử lý',
    description: 'Nhà cung cấp bắt đầu làm việc. Theo dõi tiến độ trực tiếp.',
    icon: Zap,
  },
  {
    step: '04',
    title: 'Nhận kết quả',
    description: 'Xác nhận hoàn tất và đánh giá dịch vụ. Hỗ trợ bảo hành.',
    icon: Star,
  },
];

const TOP_PROVIDERS = [
  {
    name: 'LinkBuilderPro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LinkBuilderPro',
    specialty: 'SEO & Backlink',
    rating: 5.0,
    orders: 210,
    isPro: true,
  },
  {
    name: 'PvP_Kings',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PvPKings',
    specialty: 'Boost & PvP',
    rating: 5.0,
    orders: 89,
    isPro: true,
  },
  {
    name: 'SEO_Master_VN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SEOMaster',
    specialty: 'SEO tổng thể',
    rating: 4.8,
    orders: 156,
    isPro: true,
  },
  {
    name: 'Ads_Guru',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdsGuru',
    specialty: 'Quảng cáo số',
    rating: 4.9,
    orders: 312,
    isPro: true,
  },
  {
    name: 'DesignStudio',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DesignStudio',
    specialty: 'Thiết kế & Branding',
    rating: 5.0,
    orders: 87,
    isPro: true,
  },
];

export const Services: React.FC<ServicesProps> = ({
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  wishlist,
  onNavigate,
}) => {
  const serviceProducts = MOCK_PRODUCTS.filter((p) => p.category === 'Services');

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(138,36,235,0.25),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-300 backdrop-blur-sm border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                Hơn 360+ dịch vụ chuyên nghiệp
              </span>
              <h1 className="text-4xl font-extrabold leading-tight text-white lg:text-5xl xl:text-6xl">
                Dịch vụ MMO{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  chuyên nghiệp
                </span>
              </h1>
              <p className="max-w-lg text-lg text-slate-400 leading-relaxed">
                Kết nối với hàng trăm nhà cung cấp uy tín. Từ boost game, SEO website đến thiết kế
                thương hiệu – mọi dịch vụ bạn cần đều có ở đây.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('featured-services');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-xl bg-primary px-8 py-3.5 font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all"
                >
                  Khám phá dịch vụ
                </button>
                <button
                  onClick={() => onNavigate('seller-dashboard')}
                  className="rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 font-bold text-white backdrop-blur-sm hover:bg-white/10 transition-all"
                >
                  Trở thành nhà cung cấp
                </button>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '360+', label: 'Dịch vụ', icon: Bolt, color: 'from-purple-500 to-purple-600' },
                { value: '12K+', label: 'Khách hàng', icon: Users, color: 'from-blue-500 to-blue-600' },
                { value: '99.2%', label: 'Hài lòng', icon: Star, color: 'from-amber-500 to-orange-500' },
                { value: '< 15p', label: 'Phản hồi', icon: Clock, color: 'from-green-500 to-emerald-500' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 transition-all"
                >
                  <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${stat.color} p-2.5 text-white`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Danh mục dịch vụ</h2>
          <p className="mt-3 text-slate-500">Chọn lĩnh vực bạn cần và tìm nhà cung cấp phù hợp</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group cursor-pointer rounded-2xl border border-primary/5 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:border-primary/20"
            >
              <div
                className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${cat.color} p-3 text-white shadow-lg`}
              >
                <cat.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-1 text-lg font-bold text-slate-900">{cat.name}</h3>
              <p className="mb-4 text-sm text-slate-500 leading-relaxed">{cat.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${cat.textColor} ${cat.bgLight} px-2.5 py-1 rounded-full`}>
                  {cat.count} dịch vụ
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section id="featured-services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Dịch vụ nổi bật</h2>
            <p className="mt-3 text-slate-500">Các dịch vụ được đánh giá cao nhất bởi cộng đồng</p>
          </div>
          <button
            onClick={() => onNavigate('marketplace')}
            className="hidden sm:flex items-center gap-1 text-sm font-bold text-primary hover:underline"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceProducts.slice(0, 6).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlist.some((p) => p.id === product.id)}
            />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <button
            onClick={() => onNavigate('marketplace')}
            className="text-sm font-bold text-primary hover:underline"
          >
            Xem tất cả dịch vụ →
          </button>
        </div>
      </section>

      {/* How it Works / Process */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Quy trình đặt dịch vụ</h2>
            <p className="mt-3 text-slate-500">4 bước đơn giản để nhận dịch vụ chất lượng cao</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative"
              >
                {/* Connector line */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="absolute top-12 left-[calc(50%+40px)] hidden lg:block h-px w-[calc(100%-80px)] bg-gradient-to-r from-primary/30 to-primary/10" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white border-2 border-primary/10 shadow-lg shadow-primary/5">
                      <item.icon className="h-10 w-10 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-lg shadow-primary/30">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-[240px]">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Providers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Nhà cung cấp hàng đầu</h2>
          <p className="mt-3 text-slate-500">Đội ngũ được xác minh với hàng trăm giao dịch thành công</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {TOP_PROVIDERS.map((provider, i) => (
            <motion.div
              key={provider.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center rounded-2xl border border-primary/5 bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer"
            >
              <div className="relative mb-3">
                <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-primary/10 bg-primary/5">
                  <img src={provider.avatar} alt={provider.name} className="h-full w-full object-cover" />
                </div>
                {provider.isPro && (
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white border-2 border-white">
                    <CheckCircle2 className="h-3.5 w-3.5 fill-current" />
                  </div>
                )}
              </div>
              <h4 className="text-sm font-bold text-slate-900 text-center">{provider.name}</h4>
              <p className="text-[11px] text-slate-500 mb-3">{provider.specialty}</p>
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs font-bold">{provider.rating}</span>
              </div>
              <span className="text-[10px] text-slate-400">{provider.orders} đơn hoàn tất</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: 'Thanh toán an toàn',
              desc: 'Tiền được giữ an toàn bởi NexusGuard cho đến khi bạn xác nhận hài lòng.',
              color: 'text-green-600',
              bg: 'bg-green-50',
            },
            {
              icon: Clock,
              title: 'Giao hàng nhanh chóng',
              desc: 'Phần lớn dịch vụ được hoàn thành trong vòng 24 giờ. Hỗ trợ 24/7.',
              color: 'text-blue-600',
              bg: 'bg-blue-50',
            },
            {
              icon: Star,
              title: 'Đánh giá minh bạch',
              desc: 'Hệ thống đánh giá thật từ người mua. Chỉ có nhà cung cấp chất lượng.',
              color: 'text-amber-600',
              bg: 'bg-amber-50',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-primary/5 bg-white p-6 shadow-sm"
            >
              <div className={`rounded-xl ${item.bg} p-3 ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{item.title}</h4>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-purple-600 to-pink-500 p-10 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -top-8 -left-8 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-xl">
              <h2 className="text-3xl font-extrabold text-white lg:text-4xl">
                Bạn có kỹ năng? Bắt đầu kiếm tiền ngay
              </h2>
              <p className="mt-4 text-lg text-white/80 leading-relaxed">
                Tham gia cộng đồng hơn 500 nhà cung cấp dịch vụ trên NexusMarket. Đặt giá, quản lý
                đơn hàng và nhận thanh toán nhanh chóng.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => onNavigate('seller-dashboard')}
                className="rounded-xl bg-white px-8 py-4 text-center font-bold text-primary shadow-xl hover:bg-white/90 transition-all"
              >
                Đăng ký ngay
              </button>
              <button className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-center font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-all">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
