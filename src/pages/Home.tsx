import React from 'react';
import { motion } from 'motion/react';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { Users, Wrench, Handshake, Code, School, ArrowRight } from 'lucide-react';

interface HomeProps {
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
  onNavigate: (page: string) => void;
}

const CATEGORIES = [
  { name: 'Tài khoản', sub: 'Lâu năm & số lượng lớn', icon: Users },
  { name: 'Công cụ', sub: 'SEO & Marketing', icon: Wrench },
  { name: 'Dịch vụ', sub: 'Theo yêu cầu', icon: Handshake },
  { name: 'Phần mềm', sub: 'Script tự động', icon: Code },
  { name: 'Tài khoản AI', sub: 'Học chiến lược', icon: School },
];

export const Home: React.FC<HomeProps> = ({ onAddToCart, onViewDetails, onToggleWishlist, wishlist, onNavigate }) => {
  return (
    <div className="space-y-12 pb-12">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary/10 p-8 lg:p-16">
          <div className="relative z-10 flex flex-col gap-6 lg:max-w-xl">
            <span className="inline-flex w-fit rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Ưu đãi mùa xuân 2024
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 lg:text-6xl leading-tight">
              Tăng tốc đế chế số
            </h2>
            <p className="text-lg text-slate-600">
              Giảm đến 50% cho công cụ tự động, script SEO và tài khoản lâu năm số lượng lớn. Ưu đãi có hạn.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('marketplace')}
                className="rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover transition-all"
              >
                Khám phá Chợ
              </button>
              <button className="rounded-xl border border-primary/20 bg-white/50 px-8 py-3 font-bold text-primary backdrop-blur-sm hover:bg-white/80 transition-all">
                Trở thành người bán
              </button>
            </div>
          </div>

          <div className="absolute right-[-10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/30 to-purple-400/20 blur-3xl lg:right-0"></div>

          <div className="absolute bottom-4 right-8 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-96 w-96 rounded-2xl bg-cover bg-center shadow-2xl border-4 border-white/20"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2064&auto=format&fit=crop')" }}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="mb-8 text-2xl font-bold text-slate-900">Duyệt theo danh mục</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('marketplace')}
              className="group flex flex-col items-center justify-center rounded-2xl border border-primary/5 bg-white p-6 text-center shadow-sm transition-all hover:border-primary/20 hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <cat.icon className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-900">{cat.name}</h4>
              <p className="text-sm text-slate-500">{cat.sub}</p>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-900">Sản phẩm nổi bật</h3>
          <button
            onClick={() => onNavigate('marketplace')}
            className="flex items-center gap-1 text-sm font-bold text-primary hover:underline"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlist.some(p => p.id === product.id)}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 rounded-3xl bg-slate-900 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div>
            <h3 className="mb-4 text-3xl font-bold text-white">Tham gia 50k+ marketer số</h3>
            <p className="text-slate-400">Nhận cập nhật hàng tuần về công cụ mới, chiến lược mới và mã giảm giá.</p>
          </div>
          <form className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-md" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email tốt nhất của bạn"
              className="flex-1 rounded-xl border-none bg-white/10 p-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50"
            />
            <button className="rounded-xl bg-primary px-6 py-3 font-bold text-white hover:bg-primary-hover transition-all">
              Đăng ký
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
