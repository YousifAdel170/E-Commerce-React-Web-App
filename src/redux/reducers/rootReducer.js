import { combineReducers } from "redux";

import categoryReducer from "./categoryReducer";
import brandReducer from "./brandReducer";
import subCategoryReducer from "./subCategoryReducer";
import productsReducer from "./productsReducer";

export default combineReducers({
  allCategory: categoryReducer,
  allBrand: brandReducer,
  allSubCategory: subCategoryReducer,
  allProduct: productsReducer,
});
