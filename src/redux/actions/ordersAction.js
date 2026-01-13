import { useGetDataToken } from "../../hooks/axios/useGetData";
import { useUpdateData } from "../../hooks/axios/useUpdateData";
import {
  GET_ALL_ORDERS,
  GET_SPECIFIC_ORDER,
  UPDATE_ORDER_PAY_STATUS,
  UPDATE_ORDER_DELIVER_STATUS,
  GET_ERROR,
  RESET_STATE,
} from "../type";

// Get All Orders To The User / Admin [Authenticate by the Token]
export const getAllOrders = (limit, page) => async (dispatch) => {
  try {
    const params = new URLSearchParams();

    if (limit !== undefined && limit !== null) params.append("limit", limit);
    if (page !== undefined && page !== null) params.append("page", page);

    const result = await useGetDataToken(`/api/v1/orders?${params.toString()}`);

    dispatch({
      type: GET_ALL_ORDERS,
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

// Get All Orders To The User / Admin [Authenticate by the Token]
export const getSpecificOrder = (id) => async (dispatch) => {
  try {
    const result = await useGetDataToken(`/api/v1/orders/${id}`);
    dispatch({
      type: GET_SPECIFIC_ORDER,
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

// Change Order Pay Status [Done Or Not]
export const changeOrderPayAction = (id) => async (dispatch) => {
  try {
    const result = await useUpdateData(`/api/v1/orders/${id}/pay`);
    dispatch({
      type: UPDATE_ORDER_PAY_STATUS,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: e.response?.data?.message || e.message || "Unknown error",
      meta: "update",
    });
  }
};

// Change Order Deliver Status [Done Or Not]
export const changeOrderDeliverAction = (id) => async (dispatch) => {
  try {
    const result = await useUpdateData(`/api/v1/orders/${id}/deliver`);
    dispatch({
      type: UPDATE_ORDER_DELIVER_STATUS,
      payload: result,
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
