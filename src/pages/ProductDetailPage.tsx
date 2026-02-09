import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts } from '@/lib/storage';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { getStoredUser } from '@/lib/auth';
import { addToCart, toggleWishlist, getWishlist } from '@/lib/storage';
import { showToast } from '@/lib/toast';
import { LoginModal } from '@/components/features/LoginModal';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = getStoredUser();

  useEffect(() => {
    const products = getProducts();
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedColor(foundProduct.colors[0]);
    }
  }, [id]);

  useEffect(() => {
    if (user && product) {
      const wishlist = getWishlist(user.id);
      setIsWishlisted(wishlist.includes(product.id));
    }
  }, [user, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const finalPrice = product.price - (product.price * product.discount) / 100;

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    addToCart({
      productId: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor,
      price: finalPrice,
    });

    showToast('Added to cart successfully!', 'success');
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const handleBuyNow = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    addToCart({
      productId: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor,
      price: finalPrice,
    });

    window.dispatchEvent(new Event('cartUpdate'));
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
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

  return (
    <>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-50 overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-50 overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-gold' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-light mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Star size={16} className="fill-gold text-gold" />
                    <span className="ml-1">{product.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{product.reviews} reviews</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-semibold">₹{finalPrice.toLocaleString()}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 text-sm font-medium">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Size Selection */}
              <div>
                <h3 className="font-medium mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 border rounded-sm ${
                        selectedSize === size
                          ? 'border-gold bg-gold/10'
                          : 'border-gray-200 hover:border-gold'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-medium mb-3">Select Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-2 border rounded-sm ${
                        selectedColor === color
                          ? 'border-gold bg-gold/10'
                          : 'border-gray-200 hover:border-gold'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-medium mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-200 rounded-sm hover:border-gold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-10 border border-gray-200 rounded-sm hover:border-gold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button onClick={handleAddToCart} variant="outline" className="flex-1">
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </Button>
                <Button onClick={handleBuyNow} className="flex-1">
                  Buy Now
                </Button>
                <Button
                  onClick={handleWishlistToggle}
                  variant="outline"
                  size="icon"
                >
                  <Heart size={20} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                </Button>
              </div>

              {/* Stock Info */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Availability:</span>{' '}
                  {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                </p>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-medium mb-4">Specifications</h3>
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex text-sm">
                        <dt className="w-1/3 text-muted-foreground">{key}:</dt>
                        <dd className="w-2/3 font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setShowLoginModal(false);
          showToast('Please try again', 'info');
        }}
      />
    </>
  );
}
