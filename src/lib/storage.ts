import { CartItem, Order, Address, Notification, Product, Coupon } from '@/types';
import { MOCK_PRODUCTS } from '@/constants/products';
import { MOCK_COUPONS } from '@/constants/coupons';

// Cart Management
export const getCart = (): CartItem[] => {
  const cartStr = localStorage.getItem('vocano_cart');
  return cartStr ? JSON.parse(cartStr) : [];
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem('vocano_cart', JSON.stringify(cart));
};

export const addToCart = (item: CartItem) => {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    i => i.productId === item.productId && i.size === item.size && i.color === item.color
  );
  
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }
  
  saveCart(cart);
};

export const updateCartItem = (productId: string, size: string, color: string, quantity: number) => {
  const cart = getCart();
  const itemIndex = cart.findIndex(
    i => i.productId === productId && i.size === size && i.color === color
  );
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    saveCart(cart);
  }
};

export const removeFromCart = (productId: string, size: string, color: string) => {
  const cart = getCart().filter(
    i => !(i.productId === productId && i.size === size && i.color === color)
  );
  saveCart(cart);
};

export const clearCart = () => {
  localStorage.removeItem('vocano_cart');
};

// Orders Management
export const getOrders = (): Order[] => {
  const ordersStr = localStorage.getItem('vocano_orders');
  return ordersStr ? JSON.parse(ordersStr) : [];
};

export const saveOrder = (order: Order) => {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem('vocano_orders', JSON.stringify(orders));
};

export const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex >= 0) {
    orders[orderIndex].orderStatus = status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    localStorage.setItem('vocano_orders', JSON.stringify(orders));
  }
};

export const getUserOrders = (userId: string): Order[] => {
  return getOrders().filter(o => o.userId === userId);
};

// Addresses Management
export const getAddresses = (userId: string): Address[] => {
  const addressesStr = localStorage.getItem(`vocano_addresses_${userId}`);
  return addressesStr ? JSON.parse(addressesStr) : [];
};

export const saveAddress = (userId: string, address: Address) => {
  const addresses = getAddresses(userId);
  const existingIndex = addresses.findIndex(a => a.id === address.id);
  
  if (existingIndex >= 0) {
    addresses[existingIndex] = address;
  } else {
    addresses.push(address);
  }
  
  localStorage.setItem(`vocano_addresses_${userId}`, JSON.stringify(addresses));
};

export const deleteAddress = (userId: string, addressId: string) => {
  const addresses = getAddresses(userId).filter(a => a.id !== addressId);
  localStorage.setItem(`vocano_addresses_${userId}`, JSON.stringify(addresses));
};

// Wishlist Management
export const getWishlist = (userId: string): string[] => {
  const wishlistStr = localStorage.getItem(`vocano_wishlist_${userId}`);
  return wishlistStr ? JSON.parse(wishlistStr) : [];
};

export const toggleWishlist = (userId: string, productId: string) => {
  const wishlist = getWishlist(userId);
  const index = wishlist.indexOf(productId);
  
  if (index >= 0) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
  }
  
  localStorage.setItem(`vocano_wishlist_${userId}`, JSON.stringify(wishlist));
};

// Notifications Management
export const getNotifications = (userId: string): Notification[] => {
  const notificationsStr = localStorage.getItem(`vocano_notifications_${userId}`);
  return notificationsStr ? JSON.parse(notificationsStr) : [];
};

export const addNotification = (notification: Notification) => {
  const notifications = getNotifications(notification.userId);
  notifications.unshift(notification);
  localStorage.setItem(`vocano_notifications_${notification.userId}`, JSON.stringify(notifications));
};

export const markNotificationRead = (userId: string, notificationId: string) => {
  const notifications = getNotifications(userId);
  const notification = notifications.find(n => n.id === notificationId);
  
  if (notification) {
    notification.read = true;
    localStorage.setItem(`vocano_notifications_${userId}`, JSON.stringify(notifications));
  }
};

// Products Management (Admin)
export const getProducts = (): Product[] => {
  const productsStr = localStorage.getItem('vocano_products');
  return productsStr ? JSON.parse(productsStr) : MOCK_PRODUCTS;
};

export const saveProduct = (product: Product) => {
  const products = getProducts();
  const existingIndex = products.findIndex(p => p.id === product.id);
  
  if (existingIndex >= 0) {
    products[existingIndex] = product;
  } else {
    products.push(product);
  }
  
  localStorage.setItem('vocano_products', JSON.stringify(products));
};

export const deleteProduct = (productId: string) => {
  const products = getProducts().filter(p => p.id !== productId);
  localStorage.setItem('vocano_products', JSON.stringify(products));
};

// Coupons Management (Admin)
export const getCoupons = (): Coupon[] => {
  const couponsStr = localStorage.getItem('vocano_coupons');
  return couponsStr ? JSON.parse(couponsStr) : MOCK_COUPONS;
};

export const saveCoupon = (coupon: Coupon) => {
  const coupons = getCoupons();
  const existingIndex = coupons.findIndex(c => c.id === coupon.id);
  
  if (existingIndex >= 0) {
    coupons[existingIndex] = coupon;
  } else {
    coupons.push(coupon);
  }
  
  localStorage.setItem('vocano_coupons', JSON.stringify(coupons));
};

export const deleteCoupon = (couponId: string) => {
  const coupons = getCoupons().filter(c => c.id !== couponId);
  localStorage.setItem('vocano_coupons', JSON.stringify(coupons));
};

export const applyCoupon = (code: string, totalAmount: number): { valid: boolean; discount: number; message: string } => {
  const coupons = getCoupons();
  const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.active);
  
  if (!coupon) {
    return { valid: false, discount: 0, message: 'Invalid coupon code' };
  }
  
  const now = new Date();
  const expiry = new Date(coupon.expiryDate);
  
  if (now > expiry) {
    return { valid: false, discount: 0, message: 'Coupon has expired' };
  }
  
  if (totalAmount < coupon.minPurchase) {
    return { valid: false, discount: 0, message: `Minimum purchase of ₹${coupon.minPurchase} required` };
  }
  
  let discount = 0;
  if (coupon.type === 'percentage') {
    discount = (totalAmount * coupon.discount) / 100;
    if (coupon.maxDiscount) {
      discount = Math.min(discount, coupon.maxDiscount);
    }
  } else {
    discount = coupon.discount;
  }
  
  return { valid: true, discount, message: 'Coupon applied successfully!' };
};
