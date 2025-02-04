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
import UserAllOrdersPage from "./Pages/User/UserAllOrdersPage";
import UserFavoriteProducts from "./Pages/User/UserFavoriteProductsPage";
import UserProfilePage from "./Pages/User/UserProfilePage";
import UserAllAddressesPage from "./Pages/User/UserAllAddressesPage";
import UserAddAddressPage from "./Pages/User/UserAddAddressPage";
import UserEditAddressPage from "./Pages/User/UserEditAddressPage";

function App() {
  return (
    <div className="font">
      <NavBarLogin />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/all-categories" element={<AllCategoryPage />} />
          <Route path="/all-brands" element={<AllBrandPage />} />
          <Route path="/products" element={<ShopProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/pay-method" element={<CartMethodPage />} />
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
            path="/admin/add-category"
            element={<AdminAddCategoryPage />}
          />
          <Route
            path="/admin/add-subcategory"
            element={<AdminAddSubCategoryPage />}
          />
          <Route path="/admin/add-product" element={<AdminAddProductPage />} />

          <Route path="/user/all-orders" element={<UserAllOrdersPage />} />

          <Route
            path="/user/favorite-products"
            element={<UserFavoriteProducts />}
          />

          <Route path="/user/addresses" element={<UserAllAddressesPage />} />
          <Route
            path="/user/addresses/add-address"
            element={<UserAddAddressPage />}
          />
          <Route
            path="/user/addresses/edit-address"
            element={<UserEditAddressPage />}
          />

          <Route path="/user/profile" element={<UserProfilePage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
