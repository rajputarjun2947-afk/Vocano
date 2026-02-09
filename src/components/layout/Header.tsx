import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Heart, Menu, Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getStoredUser, removeStoredUser, isAdmin } from '@/lib/auth';
import { getCart } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showToast } from '@/lib/toast';

export function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getStoredUser());
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdate', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdate', updateCartCount);
    };
  }, []);

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(getStoredUser());
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    removeStoredUser();
    setUser(null);
    setShowLogoutModal(false);
    window.dispatchEvent(new Event('authChange'));
    showToast('Logged out successfully', 'success');
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="text-2xl lg:text-3xl font-light tracking-widest">
              VOCANO
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/products?category=Fashion" className="text-sm hover:text-gold transition-colors">
                FASHION
              </Link>
              <Link to="/products?category=Home & Living" className="text-sm hover:text-gold transition-colors">
                HOME & LIVING
              </Link>
              <Link to="/products?category=Wellness" className="text-sm hover:text-gold transition-colors">
                WELLNESS
              </Link>
              <Link to="/products" className="text-sm hover:text-gold transition-colors">
                ALL PRODUCTS
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:text-gold transition-colors"
              >
                <Search size={20} />
              </button>

              {user && !isAdmin() && (
                <Link to="/wishlist" className="p-2 hover:text-gold transition-colors hidden sm:block">
                  <Heart size={20} />
                </Link>
              )}

              {user ? (
                <div className="relative group">
                  <button className="p-2 hover:text-gold transition-colors">
                    <User size={20} />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-sm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="py-2">
                      {isAdmin() ? (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          Dashboard
                        </Link>
                      ) : (
                        <>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            Profile
                          </Link>
                          <Link
                            to="/orders"
                            className="block px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            Orders
                          </Link>
                          <Link
                            to="/addresses"
                            className="block px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            Addresses
                          </Link>
                        </>
                      )}
                      <button
                        onClick={handleLogoutClick}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="p-2 hover:text-gold transition-colors">
                  <User size={20} />
                </Link>
              )}

              {!isAdmin() && (
                <Link to="/cart" className="relative p-2 hover:text-gold transition-colors">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="py-4 border-t border-gray-200 animate-fade-in">
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                  autoFocus
                />
                <Button type="submit">Search</Button>
              </form>
            </div>
          )}

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 animate-fade-in">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/products?category=Fashion"
                  className="text-sm hover:text-gold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FASHION
                </Link>
                <Link
                  to="/products?category=Home & Living"
                  className="text-sm hover:text-gold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  HOME & LIVING
                </Link>
                <Link
                  to="/products?category=Wellness"
                  className="text-sm hover:text-gold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  WELLNESS
                </Link>
                <Link
                  to="/products"
                  className="text-sm hover:text-gold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ALL PRODUCTS
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-sm p-6 max-w-sm w-full mx-4 animate-scale-in">
            <h2 className="text-xl font-medium mb-4">Confirm Logout</h2>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleLogoutConfirm}
                className="flex-1"
              >
                Yes
              </Button>
              <Button
                onClick={handleLogoutCancel}
                variant="outline"
                className="flex-1"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
