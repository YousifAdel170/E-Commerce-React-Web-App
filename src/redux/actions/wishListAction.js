import useDeleteData from "../../hooks/axios/useDeleteData";
import { useGetDataToken } from "../../hooks/axios/useGetData";
import { useInsertData } from "../../hooks/axios/useInsertData";

import {
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
  VIEW_ALL_WISHLIST,
  GET_ERROR,
  RESET_STATE_WISHLIST,
} from "../type";

// Add to Wishlist
export const createToWishList = (body) => async (dispatch) => {
  try {
    dispatch({ type: RESET_STATE_WISHLIST });

    const response = await useInsertData("/api/v1/wishlist", body);

    dispatch({
      type: ADD_TO_WISHLIST,
      payload: response,
    });

    return response;
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message,
      meta: "create",
    });
    throw e;
  }
};

// Remove from Wishlist
export const deleteFromWishList = (id) => async (dispatch) => {
  try {
    dispatch({ type: RESET_STATE_WISHLIST });

    const response = await useDeleteData(`/api/v1/wishlist/${id}`);

    dispatch({
      type: DELETE_FROM_WISHLIST,
      payload: { response, id },
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message,
      meta: "delete",
    });
  }
};

// Get all Wishlist
export const getAllWishList = (limit) => async (dispatch) => {
  try {
    dispatch({ type: RESET_STATE_WISHLIST });

    const query = limit ? `?limit=${limit}` : "";
    const response = await useGetDataToken(`/api/v1/wishlist${query}`);

    dispatch({
      type: VIEW_ALL_WISHLIST,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message,
      meta: "fetchAll",
    });
  }
};

// Reset State
export const resetState = () => ({
  type: RESET_STATE_WISHLIST,
});
