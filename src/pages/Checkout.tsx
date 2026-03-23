import React, { useState } from 'react';
import { ChevronRight, Lock, ShieldCheck, CreditCard, Wallet, Bitcoin, CheckCircle2, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';
import { motion } from 'motion/react';

interface CheckoutProps {
  cart: CartItem[];
  onNavigate: (page: string) => void;
  onClearCart: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ cart, onNavigate, onClearCart }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fee = cart.length > 0 ? 4.99 : 0;
  const total = subtotal + fee;

  const handlePayment = () => {
    setIsProcessing(true);
    // Mô phỏng xử lý thanh toán
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onClearCart();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 flex justify-center"
        >
          <div className="rounded-full bg-green-100 p-6">
            <CheckCircle2 className="h-20 w-20 text-green-600" />
          </div>
        </motion.div>
        <h1 className="mb-4 text-4xl font-black text-slate-900">Đặt hàng thành công!</h1>
        <p className="mb-8 text-lg text-slate-500">
          Cảm ơn bạn đã mua hàng. Tài sản số của bạn đang được chuẩn bị và sẽ được gửi tới email và bảng điều khiển trong vòng 15 phút.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => onNavigate('orders')}
            className="rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all"
          >
            Xem đơn hàng
          </button>
          <button 
            onClick={() => onNavigate('home')}
            className="rounded-xl border border-primary/20 bg-white px-8 py-4 font-bold text-primary hover:bg-primary/5 transition-all"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
        <button onClick={() => onNavigate('cart')} className="hover:text-primary">Giỏ hàng</button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium">Thanh toán</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
        {/* Left Column: Forms */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all ${step >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
            <div className="h-px flex-1 bg-slate-200"></div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
          </div>

          {step === 1 ? (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-black text-slate-900">Thông tin thanh toán</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Họ và tên</label>
                  <input type="text" placeholder="Nguyễn Văn A" className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email</label>
                  <input type="email" placeholder="ten@example.com" className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Discord ID (tuỳ chọn để hỗ trợ)</label>
                <input type="text" placeholder="User#1234" className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full rounded-xl bg-primary py-4 font-bold text-white hover:bg-primary-hover transition-all"
              >
                Tiếp tục thanh toán
              </button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setStep(1)} className="text-primary hover:underline flex items-center gap-1 text-sm font-bold">
                  <ArrowLeft className="w-4 h-4" /> Quay lại
                </button>
              </div>
              <h2 className="text-2xl font-black text-slate-900">Phương thức thanh toán</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { id: 'card', name: 'Thẻ tín dụng', icon: CreditCard },
                  { id: 'paypal', name: 'PayPal', icon: Wallet },
                  { id: 'crypto', name: 'Crypto', icon: Bitcoin },
                ].map((method) => (
                  <button 
                    key={method.id}
                    className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-primary/10 bg-white p-6 hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <method.icon className="h-8 w-8 text-primary" />
                    <span className="text-sm font-bold text-slate-900">{method.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="rounded-2xl border border-primary/10 bg-white p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Số thẻ</label>
                  <input type="text" placeholder="**** **** **** 1234" className="w-full rounded-xl border border-primary/10 bg-slate-50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Ngày hết hạn</label>
                    <input type="text" placeholder="MM/YY" className="w-full rounded-xl border border-primary/10 bg-slate-50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Mã CVC</label>
                    <input type="text" placeholder="123" className="w-full rounded-xl border border-primary/10 bg-slate-50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                  </div>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="relative w-full overflow-hidden rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all disabled:opacity-70"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Đang xử lý...
                  </span>
                ) : (
                  `Thanh toán ${total.toFixed(2)}`
                )}
              </button>
            </motion.div>
          )}
        </div>

        {/* Right Column: Summary */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-xl font-bold text-slate-900">Tóm tắt đơn hàng</h3>
            <div className="max-h-60 overflow-y-auto pr-2 space-y-4 mb-6 no-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-cover bg-center border border-primary/5" style={{ backgroundImage: `url(${item.image})` }} />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500">SL: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-primary/5 pt-6">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Tạm tính</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Phí nền tảng</span>
                <span className="font-bold text-slate-900">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-primary/5 pt-4">
                <span className="text-lg font-bold text-slate-900">Tổng cộng</span>
                <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6">
            <div className="flex gap-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Bảo vệ người mua</h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Đơn hàng của bạn được bảo vệ bởi hệ thống NexusGuard. Nếu không nhận được hàng, bạn sẽ được hoàn tiền đầy đủ.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
