import {
  CREATE_NEW_SUB_CATEGORY,
  GET_ALL_SUB_CATEGORY,
  GET_SPECIFIC_SUB_CATEGORY,
  DELETED_SUB_CATEGORY,
  UPDATED_SUB_CATEGORY,
  GET_ERROR,
} from "../type";

const initialState = {
  subCategory: [],
  loading: true,
};

const subCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_SUB_CATEGORY:
      return {
        ...state,
        subCategory: action.payload,
        loading: false,
      };

    case GET_ALL_SUB_CATEGORY:
      return {
        subCategory: action.payload,
        loading: false,
      };

    case GET_SPECIFIC_SUB_CATEGORY:
      return {
        specificSubcategory: action.payload,
        loading: false,
      };

    case DELETED_SUB_CATEGORY:
      return {
        deletedSubcategory: action.payload,
        loading: false,
      };

    case UPDATED_SUB_CATEGORY:
      return {
        updatedSubCategory: action.payload,
        loading: false,
      };

    case GET_ERROR:
      return {
        loading: true,
        subCategory: action.payload,
      };

    default:
      return state;
  }
};
export default subCategoryReducer;
