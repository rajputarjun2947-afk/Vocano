import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { findUserByEmail, findUserByPhone, saveUser, setStoredUser, initializeAdmin, validatePassword } from '@/lib/auth';
import { showToast } from '@/lib/toast';
import { User } from '@/types';
import { Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register' | 'otp'>('login');
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  // Initialize admin user
  useState(() => {
    initializeAdmin();
  });

  const handleEmailLogin = () => {
    if (!formData.email) {
      showToast('Please enter email address', 'error');
      return;
    }

    if (!formData.password) {
      showToast('Please enter password', 'error');
      return;
    }

    const user = validatePassword(formData.email, formData.password);
    if (!user) {
      showToast('Invalid email or password', 'error');
      return;
    }

    setStoredUser(user);
    window.dispatchEvent(new Event('authChange'));
    showToast('Login successful!', 'success');
    
    if (user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const handlePhoneLogin = () => {
    if (!formData.phone || formData.phone.length !== 10) {
      showToast('Please enter valid 10-digit phone number', 'error');
      return;
    }

    const user = findUserByPhone(formData.phone);
    if (!user) {
      showToast('User not found. Please register first.', 'error');
      return;
    }

    showToast('OTP sent to your phone: 123456', 'info');
    setMode('otp');
  };

  const handleOTPVerify = () => {
    if (formData.otp !== '123456') {
      showToast('Invalid OTP. Use 123456', 'error');
      return;
    }

    const user = findUserByPhone(formData.phone);
    if (user) {
      setStoredUser(user);
      window.dispatchEvent(new Event('authChange'));
      showToast('Login successful!', 'success');
      
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  const handleRegister = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      showToast('Please fill all fields', 'error');
      return;
    }

    if (formData.phone.length !== 10) {
      showToast('Please enter valid 10-digit phone number', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    const existingEmail = findUserByEmail(formData.email);
    const existingPhone = findUserByPhone(formData.phone);

    if (existingEmail || existingPhone) {
      showToast('User already exists. Please login.', 'error');
      return;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);
    setStoredUser(newUser);
    window.dispatchEvent(new Event('authChange'));
    showToast('Registration successful!', 'success');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-light tracking-widest mb-2">VOCANO</h1>
          <p className="text-muted-foreground">
            {mode === 'register' ? 'Create your account' : mode === 'otp' ? 'Verify OTP' : 'Welcome back'}
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-8 rounded-sm animate-scale-in">
          {mode === 'login' && (
            <div className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={loginType === 'email' ? 'default' : 'outline'}
                  onClick={() => setLoginType('email')}
                  className="flex-1"
                >
                  Email
                </Button>
                <Button
                  variant={loginType === 'phone' ? 'default' : 'outline'}
                  onClick={() => setLoginType('phone')}
                  className="flex-1"
                >
                  Phone
                </Button>
              </div>

              {loginType === 'email' ? (
                <>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Admin: admin@vocano.com / admin123
                    </p>
                  </div>
                </>
              ) : (
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="10-digit phone number"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
              )}

              <Button
                onClick={loginType === 'email' ? handleEmailLogin : handlePhoneLogin}
                className="w-full"
              >
                {loginType === 'email' ? 'Login' : 'Send OTP'}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-gold hover:underline"
                >
                  Register
                </button>
              </p>
            </div>
          )}

          {mode === 'otp' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter the OTP sent to {formData.phone}
              </p>
              <p className="text-xs text-blue-600">Mock OTP: 123456</p>
              
              <div>
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                />
              </div>

              <Button onClick={handleOTPVerify} className="w-full">
                Verify & Login
              </Button>

              <button
                onClick={() => setMode('login')}
                className="w-full text-sm text-muted-foreground hover:text-gold"
              >
                Back to login
              </button>
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="reg-name">Full Name</Label>
                <Input
                  id="reg-name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="reg-email">Email Address</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="reg-phone">Phone Number</Label>
                <Input
                  id="reg-phone"
                  type="tel"
                  placeholder="10-digit phone number"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                />
              </div>

              <div>
                <Label htmlFor="reg-password">Password</Label>
                <div className="relative">
                  <Input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="reg-confirm-password">Confirm Password</Label>
                <Input
                  id="reg-confirm-password"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>

              <Button onClick={handleRegister} className="w-full">
                Register
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-gold hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
