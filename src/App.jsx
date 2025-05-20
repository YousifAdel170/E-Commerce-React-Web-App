import NavBarLogin from "./Components/Utility/NavBarLogin";
import Footer from "./Components/Utility/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";

import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import AllCategoryPage from "./Pages/Category/AllCategoryPage";
import AllBrandPage from "./Pages/Brand/AllBrandPage";
import ShopProductsPage from "./Pages/Products/ShopProductsPage";
import ProductDetailsPage from "./Pages/Products/ProductDetailsPage";

import CartPage from "./Pages/Cart/CartPage";
import CartMethodPage from "./Pages/Checkout/CartMethodPage";

import VerifyPasswordPage from "./Pages/Auth/VerifyPasswordPage";
import ForgotPasswordPage from "./Pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/Auth/ResetPasswordPage";

import ProtectedRouteHook from "./hooks/auth/ProtectedRouteHook";
import ProtectedRoute from "./Components/Utility/ProtectedRoute";
import ViewProductsByCategoryPage from "./Pages/Products/ViewProductsByCategoryPage";
import ViewProductsByBrandPage from "./Pages/Products/ViewProductsByBrandPage";

// User Pages
import UserPage from "./Pages/User/UserPage";
// User Components
import UserProfile from "./Components/User/UserProfile";
import UserFavoriteProducts from "./Components/User/UserFavoriteProducts";
import UserAllOrders from "./Components/User/UserAllOrders";
import UserAddAddress from "./Components/User/UserAddAddress";
import UserAllAddresses from "./Components/User/UserAllAddresses";
import UserEditAddress from "./Components/User/UserEditAddress";

// Admin Pages
import AdminPage from "./Pages/Admin/AdminPage";
// Admin Components
import AdminAllProducts from "./Components/Admin/AdminAllProducts";
import AdminAllOrders from "./Components/Admin/AdminAllOrders";
import AdminAllCategories from "./Components/Admin/AdminAllCategories";
import AdminAllBrands from "./Components/Admin/AdminAllBrands";
import AdminAllSubcategories from "./Components/Admin/AdminAllSubcategories";
import AdminEditSubCategory from "./Components/Admin/AdminEditSubCategory";
import AdminAddCategory from "./Components/Admin/AdminAddCategory";
import AdminEditCategory from "./Components/Admin/AdminEditCategory";
import AdminEditBrand from "./Components/Admin/AdminEditBrand";
import AdminAddSubCategory from "./Components/Admin/AdminAddSubCategory";
import AdminAddProduct from "./Components/Admin/AdminAddProduct";
import AdminEditProduct from "./Components/Admin/AdminEditProduct";
import AdminAllCoupons from "./Components/Admin/AdminAllCoupons";
import AdminAddCoupon from "./Components/Admin/AdminAddCoupon";
import AdminEditCoupon from "./Components/Admin/AdminEditCoupon";
import AdminOrderDetails from "./Components/Admin/AdminOrderDetails";
import AdminAddBrand from "./Components/Admin/AdminAddBrand";

function App() {
  const [isUser, isAdmin, isLoading] = ProtectedRouteHook();
  if (isLoading) return null; // Show a loading spinner or placeholder while checking auth status
  return (
    <div className="font app">
      <BrowserRouter>
        <NavBarLogin />
        <Routes>
          {/* General Routes */}
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/all-categories" element={<AllCategoryPage />} />
          <Route path="/all-brands" element={<AllBrandPage />} />
          <Route path="/products" element={<ShopProductsPage />} />
          <Route
            path="/products/category/:id"
            element={<ViewProductsByCategoryPage />}
          />
          <Route
            path="/products/brands/:id"
            element={<ViewProductsByBrandPage />}
          />

          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/user/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route path="/user/verify-code" element={<VerifyPasswordPage />} />
          <Route path="/user/reset-password" element={<ResetPasswordPage />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute auth={isAdmin} />}>
            <Route element={<AdminPage />}>
              <Route
                path="/admin/all-products"
                element={<AdminAllProducts />}
              />
              <Route path="/admin/all-orders" element={<AdminAllOrders />} />
              <Route
                path="/admin/all-orders/:id"
                element={<AdminOrderDetails />}
              />

              <Route path="/admin/add-brand" element={<AdminAddBrand />} />
              <Route
                path="/admin/all-categories"
                element={<AdminAllCategories />}
              />
              <Route path="/admin/all-brands" element={<AdminAllBrands />} />

              <Route
                path="/admin/all-categories/:id/all-subcategories"
                element={<AdminAllSubcategories />}
              />

              <Route
                path="/admin/all-categories/:id/all-subcategories/edit-subcategory/:id"
                element={<AdminEditSubCategory />}
              />

              <Route
                path="/admin/add-category"
                element={<AdminAddCategory />}
              />
              <Route
                path="/admin/edit-category/:id"
                element={<AdminEditCategory />}
              />
              <Route
                path="/admin/edit-brand/:id"
                element={<AdminEditBrand />}
              />
              <Route
                path="/admin/add-subcategory"
                element={<AdminAddSubCategory />}
              />
              <Route path="/admin/add-product" element={<AdminAddProduct />} />
              <Route
                path="/admin/edit-product/:id"
                element={<AdminEditProduct />}
              />

              <Route path="/admin/all-coupons" element={<AdminAllCoupons />} />
              <Route path="/admin/add-coupon" element={<AdminAddCoupon />} />
              <Route
                path="/admin/edit-coupon/:id"
                element={<AdminEditCoupon />}
              />
            </Route>
          </Route>

          {/* User Routes */}
          <Route element={<ProtectedRoute auth={isUser} />}>
            <Route element={<UserPage />}>
              <Route path="/user/all-orders" element={<UserAllOrders />} />
              <Route
                path="/user/favorite-products"
                element={<UserFavoriteProducts />}
              />
              <Route path="/user/addresses" element={<UserAllAddresses />} />
              <Route
                path="/user/addresses/add-address"
                element={<UserAddAddress />}
              />
              <Route
                path="/user/addresses/edit-address/:id"
                element={<UserEditAddress />}
              />
              <Route path="/user/profile" element={<UserProfile />} />
            </Route>
            <Route path="/order/pay-method" element={<CartMethodPage />} />
          </Route>

          {/* Test For Isolated Protected Rout */}
          {/* <Route
            path="/order/pay-method"
            element={
              <ProtectedRoute auth={isUser}>
                <CartMethodPage />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
