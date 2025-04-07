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
  loading: true,
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BRAND:
      return { ...state, brand: action.payload, loading: false };

    case GET_SPECIFIC_BRAND:
      return { viewSpecificBrand: action.payload, loading: false };

    case CREATE_NEW_BRAND:
      return { brand: action.payload, loading: false };

    case DELETE_BRAND:
      return { deletedBrand: action.payload, loading: false };

    case UPDATE_BRAND:
      return { updatedBrand: action.payload, loading: false };

    case GET_ERROR:
      return { brand: action.payload, loading: true };

    default:
      return state;
  }
};

export default brandReducer;
