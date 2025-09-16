import {
  ADD_COUPON,
  GET_ALL_COUPONS,
  DELETE_COUPON,
  GET_SPECIFIC_COUPON,
  GET_ERROR,
  UPDATE_COUPON,
  RESET_STATE,
} from "../type";

import { useInsertData } from "../../hooks/axios/useInsertData";
import { useGetDataToken } from "../../hooks/axios/useGetData";
import useDeleteData from "../../hooks/axios/useDeleteData";
import { useUpdateData } from "../../hooks/axios/useUpdateData";

// Action responsible for adding new coupon
export const addCoupon = (body) => async (dispatch) => {
  try {
    const result = await useInsertData(`/api/v1/coupons`, body);
    dispatch({
      type: ADD_COUPON,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e?.response,
      meta: "create",
    });
  }
};

// Action To Display All The Coupons
export const getAllCoupons = (limit) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/coupons?limit=${limit}`);
    dispatch({
      type: GET_ALL_COUPONS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response,
    });
  }
};

// Action To Display All The Coupons in specified page
export const getAllCouponsInSelectedPage =
  (limit, page) => async (dispatch) => {
    try {
      const result = await useGetDataToken(
        `/api/v1/coupons?limit=${limit}&page=${page}`
      );
      dispatch({
        type: GET_ALL_COUPONS,
        payload: result,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: "Error " + e,
      });
    }
  };

// Action To Delete Specific Coupon USing Its ID
export const deleteCoupon = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`api/v1/coupons/${id}`);
    dispatch({
      type: DELETE_COUPON,
      payload: { id, response },
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response,
      meta: "delete",
    });
  }
};

// Action To Get Specific Coupon USing Its ID
export const getSpecificCoupon = (id) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`api/v1/coupons/${id}`);
    dispatch({
      type: GET_SPECIFIC_COUPON,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response,
    });
  }
};

// Action To Update Specific Coupon USing Its ID
export const editCoupon = (id, body) => async (dispatch) => {
  try {
    const response = await useUpdateData(`api/v1/coupons/${id}`, body);
    dispatch({
      type: UPDATE_COUPON,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e,
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
