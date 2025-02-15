import { CREATE_NEW_SUB_CATEGORY, GET_ERROR } from "../type";

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
