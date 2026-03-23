import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Wishlist } from './pages/Wishlist';
import { SellerDashboard } from './pages/SellerDashboard';
import { Services } from './pages/Services';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';
import { PurchasedProducts } from './pages/PurchasedProducts';
import Login from './pages/Login';
import Register from './pages/Register';
import { Product, CartItem } from './types';
import { motion, AnimatePresence } from 'motion/react';

import { GeminiAssistant } from './components/GeminiAssistant';

const getPageFromPath = (path: string) => {
  const clean = path.replace(/^\//, '').trim();
  if (!clean) return 'home';
  if (clean === 'login' || clean === 'register') return clean;
  return clean;
};

const getPathFromPage = (page: string) => {
  if (!page || page === 'home') return '/';
  return `/${page}`;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => getPageFromPath(window.location.pathname));
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Sync URL and scroll to top on page change
  useEffect(() => {
    const path = getPathFromPage(currentPage);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global navigation listener for components that don't have direct access to setCurrentPage
  useEffect(() => {
    const handleGlobalNavigate = (e: any) => {
      setCurrentPage(e.detail);
    };
    window.addEventListener('navigate', handleGlobalNavigate);
    return () => window.removeEventListener('navigate', handleGlobalNavigate);
  }, []);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    // Optional: show a toast or navigate to cart
    // setCurrentPage('cart');
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            onAddToCart={(p) => handleAddToCart(p)}
            onViewDetails={handleViewDetails}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onNavigate={setCurrentPage}
          />
        );
      case 'marketplace':
      case 'tool':
      case 'software':
      case 'course':
        return (
          <Marketplace
            onAddToCart={(p) => handleAddToCart(p)}
            onViewDetails={handleViewDetails}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
          />
        );
      case 'service':
        return (
          <Services
            onAddToCart={(p) => handleAddToCart(p)}
            onViewDetails={handleViewDetails}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onNavigate={setCurrentPage}
          />
        );
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onNavigate={setCurrentPage}
            onToggleWishlist={handleToggleWishlist}
            isInWishlist={wishlist.some(p => p.id === selectedProduct.id)}
          />
        ) : (
          <Home
            onAddToCart={(p) => handleAddToCart(p)}
            onViewDetails={handleViewDetails}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onNavigate={setCurrentPage}
          />
        );
      case 'cart':
        return (
          <Cart
            items={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemove={handleRemoveFromCart}
            onNavigate={setCurrentPage}
          />
        );
      case 'wishlist':
        return (
          <Wishlist
            items={wishlist}
            onAddToCart={handleAddToCart}
            onRemove={(id) => setWishlist(prev => prev.filter(p => p.id !== id))}
            onViewDetails={handleViewDetails}
            onNavigate={setCurrentPage}
          />
        );
      case 'checkout':
        return (
          <Checkout
            cart={cart}
            onNavigate={setCurrentPage}
            onClearCart={() => setCart([])}
          />
        );
      case 'orders':
        return <Profile onNavigate={setCurrentPage} defaultTab="orders" />;
      case 'profile':
        return <Profile onNavigate={setCurrentPage} />;
      case 'purchased':
        return <Profile onNavigate={setCurrentPage} defaultTab="purchased" />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'seller-dashboard':
        return <SellerDashboard />;
      default:
        return <Home onAddToCart={(p) => handleAddToCart(p)} onViewDetails={handleViewDetails} onNavigate={setCurrentPage} />;
    }
  };

  const authPages = ['login', 'register'];
  const isAuthPage = authPages.includes(currentPage);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && (
        <Navbar
          onNavigate={setCurrentPage}
          currentPage={currentPage}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          wishlistCount={wishlist.length}
        />
      )}

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {!isAuthPage && <Footer />}
      {!isAuthPage && <GeminiAssistant />}
    </div>
  );
}
