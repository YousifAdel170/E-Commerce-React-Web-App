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
  RESET_STATE,
} from "../type";

const initialState = {
  createdProduct: [],
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
        createdProduct: action.payload,

        viewProducts: {
          ...state.viewProducts,
          data: [...(state.viewProducts.data || []), action.payload.data.data],
          paginationResult: state.viewProducts.paginationResult,
        },
        loading: { ...state.loading, create: false },
        error: { ...state.error, create: null },
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        deletedProduct: action.payload.response,

        viewProducts: {
          ...state.viewProducts,
          data: state.viewProducts.data.filter(
            (b) => b._id !== action.payload.id
          ),
          paginationResult: state.viewProducts.paginationResult,
        },
        loading: { ...state.loading, delete: false },
        error: { ...state.error, delete: null },
      };

    case UPDATE_PRODUCT:
      return {
        updatedProduct: action.payload,
        loading: { ...state.loading, update: false },
        error: { ...state.error, update: null },
        viewProducts: {
          ...state.viewProducts,
          data: state.viewProducts.data.map((product) =>
            product._id === action.payload.data._id
              ? action.payload.data
              : product
          ),
          paginationResult: state.viewProducts.paginationResult,
        },
      };

    case RESET_STATE:
      return {
        ...state,
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
        updatedProduct: [],
        createdProduct: [],
        deletedProduct: [],
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
