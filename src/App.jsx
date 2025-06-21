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

import "./i18n/i18n"; // important! load i18n config
import {
  ADMIN_ADD_BRAND_PATH,
  ADMIN_ADD_CATEGORY_PATH,
  ADMIN_ADD_COUPON_PATH,
  ADMIN_ADD_PRODUCT_PATH,
  ADMIN_ADD_SUBCATEGORY_PATH,
  ADMIN_ALL_BRANDS_PATH,
  ADMIN_ALL_CATEGORIES_PATH,
  ADMIN_ALL_COUPONS_PATH,
  ADMIN_ALL_ORDERS_PATH,
  ADMIN_ALL_PRODUCTS_PATH,
  ADMIN_ALL_SUBCATEGORIES_PATH,
  ADMIN_EDIT_BRAND_PATH,
  ADMIN_EDIT_CATEGORY_PATH,
  ADMIN_EDIT_COUPON_PATH,
  ADMIN_EDIT_PRODUCT_PATH,
  ADMIN_EDIT_SUBCATEGORY_PATH,
  ADMIN_ORDER_DETAILS_PATH,
  AUTH_FORGOT_PASSWORD_PATH,
  AUTH_LOGIN_PATH,
  AUTH_REGISTER_PATH,
  AUTH_RESET_PASSWORD_PATH,
  AUTH_VERIFY_CODE_PATH,
  GENERAL_ALL_BRANDS_PATH,
  GENERAL_ALL_CATEGORIES_PATH,
  GENERAL_CART_PATH,
  GENERAL_PRODUCT_DETAILS_PATH,
  GENERAL_SHOP_PRODUCTS_PATH,
  GENERAL_VIEW_PRODUCTS_BY_BRAND_PATH,
  GENERAL_VIEW_PRODUCTS_BY_CATEGORY_PATH,
  USER_ADD_ADDRESS_PATH,
  USER_ALL_ADDRESSES_PATH,
  USER_ALL_ORDERS_PATH,
  USER_EDIT_ADDRESS_PATH,
  USER_FAVORITE_PRODUCTS_PATH,
  USER_ORDER_PAY_METHOD_PATH,
  USER_PROFILE_PATH,
} from "./constants/paths";

function App() {
  const [isUser, isAdmin, isLoading] = ProtectedRouteHook();
  if (isLoading) return null; // Show a loading spinner or placeholder while checking auth status

  return (
    <div className={`app`}>
      <BrowserRouter>
        <NavBarLogin />
        <Routes>
          {/* General Routes */}
          <Route index element={<HomePage />} />
          <Route path={AUTH_LOGIN_PATH} element={<LoginPage />} />
          <Route path={AUTH_REGISTER_PATH} element={<RegisterPage />} />
          <Route
            path={GENERAL_ALL_CATEGORIES_PATH}
            element={<AllCategoryPage />}
          />
          <Route path={GENERAL_ALL_BRANDS_PATH} element={<AllBrandPage />} />
          <Route
            path={GENERAL_SHOP_PRODUCTS_PATH}
            element={<ShopProductsPage />}
          />
          <Route
            path={GENERAL_VIEW_PRODUCTS_BY_CATEGORY_PATH}
            element={<ViewProductsByCategoryPage />}
          />
          <Route
            path={GENERAL_VIEW_PRODUCTS_BY_BRAND_PATH}
            element={<ViewProductsByBrandPage />}
          />

          <Route
            path={GENERAL_PRODUCT_DETAILS_PATH}
            element={<ProductDetailsPage />}
          />
          <Route path={GENERAL_CART_PATH} element={<CartPage />} />
          <Route
            path={AUTH_FORGOT_PASSWORD_PATH}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={AUTH_VERIFY_CODE_PATH}
            element={<VerifyPasswordPage />}
          />
          <Route
            path={AUTH_RESET_PASSWORD_PATH}
            element={<ResetPasswordPage />}
          />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute auth={isAdmin} />}>
            <Route element={<AdminPage />}>
              <Route
                path={ADMIN_ALL_PRODUCTS_PATH}
                element={<AdminAllProducts />}
              />
              <Route
                path={ADMIN_ALL_ORDERS_PATH}
                element={<AdminAllOrders />}
              />
              <Route
                path={ADMIN_ORDER_DETAILS_PATH}
                element={<AdminOrderDetails />}
              />

              <Route path={ADMIN_ADD_BRAND_PATH} element={<AdminAddBrand />} />
              <Route
                path={ADMIN_ALL_CATEGORIES_PATH}
                element={<AdminAllCategories />}
              />
              <Route
                path={ADMIN_ALL_BRANDS_PATH}
                element={<AdminAllBrands />}
              />

              <Route
                path={ADMIN_ALL_SUBCATEGORIES_PATH}
                element={<AdminAllSubcategories />}
              />

              <Route
                path={ADMIN_EDIT_SUBCATEGORY_PATH}
                element={<AdminEditSubCategory />}
              />

              <Route
                path={ADMIN_ADD_CATEGORY_PATH}
                element={<AdminAddCategory />}
              />
              <Route
                path={ADMIN_EDIT_CATEGORY_PATH}
                element={<AdminEditCategory />}
              />
              <Route
                path={ADMIN_EDIT_BRAND_PATH}
                element={<AdminEditBrand />}
              />
              <Route
                path={ADMIN_ADD_SUBCATEGORY_PATH}
                element={<AdminAddSubCategory />}
              />
              <Route
                path={ADMIN_ADD_PRODUCT_PATH}
                element={<AdminAddProduct />}
              />
              <Route
                path={ADMIN_EDIT_PRODUCT_PATH}
                element={<AdminEditProduct />}
              />

              <Route
                path={ADMIN_ALL_COUPONS_PATH}
                element={<AdminAllCoupons />}
              />
              <Route
                path={ADMIN_ADD_COUPON_PATH}
                element={<AdminAddCoupon />}
              />
              <Route
                path={ADMIN_EDIT_COUPON_PATH}
                element={<AdminEditCoupon />}
              />
            </Route>
          </Route>

          {/* User Routes */}
          <Route element={<ProtectedRoute auth={isUser} />}>
            <Route element={<UserPage />}>
              <Route path={USER_ALL_ORDERS_PATH} element={<UserAllOrders />} />
              <Route
                path={USER_FAVORITE_PRODUCTS_PATH}
                element={<UserFavoriteProducts />}
              />
              <Route
                path={USER_ALL_ADDRESSES_PATH}
                element={<UserAllAddresses />}
              />
              <Route
                path={USER_ADD_ADDRESS_PATH}
                element={<UserAddAddress />}
              />
              <Route
                path={USER_EDIT_ADDRESS_PATH}
                element={<UserEditAddress />}
              />
              <Route path={USER_PROFILE_PATH} element={<UserProfile />} />
            </Route>
            <Route
              path={USER_ORDER_PAY_METHOD_PATH}
              element={<CartMethodPage />}
            />
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
