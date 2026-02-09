import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, getProducts } from '@/lib/storage';
import { getAllUsers } from '@/lib/auth';
import { Order, Product, User } from '@/types';
import { Package, Users, ShoppingBag, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setOrders(getOrders());
    setProducts(getProducts());
    setUsers(getAllUsers());
  }, []);

  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'completed')
    .reduce((sum, o) => sum + o.finalAmount, 0);

  const recentOrders = orders.slice(0, 5);
  const topProducts = products
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 5);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-light mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border border-gray-200 p-6 rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="text-blue-600" size={24} />
              </div>
            </div>
            <p className="text-2xl font-semibold mb-1">{orders.length}</p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
            <p className="text-2xl font-semibold mb-1">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
            <p className="text-2xl font-semibold mb-1">{users.filter(u => u.role === 'customer').length}</p>
            <p className="text-sm text-muted-foreground">Total Customers</p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Package className="text-orange-600" size={24} />
              </div>
            </div>
            <p className="text-2xl font-semibold mb-1">{products.length}</p>
            <p className="text-sm text-muted-foreground">Total Products</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white border border-gray-200 p-6 rounded-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Recent Orders</h2>
              <Link to="/admin/orders" className="text-sm text-gold hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">₹{order.finalAmount.toLocaleString()}</p>
                    <span className="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white border border-gray-200 p-6 rounded-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Top Products</h2>
              <Link to="/admin/products" className="text-sm text-gold hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {topProducts.map(product => (
                <div key={product.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-sm"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.reviews} reviews • ★ {product.rating}
                    </p>
                  </div>
                  <p className="font-semibold text-sm">₹{product.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
