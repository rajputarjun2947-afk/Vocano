import { Coupon } from '@/types';

export const MOCK_COUPONS: Coupon[] = [
  {
    id: 'c1',
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    minPurchase: 2000,
    maxDiscount: 500,
    expiryDate: '2026-12-31',
    active: true,
  },
  {
    id: 'c2',
    code: 'FLAT500',
    discount: 500,
    type: 'fixed',
    minPurchase: 5000,
    expiryDate: '2026-12-31',
    active: true,
  },
  {
    id: 'c3',
    code: 'MEGA20',
    discount: 20,
    type: 'percentage',
    minPurchase: 10000,
    maxDiscount: 2000,
    expiryDate: '2026-12-31',
    active: true,
  },
];
