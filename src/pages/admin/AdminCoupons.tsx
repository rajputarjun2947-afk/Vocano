import { useState, useEffect } from 'react';
import { getCoupons, saveCoupon, deleteCoupon as removeCoupon } from '@/lib/storage';
import { Coupon } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showToast } from '@/lib/toast';
import { Plus, Trash2, Edit } from 'lucide-react';

export function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    discount: 0,
    type: 'percentage' as 'percentage' | 'fixed',
    minPurchase: 0,
    maxDiscount: 0,
    expiryDate: '',
    active: true,
  });

  useEffect(() => {
    setCoupons(getCoupons());
  }, []);

  const handleSubmit = () => {
    if (!formData.code || formData.discount <= 0 || !formData.expiryDate) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    const coupon: Coupon = {
      id: editingId || `c${Date.now()}`,
      ...formData,
      maxDiscount: formData.type === 'percentage' ? formData.maxDiscount : undefined,
    };

    saveCoupon(coupon);
    setCoupons(getCoupons());
    setShowForm(false);
    setEditingId(null);
    setFormData({
      code: '',
      discount: 0,
      type: 'percentage',
      minPurchase: 0,
      maxDiscount: 0,
      expiryDate: '',
      active: true,
    });
    showToast(editingId ? 'Coupon updated successfully' : 'Coupon created successfully', 'success');
  };

  const handleEdit = (coupon: Coupon) => {
    setFormData({
      code: coupon.code,
      discount: coupon.discount,
      type: coupon.type,
      minPurchase: coupon.minPurchase,
      maxDiscount: coupon.maxDiscount || 0,
      expiryDate: coupon.expiryDate,
      active: coupon.active,
    });
    setEditingId(coupon.id);
    setShowForm(true);
  };

  const handleDelete = (couponId: string) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      removeCoupon(couponId);
      setCoupons(getCoupons());
      showToast('Coupon deleted successfully', 'success');
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light">Coupons & Offers</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus size={20} className="mr-2" />
            Create Coupon
          </Button>
        </div>

        {showForm && (
          <div className="bg-white border border-gray-200 p-6 rounded-sm mb-8">
            <h2 className="text-xl font-medium mb-6">
              {editingId ? 'Edit Coupon' : 'Create New Coupon'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Coupon Code *</Label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="SAVE10"
                />
              </div>

              <div>
                <Label>Discount Type *</Label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'percentage' | 'fixed' })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label>Discount Value *</Label>
                <Input
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                  placeholder={formData.type === 'percentage' ? '10' : '500'}
                />
              </div>

              <div>
                <Label>Min Purchase (₹) *</Label>
                <Input
                  type="number"
                  value={formData.minPurchase}
                  onChange={(e) => setFormData({ ...formData, minPurchase: Number(e.target.value) })}
                />
              </div>

              {formData.type === 'percentage' && (
                <div>
                  <Label>Max Discount (₹)</Label>
                  <Input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label>Expiry Date *</Label>
                <Input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Active</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSubmit}>
                {editingId ? 'Update Coupon' : 'Create Coupon'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    code: '',
                    discount: 0,
                    type: 'percentage',
                    minPurchase: 0,
                    maxDiscount: 0,
                    expiryDate: '',
                    active: true,
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Min Purchase</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {coupons.map(coupon => (
                <tr key={coupon.id}>
                  <td className="px-6 py-4 text-sm font-medium">{coupon.code}</td>
                  <td className="px-6 py-4 text-sm">
                    {coupon.type === 'percentage' ? `${coupon.discount}%` : `₹${coupon.discount}`}
                    {coupon.maxDiscount && <span className="text-xs text-muted-foreground"> (max ₹{coupon.maxDiscount})</span>}
                  </td>
                  <td className="px-6 py-4 text-sm">₹{coupon.minPurchase.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      coupon.active ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'
                    }`}>
                      {coupon.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(coupon)}
                        className="p-2 hover:bg-gray-100 rounded-sm"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(coupon.id)}
                        className="p-2 hover:bg-red-50 hover:text-red-500 rounded-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
