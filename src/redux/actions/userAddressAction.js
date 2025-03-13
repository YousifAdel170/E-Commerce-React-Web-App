import useDeleteData from "../../hooks/axios/useDeleteData";
import { useGetDataToken } from "../../hooks/axios/useGetData";
import { useInsertData } from "../../hooks/axios/useInsertData";
import { useUpdateData } from "../../hooks/axios/useUpdateData";
import {
  GET_ERROR,
  ADD_USER_ADDRESS,
  VIEW_ALL_USER_ADDRESSES,
  DELETE_USER_ADDRESS,
  GET_SPECIFIC_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
} from "../type";

// Action Responsible To add new address for the logged in user
export const addUserAddress = (body) => async (dispatch) => {
  try {
    const response = await useInsertData("/api/v1/addresses", body);
    dispatch({
      type: ADD_USER_ADDRESS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.response,
    });
  }
};

// Action Responsible To View All addresses of the logged in user
export const getAllUserAddress = () => async (dispatch) => {
  try {
    const response = await useGetDataToken("/api/v1/addresses");
    dispatch({
      type: VIEW_ALL_USER_ADDRESSES,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.response,
    });
  }
};

// Action Responsible To Delete Specific address by its ID
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/addresses/${id}`);
    dispatch({
      type: DELETE_USER_ADDRESS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.response,
    });
  }
};

// Action Responsible To Get Specific address by its ID
export const getSpecificUserAddress = (id) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/addresses/${id}`);
    dispatch({
      type: GET_SPECIFIC_USER_ADDRESS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.response,
    });
  }
};

// Action Responsible To Update Specific address by its ID
export const updateUserAddress = (id, body) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/addresses/${id}`, body);
    dispatch({
      type: UPDATE_USER_ADDRESS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.response,
    });
  }
};
