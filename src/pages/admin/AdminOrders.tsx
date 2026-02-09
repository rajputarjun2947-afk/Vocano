import { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '@/lib/storage';
import { Order } from '@/types';
import { showToast } from '@/lib/toast';

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.orderStatus === filter);

  const handleStatusUpdate = (orderId: string, newStatus: Order['orderStatus']) => {
    updateOrderStatus(orderId, newStatus);
    setOrders(getOrders());
    showToast('Order status updated successfully', 'success');
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

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-light mb-8">Orders Management</h1>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-sm text-sm ${
              filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-sm text-sm ${
              filter === 'pending' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-sm text-sm ${
              filter === 'confirmed' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter('shipped')}
            className={`px-4 py-2 rounded-sm text-sm ${
              filter === 'shipped' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            Shipped
          </button>
          <button
            onClick={() => setFilter('delivered')}
            className={`px-4 py-2 rounded-sm text-sm ${
              filter === 'delivered' ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            Delivered
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">{order.shippingAddress.name}</td>
                  <td className="px-6 py-4 text-sm font-semibold">₹{order.finalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm uppercase">{order.paymentMethod}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['orderStatus'])}
                        className="px-3 py-1 border border-gray-200 rounded-sm text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="packed">Packed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
