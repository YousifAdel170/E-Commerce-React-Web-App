import { USER_ROLES } from "../../constants/general";
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
  SET_LOADING,
} from "../type";

const initialState = {
  user: JSON.parse(localStorage.getItem(USER_ROLES.USER)) || null,
  createUser: [],
  loginUser: null,
  currentUser: [],
  forgotPassword: [],
  verifyPassword: [],
  resetPassword: [],
  updatedUserProfile: [],
  updatedUserPassword: [],

  // Handle each loading separately
  loading: {
    login: false,
    register: false,
    forgot: false,
    verify: false,
    reset: false,
    updateProfile: false,
    updatePassword: false,
  },

  // Handle each error separately
  errors: {
    login: null,
    register: null,
    forgot: null,
    verify: null,
    reset: null,
    updateProfile: null,
    updatePassword: null,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // ============ Auth Info ============
    case SET_USER:
      return { ...state, user: action.payload };

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        loginUser: null,
      };

    // ============ Register ============
    case CREATE_NEW_USER:
      return {
        ...state,
        createUser: action.payload,
        loading: { ...state.loading, register: false },
        errors: { ...state.errors, register: null },
      };

    // ============ Login ============
    case LOGIN_USER:
      return {
        ...state,
        loginUser: action.payload,
        loading: { ...state.loading, login: false },
        errors: { ...state.errors, login: null },
      };

    // ============ Current User ============
    case GET_CURERNT_USER:
      return {
        ...state,
        currentUser: action.payload,
        loading: { ...state.loading, login: false },
        errors: { ...state.errors, login: null },
      };

    // ============ Forgot Password ============
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: action.payload,
        loading: { ...state.loading, forgot: false },
        errors: { ...state.errors, forgot: null },
      };

    // ============ Verify Password ============
    case VERIFY_PASSWORD:
      return {
        ...state,
        verifyPassword: action.payload,
        loading: { ...state.loading, verify: false },
        errors: { ...state.errors, verify: null },
      };

    // ============ Reset Password ============
    case RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload,
        loading: { ...state.loading, reset: false },
        errors: { ...state.errors, reset: null },
      };

    // ============ Update Profile ============
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        updatedUserProfile: action.payload,
        loading: { ...state.loading, updateProfile: false },
        errors: { ...state.errors, updateProfile: null },
      };

    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        updatedUserPassword: action.payload,
        loading: { ...state.loading, updatePassword: false },
        errors: { ...state.errors, updatePassword: null },
      };

    case UPDATE_USER_PROFILE_LOADING:
      return {
        ...state,
        loading: { ...state.loading, updateProfile: true },
      };

    // ============ Global Loading Handler ============
    case SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.context]: action.payload.value,
        },
        // Optionally reset error on new request
        errors: {
          ...state.errors,
          [action.payload.context]: null,
        },
      };
    // ============ Global Error Handler ============
    case GET_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.context]: false,
        },
        errors: {
          ...state.errors,
          [action.payload.context]: action.payload.error,
        },
      };

    default:
      return state;
  }
};

export default authReducer;
