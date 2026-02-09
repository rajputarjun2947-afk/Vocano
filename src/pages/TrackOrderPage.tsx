import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrders } from '@/lib/storage';
import { Order } from '@/types';
import { Check, Circle } from 'lucide-react';

export function TrackOrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orders = getOrders();
    const foundOrder = orders.find(o => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Order not found</p>
      </div>
    );
  }

  const statuses = [
    { key: 'pending', label: 'Order Placed', time: order.createdAt },
    { key: 'confirmed', label: 'Confirmed', time: order.orderStatus !== 'pending' ? order.updatedAt : null },
    { key: 'packed', label: 'Packed', time: ['packed', 'shipped', 'delivered'].includes(order.orderStatus) ? order.updatedAt : null },
    { key: 'shipped', label: 'Shipped', time: ['shipped', 'delivered'].includes(order.orderStatus) ? order.updatedAt : null },
    { key: 'delivered', label: 'Delivered', time: order.orderStatus === 'delivered' ? order.updatedAt : null },
  ];

  const currentStatusIndex = statuses.findIndex(s => s.key === order.orderStatus);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-light mb-8">Track Order</h1>

        <div className="bg-white border border-gray-200 p-8 rounded-sm mb-8">
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order ID</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Expected Delivery</p>
              <p className="font-medium">
                {new Date(new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {order.orderStatus === 'cancelled' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✕</span>
              </div>
              <h2 className="text-2xl font-light mb-2">Order Cancelled</h2>
              <p className="text-muted-foreground">
                This order has been cancelled
              </p>
            </div>
          ) : (
            <div className="relative">
              {statuses.map((status, idx) => {
                const isCompleted = idx <= currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;

                return (
                  <div key={status.key} className="relative flex gap-4 pb-8 last:pb-0">
                    {idx < statuses.length - 1 && (
                      <div
                        className={`absolute left-5 top-12 w-0.5 h-full ${
                          isCompleted ? 'bg-gold' : 'bg-gray-200'
                        }`}
                      />
                    )}

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                        isCompleted ? 'bg-gold text-white' : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isCompleted ? <Check size={20} /> : <Circle size={20} />}
                    </div>

                    <div className="flex-1 pt-1">
                      <p className={`font-medium mb-1 ${isCurrent ? 'text-gold' : ''}`}>
                        {status.label}
                      </p>
                      {status.time && (
                        <p className="text-sm text-muted-foreground">
                          {new Date(status.time).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 p-8 rounded-sm">
          <h3 className="font-medium mb-4">Delivery Address</h3>
          <p className="text-sm">
            {order.shippingAddress.name}<br />
            {order.shippingAddress.addressLine1}<br />
            {order.shippingAddress.addressLine2 && <>{order.shippingAddress.addressLine2}<br /></>}
            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
            Phone: {order.shippingAddress.phone}
          </p>
        </div>
      </div>
    </div>
  );
}
