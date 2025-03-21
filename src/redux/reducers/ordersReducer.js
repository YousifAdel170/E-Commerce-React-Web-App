import {
  GET_ALL_ORDERS,
  GET_SPECIFIC_ORDER,
  UPDATE_ORDER_PAY_STATUS,
  UPDATE_ORDER_DELIVER_STATUS,
} from "../type";

const initialState = {
  viewAllOrders: [],
  specificOrder: [],
  updatedOrderPayStatus: [],
  updatedOrderDeliverStatus: [],
  loading: true,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return { ...state, viewAllOrders: action.payload, loading: false };

    case GET_SPECIFIC_ORDER:
      return { ...state, specificOrder: action.payload, loading: false };

    case UPDATE_ORDER_PAY_STATUS:
      return {
        ...state,
        updatedOrderPayStatus: action.payload,
        loading: false,
      };

    case UPDATE_ORDER_DELIVER_STATUS:
      return {
        ...state,
        updatedOrderDeliverStatus: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default ordersReducer;
