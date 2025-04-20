import {
  CREATE_NEW_CATEGORY,
  GET_ALL_CATEGORY,
  GET_SPECIFIC_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_ERROR,
} from "../type";

const initialState = {
  category: [],
  viewSpecificCategory: [],
  deletedCategory: [],
  updatedCategory: [],
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

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: { ...state.loading, fetchAll: false },
        error: { ...state.error, fetchAll: null },
      };

    case GET_SPECIFIC_CATEGORY:
      return {
        ...state,
        viewSpecificCategory: action.payload,
        loading: { ...state.loading, fetchSpecific: false },
        error: { ...state.error, fetchSpecific: null },
      };

    case CREATE_NEW_CATEGORY:
      return {
        ...state,
        category: [...state.category, action.payload],
        loading: { ...state.loading, create: false },
        error: { ...state.error, create: null },
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        deletedCategory: action.payload,
        loading: { ...state.loading, delete: false },
        error: { ...state.error, delete: null },
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        updatedCategory: action.payload,
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

export default categoryReducer;
