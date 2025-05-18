import { useGetDataToken } from "../../hooks/axios/useGetData";
import { useInsertData } from "../../hooks/axios/useInsertData";
import { useUpdateData } from "../../hooks/axios/useUpdateData";
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
} from "../type";

// Action to set the user from the local storage if ther e
export const setUser = (user) => async (dispatch) => {
  localStorage.setItem("user", JSON.stringify(user));
  await dispatch({ type: SET_USER, payload: user });
};

// Action responsible to logout by removing the user, token from the local storage
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("user-email");
  await dispatch({ type: LOGOUT_USER });
};

// Registeration Action [ Create A New User ]
export const createNewUser = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/signup`, data);
    dispatch({
      type: CREATE_NEW_USER,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data || { message: e.message },
    });
  }
};

// Login User Action
export const loginUser = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/login`, data);
    dispatch({
      type: LOGIN_USER,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data || { message: e.message },
    });
  }
};

// Get Current User [User The Has Been Logged In]
export const getLoggedInUser = () => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/users/getMe`);
    dispatch({
      type: GET_CURERNT_USER,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data || { message: e.message },
    });
  }
};

// Forgot Password Of The User [1st Step]
export const forgotPassword = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/forgotPasswords`, data);
    console.log("response from action", response);
    dispatch({
      type: FORGOT_PASSWORD,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data || { message: e.message },
    });
  }
};

// Verify Code Of The Forgotten Password [2nd Step]
export const verifyPassword = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/verifyResetCode`, data);
    dispatch({
      type: VERIFY_PASSWORD,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response,
    });
  }
};

// Reset The Password Of The Forgotten Password [3rd Step]
export const resetPassword = (data) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/auth/resetPassword`, data);
    dispatch({
      type: RESET_PASSWORD,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response,
    });
  }
};

// Update The User Data
export const updateUserProfile = (body) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_PROFILE_LOADING }); // Dispatch loading state
    const response = await useUpdateData(`/api/v1/users/updateMe`, body);
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response.data,
    });
  }
};

// Update The User Password
export const updateUserPassword = (body) => async (dispatch) => {
  try {
    const response = await useUpdateData(
      `/api/v1/users/changeMyPassword`,
      body
    );
    dispatch({
      type: UPDATE_USER_PASSWORD,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response,
    });
  }
};
