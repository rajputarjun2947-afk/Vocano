import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Home } from '@/pages/Home';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { TrackOrderPage } from '@/pages/TrackOrderPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AddressesPage } from '@/pages/AddressesPage';
import { LoginPage } from '@/pages/LoginPage';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminProducts } from '@/pages/admin/AdminProducts';
import { AdminOrders } from '@/pages/admin/AdminOrders';
import { AdminUsers } from '@/pages/admin/AdminUsers';
import { AdminCoupons } from '@/pages/admin/AdminCoupons';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AboutPage } from '@/pages/static/AboutPage';
import { ContactPage } from '@/pages/static/ContactPage';
import { FAQPage } from '@/pages/static/FAQPage';
import { SupportPage } from '@/pages/static/SupportPage';
import { PrivacyPolicyPage } from '@/pages/static/PrivacyPolicyPage';
import { TermsConditionsPage } from '@/pages/static/TermsConditionsPage';
import { RefundPolicyPage } from '@/pages/static/RefundPolicyPage';
import { ShippingPolicyPage } from '@/pages/static/ShippingPolicyPage';
import { getStoredUser, isAdmin } from '@/lib/auth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = getStoredUser();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const user = getStoredUser();
  return user && isAdmin() ? <>{children}</> : <Navigate to="/" />;
}

function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Customer Routes */}
        <Route
          path="/"
          element={
            <CustomerLayout>
              <Home />
            </CustomerLayout>
          }
        />
        <Route
          path="/products"
          element={
            <CustomerLayout>
              <ProductsPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/products/:id"
          element={
            <CustomerLayout>
              <ProductDetailPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <CustomerLayout>
              <CartPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <CustomerLayout>
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            </CustomerLayout>
          }
        />
        <Route
          path="/order-confirmation/:id"
          element={
            <CustomerLayout>
              <ProtectedRoute>
                <OrderConfirmationPage />
              </ProtectedRoute>
            </CustomerLayout>
          }
        />
        <Route
          path="/orders"
          element={
            <CustomerLayout>
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            </CustomerLayout>
          }
        />
        <Route
          path="/track-order/:id"
          element={
            <CustomerLayout>
              <ProtectedRoute>
                <TrackOrderPage />
              </ProtectedRoute>
            </CustomerLayout>
          }
        />
        <Route
          path="/wishlist"
          element={
            <CustomerLayout>
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            </CustomerLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <CustomerLayout>
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            </CustomerLayout>
          }
        />
        <Route
          path="/addresses"
          element={
            <CustomerLayout>
              <ProtectedRoute>
                <AddressesPage />
              </ProtectedRoute>
            </CustomerLayout>
          }
        />

        {/* Static Pages */}
        <Route
          path="/about"
          element={
            <CustomerLayout>
              <AboutPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <CustomerLayout>
              <ContactPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/faq"
          element={
            <CustomerLayout>
              <FAQPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/support"
          element={
            <CustomerLayout>
              <SupportPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <CustomerLayout>
              <PrivacyPolicyPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/terms-conditions"
          element={
            <CustomerLayout>
              <TermsConditionsPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/refund-policy"
          element={
            <CustomerLayout>
              <RefundPolicyPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/shipping-policy"
          element={
            <CustomerLayout>
              <ShippingPolicyPage />
            </CustomerLayout>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="coupons" element={<AdminCoupons />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
