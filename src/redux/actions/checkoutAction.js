import { CREATE_ORDER_CASH, CREATE_ORDER_CARD } from "../type";

import { useInsertData } from "../../hooks/axios/useInsertData";
import { useGetDataToken } from "../../hooks/axios/useGetData";

// Create an Cash Order
export const createOrdrerCash = (id, body) => async (dispatch) => {
  try {
    const result = await useInsertData(`/api/v1/orders/${id}`, body);
    dispatch({
      type: CREATE_ORDER_CASH,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: CREATE_ORDER_CASH,
      payload: "Error " + e,
    });
  }
};

// Create an Cash Order
export const createOrderCard = (id, body) => async (dispatch) => {
  try {
    const result = await useGetDataToken(
      `/api/v1/orders/checkout-session/${id}`,
      body
    );
    dispatch({
      type: CREATE_ORDER_CARD,
      payload: result,
    });
  } catch (e) {
    dispatch({
      type: CREATE_ORDER_CARD,
      payload: "Error " + e,
    });
  }
};
