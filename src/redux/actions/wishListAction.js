import useDeleteData from "../../hooks/axios/useDeleteData";
import { useGetDataToken } from "../../hooks/axios/useGetData";
import { useInsertData } from "../../hooks/axios/useInsertData";
import {
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
  VIEW_ALL_WISHLIST,
  GET_ERROR,
} from "../type";

// Action Responsible To Add Product To WishList
export const addToWishList = (body) => async (dispatch) => {
  try {
    // Response of Insert Data To WishList
    const response = await useInsertData("/api/v1/wishlist", body);

    // Dispatch Response To Reducer
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: response,
      loading: true,
    });
  } catch (e) {
    // Dispatch Error To Reducer
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: e.response,
    });
  }
};

// Action Responsible To Remove Product From WishList
export const removeFromWishList = (prodID) => async (dispatch) => {
  try {
    // Response of Delete Data From WishList
    const response = await useDeleteData(`/api/v1/wishlist/${prodID}`);

    // Dispatch Response To Reducer
    dispatch({
      type: DELETE_FROM_WISHLIST,
      payload: response,
      loading: true,
    });
  } catch (e) {
    // Dispatch Error To Reducer
    dispatch({
      type: DELETE_FROM_WISHLIST,
      payload: e.response,
    });
  }
};

// Action Responsible To view all Products Of the WishList
export const viewAllWishList = () => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/wishlist`);

    dispatch({
      type: VIEW_ALL_WISHLIST,
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
