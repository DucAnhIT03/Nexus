'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductDetail } from '../../../src/views/ProductDetail';
import { useCart, useWishlist, useSelectedProduct } from '../../providers';
import { MOCK_PRODUCTS } from '../../lib/constants';
import { Product } from '../../lib/types';
import { use } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { selectedProduct, setSelectedProduct } = useSelectedProduct();

  const product = selectedProduct || MOCK_PRODUCTS.find(p => p.id === id);

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Không tìm thấy sản phẩm</p>
        <button onClick={() => router.push('/marketplace')} className="mt-4 bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm">
          Quay lại Chợ
        </button>
      </div>
    );
  }

  return (
    <ProductDetail
      product={product}
      onAddToCart={addToCart}
      onToggleWishlist={toggleWishlist}
      isInWishlist={isInWishlist(product.id)}
      onNavigate={handleNavigate}
      onViewDetails={(p: Product) => {
        setSelectedProduct(p);
        router.push(`/product/${p.id}`);
      }}
    />
  );
}
