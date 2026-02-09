import { useState, useEffect } from 'react';
import { getStoredUser } from '@/lib/auth';
import { getProducts, getWishlist } from '@/lib/storage';
import { Product } from '@/types';
import { ProductCard } from '@/components/features/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function WishlistPage() {
  const user = getStoredUser();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (user) {
      setWishlist(getWishlist(user.id));
    }
    setProducts(getProducts());
  }, [user]);

  useEffect(() => {
    const handleStorageChange = () => {
      if (user) {
        setWishlist(getWishlist(user.id));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <Heart size={64} className="text-muted-foreground mb-4" />
        <h1 className="text-2xl font-light mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-8">Add products you love to your wishlist</p>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-light mb-8">
          My Wishlist
          <span className="text-lg text-muted-foreground ml-3">
            ({wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'})
          </span>
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
