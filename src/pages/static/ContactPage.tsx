export function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-light mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-light mb-6">Get in Touch</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-1">Email</h3>
                <p>support@vocano.com</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Phone</h3>
                <p>+91 1800-123-4567</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Address</h3>
                <p>
                  Vocano Headquarters<br />
                  123 Premium Plaza<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Business Hours</h3>
                <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-light mb-6">Send us a Message</h2>
            <form className="space-y-4">
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
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-8 py-3 rounded-sm hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
