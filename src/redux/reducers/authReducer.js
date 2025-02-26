import { CREATE_NEW_USER, GET_CURERNT_USER, LOGIN_USER } from "../type";

const initialState = {
  createUser: [],
  loginUser: [],
  currentUser: [],
  loading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_USER:
      return { ...state, createUser: action.payload, loading: false };

    case LOGIN_USER:
      return { ...state, loginUser: action.payload, loading: false };

    case GET_CURERNT_USER:
      return { ...state, currentUser: action.payload, loading: false };

    default:
      return state;
  }
};

export default authReducer;
