export function ShippingPolicyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-light mb-8">Shipping Policy</h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <h2 className="text-2xl font-light text-foreground mt-8">Shipping Areas</h2>
          <p>
            We currently ship to all locations within India. International shipping is not
            available at this time but will be introduced soon.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">Delivery Time</h2>
          
          <h3 className="text-xl font-medium text-foreground">Standard Delivery</h3>
          <p>
            Standard delivery takes 5-7 business days from the date of order confirmation.
            Delivery time may vary based on your location and product availability.
          </p>

          <h3 className="text-xl font-medium text-foreground">Metro Cities</h3>
          <p>
            Orders to metro cities (Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata) are
            typically delivered within 3-5 business days.
          </p>

          <h3 className="text-xl font-medium text-foreground">Remote Areas</h3>
          <p>
            Delivery to remote areas may take 7-10 business days. Additional charges may apply
            for certain pin codes.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">Shipping Charges</h2>
          <ul className="list-disc pl-6">
            <li>FREE shipping on orders above ₹5,000</li>
            <li>₹50 shipping charge for orders below ₹5,000</li>
            <li>Additional charges may apply for remote locations</li>
          </ul>

          <h2 className="text-2xl font-light text-foreground mt-8">Order Tracking</h2>
          <p>
            Once your order is shipped, you will receive a tracking number via email and SMS.
            You can track your order status in real-time from the "Track Order" section in your
            account.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">Order Processing</h2>
          <p>
            Orders are processed within 24-48 hours of placement. You will receive an order
            confirmation email immediately after placing your order, followed by a shipping
            confirmation once the order is dispatched.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">Multiple Items</h2>
          <p>
            If you order multiple items, they may be shipped separately based on availability.
            You will receive separate tracking information for each shipment.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">Address Changes</h2>
          <p>
            Address changes are only possible before the order is shipped. Please contact customer
            support immediately if you need to change your delivery address.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">Failed Delivery</h2>
          <p>
            If delivery fails due to incorrect address or recipient unavailability, our courier
            partner will make 2-3 additional delivery attempts. If delivery still fails, the order
            will be returned to us and a refund will be processed.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">Delivery Partner</h2>
          <p>
            We work with trusted delivery partners to ensure safe and timely delivery of your
            orders. Our partners include Blue Dart, DTDC, and local courier services.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">Contact Us</h2>
          <p>
            For shipping-related queries, please contact us at shipping@vocano.com or call
            +91 1800-123-4567
          </p>
        </div>
      </div>
    </div>
  );
}
