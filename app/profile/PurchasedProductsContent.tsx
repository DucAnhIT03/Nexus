'use client';

import React, { useState } from 'react';
import { Download, ChevronLeft, ChevronRight, Grid3x3, List, Key, Copy, Check, Calendar, BookOpen, Video, Headphones, AlertCircle } from 'lucide-react';
import { MOCK_PURCHASED_PRODUCTS } from '../lib/constants';

type ViewMode = 'grid' | 'list';
type FilterCategory = 'all' | 'Software' | 'Accounts' | 'Services' | 'Courses' | 'Tools';

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-50 text-green-700 border-green-200',
  expired: 'bg-red-50 text-red-700 border-red-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
};

const STATUS_DOT: Record<string, string> = {
  active: 'bg-green-500',
  expired: 'bg-red-500',
  pending: 'bg-amber-500',
};

const PURCHASE_STATUS_LABELS: Record<string, string> = {
  active: 'Đang hoạt động',
  expired: 'Hết hạn',
  pending: 'Đang xử lý',
};

const CATEGORY_LABELS: Record<string, string> = {
  Software: 'Phần mềm',
  Accounts: 'Tài khoản',
  Services: 'Dịch vụ',
  Courses: 'Khóa học',
  Tools: 'Công cụ',
};

interface PurchasedProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  status: 'active' | 'expired' | 'pending';
  licenseKey?: string;
  expiryDate?: string;
  downloadUrl?: string;
  instructions?: string;
  videoUrl?: string;
  supportUrl?: string;
}

export const PurchasedProductsContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredProducts = selectedCategory === 'all'
    ? MOCK_PURCHASED_PRODUCTS
    : MOCK_PURCHASED_PRODUCTS.filter((p: any) => p.category === selectedCategory);

  const handleCopyLicense = (licenseKey: string, id: string) => {
    navigator.clipboard.writeText(licenseKey);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusColor = (status: string) => STATUS_COLORS[status] || STATUS_COLORS.active;
  const getStatusDot = (status: string) => STATUS_DOT[status] || STATUS_DOT.active;

  const renderCard = (product: any) => {
    const isExpanded = expandedCard === product.id;
    return (
      <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all hover:shadow-lg">
        <div className="h-48 relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(product.status)}`}>
              <span className={`w-2 h-2 rounded-full ${getStatusDot(product.status)}`} />
              {PURCHASE_STATUS_LABELS[product.status]}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-slate-900 text-lg leading-tight line-clamp-2 mb-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">
              {CATEGORY_LABELS[product.category] || product.category}
            </span>
          </div>
          {product.licenseKey && (
            <div className="mb-4">
              <label className="text-xs text-slate-500 font-medium mb-1.5 flex items-center gap-1.5"><Key className="w-3.5 h-3.5" /> Mã kích hoạt</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-slate-100 px-3 py-2 rounded-lg text-xs font-mono text-slate-700 border border-slate-200 truncate">{product.licenseKey}</code>
                <button onClick={() => handleCopyLicense(product.licenseKey, product.id)} className="flex items-center gap-1.5 px-3 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-bold transition-colors">
                  {copiedId === product.id ? (<><Check className="w-3.5 h-3.5" /> Đã sao chép</>) : (<><Copy className="w-3.5 h-3.5" /> Sao chép</>)}
                </button>
              </div>
            </div>
          )}
          <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <div className="pt-4 border-t border-slate-100 space-y-3">
              {product.expiryDate && (
                <div className="flex items-center gap-2 text-sm text-slate-600"><Calendar className="w-4 h-4 text-slate-400" /><span>Hết hạn: <span className="font-semibold">{product.expiryDate}</span></span></div>
              )}
              <div className="flex flex-wrap gap-2">
                {product.instructions && <a href={product.instructions} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"><BookOpen className="w-3.5 h-3.5" /> Hướng dẫn</a>}
                {product.videoUrl && <a href={product.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors"><Video className="w-3.5 h-3.5" /> Video</a>}
                {product.supportUrl && <a href={product.supportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg text-xs font-semibold transition-colors"><Headphones className="w-3.5 h-3.5" /> Hỗ trợ</a>}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
            {product.downloadUrl && (
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-bold transition-colors">
                <Download className="w-4 h-4" /> Tải xuống
              </button>
            )}
            {product.status === 'active' && (
              <button onClick={() => setExpandedCard(isExpanded ? null : product.id)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition-colors">
                {isExpanded ? 'Thu gọn' : 'Chi tiết'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm border border-primary/5">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sản phẩm đã mua</h1>
          <p className="text-slate-500 text-sm mt-1">Quản lý và truy cập các sản phẩm số của bạn.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}><Grid3x3 className="w-5 h-5" /></button>
          <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}><List className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex border-b border-slate-200 gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'all' as FilterCategory, label: 'Tất cả' },
            { id: 'Software' as FilterCategory, label: 'Phần mềm' },
            { id: 'Accounts' as FilterCategory, label: 'Tài khoản' },
            { id: 'Services' as FilterCategory, label: 'Dịch vụ' },
            { id: 'Courses' as FilterCategory, label: 'Khóa học' },
            { id: 'Tools' as FilterCategory, label: 'Công cụ' },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setSelectedCategory(tab.id)} className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${selectedCategory === tab.id ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-primary'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 rounded-xl p-4 border border-green-100"><div className="text-2xl font-bold text-green-600">{MOCK_PURCHASED_PRODUCTS.filter((p: any) => p.status === 'active').length}</div><div className="text-xs text-green-700 font-medium">Đang hoạt động</div></div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-100"><div className="text-2xl font-bold text-red-600">{MOCK_PURCHASED_PRODUCTS.filter((p: any) => p.status === 'expired').length}</div><div className="text-xs text-red-700 font-medium">Hết hạn</div></div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100"><div className="text-2xl font-bold text-blue-600">{MOCK_PURCHASED_PRODUCTS.length}</div><div className="text-xs text-blue-700 font-medium">Tổng sản phẩm</div></div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100"><div className="text-2xl font-bold text-purple-600">${MOCK_PURCHASED_PRODUCTS.reduce((sum: number, p: any) => sum + p.price, 0).toFixed(2)}</div><div className="text-xs text-purple-700 font-medium">Tổng giá trị</div></div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product: any) => renderCard(product))}
        </div>
      ) : (
        <div className="text-center py-16">
          <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Không có sản phẩm nào trong danh mục này.</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
        <p className="text-sm text-slate-500">Hiển thị {filteredProducts.length} trên {MOCK_PURCHASED_PRODUCTS.length} sản phẩm</p>
        <div className="flex items-center gap-2">
          <button className="flex w-10 h-10 items-center justify-center rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed"><ChevronLeft className="w-5 h-5" /></button>
          <button className="text-sm font-bold flex w-10 h-10 items-center justify-center text-white rounded-lg bg-primary">1</button>
          <button className="text-sm font-semibold flex w-10 h-10 items-center justify-center text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
};
