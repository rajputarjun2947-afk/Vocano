import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrders, getProducts } from '@/lib/storage';
import { getStoredUser } from '@/lib/auth';
import { Order, Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export function OrderConfirmationPage() {
  const { id } = useParams();
  const user = getStoredUser();
  const [order, setOrder] = useState<Order | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const orders = getOrders();
    const foundOrder = orders.find(o => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    }
    setProducts(getProducts());
  }, [id]);

  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Order not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-light mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground">
            Your order has been confirmed and will be delivered soon
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-8 rounded-sm mb-8">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order ID</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Date</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
              <p className="font-medium">{order.paymentMethod.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="font-semibold text-lg">₹{order.finalAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="font-medium mb-4">Delivery Address</h3>
            <p className="text-sm">
              {order.shippingAddress.name}<br />
              {order.shippingAddress.addressLine1}<br />
              {order.shippingAddress.addressLine2 && <>{order.shippingAddress.addressLine2}<br /></>}
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
              Phone: {order.shippingAddress.phone}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-medium mb-4">Order Items</h3>
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
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                      </p>
                      <p className="font-medium mt-1">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Link to="/orders" className="flex-1">
            <Button variant="outline" className="w-full">
              View All Orders
            </Button>
          </Link>
          <Link to="/products" className="flex-1">
            <Button className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
