import useDeleteData from "../../hooks/axios/useDeleteData";
import { useGetDataToken } from "../../hooks/axios/useGetData";
import { useInsertData } from "../../hooks/axios/useInsertData";
import { useUpdateData } from "../../hooks/axios/useUpdateData";
import {
  CREATE_REVIEW,
  DELETE_REVIEW,
  UPDATE_REVIEW,
  GET_ALL_PRODUCTS_REVIEWS,
  GET_ERROR,
  RESET_STATE_REVIEW,
} from "../type";

// Create Review Action [Create Review]
export const createReview = (prodID, body) => async (dispatch) => {
  try {
    const response = await useInsertData(
      `/api/v1/products/${prodID}/reviews`,
      body,
    );
    dispatch({
      type: CREATE_REVIEW,
      payload: response,
    });
    return Promise.resolve(response);
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.errors || e.message || "Unknown error",
      meta: "create",
    });
    // return Promise.reject(e);
  }
};

// Get All Product Rates Action [Get All Products Reviews]
export const getAllProductRates = (prodID, page, limit) => async (dispatch) => {
  try {
    const response = await useGetDataToken(
      `/api/v1/products/${prodID}/reviews?page=${page}&limit=${limit}`,
    );

    dispatch({
      type: GET_ALL_PRODUCTS_REVIEWS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "fetchAll",
    });
  }
};

// Delete Rate Action [Delete Review]
export const deleteRate = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/reviews/${id}`);

    dispatch({
      type: DELETE_REVIEW,
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

// Update Rate Action [Update Review]
export const updateRate = (id, body) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/reviews/${id}`, body);

    dispatch({
      type: UPDATE_REVIEW,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response || e.message || "Unknown error",
      meta: "update",
    });
  }
};

// Action To Reset State After Specific Action
export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET_STATE_REVIEW,
  });
};
