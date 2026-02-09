export function FAQPage() {
  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Browse our products, add items to your cart, and proceed to checkout. You can pay using multiple payment methods including UPI, cards, net banking, and cash on delivery.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept UPI, Credit/Debit Cards, Net Banking, Wallets, and Cash on Delivery.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 5-7 business days. You can track your order status from your account.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer easy returns within 7 days of delivery. Products must be unused and in original packaging.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we only ship within India. International shipping will be available soon.',
    },
    {
      question: 'How can I track my order?',
      answer: 'You can track your order from the "My Orders" section in your account. You will also receive tracking updates via email and SMS.',
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Yes, you can cancel your order before it is shipped. Once shipped, you can return it after delivery.',
    },
    {
      question: 'How do I use a coupon code?',
      answer: 'Enter your coupon code at checkout in the designated field. The discount will be applied to your order total.',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-light mb-8">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-gray-200 p-6 rounded-sm">
              <h3 className="font-medium mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 border border-gray-200 p-8 rounded-sm text-center">
          <h2 className="text-2xl font-light mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our customer support team is here to help
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-3 rounded-sm hover:bg-primary/90 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
