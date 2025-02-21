import {
  CREATE_NEW_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_SPECIFIC_PRODUCT,
  GET_PODUCTS_LIKE,
  GET_ERROR,
  DELETE_PRODUCT,
} from "../type";

const initialState = {
  products: [],
  viewProducts: [],
  viewSpecificProduct: [],
  viewProductsLike: [],
  deletedProduct: [],
  loading: true,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, viewProducts: action.payload, loading: false };

    case GET_SPECIFIC_PRODUCT:
      return { viewSpecificProduct: action.payload, loading: false };

    case GET_PODUCTS_LIKE:
      return { ...state, viewProductsLike: action.payload, loading: false };

    case CREATE_NEW_PRODUCT:
      return { ...state, products: action.payload, loading: false };

    case DELETE_PRODUCT:
      return { ...state, deletedProduct: action.payload, loading: false };

    case GET_ERROR:
      return { products: action.payload, loading: true };

    default:
      return state;
  }
};

export default productsReducer;
