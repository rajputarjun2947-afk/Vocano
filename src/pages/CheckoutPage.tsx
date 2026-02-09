import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, getProducts, getAddresses, applyCoupon, saveOrder, clearCart, addNotification } from '@/lib/storage';
import { getStoredUser } from '@/lib/auth';
import { CartItem, Product, Address, Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { showToast } from '@/lib/toast';
import { Plus } from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setCart(getCart());
    setProducts(getProducts());
    const userAddresses = getAddresses(user.id);
    setAddresses(userAddresses);
    
    if (userAddresses.length > 0) {
      const defaultAddr = userAddresses.find(a => a.isDefault) || userAddresses[0];
      setSelectedAddress(defaultAddr.id);
    }
  }, [user, navigate]);

  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 5000 ? 0 : 50;
  const total = subtotal + deliveryCharge - discount;

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode, subtotal);
    
    if (result.valid) {
      setDiscount(result.discount);
      showToast(result.message, 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.addressLine1 || 
        !newAddress.city || !newAddress.state || !newAddress.pincode) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    const address: Address = {
      id: `addr-${Date.now()}`,
      ...newAddress,
      isDefault: addresses.length === 0,
    };

    const updatedAddresses = [...addresses, address];
    setAddresses(updatedAddresses);
    setSelectedAddress(address.id);
    setShowAddressForm(false);
    showToast('Address added successfully', 'success');
    
    // Save to storage
    import('@/lib/storage').then(({ saveAddress }) => {
      if (user) saveAddress(user.id, address);
    });
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      showToast('Please select a delivery address', 'error');
      return;
    }

    if (!paymentMethod) {
      showToast('Please select a payment method', 'error');
      return;
    }

    const address = addresses.find(a => a.id === selectedAddress);
    if (!address || !user) return;

    const order: Order = {
      id: `ORD-${Date.now()}`,
      userId: user.id,
      items: cart,
      totalAmount: subtotal,
      discount,
      deliveryCharge,
      finalAmount: total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
      orderStatus: 'pending',
      shippingAddress: address,
      couponCode: couponCode || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveOrder(order);
    clearCart();
    
    // Add notification
    addNotification({
      id: `notif-${Date.now()}`,
      userId: user.id,
      title: 'Order Placed Successfully',
      message: `Your order ${order.id} has been placed successfully.`,
      type: 'order',
      read: false,
      createdAt: new Date().toISOString(),
    });

    window.dispatchEvent(new Event('cartUpdate'));
    showToast('Order placed successfully!', 'success');
    
    setTimeout(() => {
      navigate(`/order-confirmation/${order.id}`);
    }, 1000);
  };

  if (!user) return null;

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-light mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address */}
            <div className="bg-white border border-gray-200 p-6 rounded-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">Delivery Address</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddressForm(!showAddressForm)}
                >
                  <Plus size={16} className="mr-2" />
                  Add New
                </Button>
              </div>

              {showAddressForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-sm space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name *</Label>
                      <Input
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Phone *</Label>
                      <Input
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Address Line 1 *</Label>
                    <Input
                      value={newAddress.addressLine1}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Address Line 2</Label>
                    <Input
                      value={newAddress.addressLine2}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>City *</Label>
                      <Input
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>State *</Label>
                      <Input
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Pincode *</Label>
                      <Input
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button onClick={handleAddAddress}>Save Address</Button>
                </div>
              )}

              <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                <div className="space-y-3">
                  {addresses.map(address => (
                    <div
                      key={address.id}
                      className="flex items-start space-x-3 p-4 border border-gray-200 rounded-sm"
                    >
                      <RadioGroupItem value={address.id} id={address.id} />
                      <label htmlFor={address.id} className="flex-1 cursor-pointer">
                        <p className="font-medium">{address.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.addressLine1}, {address.addressLine2 && `${address.addressLine2}, `}
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-sm text-muted-foreground">Phone: {address.phone}</p>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {addresses.length === 0 && !showAddressForm && (
                <p className="text-muted-foreground text-center py-8">
                  No addresses found. Please add a new address.
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-gray-200 p-6 rounded-sm">
              <h2 className="text-xl font-medium mb-4">Payment Method</h2>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-sm">
                    <RadioGroupItem value="upi" id="upi" />
                    <label htmlFor="upi" className="flex-1 cursor-pointer">
                      <p className="font-medium">UPI</p>
                      <p className="text-sm text-muted-foreground">Pay via Google Pay, PhonePe, Paytm</p>
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-sm">
                    <RadioGroupItem value="card" id="card" />
                    <label htmlFor="card" className="flex-1 cursor-pointer">
                      <p className="font-medium">Credit / Debit Card</p>
                      <p className="text-sm text-muted-foreground">Visa, MasterCard, Rupay</p>
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-sm">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <label htmlFor="netbanking" className="flex-1 cursor-pointer">
                      <p className="font-medium">Net Banking</p>
                      <p className="text-sm text-muted-foreground">All major banks supported</p>
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-sm">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <label htmlFor="wallet" className="flex-1 cursor-pointer">
                      <p className="font-medium">Wallet</p>
                      <p className="text-sm text-muted-foreground">Paytm, PhonePe, Amazon Pay</p>
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-sm">
                    <RadioGroupItem value="cod" id="cod" />
                    <label htmlFor="cod" className="flex-1 cursor-pointer">
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">Pay when you receive</p>
                    </label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm sticky top-24">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {cart.map((item, idx) => {
                  const product = getProductDetails(item.productId);
                  if (!product) return null;

                  return (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {product.name} × {item.quantity}
                      </span>
                      <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  />
                  <Button variant="outline" onClick={handleApplyCoupon}>
                    Apply
                  </Button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>- ₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between mb-6">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-lg">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Button onClick={handlePlaceOrder} className="w-full">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
