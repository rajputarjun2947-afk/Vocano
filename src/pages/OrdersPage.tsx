import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders, getProducts } from '@/lib/storage';
import { getStoredUser } from '@/lib/auth';
import { Order, Product } from '@/types';
import { Package } from 'lucide-react';

export function OrdersPage() {
  const user = getStoredUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (user) {
      setOrders(getUserOrders(user.id));
      setProducts(getProducts());
    }
  }, [user]);

  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  const getStatusColor = (status: Order['orderStatus']) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-orange-600 bg-orange-50';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <Package size={64} className="text-muted-foreground mb-4" />
        <h1 className="text-2xl font-light mb-2">No orders yet</h1>
        <p className="text-muted-foreground mb-8">Start shopping to see your orders here</p>
        <Link
          to="/products"
          className="bg-primary text-white px-8 py-3 rounded-sm hover:bg-primary/90 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-light mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-sm overflow-hidden">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Order ID</p>
                      <p className="font-medium text-sm">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Date</p>
                      <p className="font-medium text-sm">
                        {new Date(order.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total</p>
                      <p className="font-semibold text-sm">₹{order.finalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, idx) => {
                    const product = getProductDetails(item.productId);
                    if (!product) return null;

                    return (
                      <div key={idx} className="flex gap-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-sm"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                          </p>
                          <p className="font-medium mt-1">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
                  <Link
                    to={`/track-order/${order.id}`}
                    className="px-6 py-2 border border-gray-200 rounded-sm text-sm hover:border-gold transition-colors"
                  >
                    Track Order
                  </Link>
                  {order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
                    <Link
                      to={`/order-details/${order.id}`}
                      className="px-6 py-2 border border-gray-200 rounded-sm text-sm hover:border-gold transition-colors"
                    >
                      View Details
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
