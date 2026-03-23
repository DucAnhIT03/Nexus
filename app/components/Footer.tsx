'use client';

import React from 'react';
import Link from 'next/link';
import { Rocket, Globe, Mail, Rss, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-slate-950 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-2 text-cyan-400">
              <Rocket className="w-6 h-6 fill-cyan-500/10" />
              <span className="text-lg font-extrabold tracking-tight text-white">NexusMarket</span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-white/40">
              Chợ MMO hàng đầu thế giới cho tài sản số và công cụ tự động. Đồng hành cùng doanh nhân số từ năm 2018.
            </p>
            <div className="flex gap-4">
              {[Globe, Mail, Rss].map((Icon, i) => (
                <button key={i} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Chợ</h5>
            <ul className="flex flex-col gap-3 text-sm text-white/40">
              {['Tài khoản số', 'Tool SaaS', 'Dịch vụ marketing', 'Phần mềm tiếp thị liên kết'].map(item => (
                <li key={item}><a href="#" className="hover:text-cyan-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Hỗ trợ</h5>
            <ul className="flex flex-col gap-3 text-sm text-white/40">
              {['Trung tâm trợ giúp', 'An toàn & bảo mật', 'Điều khoản dịch vụ', 'Chính sách hoàn tiền'].map(item => (
                <li key={item}><a href="#" className="hover:text-cyan-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Trở thành người bán</h5>
            <p className="mb-4 text-sm text-white/40">Bắt đầu bán công cụ và dịch vụ của bạn ngay hôm nay để tiếp cận hàng nghìn người mua.</p>
            <Link
              href="/seller-dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-bold text-white hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg shadow-cyan-500/20"
            >
              Đăng ký ngay <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="mt-16 border-t border-white/5 pt-8 text-center text-sm text-white/30">
          <p>© 2024 NexusMarket. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
};
