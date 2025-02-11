import { CREATE_NEW_BRAND, GET_ALL_BRAND, GET_ERROR } from "../type";

const initialState = {
  brand: [],
  loading: true,
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BRAND:
      return { ...state, brand: action.payload, loading: false };
    case CREATE_NEW_BRAND:
      return { brand: action.payload, loading: false };
    case GET_ERROR:
      return { brand: action.payload, loading: true };
    default:
      return state;
  }
};

export default brandReducer;
