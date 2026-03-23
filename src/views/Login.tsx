import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, Shield, Zap, ArrowRight, Fingerprint, BrainCircuit } from 'lucide-react';

const CSS = `
@keyframes neuralPulse1{0%,100%{opacity:.04;transform:scale(1)}50%{opacity:.12;transform:scale(1.15)}}
@keyframes neuralPulse2{0%,100%{opacity:.03;transform:scale(1.1)}50%{opacity:.09;transform:scale(.9)}}
@keyframes orbFloat1{0%{transform:translate(0,0)}25%{transform:translate(40px,-30px)}50%{transform:translate(-20px,-60px)}75%{transform:translate(-40px,-20px)}100%{transform:translate(0,0)}}
@keyframes orbFloat2{0%{transform:translate(0,0)}33%{transform:translate(-50px,30px)}66%{transform:translate(30px,50px)}100%{transform:translate(0,0)}}
@keyframes orbFloat3{0%{transform:translate(0,0)}20%{transform:translate(25px,40px)}40%{transform:translate(-35px,15px)}60%{transform:translate(-15px,-30px)}80%{transform:translate(30px,-10px)}100%{transform:translate(0,0)}}
@keyframes scanBeam{0%{top:-10%;opacity:0}5%{opacity:.6}50%{opacity:.4}95%{opacity:.6}100%{top:110%;opacity:0}}
@keyframes ringOrbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes glowBreathe{0%,100%{box-shadow:0 0 40px rgba(34,211,238,.08),0 0 120px rgba(139,92,246,.04)}50%{box-shadow:0 0 60px rgba(34,211,238,.16),0 0 150px rgba(139,92,246,.08)}}
@keyframes iconFloat{0%,100%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-6px) rotate(2deg)}50%{transform:translateY(-10px) rotate(0deg)}75%{transform:translateY(-4px) rotate(-2deg)}}
@keyframes gridSlide{from{background-position:0 0}to{background-position:50px 50px}}
@keyframes borderFlow{0%{background-position:0% 0%}100%{background-position:200% 200%}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes dotPulse{0%,100%{transform:scale(1);opacity:.2}50%{transform:scale(2.5);opacity:.6}}

.auth-input{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);transition:all .3s cubic-bezier(.4,0,.2,1)}
.auth-input:focus{border-color:rgba(34,211,238,.35);box-shadow:0 0 0 3px rgba(34,211,238,.08),0 0 20px rgba(34,211,238,.06);background:rgba(255,255,255,.05)}
.auth-input::placeholder{color:rgba(255,255,255,.2)}
.auth-btn{background:linear-gradient(135deg,#0ea5e9,#8b5cf6,#ec4899);background-size:200% 200%;animation:borderFlow 3s ease infinite;transition:all .3s}
.auth-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(34,211,238,.25)}
.social-btn{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);transition:all .25s}
.social-btn:hover{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12);transform:translateY(-1px)}
.fade-in{animation:fadeInUp .5s ease both}
.fd1{animation-delay:.05s}.fd2{animation-delay:.1s}.fd3{animation-delay:.15s}.fd4{animation-delay:.2s}.fd5{animation-delay:.25s}.fd6{animation-delay:.3s}
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050a18] flex items-center justify-center px-4 py-6 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Background */}
      <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 60% at 25% 30%,rgba(14,165,233,.07),transparent),radial-gradient(ellipse 70% 50% at 75% 70%,rgba(139,92,246,.06),transparent)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',inset:0,animation:'neuralPulse1 8s ease-in-out infinite',background:'radial-gradient(circle 400px at 30% 40%,rgba(34,211,238,.06),transparent)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',inset:0,animation:'neuralPulse2 10s ease-in-out 3s infinite',background:'radial-gradient(circle 350px at 70% 60%,rgba(139,92,246,.05),transparent)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',inset:0,opacity:.025,backgroundImage:'linear-gradient(rgba(34,211,238,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.4) 1px,transparent 1px)',backgroundSize:'60px 60px',animation:'gridSlide 20s linear infinite',pointerEvents:'none' }} />
      <div style={{ position:'absolute',top:'15%',left:'8%',width:200,height:200,borderRadius:'50%',background:'radial-gradient(circle,rgba(34,211,238,.08),transparent 70%)',filter:'blur(40px)',animation:'orbFloat1 15s ease-in-out infinite',pointerEvents:'none' }} />
      <div style={{ position:'absolute',bottom:'10%',right:'5%',width:250,height:250,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,.07),transparent 70%)',filter:'blur(50px)',animation:'orbFloat2 18s ease-in-out infinite',pointerEvents:'none' }} />
      <div style={{ position:'absolute',left:0,right:0,height:2,zIndex:5,pointerEvents:'none',background:'linear-gradient(90deg,transparent,rgba(34,211,238,.15) 20%,rgba(139,92,246,.25) 50%,rgba(34,211,238,.15) 80%,transparent)',boxShadow:'0 0 30px 10px rgba(34,211,238,.04)',animation:'scanBeam 8s ease-in-out infinite' }} />
      {[{t:'12%',l:'15%',d:0,c:'#22d3ee'},{t:'25%',l:'85%',d:2,c:'#a78bfa'},{t:'75%',l:'10%',d:4,c:'#8b5cf6'},{t:'85%',l:'80%',d:1,c:'#0ea5e9'},{t:'50%',l:'92%',d:3,c:'#ec4899'}].map((d,i)=>(
        <div key={i} style={{ position:'absolute',top:d.t,left:d.l,width:4,height:4,borderRadius:'50%',background:d.c,pointerEvents:'none',animation:`dotPulse ${3+i*.5}s ease-in-out ${d.d}s infinite` }} />
      ))}

      {/* Card — compact */}
      <div className="relative z-10 w-full max-w-[960px] overflow-hidden rounded-[24px]" style={{ border:'1px solid rgba(255,255,255,.05)',animation:'glowBreathe 5s ease-in-out infinite',backdropFilter:'blur(20px)' }}>
        <div className="grid lg:grid-cols-[1fr_1.1fr]">

          {/* LEFT */}
          <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-8" style={{ background:'linear-gradient(160deg,#080d1f,#0c0a20,#0a0f1e)' }}>
            <div style={{ position:'absolute',inset:0,background:'radial-gradient(circle 250px at 40% 35%,rgba(34,211,238,.1),transparent)',animation:'neuralPulse1 6s ease-in-out infinite' }} />
            <div style={{ position:'absolute',inset:0,background:'radial-gradient(circle 200px at 65% 75%,rgba(139,92,246,.08),transparent)',animation:'neuralPulse2 8s ease-in-out 2s infinite' }} />
            <div style={{ position:'absolute',inset:0,opacity:.03,backgroundImage:'linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)',backgroundSize:'50px 50px',animation:'gridSlide 25s linear infinite' }} />

            {/* Orbital rings */}
            <div style={{ position:'absolute',top:'14%',left:'50%',marginLeft:-80,width:160,height:160,borderRadius:'50%',border:'1px solid rgba(34,211,238,.08)',animation:'ringOrbit 25s linear infinite',pointerEvents:'none' }}>
              <div style={{ position:'absolute',top:-4,left:'50%',marginLeft:-4,width:8,height:8,borderRadius:'50%',background:'#22d3ee',boxShadow:'0 0 15px 5px rgba(34,211,238,.4)' }} />
            </div>
            <div style={{ position:'absolute',top:'14%',left:'50%',marginLeft:-100,width:200,height:200,borderRadius:'50%',border:'1px dashed rgba(139,92,246,.06)',animation:'ringOrbit 35s linear reverse infinite',pointerEvents:'none' }}>
              <div style={{ position:'absolute',bottom:-3,left:'30%',width:6,height:6,borderRadius:'50%',background:'#a78bfa',boxShadow:'0 0 12px 4px rgba(167,139,250,.3)' }} />
            </div>

            {/* Central icon */}
            <div className="flex-1 flex items-center justify-center" style={{ position:'relative',zIndex:2 }}>
              <div style={{ animation:'iconFloat 5s ease-in-out infinite' }}>
                <div style={{ width:80,height:80,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,rgba(34,211,238,.12),rgba(139,92,246,.08))',border:'1px solid rgba(34,211,238,.15)',boxShadow:'0 0 50px rgba(34,211,238,.12),inset 0 0 25px rgba(34,211,238,.04)' }}>
                  <BrainCircuit className="w-10 h-10 text-cyan-400" style={{ filter:'drop-shadow(0 0 8px rgba(34,211,238,.5))' }} />
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div style={{ position:'relative',zIndex:2 }}>
              <div style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'5px 14px',borderRadius:9999,background:'linear-gradient(135deg,rgba(34,211,238,.08),rgba(139,92,246,.05))',border:'1px solid rgba(34,211,238,.12)' }}>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" style={{ filter:'drop-shadow(0 0 4px rgba(34,211,238,.5))' }} />
                <span className="text-[10px] font-extrabold text-cyan-300 uppercase tracking-[.15em]">AI-Powered Platform</span>
              </div>
              <h1 className="mt-4 text-[28px] font-black tracking-tight leading-[1.2]">
                <span style={{ background:'linear-gradient(135deg,#22d3ee,#a78bfa,#ec4899)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Mở khoá</span>
                <br /><span className="text-white">tài sản số</span>
              </h1>
              <p className="mt-2 text-[13px] text-white/50 leading-relaxed max-w-[260px] font-medium">
                Kết nối chợ MMO hàng đầu · AI phân tích giá thông minh · Giao dịch an toàn 100%
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {[
                  {l:'HOẠT ĐỘNG',v:'24/7',icon:Zap,c:'#22d3ee',bg:'rgba(34,211,238,.06)',bc:'rgba(34,211,238,.1)'},
                  {l:'GIAO DỊCH',v:'500K+',icon:Shield,c:'#a78bfa',bg:'rgba(139,92,246,.06)',bc:'rgba(139,92,246,.1)'},
                  {l:'KHỐI LƯỢNG',v:'$10M+',icon:Sparkles,c:'#34d399',bg:'rgba(52,211,153,.06)',bc:'rgba(52,211,153,.1)'},
                ].map(s=>(
                  <div key={s.l} className="rounded-xl p-3 text-center" style={{ background:s.bg,border:`1px solid ${s.bc}` }}>
                    <s.icon className="mx-auto mb-1" style={{ color:s.c,width:16,height:16,filter:`drop-shadow(0 0 4px ${s.c}50)` }} />
                    <p className="text-sm font-black text-white">{s.v}</p>
                    <p className="text-[8px] text-white/40 font-extrabold tracking-[.12em] mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="flex flex-col justify-center px-8 py-7 sm:px-10" style={{ background:'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.005))' }}>
            {/* Logo */}
            <div className="text-center fade-in">
              <div className="mx-auto relative" style={{ width:52,height:52 }}>
                <div style={{ position:'absolute',inset:-3,borderRadius:'50%',background:'conic-gradient(from 0deg,#22d3ee,#8b5cf6,#ec4899,#22d3ee)',animation:'ringOrbit 3s linear infinite',opacity:.5,filter:'blur(1px)' }} />
                <div style={{ position:'absolute',inset:-1,borderRadius:'50%',background:'#080d1f' }} />
                <div className="relative flex items-center justify-center w-full h-full rounded-full" style={{ background:'linear-gradient(135deg,rgba(34,211,238,.1),rgba(139,92,246,.08))',border:'1px solid rgba(34,211,238,.12)' }}>
                  <span className="text-xl font-black" style={{ background:'linear-gradient(135deg,#22d3ee,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>N</span>
                </div>
              </div>
              <h2 className="mt-4 text-2xl font-black text-white tracking-tight">Đăng nhập</h2>
              <p className="mt-1 text-sm text-white/50 font-semibold">Chào mừng bạn trở lại với NexusMarket</p>
            </div>

            <form onSubmit={e=>{e.preventDefault()}} className="mt-6 space-y-4">
              <div className="fade-in fd1">
                <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">Email</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                  className="auth-input w-full rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none" placeholder="name@example.com" required />
              </div>

              <div className="fade-in fd2">
                <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1.5">Mật khẩu</label>
                <div className="relative">
                  <input type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)}
                    className="auth-input w-full rounded-xl px-4 py-3 pr-12 text-sm font-semibold text-white focus:outline-none" placeholder="••••••••" required />
                  <button type="button" onClick={()=>setShowPassword(p=>!p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors">
                    {showPassword?<EyeOff className="h-5 w-5"/>:<Eye className="h-5 w-5"/>}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between fade-in fd3">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative w-9 h-5 rounded-full cursor-pointer transition-all duration-300" style={{ background:remember?'linear-gradient(135deg,#0ea5e9,#8b5cf6)':'rgba(255,255,255,.08)' }} onClick={()=>setRemember(r=>!r)}>
                    <div className="absolute top-[3px] h-3.5 w-3.5 rounded-full bg-white transition-all duration-300" style={{ left:remember?18:3,boxShadow:remember?'0 0 8px rgba(34,211,238,.4)':'none' }} />
                  </div>
                  <span className="text-xs font-bold text-white/50 group-hover:text-white/70 transition-colors">Ghi nhớ</span>
                </label>
                <a href="/forgot-password" className="text-xs font-extrabold text-cyan-400 hover:text-cyan-300 transition-colors">Quên mật khẩu?</a>
              </div>

              <button type="submit" className="auth-btn w-full rounded-xl px-4 py-3 text-sm font-extrabold text-white flex items-center justify-center gap-2 fade-in fd4">
                Đăng nhập <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 fade-in fd4">
                <Fingerprint className="w-3.5 h-3.5 text-cyan-500/50" />
                <span className="text-[10px] text-white/30 font-bold tracking-wide">Bảo mật bởi AI · Mã hóa đầu cuối</span>
              </div>

              <div className="relative fade-in fd5">
                <div className="absolute inset-0 flex items-center"><div className="w-full" style={{ height:1,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent)' }} /></div>
                <div className="relative flex justify-center"><span className="px-4 text-[10px] text-white/30 font-extrabold uppercase tracking-wider" style={{ background:'#080d1f' }}>Hoặc tiếp tục với</span></div>
              </div>

              <div className="grid grid-cols-2 gap-3 fade-in fd5">
                {[{n:'Google',i:'G',c:'#ea4335'},{n:'Facebook',i:'f',c:'#1877f2'}].map(s=>(
                  <button key={s.n} type="button" className="social-btn flex items-center justify-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white/50">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black text-white" style={{ background:s.c }}>{s.i}</span>
                    {s.n}
                  </button>
                ))}
              </div>

              <p className="text-center text-sm text-white/40 font-semibold fade-in fd6">
                Chưa có tài khoản?{' '}
                <a href="/register" className="font-extrabold text-cyan-400 hover:text-cyan-300 transition-colors">Đăng ký ngay</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
