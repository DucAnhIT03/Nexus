'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Marketplace } from '../../src/pages/Marketplace';
import { useCart, useWishlist, useSelectedProduct } from '../providers';
import { Product } from '../lib/types';

export default function MarketplacePage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, wishlist } = useWishlist();
  const { setSelectedProduct } = useSelectedProduct();

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    router.push(`/product/${product.id}`);
  };

  return (
    <Marketplace
      onAddToCart={addToCart}
      onViewDetails={handleViewDetails}
      onToggleWishlist={toggleWishlist}
      wishlist={wishlist}
    />
  );
}
