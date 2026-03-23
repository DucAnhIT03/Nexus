'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Cart } from '../../src/views/Cart';
import { useCart, useSelectedProduct } from '../providers';
import { Product } from '../lib/types';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { setSelectedProduct } = useSelectedProduct();

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    router.push(`/product/${product.id}`);
  };

  return (
    <Cart
      items={cart}
      onUpdateQuantity={updateQuantity}
      onRemove={removeFromCart}
      onNavigate={handleNavigate}
    />
  );
}
