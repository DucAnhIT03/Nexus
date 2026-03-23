'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Store, User, CreditCard, ShieldCheck, ArrowRight, ArrowLeft,
  CheckCircle, Upload, Camera, MapPin, Phone, Mail, Globe,
  FileText, Sparkles, Zap, TrendingUp, DollarSign, Package,
  Users, Star, BadgeCheck, Rocket, ChevronRight, Eye, EyeOff,
  Building2, Hash, Landmark, CircleDollarSign
} from 'lucide-react';

const CSS = `
@keyframes neuralPulse1{0%,100%{opacity:.04;transform:scale(1)}50%{opacity:.12;transform:scale(1.15)}}
@keyframes neuralPulse2{0%,100%{opacity:.03;transform:scale(1.1)}50%{opacity:.09;transform:scale(.9)}}
@keyframes orbFloat1{0%{transform:translate(0,0)}25%{transform:translate(40px,-30px)}50%{transform:translate(-20px,-60px)}75%{transform:translate(-40px,-20px)}100%{transform:translate(0,0)}}
@keyframes orbFloat2{0%{transform:translate(0,0)}33%{transform:translate(-50px,30px)}66%{transform:translate(30px,50px)}100%{transform:translate(0,0)}}
@keyframes scanBeam{0%{top:-10%;opacity:0}5%{opacity:.6}50%{opacity:.4}95%{opacity:.6}100%{top:110%;opacity:0}}
@keyframes ringOrbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes glowBreathe{0%,100%{box-shadow:0 0 40px rgba(139,92,246,.08),0 0 120px rgba(34,211,238,.04)}50%{box-shadow:0 0 60px rgba(139,92,246,.16),0 0 150px rgba(34,211,238,.08)}}
@keyframes iconFloat{0%,100%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-6px) rotate(2deg)}50%{transform:translateY(-10px) rotate(0deg)}75%{transform:translateY(-4px) rotate(-2deg)}}
@keyframes gridSlide{from{background-position:0 0}to{background-position:50px 50px}}
@keyframes borderFlow{0%{background-position:0% 0%}100%{background-position:200% 200%}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes dotPulse{0%,100%{transform:scale(1);opacity:.2}50%{transform:scale(2.5);opacity:.6}}
@keyframes confetti{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(600px) rotate(720deg);opacity:0}}
@keyframes successPulse{0%{transform:scale(0);opacity:0}50%{transform:scale(1.1);opacity:1}100%{transform:scale(1);opacity:1}}
@keyframes checkDraw{0%{stroke-dashoffset:30}100%{stroke-dashoffset:0}}

.seller-input{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);transition:all .3s cubic-bezier(.4,0,.2,1)}
.seller-input:focus{border-color:rgba(139,92,246,.35);box-shadow:0 0 0 3px rgba(139,92,246,.08),0 0 20px rgba(139,92,246,.06);background:rgba(255,255,255,.05)}
.seller-input::placeholder{color:rgba(255,255,255,.2)}
.seller-btn{background:linear-gradient(135deg,#8b5cf6,#0ea5e9,#ec4899);background-size:200% 200%;animation:borderFlow 3s ease infinite;transition:all .3s}
.seller-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(139,92,246,.25)}
.seller-btn:disabled{opacity:0.4;cursor:not-allowed;transform:none;box-shadow:none}
.fade-in{animation:fadeInUp .5s ease both}
.fd1{animation-delay:.04s}.fd2{animation-delay:.08s}.fd3{animation-delay:.12s}
.fd4{animation-delay:.16s}.fd5{animation-delay:.2s}.fd6{animation-delay:.24s}
`;

const STEPS = [
  { label: 'Thông tin cá nhân', icon: User },
  { label: 'Thông tin cửa hàng', icon: Store },
  { label: 'Xác minh & Thanh toán', icon: CreditCard },
];

const BENEFITS = [
  { icon: DollarSign, title: 'Hoa hồng thấp', desc: 'Chỉ 5% phí giao dịch', color: '#34d399', bg: 'rgba(52,211,153,.06)', bc: 'rgba(52,211,153,.1)' },
  { icon: Users, title: '50K+ khách hàng', desc: 'Tiếp cận thị trường lớn', color: '#a78bfa', bg: 'rgba(139,92,246,.06)', bc: 'rgba(139,92,246,.1)' },
  { icon: Zap, title: 'AI hỗ trợ', desc: 'Tối ưu doanh thu tự động', color: '#22d3ee', bg: 'rgba(34,211,238,.06)', bc: 'rgba(34,211,238,.1)' },
  { icon: ShieldCheck, title: 'Bảo vệ 360°', desc: 'An toàn giao dịch tuyệt đối', color: '#f59e0b', bg: 'rgba(245,158,11,.06)', bc: 'rgba(245,158,11,.1)' },
];

