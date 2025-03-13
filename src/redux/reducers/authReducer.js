import {
  CREATE_NEW_USER,
  GET_CURERNT_USER,
  LOGIN_USER,
  FORGOT_PASSWORD,
  VERIFY_PASSWORD,
  RESET_PASSWORD,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PASSWORD,
} from "../type";

const initialState = {
  createUser: [],
  loginUser: [],
  currentUser: [],
  forgotPassword: [],
  verifyPassword: [],
  resetPassword: [],
  updatedUserProfile: [],
  updatedUserPassword: [],
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

    case FORGOT_PASSWORD:
      return { ...state, forgotPassword: action.payload, loading: false };

    case VERIFY_PASSWORD:
      return { ...state, verifyPassword: action.payload, loading: false };

    case RESET_PASSWORD:
      return { ...state, resetPassword: action.payload, loading: false };

    case UPDATE_USER_PROFILE:
      return { ...state, updatedUserProfile: action.payload, loading: false };

    case UPDATE_USER_PASSWORD:
      return { ...state, updatedUserPassword: action.payload, loading: false };

    default:
      return state;
  }
};

export default authReducer;
