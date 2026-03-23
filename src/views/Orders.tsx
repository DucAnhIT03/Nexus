import React from 'react';
import { Download, ChevronLeft, ChevronRight, CreditCard, Sword, Gem, RefreshCcw, User, Lock, History, Package, LogOut, Star } from 'lucide-react';
import { MOCK_ORDERS } from '../constants';
import { ORDER_STATUS_LABELS } from '../types';

const ICON_MAP: Record<string, any> = {
  Coins: CreditCard,
  Sword: Sword,
  Gem: Gem,
  RefreshCcw: RefreshCcw
};

interface OrdersProps {
  onNavigate: (page: string) => void;
}

export const Orders: React.FC<OrdersProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto w-full max-w-7xl grow px-6 py-10">
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full shrink-0 md:w-72">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm border border-primary/5">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-primary/10 border-2 border-primary/20">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Hồ sơ" className="h-full w-full" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-900 leading-tight">Alex Rivers</h3>
                <span className="text-xs text-slate-500 font-medium">Nhà giao dịch Pro · Thành viên từ 2023</span>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              {[
                { id: 'profile', name: 'Thông tin cá nhân', icon: User },
                { id: 'password', name: 'Đổi mật khẩu', icon: Lock },
                { id: 'orders', name: 'Lịch sử đơn hàng', icon: History },
                { id: 'purchased', name: 'Sản phẩm đã mua', icon: Package },
              ].map((item) => {
                const isActive = item.id === 'orders';
                return (
                  <button key={item.name} onClick={() => { if (item.id !== 'orders') onNavigate(item.id === 'password' ? 'profile' : item.id); }}
                    className={`group flex items-center gap-3 rounded-lg px-4 py-3 transition-all cursor-pointer ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 hover:bg-primary hover:text-white'}`}>
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-semibold">{item.name}</span>
                  </button>
                );
              })}
            </nav>
            <button onClick={() => { localStorage.removeItem('authToken'); onNavigate('login'); }}
              className="group flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600 hover:bg-primary hover:text-white transition-all cursor-pointer">
              <LogOut className="w-5 h-5" /><span className="text-sm font-semibold">Đăng xuất</span>
            </button>
            <div className="mt-4 rounded-xl bg-gradient-to-br from-primary to-primary/80 p-5 text-white shadow-xl shadow-primary/30">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Đánh giá người bán</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-3xl font-black">4.9</span>
                <div className="flex text-yellow-300">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
              </div>
              <p className="mt-1 text-xs opacity-90">Dựa trên 128 giao dịch thành công</p>
            </div>
          </div>
        </aside>
        <section className="flex-1">
          <OrdersContent />
        </section>
      </div>
    </div>
  );
};

// Content-only version for embedding in Profile tabs
export const OrdersContent: React.FC = () => {
  return (
    <div className="rounded-2xl p-8 overflow-hidden" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
      border: '1px solid rgba(255,255,255,0.06)',
      backdropFilter: 'blur(16px)',
    }}>
      <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-2xl font-black tracking-tight">Lịch sử đơn hàng</h1>
          <p className="text-white/35 text-sm">Quản lý và theo dõi các giao dịch tài sản số của bạn.</p>
        </div>
        <button className="flex items-center justify-center rounded-xl h-10 px-4 text-white font-bold text-sm transition-all hover:scale-[1.02]" style={{
          background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
          boxShadow: '0 0 15px rgba(34,211,238,0.15)',
        }}>
          <Download className="mr-2 w-4 h-4" /> Xuất CSV
        </button>
      </div>

      <div className="mb-6">
        <div className="flex gap-8 overflow-x-auto no-scrollbar" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {['Tất cả', 'Hoàn tất', 'Đang xử lý', 'Đã huỷ'].map((tab, i) => (
            <button key={tab} className="flex flex-col items-center justify-center border-b-2 pb-4 pt-2 whitespace-nowrap text-sm font-bold tracking-wide transition-colors"
              style={{ borderColor: i === 0 ? '#22d3ee' : 'transparent', color: i === 0 ? '#22d3ee' : 'rgba(255,255,255,0.35)' }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                <th className="px-6 py-4 text-white/30 text-xs font-bold uppercase tracking-wider">Mã đơn</th>
                <th className="px-6 py-4 text-white/30 text-xs font-bold uppercase tracking-wider">Tên sản phẩm</th>
                <th className="px-6 py-4 text-white/30 text-xs font-bold uppercase tracking-wider">Ngày</th>
                <th className="px-6 py-4 text-white/30 text-xs font-bold uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-white/30 text-xs font-bold uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.map((order, idx) => {
                const Icon = ICON_MAP[order.icon] || CreditCard;
                return (
                  <tr key={order.id} style={{ borderTop: idx > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-5"><span className="font-mono text-sm font-semibold text-cyan-400">#{order.id}</span></td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.12)' }}>
                          <Icon className="text-cyan-400/60 w-4 h-4" />
                        </div>
                        <span className="text-white/80 font-medium text-sm">{order.productName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-white/35 text-sm">{order.date}</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold" style={{
                        background: order.status === 'Completed' ? 'rgba(52,211,153,0.1)' : order.status === 'Pending' ? 'rgba(251,191,36,0.1)' : 'rgba(255,255,255,0.05)',
                        color: order.status === 'Completed' ? '#34d399' : order.status === 'Pending' ? '#fbbf24' : 'rgba(255,255,255,0.4)',
                        border: `1px solid ${order.status === 'Completed' ? 'rgba(52,211,153,0.2)' : order.status === 'Pending' ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.08)'}`,
                      }}>
                        <span className="w-1.5 h-1.5 rounded-full mr-1.5" style={{
                          background: order.status === 'Completed' ? '#34d399' : order.status === 'Pending' ? '#fbbf24' : 'rgba(255,255,255,0.3)',
                        }} />
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-cyan-400/70 hover:text-cyan-300 font-bold text-sm transition-colors">Xem chi tiết</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <p className="text-sm text-white/30 hidden sm:block">Hiển thị 1-4 trên 48 đơn</p>
        <div className="flex items-center gap-2">
          <button className="flex w-10 h-10 items-center justify-center rounded-lg text-white/20 transition-colors" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="text-sm font-bold flex w-10 h-10 items-center justify-center text-white rounded-lg" style={{ background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)', boxShadow: '0 0 12px rgba(34,211,238,0.15)' }}>1</button>
          <button className="text-sm font-semibold flex w-10 h-10 items-center justify-center text-white/40 rounded-lg hover:bg-white/[0.04] transition-colors">2</button>
          <button className="text-sm font-semibold flex w-10 h-10 items-center justify-center text-white/40 rounded-lg hover:bg-white/[0.04] transition-colors">3</button>
          <span className="text-sm font-semibold flex w-10 h-10 items-center justify-center text-white/20">...</span>
          <button className="flex w-10 h-10 items-center justify-center rounded-lg text-white/30 hover:bg-white/[0.04] transition-colors" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
