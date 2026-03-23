'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Wishlist } from '../../src/pages/Wishlist';
import { useCart, useWishlist, useSelectedProduct } from '../providers';
import { Product } from '../lib/types';

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { setSelectedProduct } = useSelectedProduct();

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    router.push(`/product/${product.id}`);
  };

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  return (
    <Wishlist
      items={wishlist}
      onAddToCart={addToCart}
      onRemove={removeFromWishlist}
      onViewDetails={handleViewDetails}
      onNavigate={handleNavigate}
    />
  );
}
