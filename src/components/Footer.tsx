import React from 'react';
import { Rocket, Globe, Mail, Rss, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-primary/10 bg-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-2 text-primary">
              <Rocket className="w-6 h-6 fill-primary/10" />
              <span className="text-lg font-extrabold tracking-tight text-slate-900">NexusMarket</span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-500">
              Chợ MMO hàng đầu thế giới cho tài sản số và công cụ tự động. Đồng hành cùng doanh nhân số từ năm 2018.
            </p>
            <div className="flex gap-4">
              {[Globe, Mail, Rss].map((Icon, i) => (
                <button key={i} className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-900">Chợ</h5>
            <ul className="flex flex-col gap-3 text-sm text-slate-500">
              {['Tài khoản số', 'Tool SaaS', 'Dịch vụ marketing', 'Phần mềm tiếp thị liên kết'].map(item => (
                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-900">Hỗ trợ</h5>
            <ul className="flex flex-col gap-3 text-sm text-slate-500">
              {['Trung tâm trợ giúp', 'An toàn & bảo mật', 'Điều khoản dịch vụ', 'Chính sách hoàn tiền'].map(item => (
                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-900">Trở thành người bán</h5>
            <p className="mb-4 text-sm text-slate-500">Bắt đầu bán công cụ và dịch vụ của bạn ngay hôm nay để tiếp cận hàng nghìn người mua.</p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'seller-dashboard' }))}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-hover transition-all"
            >
              Đăng ký ngay <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-16 border-t border-primary/10 pt-8 text-center text-sm text-slate-500">
          <p>© 2024 NexusMarket. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
};
