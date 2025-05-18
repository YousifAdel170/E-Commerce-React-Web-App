import {
  CREATE_NEW_USER,
  GET_CURERNT_USER,
  LOGIN_USER,
  FORGOT_PASSWORD,
  VERIFY_PASSWORD,
  RESET_PASSWORD,
  UPDATE_USER_PROFILE_LOADING,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PASSWORD,
  SET_USER,
  LOGOUT_USER,
  GET_ERROR,
} from "../type";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  createUser: [],
  loginUser: null,
  currentUser: [],
  forgotPassword: [],
  verifyPassword: [],
  resetPassword: [],
  updatedUserProfile: [],
  updatedUserPassword: [],
  loading: true,
  errors: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case LOGOUT_USER:
      return { ...state, user: null, loginUser: null };

    case CREATE_NEW_USER:
      return {
        ...state,
        createUser: action.payload,
        loading: false,
        errors: null,
      };

    case LOGIN_USER:
      return {
        ...state,
        loginUser: action.payload,
        loading: false,
        errors: null,
      };

    case GET_CURERNT_USER:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        errors: null,
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: action.payload,
        loading: false,
        errors: null,
      };

    case VERIFY_PASSWORD:
      return {
        ...state,
        verifyPassword: action.payload,
        loading: false,
        errors: null,
      };

    case RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload,
        loading: false,
        errors: null,
      };

    case UPDATE_USER_PROFILE:
      return {
        ...state,
        updatedUserProfile: action.payload,
        loading: false,
        errors: null,
      };

    case UPDATE_USER_PROFILE_LOADING:
      return { ...state, loading: true };

    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        updatedUserPassword: action.payload,
        loading: false,
        errors: null,
      };

    case GET_ERROR:
      return { ...state, errors: action.payload, loading: false };

    default:
      return state;
  }
};

export default authReducer;
