import { combineReducers } from "redux";

import categoryReducer from "./categoryReducer";
import brandReducer from "./brandReducer";
import subCategoryReducer from "./subCategoryReducer";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";
import reviewReducer from "./reviewReducer";
import wishListReducer from "./wishListReducer";
import couponReducer from "./couponReducer";
import userAddressReducer from "./userAddressReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import ordersReducer from "./ordersReducer";
import uiSettingsReducer from "./uiSetttingsReducer";

// Combine all reducers into a single root reducer
export default combineReducers({
  allCategory: categoryReducer, // Reducer for categories
  allBrand: brandReducer, // Reducer for brands
  allSubCategory: subCategoryReducer, // Reducer for subcategories
  allProduct: productsReducer, // Reducer for products
  authReducer: authReducer, // Reducer for authentication
  reviewReducer: reviewReducer, // Reducer for reviews
  wishListReducer: wishListReducer, // Reducer for wishlist
  couponReducer: couponReducer, // Reducer for coupons
  userAddressReducer: userAddressReducer, // Reducer for user addresses
  cartReducer: cartReducer, // Reducer for Cart
  checkoutReducer: checkoutReducer, // Reducer for Checkout
  ordersReducer: ordersReducer, // Reducer for Orders

  ui: uiSettingsReducer,
});
