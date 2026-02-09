import { useState, useEffect } from 'react';
import { getStoredUser } from '@/lib/auth';
import { getAddresses, saveAddress, deleteAddress as removeAddress } from '@/lib/storage';
import { Address } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showToast } from '@/lib/toast';
import { Plus, Trash2, Edit } from 'lucide-react';

export function AddressesPage() {
  const user = getStoredUser();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  useEffect(() => {
    if (user) {
      setAddresses(getAddresses(user.id));
    }
  }, [user]);

  const handleSubmit = () => {
    if (!user) return;

    if (!formData.name || !formData.phone || !formData.addressLine1 || 
        !formData.city || !formData.state || !formData.pincode) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    const address: Address = {
      id: editingId || `addr-${Date.now()}`,
      ...formData,
    };

    saveAddress(user.id, address);
    setAddresses(getAddresses(user.id));
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    });
    showToast(editingId ? 'Address updated successfully' : 'Address added successfully', 'success');
  };

  const handleEdit = (address: Address) => {
    setFormData(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleDelete = (addressId: string) => {
    if (!user) return;
    
    if (window.confirm('Are you sure you want to delete this address?')) {
      removeAddress(user.id, addressId);
      setAddresses(getAddresses(user.id));
      showToast('Address deleted successfully', 'success');
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light">Saved Addresses</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus size={20} className="mr-2" />
            Add New Address
          </Button>
        </div>

        {showForm && (
          <div className="bg-white border border-gray-200 p-6 rounded-sm mb-8">
            <h2 className="text-xl font-medium mb-6">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label>Full Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Phone *</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label>Address Line 1 *</Label>
                <Input
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                />
              </div>

              <div>
                <Label>Address Line 2</Label>
                <Input
                  value={formData.addressLine2}
                  onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label>City *</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div>
                <Label>State *</Label>
                <Input
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
              <div>
                <Label>Pincode *</Label>
                <Input
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSubmit}>
                {editingId ? 'Update Address' : 'Save Address'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    name: '',
                    phone: '',
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    state: '',
                    pincode: '',
                    isDefault: false,
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map(address => (
              <div key={address.id} className="bg-white border border-gray-200 p-6 rounded-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-medium">{address.name}</p>
                    {address.isDefault && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-gold/10 text-gold text-xs rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2 hover:bg-gray-100 rounded-sm"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="p-2 hover:bg-red-50 hover:text-red-500 rounded-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {address.addressLine1}<br />
                  {address.addressLine2 && <>{address.addressLine2}<br /></>}
                  {address.city}, {address.state} - {address.pincode}<br />
                  Phone: {address.phone}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !showForm && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No addresses saved yet</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
