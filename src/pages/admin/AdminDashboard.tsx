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
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-slate-600">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <ShoppingBag size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{orders.length}</p>
          <p className="text-sm text-blue-100">Total Orders</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-green-100">Total Revenue</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Users size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{users.filter(u => u.role === 'customer').length}</p>
          <p className="text-sm text-purple-100">Total Customers</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Package size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{products.length}</p>
          <p className="text-sm text-orange-100">Total Products</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {recentOrders.length > 0 ? recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 hover:bg-slate-50 p-3 rounded-lg transition-colors">
                <div>
                  <p className="font-medium text-sm text-slate-800">{order.id}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">₹{order.finalAmount.toLocaleString()}</p>
                  <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-center text-slate-500 py-8">No orders yet</p>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Top Products</h2>
            <Link to="/admin/products" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {topProducts.map(product => (
              <div key={product.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 hover:bg-slate-50 p-3 rounded-lg transition-colors">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded-lg shadow-sm"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm line-clamp-1 text-slate-800">{product.name}</p>
                  <p className="text-xs text-slate-500">
                    {product.reviews} reviews • ★ {product.rating}
                  </p>
                </div>
                <p className="font-semibold text-sm text-slate-800">₹{product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
