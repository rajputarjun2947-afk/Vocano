import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { findUserByEmail, findUserByPhone, saveUser, setStoredUser } from '@/lib/auth';
import { showToast } from '@/lib/toast';
import { User } from '@/types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'otp'>('login');
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: '',
  });

  if (!isOpen) return null;

  const handleEmailLogin = () => {
    if (!formData.email) {
      showToast('Please enter email address', 'error');
      return;
    }

    const user = findUserByEmail(formData.email);
    if (!user) {
      showToast('User not found. Please register first.', 'error');
      return;
    }

    setStoredUser(user);
    window.dispatchEvent(new Event('authChange'));
    showToast('Login successful!', 'success');
    onClose();
    onSuccess?.();
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

    // Mock OTP sent
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
      onClose();
      onSuccess?.();
    }
  };

  const handleRegister = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      showToast('Please fill all fields', 'error');
      return;
    }

    if (formData.phone.length !== 10) {
      showToast('Please enter valid 10-digit phone number', 'error');
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
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);
    setStoredUser(newUser);
    window.dispatchEvent(new Event('authChange'));
    showToast('Registration successful!', 'success');
    onClose();
    onSuccess?.();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-light mb-6">
          {mode === 'register' ? 'Create Account' : mode === 'otp' ? 'Verify OTP' : 'Welcome Back'}
        </h2>

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
  );
}
