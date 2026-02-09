export function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-light mb-8">About Vocano</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            Vocano is a premium lifestyle brand dedicated to bringing you the finest selection
            of curated products for modern living.
          </p>

          <h2 className="text-2xl font-light mt-12 mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-6">
            Founded with a vision to redefine luxury living, Vocano brings together the best
            in fashion, home décor, and lifestyle products. We believe that quality and design
            should be accessible to those who appreciate the finer things in life.
          </p>

          <h2 className="text-2xl font-light mt-12 mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            To curate a collection of premium products that enhance your lifestyle and bring
            joy to everyday moments. We're committed to quality, sustainability, and exceptional
            customer service.
          </p>

          <h2 className="text-2xl font-light mt-12 mb-4">Why Choose Us</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Carefully curated selection of premium products</li>
            <li>Commitment to quality and authenticity</li>
            <li>Exceptional customer service</li>
            <li>Fast and reliable delivery</li>
            <li>Easy returns and exchanges</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
