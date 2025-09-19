import {
  CREATE_NEW_BRAND,
  GET_ALL_BRAND,
  GET_SPECIFIC_BRAND,
  DELETE_BRAND,
  UPDATE_BRAND,
  GET_ERROR,
  RESET_STATE,
} from "../type";

import { useInsertDataWithImage } from "../../hooks/axios/useInsertData";
import { useGetData } from "../../hooks/axios/useGetData";
import useDeleteData from "../../hooks/axios/useDeleteData";
import { useUpdateDataWithImage } from "../../hooks/axios/useUpdateData";

// Get All Items From the Brands with Specified Limit [First Page]
export const getAllBrand = (limit) => async (dispatch) => {
  try {
    const result = await useGetData(`/api/v1/brands?limit=${limit}`);
    dispatch({
      type: GET_ALL_BRAND,
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

// Get All Items From the Brands with Specified Limit [Specified Page]
export const getAllBrandInSelectedPage = (limit, page) => async (dispatch) => {
  try {
    const result = await useGetData(
      `/api/v1/brands?limit=${limit}&page=${page}`
    );
    dispatch({
      type: GET_ALL_BRAND,
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

// Add new Item To The API
export const createNewBrand = (formData) => async (dispatch) => {
  try {
    const result = await useInsertDataWithImage(`/api/v1/brands`, formData);
    dispatch({
      type: CREATE_NEW_BRAND,
      payload: result,
    });
    return Promise.resolve(result);
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "create",
    });
    Promise.reject(e);
  }
};

// Get The Brand by its ID
export const getSpecificBrand = (id) => async (dispatch) => {
  try {
    const result = await useGetData(`/api/v1/brands/${id}`);
    dispatch({
      type: GET_SPECIFIC_BRAND,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "fetchSpecific",
    });
  }
};

// Action To Delete Specific Brand USing Its ID
export const deleteBrand = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`api/v1/brands/${id}`);
    dispatch({
      type: DELETE_BRAND,
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

// Action To Update Specific Brand USing Its ID
export const editBrand = (id, formatData) => async (dispatch) => {
  try {
    const response = await useUpdateDataWithImage(
      `/api/v1/brands/${id}`,
      formatData
    );
    dispatch({
      type: UPDATE_BRAND,
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
