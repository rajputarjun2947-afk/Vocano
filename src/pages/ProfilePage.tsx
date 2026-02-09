import { useState, useEffect } from 'react';
import { getStoredUser, setStoredUser, saveUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showToast } from '@/lib/toast';

export function ProfilePage() {
  const user = getStoredUser();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleUpdate = () => {
    if (!user) return;

    if (!formData.name || !formData.email || !formData.phone) {
      showToast('Please fill all fields', 'error');
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    saveUser(updatedUser);
    setStoredUser(updatedUser);
    window.dispatchEvent(new Event('authChange'));
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-light mb-8">My Profile</h1>

        <div className="bg-white border border-gray-200 p-8 rounded-sm">
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                maxLength={10}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
              />
            </div>

            <Button onClick={handleUpdate}>
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
