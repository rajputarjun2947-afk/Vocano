export function SupportPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-light mb-8">Customer Support</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-gray-200 p-6 rounded-sm text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <h3 className="font-medium mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get help via email
            </p>
            <a href="mailto:support@vocano.com" className="text-gold hover:underline text-sm">
              support@vocano.com
            </a>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h3 className="font-medium mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Mon-Sat, 10 AM - 7 PM
            </p>
            <a href="tel:+911800-123-4567" className="text-gold hover:underline text-sm">
              +91 1800-123-4567
            </a>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-sm text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="font-medium mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Chat with our team
            </p>
            <button className="text-gold hover:underline text-sm">
              Start Chat
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-8 rounded-sm">
          <h2 className="text-2xl font-light mb-6">Submit a Support Request</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Order ID (if applicable)</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-sm"
                placeholder="ORD-123456"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Issue Type</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-sm">
                <option>Select issue type</option>
                <option>Order Related</option>
                <option>Payment Issue</option>
                <option>Product Quality</option>
                <option>Delivery Issue</option>
                <option>Return/Refund</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 border border-gray-200 rounded-sm"
                placeholder="Please describe your issue in detail..."
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-sm hover:bg-primary/90 transition-colors"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
