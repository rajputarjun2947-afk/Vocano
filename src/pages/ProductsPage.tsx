import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/components/features/ProductCard';
import { getProducts } from '@/lib/storage';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/constants/products';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';
  const search = searchParams.get('search') || '';
  const [sortBy, setSortBy] = useState('latest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    // Subcategory filter
    if (subcategory) {
      filtered = filtered.filter(p => p.subcategory === subcategory);
    }

    // Search filter
    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(p => {
      const finalPrice = p.price - (p.price * p.discount) / 100;
      return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
    });

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => {
        const priceA = a.price - (a.price * a.discount) / 100;
        const priceB = b.price - (b.price * b.discount) / 100;
        return priceA - priceB;
      });
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => {
        const priceA = a.price - (a.price * a.discount) / 100;
        const priceB = b.price - (b.price * b.discount) / 100;
        return priceB - priceA;
      });
    } else if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [products, category, subcategory, search, sortBy, priceRange]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSearchParams({});
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-sm ${
                    !category ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  All Products
                </button>
                {CATEGORIES.map(cat => (
                  <div key={cat.name}>
                    <button
                      onClick={() => {
                        setSearchParams({ category: cat.name });
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm rounded-sm ${
                        category === cat.name ? 'bg-gray-100' : 'hover:bg-gray-50'
                      }`}
                    >
                      {cat.name}
                    </button>
                    {category === cat.name && (
                      <div className="ml-4 mt-2 space-y-1">
                        {cat.subcategories.map(sub => (
                          <button
                            key={sub}
                            onClick={() => {
                              setSearchParams({ category: cat.name, subcategory: sub });
                            }}
                            className={`block w-full text-left px-4 py-1 text-xs rounded-sm ${
                              subcategory === sub ? 'bg-gold/10 text-gold' : 'hover:bg-gray-50'
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setPriceRange([0, 5000])}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-sm ${
                    priceRange[0] === 0 && priceRange[1] === 5000 ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  Under ₹5,000
                </button>
                <button
                  onClick={() => setPriceRange([5000, 15000])}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-sm ${
                    priceRange[0] === 5000 && priceRange[1] === 15000 ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  ₹5,000 - ₹15,000
                </button>
                <button
                  onClick={() => setPriceRange([15000, 50000])}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-sm ${
                    priceRange[0] === 15000 && priceRange[1] === 50000 ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  ₹15,000 - ₹50,000
                </button>
                <button
                  onClick={() => setPriceRange([50000, 100000])}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-sm ${
                    priceRange[0] === 50000 ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  Above ₹50,000
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-light">
                {category || subcategory || search || 'All Products'}
                <span className="text-sm text-muted-foreground ml-2">
                  ({filteredProducts.length} products)
                </span>
              </h1>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-sm text-sm"
              >
                <option value="latest">Latest</option>
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
