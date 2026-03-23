import React from 'react';
import { Package, DollarSign, Users, TrendingUp, Plus, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

export const SellerDashboard: React.FC = () => {
  const stats = [
    { label: 'Tổng doanh thu', value: '$12,840.00', change: '+12.5%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Tin đăng hoạt động', value: '24', change: '+2', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Tổng khách hàng', value: '842', change: '+48', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Tốc độ bán', value: '4.2/ngày', change: '-2%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const recentSales = [
    { id: '1', product: 'Bot tăng trưởng InstaAuto', customer: 'user_992', amount: '$149.00', status: 'Completed', date: '2 phút trước' },
    { id: '2', product: 'Tài khoản LinkedIn lâu năm', customer: 'marketing_pro', amount: '$25.00', status: 'Completed', date: '15 phút trước' },
    { id: '3', product: 'Backlink guest post SEO', customer: 'blog_owner', amount: '$89.99', status: 'Pending', date: '1 giờ trước' },
    { id: '4', product: 'Vàng WoW (500k)', customer: 'gamer_x', amount: '$39.99', status: 'Completed', date: '3 giờ trước' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bảng điều khiển người bán</h1>
          <p className="text-slate-500">Chào mừng trở lại, DigitalWizard. Đây là hoạt động hôm nay.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">
          <Plus className="h-5 w-5" /> Tạo tin đăng mới
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`rounded-xl ${stat.bg} p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={`flex items-center text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
                {stat.change.startsWith('+') ? <ArrowUpRight className="h-3 w-3 ml-1" /> : <ArrowDownRight className="h-3 w-3 ml-1" />}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</h3>
            <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Sales */}
        <div className="lg:col-span-2 rounded-2xl border border-primary/5 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-primary/5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Giao dịch gần đây</h2>
            <button className="text-sm font-bold text-primary hover:underline">Xem tất cả</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Sản phẩm</th>
                  <th className="px-6 py-4">Khách hàng</th>
                  <th className="px-6 py-4">Số tiền</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{sale.product}</span>
                        <span className="text-xs text-slate-500">{sale.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{sale.customer}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{sale.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        sale.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {sale.status === 'Completed' ? 'Hoàn tất' : 'Đang xử lý'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Tips */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Thao tác nhanh</h2>
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center gap-3 rounded-xl border border-primary/10 p-4 text-sm font-bold text-slate-700 hover:bg-primary/5 hover:border-primary/20 transition-all">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Plus className="h-4 w-4" />
                </div>
                Thêm sản phẩm mới
              </button>
              <button className="flex items-center gap-3 rounded-xl border border-primary/10 p-4 text-sm font-bold text-slate-700 hover:bg-primary/5 hover:border-primary/20 transition-all">
                <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                  <Users className="h-4 w-4" />
                </div>
                Quản lý khách hàng
              </button>
              <button className="flex items-center gap-3 rounded-xl border border-primary/10 p-4 text-sm font-bold text-slate-700 hover:bg-primary/5 hover:border-primary/20 transition-all">
                <div className="rounded-lg bg-green-100 p-2 text-green-600">
                  <DollarSign className="h-4 w-4" />
                </div>
                Rút tiền
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-xl">
            <h2 className="text-lg font-bold mb-2">Mẹo cho người bán</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Sản phẩm có mô tả chi tiết và hình ảnh chất lượng cao có tỷ lệ chuyển đổi cao hơn 40%. Hãy thử cập nhật tin đăng "InstaAuto" của bạn.
            </p>
            <button className="text-xs font-bold text-primary hover:underline">Tìm hiểu thêm</button>
          </div>
        </div>
      </div>
    </div>
  );
};
