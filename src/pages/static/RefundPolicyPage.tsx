export function RefundPolicyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-light mb-8">Refund & Cancellation Policy</h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <h2 className="text-2xl font-light text-foreground mt-8">Cancellation Policy</h2>
          
          <h3 className="text-xl font-medium text-foreground">Before Shipment</h3>
          <p>
            You can cancel your order anytime before it is shipped. Simply visit your order details
            and click on the "Cancel Order" button. Full refund will be processed within 5-7
            business days.
          </p>

          <h3 className="text-xl font-medium text-foreground">After Shipment</h3>
          <p>
            Once the order is shipped, it cannot be cancelled. However, you can refuse delivery or
            initiate a return once you receive the product.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">Return Policy</h2>
          
          <h3 className="text-xl font-medium text-foreground">7-Day Return Window</h3>
          <p>
            We offer easy returns within 7 days of delivery. To be eligible for a return:
          </p>
          <ul className="list-disc pl-6">
            <li>Product must be unused and in original condition</li>
            <li>Original packaging and tags must be intact</li>
            <li>Invoice must be included with the return</li>
          </ul>

          <h3 className="text-xl font-medium text-foreground">Non-Returnable Items</h3>
          <p>The following items cannot be returned:</p>
          <ul className="list-disc pl-6">
            <li>Customized or personalized products</li>
            <li>Intimate wear and personal care items</li>
            <li>Products marked as "non-returnable"</li>
          </ul>

          <h2 className="text-2xl font-light text-foreground mt-8">Refund Policy</h2>
          
          <h3 className="text-xl font-medium text-foreground">Refund Processing</h3>
          <p>
            Once we receive and inspect your return, we will process your refund within 5-7
            business days. Refunds will be credited to:
          </p>
          <ul className="list-disc pl-6">
            <li>Original payment method for prepaid orders</li>
            <li>Bank account for Cash on Delivery orders</li>
          </ul>

          <h3 className="text-xl font-medium text-foreground">Shipping Charges</h3>
          <p>
            Shipping charges are non-refundable. Return shipping costs will be borne by the
            customer unless the product is defective or incorrect.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">Exchange Policy</h2>
          <p>
            We offer exchanges for size or color variations. Please contact customer support to
            arrange an exchange. Exchange is subject to product availability.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">How to Initiate Return</h2>
          <ol className="list-decimal pl-6">
            <li>Visit "My Orders" in your account</li>
            <li>Select the order you want to return</li>
            <li>Click on "Return" and select reason</li>
            <li>Our team will arrange pickup within 2-3 business days</li>
          </ol>

          <h2 className="text-2xl font-light text-foreground mt-8">Contact Us</h2>
          <p>
            For any queries regarding returns or refunds, please contact our customer support at
            returns@vocano.com or call +91 1800-123-4567
          </p>
        </div>
      </div>
    </div>
  );
}
