import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validatePassword, setStoredUser, initializeAdmin } from '@/lib/auth';
import { showToast } from '@/lib/toast';
import { Shield, Eye, EyeOff } from 'lucide-react';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Initialize admin user
  useState(() => {
    initializeAdmin();
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showToast('Please fill all fields', 'error');
      return;
    }

    const user = validatePassword(formData.email, formData.password);
    
    if (!user || user.role !== 'admin') {
      showToast('Invalid admin credentials', 'error');
      return;
    }

    setStoredUser(user);
    window.dispatchEvent(new Event('authChange'));
    showToast('Admin login successful!', 'success');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="max-w-md w-full mx-4 relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold to-yellow-600 rounded-full mb-4 shadow-lg">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-light tracking-widest text-white mb-2">VOCANO</h1>
          <p className="text-slate-400">Admin Panel Access</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-lg shadow-2xl animate-scale-in">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="admin-email" className="text-white">Email Address</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@vocano.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20"
              />
            </div>

            <div>
              <Label htmlFor="admin-password" className="text-white">Password</Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-600 hover:to-gold text-white font-semibold py-6 shadow-lg"
            >
              Login to Admin Panel
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-xs text-slate-400 mb-2 font-medium">Demo Credentials:</p>
            <div className="space-y-1 text-xs font-mono">
              <p className="text-slate-300">Email: admin@vocano.com</p>
              <p className="text-slate-300">Password: admin123</p>
            </div>
          </div>

          {/* Back to Customer Site */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-slate-400 hover:text-gold transition-colors"
            >
              ← Back to Customer Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
