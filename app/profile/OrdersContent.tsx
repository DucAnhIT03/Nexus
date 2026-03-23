'use client';

import React from 'react';
import { Download, ChevronLeft, ChevronRight, CreditCard, Sword, Gem, RefreshCcw } from 'lucide-react';
import { MOCK_ORDERS } from '../lib/constants';
import { ORDER_STATUS_LABELS } from '../lib/types';

const ICON_MAP: Record<string, any> = {
  Coins: CreditCard,
  Sword: Sword,
  Gem: Gem,
  RefreshCcw: RefreshCcw
};

export const OrdersContent: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm border border-primary/5">
      <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-slate-900 text-2xl font-black tracking-tight">Lịch sử đơn hàng</h1>
          <p className="text-slate-500 text-sm">Quản lý và theo dõi các giao dịch tài sản số của bạn.</p>
        </div>
        <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">
          <Download className="mr-2 w-4 h-4" /> Xuất CSV
        </button>
      </div>

      <div className="mb-6">
        <div className="flex border-b border-slate-200 gap-8 overflow-x-auto no-scrollbar">
          {['Tất cả', 'Hoàn tất', 'Đang xử lý', 'Đã huỷ'].map((tab, i) => (
            <button key={tab} className={`flex flex-col items-center justify-center border-b-2 pb-4 pt-2 whitespace-nowrap text-sm font-bold tracking-wide transition-colors ${i === 0 ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-primary'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Mã đơn</th>
                <th className="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Tên sản phẩm</th>
                <th className="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Ngày</th>
                <th className="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ORDERS.map((order) => {
                const Icon = ICON_MAP[order.icon] || CreditCard;
                return (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5"><span className="font-mono text-sm font-semibold text-primary">#{order.id}</span></td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center"><Icon className="text-primary w-4 h-4" /></div>
                        <span className="text-slate-900 font-medium text-sm">{order.productName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-500 text-sm">{order.date}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          order.status === 'Completed' ? 'bg-green-500' :
                          order.status === 'Pending' ? 'bg-amber-500' : 'bg-slate-400'
                        }`} />
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-primary hover:text-primary/70 font-bold text-sm transition-colors">Xem chi tiết</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <p className="text-sm text-slate-500 hidden sm:block">Hiển thị 1-4 trên 48 đơn</p>
        <div className="flex items-center gap-2">
          <button className="flex w-10 h-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          <button className="text-sm font-bold flex w-10 h-10 items-center justify-center text-white rounded-lg bg-primary shadow-sm">1</button>
          <button className="text-sm font-semibold flex w-10 h-10 items-center justify-center text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">2</button>
          <button className="text-sm font-semibold flex w-10 h-10 items-center justify-center text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">3</button>
          <span className="text-sm font-semibold flex w-10 h-10 items-center justify-center text-slate-400">...</span>
          <button className="flex w-10 h-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
};
