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
  RESET_STATE,
} from "../type";

// Action Responsible To View All addresses of the logged in user
export const getAllUserAddress = (limit) => async (dispatch) => {
  try {
    const query = limit ? `?limit=${limit}` : "";
    const result = await useGetDataToken(`/api/v1/addresses${query}`);

    dispatch({
      type: VIEW_ALL_USER_ADDRESSES,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "fetchAll",
    });
  }
};

// Get All Addresses (Specific Page)
export const getAllAddressesInSelectedPage =
  (limit, page) => async (dispatch) => {
    try {
      let query = "?";

      if (limit !== undefined && limit !== null) query += `limit=${limit}&`;
      if (page !== undefined && page !== null) query += `page=${page}&`;

      query = query === "?" ? "" : query.slice(0, -1);

      const result = await useGetDataToken(`/api/v1/addresses${query}`);
      dispatch({
        type: VIEW_ALL_USER_ADDRESSES,
        payload: result,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: e.response?.data?.message || e.message || "Unknown error",
        meta: "fetchAll",
      });
    }
  };

// Action Responsible To add new address for the logged in user
export const addUserAddress = (body) => async (dispatch) => {
  try {
    const response = await useInsertData("/api/v1/addresses", body);
    dispatch({
      type: ADD_USER_ADDRESS,
      payload: response,
    });
    return Promise.resolve(response);
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "create",
    });
    return Promise.reject(e);
  }
};

// Action Responsible To Delete Specific address by its ID
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/addresses/${id}`);
    dispatch({
      type: DELETE_USER_ADDRESS,
      payload: { response, id },
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "delete",
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
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "fetchSpecific",
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
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "update",
    });
  }
};

// Action To Reset State After Specific Action
export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE,
  });
};
