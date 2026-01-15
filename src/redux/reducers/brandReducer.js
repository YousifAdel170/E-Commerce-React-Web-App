import {
  CREATE_NEW_BRAND,
  GET_ALL_BRAND,
  DELETE_BRAND,
  UPDATE_BRAND,
  GET_ERROR,
  GET_SPECIFIC_BRAND,
} from "../type";

const initialState = {
  brand: [],
  viewSpecificBrand: [],
  deletedBrand: [],
  updatedBrand: [],

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

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BRAND:
      return {
        ...state,
        brand: action.payload,
        loading: { ...state.loading, fetchAll: false },
        error: { ...state.error, fetchAll: null },
      };

    case GET_SPECIFIC_BRAND:
      return {
        viewSpecificBrand: action.payload,
        loading: { ...state.loading, fetchSpecific: false },
        error: { ...state.error, fetchSpecific: null },
      };

    case CREATE_NEW_BRAND:
      return {
        ...state,
        brand: {
          ...state.brand,
          data: [...(state.brand.data || []), action.payload], // ✅ append new brand
          paginationResult: state.brand.paginationResult,
        },
        loading: { ...state.loading, create: false },
        error: { ...state.error, create: null },
      };

    case DELETE_BRAND:
      return {
        ...state,
        brand: {
          ...state.brand,
          data: state.brand.data.filter((b) => b._id !== action.payload.id),
          paginationResult: state.brand.paginationResult,
        },
        deletedBrand: action.payload.response,
        loading: { ...state.loading, delete: false },
        error: { ...state.error, delete: null },
      };

    case UPDATE_BRAND:
      return {
        updatedBrand: action.payload,
        loading: { ...state.loading, update: false },
        error: { ...state.error, update: null },
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

export default brandReducer;
