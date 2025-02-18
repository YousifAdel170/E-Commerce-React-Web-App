import { CREATE_NEW_PRODUCT, GET_ERROR } from "../type";

const initialState = {
  products: [],
  loading: true,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_ALL_CATEGORY:
    //   return { ...state, category: action.payload, loading: false };
    case CREATE_NEW_PRODUCT:
      return { ...state, products: action.payload, loading: false };
    case GET_ERROR:
      return { products: action.payload, loading: true };
    default:
      return state;
  }
};

export default productsReducer;
