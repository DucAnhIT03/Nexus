import React, { useState } from 'react';
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Key,
  BookOpen,
  Video,
  Headphones,
  Shield,
  Grid3x3,
  List,
  Copy,
  Check,
  ExternalLink,
  Calendar,
  Clock,
  AlertCircle,
  User,
  Lock,
  History,
  Package,
  LogOut,
  Star
} from 'lucide-react';
import { MOCK_PURCHASED_PRODUCTS } from '../constants';
import { PurchasedProduct, PURCHASE_STATUS_LABELS, CATEGORY_LABELS } from '../types';

interface PurchasedProductsProps {
  onNavigate: (page: string) => void;
}

type ViewMode = 'grid' | 'list';
type FilterCategory = 'all' | 'Software' | 'Accounts' | 'Services' | 'Courses' | 'Tools';

const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700 border-green-200',
  expired: 'bg-red-100 text-red-700 border-red-200',
  suspended: 'bg-amber-100 text-amber-700 border-amber-200'
};

const STATUS_DOT = {
  active: 'bg-green-500',
  expired: 'bg-red-500',
  suspended: 'bg-amber-500'
};

export const PurchasedProducts: React.FC<PurchasedProductsProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredProducts = selectedCategory === 'all'
    ? MOCK_PURCHASED_PRODUCTS
    : MOCK_PURCHASED_PRODUCTS.filter(p => p.category === selectedCategory);

  const handleCopyLicense = (licenseKey: string, id: string) => {
    navigator.clipboard.writeText(licenseKey);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusColor = (status: PurchasedProduct['status']) => {
    return STATUS_COLORS[status] || STATUS_COLORS.active;
  };

  const getStatusDot = (status: PurchasedProduct['status']) => {
    return STATUS_DOT[status] || STATUS_DOT.active;
  };

  const renderProductCard = (product: PurchasedProduct, isGridView = true) => {
    const isExpanded = expandedCard === product.id;

    return (
      <div
        key={product.id}
        className={`bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all hover:shadow-lg ${
          isGridView ? '' : 'flex'
        }`}
      >
        {/* Image Section */}
        <div className={`${isGridView ? 'h-48' : 'w-48 flex-shrink-0'} relative`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(product.status)}`}>
              <span className={`w-2 h-2 rounded-full ${getStatusDot(product.status)}`} />
              {PURCHASE_STATUS_LABELS[product.status]}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className={`p-5 ${isGridView ? '' : 'flex-1 flex flex-col justify-between'}`}>
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-bold text-slate-900 text-lg leading-tight line-clamp-2">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">
                {CATEGORY_LABELS[product.category as keyof typeof CATEGORY_LABELS] || product.category}
              </span>
            </div>

            {/* License Key */}
            {product.licenseKey && (
              <div className="mb-4">
                <label className="text-xs text-slate-500 font-medium mb-1.5 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" /> Mã kích hoạt
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-slate-100 px-3 py-2 rounded-lg text-xs font-mono text-slate-700 border border-slate-200 truncate">
                    {product.licenseKey}
                  </code>
                  <button
                    onClick={() => handleCopyLicense(product.licenseKey!, product.id)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    {copiedId === product.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Đã sao chép
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Sao chép
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Expandable Details */}
            {isGridView && (
              <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  {/* Expiry Date */}
                  {product.expiryDate && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Hết hạn: <span className="font-semibold">{product.expiryDate}</span></span>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex flex-wrap gap-2">
                    {product.instructions && (
                      <a
                        href={product.instructions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" /> Hướng dẫn
                      </a>
                    )}
                    {product.videoUrl && (
                      <a
                        href={product.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" /> Video
                      </a>
                    )}
                    {product.supportUrl && (
                      <a
                        href={product.supportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Headphones className="w-3.5 h-3.5" /> Hỗ trợ
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
            {product.downloadUrl && (
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-bold transition-colors">
                <Download className="w-4 h-4" />
                Tải xuống
              </button>
            )}
            {product.status === 'active' && (
              <button
                onClick={() => setExpandedCard(isExpanded ? null : product.id)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
              >
                {isExpanded ? 'Thu gọn' : 'Chi tiết'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderListView = () => {
    return filteredProducts.map(product => (
      <div
        key={product.id}
        className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-slate-900 truncate">{product.name}</h3>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(product.status)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(product.status)}`} />
                {PURCHASE_STATUS_LABELS[product.status]}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="font-medium">{CATEGORY_LABELS[product.category as keyof typeof CATEGORY_LABELS]}</span>
              <span>•</span>
              <span>Mua: {product.purchaseDate}</span>
              {product.expiryDate && (
                <>
                  <span>•</span>
                  <span className={product.status === 'expired' ? 'text-red-500' : ''}>
                    Hết hạn: {product.expiryDate}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* License Key */}
          {product.licenseKey && (
            <div className="hidden lg:flex items-center gap-2">
              <code className="bg-slate-100 px-3 py-1.5 rounded text-xs font-mono text-slate-600 border border-slate-200 max-w-[200px] truncate">
                {product.licenseKey}
              </code>
              <button
                onClick={() => handleCopyLicense(product.licenseKey!, product.id)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                title="Sao chép mã kích hoạt"
              >
                {copiedId === product.id ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            {product.downloadUrl && (
              <button className="inline-flex items-center justify-center w-10 h-10 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setExpandedCard(expandedCard === product.id ? null : product.id)}
              className="inline-flex items-center justify-center w-10 h-10 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded Details */}
        {expandedCard === product.id && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {product.instructions && (
                <a
                  href={product.instructions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  <BookOpen className="w-4 h-4" /> Hướng dẫn
                </a>
              )}
              {product.videoUrl && (
                <a
                  href={product.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-semibold transition-colors"
                >
                  <Video className="w-4 h-4" /> Video
                </a>
              )}
              {product.supportUrl && (
                <a
                  href={product.supportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg text-sm font-semibold transition-colors"
                >
                  <Headphones className="w-4 h-4" /> Hỗ trợ
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="mx-auto w-full max-w-7xl grow px-6 py-10">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full shrink-0 md:w-72">
          <div className="flex flex-col gap-6">
            {/* Profile Card */}
            <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm border border-primary/5">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-primary/10 border-2 border-primary/20">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                  alt="Hồ sơ"
                  className="h-full w-full"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-900 leading-tight">Alex Rivers</h3>
                <span className="text-xs text-slate-500 font-medium">Nhà giao dịch Pro · Thành viên từ 2023</span>
              </div>
            </div>


            {/* Navigation */}
            <nav className="flex flex-col gap-1">
              {[
                { id: 'profile', name: 'Thông tin cá nhân', icon: User },
                { id: 'password', name: 'Đổi mật khẩu', icon: Lock },
                { id: 'orders', name: 'Lịch sử đơn hàng', icon: History },
                { id: 'purchased', name: 'Sản phẩm đã mua', icon: Package },
              ].map((item) => {
                const isActive = item.id === 'purchased';
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (item.id === 'purchased') return;
                      if (item.id === 'password') {
                        onNavigate('profile');
                      } else {
                        onNavigate(item.id);
                      }
                    }}
                    className={`group flex items-center gap-3 rounded-lg px-4 py-3 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'text-slate-600 hover:bg-primary hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-semibold">{item.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Logout Button */}
            <button
              onClick={() => {
                localStorage.removeItem('authToken');
                onNavigate('login');
              }}
              className="group flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600 hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-semibold">Đăng xuất</span>
            </button>

            <div className="mt-4 rounded-xl bg-gradient-to-br from-primary to-primary/80 p-5 text-white shadow-xl shadow-primary/30">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Đánh giá người bán</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-3xl font-black">4.9</span>
                <div className="flex text-yellow-300">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </div>
              <p className="mt-1 text-xs opacity-90">Dựa trên 128 giao dịch thành công</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1">
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-primary/5">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sản phẩm đã mua</h1>
                <p className="text-slate-500 text-sm mt-1">Quản lý và truy cập các sản phẩm số của bạn.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6">
              <div className="flex border-b border-slate-200 gap-1 overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'Software', label: 'Phần mềm' },
                  { id: 'Accounts', label: 'Tài khoản' },
                  { id: 'Services', label: 'Dịch vụ' },
                  { id: 'Courses', label: 'Khóa học' },
                  { id: 'Tools', label: 'Công cụ' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id as FilterCategory)}
                    className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                      selectedCategory === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-slate-500 hover:text-primary'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="text-2xl font-bold text-green-600">
                  {MOCK_PURCHASED_PRODUCTS.filter(p => p.status === 'active').length}
                </div>
                <div className="text-xs text-green-700 font-medium">Đang hoạt động</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <div className="text-2xl font-bold text-red-600">
                  {MOCK_PURCHASED_PRODUCTS.filter(p => p.status === 'expired').length}
                </div>
                <div className="text-xs text-red-700 font-medium">Hết hạn</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">
                  {MOCK_PURCHASED_PRODUCTS.length}
                </div>
                <div className="text-xs text-blue-700 font-medium">Tổng sản phẩm</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <div className="text-2xl font-bold text-purple-600">
                  ${MOCK_PURCHASED_PRODUCTS.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                </div>
                <div className="text-xs text-purple-700 font-medium">Tổng giá trị</div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => renderProductCard(product))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {renderListView()}
                </div>
              )
            ) : (
              <div className="text-center py-16">
                <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">Không có sản phẩm nào trong danh mục này.</p>
              </div>
            )}

            {/* Pagination Placeholder */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Hiển thị {filteredProducts.length} trên {MOCK_PURCHASED_PRODUCTS.length} sản phẩm
              </p>
              <div className="flex items-center gap-2">
                <button className="flex w-10 h-10 items-center justify-center rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="text-sm font-bold flex w-10 h-10 items-center justify-center text-white rounded-lg bg-primary">
                  1
                </button>
                <button className="text-sm font-semibold flex w-10 h-10 items-center justify-center text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Content-only version for embedding in Profile tabs
export const PurchasedProductsContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredProducts = selectedCategory === 'all'
    ? MOCK_PURCHASED_PRODUCTS
    : MOCK_PURCHASED_PRODUCTS.filter(p => p.category === selectedCategory);

  const handleCopyLicense = (licenseKey: string, id: string) => {
    navigator.clipboard.writeText(licenseKey);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusColor = (status: PurchasedProduct['status']) => STATUS_COLORS[status] || STATUS_COLORS.active;
  const getStatusDot = (status: PurchasedProduct['status']) => STATUS_DOT[status] || STATUS_DOT.active;

  const renderCard = (product: PurchasedProduct) => {
    const isExpanded = expandedCard === product.id;
    return (
      <div key={product.id} className="rounded-2xl overflow-hidden transition-all hover:scale-[1.02]" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div className="h-48 relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{
              background: product.status === 'active' ? 'rgba(52,211,153,0.15)' : product.status === 'expired' ? 'rgba(239,68,68,0.15)' : 'rgba(251,191,36,0.15)',
              color: product.status === 'active' ? '#34d399' : product.status === 'expired' ? '#f87171' : '#fbbf24',
              border: `1px solid ${product.status === 'active' ? 'rgba(52,211,153,0.3)' : product.status === 'expired' ? 'rgba(239,68,68,0.3)' : 'rgba(251,191,36,0.3)'}`,
              backdropFilter: 'blur(8px)',
            }}>
              <span className="w-2 h-2 rounded-full" style={{
                background: product.status === 'active' ? '#34d399' : product.status === 'expired' ? '#f87171' : '#fbbf24',
              }} />
              {PURCHASE_STATUS_LABELS[product.status]}
            </span>
          </div>
        </div>
        <div className="p-5">
          <div>
            <h3 className="font-bold text-white text-lg leading-tight line-clamp-2 mb-2">{product.name}</h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-2 py-1 rounded" style={{
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                {CATEGORY_LABELS[product.category as keyof typeof CATEGORY_LABELS] || product.category}
              </span>
            </div>
            {product.licenseKey && (
              <div className="mb-4">
                <label className="text-xs text-white/35 font-medium mb-1.5 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" /> Mã kích hoạt
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 rounded-lg text-xs font-mono truncate" style={{
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>{product.licenseKey}</code>
                  <button onClick={() => handleCopyLicense(product.licenseKey!, product.id)}
                    className="flex items-center gap-1.5 px-3 py-2 text-white rounded-lg text-xs font-bold transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)', boxShadow: '0 0 10px rgba(34,211,238,0.15)' }}>
                    {copiedId === product.id ? (<><Check className="w-3.5 h-3.5" /> Đã sao chép</>) : (<><Copy className="w-3.5 h-3.5" /> Sao chép</>)}
                  </button>
                </div>
              </div>
            )}
            <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
              <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {product.expiryDate && (
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Calendar className="w-4 h-4 text-white/25" />
                    <span>Hết hạn: <span className="font-semibold text-white/70">{product.expiryDate}</span></span>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {product.instructions && (
                    <a href={product.instructions} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <BookOpen className="w-3.5 h-3.5" /> Hướng dẫn
                    </a>
                  )}
                  {product.videoUrl && (
                    <a href={product.videoUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      style={{ background: 'rgba(239,68,68,0.08)', color: '#f87171', border: '1px solid rgba(239,68,68,0.15)' }}>
                      <Video className="w-3.5 h-3.5" /> Video
                    </a>
                  )}
                  {product.supportUrl && (
                    <a href={product.supportUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      style={{ background: 'rgba(52,211,153,0.08)', color: '#34d399', border: '1px solid rgba(52,211,153,0.15)' }}>
                      <Headphones className="w-3.5 h-3.5" /> Hỗ trợ
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 flex flex-wrap gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {product.downloadUrl && (
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)', boxShadow: '0 0 12px rgba(34,211,238,0.15)' }}>
                <Download className="w-4 h-4" /> Tải xuống
              </button>
            )}
            {product.status === 'active' && (
              <button onClick={() => setExpandedCard(isExpanded ? null : product.id)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                {isExpanded ? 'Thu gọn' : 'Chi tiết'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-2xl p-8 overflow-hidden" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
      border: '1px solid rgba(255,255,255,0.06)',
      backdropFilter: 'blur(16px)',
    }}>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Sản phẩm đã mua</h1>
          <p className="text-white/35 text-sm mt-1">Quản lý và truy cập các sản phẩm số của bạn.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode('grid')}
            className="p-2.5 rounded-lg transition-colors"
            style={viewMode === 'grid' ? { background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)', color: 'white' } : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button onClick={() => setViewMode('list')}
            className="p-2.5 rounded-lg transition-colors"
            style={viewMode === 'list' ? { background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)', color: 'white' } : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-1 overflow-x-auto no-scrollbar" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'Software', label: 'Phần mềm' },
            { id: 'Accounts', label: 'Tài khoản' },
            { id: 'Services', label: 'Dịch vụ' },
            { id: 'Courses', label: 'Khóa học' },
            { id: 'Tools', label: 'Công cụ' },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setSelectedCategory(tab.id as FilterCategory)}
              className="px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap"
              style={{
                borderColor: selectedCategory === tab.id ? '#22d3ee' : 'transparent',
                color: selectedCategory === tab.id ? '#22d3ee' : 'rgba(255,255,255,0.35)',
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Đang hoạt động', value: MOCK_PURCHASED_PRODUCTS.filter(p => p.status === 'active').length, color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.15)' },
          { label: 'Hết hạn', value: MOCK_PURCHASED_PRODUCTS.filter(p => p.status === 'expired').length, color: '#f87171', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.15)' },
          { label: 'Tổng sản phẩm', value: MOCK_PURCHASED_PRODUCTS.length, color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.15)' },
          { label: 'Tổng giá trị', value: `$${MOCK_PURCHASED_PRODUCTS.reduce((sum, p) => sum + p.price, 0).toFixed(2)}`, color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.15)' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl p-4" style={{ background: stat.bg, border: `1px solid ${stat.border}` }}>
            <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs font-medium" style={{ color: `${stat.color}99` }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => renderCard(product))}
        </div>
      ) : (
        <div className="text-center py-16">
          <AlertCircle className="w-16 h-16 text-white/15 mx-auto mb-4" />
          <p className="text-white/35 font-medium">Không có sản phẩm nào trong danh mục này.</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-sm text-white/30">Hiển thị {filteredProducts.length} trên {MOCK_PURCHASED_PRODUCTS.length} sản phẩm</p>
        <div className="flex items-center gap-2">
          <button className="flex w-10 h-10 items-center justify-center rounded-lg text-white/20" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="text-sm font-bold flex w-10 h-10 items-center justify-center text-white rounded-lg" style={{ background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)', boxShadow: '0 0 12px rgba(34,211,238,0.15)' }}>1</button>
          <button className="text-sm font-semibold flex w-10 h-10 items-center justify-center text-white/40 rounded-lg hover:bg-white/[0.04] transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
