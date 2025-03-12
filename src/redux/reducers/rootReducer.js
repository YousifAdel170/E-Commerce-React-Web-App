import { combineReducers } from "redux";

import categoryReducer from "./categoryReducer";
import brandReducer from "./brandReducer";
import subCategoryReducer from "./subCategoryReducer";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";
import reviewReducer from "./reviewReducer";
import wishListReducer from "./wishListReducer";
import couponReducer from "./couponReducer";

export default combineReducers({
  allCategory: categoryReducer,
  allBrand: brandReducer,
  allSubCategory: subCategoryReducer,
  allProduct: productsReducer,
  authReducer: authReducer,
  reviewReducer: reviewReducer,
  wishListReducer: wishListReducer,
  couponReducer: couponReducer,
});
