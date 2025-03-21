import { useGetDataToken } from "../../hooks/axios/useGetData";
import { useUpdateData } from "../../hooks/axios/useUpdateData";
import {
  GET_ALL_ORDERS,
  GET_SPECIFIC_ORDER,
  UPDATE_ORDER_PAY_STATUS,
  UPDATE_ORDER_DELIVER_STATUS,
  GET_ERROR,
} from "../type";

// Get All Orders To The User / Admin [Authenticate by the Token]
export const getAllOrders = (limit, page) => async (dispatch) => {
  try {
    const result = await useGetDataToken(
      `/api/v1/orders?limit=${limit}&page=${page}`
    );
    dispatch({
      type: GET_ALL_ORDERS,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.response,
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
      payload: "Error " + e.response,
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
      payload: "Error " + e.response,
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
      payload: "Error " + e.response,
    });
  }
};
