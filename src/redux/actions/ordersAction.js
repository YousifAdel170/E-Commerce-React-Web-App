import { useGetDataToken } from "../../hooks/axios/useGetData";
// import { useUpdateData } from "../../hooks/axios/useUpdateData";
import { GET_ALL_ORDERS, GET_SPECIFIC_ORDER, GET_ERROR } from "../type";

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
