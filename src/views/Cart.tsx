import React from 'react';
import { Trash2, Minus, Plus, Lock, Shield, ChevronRight, ShoppingCart, Sparkles, Zap, ArrowRight, Package } from 'lucide-react';
import { CATEGORY_LABELS, CartItem } from '../types';

const CSS = `
@keyframes neuralPulse1{0%,100%{opacity:.04;transform:scale(1)}50%{opacity:.1;transform:scale(1.1)}}
@keyframes gridSlide{from{background-position:0 0}to{background-position:50px 50px}}
@keyframes borderFlow{0%{background-position:0% 0%}100%{background-position:200% 200%}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes glowBreathe{0%,100%{box-shadow:0 0 30px rgba(34,211,238,.05)}50%{box-shadow:0 0 50px rgba(34,211,238,.1)}}
@keyframes dotPulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes scanH{0%{left:-30%}100%{left:130%}}
@keyframes cartFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes emptyPulse{0%,100%{box-shadow:0 0 0 0 rgba(139,92,246,.15)}50%{box-shadow:0 0 0 30px rgba(139,92,246,0)}}

.cart-row{transition:all .3s ease}
.cart-row:hover{background:rgba(34,211,238,.03)!important}
.qty-btn{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);transition:all .2s}
.qty-btn:hover{background:rgba(34,211,238,.15);border-color:rgba(34,211,238,.3);color:#22d3ee}
.del-btn{transition:all .2s}.del-btn:hover{color:#ef4444;transform:scale(1.15)}
.checkout-btn{background:linear-gradient(135deg,#0ea5e9,#8b5cf6,#ec4899);background-size:200% 200%;animation:borderFlow 3s ease infinite;transition:all .3s}
.checkout-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(34,211,238,.25)}
.continue-btn{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);transition:all .25s}
.continue-btn:hover{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12)}
`;

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onNavigate: (page: string) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onNavigate }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fee = items.length > 0 ? 4.99 : 0;
  const total = subtotal + fee;

  return (
    <div className="relative min-h-screen bg-[#050a18] px-4 py-6 sm:px-6 lg:px-8 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Background effects */}
      <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 50% at 30% 20%,rgba(34,211,238,.05),transparent),radial-gradient(ellipse 60% 40% at 70% 80%,rgba(139,92,246,.04),transparent)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',inset:0,animation:'neuralPulse1 8s ease-in-out infinite',background:'radial-gradient(circle 500px at 50% 30%,rgba(34,211,238,.04),transparent)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',inset:0,opacity:.02,backgroundImage:'linear-gradient(rgba(34,211,238,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.3) 1px,transparent 1px)',backgroundSize:'60px 60px',animation:'gridSlide 20s linear infinite',pointerEvents:'none' }} />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6" style={{ animation:'fadeInUp .4s ease both' }}>
          <button onClick={() => onNavigate('home')} className="text-white/30 hover:text-cyan-400 font-semibold transition-colors">Trang chủ</button>
          <ChevronRight className="w-3.5 h-3.5 text-white/15" />
          <span className="text-white font-bold">Giỏ hàng</span>
        </nav>

        {/* Header */}
        <div className="mb-6" style={{ animation:'fadeInUp .4s ease .05s both' }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background:'linear-gradient(135deg,rgba(34,211,238,.1),rgba(139,92,246,.08))',border:'1px solid rgba(34,211,238,.12)' }}>
              <ShoppingCart className="w-5 h-5 text-cyan-400" style={{ filter:'drop-shadow(0 0 4px rgba(34,211,238,.4))' }} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Giỏ hàng</h1>
              <p className="text-sm text-white/40 font-semibold">{items.length} sản phẩm</p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          /* ===== EMPTY STATE ===== */
          <div className="flex flex-col items-center justify-center py-20 text-center" style={{ animation:'fadeInUp .5s ease .1s both' }}>
            <div className="relative mb-6">
              <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background:'linear-gradient(135deg,rgba(139,92,246,.08),rgba(34,211,238,.05))',border:'1px solid rgba(139,92,246,.1)',animation:'emptyPulse 3s ease-in-out infinite' }}>
                <Package className="w-12 h-12 text-violet-400/40" style={{ animation:'cartFloat 4s ease-in-out infinite' }} />
              </div>
            </div>
            <h2 className="text-xl font-black text-white mb-2">Giỏ hàng trống</h2>
            <p className="text-sm text-white/35 font-medium mb-8 max-w-xs">Có vẻ bạn chưa thêm sản phẩm nào. Khám phá hàng nghìn sản phẩm số đang chờ bạn!</p>
            <button onClick={() => onNavigate('marketplace')} className="checkout-btn rounded-xl px-8 py-3 text-sm font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Khám phá ngay
            </button>
          </div>
        ) : (
          /* ===== CART WITH ITEMS ===== */
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Products */}
            <div className="flex-1 w-full space-y-3" style={{ animation:'fadeInUp .4s ease .1s both' }}>
              {items.map((item, i) => (
                <div key={item.id} className="cart-row rounded-2xl p-4 flex gap-4" style={{
                  background:'rgba(255,255,255,.02)',
                  border:'1px solid rgba(255,255,255,.05)',
                  animation:`fadeInUp .4s ease ${.1+i*.06}s both`,
                }}>
                  {/* Image */}
                  <div className="h-20 w-20 rounded-xl overflow-hidden flex-shrink-0 relative" style={{ border:'1px solid rgba(255,255,255,.06)' }}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-sm truncate">{item.name}</h3>
                        <p className="text-[11px] text-white/35 font-medium mt-0.5">
                          <span className="text-cyan-400/70">{CATEGORY_LABELS[item.category]}</span>
                          <span className="mx-1.5 text-white/10">•</span>
                          {item.seller.name}
                          {item.seller.isPro && (
                            <span className="ml-1.5 inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              <Shield className="w-2.5 h-2.5" /> PRO
                            </span>
                          )}
                        </p>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="del-btn text-white/15 flex-shrink-0 p-1 mt-0.5">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="qty-btn w-7 h-7 rounded-lg flex items-center justify-center text-white/40">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold text-white w-6 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="qty-btn w-7 h-7 rounded-lg flex items-center justify-center text-white/40">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        {item.quantity > 1 && <span className="block text-[10px] text-white/25 font-medium">${item.price.toFixed(2)} × {item.quantity}</span>}
                        <span className="text-base font-black text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-[360px] shrink-0 lg:sticky lg:top-20" style={{ animation:'fadeInUp .4s ease .2s both' }}>
              <div className="rounded-2xl overflow-hidden" style={{ border:'1px solid rgba(255,255,255,.05)',animation:'glowBreathe 5s ease-in-out infinite',background:'linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.01))' }}>
                {/* Scan line on top */}
                <div className="relative h-0.5 overflow-hidden" style={{ background:'rgba(34,211,238,.05)' }}>
                  <div style={{ position:'absolute',top:0,width:'30%',height:'100%',background:'linear-gradient(90deg,transparent,rgba(34,211,238,.5),transparent)',animation:'scanH 3s linear infinite' }} />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Sparkles className="w-4 h-4 text-cyan-400" style={{ filter:'drop-shadow(0 0 4px rgba(34,211,238,.4))' }} />
                    <h2 className="text-lg font-black text-white">Tóm tắt đơn hàng</h2>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between">
                      <span className="text-sm text-white/40 font-semibold">Tạm tính ({items.length} sp)</span>
                      <span className="text-sm text-white font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-white/40 font-semibold">Phí nền tảng</span>
                      <span className="text-sm text-white font-bold">${fee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-white/40 font-semibold">Thuế</span>
                      <span className="text-sm text-white/50 font-bold">$0.00</span>
                    </div>
                    <div style={{ height:1,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent)' }} />
                    <div className="flex items-end justify-between pt-1">
                      <span className="text-white font-bold">Tổng cộng</span>
                      <div className="text-right">
                        <span className="block text-2xl font-black" style={{ background:'linear-gradient(135deg,#22d3ee,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>
                          ${total.toFixed(2)}
                        </span>
                        <span className="text-[9px] text-white/25 font-bold uppercase tracking-wider">Giá đã bao gồm VAT</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <button onClick={() => onNavigate('checkout')} className="checkout-btn w-full rounded-xl px-4 py-3.5 font-extrabold text-white text-sm flex items-center justify-center gap-2">
                      <Lock className="w-4 h-4" /> Thanh toán ngay
                    </button>
                    <button onClick={() => onNavigate('marketplace')} className="continue-btn w-full rounded-xl px-4 py-3 font-bold text-white/50 text-sm flex items-center justify-center gap-2 hover:text-white/80">
                      Tiếp tục mua sắm <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Payment options */}
                  <div className="mt-6">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-3">Thanh toán an toàn</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name:'PayPal', c:'#0070ba' },
                        { name:'VISA', c:'#1a1f71' },
                        { name:'Mastercard', c:'#eb001b' },
                        { name:'Crypto', c:'#f7931a' },
                      ].map(opt => (
                        <div key={opt.name} className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white/40" style={{ background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.05)' }}>
                          {opt.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buyer protection */}
                  <div className="mt-5 p-3.5 rounded-xl flex gap-3" style={{ background:'linear-gradient(135deg,rgba(34,211,238,.04),rgba(139,92,246,.02))',border:'1px solid rgba(34,211,238,.08)' }}>
                    <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" style={{ filter:'drop-shadow(0 0 4px rgba(34,211,238,.4))' }} />
                    <div>
                      <p className="text-xs font-extrabold text-cyan-300">Bảo vệ AI</p>
                      <p className="text-[11px] text-white/35 mt-0.5 font-medium leading-relaxed">Mỗi giao dịch được AI bảo mật. Nhận sản phẩm hoặc hoàn tiền 100%.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
