import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'vi' | 'en';

type Dictionary = Record<string, string>;

type I18nContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['vi']) => string;
};

const translations = {
  vi: {
    'nav.marketplace': 'Chợ',
    'nav.tool': 'Công cụ',
    'nav.service': 'Dịch vụ',
    'nav.software': 'Phần mềm',
    'nav.course': 'Tài khoản AI',
    'nav.orders': 'Đơn hàng',
    'nav.searchPlaceholder': 'Tìm kiếm công cụ, tài khoản...',
    'nav.wishlist': 'Yêu thích',
    'nav.cart': 'Giỏ hàng',
    'nav.notifications': 'Thông báo',
    'nav.profile': 'Hồ sơ',

    'login.title': 'Đăng nhập',
    'login.subtitle': 'Chào mừng bạn trở lại với NexusMarket',
    'login.email': 'Email',
    'login.password': 'Mật khẩu',
    'login.remember': 'Ghi nhớ đăng nhập',
    'login.forgot': 'Quên mật khẩu?',
    'login.submit': 'Đăng nhập',
    'login.or': 'Hoặc đăng nhập với',
    'login.noAccount': 'Chưa có tài khoản?',
    'login.signup': 'Đăng ký ngay',
    'login.heroBadge': 'NexusMarket',
    'login.heroTitle': 'Mở khoá tài sản số',
    'login.heroSubtitle': 'Kết nối với marketplace MMO hàng đầu và khám phá công cụ premium.',
    'login.statActive': 'Hoạt động',
    'login.statTraders': 'Nhà giao dịch',
    'login.statVolume': 'Khối lượng',

    'register.title': 'Đăng ký',
    'register.subtitle': 'Tạo tài khoản mới để bắt đầu giao dịch',
    'register.fullName': 'Họ và tên',
    'register.email': 'Email',
    'register.password': 'Mật khẩu',
    'register.confirmPassword': 'Xác nhận mật khẩu',
    'register.agreePrefix': 'Tôi đồng ý với',
    'register.terms': 'Điều khoản',
    'register.privacy': 'Chính sách bảo mật',
    'register.submit': 'Tạo tài khoản',
    'register.or': 'Hoặc đăng ký với',
    'register.haveAccount': 'Đã có tài khoản?',
    'register.loginNow': 'Đăng nhập ngay',
    'register.heroBadge': 'NexusMarket',
    'register.heroTitle': 'Gia nhập NexusMarket',
    'register.heroSubtitle': 'Tạo tài khoản để nhận ưu đãi và theo dõi giao dịch mới nhất.',
    'register.statBenefits': 'Ưu đãi',
    'register.statSecurity': 'Bảo mật',
    'register.statSupport': 'Hỗ trợ',

    'home.badge': 'Ưu đãi mùa xuân 2024',
    'home.title': 'Tăng tốc đế chế số',
    'home.subtitle': 'Giảm đến 50% cho công cụ tự động, script SEO, và tài khoản lâu năm. Ưu đãi có hạn.',
    'home.ctaExplore': 'Khám phá Chợ',
    'home.ctaSeller': 'Trở thành người bán',
    'home.browse': 'Duyệt theo danh mục',

    'marketplace.title': 'Marketplace',
    'marketplace.subtitle': 'Khám phá sản phẩm MMO hàng đầu',
    'marketplace.filterAll': 'Tất cả',
    'marketplace.filterTools': 'Công cụ',
    'marketplace.filterServices': 'Dịch vụ',
    'marketplace.filterSoftware': 'Phần mềm',
    'marketplace.filterCourses': 'Tài khoản AI',

    'product.details': 'Chi tiết',
    'product.addToCart': 'Thêm vào giỏ',
    'product.by': 'Bởi',
    'product.server': 'Máy chủ',
    'product.reviews': 'đánh giá',
    'product.inWishlist': 'Đã yêu thích',
    'product.addWishlist': 'Yêu thích',

    'cart.title': 'Giỏ hàng',
    'cart.subtitle': 'Xem lại sản phẩm bạn đã chọn',
    'cart.empty': 'Giỏ hàng trống',
    'cart.continue': 'Tiếp tục mua sắm',
    'cart.total': 'Tổng cộng',
    'cart.checkout': 'Thanh toán',
    'cart.remove': 'Xoá',

    'checkout.title': 'Thanh toán',
    'checkout.subtitle': 'Hoàn tất đơn hàng của bạn',
    'checkout.placeOrder': 'Đặt hàng',

    'wishlist.title': 'Danh sách yêu thích',
    'wishlist.subtitle': 'Sản phẩm bạn lưu để mua sau',
    'wishlist.empty': 'Danh sách yêu thích trống',

    'orders.title': 'Đơn hàng',
    'orders.subtitle': 'Theo dõi lịch sử mua hàng của bạn',

    'profile.title': 'Thông tin cá nhân',
    'profile.subtitle': 'Quản lý thông tin tài khoản và cài đặt hồ sơ.',
    'profile.logout': 'Đăng xuất',

    'footer.about': 'NexusMarket là marketplace MMO đáng tin cậy cho công cụ, tài khoản và dịch vụ số.',
    'footer.links': 'Liên kết',
    'footer.support': 'Hỗ trợ',
    'footer.legal': 'Pháp lý',
  },
  en: {
    'nav.marketplace': 'Marketplace',
    'nav.tool': 'Tool',
    'nav.service': 'Service',
    'nav.software': 'Software',
    'nav.course': 'Course',
    'nav.orders': 'Orders',
    'nav.searchPlaceholder': 'Search for tools, accounts...',
    'nav.wishlist': 'Wishlist',
    'nav.cart': 'Cart',
    'nav.notifications': 'Notifications',
    'nav.profile': 'Profile',

    'login.title': 'Sign in',
    'login.subtitle': 'Welcome back to NexusMarket',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.remember': 'Remember me',
    'login.forgot': 'Forgot password?',
    'login.submit': 'Sign in',
    'login.or': 'Or sign in with',
    'login.noAccount': "Don’t have an account?",
    'login.signup': 'Create one',
    'login.heroBadge': 'NexusMarket',
    'login.heroTitle': 'Unlock Digital Wealth',
    'login.heroSubtitle': 'Connect to the premier MMO marketplace and explore premium trading tools.',
    'login.statActive': 'Active',
    'login.statTraders': 'Traders',
    'login.statVolume': 'Volume',

    'register.title': 'Sign up',
    'register.subtitle': 'Create a new account to start trading',
    'register.fullName': 'Full name',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.confirmPassword': 'Confirm password',
    'register.agreePrefix': 'I agree to the',
    'register.terms': 'Terms',
    'register.privacy': 'Privacy Policy',
    'register.submit': 'Create account',
    'register.or': 'Or sign up with',
    'register.haveAccount': 'Already have an account?',
    'register.loginNow': 'Sign in now',
    'register.heroBadge': 'NexusMarket',
    'register.heroTitle': 'Join NexusMarket',
    'register.heroSubtitle': 'Create an account to access deals and track new transactions.',
    'register.statBenefits': 'Benefits',
    'register.statSecurity': 'Security',
    'register.statSupport': 'Support',

    'home.badge': 'Spring sale 2024',
    'home.title': 'Supercharge Your Digital Empire',
    'home.subtitle': 'Get up to 50% off on premium automation tools, SEO scripts, and aged accounts. Limited time offer.',
    'home.ctaExplore': 'Explore Marketplace',
    'home.ctaSeller': 'Become a Seller',
    'home.browse': 'Browse by Category',

    'marketplace.title': 'Marketplace',
    'marketplace.subtitle': 'Explore top MMO products',
    'marketplace.filterAll': 'All',
    'marketplace.filterTools': 'Tools',
    'marketplace.filterServices': 'Services',
    'marketplace.filterSoftware': 'Software',
    'marketplace.filterCourses': 'Courses',

    'product.details': 'Details',
    'product.addToCart': 'Add to cart',
    'product.by': 'By',
    'product.server': 'Server',
    'product.reviews': 'reviews',
    'product.inWishlist': 'In wishlist',
    'product.addWishlist': 'Wishlist',

    'cart.title': 'Cart',
    'cart.subtitle': 'Review your selected items',
    'cart.empty': 'Your cart is empty',
    'cart.continue': 'Continue shopping',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.remove': 'Remove',

    'checkout.title': 'Checkout',
    'checkout.subtitle': 'Complete your order',
    'checkout.placeOrder': 'Place order',

    'wishlist.title': 'Wishlist',
    'wishlist.subtitle': 'Items you saved for later',
    'wishlist.empty': 'Your wishlist is empty',

    'orders.title': 'Orders',
    'orders.subtitle': 'Track your purchase history',

    'profile.title': 'Personal Information',
    'profile.subtitle': 'Manage your account details and profile settings.',
    'profile.logout': 'Log out',

    'footer.about': 'NexusMarket is a trusted MMO marketplace for tools, accounts, and digital services.',
    'footer.links': 'Links',
    'footer.support': 'Support',
    'footer.legal': 'Legal',
  },
} as const;

const I18nContext = createContext<I18nContextValue | null>(null);

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'vi';
  const stored = localStorage.getItem('lang');
  return stored === 'en' ? 'en' : 'vi';
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('vi');

  // Sync from localStorage AFTER hydration to avoid mismatch
  useEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'en') setLanguageState('en');
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lang', lang);
  }, []);

  const t = useCallback(
    (key: keyof typeof translations['vi']) => {
      const dict = translations[language] as Dictionary;
      return dict[key] || translations.vi[key] || String(key);
    },
    [language],
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
};
