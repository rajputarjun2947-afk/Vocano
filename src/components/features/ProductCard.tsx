import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useState, useEffect } from 'react';
import { getStoredUser } from '@/lib/auth';
import { toggleWishlist, getWishlist } from '@/lib/storage';
import { showToast } from '@/lib/toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const user = getStoredUser();

  useEffect(() => {
    if (user) {
      const wishlist = getWishlist(user.id);
      setIsWishlisted(wishlist.includes(product.id));
    }
  }, [user, product.id]);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!user) {
      showToast('Please login to add to wishlist', 'error');
      return;
    }

    toggleWishlist(user.id, product.id);
    setIsWishlisted(!isWishlisted);
    showToast(
      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      'success'
    );
  };

  const finalPrice = product.price - (product.price * product.discount) / 100;

  return (
    <Link to={`/products/${product.id}`} className="group block animate-fade-in">
      <div className="relative overflow-hidden bg-gray-50 aspect-square mb-4 rounded-sm">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
        
        {product.discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-xs font-medium animate-slide-in-left">
            {product.discount}% OFF
          </div>
        )}

        {user && (
          <button
            onClick={handleWishlistToggle}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <Heart
              size={18}
              className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
            />
          </button>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="font-semibold">₹{finalPrice.toLocaleString()}</span>
          {product.discount > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>★ {product.rating}</span>
          <span>•</span>
          <span>{product.reviews} reviews</span>
        </div>
      </div>
    </Link>
  );
}
