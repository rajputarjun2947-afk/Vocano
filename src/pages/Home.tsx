import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/features/ProductCard';
import { getProducts } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import heroBanner from '@/assets/hero-banner.jpg';
import collectionBanner from '@/assets/collection-banner.jpg';

export function Home() {
  const products = getProducts();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);
  const bestsellers = products.filter(p => p.bestseller).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
        <img
          src={heroBanner}
          alt="Premium Lifestyle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl lg:text-6xl font-light mb-6 leading-tight">
                Elevate Your Lifestyle
              </h1>
              <p className="text-lg lg:text-xl mb-8 text-gray-200">
                Discover premium products curated for those who appreciate quality, design, and sophistication
              </p>
              <Link to="/products">
                <Button size="lg" className="bg-gold hover:bg-gold-dark text-black font-medium">
                  Explore Collection <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-16">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/products?category=Fashion"
              className="group relative h-96 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop"
                alt="Fashion"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-light tracking-wider">FASHION</h3>
              </div>
            </Link>

            <Link
              to="/products?category=Home & Living"
              className="group relative h-96 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=600&h=800&fit=crop"
                alt="Home & Living"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-light tracking-wider">HOME & LIVING</h3>
              </div>
            </Link>

            <Link
              to="/products?category=Wellness"
              className="group relative h-96 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=800&fit=crop"
                alt="Wellness"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-light tracking-wider">WELLNESS</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-light">Featured Products</h2>
            <Link to="/products" className="text-sm hover:text-gold transition-colors">
              View All <ArrowRight className="inline ml-1" size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collection Banner */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={collectionBanner}
          alt="New Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-light mb-4">New Season Collection</h2>
            <p className="text-lg mb-6">Limited time offer - Up to 25% off</p>
            <Link to="/products">
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">Trending Now</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">Bestsellers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-16">Why Choose Vocano</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                Handpicked products that meet our highest standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">★</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Curated Collection</h3>
              <p className="text-muted-foreground">
                Carefully selected items for discerning customers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">♥</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Customer First</h3>
              <p className="text-muted-foreground">
                Dedicated support for exceptional shopping experience
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
