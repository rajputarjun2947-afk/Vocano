import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  LogOut,
  Shield,
  ChevronLeft
} from 'lucide-react';
import { removeStoredUser, getStoredUser } from '@/lib/auth';
import { showToast } from '@/lib/toast';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStoredUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    removeStoredUser();
    window.dispatchEvent(new Event('authChange'));
    setShowLogoutModal(false);
    showToast('Logged out successfully', 'success');
    navigate('/admin-login');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/coupons', icon: Tag, label: 'Coupons' },
  ];

  return (
    <>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 fixed h-full shadow-xl">
          {/* Logo Section */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-yellow-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <Link to="/" className="text-xl font-light tracking-widest text-white block">
                  VOCANO
                </Link>
              </div>
            </div>
            <p className="text-xs text-slate-400 ml-[52px]">Admin Panel</p>
          </div>

          {/* Admin Info */}
          <div className="px-4 py-4 border-b border-white/10">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">Administrator</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-3">
              Main Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-gold to-yellow-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-white/10">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-slate-300 hover:bg-white/10 transition-all"
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-medium">Customer Site</span>
            </Link>
            
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-500/20 hover:text-red-400 w-full transition-all"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-slate-800">
                {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h2>
              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-600">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <LogOut className="text-red-600" size={24} />
              </div>
              <h2 className="text-xl font-semibold">Confirm Logout</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Are you sure you want to logout from the admin panel?
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleLogoutConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Yes, Logout
              </Button>
              <Button
                onClick={handleLogoutCancel}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
