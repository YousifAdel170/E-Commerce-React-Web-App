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
  loading: true,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return { ...state, category: action.payload, loading: false };

    case GET_SPECIFIC_CATEGORY:
      return { viewSpecificCategory: action.payload, loading: false };

    case CREATE_NEW_CATEGORY:
      return { category: action.payload, loading: false };

    case DELETE_CATEGORY:
      return { deletedCategory: action.payload, loading: false };

    case UPDATE_CATEGORY:
      return { updatedCategory: action.payload, loading: false };

    case GET_ERROR:
      return { category: action.payload, loading: true };

    default:
      return state;
  }
};

export default categoryReducer;
