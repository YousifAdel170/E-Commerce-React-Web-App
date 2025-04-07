import {
  CREATE_NEW_CATEGORY,
  GET_ALL_CATEGORY,
  GET_SPECIFIC_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_ERROR,
} from "../type";

import { useGetData } from "../../hooks/axios/useGetData";
import useDeleteData from "../../hooks/axios/useDeleteData";
import { useUpdateDataWithImage } from "../../hooks/axios/useUpdateData";
import { useInsertDataWithImage } from "../../hooks/axios/useInsertData";

// Get All Items From the Categories with Specified Limit [First Page]
export const getAllCategory = (limit) => async (dispatch) => {
  try {
    const result = await useGetData(`/api/v1/categories?limit=${limit}`);
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Get All Items From the Categories with Specified Limit [Specified Page]
export const getAllCategoryInSelectedPage =
  (limit, page) => async (dispatch) => {
    try {
      const result = await useGetData(
        `/api/v1/categories?limit=${limit}&page=${page}`
      );
      dispatch({
        type: GET_ALL_CATEGORY,
        payload: result,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: "Error " + e,
      });
    }
  };

// Add new Item To The API
export const createNewCategory = (formData) => async (dispatch) => {
  try {
    const result = await useInsertDataWithImage(`/api/v1/categories`, formData);
    dispatch({
      type: CREATE_NEW_CATEGORY,
      payload: result,
    });
    return Promise.resolve(result);
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
    Promise.reject(e);
  }
};

// Get The Category by its ID
export const getSpecificCategory = (id) => async (dispatch) => {
  try {
    const result = await useGetData(`/api/v1/categories/${id}`);
    dispatch({
      type: GET_SPECIFIC_CATEGORY,
      payload: result,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Action To Delete Specific Category USing Its ID
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`api/v1/categories/${id}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response,
    });
  }
};

// Action To Update Specific Category USing Its ID
export const editCategory = (id, formatData) => async (dispatch) => {
  try {
    const response = await useUpdateDataWithImage(
      `/api/v1/categories/${id}`,
      formatData
    );
    dispatch({
      type: UPDATE_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response,
    });
  }
};
