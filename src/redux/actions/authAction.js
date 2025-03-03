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
} from "../type";

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
      payload: "Error " + e,
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
      payload: "Error " + e,
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
      payload: "Error " + e,
    });
  }
};

// Forgot Password Of The User [1st Step]
export const forgotPassword = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/forgotPasswords`, data);
    dispatch({
      type: FORGOT_PASSWORD,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
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
