import React, { useState } from 'react';
import { User, Lock, History, Package, Star, Edit, Mail, AtSign, LogOut, ShieldCheck, KeyRound, Brain, Cpu, Sparkles, Zap } from 'lucide-react';
import { OrdersContent } from './Orders';
import { PurchasedProductsContent } from './PurchasedProducts';

interface ProfileProps {
  onNavigate: (page: string) => void;
  defaultTab?: 'profile' | 'password' | 'orders' | 'purchased';
}

/* ========= CSS Animations ========= */
const PROFILE_CSS = `
@keyframes profileScanLine {
  0% { top: -10%; opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { top: 110%; opacity: 0; }
}
@keyframes avatarRingRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes profileFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
@keyframes neuralPulse {
  0%, 100% { opacity: 0.04; transform: scale(1); }
  50% { opacity: 0.08; transform: scale(1.02); }
}
@keyframes profileGlowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(34,211,238,0.08), 0 0 60px rgba(139,92,246,0.04); }
  50% { box-shadow: 0 0 30px rgba(34,211,238,0.15), 0 0 80px rgba(139,92,246,0.08); }
}
@keyframes dotFloat {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
  33% { transform: translateY(-15px) translateX(8px); opacity: 0.5; }
  66% { transform: translateY(-5px) translateX(-6px); opacity: 0.3; }
}
@keyframes statCountUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const NAV_ITEMS = [
  { id: 'profile', name: 'Thông tin cá nhân', icon: User },
  { id: 'password', name: 'Đổi mật khẩu', icon: Lock },
  { id: 'orders', name: 'Lịch sử đơn hàng', icon: History },
  { id: 'purchased', name: 'Sản phẩm đã mua', icon: Package },
];

const PARTICLES = [
  { top: '8%', left: '15%', size: 3, delay: 0 },
  { top: '22%', left: '85%', size: 4, delay: 1.3 },
  { top: '55%', left: '5%', size: 3, delay: 0.7 },
  { top: '75%', left: '90%', size: 4, delay: 2.1 },
  { top: '40%', left: '95%', size: 3, delay: 1.8 },
  { top: '90%', left: '20%', size: 3, delay: 0.4 },
];

export const Profile: React.FC<ProfileProps> = ({ onNavigate, defaultTab = 'profile' }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'orders' | 'purchased'>(defaultTab);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Inject profile CSS */}
      <style dangerouslySetInnerHTML={{ __html: PROFILE_CSS }} />

      {/* Background effects */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 20% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(34,211,238,0.05) 0%, transparent 50%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        animation: 'neuralPulse 6s ease-in-out infinite',
        background: 'radial-gradient(circle at 50% 30%, rgba(34,211,238,0.06) 0%, transparent 40%)',
      }} />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', top: p.top, left: p.left,
          width: p.size, height: p.size, borderRadius: '50%',
          backgroundColor: i % 2 === 0 ? '#22d3ee' : '#a78bfa',
          pointerEvents: 'none',
          animation: `dotFloat ${5 + i * 0.7}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}

      {/* Scan line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2,
        pointerEvents: 'none', zIndex: 5,
        background: 'linear-gradient(90deg, transparent 10%, rgba(34,211,238,0.25) 40%, rgba(139,92,246,0.3) 60%, transparent 90%)',
        animation: 'profileScanLine 6s ease-in-out infinite',
      }} />

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 pt-24">
        {/* Page header with AI badge */}
        <div className="flex items-center gap-3 mb-8">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 9999,
            background: 'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(139,92,246,0.1))',
            border: '1px solid rgba(34,211,238,0.15)',
          }}>
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-300">Hồ sơ AI · Bảo mật nâng cao</span>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* ===== SIDEBAR ===== */}
          <aside className="w-full shrink-0 md:w-72">
            <div className="flex flex-col gap-5">
              {/* Profile card with animated avatar ring */}
              <div
                className="relative rounded-2xl p-5 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  animation: 'profileGlowPulse 4s ease-in-out infinite',
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Animated ring around avatar */}
                  <div className="relative">
                    <div style={{
                      position: 'absolute', inset: -3,
                      borderRadius: '50%',
                      background: 'conic-gradient(from 0deg, #22d3ee, #8b5cf6, #ec4899, #22d3ee)',
                      animation: 'avatarRingRotate 4s linear infinite',
                    }} />
                    <div style={{
                      position: 'absolute', inset: -1,
                      borderRadius: '50%',
                      background: 'rgba(15,10,30,1)',
                    }} />
                    <div className="relative h-14 w-14 overflow-hidden rounded-full" style={{ border: '2px solid rgba(34,211,238,0.3)' }}>
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                        alt="Hồ sơ"
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-white leading-tight text-base">Alex Rivers</h3>
                    <span className="text-xs text-white/40 font-medium">Nhà giao dịch Pro</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(139,92,246,0.1))',
                          color: '#22d3ee',
                          border: '1px solid rgba(34,211,238,0.2)',
                        }}>
                        <Sparkles className="w-2.5 h-2.5" /> AI Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col gap-1.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = item.id === activeTab;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setActiveTab(item.id as typeof activeTab)}
                      className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 cursor-pointer"
                      style={isActive ? {
                        background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(139,92,246,0.08))',
                        border: '1px solid rgba(34,211,238,0.2)',
                        boxShadow: '0 0 20px rgba(34,211,238,0.08)',
                      } : {
                        background: 'transparent',
                        border: '1px solid transparent',
                      }}
                    >
                      <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-cyan-400' : 'text-white/30 group-hover:text-white/60'}`} />
                      <span className={`text-sm font-semibold transition-colors ${isActive ? 'text-cyan-300' : 'text-white/40 group-hover:text-white/70'}`}>
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Logout */}
              <button
                onClick={() => {
                  localStorage.removeItem('authToken');
                  onNavigate('login');
                }}
                className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-all cursor-pointer"
                style={{
                  background: 'transparent',
                  border: '1px solid transparent',
                }}
              >
                <LogOut className="w-5 h-5 text-red-400/50 group-hover:text-red-400 transition-colors" />
                <span className="text-sm font-semibold text-red-400/50 group-hover:text-red-400 transition-colors">Đăng xuất</span>
              </button>

              {/* AI Trust Score Card */}
              <div
                className="relative rounded-2xl p-5 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(34,211,238,0.08))',
                  border: '1px solid rgba(139,92,246,0.2)',
                }}
              >
                {/* Glow effect */}
                <div style={{
                  position: 'absolute', top: -20, right: -20, width: 80, height: 80,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)',
                  filter: 'blur(10px)',
                  pointerEvents: 'none',
                }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu className="w-4 h-4 text-violet-400" />
                    <p className="text-xs font-bold uppercase tracking-wider text-violet-300/80">AI Trust Score</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-white" style={{ animation: 'statCountUp 0.8s ease-out' }}>4.9</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-white/40">Dựa trên 128 giao dịch · AI đánh giá cao</p>

                  {/* Mini progress bars */}
                  <div className="mt-4 space-y-2">
                    {[
                      { label: 'Uy tín', pct: 98, color: '#22d3ee' },
                      { label: 'Tốc độ', pct: 92, color: '#a78bfa' },
                      { label: 'Hỗ trợ', pct: 95, color: '#34d399' },
                    ].map((bar) => (
                      <div key={bar.label}>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-white/40 font-medium">{bar.label}</span>
                          <span className="text-white/60 font-bold">{bar.pct}%</span>
                        </div>
                        <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <div className="h-full rounded-full transition-all duration-1000" style={{
                            width: `${bar.pct}%`,
                            background: `linear-gradient(90deg, ${bar.color}, ${bar.color}99)`,
                            boxShadow: `0 0 8px ${bar.color}40`,
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ===== MAIN CONTENT ===== */}
          <section className="flex-1">
            <div style={{ display: activeTab === 'orders' ? 'block' : 'none' }}>
              <OrdersContent />
            </div>
            <div style={{ display: activeTab === 'purchased' ? 'block' : 'none' }}>
              <PurchasedProductsContent />
            </div>
            <div style={{ display: activeTab === 'profile' || activeTab === 'password' ? 'block' : 'none' }}>
              <div
                className="rounded-2xl p-8 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {activeTab === 'profile' ? (
                  <>
                    {/* Header */}
                    <div className="mb-8 flex flex-col justify-between gap-4 pb-6 md:flex-row md:items-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div>
                        <h1 className="text-2xl font-black tracking-tight text-white">Thông tin cá nhân</h1>
                        <p className="text-white/35 mt-1 text-sm">Quản lý thông tin tài khoản và cài đặt hồ sơ.</p>
                      </div>
                      <div className="flex gap-3">
                        <button className="rounded-xl px-4 py-2 text-sm font-bold transition-all"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.6)',
                          }}>Huỷ</button>
                        <button className="rounded-xl px-6 py-2 text-sm font-bold text-white transition-all hover:scale-[1.02]"
                          style={{
                            background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
                            boxShadow: '0 0 20px rgba(34,211,238,0.2)',
                          }}>Lưu thay đổi</button>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {/* Profile Picture */}
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="relative group">
                          <div className="relative">
                            <div style={{
                              position: 'absolute', inset: -4,
                              borderRadius: 20,
                              background: 'conic-gradient(from 90deg, #22d3ee, #8b5cf6, #ec4899, #22d3ee)',
                              animation: 'avatarRingRotate 6s linear infinite',
                              opacity: 0.6,
                            }} />
                            <div style={{
                              position: 'absolute', inset: -2,
                              borderRadius: 18,
                              background: 'rgba(15,10,30,1)',
                            }} />
                            <div className="relative h-28 w-28 overflow-hidden rounded-2xl" style={{ border: '2px solid rgba(34,211,238,0.2)' }}>
                              <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                                alt="Ảnh hồ sơ"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                          <button
                            className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full text-white"
                            style={{
                              background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
                              boxShadow: '0 0 12px rgba(34,211,238,0.4)',
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h4 className="font-bold text-white">Ảnh hồ sơ</h4>
                          <p className="text-sm text-white/30">Tối thiểu 400x400px, PNG hoặc JPEG. Tối đa 2MB.</p>
                          <div className="mt-2 flex gap-3">
                            <button className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors">Tải ảnh mới</button>
                            <button className="text-xs font-bold text-red-400/60 hover:text-red-400 transition-colors">Xoá</button>
                          </div>
                        </div>
                      </div>

                      {/* Form Grid */}
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {[
                          { label: 'Tên', value: 'Alex', icon: null },
                          { label: 'Họ', value: 'Rivers', icon: null },
                          { label: 'Email', value: 'alex.rivers@example.com', icon: Mail },
                          { label: 'Tên người dùng', value: 'arivers_trades', icon: AtSign },
                        ].map((field) => (
                          <div key={field.label} className="space-y-2">
                            <label className="text-sm font-bold text-white/60">{field.label}</label>
                            <div className="relative">
                              {field.icon && <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />}
                              <input
                                type={field.label === 'Email' ? 'email' : 'text'}
                                defaultValue={field.value}
                                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none transition-all"
                                style={{
                                  paddingLeft: field.icon ? 40 : 16,
                                  background: 'rgba(255,255,255,0.04)',
                                  border: '1px solid rgba(255,255,255,0.08)',
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = 'rgba(34,211,238,0.3)';
                                  e.target.style.boxShadow = '0 0 20px rgba(34,211,238,0.08)';
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                                  e.target.style.boxShadow = 'none';
                                }}
                              />
                            </div>
                          </div>
                        ))}
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-bold text-white/60">Giới thiệu</label>
                          <textarea
                            placeholder="Giới thiệu đôi nét về bạn..."
                            rows={4}
                            className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none transition-all resize-none"
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.08)',
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = 'rgba(34,211,238,0.3)';
                              e.target.style.boxShadow = '0 0 20px rgba(34,211,238,0.08)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                      </div>

                      {/* Email Preferences */}
                      <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <h4 className="mb-4 text-lg font-bold text-white">Tuỳ chọn email</h4>
                        <div className="space-y-4">
                          {[
                            { title: 'Thông báo tin nhắn mới', desc: 'Nhận thông báo khi có người nhắn tin trực tiếp', on: true },
                            { title: 'Cảnh báo giá', desc: 'Cập nhật khi sản phẩm trong danh sách yêu thích thay đổi giá', on: false },
                          ].map((pref) => (
                            <div key={pref.title} className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-white/70">{pref.title}</span>
                                <span className="text-xs text-white/30">{pref.desc}</span>
                              </div>
                              <div
                                className="h-6 w-11 rounded-full p-1 cursor-pointer transition-all"
                                style={{
                                  background: pref.on
                                    ? 'linear-gradient(135deg, #22d3ee, #8b5cf6)'
                                    : 'rgba(255,255,255,0.08)',
                                }}
                              >
                                <div
                                  className="h-4 w-4 rounded-full bg-white transition-all"
                                  style={{ transform: pref.on ? 'translateX(20px)' : 'translateX(0)' }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Danger Zone */}
                      <div className="pt-8" style={{ borderTop: '1px solid rgba(239,68,68,0.1)' }}>
                        <h4 className="mb-4 text-lg font-bold text-red-400/80">Vùng nguy hiểm</h4>
                        <div
                          className="rounded-xl p-4 flex items-center justify-between"
                          style={{
                            background: 'rgba(239,68,68,0.04)',
                            border: '1px solid rgba(239,68,68,0.15)',
                          }}
                        >
                          <div>
                            <p className="text-sm font-bold text-white/80">Xoá tài khoản</p>
                            <p className="text-xs text-white/30">Xoá vĩnh viễn tài khoản và toàn bộ dữ liệu. Không thể hoàn tác.</p>
                          </div>
                          <button
                            className="rounded-lg px-4 py-2 text-xs font-bold text-white transition-all hover:scale-105"
                            style={{
                              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                              boxShadow: '0 0 12px rgba(239,68,68,0.2)',
                            }}
                          >Xoá tài khoản</button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Password Tab */}
                    <div className="mb-8 flex flex-col justify-between gap-4 pb-6 md:flex-row md:items-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div>
                        <h1 className="text-2xl font-black tracking-tight text-white">Đổi mật khẩu</h1>
                        <p className="text-white/35 mt-1 text-sm">Cập nhật mật khẩu để tăng cường bảo mật tài khoản.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                      <div className="space-y-6">
                        {/* Security notice */}
                        <div className="rounded-2xl p-5" style={{
                          background: 'linear-gradient(135deg, rgba(34,211,238,0.06), rgba(139,92,246,0.04))',
                          border: '1px solid rgba(34,211,238,0.12)',
                        }}>
                          <div className="flex items-start gap-3">
                            <ShieldCheck className="h-6 w-6 text-cyan-400" />
                            <div>
                              <p className="text-sm font-bold text-white">Lưu ý bảo mật</p>
                              <p className="text-xs text-white/35 mt-1">
                                Mật khẩu nên có tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Password fields */}
                        <div className="space-y-5">
                          {[
                            { label: 'Mật khẩu hiện tại', placeholder: 'Nhập mật khẩu hiện tại', show: showCurrentPassword, toggle: () => setShowCurrentPassword(p => !p) },
                            { label: 'Mật khẩu mới', placeholder: 'Nhập mật khẩu mới', show: showNewPassword, toggle: () => setShowNewPassword(p => !p), hints: true },
                            { label: 'Xác nhận mật khẩu mới', placeholder: 'Nhập lại mật khẩu mới', show: showConfirmPassword, toggle: () => setShowConfirmPassword(p => !p) },
                          ].map((field) => (
                            <div key={field.label} className="space-y-2">
                              <label className="text-sm font-bold text-white/60">{field.label}</label>
                              <div className="relative">
                                <input
                                  type={field.show ? 'text' : 'password'}
                                  placeholder={field.placeholder}
                                  className="w-full rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none transition-all"
                                  style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                  }}
                                  onFocus={(e) => {
                                    e.target.style.borderColor = 'rgba(34,211,238,0.3)';
                                    e.target.style.boxShadow = '0 0 20px rgba(34,211,238,0.08)';
                                  }}
                                  onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                                    e.target.style.boxShadow = 'none';
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={field.toggle}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                                >
                                  <KeyRound className="h-5 w-5" />
                                </button>
                              </div>
                              {field.hints && (
                                <div className="flex flex-wrap gap-2 text-xs">
                                  {['Tối thiểu 8 ký tự', 'Chữ hoa & thường', 'Số', 'Ký tự đặc biệt'].map(hint => (
                                    <span key={hint} className="rounded-full px-3 py-1" style={{
                                      background: 'rgba(255,255,255,0.04)',
                                      color: 'rgba(255,255,255,0.35)',
                                      border: '1px solid rgba(255,255,255,0.06)',
                                    }}>{hint}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                          <button className="rounded-xl px-5 py-2.5 text-sm font-bold transition-all" style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.5)',
                          }}>Huỷ</button>
                          <button className="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.02]" style={{
                            background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
                            boxShadow: '0 0 20px rgba(34,211,238,0.2)',
                          }}>Cập nhật mật khẩu</button>
                        </div>
                      </div>

                      {/* Right column */}
                      <div className="space-y-4">
                        <div className="rounded-2xl p-6" style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}>
                          <h3 className="text-base font-bold text-white mb-4">Thiết bị đăng nhập gần đây</h3>
                          <div className="space-y-4">
                            {[
                              { device: 'Chrome trên Windows', location: 'Hà Nội, Việt Nam', time: '2 giờ trước' },
                              { device: 'Safari trên iPhone', location: 'TP. Hồ Chí Minh, Việt Nam', time: 'Hôm qua' },
                              { device: 'Edge trên Windows', location: 'Đà Nẵng, Việt Nam', time: '3 ngày trước' },
                            ].map((session) => (
                              <div key={session.device} className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{
                                  background: 'rgba(34,211,238,0.08)',
                                  border: '1px solid rgba(34,211,238,0.12)',
                                }}>
                                  <Lock className="h-5 w-5 text-cyan-400/60" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-white/80">{session.device}</p>
                                  <p className="text-xs text-white/30">{session.location}</p>
                                </div>
                                <span className="text-xs text-white/25">{session.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-2xl p-5" style={{
                          background: 'rgba(245,158,11,0.05)',
                          border: '1px solid rgba(245,158,11,0.15)',
                        }}>
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-amber-400" />
                            <p className="text-sm font-bold text-amber-300/80">Gợi ý bảo mật AI</p>
                          </div>
                          <p className="text-xs text-amber-300/50">
                            Bật xác thực 2 lớp để tăng độ an toàn. AI phát hiện tài khoản của bạn chưa bật 2FA.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
