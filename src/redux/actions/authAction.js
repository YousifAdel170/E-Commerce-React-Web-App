import { BACKEND_URLS } from "../../constants/backendURLs";
import { STORAGE_KEYS } from "../../constants/storage";
import { useGetDataToken } from "../../hooks/axios/useGetData";
import { useInsertData } from "../../hooks/axios/useInsertData";
import { useUpdateData } from "../../hooks/axios/useUpdateData";
import { AUTH_CONTEXTS } from "../contextType";
import {
  CREATE_NEW_USER,
  GET_ERROR,
  LOGIN_USER,
  GET_CURERNT_USER,
  FORGOT_PASSWORD,
  VERIFY_PASSWORD,
  RESET_PASSWORD,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PASSWORD,
  SET_USER,
  LOGOUT_USER,
  UPDATE_USER_PROFILE_LOADING,
  SET_LOADING,
} from "../type";

// Action to set the user from the local storage if ther e
export const setUser = (user) => async (dispatch) => {
  localStorage.setItem(STORAGE_KEYS.LOCAL.AUTH.USER, JSON.stringify(user));
  await dispatch({ type: SET_USER, payload: user });
};

// Action responsible to logout by removing the user, token from the local storage
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem(STORAGE_KEYS.LOCAL.AUTH.USER);
  localStorage.removeItem(STORAGE_KEYS.LOCAL.AUTH.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.LOCAL.AUTH.EMAIL);
  await dispatch({ type: LOGOUT_USER });
};

// Registeration Action [ Create A New User ]
export const createNewUser = (data) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: { context: AUTH_CONTEXTS.REGISTER, value: true },
  });

  try {
    const response = await useInsertData(BACKEND_URLS.AUTH.REGISTER, data);
    dispatch({
      type: CREATE_NEW_USER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: {
        context: AUTH_CONTEXTS.REGISTER,
        error: e?.response,
      },
    });
  }
};

// Login User Action
export const loginUser = (data) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: { context: AUTH_CONTEXTS.LOGIN, value: true },
  });

  try {
    const response = await useInsertData(BACKEND_URLS.AUTH.LOGIN, data);
    dispatch({
      type: LOGIN_USER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: {
        context: AUTH_CONTEXTS.LOGIN,
        error: e?.response || { message: e?.message },
      },
    });
  }
};

// Get Current User [User The Has Been Logged In]
export const getLoggedInUser = () => async (dispatch) => {
  try {
    const response = await useGetDataToken(BACKEND_URLS.AUTH.GET_ME);
    dispatch({
      type: GET_CURERNT_USER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e?.response?.data || { message: e?.message },
    });
  }
};

// Forgot Password Of The User [1st Step]
export const forgotPassword = (data) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: { context: AUTH_CONTEXTS.FORGOT, value: true },
  });
  try {
    const response = await useInsertData(
      BACKEND_URLS.AUTH.FORGOT_PASSWORD,
      data
    );
    dispatch({
      type: FORGOT_PASSWORD,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: {
        context: AUTH_CONTEXTS.FORGOT,
        error: error?.response || { message: error?.message },
      },
    });
  }
};

// Verify Code Of The Forgotten Password [2nd Step]
export const verifyPassword = (data) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: { context: AUTH_CONTEXTS.VERIFY, value: true },
  });

  try {
    const response = await useInsertData(
      BACKEND_URLS.AUTH.VERIFY_PASSWORD,
      data
    );
    dispatch({
      type: VERIFY_PASSWORD,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: {
        context: AUTH_CONTEXTS.VERIFY,
        error: error?.response,
      },
    });
  }
};

// Reset The Password Of The Forgotten Password [3rd Step]
export const resetPassword = (data) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: { context: AUTH_CONTEXTS.RESET, value: true },
  });

  try {
    const response = await useUpdateData(
      BACKEND_URLS.AUTH.RESET_PASSWORD,
      data
    );
    dispatch({
      type: RESET_PASSWORD,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: {
        context: AUTH_CONTEXTS.RESET,
        error: error?.response,
      },
    });
  }
};

// Update The User Data
export const updateUserProfile = (body) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_PROFILE_LOADING }); // Dispatch loading state
    const response = await useUpdateData(
      BACKEND_URLS.AUTH.UPDATE_USER_PROFILE,
      body
    );
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: error?.response.data,
    });
  }
};

// Update The User Password
export const updateUserPassword = (body) => async (dispatch) => {
  try {
    const response = await useUpdateData(
      BACKEND_URLS.AUTH.UPDATE_USER_PASSWORD,
      body
    );
    dispatch({
      type: UPDATE_USER_PASSWORD,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: error?.response,
    });
  }
};
