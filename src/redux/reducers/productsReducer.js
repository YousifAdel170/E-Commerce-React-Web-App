import {
  CREATE_NEW_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_BY_CATEGORY,
  GET_ALL_PRODUCTS_BY_BRAND,
  GET_SPECIFIC_PRODUCT,
  GET_PODUCTS_LIKE,
  GET_ERROR,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../type";

const initialState = {
  products: [],
  viewProducts: [],
  viewProductsByCategory: [],
  viewProductsByBrand: [],
  viewSpecificProduct: [],
  viewProductsLike: [],
  updatedProduct: [],
  deletedProduct: [],
  loading: {
    fetchAll: true,
    fetchSpecific: true,
    create: true,
    delete: true,
    update: true,
  },
  error: {
    fetchAll: null,
    fetchSpecific: null,
    create: null,
    delete: null,
    update: null,
  },
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        viewProducts: action.payload,
        loading: { ...state.loading, fetchAll: false },
        error: { ...state.error, fetchAll: null },
      };

    case GET_ALL_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        viewProductsByCategory: action.payload,
        loading: { ...state.loading, fetchAll: false },
        error: { ...state.error, fetchAll: null },
      };

    case GET_ALL_PRODUCTS_BY_BRAND:
      return {
        ...state,
        viewProductsByBrand: action.payload,
        loading: { ...state.loading, fetchAll: false },
        error: { ...state.error, fetchAll: null },
      };

    case GET_SPECIFIC_PRODUCT:
      return {
        ...state,
        viewSpecificProduct: action.payload,
        loading: { ...state.loading, fetchSpecific: false },
        error: { ...state.error, fetchSpecific: null },
      };

    case GET_PODUCTS_LIKE:
      return {
        ...state,
        viewProductsLike: action.payload,
        loading: { ...state.loading, fetchSpecific: false },
        error: { ...state.error, fetchSpecific: null },
      };

    case CREATE_NEW_PRODUCT:
      return {
        ...state,
        products: action.payload,
        loading: { ...state.loading, create: false },
        error: { ...state.error, create: null },
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        updatedProduct: action.payload,
        loading: { ...state.loading, update: false },
        error: { ...state.error, update: null },
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        deletedProduct: action.payload,
        loading: { ...state.loading, delete: false },
        error: { ...state.error, delete: null },
      };

    case GET_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.meta]: false,
        },
        error: {
          ...state.error,
          [action.meta]: action.payload,
        },
      };

    default:
      return state;
  }
};

export default productsReducer;
