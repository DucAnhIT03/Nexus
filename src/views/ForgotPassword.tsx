import React, { useState } from 'react';
import { Mail, ArrowLeft, Sparkles, Shield, CheckCircle, KeyRound, Fingerprint, RefreshCcw } from 'lucide-react';

const CSS = `
@keyframes neuralPulse1{0%,100%{opacity:.04;transform:scale(1)}50%{opacity:.12;transform:scale(1.15)}}
@keyframes neuralPulse2{0%,100%{opacity:.03;transform:scale(1.1)}50%{opacity:.09;transform:scale(.9)}}
@keyframes orbFloat1{0%{transform:translate(0,0)}25%{transform:translate(30px,-25px)}50%{transform:translate(-15px,-45px)}75%{transform:translate(-30px,-15px)}100%{transform:translate(0,0)}}
@keyframes orbFloat2{0%{transform:translate(0,0)}33%{transform:translate(-40px,25px)}66%{transform:translate(25px,40px)}100%{transform:translate(0,0)}}
@keyframes scanBeam{0%{top:-10%;opacity:0}5%{opacity:.6}50%{opacity:.4}95%{opacity:.6}100%{top:110%;opacity:0}}
@keyframes ringOrbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes glowBreathe{0%,100%{box-shadow:0 0 40px rgba(34,211,238,.08),0 0 120px rgba(139,92,246,.04)}50%{box-shadow:0 0 60px rgba(34,211,238,.16),0 0 150px rgba(139,92,246,.08)}}
@keyframes gridSlide{from{background-position:0 0}to{background-position:50px 50px}}
@keyframes borderFlow{0%{background-position:0% 0%}100%{background-position:200% 200%}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes dotPulse{0%,100%{transform:scale(1);opacity:.2}50%{transform:scale(2.5);opacity:.6}}
@keyframes successRing{0%{box-shadow:0 0 0 0 rgba(52,211,153,.25)}50%{box-shadow:0 0 0 20px rgba(52,211,153,0)}100%{box-shadow:0 0 0 0 rgba(52,211,153,0)}}
@keyframes checkIn{from{transform:scale(0) rotate(-45deg);opacity:0}to{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes stepSlide{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}

.auth-input{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);transition:all .3s cubic-bezier(.4,0,.2,1)}
.auth-input:focus{border-color:rgba(34,211,238,.35);box-shadow:0 0 0 3px rgba(34,211,238,.08),0 0 20px rgba(34,211,238,.06);background:rgba(255,255,255,.05)}
.auth-input::placeholder{color:rgba(255,255,255,.2)}
.auth-btn{background:linear-gradient(135deg,#0ea5e9,#8b5cf6,#ec4899);background-size:200% 200%;animation:borderFlow 3s ease infinite;transition:all .3s}
.auth-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(34,211,238,.25)}
.fade-in{animation:fadeInUp .5s ease both}
.fd1{animation-delay:.1s}.fd2{animation-delay:.2s}.fd3{animation-delay:.3s}.fd4{animation-delay:.4s}
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050a18] flex items-center justify-center px-4 py-6 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 60% at 40% 30%,rgba(34,211,238,.06),transparent),radial-gradient(ellipse 70% 50% at 60% 70%,rgba(139,92,246,.05),transparent)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',inset:0,animation:'neuralPulse1 8s ease-in-out infinite',background:'radial-gradient(circle 400px at 45% 40%,rgba(34,211,238,.05),transparent)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',inset:0,opacity:.025,backgroundImage:'linear-gradient(rgba(34,211,238,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.4) 1px,transparent 1px)',backgroundSize:'60px 60px',animation:'gridSlide 20s linear infinite',pointerEvents:'none' }} />
      <div style={{ position:'absolute',top:'25%',left:'15%',width:180,height:180,borderRadius:'50%',background:'radial-gradient(circle,rgba(34,211,238,.07),transparent 70%)',filter:'blur(40px)',animation:'orbFloat1 14s ease-in-out infinite',pointerEvents:'none' }} />
      <div style={{ position:'absolute',bottom:'20%',right:'10%',width:220,height:220,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,.06),transparent 70%)',filter:'blur(45px)',animation:'orbFloat2 16s ease-in-out infinite',pointerEvents:'none' }} />
      <div style={{ position:'absolute',left:0,right:0,height:2,zIndex:5,pointerEvents:'none',background:'linear-gradient(90deg,transparent,rgba(34,211,238,.15) 20%,rgba(139,92,246,.2) 50%,rgba(34,211,238,.15) 80%,transparent)',animation:'scanBeam 8s ease-in-out infinite' }} />
      {[{t:'15%',l:'18%',d:0,c:'#22d3ee'},{t:'30%',l:'82%',d:2,c:'#a78bfa'},{t:'70%',l:'12%',d:3.5,c:'#8b5cf6'},{t:'85%',l:'78%',d:1,c:'#ec4899'}].map((d,i)=>(
        <div key={i} style={{ position:'absolute',top:d.t,left:d.l,width:4,height:4,borderRadius:'50%',background:d.c,pointerEvents:'none',animation:`dotPulse ${3+i*.5}s ease-in-out ${d.d}s infinite` }} />
      ))}

      {/* Card — compact */}
      <div className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-[24px]" style={{ border:'1px solid rgba(255,255,255,.05)',animation:'glowBreathe 5s ease-in-out infinite',backdropFilter:'blur(20px)' }}>
        <div className="px-8 py-8 sm:px-10" style={{ background:'linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.005))' }}>

          {!sent ? (
            <>
              <div className="text-center fade-in">
                <div className="mx-auto relative" style={{ width:60,height:60 }}>
                  <div style={{ position:'absolute',inset:-4,borderRadius:'50%',background:'conic-gradient(from 0deg,#22d3ee,#8b5cf6,#ec4899,#22d3ee)',animation:'ringOrbit 3s linear infinite',opacity:.4,filter:'blur(2px)' }} />
                  <div style={{ position:'absolute',inset:-1,borderRadius:'50%',background:'#080d1f' }} />
                  <div className="relative flex items-center justify-center w-full h-full rounded-full" style={{ background:'linear-gradient(135deg,rgba(34,211,238,.1),rgba(139,92,246,.06))',border:'1px solid rgba(34,211,238,.12)',boxShadow:'0 0 40px rgba(34,211,238,.08)' }}>
                    <KeyRound className="w-7 h-7 text-cyan-400" style={{ filter:'drop-shadow(0 0 8px rgba(34,211,238,.5))' }} />
                  </div>
                </div>
                <h2 className="mt-5 text-2xl font-black text-white tracking-tight">Quên mật khẩu</h2>
                <p className="mt-1.5 text-sm text-white/50 font-semibold leading-relaxed max-w-[280px] mx-auto">
                  Nhập email đã đăng ký, AI sẽ gửi liên kết đặt lại ngay lập tức.
                </p>
              </div>

              <div className="mt-5 rounded-xl p-3.5 flex items-start gap-3 fade-in fd1" style={{ background:'linear-gradient(135deg,rgba(34,211,238,.04),rgba(139,92,246,.02))',border:'1px solid rgba(34,211,238,.08)' }}>
                <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" style={{ filter:'drop-shadow(0 0 4px rgba(34,211,238,.4))' }} />
                <div>
                  <p className="text-xs font-extrabold text-cyan-300">Bảo mật AI</p>
                  <p className="text-[11px] text-white/40 mt-0.5 font-semibold">Link hết hạn sau 15 phút, chỉ dùng được 1 lần.</p>
                </div>
              </div>

              <form onSubmit={e=>{e.preventDefault();setSent(true)}} className="mt-5 space-y-4">
                <div className="fade-in fd2">
                  <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 mt-[1px]" style={{ width:16,height:16 }} />
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                      className="auth-input w-full rounded-xl pl-11 pr-4 py-3 text-sm font-semibold text-white focus:outline-none" placeholder="name@example.com" required />
                  </div>
                </div>

                <button type="submit" className="auth-btn w-full rounded-xl px-4 py-3 text-sm font-extrabold text-white flex items-center justify-center gap-2 fade-in fd3">
                  <Sparkles className="w-4 h-4" /> Gửi liên kết đặt lại
                </button>

                <div className="flex items-center justify-center gap-2 fade-in fd3">
                  <Fingerprint className="w-3.5 h-3.5 text-cyan-500/40" />
                  <span className="text-[10px] text-white/30 font-bold tracking-wide">Xác minh bởi AI · Mã hóa AES-256</span>
                </div>

                <a href="/login" className="flex items-center justify-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors font-extrabold fade-in fd4">
                  <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
                </a>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="fade-in">
                <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{
                  background:'linear-gradient(135deg,rgba(52,211,153,.1),rgba(34,211,238,.06))',
                  border:'1px solid rgba(52,211,153,.15)',
                  animation:'successRing 2.5s ease-in-out infinite',
                }}>
                  <CheckCircle className="w-8 h-8 text-emerald-400" style={{ filter:'drop-shadow(0 0 8px rgba(52,211,153,.5))',animation:'checkIn .5s ease .2s both' }} />
                </div>
                <h2 className="mt-5 text-2xl font-black text-white tracking-tight">Đã gửi thành công!</h2>
                <p className="mt-1.5 text-sm text-white/50 font-semibold leading-relaxed max-w-sm mx-auto">
                  Liên kết đã gửi đến{' '}
                  <span className="font-extrabold" style={{ background:'linear-gradient(135deg,#22d3ee,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{email}</span>
                </p>
              </div>

              <div className="mt-6 space-y-2.5 text-left">
                {[
                  {s:1,t:'Mở email chứa liên kết đặt lại',done:true,d:'.2s'},
                  {s:2,t:'Nhấn vào nút "Đặt lại mật khẩu"',done:false,d:'.35s'},
                  {s:3,t:'Tạo mật khẩu mới an toàn',done:false,d:'.5s'},
                ].map(st=>(
                  <div key={st.s} className="flex items-center gap-3 rounded-xl p-3" style={{
                    background:st.done?'linear-gradient(135deg,rgba(52,211,153,.04),rgba(34,211,238,.02))':'rgba(255,255,255,.02)',
                    border:`1px solid ${st.done?'rgba(52,211,153,.1)':'rgba(255,255,255,.04)'}`,
                    animation:`stepSlide .5s ease ${st.d} both`,
                  }}>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-black flex-shrink-0" style={{
                      background:st.done?'linear-gradient(135deg,rgba(52,211,153,.12),rgba(34,211,238,.08))':'rgba(255,255,255,.03)',
                      color:st.done?'#34d399':'rgba(255,255,255,.3)',
                      border:`1px solid ${st.done?'rgba(52,211,153,.15)':'rgba(255,255,255,.05)'}`,
                    }}>{st.done?<CheckCircle className="w-3.5 h-3.5"/>:st.s}</div>
                    <span className="text-sm text-white/50 font-semibold">{st.t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3" style={{ animation:'fadeInUp .6s ease .6s both' }}>
                <button onClick={()=>setSent(false)} className="auth-btn w-full rounded-xl px-4 py-3 text-sm font-extrabold text-white flex items-center justify-center gap-2">
                  <RefreshCcw className="w-4 h-4" /> Gửi lại liên kết
                </button>
                <a href="/login" className="flex items-center justify-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors font-extrabold pt-1">
                  <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
