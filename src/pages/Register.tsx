import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, Shield, Zap, ArrowRight, UserPlus, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';

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
@keyframes strengthGlow{0%,100%{filter:brightness(1)}50%{filter:brightness(1.4)}}

.auth-input{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);transition:all .3s cubic-bezier(.4,0,.2,1)}
.auth-input:focus{border-color:rgba(139,92,246,.35);box-shadow:0 0 0 3px rgba(139,92,246,.08),0 0 20px rgba(139,92,246,.06);background:rgba(255,255,255,.05)}
.auth-input::placeholder{color:rgba(255,255,255,.2)}
.auth-btn{background:linear-gradient(135deg,#8b5cf6,#0ea5e9,#ec4899);background-size:200% 200%;animation:borderFlow 3s ease infinite;transition:all .3s}
.auth-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(139,92,246,.25)}
.social-btn{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);transition:all .25s}
.social-btn:hover{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12);transform:translateY(-1px)}
.fade-in{animation:fadeInUp .5s ease both}
.fd1{animation-delay:.04s}.fd2{animation-delay:.08s}.fd3{animation-delay:.12s}
.fd4{animation-delay:.16s}.fd5{animation-delay:.2s}.fd6{animation-delay:.24s}.fd7{animation-delay:.28s}
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const strength = (()=>{ let s=0; if(password.length>=8)s++; if(/[A-Z]/.test(password))s++; if(/[0-9]/.test(password))s++; if(/[^A-Za-z0-9]/.test(password))s++; return s; })();
  const sC = ['','#ef4444','#f59e0b','#22d3ee','#34d399'];
  const sL = ['','Yếu','Trung bình','Mạnh','Rất mạnh'];
  const match = confirmPassword.length > 0 && password === confirmPassword;
  const mismatch = confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <div className="relative min-h-screen bg-[#050a18] flex items-center justify-center px-4 py-4 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Background */}
      <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 60% at 70% 25%,rgba(139,92,246,.07),transparent),radial-gradient(ellipse 70% 50% at 30% 75%,rgba(34,211,238,.05),transparent)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',inset:0,animation:'neuralPulse1 8s ease-in-out infinite',background:'radial-gradient(circle 400px at 60% 35%,rgba(139,92,246,.06),transparent)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',inset:0,opacity:.025,backgroundImage:'linear-gradient(rgba(139,92,246,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.4) 1px,transparent 1px)',backgroundSize:'60px 60px',animation:'gridSlide 20s linear infinite',pointerEvents:'none' }} />
      <div style={{ position:'absolute',top:'20%',left:'10%',width:200,height:200,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,.08),transparent 70%)',filter:'blur(40px)',animation:'orbFloat1 15s ease-in-out infinite',pointerEvents:'none' }} />
      <div style={{ position:'absolute',bottom:'15%',right:'8%',width:250,height:250,borderRadius:'50%',background:'radial-gradient(circle,rgba(34,211,238,.06),transparent 70%)',filter:'blur(50px)',animation:'orbFloat2 18s ease-in-out infinite',pointerEvents:'none' }} />
      <div style={{ position:'absolute',left:0,right:0,height:2,zIndex:5,pointerEvents:'none',background:'linear-gradient(90deg,transparent,rgba(139,92,246,.15) 20%,rgba(34,211,238,.2) 50%,rgba(139,92,246,.15) 80%,transparent)',animation:'scanBeam 8s ease-in-out infinite' }} />
      {[{t:'10%',l:'12%',d:0,c:'#a78bfa'},{t:'30%',l:'88%',d:2,c:'#22d3ee'},{t:'70%',l:'8%',d:4,c:'#8b5cf6'},{t:'88%',l:'85%',d:1.5,c:'#ec4899'}].map((d,i)=>(
        <div key={i} style={{ position:'absolute',top:d.t,left:d.l,width:4,height:4,borderRadius:'50%',background:d.c,pointerEvents:'none',animation:`dotPulse ${3+i*.5}s ease-in-out ${d.d}s infinite` }} />
      ))}

      {/* Card — compact */}
      <div className="relative z-10 w-full max-w-[960px] overflow-hidden rounded-[24px]" style={{ border:'1px solid rgba(255,255,255,.05)',animation:'glowBreathe 5s ease-in-out infinite',backdropFilter:'blur(20px)' }}>
        <div className="grid lg:grid-cols-[1fr_1.15fr]">

          {/* LEFT */}
          <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-8" style={{ background:'linear-gradient(160deg,#0c0a20,#080d1f,#0a0f1e)' }}>
            <div style={{ position:'absolute',inset:0,background:'radial-gradient(circle 250px at 55% 30%,rgba(139,92,246,.1),transparent)',animation:'neuralPulse1 6s ease-in-out infinite' }} />
            <div style={{ position:'absolute',inset:0,opacity:.03,backgroundImage:'linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)',backgroundSize:'50px 50px',animation:'gridSlide 25s linear infinite' }} />

            <div style={{ position:'absolute',top:'14%',left:'50%',marginLeft:-80,width:160,height:160,borderRadius:'50%',border:'1px solid rgba(139,92,246,.08)',animation:'ringOrbit 22s linear infinite',pointerEvents:'none' }}>
              <div style={{ position:'absolute',top:-4,left:'50%',marginLeft:-4,width:8,height:8,borderRadius:'50%',background:'#a78bfa',boxShadow:'0 0 15px 5px rgba(167,139,250,.4)' }} />
            </div>
            <div style={{ position:'absolute',top:'14%',left:'50%',marginLeft:-100,width:200,height:200,borderRadius:'50%',border:'1px dashed rgba(34,211,238,.05)',animation:'ringOrbit 30s linear reverse infinite',pointerEvents:'none' }} />

            <div className="flex-1 flex items-center justify-center" style={{ position:'relative',zIndex:2 }}>
              <div style={{ animation:'iconFloat 5s ease-in-out infinite' }}>
                <div style={{ width:80,height:80,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,rgba(139,92,246,.12),rgba(34,211,238,.08))',border:'1px solid rgba(139,92,246,.15)',boxShadow:'0 0 50px rgba(139,92,246,.12)' }}>
                  <UserPlus className="w-10 h-10 text-violet-400" style={{ filter:'drop-shadow(0 0 8px rgba(139,92,246,.5))' }} />
                </div>
              </div>
            </div>

            <div style={{ position:'relative',zIndex:2 }}>
              <div style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'5px 14px',borderRadius:9999,background:'linear-gradient(135deg,rgba(139,92,246,.08),rgba(34,211,238,.05))',border:'1px solid rgba(139,92,246,.12)' }}>
                <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-[10px] font-extrabold text-violet-300 uppercase tracking-[.15em]">AI-Protected</span>
              </div>
              <h1 className="mt-4 text-[28px] font-black tracking-tight leading-[1.2]">
                <span style={{ background:'linear-gradient(135deg,#a78bfa,#22d3ee,#ec4899)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Gia nhập</span>
                <br /><span className="text-white">NexusMarket</span>
              </h1>
              <p className="mt-2 text-[13px] text-white/50 leading-relaxed max-w-[260px] font-medium">
                Tài khoản AI-protected · Ưu đãi VIP · Giao dịch thông minh
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {[
                  {l:'ƯU ĐÃI',v:'VIP',icon:Sparkles,c:'#a78bfa',bg:'rgba(139,92,246,.06)',bc:'rgba(139,92,246,.1)'},
                  {l:'BẢO MẬT',v:'2FA',icon:Shield,c:'#22d3ee',bg:'rgba(34,211,238,.06)',bc:'rgba(34,211,238,.1)'},
                  {l:'HỖ TRỢ',v:'24/7',icon:Zap,c:'#34d399',bg:'rgba(52,211,153,.06)',bc:'rgba(52,211,153,.1)'},
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
          <div className="flex flex-col justify-center px-8 py-5 sm:px-10" style={{ background:'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.005))' }}>
            <div className="text-center fade-in">
              <div className="mx-auto relative" style={{ width:48,height:48 }}>
                <div style={{ position:'absolute',inset:-3,borderRadius:'50%',background:'conic-gradient(from 0deg,#a78bfa,#22d3ee,#ec4899,#a78bfa)',animation:'ringOrbit 3s linear infinite',opacity:.5,filter:'blur(1px)' }} />
                <div style={{ position:'absolute',inset:-1,borderRadius:'50%',background:'#080d1f' }} />
                <div className="relative flex items-center justify-center w-full h-full rounded-full" style={{ background:'linear-gradient(135deg,rgba(139,92,246,.1),rgba(34,211,238,.08))',border:'1px solid rgba(139,92,246,.12)' }}>
                  <span className="text-lg font-black" style={{ background:'linear-gradient(135deg,#a78bfa,#22d3ee)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>N</span>
                </div>
              </div>
              <h2 className="mt-3 text-2xl font-black text-white tracking-tight">Tạo tài khoản</h2>
              <p className="mt-1 text-sm text-white/50 font-semibold">Bắt đầu hành trình giao dịch cùng AI</p>
            </div>

            <form onSubmit={e=>{e.preventDefault()}} className="mt-5 space-y-3">
              <div className="fade-in fd1">
                <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1">Họ và tên</label>
                <input type="text" value={name} onChange={e=>setName(e.target.value)}
                  className="auth-input w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none" placeholder="Nguyễn Văn A" required />
              </div>
              <div className="fade-in fd2">
                <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1">Email</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                  className="auth-input w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none" placeholder="you@email.com" required />
              </div>
              <div className="fade-in fd3">
                <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1">Mật khẩu</label>
                <div className="relative">
                  <input type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)}
                    className="auth-input w-full rounded-xl px-4 py-2.5 pr-11 text-sm font-semibold text-white focus:outline-none" placeholder="Tối thiểu 8 ký tự" required />
                  <button type="button" onClick={()=>setShowPassword(p=>!p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors">
                    {showPassword?<EyeOff className="h-4.5 w-4.5" style={{width:18,height:18}}/>:<Eye className="h-4.5 w-4.5" style={{width:18,height:18}}/>}
                  </button>
                </div>
                {password.length>0 && (
                  <div className="mt-1.5 flex items-center gap-2.5">
                    <div className="flex gap-1 flex-1">
                      {[1,2,3,4].map(l=>(
                        <div key={l} className="flex-1 h-1.5 rounded-full transition-all duration-500" style={{
                          background:strength>=l?sC[strength]:'rgba(255,255,255,.05)',
                          boxShadow:strength>=l?`0 0 8px ${sC[strength]}40`:'none',
                          animation:strength>=l?'strengthGlow 2s ease-in-out infinite':'none',
                        }} />
                      ))}
                    </div>
                    <span className="text-[10px] font-extrabold whitespace-nowrap" style={{color:sC[strength]}}>{sL[strength]}</span>
                  </div>
                )}
              </div>
              <div className="fade-in fd4">
                <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wide mb-1">Xác nhận mật khẩu</label>
                <div className="relative">
                  <input type={showConfirmPassword?'text':'password'} value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}
                    className="auth-input w-full rounded-xl px-4 py-2.5 pr-11 text-sm font-semibold text-white focus:outline-none" placeholder="Nhập lại mật khẩu" required
                    style={match?{borderColor:'rgba(52,211,153,.3)',boxShadow:'0 0 0 3px rgba(52,211,153,.06)'}:mismatch?{borderColor:'rgba(239,68,68,.3)',boxShadow:'0 0 0 3px rgba(239,68,68,.06)'}:{}} />
                  <button type="button" onClick={()=>setShowConfirmPassword(p=>!p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors">
                    {showConfirmPassword?<EyeOff style={{width:18,height:18}}/>:<Eye style={{width:18,height:18}}/>}
                  </button>
                </div>
                {confirmPassword.length>0 && (
                  <div className="flex items-center gap-1.5 mt-1">
                    {match?(
                      <><CheckCircle className="w-3.5 h-3.5 text-emerald-400" style={{filter:'drop-shadow(0 0 4px rgba(52,211,153,.5))'}} /><span className="text-[10px] text-emerald-400 font-extrabold">Mật khẩu khớp</span></>
                    ):(
                      <><XCircle className="w-3.5 h-3.5 text-red-400" /><span className="text-[10px] text-red-400 font-extrabold">Mật khẩu không khớp</span></>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-start gap-2.5 fade-in fd5">
                <div className="relative w-9 h-5 rounded-full cursor-pointer flex-shrink-0 mt-0.5 transition-all duration-300" style={{ background:agree?'linear-gradient(135deg,#8b5cf6,#22d3ee)':'rgba(255,255,255,.08)' }} onClick={()=>setAgree(a=>!a)}>
                  <div className="absolute top-[3px] h-3.5 w-3.5 rounded-full bg-white transition-all duration-300" style={{ left:agree?18:3,boxShadow:agree?'0 0 8px rgba(139,92,246,.4)':'none' }} />
                </div>
                <span className="text-[11px] text-white/50 font-semibold leading-relaxed">Tôi đồng ý với <a href="/terms" className="font-extrabold text-violet-400 hover:text-violet-300">Điều khoản</a> và <a href="/privacy" className="font-extrabold text-violet-400 hover:text-violet-300">Chính sách bảo mật</a></span>
              </div>

              <button type="submit" className="auth-btn w-full rounded-xl px-4 py-3 text-sm font-extrabold text-white flex items-center justify-center gap-2 fade-in fd5">
                Tạo tài khoản <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative fade-in fd6">
                <div className="absolute inset-0 flex items-center"><div className="w-full" style={{height:1,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent)'}} /></div>
                <div className="relative flex justify-center"><span className="px-4 text-[10px] text-white/30 font-extrabold uppercase tracking-wider" style={{background:'#080d1f'}}>Hoặc đăng ký với</span></div>
              </div>

              <div className="grid grid-cols-2 gap-3 fade-in fd6">
                {[{n:'Google',i:'G',c:'#ea4335'},{n:'Facebook',i:'f',c:'#1877f2'}].map(s=>(
                  <button key={s.n} type="button" className="social-btn flex items-center justify-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white/50">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black text-white" style={{background:s.c}}>{s.i}</span>
                    {s.n}
                  </button>
                ))}
              </div>

              <p className="text-center text-sm text-white/40 font-semibold fade-in fd7">
                Đã có tài khoản?{' '}
                <a href="/login" className="font-extrabold text-cyan-400 hover:text-cyan-300 transition-colors">Đăng nhập ngay</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
