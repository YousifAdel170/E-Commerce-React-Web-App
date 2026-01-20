import useDeleteData from "../../hooks/axios/useDeleteData";
import { useGetDataToken } from "../../hooks/axios/useGetData";
import { useInsertData } from "../../hooks/axios/useInsertData";
import { useUpdateData } from "../../hooks/axios/useUpdateData";
import {
  ADD_TO_CART,
  GET_ALL_CART_ITEMS,
  CLEAR_ALL_CART_ITEMS,
  DELETE_SPECIFIC_CART_ITEM,
  UPDATE_SPECIFIC_CART_ITEM,
  APPLY_COUPON,
  GET_ERROR,
} from "../type";

// Get All Items From The Cart
export const getAllCartItems = () => async (dispatch) => {
  try {
    const result = await useGetDataToken(`/api/v1/cart`);
    dispatch({
      type: GET_ALL_CART_ITEMS,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.response,
      meta: "fetchAll",
    });
  }
};

// Add new Item To The Cart
export const addToCartAction = (body) => async (dispatch) => {
  try {
    const result = await useInsertData(`/api/v1/cart`, body);
    dispatch({
      type: ADD_TO_CART,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.response,
      meta: "create",
    });
  }
};

// Clear All Items From The Cart
export const clearAllCart = () => async (dispatch) => {
  try {
    const result = await useDeleteData(`/api/v1/cart`);
    dispatch({
      type: CLEAR_ALL_CART_ITEMS,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.response,
      meta: "clearAll",
    });
  }
};

// Delete Specific Item From The Cart
export const deleteCartSpecificItem = (id) => async (dispatch) => {
  try {
    const result = await useDeleteData(`/api/v1/cart/${id}`);
    dispatch({
      type: DELETE_SPECIFIC_CART_ITEM,
      payload: { result, id },
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.response,
      meta: "delete",
    });
  }
};

// Update Specific Item From The Cart
export const updateCartSpecificItem = (id, body) => async (dispatch) => {
  try {
    const result = await useUpdateData(`/api/v1/cart/${id}`, body);
    dispatch({
      type: UPDATE_SPECIFIC_CART_ITEM,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.response,
    });
  }
};

// Update Specific Item From The Cart
export const applyCoupon = (body) => async (dispatch) => {
  try {
    const result = await useUpdateData(`/api/v1/cart/applyCoupon`, body);
    dispatch({
      type: APPLY_COUPON,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: APPLY_COUPON,
      payload: e.result,
      meta: "applyCoupon",
    });
  }
};
