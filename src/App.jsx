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

import { ROUTES } from "./constants/routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./constants/settings";

function App() {
  const [isUser, isAdmin, isLoading] = ProtectedRouteHook();
  if (isLoading) return null; // Show a loading spinner or placeholder while checking auth status

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className={"app"}>
        <BrowserRouter>
          <NavBarLogin />
          <Routes>
            {/* General Routes */}
            <Route index element={<HomePage />} />
            <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />
            <Route
              path={ROUTES.GENERAL.ALL_CATEGORIES}
              element={<AllCategoryPage />}
            />
            <Route
              path={ROUTES.GENERAL.ALL_BRANDS}
              element={<AllBrandPage />}
            />
            <Route
              path={ROUTES.GENERAL.SHOP_PRODUCTS}
              element={<ShopProductsPage />}
            />
            <Route
              path={ROUTES.GENERAL.VIEW_BY_CATEGORY}
              element={<ViewProductsByCategoryPage />}
            />
            <Route
              path={ROUTES.GENERAL.VIEW_BY_BRAND}
              element={<ViewProductsByBrandPage />}
            />

            <Route
              path={ROUTES.GENERAL.PRODUCT_DETAILS}
              element={<ProductDetailsPage />}
            />
            <Route path={ROUTES.GENERAL.CART} element={<CartPage />} />
            <Route
              path={ROUTES.AUTH.FORGOT_PASSWORD}
              element={<ForgotPasswordPage />}
            />
            <Route
              path={ROUTES.AUTH.VERIFY_CODE}
              element={<VerifyPasswordPage />}
            />
            <Route
              path={ROUTES.AUTH.RESET_PASSWORD}
              element={<ResetPasswordPage />}
            />

            {/* Admin Routes */}
            <Route element={<ProtectedRoute auth={isAdmin} />}>
              <Route element={<AdminPage />}>
                <Route
                  path={ROUTES.ADMIN.PRODUCTS.ALL}
                  element={<AdminAllProducts />}
                />
                <Route
                  path={ROUTES.ADMIN.ORDERS.ALL}
                  element={<AdminAllOrders />}
                />
                <Route
                  path={ROUTES.ADMIN.ORDERS.DETAILS}
                  element={<AdminOrderDetails />}
                />

                <Route
                  path={ROUTES.ADMIN.BRANDS.ADD}
                  element={<AdminAddBrand />}
                />
                <Route
                  path={ROUTES.ADMIN.CATEGORIES.ALL}
                  element={<AdminAllCategories />}
                />
                <Route
                  path={ROUTES.ADMIN.BRANDS.ALL}
                  element={<AdminAllBrands />}
                />

                <Route
                  path={ROUTES.ADMIN.CATEGORIES.SUBCATEGORIES.ALL}
                  element={<AdminAllSubcategories />}
                />

                <Route
                  path={ROUTES.ADMIN.CATEGORIES.SUBCATEGORIES.EDIT}
                  element={<AdminEditSubCategory />}
                />

                <Route
                  path={ROUTES.ADMIN.ADD_CATEGORY}
                  element={<AdminAddCategory />}
                />
                <Route
                  path={ROUTES.ADMIN.EDIT_CATEGORY_PATH}
                  element={<AdminEditCategory />}
                />
                <Route
                  path={ROUTES.ADMIN.EDIT_BRAND_PATH}
                  element={<AdminEditBrand />}
                />
                <Route
                  path={ROUTES.ADMIN.ADD_SUBCATEGORY}
                  element={<AdminAddSubCategory />}
                />
                <Route
                  path={ROUTES.ADMIN.PRODUCTS.ADD}
                  element={<AdminAddProduct />}
                />
                <Route
                  path={ROUTES.ADMIN.PRODUCTS.EDIT}
                  element={<AdminEditProduct />}
                />

                <Route
                  path={ROUTES.ADMIN.COUPONS.ALL}
                  element={<AdminAllCoupons />}
                />
                <Route
                  path={ROUTES.ADMIN.COUPONS.ADD}
                  element={<AdminAddCoupon />}
                />
                <Route
                  path={ROUTES.ADMIN.COUPONS.EDIT}
                  element={<AdminEditCoupon />}
                />
              </Route>
            </Route>

            {/* User Routes */}
            <Route element={<ProtectedRoute auth={isUser} />}>
              <Route element={<UserPage />}>
                <Route
                  path={ROUTES.USER.ALL_ORDERS}
                  element={<UserAllOrders />}
                />
                <Route
                  path={ROUTES.USER.FAVORITE_PRODUCTS}
                  element={<UserFavoriteProducts />}
                />
                <Route
                  path={ROUTES.USER.ADDRESSES.ALL}
                  element={<UserAllAddresses />}
                />
                <Route
                  path={ROUTES.USER.ADDRESSES.ADD}
                  element={<UserAddAddress />}
                />
                <Route
                  path={ROUTES.USER.ADDRESSES.EDIT}
                  element={<UserEditAddress />}
                />
                <Route path={ROUTES.USER.PROFILE} element={<UserProfile />} />
              </Route>
              <Route path={ROUTES.USER.PAYMENT} element={<CartMethodPage />} />
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
    </GoogleOAuthProvider>
  );
}

export default App;
