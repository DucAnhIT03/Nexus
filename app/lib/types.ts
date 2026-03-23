export type Category = 'Accounts' | 'Tools' | 'Services' | 'Software' | 'Courses';

export const CATEGORY_LABELS: Record<Category, string> = {
  Accounts: 'Tài khoản',
  Tools: 'Công cụ',
  Services: 'Dịch vụ',
  Software: 'Phần mềm',
  Courses: 'Tài khoản AI',
};

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  seller: {
    name: string;
    isPro: boolean;
    avatar: string;
  };
  image: string;
  description: string;
  server?: string;
}

export interface Order {
  id: string;
  productName: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  price: number;
  icon: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {}

export interface PurchasedProduct {
  id: string;
  productId: string;
  name: string;
  category: Category;
  image: string;
  price: number;
  purchaseDate: string;
  licenseKey?: string;
  downloadUrl?: string;
  expiryDate?: string;
  instructions?: string;
  videoUrl?: string;
  supportUrl?: string;
  status: 'active' | 'expired' | 'suspended';
}

export const ORDER_STATUS_LABELS: Record<Order['status'], string> = {
  Completed: 'Hoàn tất',
  Pending: 'Đang xử lý',
  Cancelled: 'Đã huỷ',
};

export const PURCHASE_STATUS_LABELS: Record<PurchasedProduct['status'], string> = {
  active: 'Hoạt động',
  expired: 'Hết hạn',
  suspended: 'Tạm ngưng',
};
