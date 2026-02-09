export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-light mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p>Last updated: February 9, 2026</p>

          <h2 className="text-2xl font-light text-foreground mt-8">1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including your name, email address,
            phone number, shipping address, and payment information when you make a purchase.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6">
            <li>Process and fulfill your orders</li>
            <li>Send you order confirmations and updates</li>
            <li>Respond to your requests and provide customer support</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our products and services</li>
          </ul>

          <h2 className="text-2xl font-light text-foreground mt-8">3. Information Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your
            information with service providers who assist us in operating our website and conducting
            our business.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from
            unauthorized access, disclosure, alteration, or destruction.
          </p>

          <h2 className="text-2xl font-light text-foreground mt-8">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2 className="text-2xl font-light text-foreground mt-8">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at
            privacy@vocano.com
          </p>
        </div>
      </div>
    </div>
  );
}
