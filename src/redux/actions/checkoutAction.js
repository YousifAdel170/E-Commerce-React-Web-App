import { CREATE_ORDER_CASH } from "../type";

import { useInsertData } from "../../hooks/axios/useInsertData";

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
