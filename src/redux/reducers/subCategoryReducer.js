import {
  CREATE_NEW_SUB_CATEGORY,
  GET_ALL_SUB_CATEGORY,
  GET_SPECIFIC_SUB_CATEGORY,
  DELETED_SUB_CATEGORY,
  UPDATED_SUB_CATEGORY,
  GET_ERROR,
  RESET_STATE,
} from "../type";

const initialState = {
  subCategory: [],
  specificSubcategory: [],
  deletedSubcategory: [],
  updatedSubCategory: [],
  createdSubCategory: [],
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

const subCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SUB_CATEGORY:
      return {
        ...state,
        subCategory: action.payload,
        loading: { ...state.loading, fetchAll: false },
        error: { ...state.error, fetchAll: null },
      };

    case GET_SPECIFIC_SUB_CATEGORY:
      return {
        specificSubcategory: action.payload,
        loading: { ...state.loading, fetchSpecific: false },
        error: { ...state.error, fetchSpecific: null },
      };

    case CREATE_NEW_SUB_CATEGORY:
      return {
        ...state,
        createdSubCategory: action.payload,
        subCategory: {
          ...state.subCategory,
          data: [...(state.subCategory.data || []), action.payload],
          paginationResult: state.subCategory.paginationResult,
        },
        loading: { ...state.loading, create: false },
        error: { ...state.error, create: null },
      };

    case DELETED_SUB_CATEGORY:
      return {
        ...state,
        subCategory: {
          ...state.subCategory,
          data: state.subCategory.data.filter(
            (item) => item._id !== action.payload.id
          ),
          results: state.subCategory.results - 1,
          paginationResult: state.subCategory.paginationResult,
        },

        deletedSubcategory: action.payload.response,
        loading: { ...state.loading, delete: false },
        error: { ...state.error, delete: null },
      };

    case UPDATED_SUB_CATEGORY:
      return {
        updatedSubCategory: action.payload,
        loading: { ...state.loading, update: false },
        error: { ...state.error, update: null },
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
export default subCategoryReducer;
