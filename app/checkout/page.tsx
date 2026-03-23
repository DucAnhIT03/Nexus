'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Checkout } from '../../src/pages/Checkout';
import { useCart } from '../providers';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  return (
    <Checkout
      cart={cart}
      onNavigate={handleNavigate}
      onClearCart={clearCart}
    />
  );
}
