import { Product, Order, PurchasedProduct } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bot tăng trưởng InstaAuto 2.0',
    category: 'Software',
    price: 149.00,
    rating: 4.9,
    reviews: 128,
    seller: {
      name: 'DigitalWizard',
      isPro: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DigitalWizard'
    },
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    description: 'Công cụ tự động nâng cao cho tăng trưởng mạng xã hội với tính năng tương tác dùng AI.',
  },
  {
    id: '2',
    name: 'Tài khoản LinkedIn lâu năm (2015+)',
    category: 'Accounts',
    price: 25.00,
    rating: 4.7,
    reviews: 85,
    seller: {
      name: 'SafeAccess',
      isPro: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SafeAccess'
    },
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
    description: 'Tài khoản LinkedIn lâu năm chất lượng cao, có lịch sử và kết nối ổn định.',
  },
  {
    id: '3',
    name: 'Backlink guest post cao cấp',
    category: 'Services',
    price: 89.99,
    rating: 5.0,
    reviews: 210,
    seller: {
      name: 'LinkBuilderPro',
      isPro: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LinkBuilderPro'
    },
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    description: 'Backlink guest post chất lượng cao từ website cùng chủ đề để tăng SEO.',
  },
  {
    id: '4',
    name: 'Thành thạo Dropshipping 2024',
    category: 'Courses',
    price: 199.00,
    rating: 4.8,
    reviews: 342,
    seller: {
      name: 'CourseKings',
      isPro: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CourseKings'
    },
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
    description: 'Hướng dẫn đầy đủ để xây dựng mô hình dropshipping thành công từ đầu trong năm 2024.',
  },
  {
    id: '5',
    name: '500.000 WoW Gold - Giao ngay',
    category: 'Tools',
    price: 39.99,
    oldPrice: 45.00,
    rating: 4.9,
    reviews: 2143,
    seller: {
      name: 'GoldMaster_US',
      isPro: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GoldMaster'
    },
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2168&auto=format&fit=crop',
    description: 'Giao WoW gold nhanh và an toàn tại máy chủ Illidan. 100% cày thủ công.',
    server: 'Illidan'
  },
  {
    id: '6',
    name: 'Boost danh hiệu Gladiator kèm mount',
    category: 'Services',
    price: 350.00,
    rating: 5.0,
    reviews: 89,
    seller: {
      name: 'PvP_Kings',
      isPro: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PvPKings'
    },
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2130&auto=format&fit=crop',
    description: 'Dịch vụ PvP chuyên nghiệp để nhận danh hiệu Gladiator và thú cưỡi.',
    server: 'Stormrage'
  },
  {
    id: '7',
    name: 'Dịch vụ SEO website tổng thể',
    category: 'Services',
    price: 299.00,
    rating: 4.8,
    reviews: 156,
    seller: {
      name: 'SEO_Master_VN',
      isPro: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SEOMaster'
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    description: 'Tối ưu SEO toàn diện: on-page, off-page, kỹ thuật. Cam kết top 10 Google trong 3 tháng.'
  },
  {
    id: '8',
    name: 'Chạy quảng cáo Facebook & Google Ads',
    category: 'Services',
    price: 199.00,
    rating: 4.9,
    reviews: 312,
    seller: {
      name: 'Ads_Guru',
      isPro: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdsGuru'
    },
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop',
    description: 'Quản lý và tối ưu chiến dịch quảng cáo Facebook, Google. ROI cam kết tối thiểu 3x.'
  },
  {
    id: '9',
    name: 'Viết content marketing chuyên nghiệp',
    category: 'Services',
    price: 49.99,
    rating: 4.7,
    reviews: 428,
    seller: {
      name: 'ContentPro_VN',
      isPro: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ContentPro'
    },
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073&auto=format&fit=crop',
    description: 'Bài viết chuẩn SEO, hấp dẫn, tối ưu chuyển đổi cho website và mạng xã hội.'
  },
  {
    id: '10',
    name: 'Thiết kế logo & nhận diện thương hiệu',
    category: 'Services',
    price: 149.00,
    rating: 5.0,
    reviews: 87,
    seller: {
      name: 'DesignStudio',
      isPro: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DesignStudio'
    },
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
    description: 'Thiết kế logo chuyên nghiệp, bộ nhận diện thương hiệu hoàn chỉnh. Bao gồm 3 lần chỉnh sửa.'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-99281',
    productName: 'Vàng Elder Scrolls (10M)',
    date: '24/10/2023',
    status: 'Completed',
    price: 45.00,
    icon: 'Coins'
  },
  {
    id: 'ORD-99105',
    productName: 'Nhân vật WoW Classic cấp 60 (Warrior)',
    date: '20/10/2023',
    status: 'Pending',
    price: 120.00,
    icon: 'Sword'
  },
  {
    id: 'ORD-98872',
    productName: 'Mũ tiệc RuneScape hiếm',
    date: '15/10/2023',
    status: 'Cancelled',
    price: 4999.00,
    icon: 'Gem'
  },
  {
    id: 'ORD-98540',
    productName: 'Vàng FFXIV (50M)',
    date: '10/10/2023',
    status: 'Completed',
    price: 78.00,
    icon: 'RefreshCcw'
  }
];