export default function SellerRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Step 1: Personal Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Step 2: Shop Info
  const [shopName, setShopName] = useState('');
  const [shopDesc, setShopDesc] = useState('');
  const [category, setCategory] = useState('');
  const [website, setWebsite] = useState('');

  // Step 3: Verification
  const [idNumber, setIdNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [agree, setAgree] = useState(false);

  const canNext = () => {
    if (step === 0) return fullName.trim() && email.trim() && phone.trim();
    if (step === 1) return shopName.trim() && shopDesc.trim() && category;
    if (step === 2) return idNumber.trim() && bankName.trim() && bankAccount.trim() && agree;
    return false;
  };

  const handleNext = () => {
    if (step < 2) setStep(s => s + 1);
    else setCompleted(true);
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
  };

  if (completed) {
    return (
      <div className="relative min-h-screen bg-[#050a18] flex items-center justify-center px-4 overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        {/* Background effects */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 40%,rgba(139,92,246,.1),transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: .025, backgroundImage: 'linear-gradient(rgba(139,92,246,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.4) 1px,transparent 1px)', backgroundSize: '60px 60px', animation: 'gridSlide 20s linear infinite', pointerEvents: 'none' }} />

        {/* Confetti */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: -20,
            left: `${Math.random() * 100}%`,
            width: 8 + Math.random() * 6,
            height: 8 + Math.random() * 6,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            background: ['#a78bfa', '#22d3ee', '#ec4899', '#34d399', '#f59e0b'][i % 5],
            animation: `confetti ${2 + Math.random() * 3}s ${Math.random() * 2}s ease-in forwards`,
            pointerEvents: 'none',
          }} />
        ))}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative z-10 text-center max-w-md"
        >
          <div className="mx-auto mb-6 relative" style={{ width: 100, height: 100 }}>
            <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', background: 'conic-gradient(from 0deg,#a78bfa,#22d3ee,#ec4899,#a78bfa)', animation: 'ringOrbit 3s linear infinite', opacity: .4, filter: 'blur(2px)' }} />
            <div style={{ position: 'absolute', inset: -2, borderRadius: '50%', background: '#050a18' }} />
            <div className="relative w-full h-full rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,rgba(52,211,153,.15),rgba(34,211,238,.1))', border: '1px solid rgba(52,211,153,.2)' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle className="w-12 h-12 text-emerald-400" style={{ filter: 'drop-shadow(0 0 15px rgba(52,211,153,.5))' }} />
              </motion.div>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-black text-white mb-2"
          >
            Đăng ký thành công!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-white/50 mb-8 leading-relaxed"
          >
            Chào mừng bạn đến NexusMarket! Hệ thống đang xác minh thông tin.
            Bạn sẽ nhận thông báo qua email trong 24 giờ.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3"
          >
            <button
              onClick={() => router.push('/seller-dashboard')}
              className="seller-btn w-full rounded-xl px-6 py-3.5 text-sm font-extrabold text-white flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" /> Đến bảng điều khiển
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full rounded-xl px-6 py-3 text-sm font-bold text-white/40 hover:text-white/60 transition-colors"
            >
              Quay về trang chủ
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050a18] flex items-center justify-center px-4 py-6 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Background effects */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 70% 25%,rgba(139,92,246,.07),transparent),radial-gradient(ellipse 70% 50% at 30% 75%,rgba(34,211,238,.05),transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, animation: 'neuralPulse1 8s ease-in-out infinite', background: 'radial-gradient(circle 400px at 60% 35%,rgba(139,92,246,.06),transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: .025, backgroundImage: 'linear-gradient(rgba(139,92,246,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.4) 1px,transparent 1px)', backgroundSize: '60px 60px', animation: 'gridSlide 20s linear infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,.08),transparent 70%)', filter: 'blur(40px)', animation: 'orbFloat1 15s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,211,238,.06),transparent 70%)', filter: 'blur(50px)', animation: 'orbFloat2 18s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, height: 2, zIndex: 5, pointerEvents: 'none', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,.15) 20%,rgba(34,211,238,.2) 50%,rgba(139,92,246,.15) 80%,transparent)', animation: 'scanBeam 8s ease-in-out infinite' }} />
      {[{ t: '10%', l: '12%', d: 0, c: '#a78bfa' }, { t: '30%', l: '88%', d: 2, c: '#22d3ee' }, { t: '70%', l: '8%', d: 4, c: '#8b5cf6' }, { t: '88%', l: '85%', d: 1.5, c: '#ec4899' }].map((d, i) => (
        <div key={i} style={{ position: 'absolute', top: d.t, left: d.l, width: 4, height: 4, borderRadius: '50%', background: d.c, pointerEvents: 'none', animation: `dotPulse ${3 + i * .5}s ease-in-out ${d.d}s infinite` }} />
      ))}

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[1060px] overflow-hidden rounded-[24px]" style={{ border: '1px solid rgba(255,255,255,.05)', animation: 'glowBreathe 5s ease-in-out infinite', backdropFilter: 'blur(20px)' }}>
        <div className="grid lg:grid-cols-[1fr_1.4fr]">

          {/* LEFT PANEL — Branding */}
          <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-8" style={{ background: 'linear-gradient(160deg,#0c0a20,#080d1f,#0a0f1e)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle 250px at 55% 30%,rgba(139,92,246,.1),transparent)', animation: 'neuralPulse1 6s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', inset: 0, opacity: .03, backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)', backgroundSize: '50px 50px', animation: 'gridSlide 25s linear infinite' }} />

            <div style={{ position: 'absolute', top: '14%', left: '50%', marginLeft: -80, width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(139,92,246,.08)', animation: 'ringOrbit 22s linear infinite', pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: -4, left: '50%', marginLeft: -4, width: 8, height: 8, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 15px 5px rgba(167,139,250,.4)' }} />
            </div>
            <div style={{ position: 'absolute', top: '14%', left: '50%', marginLeft: -100, width: 200, height: 200, borderRadius: '50%', border: '1px dashed rgba(34,211,238,.05)', animation: 'ringOrbit 30s linear reverse infinite', pointerEvents: 'none' }} />

            <div className="flex-1 flex items-center justify-center" style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ animation: 'iconFloat 5s ease-in-out infinite' }}>
                <div style={{ width: 90, height: 90, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,rgba(139,92,246,.12),rgba(34,211,238,.08))', border: '1px solid rgba(139,92,246,.15)', boxShadow: '0 0 50px rgba(139,92,246,.12)' }}>
                  <Store className="w-11 h-11 text-violet-400" style={{ filter: 'drop-shadow(0 0 8px rgba(139,92,246,.5))' }} />
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 9999, background: 'linear-gradient(135deg,rgba(139,92,246,.08),rgba(34,211,238,.05))', border: '1px solid rgba(139,92,246,.12)' }}>
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-[10px] font-extrabold text-violet-300 uppercase tracking-[.15em]">NexusMarket Seller</span>
              </div>
              <h1 className="mt-4 text-[28px] font-black tracking-tight leading-[1.2]">
                <span style={{ background: 'linear-gradient(135deg,#a78bfa,#22d3ee,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Trở thành</span>
                <br /><span className="text-white">Người bán</span>
              </h1>
              <p className="mt-2 text-[13px] text-white/50 leading-relaxed max-w-[280px] font-medium">
                Mở cửa hàng số · Tiếp cận 50K+ khách hàng · AI tối ưu doanh thu
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {BENEFITS.map(b => (
                  <div key={b.title} className="rounded-xl p-3" style={{ background: b.bg, border: `1px solid ${b.bc}` }}>
                    <b.icon className="mb-1" style={{ color: b.color, width: 16, height: 16, filter: `drop-shadow(0 0 4px ${b.color}50)` }} />
                    <p className="text-[11px] font-black text-white">{b.title}</p>
                    <p className="text-[9px] text-white/40 font-bold mt-0.5">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL — Form */}
          <div className="flex flex-col px-8 py-6 sm:px-10" style={{ background: 'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.005))' }}>
            {/* Header */}
            <div className="text-center fade-in mb-5">
              <div className="mx-auto relative" style={{ width: 48, height: 48 }}>
                <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'conic-gradient(from 0deg,#a78bfa,#22d3ee,#ec4899,#a78bfa)', animation: 'ringOrbit 3s linear infinite', opacity: .5, filter: 'blur(1px)' }} />
                <div style={{ position: 'absolute', inset: -1, borderRadius: '50%', background: '#080d1f' }} />
                <div className="relative flex items-center justify-center w-full h-full rounded-full" style={{ background: 'linear-gradient(135deg,rgba(139,92,246,.1),rgba(34,211,238,.08))', border: '1px solid rgba(139,92,246,.12)' }}>
                  <Store className="w-5 h-5 text-violet-400" style={{ filter: 'drop-shadow(0 0 6px rgba(139,92,246,.5))' }} />
                </div>
              </div>
              <h2 className="mt-3 text-xl font-black text-white tracking-tight">Đăng ký người bán</h2>
              <p className="mt-1 text-xs text-white/50 font-semibold">Hoàn thành 3 bước để mở cửa hàng</p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-1 mb-6 fade-in fd1">
              {STEPS.map((s, i) => {
                const isActive = i === step;
                const isDone = i < step;
                return (
                  <React.Fragment key={i}>
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center justify-center rounded-full transition-all duration-300"
                        style={{
                          width: 32, height: 32,
                          background: isDone ? 'linear-gradient(135deg,#34d399,#22d3ee)' : isActive ? 'linear-gradient(135deg,#8b5cf6,#22d3ee)' : 'rgba(255,255,255,.05)',
                          border: `1px solid ${isDone ? 'rgba(52,211,153,.3)' : isActive ? 'rgba(139,92,246,.3)' : 'rgba(255,255,255,.07)'}`,
                          boxShadow: isDone ? '0 0 12px rgba(52,211,153,.2)' : isActive ? '0 0 12px rgba(139,92,246,.2)' : 'none',
                        }}
                      >
                        {isDone ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <s.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/25'}`} />
                        )}
                      </div>
                      <span className={`text-[11px] font-bold hidden sm:inline ${isActive ? 'text-white' : isDone ? 'text-emerald-400/70' : 'text-white/25'}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-8 h-[2px] rounded-full mx-1" style={{
                        background: isDone ? 'linear-gradient(90deg,#34d399,#22d3ee)' : 'rgba(255,255,255,.07)',
                      }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Form Steps */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3.5"
                  >
                    <div>
                      <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">
                        <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> Họ và tên</span>
                      </label>
                      <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                        className="seller-input w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none"
                        placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">
                        <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> Email</span>
                      </label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                        className="seller-input w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none"
                        placeholder="seller@email.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">
                        <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> Số điện thoại</span>
                      </label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                        className="seller-input w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none"
                        placeholder="0912 345 678" />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">
                        <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Địa chỉ <span className="text-white/25 normal-case font-medium">(tuỳ chọn)</span></span>
                      </label>
                      <input type="text" value={address} onChange={e => setAddress(e.target.value)}
                        className="seller-input w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none"
                        placeholder="Thành phố, Quốc gia" />
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3.5"
                  >
                    <div>
                      <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">
                        <span className="flex items-center gap-1.5"><Store className="w-3 h-3" /> Tên cửa hàng</span>
                      </label>
                      <input type="text" value={shopName} onChange={e => setShopName(e.target.value)}
                        className="seller-input w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none"
                        placeholder="VD: DigitalWizard Store" />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">
                        <span className="flex items-center gap-1.5"><FileText className="w-3 h-3" /> Mô tả cửa hàng</span>
                      </label>
                      <textarea value={shopDesc} onChange={e => setShopDesc(e.target.value)}
                        className="seller-input w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none resize-none"
                        rows={3}
                        placeholder="Mô tả ngắn gọn về sản phẩm/dịch vụ bạn cung cấp..." />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">
                        <span className="flex items-center gap-1.5"><Package className="w-3 h-3" /> Danh mục chính</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { key: 'accounts', label: 'Tài khoản', icon: Users },
                          { key: 'tools', label: 'Công cụ', icon: Zap },
                          { key: 'services', label: 'Dịch vụ', icon: Star },
                          { key: 'software', label: 'Phần mềm', icon: Package },
                        ].map(cat => (
                          <button
                            key={cat.key}
                            type="button"
                            onClick={() => setCategory(cat.key)}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
                            style={{
                              background: category === cat.key ? 'linear-gradient(135deg,rgba(139,92,246,.12),rgba(34,211,238,.08))' : 'rgba(255,255,255,.03)',
                              border: `1px solid ${category === cat.key ? 'rgba(139,92,246,.3)' : 'rgba(255,255,255,.07)'}`,
                              color: category === cat.key ? '#a78bfa' : 'rgba(255,255,255,.4)',
                              boxShadow: category === cat.key ? '0 0 15px rgba(139,92,246,.08)' : 'none',
                            }}
                          >
                            <cat.icon className="w-3.5 h-3.5" />
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">
                        <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> Website <span className="text-white/25 normal-case font-medium">(tuỳ chọn)</span></span>
                      </label>
                      <input type="url" value={website} onChange={e => setWebsite(e.target.value)}
                        className="seller-input w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none"
                        placeholder="https://yourwebsite.com" />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3.5"
                  >
                    <div className="rounded-xl p-3 flex items-start gap-3" style={{ background: 'rgba(245,158,11,.05)', border: '1px solid rgba(245,158,11,.12)' }}>
                      <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" style={{ filter: 'drop-shadow(0 0 6px rgba(245,158,11,.4))' }} />
                      <div>
                        <p className="text-xs font-bold text-amber-300">Xác minh danh tính</p>
                        <p className="text-[11px] text-white/40 mt-0.5">Thông tin của bạn được bảo mật bởi mã hoá đầu-cuối AES-256.</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">
                        <span className="flex items-center gap-1.5"><Hash className="w-3 h-3" /> Số CCCD / Hộ chiếu</span>
                      </label>
                      <input type="text" value={idNumber} onChange={e => setIdNumber(e.target.value)}
                        className="seller-input w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none"
                        placeholder="VD: 001234567890" />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">
                        <span className="flex items-center gap-1.5"><Landmark className="w-3 h-3" /> Ngân hàng</span>
                      </label>
                      <input type="text" value={bankName} onChange={e => setBankName(e.target.value)}
                        className="seller-input w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none"
                        placeholder="VD: Vietcombank, TPBank..." />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">
                        <span className="flex items-center gap-1.5"><CircleDollarSign className="w-3 h-3" /> Số tài khoản</span>
                      </label>
                      <input type="text" value={bankAccount} onChange={e => setBankAccount(e.target.value)}
                        className="seller-input w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none"
                        placeholder="VD: 1234567890" />
                    </div>

                    {/* Agreement */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <div
                        className="relative w-9 h-5 rounded-full cursor-pointer flex-shrink-0 mt-0.5 transition-all duration-300"
                        style={{ background: agree ? 'linear-gradient(135deg,#8b5cf6,#22d3ee)' : 'rgba(255,255,255,.08)' }}
                        onClick={() => setAgree(a => !a)}
                      >
                        <div className="absolute top-[3px] h-3.5 w-3.5 rounded-full bg-white transition-all duration-300" style={{ left: agree ? 18 : 3, boxShadow: agree ? '0 0 8px rgba(139,92,246,.4)' : 'none' }} />
                      </div>
                      <span className="text-[11px] text-white/50 font-semibold leading-relaxed">
                        Tôi đồng ý với <a href="/terms" className="font-extrabold text-violet-400 hover:text-violet-300">Điều khoản người bán</a>,{' '}
                        <a href="/privacy" className="font-extrabold text-violet-400 hover:text-violet-300">Chính sách thanh toán</a> và{' '}
                        <a href="/seller-policy" className="font-extrabold text-violet-400 hover:text-violet-300">Quy định giao dịch</a>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 mt-6">
              {step > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-white/70 transition-colors"
                  style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}
                >
                  <ArrowLeft className="w-4 h-4" /> Quay lại
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canNext()}
                className="seller-btn flex-1 flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-extrabold text-white"
              >
                {step === 2 ? (
                  <><BadgeCheck className="w-4 h-4" /> Hoàn tất đăng ký</>
                ) : (
                  <>Tiếp tục <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>

            {/* Footer link */}
            <p className="text-center text-xs text-white/30 font-semibold mt-4">
              Đã có tài khoản người bán?{' '}
              <a href="/seller-dashboard" className="font-extrabold text-cyan-400 hover:text-cyan-300 transition-colors">Đăng nhập</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
