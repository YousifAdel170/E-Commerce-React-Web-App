import { combineReducers } from "redux";

import categoryReducer from "./categoryReducer";
import brandReducer from "./brandReducer";
import subCategoryReducer from "./subCategoryReducer";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";

export default combineReducers({
  allCategory: categoryReducer,
  allBrand: brandReducer,
  allSubCategory: subCategoryReducer,
  allProduct: productsReducer,
  authReducer: authReducer,
});