export const MOCK_PURCHASED_PRODUCTS: PurchasedProduct[] = [
  {
    id: 'PUR-001',
    productId: '1',
    name: 'Bot tăng trưởng InstaAuto 2.0',
    category: 'Software',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    price: 149.00,
    purchaseDate: '15/01/2024',
    licenseKey: 'INSTA-AUTO2-2024-PRO-X1Y2Z3',
    downloadUrl: '#download',
    expiryDate: '15/01/2025',
    instructions: 'https://docs.example.com/instaauto-guide',
    videoUrl: 'https://youtube.com/watch?v=example',
    supportUrl: 'https://support.example.com/instaauto',
    status: 'active'
  },
  {
    id: 'PUR-002',
    productId: '2',
    name: 'Tài khoản LinkedIn lâu năm (2015+)',
    category: 'Accounts',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
    price: 25.00,
    purchaseDate: '20/12/2023',
    licenseKey: 'LINKEDIN-2015-ACC-8X9Y0Z',
    downloadUrl: '#access',
    instructions: 'https://docs.example.com/linkedin-guide',
    supportUrl: 'https://support.example.com/linkedin',
    status: 'active'
  },
  {
    id: 'PUR-003',
    productId: '4',
    name: 'Thành thạo Dropshipping 2024',
    category: 'Courses',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
    price: 199.00,
    purchaseDate: '10/01/2024',
    downloadUrl: '#course-access',
    expiryDate: '10/01/2026',
    instructions: 'https://docs.example.com/dropshipping-guide',
    videoUrl: 'https://youtube.com/watch?v=dropshipping',
    supportUrl: 'https://support.example.com/course',
    status: 'active'
  },
  {
    id: 'PUR-004',
    productId: '3',
    name: 'Backlink guest post cao cấp',
    category: 'Services',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    price: 89.99,
    purchaseDate: '05/11/2023',
    licenseKey: 'BACKLINK-PRO-2023-A1B2C3',
    expiryDate: '05/01/2024',
    instructions: 'https://docs.example.com/backlink-guide',
    supportUrl: 'https://support.example.com/backlink',
    status: 'expired'
  },
  {
    id: 'PUR-005',
    productId: '5',
    name: '500.000 WoW Gold - Giao ngay',
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2168&auto=format&fit=crop',
    price: 39.99,
    purchaseDate: '28/01/2024',
    licenseKey: 'WOW-GOLD-500K-SRV-ILL',
    downloadUrl: '#delivery',
    instructions: 'https://docs.example.com/wow-gold',
    supportUrl: 'https://support.example.com/wow',
    status: 'active'
  }
];
