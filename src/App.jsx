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

import AdminAllProductsPage from "./Pages/Admin/AdminAllProductsPage";
import AdminAllOrdersPage from "./Pages/Admin/AdminAllOrdersPage";
import AdminOrderDetailsPage from "./Pages/Admin/AdminOrderDetailsPage";
import AdminAddBrandPage from "./Pages/Admin/AdminAddBrandPage";
import AdminAddCategoryPage from "./Pages/Admin/AdminAddCategoryPage";
import AdminAddSubCategoryPage from "./Pages/Admin/AdminAddSubCategoryPage";
import AdminAddProductPage from "./Pages/Admin/AdminAddProductPage";
import AdminEditProductPage from "./Pages/Admin/AdminEditProductPage";
import VerifyPasswordPage from "./Pages/Auth/VerifyPasswordPage";
import ForgotPasswordPage from "./Pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/Auth/ResetPasswordPage";
import AdminAddCouponPage from "./Pages/Admin/AdminAddCouponPage";
import AdminEditCouponPage from "./Pages/Admin/AdminEditCouponPage";
import ProtectedRouteHook from "./hooks/auth/ProtectedRouteHook";
import ProtectedRoute from "./Components/Utility/ProtectedRoute";
import ViewProductsByCategoryPage from "./Pages/Products/ViewProductsByCategoryPage";
import ViewProductsByBrandPage from "./Pages/Products/ViewProductsByBrandPage";

import AdminAllCouponsPage from "./Pages/Admin/AdminAllCouponsPage";
import AdminAllCategoriesPage from "./Pages/Admin/AdminAllCategoriesPage";
import AdminEditCategoryPage from "./Pages/Admin/AdminEditCategoryPage";
import AdminAllBrandsPage from "./Pages/Admin/AdminAllBrandsPage";
import AdminEditBrandPage from "./Pages/Admin/AdminEditBrandPage";
import AdminAllSubcategoriesPage from "./Pages/Admin/AdminAllSubcategoriesPage";
import AdminEditSubcategoryPage from "./Pages/Admin/AdminEditSubcategoryPage";

// User Pages
import UserPage from "./Pages/User/UserPage";
import UserProfile from "./Components/User/UserProfile";
import UserFavoriteProducts from "./Components/User/UserFavoriteProducts";
import UserAllOrders from "./Components/User/UserAllOrders";
import UserAddAddress from "./Components/User/UserAddAddress";
import UserAllAddresses from "./Components/User/UserAllAddresses";
import UserEditAddress from "./Components/User/UserEditAddress";

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
            <Route
              path="/admin/all-products"
              element={<AdminAllProductsPage />}
            />
            <Route path="/admin/all-orders" element={<AdminAllOrdersPage />} />
            <Route
              path="/admin/all-orders/:id"
              element={<AdminOrderDetailsPage />}
            />

            <Route path="/admin/add-brand" element={<AdminAddBrandPage />} />
            <Route
              path="/admin/all-categories"
              element={<AdminAllCategoriesPage />}
            />
            <Route path="/admin/all-brands" element={<AdminAllBrandsPage />} />

            <Route
              path="/admin/all-categories/:id/all-subcategories"
              element={<AdminAllSubcategoriesPage />}
            />

            <Route
              path="/admin/all-categories/:id/all-subcategories/edit-subcategory/:id"
              element={<AdminEditSubcategoryPage />}
            />

            <Route
              path="/admin/add-category"
              element={<AdminAddCategoryPage />}
            />
            <Route
              path="/admin/edit-category/:id"
              element={<AdminEditCategoryPage />}
            />
            <Route
              path="/admin/edit-brand/:id"
              element={<AdminEditBrandPage />}
            />
            <Route
              path="/admin/add-subcategory"
              element={<AdminAddSubCategoryPage />}
            />
            <Route
              path="/admin/add-product"
              element={<AdminAddProductPage />}
            />
            <Route
              path="/admin/edit-product/:id"
              element={<AdminEditProductPage />}
            />

            <Route
              path="/admin/all-coupons"
              element={<AdminAllCouponsPage />}
            />
            <Route path="/admin/add-coupon" element={<AdminAddCouponPage />} />
            <Route
              path="/admin/edit-coupon/:id"
              element={<AdminEditCouponPage />}
            />
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
