import useDeleteData from "../../hooks/axios/useDeleteData";
import { useGetDataToken } from "../../hooks/axios/useGetData";
import { useInsertData } from "../../hooks/axios/useInsertData";
import { useUpdateData } from "../../hooks/axios/useUpdateData";
import {
  CREATE_REVIEW,
  DELETE_REVIEW,
  UPDATE_REVIEW,
  GET_ALL_PRODUCTS_REVIEWS,
} from "../type";

// Create Review Action [Create Review]
export const createReview = (prodID, body) => async (dispatch) => {
  try {
    const response = await useInsertData(
      `/api/v1/products/${prodID}/reviews`,
      body
    );

    dispatch({
      type: CREATE_REVIEW,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: CREATE_REVIEW,
      payload: e.response,
    });
  }
};

// Get All Product Rates Action [Get All Products Reviews]
export const getAllProductRates = (prodID, page, limit) => async (dispatch) => {
  try {
    const response = await useGetDataToken(
      `/api/v1/products/${prodID}/reviews?page=${page}&limit=${limit}`
    );

    dispatch({
      type: GET_ALL_PRODUCTS_REVIEWS,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_PRODUCTS_REVIEWS,
      payload: e.response,
    });
  }
};

// Delete Rate Action [Delete Review]
export const deleteRate = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/reviews/${id}`);

    dispatch({
      type: DELETE_REVIEW,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: DELETE_REVIEW,
      payload: e.response,
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
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_REVIEW,
      payload: e.response,
    });
  }
};
